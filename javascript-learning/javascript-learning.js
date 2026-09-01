/* =========================================================
   FAYAD — JAVASCRIPT LEARNING
   ========================================================= */

/* =========================================================
   1. LESSON DATA
   ========================================================= */

const lessons = [
  {
    title: "Introduction to JavaScript",

    description: "Learn what JavaScript is, why we use it, and how it makes websites interactive.",

    code: `const message = "Hello FAYAD";

console.log(message);`,

    question: "What is JavaScript mainly used for?",

    answers: ["Adding behavior and interaction", "Creating only the page structure", "Creating only colors and styles"],

    correct: 0,
  },

  {
    title: "Variables",

    description: "Learn how variables store and manage values in JavaScript.",

    code: `let name = "FAYAD";

console.log(name);`,

    question: "Which keyword allows a variable to be reassigned?",

    answers: ["let", "const", "fixed"],

    correct: 0,
  },

  {
    title: "Data Types",

    description: "Learn the main data types used in JavaScript.",

    code: `const name = "FAYAD";
const age = 20;
const isStudent = true;

console.log(name);
console.log(age);
console.log(isStudent);`,

    question: "Which value is a Boolean?",

    answers: ["true", '"Hello"', "25"],

    correct: 0,
  },

  {
    title: "Operators",

    description: "Learn how JavaScript operators perform calculations and comparisons.",

    code: `const a = 10;
const b = 5;

const result = a + b;

console.log(result);`,

    question: "Which operator adds two values?",

    answers: ["+", "*", "/"],

    correct: 0,
  },

  {
    title: "Conditions",

    description: "Learn how if and else statements allow JavaScript to make decisions.",

    code: `const age = 20;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}`,

    question: "Which statement is used to make a condition?",

    answers: ["if", "loop", "repeat"],

    correct: 0,
  },

  {
    title: "Loops",

    description: "Learn how loops repeat code multiple times.",

    code: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}`,

    question: "What is a loop mainly used for?",

    answers: ["Repeating code", "Creating HTML", "Changing CSS files"],

    correct: 0,
  },

  {
    title: "Functions",

    description: "Learn how functions organize reusable blocks of JavaScript code.",

    code: `function greet() {
  console.log("Hello FAYAD");
}

greet();`,

    question: "What is a function?",

    answers: ["A reusable block of code", "A CSS selector", "An HTML element"],

    correct: 0,
  },

  {
    title: "Parameters & Arguments",

    description: "Learn how parameters and arguments allow functions to receive data.",

    code: `function greet(name) {
  console.log("Hello " + name);
}

greet("FAYAD");`,

    question: "What does a parameter represent?",

    answers: ["A value received by a function", "A CSS property", "An HTML tag"],

    correct: 0,
  },

  {
    title: "Return",

    description: "Learn how functions return values using the return statement.",

    code: `function add(a, b) {
  return a + b;
}

const result = add(5, 3);

console.log(result);`,

    question: "What does return do?",

    answers: ["Sends a value back from a function", "Creates a loop", "Deletes a variable"],

    correct: 0,
  },

  {
    title: "Arrow Functions",

    description: "Learn the modern arrow function syntax in JavaScript.",

    code: `const add = (a, b) => {
  return a + b;
};

console.log(add(5, 3));`,

    question: "Which syntax creates an arrow function?",

    answers: ["() =>", "function =>", "arrow()"],

    correct: 0,
  },

  {
    title: "Arrays",

    description: "Learn how arrays store multiple values in one variable.",

    code: `const fruits = [
  "Apple",
  "Banana",
  "Orange"
];

console.log(fruits[0]);`,

    question: "What does an array store?",

    answers: ["Multiple values", "Only CSS rules", "Only HTML elements"],

    correct: 0,
  },

  {
    title: "Array Methods",

    description: "Learn useful methods for working with arrays.",

    code: `const numbers = [1, 2, 3];

numbers.push(4);

console.log(numbers);`,

    question: "What does push() do?",

    answers: ["Adds an item to an array", "Deletes an array", "Creates a function"],

    correct: 0,
  },

  {
    title: "Objects",

    description: "Learn how objects store related data using properties and values.",

    code: `const user = {
  name: "FAYAD",
  age: 20
};

console.log(user.name);`,

    question: "What does an object contain?",

    answers: ["Properties and values", "Only numbers", "Only functions"],

    correct: 0,
  },

  {
    title: "Object Methods",

    description: "Learn how functions can be stored and used inside objects.",

    code: `const user = {
  name: "FAYAD",

  greet() {
    console.log("Hello");
  }
};

user.greet();`,

    question: "What is a method?",

    answers: ["A function inside an object", "A CSS selector", "An HTML attribute"],

    correct: 0,
  },

  {
    title: "Introduction to DOM",

    description: "Learn how JavaScript interacts with the HTML document through the DOM.",

    code: `const title =
  document.getElementById("title");

console.log(title);`,

    question: "What does DOM stand for?",

    answers: ["Document Object Model", "Data Object Method", "Document Order Manager"],

    correct: 0,
  },

  {
    title: "Selecting Elements",

    description: "Learn how to select HTML elements using JavaScript.",

    code: `const title =
  document.querySelector("h1");

console.log(title);`,

    question: "Which method selects an element using a CSS selector?",

    answers: ["querySelector()", "selectElement()", "getCSS()"],

    correct: 0,
  },

  {
    title: "Changing Content",

    description: "Learn how JavaScript can change the content of HTML elements.",

    code: `const title =
  document.querySelector("h1");

title.textContent = "Hello FAYAD";`,

    question: "Which property changes text content?",

    answers: ["textContent", "textChange", "contentHTML"],

    correct: 0,
  },

  {
    title: "Events",

    description: "Learn how JavaScript responds to user actions such as clicks.",

    code: `const button =
  document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Button clicked");
});`,

    question: "Which method listens for events?",

    answers: ["addEventListener()", "listenEvent()", "eventClick()"],

    correct: 0,
  },

  {
    title: "Destructuring",

    description: "Learn how destructuring makes it easier to extract values from arrays and objects.",

    code: `const user = {
  name: "FAYAD",
  age: 20
};

