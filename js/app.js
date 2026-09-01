/* =========================================================
   FAYAD — UNIVERSAL APPLICATION ENGINE
   ---------------------------------------------------------
   Includes:
   1. Global Menu
   2. Arabic / English Language System
   3. Learning Engine
   4. Progress
   5. Lessons
   6. Code Editor
   7. Live Preview
   ========================================================= */

/* =========================================================
   GLOBAL LANGUAGE SYSTEM
   ========================================================= */

const FAYAD_TRANSLATIONS = {
  en: {
    nav: {
      home: "Home",
      tracks: "Tracks",
      practice: "Practice",
      projects: "Projects",
    },

    menu: {
      label: "FAYAD",
      title: "Explore",

      learning: "Learning",

      webFundamentals: "Web Fundamentals",
      webFundamentalsDesc: "HTML, CSS, JavaScript",

      frameworks: "Front-End Frameworks",
      frameworksDesc: "React, Angular, Vue",

      technologies: "Technologies",

      htmlDesc: "Structure of the Web",
      cssDesc: "Design & Styling",
      javascriptDesc: "Logic & Interaction",

      frameworksSection: "Frameworks",

      reactDesc: "Component-based UI",
      angularDesc: "Structured applications",
      vueDesc: "Progressive UI framework",

      fundamentals: "Fundamentals",

      computerBasics: "Computer Basics",
      computerBasicsDesc: "Computer concepts & history",

      programmingBasics: "Programming Basics",
      programmingBasicsDesc: "Programming concepts & history",

      about: "About",

      aboutFayad: "About Abdullhamid Fayad",
      aboutFayadDesc: "Learn more about the creator",

      connect: "Connect",

      phone: "Phone",
    },

    hero: {
      eyebrow: "MODERN WEB LEARNING PLATFORM",

      learn: "Learn.",
      build: "Build.",
      become: "Become.",

      description:
        "Master modern Front-End development through interactive lessons, real projects, coding challenges, and practice.",

      startLearning: "Start Learning",

      explorePractice: "Explore Practice",

      profileAlt: "Abdullhamid Fayad",
    },

    tracks: {
      eyebrow: "LEARNING PATHS",

      title: "Choose your path.",

      description: "Start with the fundamentals, then move into modern Front-End frameworks.",

      webFundamentals: "Web Fundamentals",

      webFundamentalsDesc: "Master the core technologies of the web.",

      htmlDesc: "Build the structure and meaning of modern websites.",

      cssDesc: "Design responsive and beautiful user interfaces.",

      javascriptDesc: "Add logic, behavior, and interaction to your websites.",

      frontendFrameworks: "Front-End Frameworks",

      frontendFrameworksDesc: "Build scalable and modern web applications.",

      reactDesc: "Build modern component-based user interfaces.",

      angularDesc: "Learn structured development for large-scale applications.",

      vueDesc: "Build flexible and progressive user interfaces.",

      startLearning: "Start Learning →",

      exploreReact: "Explore React →",

      exploreAngular: "Explore Angular →",

      exploreVue: "Explore Vue →",
    },

    practice: {
      eyebrow: "PRACTICE",

      title: "Don't just learn.",

      highlight: "Practice.",

      description: "Write code, see the result, solve challenges, and test your knowledge.",
    },

    projects: {
      eyebrow: "REAL PROJECTS",

      title: "Build something real.",

      description: "Turn what you learn into projects you can actually put in your portfolio.",
    },

    footer: "© 2026 FAYAD. Built by Abdullhamid Fayad.",
  },

  ar: {
    nav: {
      home: "الرئيسية",
      tracks: "المسارات",
      practice: "التدريب",
      projects: "المشاريع",
    },

    menu: {
      label: "فَيّاض",

      title: "استكشف",

      learning: "التعلّم",

      webFundamentals: "أساسيات الويب",
      webFundamentalsDesc: "HTML، CSS، JavaScript",

      frameworks: "أطر عمل الواجهة الأمامية",
      frameworksDesc: "React، Angular، Vue",

      technologies: "التقنيات",

      htmlDesc: "بناء هيكل الويب",

      cssDesc: "التصميم وتنسيق الواجهات",

      javascriptDesc: "المنطق والتفاعل",

      frameworksSection: "أطر العمل",

      reactDesc: "واجهات مبنية على المكونات",

      angularDesc: "تطبيقات منظمة وقابلة للتوسع",

      vueDesc: "إطار عمل مرن وتدريجي",

      fundamentals: "الأساسيات",

      computerBasics: "أساسيات الحاسوب",

      computerBasicsDesc: "مفاهيم الحاسوب وتاريخه",

      programmingBasics: "أساسيات البرمجة",

      programmingBasicsDesc: "مفاهيم البرمجة وتاريخها",

      about: "عن فياض",

      aboutFayad: "عن عبدالحميد فياض",

      aboutFayadDesc: "تعرف أكثر على منشئ المنصة",

      connect: "تواصل",

      phone: "الهاتف",
    },

    hero: {
      eyebrow: "منصة حديثة لتعلم تطوير الويب",

      learn: "تعلّم.",

      build: "ابنِ.",

      become: "تطوّر.",

      description:
        "أتقن تطوير الواجهة الأمامية الحديثة من خلال دروس تفاعلية ومشاريع حقيقية وتحديات برمجية وتدريب عملي.",

      startLearning: "ابدأ التعلم",

      explorePractice: "استكشف التدريب",

      profileAlt: "عبدالحميد فياض",
    },

    tracks: {
      eyebrow: "مسارات التعلم",

      title: "اختر مسارك.",

      description: "ابدأ بالأساسيات ثم انتقل إلى أطر عمل الواجهة الأمامية الحديثة.",

      webFundamentals: "أساسيات الويب",

      webFundamentalsDesc: "أتقن التقنيات الأساسية التي يقوم عليها الويب.",

      htmlDesc: "ابنِ هيكل ومعنى مواقع الويب الحديثة.",

      cssDesc: "صمم واجهات جميلة ومتجاوبة.",

      javascriptDesc: "أضف المنطق والسلوك والتفاعل إلى مواقعك.",

      frontendFrameworks: "أطر عمل الواجهة الأمامية",

      frontendFrameworksDesc: "ابنِ تطبيقات ويب حديثة وقابلة للتوسع.",

      reactDesc: "ابنِ واجهات مستخدم حديثة تعتمد على المكونات.",

      angularDesc: "تعلم تطوير التطبيقات المنظمة والكبيرة.",

      vueDesc: "ابنِ واجهات مرنة وتدريجية.",

      startLearning: "ابدأ التعلم ←",

      exploreReact: "استكشف React ←",

      exploreAngular: "استكشف Angular ←",

      exploreVue: "استكشف Vue ←",
    },

    practice: {
      eyebrow: "التدريب",

      title: "لا تتعلم فقط.",

      highlight: "طبّق.",

      description: "اكتب الكود، شاهد النتيجة، حل التحديات واختبر معرفتك.",
    },

    projects: {
      eyebrow: "مشاريع حقيقية",

      title: "ابنِ شيئًا حقيقيًا.",

      description: "حوّل ما تتعلمه إلى مشاريع يمكنك إضافتها فعليًا إلى معرض أعمالك.",
    },

    footer: "© 2026 FAYAD. تم بناء المنصة بواسطة عبدالحميد فياض.",
  },
};

