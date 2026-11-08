/*
  FAYAD i18n runtime (shared UI strings).

  Markup:   <span data-i18n="key"></span>
            <button data-i18n-attr="aria-label:key;title:key2"></button>
  Script:   FAYAD.i18n.extend({ ar: { key: "..." }, en: { key: "..." } })
            FAYAD.i18n.t("key", { name: "x" })      // {name} placeholders
  Code, API names and identifiers are never translated — only interface text.
  Missing keys fall back to the other language, then to the key itself (visible in tests).
*/
(function () {
  window.FAYAD = window.FAYAD || {};

  var dict = {
    ar: {
      "dock.label": "إعدادات العرض",
      "theme.toDark": "التبديل إلى الوضع الداكن",
      "theme.toLight": "التبديل إلى الوضع الفاتح",
      "lang.toEn": "Switch to English",
      "lang.toAr": "التبديل إلى العربية",
      "lang.short": "EN",
      "update.ready": "يتوفر إصدار جديد من المنصة.",
      "update.refresh": "تحديث الآن",
      "update.dismiss": "لاحقًا",
      "common.skip": "تخطي إلى المحتوى",
      "notice.untranslated": "المحتوى التعليمي لهذه الصفحة غير مترجم بعد؛ الواجهة والأزرار متاحة بالإنجليزية.",
    },
    en: {
      "dock.label": "Display settings",
      "theme.toDark": "Switch to dark theme",
      "theme.toLight": "Switch to light theme",
      "lang.toEn": "Switch to English",
      "lang.toAr": "Switch to Arabic",
      "lang.short": "AR",
      "update.ready": "A new version of the platform is available.",
      "update.refresh": "Refresh now",
      "update.dismiss": "Later",
      "common.skip": "Skip to content",
      "notice.untranslated": "The lesson content on this page is not translated yet; the interface and controls are already in English.",
    },
  };

  function currentLang() {
    return document.documentElement.getAttribute("data-lang") === "en" ? "en" : "ar";
  }

  function t(key, vars) {
    var lang = currentLang();
    var other = lang === "ar" ? "en" : "ar";
    var value = dict[lang][key];
    if (value === undefined) value = dict[other][key];
    if (value === undefined) return key;
    if (vars) {
      value = value.replace(/\{(\w+)\}/g, function (m, name) {
        return vars[name] !== undefined ? vars[name] : m;
      });
    }
    return value;
  }

  function apply(root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr")
        .split(";")
        .forEach(function (pair) {
          var parts = pair.split(":");
          if (parts.length === 2) el.setAttribute(parts[0].trim(), t(parts[1].trim()));
        });
    });
  }

  function extend(extra) {
    ["ar", "en"].forEach(function (lang) {
      if (extra && extra[lang]) Object.keys(extra[lang]).forEach(function (k) { dict[lang][k] = extra[lang][k]; });
    });
    apply();
  }

  window.FAYAD.i18n = { t: t, apply: apply, extend: extend, get lang() { return currentLang(); } };

  /* page <title>: English names for the Arabic page titles (the Arabic one is kept and restored) */
  var TITLES = { "الإعدادات": "Settings", "الحساب والملف الشخصي": "Account & profile", "المظهر": "Appearance", "اللغة والمنطقة": "Language & region", "تفضيلات التعلّم": "Learning preferences", "الإشعارات": "Notifications", "الخصوصية والأمان": "Privacy & security", "إمكانية الوصول": "Accessibility", "الألعاب": "Games", "ساحة التحديات": "Challenge Arena", "تسجيل الدخول": "Sign in", "لوحة التقدم": "Progress dashboard", "الملف الشخصي": "Profile", "أساسيات الكمبيوتر": "Computer Fundamentals", "أساسيات البرمجة": "Programming Fundamentals", "عبد الحميد فياض — عن المنصة": "Abdullhamid Fayad — About FAYBIT", "غير متصل": "Offline" };
  var arTitle = null;
  function applyTitle() {
    if (arTitle === null) arTitle = document.title;
    if (currentLang() !== "en") { document.title = arTitle; return; }
    var m = arTitle.match(/^(.*?)\s*([—|-])\s*FAYBIT$/); var m2 = arTitle.match(/^(.*?)\s*\|\s*FAYBIT$/);
    var head = (m && m[1]) || (m2 && m2[1]) || null;
    if (/[\u0600-\u06FF]/.test(arTitle)) document.title = (TITLES[arTitle.replace(/\s*[|—-]\s*FAYBIT$/, "")] || TITLES[head] || "FAYBIT") + (TITLES[arTitle.replace(/\s*[|—-]\s*FAYBIT$/, "")] || TITLES[head] ? " | FAYBIT" : "");
  }
  window.addEventListener("fayad:langchange", function () { apply(); applyTitle(); });
  document.addEventListener("DOMContentLoaded", function () { apply(); applyTitle(); document.documentElement.removeAttribute("data-i18n-pending"); });
})();
