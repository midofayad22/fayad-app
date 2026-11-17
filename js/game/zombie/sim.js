/*
  Zombie Survival — world simulation. A classic script injected (after the learner's HTML/CSS and before their JS) INTO the sandboxed frame.
  It moves zombies through the page the learner built, using what is actually rendered: getBoundingClientRect() of barricades/doors,
  computed visibility/opacity, classes the learner's JS toggles, DOM events it dispatches. Nothing is judged by searching the code text.

  Config: window.__ZB = { mode:'preview'|'play'|'test', waves:[{at,type,n,from,gap}], ammo, supplies, shelterHp, need, time }
  Output (console lines, parsed by the host):  @@ST {json}  every 0.4s  ·  @@END {json}  when the wave is over.
  World: #world is 600×300 logical units; the host scales it with CSS (transform), the engine divides by that scale.
*/
window.addEventListener("load", function () {
  "use strict";
  var CFG = window.__ZB || {};
  var W = 600, H = 300, GUN = 175;
  var TYPES = {
    walker:  { hp: 3, sp: 34, r: 9,  obs: 1.4, hit: 1.6 },
    runner:  { hp: 2, sp: 82, r: 7,  obs: 0,   hit: 1.2, hunts: true },
    crawler: { hp: 2, sp: 30, r: 4,  obs: 1.2, hit: 1.0 },
    brute:   { hp: 9, sp: 24, r: 13, obs: 6,   hit: 3.2 },
    spitter: { hp: 3, sp: 27, r: 8,  obs: 0,   hit: 0, range: 170 }
  };
  var world = document.getElementById("world"), stage = document.getElementById("stage");
  if (!world) return;
  var K = 1;
  function measure() { var r = world.getBoundingClientRect(); K = (r.width / W) || 1; }
  measure();
  var SOLID = ".barricade,.wall,.door,.gate,.crate";
  var zombies = [], nextId = 1, t = 0, spawned = [], ended = false, ammo = Number(CFG.ammo || 0), ammoUsed = 0, kills = 0;
  var supplies = Number(CFG.supplies || 0), suppliesUsed = 0, trapsOn = new WeakMap(), hpOf = new WeakMap();
  var shelter = document.getElementById("shelter"), shelterHp = Number(CFG.shelterHp || 20), shelterMax = shelterHp;
  var lastDamager = null, firstLoss = null, log = [], lastShot = -9, hudT = 0;
  (CFG.bonuses || []).forEach(function (b, i) { var ok = false; try { ok = !!(new Function("return (" + b.test + ")"))(); } catch (e) {} b.ok = ok; if (ok) { ammo += b.ammo || 0; shelterHp += b.hp || 0; shelterMax += b.hp || 0; supplies += b.supplies || 0; } });
  var survivors = [].slice.call(document.querySelectorAll(".survivor"));
  var totalSurv = survivors.length;

  function L(el) { var r = el.getBoundingClientRect(), w = world.getBoundingClientRect(); return { x: (r.left - w.left) / K, y: (r.top - w.top) / K, w: r.width / K, h: r.height / K }; }
  function solid(el) {
    if (el.hasAttribute("data-broken")) return false;
    var cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.25) return false;
    var r = L(el); return r.w >= 2 && r.h >= 2;
  }
  function obstacles() {
    var out = [], els = world.querySelectorAll(SOLID);
    for (var i = 0; i < els.length; i++) if (solid(els[i])) { var r = L(els[i]); r.el = els[i]; out.push(r); }
    return out;
  }
  function hit(o, x, y, rad) { return x + rad > o.x && x - rad < o.x + o.w && y + rad > o.y && y - rad < o.y + o.h; }
  function blocking(obs, x, y, rad) { for (var i = 0; i < obs.length; i++) if (hit(obs[i], x, y, rad)) return obs[i]; return null; }
  function nearestPoint(r, x, y) { return { x: Math.max(r.x, Math.min(x, r.x + r.w)), y: Math.max(r.y, Math.min(y, r.y + r.h)) }; }
  function dist(a, b) { return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)); }
  function evt(type, el, detail) { try { el.dispatchEvent(new CustomEvent(type, { detail: detail, bubbles: true })); } catch (e) {} }

  function spawn(type, from) {
    var sp = document.querySelector('.spawn[data-id="' + from + '"]') || document.querySelector(".spawn");
    if (!sp) return;
    var r = L(sp), d = TYPES[type] || TYPES.walker, el = document.createElement("div");
    el.className = "z z-" + type; el.innerHTML = "<i></i>";
    var z = { id: nextId++, type: type, d: d, hp: d.hp, x: r.x + r.w / 2 + (Math.random() - 0.5) * 6 * 0, y: r.y + r.h / 2 + ((nextId % 3) - 1) * 5, el: el, atk: false, slide: 0, slipped: true, inside: {}, from: from, spit: 0 };
    el.style.left = z.x + "px"; el.style.top = z.y + "px"; world.appendChild(el); zombies.push(z); return z;
  }
  function damageZombie(z, n, why) {
    if (z.hp <= 0) return; z.hp -= n; z.el.classList.add("hurt"); setTimeout(function () { z.el.classList.remove("hurt"); }, 120);
    if (z.hp <= 0) {
      z.el.classList.add("dead"); kills++; if (z.dying == null) z.dying = 0.7;
      evt("zombiedeath", document, { type: z.type, id: z.id, by: why });
    }
  }
  function fx(cls, x1, y1, x2, y2) {
    var e = document.createElement("div"); e.className = "fx " + cls; var dx = x2 - x1, dy = y2 - y1;
    e.style.left = x1 + "px"; e.style.top = y1 + "px"; e.style.width = Math.sqrt(dx * dx + dy * dy) + "px"; e.style.transform = "rotate(" + Math.atan2(dy, dx) + "rad)";
    world.appendChild(e); setTimeout(function () { e.remove(); }, 160);
  }
  function note(code, type) { if (!firstLoss) firstLoss = { code: code, type: type }; }

  function targetFor(z) {
    var me = { x: z.x, y: z.y }, best = null;
    if (z.d.hunts) {
      var bd = 220;
      for (var i = 0; i < survivors.length; i++) {
        var s = survivors[i]; if (s.hasAttribute("data-dead") || (shelter && shelter.contains(s))) continue;
        var r = L(s), c = { x: r.x + r.w / 2, y: r.y + r.h / 2 }, dd = dist(me, c);
        if (dd < bd) { bd = dd; best = { x: c.x, y: c.y, surv: s }; }
      }
      if (best) return best;
    }
    if (!shelter) return { x: W, y: H / 2 };
    var np = nearestPoint(L(shelter), z.x, z.y); np.shelter = true; return np;
  }

  var botDone = false;
  function botTick() {
    if (!botDone && t >= 1.5) { botDone = true; var rb = document.getElementById("rescue"); if (rb) rb.click(); }
    if (t - lastShot < 0.85 || ammo <= 0 || !shelter) return;
    var best = null, bd = 1e9, sh = L(shelter);
    zombies.forEach(function (z) { if (z.hp <= 0) return; var d0 = dist({ x: z.x, y: z.y }, nearestPoint(sh, z.x, z.y)); if (d0 <= GUN && d0 < bd) { bd = d0; best = z; } });
    if (best) window.__ZBsim.shootAt(best);
  }
  function step(dt) {
    t += dt; if (CFG.bot) botTick();
    // waves
    var waves = CFG.waves || [];
    for (var wi = 0; wi < waves.length; wi++) {
      var w = waves[wi]; spawned[wi] = spawned[wi] || 0;
      while (spawned[wi] < w.n && t >= w.at + spawned[wi] * (w.gap || 1)) { spawn(w.type, w.from || "a"); spawned[wi]++; }
    }
    var obs = obstacles(), sensors = world.querySelectorAll(".sensor"), traps = world.querySelectorAll(".trap"), sh = shelter ? L(shelter) : null;
    // traps: arming costs one supply the first time a trap becomes armed
    for (var ti = 0; ti < traps.length; ti++) {
      var tr = traps[ti], st = trapsOn.get(tr) || { paid: false, left: Number(tr.getAttribute("data-ticks") || 7), idle: 0 };
      var armed = tr.classList.contains("armed") && !tr.classList.contains("spent");
      if (armed && !st.paid) {
        if (suppliesUsed < supplies) { suppliesUsed++; st.paid = true; } else { tr.classList.remove("armed"); tr.classList.add("nosupply"); note("nosupply"); }
      }
      st.active = armed && st.paid; trapsOn.set(tr, st);
    }
    for (var zi = zombies.length - 1; zi >= 0; zi--) {
      var z = zombies[zi];
      if (z.hp <= 0) { z.dying -= dt; if (z.dying <= 0) { z.el.remove(); zombies.splice(zi, 1); } continue; }
      var d = z.d, tg = targetFor(z), dx = tg.x - z.x, dy = tg.y - z.y, dd = Math.sqrt(dx * dx + dy * dy) || 1, mv = d.sp * dt;
      z.atk = false;
      // sensors → real DOM events the learner's JS listens to
      for (var si = 0; si < sensors.length; si++) {
        var sr = L(sensors[si]), inside = z.x > sr.x && z.x < sr.x + sr.w && z.y > sr.y && z.y < sr.y + sr.h, key = si;
        if (inside && !z.inside[key]) { z.inside[key] = 1; evt("zombieenter", sensors[si], { type: z.type, id: z.id, hp: z.hp }); }
        else if (!inside && z.inside[key]) { z.inside[key] = 0; evt("zombieleave", sensors[si], { type: z.type, id: z.id }); }
      }
      // spitter: stops at range and spits at the shelter over every barricade
      if (d.range && sh && dist({ x: z.x, y: z.y }, nearestPoint(sh, z.x, z.y)) <= d.range) {
        z.atk = true; z.spit -= dt;
        if (z.spit <= 0) { z.spit = 1.7; shelterHp -= 1; lastDamager = z.type; fx("spit", z.x, z.y, sh.x + sh.w / 2, sh.y + sh.h / 2); note("shelter", z.type); }
      } else {
        var ux = dx / dd * mv, uy = dy / dd * mv, rad = d.r, nx = z.x + ux, ny = z.y + uy;
        var b = blocking(obs, nx, ny, rad);
        if (!b) { z.x = nx; z.y = ny; z.slide = 0; }
        else {
          var bx = blocking(obs, z.x + ux, z.y, rad), by = blocking(obs, z.x, z.y + uy, rad);
          if (!bx && Math.abs(ux) > 0.001 && Math.abs(uy) > 0.2 * mv) z.x += ux; // slide along the wall
          else if (!by && Math.abs(uy) > 0.001 && Math.abs(ux) > 0.2 * mv) z.y += uy;
          else if (d.obs > 0) { // blocked head-on: attack the obstacle
            z.atk = true; z.slipped = false;
            var o = b, el = o.el, hp = hpOf.get(el);
            if (hp == null) hp = el.classList.contains("wall") ? 1e9 : Number(el.getAttribute("data-hp") || (el.classList.contains("door") || el.classList.contains("gate") ? 100 : 70));
            hp -= d.obs * dt; hpOf.set(el, hp); el.style.setProperty("--dmg", String(Math.max(0, 1 - hp / Number(el.getAttribute("data-hp") || 70))));
            el.classList.add("hit");
            if (hp <= 0) { el.setAttribute("data-broken", ""); evt("obstaclebroken", el, { by: z.type }); note("broke", z.type); }
          } else { // runner / spitter cannot attack walls: walk along them to find the gap
            if (!z.slide) z.slide = (tg.y >= z.y ? 1 : -1) * (Math.abs(tg.y - z.y) < 1 ? (z.id % 2 ? 1 : -1) : 1);
            var sy = z.y + z.slide * mv; if (!blocking(obs, z.x, sy, rad) && sy > 8 && sy < H - 8) z.y = sy; else z.slide = -z.slide;
          }
        }
      }
      z.x = Math.max(4, Math.min(W - 4, z.x)); z.y = Math.max(6, Math.min(H - 6, z.y));
      // contact with exposed survivors and the shelter
      for (var vi = 0; vi < survivors.length; vi++) {
        var sv = survivors[vi]; if (sv.hasAttribute("data-dead") || (shelter && shelter.contains(sv))) continue;
        var sr2 = L(sv), cc = { x: sr2.x + sr2.w / 2, y: sr2.y + sr2.h / 2 };
        if (dist({ x: z.x, y: z.y }, cc) < d.r + 10) {
          var shp = Number(sv.getAttribute("data-hp") || 4) - 2.2 * dt; sv.setAttribute("data-hp", String(shp)); z.atk = true; sv.classList.add("bitten");
          if (shp <= 0) { sv.setAttribute("data-dead", ""); note("survivor", z.type); lastDamager = z.type; }
        }
      }
      if (sh && d.hit > 0) {
        var np = nearestPoint(sh, z.x, z.y);
        if (dist({ x: z.x, y: z.y }, np) <= d.r + 3) { z.atk = true; shelterHp -= d.hit * dt; lastDamager = z.type; if (shelterHp <= 0) note(z.slipped ? "slipped" : "shelter", z.type); }
      }
      // traps
      for (var ki = 0; ki < traps.length; ki++) {
        var ts = trapsOn.get(traps[ki]); if (!ts || !ts.active) continue;
        var tr2 = L(traps[ki]);
        if (z.x > tr2.x && z.x < tr2.x + tr2.w && z.y > tr2.y && z.y < tr2.y + tr2.h) {
          damageZombie(z, 5 * dt, "trap"); ts.left -= dt; ts.idle = 0; traps[ki].classList.add("firing");
          if (ts.left <= 0) { traps[ki].classList.remove("armed", "firing"); traps[ki].classList.add("spent"); }
        }
      }
      z.el.style.left = z.x + "px"; z.el.style.top = z.y + "px"; z.el.classList.toggle("atk", z.atk); z.el.classList.toggle("flip", dx < 0);
    }
    // turrets
    var tus = world.querySelectorAll(".turret.on");
    for (var u = 0; u < tus.length; u++) {
      var tu = tus[u], tr3 = L(tu), cx = tr3.x + tr3.w / 2, cy = tr3.y + tr3.h / 2, cd = Number(tu.getAttribute("data-cd") || 0) - dt;
      var rounds = tu.hasAttribute("data-ammo") ? Number(tu.getAttribute("data-ammo")) : 8;
      if (cd <= 0 && rounds > 0) {
        var tz = null, bd2 = 125;
        for (var q = 0; q < zombies.length; q++) if (zombies[q].hp > 0) { var dq = dist({ x: cx, y: cy }, zombies[q]); if (dq < bd2) { bd2 = dq; tz = zombies[q]; } }
        if (tz) { rounds--; tu.setAttribute("data-ammo", String(rounds)); fx("bolt", cx, cy, tz.x, tz.y); damageZombie(tz, 1, "turret"); cd = 0.8; }
      }
      tu.setAttribute("data-cd", String(Math.max(0, cd)));
      tu.classList.toggle("empty", rounds <= 0);
    }
    // trap idle detection (armed but nothing in it for a long time = wasted supply)
    // end of the wave
    var alive = zombies.filter(function (z) { return z.hp > 0; }).length, allSpawned = waves.every(function (w, i) { return (spawned[i] || 0) >= w.n; });
    var surv = survivors.filter(function (s) { return !s.hasAttribute("data-dead"); }).length;
    survivors.forEach(function (s) { s.classList.toggle("dead", s.hasAttribute("data-dead")); });
    if (shelter) shelter.style.setProperty("--hp", String(Math.max(0, shelterHp / shelterMax)));
    var over = shelterHp <= 0 || (allSpawned && alive === 0) || t >= (CFG.time || 90); // dawn: if the shelter holds until the clock ends, the convoy arrives
    hudT += dt;
    if (hudT >= 0.4 || over) { hudT = 0; hud(alive, surv, waves); }
    if (over && !ended) finish(alive, surv);
  }
  function hud(alive, surv, waves) {
    var total = 0, sp = 0; waves.forEach(function (w, i) { total += w.n; sp += spawned[i] || 0; });
    console.log("@@ST " + JSON.stringify({ t: Math.round(t * 10) / 10, hp: Math.max(0, Math.round(shelterHp * 10) / 10), hpMax: shelterMax, sv: surv, svT: totalSurv, ammo: ammo, sup: Math.max(0, supplies - suppliesUsed), z: alive, left: total - sp, k: kills, total: total, bn: (CFG.bonuses || []).map(function (b) { return b.ok ? 1 : 0; }) }));
  }
  function finish(alive, surv) {
    ended = true;
    var hpOk = shelterHp > 0, need = Number(CFG.need != null ? CFG.need : totalSurv), win = hpOk && surv >= need;
    var cause = null;
    if (!win) cause = !hpOk ? (firstLoss && (firstLoss.code === "slipped" || firstLoss.code === "shelter" || firstLoss.code === "broke") ? { code: firstLoss.code, type: lastDamager || firstLoss.type } : { code: "shelter", type: lastDamager }) : surv < need ? { code: "survivor", type: (firstLoss && firstLoss.code === "survivor" ? firstLoss.type : lastDamager) } : { code: "survivor" };
    var res = { win: win, t: Math.round(t * 10) / 10, hp: Math.max(0, Math.round(shelterHp * 10) / 10), hpMax: shelterMax, sv: surv, svT: totalSurv, need: need, ammo: ammo, ammoUsed: ammoUsed, kills: kills, sup: Math.max(0, supplies - suppliesUsed), cause: cause, note: firstLoss };
    console.log("@@END " + JSON.stringify(res));
    document.body.classList.add(win ? "zb-won" : "zb-lost");
  }

  // ---- manual play: tap/click a zombie to shoot it (limited ammo); tap a crate to collect ammo ----
  function toWorld(e) { var w = world.getBoundingClientRect(); return { x: (e.clientX - w.left) / K, y: (e.clientY - w.top) / K }; }
  function onPoint(e) {
    if (CFG.mode === "preview" || ended) return;
    var p = toWorld(e), crate = e.target.closest && e.target.closest(".ammo-crate");
    if (crate && !crate.hasAttribute("data-taken")) { crate.setAttribute("data-taken", ""); ammo += Number(crate.getAttribute("data-ammo") || 5); crate.classList.add("taken"); return; }
    if (t - lastShot < 0.8) return;
    var med = e.target.closest && e.target.closest(".medkit");
    if (med && !med.hasAttribute("data-taken")) { med.setAttribute("data-taken", ""); med.classList.add("taken"); shelterHp = Math.min(shelterMax, shelterHp + 6); evt("medkit", med, {}); return; }
    var bar = e.target.closest && e.target.closest(".barrel");
    if (bar && !bar.hasAttribute("data-broken")) {
      if (ammo <= 0) { world.classList.add("noammo"); setTimeout(function () { world.classList.remove("noammo"); }, 300); return; }
      if (t - lastShot < 0.8) return; ammo--; ammoUsed++; lastShot = t; var br = L(bar), bc = { x: br.x + br.w / 2, y: br.y + br.h / 2 };
      bar.setAttribute("data-broken", ""); var bo = document.createElement("div"); bo.className = "boom"; bo.style.left = bc.x + "px"; bo.style.top = bc.y + "px"; world.appendChild(bo); setTimeout(function () { bo.remove(); }, 500);
      zombies.forEach(function (z) { if (z.hp > 0 && dist(z, bc) < 62) damageZombie(z, 4, "barrel"); }); return;
    }
    var best = null, bd = 1e9, close = null;
    for (var i = 0; i < zombies.length; i++) {
      var z = zombies[i]; if (z.hp <= 0) continue; var dq = dist(p, z);
      if (dq <= 14 + z.d.r && (!close || z.hp < close.hp)) close = z;
      if (dq < 30 + z.d.r && dq < bd) { bd = dq; best = z; }
    }
    if (close) best = close;
    if (!best) return;
    if (shelter && dist({ x: best.x, y: best.y }, nearestPoint(L(shelter), best.x, best.y)) > GUN) { world.classList.add("far"); setTimeout(function () { world.classList.remove("far"); }, 250); return; }
    if (ammo <= 0) { note("noammo"); world.classList.add("noammo"); setTimeout(function () { world.classList.remove("noammo"); }, 300); return; }
    ammo--; ammoUsed++; lastShot = t; var gun = document.querySelector("#shelter") ? L(shelter) : { x: 540, y: 140, w: 0, h: 0 };
    fx("shot", gun.x + gun.w / 2, gun.y + gun.h / 2, best.x, best.y); damageZombie(best, 1, "shot");
  }
  world.addEventListener("pointerdown", onPoint);
  if (shelter && CFG.mode) { var ring = document.createElement("div"), sr0 = L(shelter); ring.className = "gunring"; ring.style.cssText = "left:" + (sr0.x - GUN) + "px;top:" + (sr0.y - GUN) + "px;width:" + (sr0.w + GUN * 2) + "px;height:" + (sr0.h + GUN * 2) + "px"; world.insertBefore(ring, world.firstChild); }

  // ---- drive ----
  var last = null;
  function frame(ts) {
    if (ended) return;
    if (last == null) last = ts;
    var dt = Math.min(0.1, Math.max(0, (ts - last) / 1000)); last = ts; for (var k = 0, n = CFG.speed || 1; k < n && !ended; k++) step(dt);
    if (!ended) requestAnimationFrame(frame);
  }
  window.__ZBsim = { zombies: zombies, step: step, shootAt: function (z) { onPoint({ clientX: world.getBoundingClientRect().left + z.x * K, clientY: world.getBoundingClientRect().top + z.y * K, target: world }); }, state: function () { return { t: t, hp: shelterHp, ammo: ammo, kills: kills, ended: ended }; } };
  if (CFG.mode === "preview") { console.log("@@ST " + JSON.stringify({ t: 0, hp: shelterHp, hpMax: shelterMax, sv: totalSurv, svT: totalSurv, ammo: ammo, sup: supplies, z: 0, left: 0, k: 0, total: 0, preview: 1, bn: (CFG.bonuses || []).map(function (b) { return b.ok ? 1 : 0; }) })); return; }
  measure(); requestAnimationFrame(frame);
});
