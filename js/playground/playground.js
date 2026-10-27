/*
  FAYAD playground runner (Milestone 5, standalone).

  Runs learner code in a sandboxed iframe that has NO access to the site:
    - sandbox="allow-scripts" only. Never "allow-same-origin": the frame gets an opaque origin, so it cannot read
      localStorage / cookies / IndexedDB (including the Supabase session), cannot touch window.parent's DOM, and
      cannot navigate the top page.
    - Results come back over postMessage only. The parent accepts a message only if it came from THIS frame's
      window AND carries this run's random token.
    - "js" runtime executes inside a Worker created by the sandboxed frame; a watchdog terminates runaway loops.
    - alert/confirm/prompt are routed to the console panel (modals are not allowed in the sandbox).

  API
    const pg = FAYAD.playground.create(hostElement, {
      runtime: "html" | "js",          // "html": HTML+CSS+JS document preview.  "js": console-only JavaScript
      title: "Preview",                // accessible name of the iframe
      timeoutMs: 3000,                 // js runtime watchdog
      onConsole(entry),                // { level: "log|info|warn|error|result", text }
      onError({ message, line, column }),
      onStatus("running" | "done" | "timeout" | "error"),
    });
    pg.run({ html, css, js });          // html runtime
    pg.run({ js });                     // js runtime
    pg.stop(); pg.destroy();

  Nothing here executes learner code in the page's own realm and nothing is simulated.
*/
(function () {
  "use strict";
  window.FAYAD = window.FAYAD || {};

  var MAX_TEXT = 4000;

  // ---- code that runs INSIDE the sandbox (serialised into the frame) ----
  // Shared helper: safe, bounded stringification of any value.
  function helperSource() {
    return (
      "function __fmt(v,d){d=d||0;try{" +
      "if(v===null)return'null';if(v===undefined)return'undefined';" +
      "var t=typeof v;if(t==='string')return d?JSON.stringify(v):v;" +
      "if(t==='number'||t==='boolean'||t==='bigint')return String(v);" +
      "if(t==='symbol')return v.toString();" +
      "if(t==='function')return'[Function'+(v.name?': '+v.name:'')+']';" +
      "if(v instanceof Error)return v.name+': '+v.message;" +
      "if(typeof Node!=='undefined'&&v instanceof Node)return'<'+(v.nodeName||'node').toLowerCase()+'>';" +
      "if(d>3)return'…';" +
      "if(Array.isArray(v))return'['+v.slice(0,50).map(function(x){return __fmt(x,d+1)}).join(', ')+(v.length>50?', …':'')+']';" +
      "var seen=__fmt.s||(__fmt.s=[]);if(seen.indexOf(v)>-1)return'[Circular]';seen.push(v);" +
      "var keys=Object.keys(v).slice(0,50);var out='{'+keys.map(function(k){return k+': '+__fmt(v[k],d+1)}).join(', ')+'}';" +
      "seen.pop();return out}catch(e){return'[Unprintable]'}}" +
      "function __txt(a){return Array.prototype.map.call(a,function(x){return __fmt(x)}).join(' ').slice(0," + MAX_TEXT + ")}"
    );
  }

  // Worker body for the "js" runtime (runs in a Worker inside the opaque-origin frame).
  function workerSource() {
    return (
      helperSource() +
      "var __post=function(type,extra){var m={type:type};for(var k in extra)m[k]=extra[k];self.postMessage(m)};" +
      "['log','info','warn','error','debug'].forEach(function(l){console[l]=function(){__post('console',{level:l==='debug'?'log':l,text:__txt(arguments)})}});" +
      "self.alert=function(m){__post('console',{level:'info',text:'alert: '+__fmt(m)})};" +
      "self.confirm=function(m){__post('console',{level:'info',text:'confirm: '+__fmt(m)});return false};" +
      "self.prompt=function(m){__post('console',{level:'info',text:'prompt: '+__fmt(m)});return null};" +
      "self.onmessage=function(e){var code=e.data;" +
      "try{var r=(0,eval)(code);if(r!==undefined)__post('console',{level:'result',text:__fmt(r,1)})}" +
      "catch(err){__post('error',{message:(err&&err.name?err.name+': ':'')+(err&&err.message?err.message:String(err))})}" +
      "var p=self.__pending||0;Promise.resolve().then(function(){setTimeout(function(){__post('done')},0)})}"
    );
  }

  function jsFrameSource(token, code, timeoutMs) {
    var wsrc = workerSource();
    return (
      "<!doctype html><meta charset=utf-8><body><script>(function(){" +
      "var T=" + JSON.stringify(token) + ",TO=" + Number(timeoutMs) + ";" +
      "function send(m){m.fayad=1;m.token=T;parent.postMessage(m,'*')}" +
      "var w,timer,finished=false;" +
      "function finish(t){if(finished)return;finished=true;clearTimeout(timer);try{w.terminate()}catch(e){}send({type:t})}" +
      "try{w=new Worker(URL.createObjectURL(new Blob([" + JSON.stringify(wsrc) + "],{type:'text/javascript'})))}" +
      "catch(e){send({type:'error',message:'Worker unavailable: '+e.message});send({type:'done'});return}" +
      "w.onmessage=function(e){var d=e.data;if(d.type==='done')return finish('done');send(d)};" +
      "w.onerror=function(e){e.preventDefault&&e.preventDefault();send({type:'error',message:e.message||'Error',line:e.lineno,column:e.colno});finish('done')};" +
      "timer=setTimeout(function(){send({type:'error',message:'Timed out after '+TO+' ms (possible infinite loop). Execution was stopped.'});finish('timeout')},TO);" +
      "w.postMessage(" + JSON.stringify(String(code)) + ")" +
      "})()<\/script>"
    );
  }

  function htmlBootstrap(token) {
    return (
      "<script>(function(){" +
      helperSource() +
      "var T=" + JSON.stringify(token) + ";" +
      "function send(m){m.fayad=1;m.token=T;parent.postMessage(m,'*')}" +
      "['log','info','warn','error','debug'].forEach(function(l){var o=console[l];console[l]=function(){send({type:'console',level:l==='debug'?'log':l,text:__txt(arguments)})}});" +
      "window.alert=function(m){send({type:'console',level:'info',text:'alert: '+__fmt(m)})};" +
      "window.confirm=function(m){send({type:'console',level:'info',text:'confirm: '+__fmt(m)});return false};" +
      "window.prompt=function(m){send({type:'console',level:'info',text:'prompt: '+__fmt(m)});return null};" +
      "window.addEventListener('error',function(e){send({type:'error',message:e.message||'Error',line:e.lineno,column:e.colno})});" +
      "window.addEventListener('unhandledrejection',function(e){send({type:'error',message:'Unhandled promise rejection: '+__fmt(e.reason)})});" +
      "document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');" +
      "if(a&&a.getAttribute('href').charAt(0)!=='#'){e.preventDefault();send({type:'console',level:'info',text:'Navigation is disabled in the preview: '+a.getAttribute('href')})}},true);" +
      "document.addEventListener('submit',function(e){e.preventDefault()},true);" +
      "window.addEventListener('load',function(){send({type:'done'})});" +
      "})()<\/script>"
    );
  }

  function htmlDocument(token, files) {
    var css = files.css ? "<style>" + String(files.css).replace(/<\/style/gi, "<\\/style") + "</style>" : "";
    var js = files.js ? "<script>" + String(files.js).replace(/<\/script/gi, "<\\/script") + "<\/script>" : "";
    var body = files.html != null ? String(files.html) : "";
    return "<!doctype html><meta charset=utf-8>" + htmlBootstrap(token) + css + body + js;
  }

  function randomToken() {
    var a = new Uint8Array(16);
    (window.crypto || window.msCrypto).getRandomValues(a);
    return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }

  function create(host, opts) {
    opts = opts || {};
    var runtime = opts.runtime === "js" ? "js" : "html";
    var timeoutMs = Number(opts.timeoutMs) > 0 ? Number(opts.timeoutMs) : 3000;
    var frame = null;
    var token = null;
    var destroyed = false;

    function status(s) { if (typeof opts.onStatus === "function") opts.onStatus(s); }

    function onMessage(event) {
      if (!frame || event.source !== frame.contentWindow) return; // must come from OUR frame
      var d = event.data;
      if (!d || d.fayad !== 1 || d.token !== token) return; // and carry THIS run's token
      if (d.type === "console" && typeof opts.onConsole === "function") {
        opts.onConsole({ level: String(d.level || "log"), text: String(d.text == null ? "" : d.text).slice(0, MAX_TEXT) });
      } else if (d.type === "error") {
        if (typeof opts.onError === "function") opts.onError({ message: String(d.message || "Error").slice(0, MAX_TEXT), line: d.line, column: d.column });
        status("error");
      } else if (d.type === "done") {
        status("done");
      } else if (d.type === "timeout") {
        status("timeout");
      }
    }
    window.addEventListener("message", onMessage);

    function mount() {
      if (frame) frame.remove();
      frame = document.createElement("iframe");
      frame.className = "fy-playground-frame";
      frame.setAttribute("title", opts.title || "Preview");
      frame.setAttribute("sandbox", "allow-scripts"); // deliberately NOT allow-same-origin
      frame.setAttribute("referrerpolicy", "no-referrer");
      frame.setAttribute("allow", "");
      frame.setAttribute("loading", "eager");
      if (runtime === "js") { frame.style.cssText = "width:0;height:0;border:0;position:absolute;visibility:hidden"; frame.setAttribute("aria-hidden", "true"); }
      else frame.style.cssText = "width:100%;height:100%;border:0;background:#fff;display:block";
      host.appendChild(frame);
      return frame;
    }

    return {
      run: function (files) {
        if (destroyed) return;
        files = files || {};
        token = randomToken();
        mount();
        status("running");
        frame.srcdoc = runtime === "js" ? jsFrameSource(token, files.js || "", timeoutMs) : htmlDocument(token, files);
      },
      stop: function () {
        token = null; // late messages from the old run are now ignored
        if (frame) { frame.remove(); frame = null; }
      },
      destroy: function () {
        destroyed = true;
        window.removeEventListener("message", onMessage);
        token = null;
        if (frame) { frame.remove(); frame = null; }
      },
      get frame() { return frame; },
    };
  }

  window.FAYAD.playground = { create: create };
})();