const { name, age } = user;

console.log(name);
console.log(age);`,

    question: "What does destructuring help you do?",

    answers: ["Extract values easily", "Create CSS animations", "Create HTML elements"],

    correct: 0,
  },

  {
    title: "Spread & Rest",

    description: "Learn how the spread and rest operators work with arrays and functions.",

    code: `const numbers = [1, 2, 3];

const newNumbers = [
  ...numbers,
  4
];

console.log(newNumbers);`,

    question: "Which operator is used for spread syntax?",

    answers: ["...", "***", ">>>"],

    correct: 0,
  },

  {
    title: "Modules",

    description: "Learn how JavaScript modules organize code into separate files.",

    code: `// math.js

export function add(a, b) {
  return a + b;
}`,

    question: "Why do we use modules?",

    answers: ["To organize code into separate files", "To create CSS colors", "To replace HTML"],

    correct: 0,
  },

  {
    title: "Async JavaScript",

    description: "Learn the basic idea of asynchronous JavaScript and how it handles tasks over time.",

    code: `console.log("Start");

setTimeout(() => {
  console.log("Finished");
}, 1000);

console.log("End");`,

    question: "What does asynchronous code allow?",

    answers: ["Tasks to happen without blocking everything", "HTML to disappear", "CSS to become JavaScript"],

    correct: 0,
  },

  {
    title: "Promises",

    description: "Learn how promises represent the eventual result of an asynchronous operation.",

    code: `const promise = new Promise((resolve) => {
  resolve("Success");
});

