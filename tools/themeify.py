#!/usr/bin/env python3
"""
One-off migration (kept for reference/re-runs on pristine files): rewrite *literal* neutral colours in the
legacy page stylesheets into theme tokens so light/dark switching works everywhere.

 - background: dark/light neutral literals -> surface tier tokens; white overlays -> colour-mix(text|surface)
 - color:      neutral literals -> text / text-soft / text-muted tiers; literal text on accent fills -> course-on
 - border/outline/box-shadow: white-alpha or neutral literals -> border tokens
 - code panels, previews, syntax tokens and accent (saturated) colours are left untouched.

Usage: themeify.py <file> <dark|light>     (page's ORIGINAL polarity)
"""
import re, sys

SKIP_SEL = re.compile(r"code|pre\b|editor|console|terminal|syntax|token|\.hl-|syntax-highlight|preview|demo|line-number|keyword|\.hl-|window-|traffic|dots?\b|textarea|output|result", re.I)
FILL_VAR = re.compile(r"var\(--(accent|primary|course|green|blue|teal|html-orange|brand|danger|success|warning|gold|js-yellow|auth-green)[a-z-]*\)", re.I)

def parse_color(s):
    s = s.strip().lower()
    if s == "white": return (255, 255, 255, 1.0)
    if s == "black": return (0, 0, 0, 1.0)
    m = re.fullmatch(r"#([0-9a-f]{3,8})", s)
    if m:
        h = m.group(1)
        if len(h) in (3, 4): h = "".join(c * 2 for c in h)
        r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
        a = int(h[6:8], 16) / 255 if len(h) == 8 else 1.0
        return (r, g, b, a)
    m = re.fullmatch(r"rgba?\(([^)]*)\)", s)
    if m:
        p = [x for x in re.split(r"[,\s/]+", m.group(1).strip()) if x]
        if len(p) >= 3:
            try:
                a = float(p[3].rstrip("%")) / (100 if p[3].endswith("%") else 1) if len(p) > 3 else 1.0
                return (float(p[0]), float(p[1]), float(p[2]), a)
            except ValueError:
                return None
    return None

def lum(c):
    def f(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])

def chroma(c):
    return max(c[:3]) - min(c[:3])

COLOR_RE = re.compile(r"#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|\bwhite\b|\bblack\b")

def pct(a):
    return f"{round(a * 100)}%"

def mix(token, a):
    return f"var(--fy-{token})" if a >= 0.995 else f"color-mix(in srgb, var(--fy-{token}) {pct(a)}, transparent)"

def bg_tier(c):
    L = lum(c)
    if L < 0.008: return "bg"
    if L < 0.02: return "bg-soft"
    if L < 0.035: return "surface"
    if L < 0.06: return "surface-2"
    if L < 0.12: return "surface-3"
    if L > 0.93: return "surface"
    if L > 0.88: return "surface-2"
    if L > 0.78: return "surface-3"
    return None

def is_saturated(c):
    return chroma(c) > 70 and 0.03 < lum(c) < 0.7

def rewrite_background(val, polarity):
    def sub(m):
        c = parse_color(m.group(0))
        if not c: return m.group(0)
        r, g, b, a = c
        if a == 0: return m.group(0)
        if (r, g, b) == (255, 255, 255) and a < 0.99:  # white overlay
            return mix("hover", 1.0) if a <= 0.06 else (mix("text", a) if polarity == "dark" else mix("surface", a))
        if (r, g, b) == (255, 255, 255):
            return "var(--fy-surface)"
        if (r, g, b) == (0, 0, 0): return m.group(0)
        if is_saturated(c): return m.group(0)
        if chroma(c) > 90: return m.group(0)
        t = bg_tier(c)
        # light-origin pages (CSS/React/Angular) use dark literals only for code panels: keep those dark.
        if polarity == "light" and lum(c) < 0.12: return m.group(0)
        return mix(t, a) if t else m.group(0)
    return COLOR_RE.sub(sub, val)

def is_filled(decls):
    for k in ("background", "background-color", "background-image"):
        v = decls.get(k)
        if not v: continue
        if FILL_VAR.search(v): return True
        for m in COLOR_RE.finditer(v):
            c = parse_color(m.group(0))
            if c and c[3] > 0.5 and is_saturated(c): return True
    return False