/* =========================================================
   LANGUAGE STATE
   ========================================================= */

const LANGUAGE_STORAGE_KEY = "fayad-language";

let currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";

/* =========================================================
   GET TRANSLATION
   ========================================================= */

function getTranslation(key) {
  const parts = key.split(".");

  let value = FAYAD_TRANSLATIONS[currentLanguage];

  for (const part of parts) {
    if (value && Object.prototype.hasOwnProperty.call(value, part)) {
      value = value[part];
    } else {
      return key;
    }
  }

  return value;
}

/* =========================================================
   APPLY LANGUAGE
   ========================================================= */

function applyLanguage() {
  const html = document.documentElement;

  html.lang = currentLanguage;

  html.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  /* ---------------------------------------------
     Text translations
  --------------------------------------------- */

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    const translation = getTranslation(key);

    if (translation !== key) {
      element.textContent = translation;
    }
  });

  /* ---------------------------------------------
     ALT translations
  --------------------------------------------- */

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.getAttribute("data-i18n-alt");

    const translation = getTranslation(key);

    if (translation !== key) {
      element.setAttribute("alt", translation);
    }
  });

  /* ---------------------------------------------
     Language button
  --------------------------------------------- */

  const languageLabel = document.getElementById("languageLabel");

  const languageToggle = document.getElementById("languageToggle");

  if (languageLabel) {
    languageLabel.textContent = currentLanguage === "en" ? "AR" : "EN";
  }

  if (languageToggle) {
    languageToggle.setAttribute("aria-pressed", currentLanguage === "ar" ? "true" : "false");

    languageToggle.setAttribute("aria-label", currentLanguage === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية");
  }

  /* ---------------------------------------------
     Save language
  --------------------------------------------- */

  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
}

