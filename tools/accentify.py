#!/usr/bin/env python3
"""One-off migration: replace each stylesheet's literal brand-accent colours with course tokens
(--fy-course / -ink / -strong / -soft) so accents follow the active theme and keep >=4.5:1 contrast."""
import re, sys

MAPS = {
 "css/style.css": {"#22c58b":"course","#2daa91":"course-ink","#2dd4bf":"course-ink","#d4af37":"gold","#d7b76a":"gold","rgb:34,197,139":"course"},
 "login.html": {"#22c58b":"course","#4be0aa":"course-ink","#138b64":"course-strong","#d7b76a":"gold","rgb:34,197,139":"course"},
 "about/about.css": {"#20d6a0":"course","rgb:32,214,160":"course"},
 "html-learning/html-learning.css": {"#e34f26":"course","#f06529":"course-ink","#ff8a5c":"course-ink","#b93616":"course-strong","#38c98a":"success","rgb:227,79,38":"course","rgb:240,101,41":"course"},
 "css-learning/css-learning.css": {"#0f807a":"course","#0b5d91":"course","#1684b8":"course-ink","#b18b43":"gold","#16855f":"success","rgb:15,128,122":"course","rgb:11,93,145":"course"},
 "javascript-learning/javascript-learning.css": {"#f7df1e":"course","#fff176":"course-ink","#d4bd00":"course-strong","#4ade80":"success","rgb:247,223,30":"course"},
 "react-learning/react-learning.css": {"#61dafb":"course","#149eca":"course-strong","#159eca":"course-strong","#38c8eb":"course","#8ce7fa":"course-ink","#087ea4":"course-strong","#159570":"success","rgb:97,218,251":"course","rgb:20,158,202":"course"},
 "vue-learning/vue-learning.css": {"#42b883":"course","#61d7a0":"course-ink","#42d392":"success","rgb:66,184,131":"course"},
 "angular-learning/angular-learning.css": {"#dd0031":"course","#f10a43":"course","#ef1648":"course","#bd002a":"course-strong","#c9002d":"course-strong","#b80029":"course-strong","#980022":"course-strong","#159570":"success","rgb:221,0,49":"course"},
 "fundamentals/computer-basics/com.css": {"#10b981":"course","#059669":"course-strong","rgb:16,185,129":"course"},
 "fundamentals/programming-basics/prg.css": {"#dc2626":"course","#ef4444":"course-ink","#b91c1c":"course-strong","#991b1b":"course-strong","#7f1d1d":"course-strong","#d4a72c":"gold","#3b82f6":"blue","#d93636":"course-ink","#8b1c1c":"course-strong","rgb:220,38,38":"course","rgb:224,29,29":"course","rgb:206,27,27":"course","rgb:218,19,19":"course"},
}

def tok(name, a=None):
    return f"var(--fy-{name})" if a is None or a >= 0.995 else f"color-mix(in srgb, var(--fy-{name}) {round(a*100)}%, transparent)"

def convert(m, text):
    n = 0
    def hexsub(x):
        nonlocal n
        k = x.group(0).lower()
        if k in m: n += 1; return tok(m[k])
        return x.group(0)
    root = re.search(r":root\s*\{[^}]*\}", text)
    head, body = (text[:root.end()], text[root.end():]) if root else ("", text)
    body = re.sub(r"#[0-9a-fA-F]{6}\b", hexsub, body)
    def rgbsub(x):
        nonlocal n
        parts = [p.strip() for p in x.group(1).split(",")]
        try: key = "rgb:" + ",".join(str(int(float(p))) for p in parts[:3])
        except ValueError: return x.group(0)
        if key in m:
            n += 1
            a = float(parts[3]) if len(parts) > 3 else 1.0
            return tok(m[key], a)
        return x.group(0)
    body = re.sub(r"rgba?\(([^)]*)\)", rgbsub, body)
    return head + body, n

def run(path):
    m = MAPS[path]
    s = open(path, encoding="utf8").read()
    if path.endswith(".html"):
        total = 0
        def sub(x):
            nonlocal total
            t, n = convert(m, x.group(2)); total += n
            return x.group(1) + t + x.group(3)
        s = re.sub(r"(<style[^>]*>)(.*?)(</style>)", sub, s, flags=re.S)
        n = total
    else:
        s, n = convert(m, s)
    open(path, "w", encoding="utf8").write(s)
    print(f"{path}: {n} replacements")

for p in MAPS: run(p)