def rewrite_text(val, polarity, filled):
    m = COLOR_RE.fullmatch(val.strip())
    if not m: return val
    c = parse_color(val)
    if not c: return val
    r, g, b, a = c
    L = lum(c)
    if filled and chroma(c) < 60 and (L > 0.7 or L < 0.05):
        return "var(--fy-course-on)"
    if chroma(c) > 60 and not filled:
        return val  # accent coloured text: leave
    if chroma(c) > 60: return val
    if a < 0.99:
        return mix("text", a) if (L > 0.5) == (polarity == "dark") else val
    # neutral literal: classify by contrast with the original page polarity
    if polarity == "dark":
        if L > 0.55: return "var(--fy-text)" if L > 0.75 else "var(--fy-text-soft)"
        if L > 0.09: return "var(--fy-text-muted)"
        return val
    else:
        if L < 0.08: return "var(--fy-text)"
        if L < 0.25: return "var(--fy-text-soft)"
        if L < 0.45: return "var(--fy-text-muted)"
        return val

def rewrite_border(val, polarity):
    def sub(m):
        c = parse_color(m.group(0))
        if not c: return m.group(0)
        r, g, b, a = c
        if a == 0 or chroma(c) > 60: return m.group(0)
        L = lum(c)
        if (r, g, b) == (255, 255, 255) and a < 0.99 and polarity == "dark":
            return "var(--fy-border)" if a <= 0.11 else "var(--fy-border-strong)"
        if polarity == "dark" and 0.01 < L < 0.3 and a >= 0.99: return "var(--fy-border)" if L < 0.12 else "var(--fy-border-strong)"
        if polarity == "light" and L > 0.7 and a >= 0.99: return "var(--fy-border)" if L > 0.8 else "var(--fy-border-strong)"
        return m.group(0)
    return COLOR_RE.sub(sub, val)

def split_decls(body):
    out, depth, cur = [], 0, ""
    for ch in body:
        if ch == "(": depth += 1
        elif ch == ")": depth -= 1
        if ch == ";" and depth == 0:
            out.append(cur); cur = ""
        else:
            cur += ch
    if cur != "": out.append(cur)
    return out

def process(css, polarity):
    stats = {"blocks": 0, "changed": 0}
    block_re = re.compile(r"([^{}]+)\{([^{}]*)\}")
    def repl(m):
        sel, body = m.group(1), m.group(2)
        if sel.strip().startswith("@") or SKIP_SEL.search(sel) or ":root" in sel:
            return m.group(0)
        stats["blocks"] += 1
        parts = split_decls(body)
        decls = {}
        for p in parts:
            if ":" in p:
                k, v = p.split(":", 1); decls[k.strip().lower()] = v.strip()
        filled = is_filled(decls)
        new_parts, changed = [], False
        for p in parts:
            if ":" not in p:
                new_parts.append(p); continue
            k, v = p.split(":", 1)
            key = k.strip().lower(); val = v
            important = ""
            mi = re.search(r"\s*!important\s*(\s*)$", val)
            if mi: important = " !important"; val = val[:mi.start()] + mi.group(1)
            if "var(--fy" in val: new_parts.append(p); continue
            lead = re.match(r"\s*", val).group(0)
            trail = re.search(r"\s*$", val).group(0)
            core = val.strip()
            nv = core
            if key in ("background", "background-color", "background-image"):
                nv = rewrite_background(core, polarity)
            elif key == "color":
                nv = rewrite_text(core, polarity, filled)
            elif key.startswith("border") or key in ("outline", "outline-color"):
                nv = rewrite_border(core, polarity)
            if nv != core:
                changed = True
                new_parts.append(f"{k}:{lead}{nv}{important}{trail}")
            else:
                new_parts.append(p)
        if changed:
            stats["changed"] += 1
            return f"{sel}{{{';'.join(new_parts)}}}"
        return m.group(0)
    return block_re.sub(repl, css), stats

if __name__ == "__main__":
    path, polarity = sys.argv[1], sys.argv[2]
    src = open(path, encoding="utf8").read()
    if path.endswith(".html"):
        def style_sub(m):
            new, st = process(m.group(2), polarity)
            print(f"  {path} <style>: {st}")
            return m.group(1) + new + m.group(3)
        out = re.sub(r"(<style[^>]*>)(.*?)(</style>)", style_sub, src, flags=re.S)
    else:
        out, st = process(src, polarity)
        print(f"  {path}: {st}")
    open(path, "w", encoding="utf8").write(out)