/* =========================================================
   TOGGLE LANGUAGE
   ========================================================= */

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";

  applyLanguage();
}

/* =========================================================
   LANGUAGE EVENTS
   ========================================================= */

function setupLanguage() {
  const languageToggle = document.getElementById("languageToggle");

  if (!languageToggle) {
    return;
  }

  languageToggle.addEventListener("click", toggleLanguage);

  applyLanguage();
}

/* =========================================================
   MENU
   ========================================================= */

function setupMenu() {
  const menuToggle = document.getElementById("menuToggle");

  const menuClose = document.getElementById("menuClose");

  const siteMenu = document.getElementById("siteMenu");

  const menuOverlay = document.getElementById("menuOverlay");

  if (!menuToggle || !siteMenu) {
    return;
  }

  /* ---------------------------------------------
     Open menu
  --------------------------------------------- */

  function openMenu() {
    siteMenu.classList.add("active");

    if (menuOverlay) {
      menuOverlay.classList.add("active");
    }

    menuToggle.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");

    siteMenu.setAttribute("aria-hidden", "false");

    if (menuOverlay) {
      menuOverlay.setAttribute("aria-hidden", "false");
    }

    document.body.classList.add("menu-open");
  }

  /* ---------------------------------------------
     Close menu
  --------------------------------------------- */

  function closeMenu() {
    siteMenu.classList.remove("active");

    if (menuOverlay) {
      menuOverlay.classList.remove("active");
    }

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    siteMenu.setAttribute("aria-hidden", "true");

    if (menuOverlay) {
      menuOverlay.setAttribute("aria-hidden", "true");
    }

    document.body.classList.remove("menu-open");
  }

  /* ---------------------------------------------
     Toggle
  --------------------------------------------- */

  menuToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* ---------------------------------------------
     Close button
  --------------------------------------------- */

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  /* ---------------------------------------------
     Overlay
  --------------------------------------------- */

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  /* ---------------------------------------------
     Close after clicking menu link
  --------------------------------------------- */

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(closeMenu, 100);
    });
  });

  /* ---------------------------------------------
     ESC
  --------------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteMenu.classList.contains("active")) {
      closeMenu();
    }
  });
}

/* =========================================================
   COURSE CONFIGURATION
   ========================================================= */

const COURSE_CONFIG = {
  html: {
    name: "HTML",
    fullName: "HTML Learning Path",
    storageKey: "fayad-html-progress",
    lessonsFile: "data/html-lessons.js",
  },

  css: {
    name: "CSS",
    fullName: "CSS Learning Path",
    storageKey: "fayad-css-progress",
    lessonsFile: "data/css-lessons.js",
  },

  javascript: {
    name: "JavaScript",
    fullName: "JavaScript Learning Path",
    storageKey: "fayad-javascript-progress",
    lessonsFile: "data/javascript-lessons.js",
  },

  react: {
    name: "React",
    fullName: "React Learning Path",
    storageKey: "fayad-react-progress",
    lessonsFile: "data/react-lessons.js",
  },

  vue: {
    name: "Vue",
    fullName: "Vue Learning Path",
    storageKey: "fayad-vue-progress",
    lessonsFile: "data/vue-lessons.js",
  },

  angular: {
    name: "Angular",
    fullName: "Angular Learning Path",
    storageKey: "fayad-angular-progress",
    lessonsFile: "data/angular-lessons.js",
  },
};

