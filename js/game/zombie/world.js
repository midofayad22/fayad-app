/* Zombie Survival — the world's look (trusted CSS) and the builder that turns a mission + learner code into sandbox files. */
export const WORLD_CSS = `<style>
*{box-sizing:border-box}
html,body{margin:0;background:#0b130e;overflow:hidden}
:root{--k:1}
#stage{width:100vw;height:calc(300px*var(--k));overflow:hidden;position:relative}
#world{position:relative;width:600px;height:300px;transform:scale(var(--k));transform-origin:0 0;overflow:hidden;font:13px/1.4 system-ui,sans-serif;color:#e8f3ea;user-select:none;touch-action:manipulation;
 background:radial-gradient(90% 70% at 20% 0,rgba(255,255,255,.08),transparent 60%),linear-gradient(#26382b,#1a281f 55%,#16221a);}
#world:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 2px,transparent 2px 40px),repeating-linear-gradient(0deg,rgba(0,0,0,.06) 0 2px,transparent 2px 40px);pointer-events:none}
.loc-gas #world{background:radial-gradient(90% 70% at 30% 0,rgba(255,200,120,.12),transparent 60%),linear-gradient(#34363a,#25272b 60%,#1d1f22)}
.loc-clinic #world{background:radial-gradient(90% 70% at 30% 0,rgba(160,230,255,.14),transparent 60%),linear-gradient(#2c3a40,#202c31 60%,#192226)}
.loc-school #world{background:radial-gradient(90% 70% at 30% 0,rgba(255,230,140,.12),transparent 60%),linear-gradient(#3a3624,#2b281b 60%,#211f15)}
.loc-bunker #world{background:radial-gradient(90% 70% at 30% 0,rgba(255,90,90,.12),transparent 60%),linear-gradient(#2f2428,#221a1d 60%,#181214)}
.spawn{position:absolute;left:0;width:26px;height:26px;border-radius:0 50% 50% 0;background:radial-gradient(#000 40%,#2b1d1d);box-shadow:0 0 14px rgba(255,60,60,.5);}
.spawn:after{content:"▶";position:absolute;left:30px;top:3px;color:#ff7b7b;font-size:14px;opacity:.8}
#shelter{position:absolute;left:500px;top:24px;width:92px;height:252px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:10px;border-radius:10px 10px 4px 4px;
 background:linear-gradient(#5c4a3a,#3f3126);border:3px solid #8b7358;box-shadow:inset 0 0 0 3px rgba(0,0,0,.25),0 0 18px rgba(255,210,120,calc(.25*var(--hp,1)));filter:saturate(calc(.4 + .6*var(--hp,1)))}
#shelter:before{content:"SHELTER";position:absolute;top:-1px;left:50%;transform:translateX(-50%);font-size:10px;letter-spacing:.14em;color:#f2dcb4;background:#2a1f16;padding:1px 8px;border-radius:0 0 6px 6px}
.survivor{display:block;position:relative;flex:none;width:20px;height:34px;list-style:none;margin:0;padding:0;
 background:radial-gradient(circle at 50% 23%,#f2c9a0 0 6px,transparent 7px),linear-gradient(#3b86c9,#2a5d94) 50% 100%/14px 21px no-repeat;border-radius:4px;animation:idle 2.4s ease-in-out infinite}
.survivor.bitten{filter:drop-shadow(0 0 4px #ff3b3b)}.survivor.dead{filter:grayscale(1) brightness(.5);transform:rotate(90deg);animation:none}
.barricade,.wall,.door,.gate,.crate{flex:none;border:2px solid #4a3219;border-radius:4px;color:#2c1c0b;text-align:center;font-weight:700;font-size:10px;line-height:1.2;
 background:repeating-linear-gradient(#9a6a35 0 7px,#7d5428 7px 8px,#b27c41 8px 15px);box-shadow:0 2px 0 rgba(0,0,0,.35);position:relative}
.barricade{width:46px;height:50px}.crate{width:56px;height:40px;background:repeating-linear-gradient(45deg,#a7793c 0 6px,#8a5f2c 6px 12px)}
.wall{background:repeating-linear-gradient(#8e9096 0 10px,#6d7077 10px 11px);border-color:#44464b}
.door,.gate{width:36px;height:80px;background:repeating-linear-gradient(90deg,#8b94a1 0 6px,#6b7480 6px 8px);border-color:#3c434d}
.barricade.hit,.door.hit,.gate.hit,.crate.hit{box-shadow:inset 0 0 0 100px rgba(90,0,0,calc(var(--dmg,0)*.55)),0 2px 0 rgba(0,0,0,.35)}
[data-broken]{opacity:0!important;pointer-events:none;transition:opacity .4s}
.sensor{position:absolute;border:1px dashed rgba(255,212,90,.55);background:rgba(255,212,90,.06);border-radius:4px}
.sensor:after{content:"sensor";position:absolute;top:2px;left:4px;font-size:9px;color:rgba(255,212,90,.85)}
.trap{position:absolute;border-radius:6px;background:repeating-linear-gradient(90deg,#4b4f57 0 6px,#2e3137 6px 8px);border:2px solid #666b74;transition:box-shadow .2s,background .2s}
.trap:after{content:"▲▲▲";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#9aa0aa;font-size:11px;letter-spacing:2px}
.trap.armed{border-color:#ff7a3a;box-shadow:0 0 16px #ff5a2a,inset 0 0 12px #ff5a2a;background:repeating-linear-gradient(90deg,#7a2b17 0 6px,#4a1a0e 6px 8px)}
.trap.armed:after{color:#ffd0a0}.trap.firing{animation:flash .2s infinite alternate}.trap.spent{opacity:.35;filter:grayscale(1)}.trap.nosupply{border-color:#e5393f}
.turret{position:absolute;width:30px;height:30px;border-radius:50% 50% 6px 6px;background:radial-gradient(circle at 50% 40%,#c6cfdb,#7e8a99);border:2px solid #444d59;opacity:.7}
.turret:after{content:"";position:absolute;left:50%;top:-8px;width:6px;height:16px;margin-left:-3px;background:#444d59;border-radius:2px}
.turret.on{opacity:1;box-shadow:0 0 12px #6fe08a}.turret.empty{filter:grayscale(1);box-shadow:none}
.ammo-crate{position:absolute;width:26px;height:20px;border-radius:3px;background:#3a5a3a;border:2px solid #8bd88b;cursor:pointer;animation:glow 1.2s ease-in-out infinite alternate}
.ammo-crate:after{content:"+";position:absolute;inset:0;text-align:center;color:#d8ffd8;font-weight:900}.ammo-crate.taken{opacity:0;transform:scale(1.6);transition:all .3s;pointer-events:none}
button{font:inherit;font-weight:700;padding:5px 10px;border-radius:8px;border:2px solid #7ec6a0;background:#1f4631;color:#e8fff1;cursor:pointer}
.z{position:absolute;width:24px;height:32px;margin:-16px 0 0 -12px;pointer-events:none;transition:filter .1s}
.z i{position:absolute;inset:0;animation:bob .5s ease-in-out infinite;
 background:radial-gradient(circle at 50% 22%,var(--skin,#a9d36c) 0 7px,transparent 8px),radial-gradient(circle at 36% 22%,#e5393f 0 1.6px,transparent 2px),radial-gradient(circle at 64% 22%,#e5393f 0 1.6px,transparent 2px),
 linear-gradient(var(--cloth,#4a5d3a),#2c3a23) 50% 100%/16px 20px no-repeat,linear-gradient(var(--skin,#a9d36c),var(--skin,#a9d36c)) 50% 52%/26px 5px no-repeat}
.z.flip i{transform:scaleX(-1)}.z.atk i{animation:lunge .28s ease-in-out infinite}.z.hurt{filter:brightness(2.2) saturate(.3)}.z.dead{opacity:0;transform:translateY(8px) rotate(80deg);transition:all .7s}
.z-runner{--skin:#d9d65a;--cloth:#7a3a3a;transform:scale(.85)}.z-runner i{animation-duration:.22s}
.z-crawler{--skin:#6fb7a6;--cloth:#2f5b50;transform:scale(.8,.55)}
.z-brute{--skin:#7f8f63;--cloth:#3a4430;transform:scale(1.55)}.z-brute i{animation-duration:.9s}
.z-spitter{--skin:#b883d6;--cloth:#5a3a6e;transform:scale(1.05)}
.fx{position:absolute;height:2px;transform-origin:0 50%;pointer-events:none;z-index:5}
.fx.shot{background:linear-gradient(90deg,transparent,#fff6b0);height:2px}.fx.bolt{background:linear-gradient(90deg,transparent,#8dffb0);height:2px}.fx.spit{background:linear-gradient(90deg,transparent,#c58bff);height:4px;border-radius:3px}
.barrel{position:absolute;width:24px;height:30px;border-radius:6px;background:repeating-linear-gradient(#b3332b 0 6px,#8a1f1a 6px 8px);border:2px solid #4a0f0c;cursor:pointer;box-shadow:0 0 8px rgba(255,120,60,.5)}.barrel:after{content:"☢";position:absolute;inset:0;text-align:center;line-height:26px;color:#ffd166;font-size:12px}
.medkit{position:absolute;width:26px;height:22px;border-radius:4px;background:#f4f4f4;border:2px solid #e5393f;cursor:pointer;animation:glow 1.2s ease-in-out infinite alternate}.medkit:after{content:"+";position:absolute;inset:0;text-align:center;color:#e5393f;font-weight:900;line-height:18px}.medkit.taken{opacity:0;transform:scale(1.6);transition:all .3s;pointer-events:none}
.boom{position:absolute;width:20px;height:20px;margin:-10px;border-radius:50%;background:radial-gradient(#fff6b0,#ff8a3a 55%,transparent 70%);animation:boom .5s ease-out forwards;z-index:6}@keyframes boom{to{transform:scale(7);opacity:0}}
.gunring{position:absolute;border:1px dashed rgba(255,255,255,.18);border-radius:90px;pointer-events:none}.far:after{content:"OUT OF RANGE";position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);font-weight:900;color:#ffd166;font-size:16px;text-shadow:0 0 8px #000}
.noammo:after{content:"NO AMMO";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-weight:900;color:#ff6b6b;font-size:22px;text-shadow:0 0 8px #000}
.zb-won #shelter{box-shadow:0 0 30px #7bffa5}.zb-lost #shelter{filter:grayscale(.8) brightness(.7)}
@keyframes bob{50%{transform:translateY(-2px)}}@keyframes lunge{50%{transform:translateX(4px) rotate(6deg)}}@keyframes idle{50%{transform:translateY(-1px)}}
@keyframes flash{to{filter:brightness(1.8)}}@keyframes glow{to{box-shadow:0 0 12px #8bd88b}}
@media (prefers-reduced-motion:reduce){.z i,.survivor,.ammo-crate,.trap.firing{animation:none}[data-broken]{transition:none}}
</style><script>(function(){function f(){document.documentElement.style.setProperty('--k',String(innerWidth/600))}f();addEventListener('resize',f)})()<\/script>`;

export const WORLD_ID = (m) => `loc-${m.loc}`;

/** Files for the sandbox: trusted head (world CSS + mission scene CSS + config), learner CSS, world HTML, learner JS. mode: "preview" | "play" */
export function worldFiles(m, learner, mode, simSrc, opts = {}) {
  const f = { ...m.files, ...learner };
  const cfg = { mode, bot: !!opts.bot, speed: opts.speed || 1, waves: m.waves, ammo: m.ammo || 0, supplies: m.supplies || 0, shelterHp: m.shelterHp || 20, need: m.need, time: m.time || 80,
    bonuses: (m.bonuses || []).map((b) => ({ test: b.test, ammo: b.ammo, hp: b.hp, supplies: b.supplies })) };
  const head = WORLD_CSS + (m.sceneCss ? `<style>${m.sceneCss}</style>` : "") + `<script>window.__ZB=${JSON.stringify(cfg).replace(/</g, "\\u003c")}<\/script>` + `<script>${simSrc}<\/script>`;
  return { head, css: f.css || "", html: `<div id="stage" class="loc-${m.loc}"><div id="world">${f.html || ""}</div></div>`, js: f.js || "" };
}