promise.then((result) => {
  console.log(result);
});`,

    question: "What does a Promise represent?",

    answers: ["The eventual result of an async operation", "A CSS animation", "An HTML element"],

    correct: 0,
  },

  {
    title: "Fetch API",

    description: "Learn how the Fetch API is used to request data from servers and APIs.",

    code: `fetch("https://example.com/data")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });`,

    question: "What is fetch() commonly used for?",

    answers: ["Requesting data from a server", "Changing CSS colors", "Creating HTML tags"],

    correct: 0,
  },

  {
    title: "Error Handling",

    description: "Learn how try, catch, and finally help handle JavaScript errors.",

    code: `try {
  const result = unknownVariable;
  console.log(result);
} catch (error) {
  console.log("An error occurred");
}`,

    question: "Which block handles an error?",

    answers: ["catch", "errorBlock", "handle"],

    correct: 0,
  },
];

/* =========================================================
   2. ELEMENTS
   ========================================================= */

const lessonButtons = document.querySelectorAll(".lesson");

const lessonNumber = document.getElementById("lessonNumber");

const lessonTitle = document.getElementById("lessonTitle");

const lessonDescription = document.getElementById("lessonDescription");

const exampleCode = document.getElementById("exampleCode");

const progressText = document.getElementById("progressText");

const progressFill = document.getElementById("progressFill");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const copyButton = document.getElementById("copyButton");

const jsEditor = document.getElementById("jsEditor");

const runButton = document.getElementById("runButton");

const resetButton = document.getElementById("resetButton");

const jsResult = document.getElementById("jsResult");

const output = document.getElementById("output");

const questionText = document.getElementById("questionText");

const answerOptions = document.getElementById("answerOptions");

const answerFeedback = document.getElementById("answerFeedback");

/* =========================================================
   3. CURRENT LESSON
   ========================================================= */

let currentLesson = 0;

/* =========================================================
   4. LOAD LESSON
   ========================================================= */

function loadLesson(index) {
  if (index < 0) {
    index = 0;
  }

  if (index >= lessons.length) {
    index = lessons.length - 1;
  }

  currentLesson = index;

  const lesson = lessons[currentLesson];

  /* TITLE */

  lessonNumber.textContent = `LESSON ${String(currentLesson + 1).padStart(2, "0")}`;

  lessonTitle.textContent = lesson.title;

  lessonDescription.textContent = lesson.description;

  /* CODE */

  exampleCode.textContent = lesson.code;

  jsEditor.value = lesson.code;

  /* PROGRESS */

  const progress = Math.round(((currentLesson + 1) / lessons.length) * 100);

  progressText.textContent = `${progress}%`;

  progressFill.style.width = `${progress}%`;

  /* SIDEBAR */

  lessonButtons.forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === currentLesson);

    const status = button.querySelector(".lesson-status");

    if (buttonIndex === currentLesson) {
      status.classList.add("current");
    } else {
      status.classList.remove("current");
    }
  });

  /* QUESTION */

  questionText.textContent = lesson.question;

  /* ANSWERS */

  answerOptions.innerHTML = "";

  lesson.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.textContent = answer;

    button.dataset.index = index;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    answerOptions.appendChild(button);
  });

  answerFeedback.textContent = "";

  /* NAVIGATION */

  previousButton.disabled = currentLesson === 0;

  nextButton.disabled = currentLesson === lessons.length - 1;

  const nextLesson = lessons[currentLesson + 1];

  const nextStrong = nextButton.querySelector("strong");

  if (nextLesson) {
    nextStrong.textContent = nextLesson.title;
  } else {
    nextStrong.textContent = "Course Complete";
  }

  const previousStrong = previousButton.querySelector("strong");

  if (currentLesson > 0) {
    previousStrong.textContent = lessons[currentLesson - 1].title;
  } else {
    previousStrong.textContent = "CSS Learning";
  }

  /* SAVE PROGRESS */

  localStorage.setItem("fayad-js-current-lesson", currentLesson);

  /* RUN DEFAULT CODE */

  runJavaScript();
}

/* =========================================================
   5. SIDEBAR CLICK
   ========================================================= */

lessonButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    loadLesson(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

/* =========================================================
   6. PREVIOUS
   ========================================================= */

previousButton.addEventListener("click", () => {
  if (currentLesson > 0) {
    loadLesson(currentLesson - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

/* =========================================================
   7. NEXT
   ========================================================= */

nextButton.addEventListener("click", () => {
  if (currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

/* =========================================================
   8. RUN JAVASCRIPT
   ========================================================= */

function runJavaScript() {
  const code = jsEditor.value;

  /*
     We create a temporary console.log
     so console output can appear inside
     the learning page.
  */

  const originalConsoleLog = console.log;

  try {
    const customConsole = {
      log: (...values) => {
        output.textContent = values
          .map((value) => {
            if (typeof value === "object" && value !== null) {
              return JSON.stringify(value, null, 2);
            }

            return String(value);
          })
          .join(" ");
      },
    };

    /*
       Create a function that executes
       the student's code.

       document and DOM are still available
       because the function runs in this page.
    */

    const executeCode = new Function("console", code);

    executeCode(customConsole);

    /*
       If the student's code changes jsResult,
       the output will show it too.
    */

    if (jsResult.textContent && jsResult.textContent !== "Hello FAYAD") {
      output.textContent = jsResult.textContent;
    }
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  } finally {
    console.log = originalConsoleLog;
  }
}

/* =========================================================
   9. RUN BUTTON
   ========================================================= */

runButton.addEventListener("click", () => {
  runJavaScript();
});

/* =========================================================
   10. RESET
   ========================================================= */

resetButton.addEventListener("click", () => {
  jsEditor.value = lessons[currentLesson].code;

  output.textContent = "Your result will appear here.";

  runJavaScript();
});

/* =========================================================
   11. COPY CODE
   ========================================================= */

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(exampleCode.textContent);

    copyButton.textContent = "Copied!";

    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1500);
  } catch (error) {
    copyButton.textContent = "Failed";

    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1500);
  }
});

/* =========================================================
   12. QUICK CHECK
   ========================================================= */

function checkAnswer(selectedIndex) {
  const lesson = lessons[currentLesson];

  const buttons = answerOptions.querySelectorAll("button");

  if (selectedIndex === lesson.correct) {
    answerFeedback.textContent = "✓ Correct! Great job.";

    answerFeedback.style.color = "#0f807a";

    buttons.forEach((button) => {
      button.disabled = true;
    });
  } else {
    answerFeedback.textContent = "✗ Not quite. Try again.";

    answerFeedback.style.color = "#b14a4a";
  }
}

/* =========================================================
   13. KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.target.tagName === "TEXTAREA") {
    return;
  }

  if (event.key === "ArrowRight" && currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1);
  }

  if (event.key === "ArrowLeft" && currentLesson > 0) {
    loadLesson(currentLesson - 1);
  }
});

/* =========================================================
   14. RESTORE LAST LESSON
   ========================================================= */

const savedLesson = localStorage.getItem("fayad-js-current-lesson");

if (savedLesson !== null && !Number.isNaN(Number(savedLesson))) {
  loadLesson(Number(savedLesson));
} else {
  loadLesson(0);
}