/* =========================================================
   DETECT CURRENT COURSE
   ========================================================= */

function detectCourse() {
  const bodyCourse = document.body?.dataset?.course?.toLowerCase();

  if (bodyCourse && COURSE_CONFIG[bodyCourse]) {
    return bodyCourse;
  }

  const path = window.location.pathname.toLowerCase();

  if (path.includes("javascript") || path.includes("js-learning")) {
    return "javascript";
  }

  if (path.includes("angular")) {
    return "angular";
  }

  if (path.includes("react")) {
    return "react";
  }

  if (path.includes("vue")) {
    return "vue";
  }

  if (path.includes("css")) {
    return "css";
  }

  if (path.includes("html")) {
    return "html";
  }

  return null;
}

const currentCourse = detectCourse();

const courseConfig = currentCourse ? COURSE_CONFIG[currentCourse] : null;

/* =========================================================
   LEARNING ENGINE DOM
   ========================================================= */

let lessonLinks;
let lessonNumber;
let lessonTitle;
let lessonDescription;
let lessonHeading;
let lessonContent;

let keyTitle;
let keyDescription;

let exampleCode;
let exampleResult;

let challengeText;

let codeEditor;
let livePreview;

let codeExplanation;

let question;
let answerOptions;
let answerFeedback;

let previousButton;
let nextButton;

let previousTitle;
let nextTitle;

let progressText;
let progressFill;

let copyButton;
let runButton;
let resetButton;

/* =========================================================
   STATE
   ========================================================= */

let lessons = [];

let currentLesson = 0;

let completedLessons = [];

/* =========================================================
   CHECK IF THIS IS A LEARNING PAGE
   ========================================================= */

function isLearningPage() {
  return Boolean(document.getElementById("lesson-content") || document.querySelector(".lesson"));
}

/* =========================================================
   GET DOM ELEMENTS
   ========================================================= */

function getDOMElements() {
  lessonLinks = document.querySelectorAll(".lesson");

  lessonNumber = document.getElementById("lesson-number");

  lessonTitle = document.getElementById("lesson-title");

  lessonDescription = document.getElementById("lesson-description");

  lessonHeading = document.getElementById("lesson-heading");

  lessonContent = document.getElementById("lesson-content");

  keyTitle = document.getElementById("key-title");

  keyDescription = document.getElementById("key-description");

  exampleCode = document.getElementById("example-code");

  exampleResult = document.getElementById("example-result");

  challengeText = document.getElementById("challenge-text");

  codeEditor = document.getElementById("code-editor");

  livePreview = document.getElementById("live-preview");

  codeExplanation = document.getElementById("code-explanation");

  question = document.getElementById("question");

  answerOptions = document.getElementById("answer-options");

  answerFeedback = document.getElementById("answer-feedback");

  previousButton = document.getElementById("previous-btn");

  nextButton = document.getElementById("next-btn");

  previousTitle = document.getElementById("previous-title");

  nextTitle = document.getElementById("next-title");

  progressText = document.getElementById("progress-text");

  progressFill = document.getElementById("progress-fill");

  copyButton = document.getElementById("copy-btn");

  runButton = document.getElementById("run-code");

  resetButton = document.getElementById("reset-code");
}

/* =========================================================
   LOAD PROGRESS
   ========================================================= */

function loadProgress() {
  if (!courseConfig) {
    return [];
  }

  try {
    const saved = localStorage.getItem(courseConfig.storageKey);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(Number)
      .filter(Number.isInteger)
      .filter((index) => index >= 0);
  } catch (error) {
    console.warn("FAYAD: Could not load progress.", error);

    return [];
  }
}

/* =========================================================
   SAVE PROGRESS
   ========================================================= */

function saveProgress() {
  if (!courseConfig) {
    return;
  }

  try {
    localStorage.setItem(courseConfig.storageKey, JSON.stringify(completedLessons));
  } catch (error) {
    console.warn("FAYAD: Could not save progress.", error);
  }
}

/* =========================================================
   LOAD LESSON FILE
   ========================================================= */

function loadLessonFile() {
  if (!courseConfig) {
    return Promise.reject(new Error("No course detected."));
  }

  return new Promise((resolve, reject) => {
    if (Array.isArray(window.FAYAD_LESSONS) && window.FAYAD_LESSONS.length) {
      resolve(window.FAYAD_LESSONS);

      return;
    }

    const script = document.createElement("script");

    script.src = courseConfig.lessonsFile;

    script.async = false;

    script.onload = () => {
      if (Array.isArray(window.FAYAD_LESSONS)) {
        resolve(window.FAYAD_LESSONS);

        return;
      }

      if (Array.isArray(window.lessons)) {
        resolve(window.lessons);

        return;
      }

      reject(new Error(`Lesson file loaded but no lesson data was found: ${courseConfig.lessonsFile}`));
    };

    script.onerror = () => {
      reject(new Error(`Could not load lesson file: ${courseConfig.lessonsFile}`));
    };

    document.head.appendChild(script);
  });
}

/* =========================================================
   SAFE TEXT
   ========================================================= */

function setText(element, value) {
  if (!element) {
    return;
  }

  element.textContent = value ?? "";
}

/* =========================================================
   SAFE HTML
   ========================================================= */

function setHTML(element, value) {
  if (!element) {
    return;
  }

  element.innerHTML = value ?? "";
}

/* =========================================================
   LOAD LESSON
   ========================================================= */

function loadLesson(index) {
  if (!lessons.length) {
    console.warn(`FAYAD: No lessons found for ${currentCourse}.`);

    return;
  }

  index = Number(index);

  if (!Number.isInteger(index)) {
    index = 0;
  }

  if (index < 0) {
    index = 0;
  }

  if (index >= lessons.length) {
    index = lessons.length - 1;
  }

  currentLesson = index;

  const lesson = lessons[currentLesson];

  if (!lesson) {
    console.warn(`FAYAD: Lesson ${currentLesson} does not exist.`);

    return;
  }

  setText(lessonNumber, `LESSON ${String(currentLesson + 1).padStart(2, "0")}`);

  setText(lessonTitle, lesson.title);

  setText(lessonDescription, lesson.description);

  setText(lessonHeading, lesson.heading);

  setHTML(lessonContent, lesson.content);

  setText(keyTitle, lesson.keyTitle);

  setText(keyDescription, lesson.keyDescription);

  setText(exampleCode, lesson.example);

  renderExample(lesson);

  setText(challengeText, lesson.challenge);

  if (codeEditor) {
    codeEditor.value = lesson.starterCode || "";
  }

  setHTML(codeExplanation, lesson.explanation);

  setText(question, lesson.question);

  createAnswers(lesson);

  updateNavigation();

  updateSidebar();

  updateProgress();

  runCode();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* =========================================================
   RENDER EXAMPLE
   ========================================================= */

function renderExample(lesson) {
  if (!exampleResult) {
    return;
  }

  if (currentCourse === "html") {
    exampleResult.innerHTML = lesson.example || "";

    return;
  }

  if (currentCourse === "css") {
    exampleResult.innerHTML = `

      <style>
        ${lesson.css || lesson.example || ""}
      </style>

      ${lesson.html || ""}

    `;

    return;
  }

  if (currentCourse === "javascript") {
    exampleResult.innerHTML = `

      <div class="js-example-result">

        <p>
          JavaScript example
        </p>

        <pre>${escapeHTML(lesson.example || "")}</pre>

      </div>

    `;

    return;
  }

  exampleResult.innerHTML =
    lesson.exampleResult ||
    `

      <pre>${escapeHTML(lesson.example || "")}</pre>

    `;
}

/* =========================================================
   SIDEBAR
   ========================================================= */

function updateSidebar() {
  if (!lessonLinks) {
    return;
  }

  lessonLinks.forEach((link, index) => {
    link.classList.remove("active");

    link.classList.remove("completed");

    link.classList.remove("unlocked");

    const status = link.querySelector(".lesson-status");

    if (status) {
      status.classList.remove("current");
    }

    if (completedLessons.includes(index)) {
      link.classList.add("completed");
    }

    if (index === currentLesson) {
      link.classList.add("active");

      if (status) {
        status.classList.add("current");
      }
    }

    if (index === 0 || completedLessons.includes(index) || completedLessons.includes(index - 1)) {
      link.classList.add("unlocked");
    }
  });
}

/* =========================================================
   PROGRESS
   ========================================================= */

function updateProgress() {
  if (!lessons.length) {
    setText(progressText, "0%");

    if (progressFill) {
      progressFill.style.width = "0%";
    }

    return;
  }

  completedLessons = completedLessons.filter((index) => index >= 0 && index < lessons.length);

  const progress = Math.round((completedLessons.length / lessons.length) * 100);

  setText(progressText, `${progress}%`);

  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function updateNavigation() {
  if (!previousButton || !nextButton) {
    return;
  }

  if (currentLesson === 0) {
    setText(previousTitle, "Home");
  } else {
    setText(previousTitle, lessons[currentLesson - 1]?.title || "Previous Lesson");
  }

  if (currentLesson === lessons.length - 1) {
    setText(nextTitle, "Course Complete");
  } else {
    setText(nextTitle, lessons[currentLesson + 1]?.title || "Next Lesson");
  }
}

/* =========================================================
   CREATE ANSWERS
   ========================================================= */

function createAnswers(lesson) {
  if (!answerOptions) {
    return;
  }

  answerOptions.innerHTML = "";

  if (answerFeedback) {
    answerFeedback.textContent = "";

    answerFeedback.className = "answer-feedback";
  }

  if (!Array.isArray(lesson.answers)) {
    return;
  }

  lesson.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";

    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(button, index, lesson.correctAnswer);
    });

    answerOptions.appendChild(button);
  });
}

/* =========================================================
   CHECK ANSWER
   ========================================================= */

function checkAnswer(selectedButton, selectedIndex, correctIndex) {
  if (!answerOptions) {
    return;
  }

  const buttons = answerOptions.querySelectorAll("button");

  buttons.forEach((button) => {
    button.classList.remove("correct");

    button.classList.remove("wrong");
  });

  if (Number(selectedIndex) === Number(correctIndex)) {
    selectedButton.classList.add("correct");

    if (answerFeedback) {
      answerFeedback.textContent = "✓ Correct! Great job.";

      answerFeedback.className = "answer-feedback correct";
    }

    completeLesson(currentLesson);

    unlockNextLesson();
  } else {
    selectedButton.classList.add("wrong");

    if (answerFeedback) {
      answerFeedback.textContent = "✕ Not quite. Try again.";

      answerFeedback.className = "answer-feedback wrong";
    }
  }
}

/* =========================================================
   COMPLETE LESSON
   ========================================================= */

function completeLesson(index) {
  if (completedLessons.includes(index)) {
    return;
  }

  completedLessons.push(index);

  completedLessons.sort((a, b) => a - b);

  saveProgress();

  updateSidebar();

  updateProgress();
}

/* =========================================================
   UNLOCK NEXT LESSON
   ========================================================= */

function unlockNextLesson() {
  const nextIndex = currentLesson + 1;

  if (nextIndex >= lessons.length) {
    return;
  }

  const nextLink = document.querySelector(`.lesson[data-lesson="${nextIndex}"]`);

  if (nextLink) {
    nextLink.classList.add("unlocked");
  }
}

/* =========================================================
   CODE EDITOR
   ========================================================= */

function runCode() {
  if (!codeEditor || !livePreview) {
    return;
  }

  const code = codeEditor.value || "";

  if (currentCourse === "html") {
    livePreview.srcdoc = createHTMLPreview(code);

    return;
  }

  if (currentCourse === "css") {
    livePreview.srcdoc = createCSSPreview(code);

    return;
  }

  if (currentCourse === "javascript") {
    livePreview.srcdoc = createJavaScriptPreview(code);

    return;
  }

  livePreview.srcdoc = createGenericPreview(code);
}

/* =========================================================
   HTML PREVIEW
   ========================================================= */

function createHTMLPreview(code) {
  return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<style>

body {

  font-family:
    Arial,
    sans-serif;

  padding:
    25px;

  color:
    #152536;

  background:
    #ffffff;
}


h1 {

  color:
    #0b5db4;
}


h2 {

  color:
    #0b5db4;
}


button {

  padding:
    10px 16px;

  border:
    none;

  border-radius:
    8px;

  background:
    #0e807a;

  color:
    white;

  cursor:
    pointer;
}


a {

  color:
    #0b5db4;
}

</style>

</head>

<body>

${code}

</body>

</html>

`;
}

/* =========================================================
   CSS PREVIEW
   ========================================================= */

function createCSSPreview(code) {
  return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<style>

${code}

</style>

</head>

<body>

<div class="preview-container">

  <h1>
    FAYAD CSS Preview
  </h1>

  <p>
    This content is styled
    using your CSS code.
  </p>

  <button>
    Example Button
  </button>

</div>

</body>

</html>

`;
}

/* =========================================================
   JAVASCRIPT PREVIEW
   ========================================================= */

function createJavaScriptPreview(code) {
  return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<style>

body {

  font-family:
    Arial,
    sans-serif;

  padding:
    25px;

  color:
    #152536;
}


button {

  padding:
    10px 16px;

  border:
    none;

  border-radius:
    8px;

  background:
    #0b5db4;

  color:
    white;

  cursor:
    pointer;
}

</style>

</head>

<body>

<h1>
  JavaScript Preview
</h1>

<p id="output">
  Your JavaScript result will appear here.
</p>

<button id="demoButton">
  Click Me
</button>

<script>

try {

  ${code}

} catch (error) {

  const output =
    document.getElementById(
      "output"
    );

  if (output) {

    output.textContent =
      "Error: " +
      error.message;

  }

}

<\/script>

</body>

</html>

`;
}

/* =========================================================
   GENERIC PREVIEW
   ========================================================= */

function createGenericPreview(code) {
  return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<style>

body {

  font-family:
    Arial,
    sans-serif;

  padding:
    25px;

  color:
    #152536;
}

</style>

</head>

<body>

<div id="app">

${code}

</div>

</body>

</html>

`;
}

/* =========================================================
   COPY CODE
   ========================================================= */

async function copyCurrentExample() {
  if (!copyButton) {
    return;
  }

  const lesson = lessons[currentLesson];

  if (!lesson) {
    return;
  }

  const code = lesson.example || "";

  try {
    await navigator.clipboard.writeText(code);

    copyButton.textContent = "Copied!";

    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1200);
  } catch (error) {
    console.warn("FAYAD: Copy failed.", error);

    copyButton.textContent = "Failed";

    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1200);
  }
}

/* =========================================================
   RESET CODE
   ========================================================= */

function resetCode() {
  if (!codeEditor) {
    return;
  }

  const lesson = lessons[currentLesson];

  if (!lesson) {
    return;
  }

  codeEditor.value = lesson.starterCode || "";

  runCode();
}

/* =========================================================
   SIDEBAR EVENTS
   ========================================================= */

function setupSidebarEvents() {
  if (!lessonLinks) {
    return;
  }

  lessonLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const index = Number(link.dataset.lesson);

      if (Number.isNaN(index)) {
        return;
      }

      loadLesson(index);
    });
  });
}

/* =========================================================
   PREVIOUS BUTTON
   ========================================================= */

function setupPreviousButton() {
  if (!previousButton) {
    return;
  }

  previousButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (currentLesson > 0) {
      loadLesson(currentLesson - 1);
    } else {
      window.location.href = "../index.html";
    }
  });
}

/* =========================================================
   NEXT BUTTON
   ========================================================= */

function setupNextButton() {
  if (!nextButton) {
    return;
  }

  nextButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (currentLesson < lessons.length - 1) {
      loadLesson(currentLesson + 1);
    } else {
      alert(`🎉 Congratulations! You completed the ${courseConfig.name} Learning Path.`);
    }
  });
}

/* =========================================================
   RUN BUTTON
   ========================================================= */

function setupRunButton() {
  if (!runButton) {
    return;
  }

  runButton.addEventListener("click", () => {
    runCode();

    runButton.textContent = "Running...";

    setTimeout(() => {
      runButton.textContent = "Run Code";
    }, 500);
  });
}

/* =========================================================
   LIVE CODE UPDATE
   ========================================================= */

function setupCodeEditor() {
  if (!codeEditor) {
    return;
  }

  codeEditor.addEventListener("input", () => {
    runCode();
  });
}

/* =========================================================
   RESET BUTTON
   ========================================================= */

function setupResetButton() {
  if (!resetButton) {
    return;
  }

  resetButton.addEventListener("click", () => {
    resetCode();
  });
}

/* =========================================================
   COPY BUTTON
   ========================================================= */

function setupCopyButton() {
  if (!copyButton) {
    return;
  }

  copyButton.addEventListener("click", () => {
    copyCurrentExample();
  });
}

/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   COURSE INFORMATION
   ========================================================= */

function initializeCourseInformation() {
  if (!courseConfig) {
    return;
  }

  if (document.title.toLowerCase().includes("learning")) {
    document.title = `FAYAD — ${courseConfig.fullName}`;
  }

  document.body.classList.add(`course-${currentCourse}`);

  const courseName = document.getElementById("course-name");

  if (courseName) {
    courseName.textContent = courseConfig.name;
  }
}

/* =========================================================
   FIX SIDEBAR INDEXES
   ========================================================= */

function initializeSidebarIndexes() {
  if (!lessonLinks) {
    return;
  }

  lessonLinks.forEach((link, index) => {
    link.dataset.lesson = String(index);
  });
}

/* =========================================================
   INITIALIZE LEARNING ENGINE
   ========================================================= */

async function initializeLearningEngine() {
  /*
     IMPORTANT:

     Do NOT run the learning engine
     on the homepage.

     It only runs when a real lesson
     page is detected.
  */

  if (!isLearningPage() || !courseConfig) {
    return;
  }

  try {
    getDOMElements();

    initializeCourseInformation();

    completedLessons = loadProgress();

    initializeSidebarIndexes();

    lessons = await loadLessonFile();

    if (!Array.isArray(lessons) || lessons.length === 0) {
      throw new Error(`No lessons found in ${courseConfig.lessonsFile}`);
    }

    setupSidebarEvents();

    setupPreviousButton();

    setupNextButton();

    setupRunButton();

    setupCodeEditor();

    setupResetButton();

    setupCopyButton();

    initializeSidebarIndexes();

    loadLesson(0);

    console.log(`FAYAD: ${courseConfig.name} loaded successfully. ${lessons.length} lessons found.`);
  } catch (error) {
    console.error("FAYAD Learning Engine Error:", error);

    const content = document.getElementById("lesson-content");

    if (content) {
      content.innerHTML = `

        <div
          style="
            padding:20px;
            border:1px solid #c0392b;
            border-radius:12px;
            color:#c0392b;
            background:#fff5f5;
          "
        >

          <h2>
            FAYAD: Could not load lessons
          </h2>

          <p>
            Course:
            <strong>
              ${courseConfig.name}
            </strong>
          </p>

          <p>
            File:
            <strong>
              ${courseConfig.lessonsFile}
            </strong>
          </p>

          <p>
            Make sure the lesson file exists
            and contains:
          </p>

          <pre
            style="
              padding:12px;
              background:#f0f0f0;
              border-radius:8px;
              overflow:auto;
            "
          >window.FAYAD_LESSONS = [ ... ];</pre>

        </div>

      `;
    }
  }
}

/* =========================================================
   GLOBAL INITIALIZATION
   ========================================================= */

function initializeFAYAD() {
  setupMenu();

  setupLanguage();

  initializeLearningEngine();
}

/* =========================================================
   START
   ========================================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeFAYAD);
} else {
  initializeFAYAD();
}
