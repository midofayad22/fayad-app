/* =========================================================
   FAYAD — REACT LEARNING JAVASCRIPT
   ========================================================= */

/* =========================================================
   1. LESSON DATA
   ========================================================= */

const lessons = [
  {
    title: "Introduction to React",
    description: "Learn what React is, why developers use it, and how React helps build modern user interfaces.",

    code: `function App() {
  return <h1>Hello FAYAD</h1>;
}`,

    question: "What is React mainly used for?",

    answers: ["Building user interfaces", "Managing databases only", "Styling pages without JavaScript"],

    correct: 0,
  },

  {
    title: "Why React?",
    description:
      "Understand why React became popular and how component-based development makes applications easier to build.",

    code: `function Button() {
  return <button>Click me</button>;
}`,

    question: "What is one important benefit of React?",

    answers: ["Reusable components", "It removes the need for HTML", "It only works with databases"],

    correct: 0,
  },

  {
    title: "Components",
    description: "Learn how React components divide an interface into small reusable pieces.",

    code: `function Welcome() {
  return <h1>Welcome to FAYAD</h1>;
}`,

    question: "What is a React component?",

    answers: ["A reusable piece of UI", "A database table", "A CSS property"],

    correct: 0,
  },

  {
    title: "JSX",
    description: "Learn how JSX allows you to write HTML-like syntax inside JavaScript.",

    code: `function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome to React.</p>
    </div>
  );
}`,

    question: "What does JSX allow developers to write?",

    answers: ["HTML-like syntax inside JavaScript", "SQL inside CSS", "Only plain HTML files"],

    correct: 0,
  },

  {
    title: "Props",
    description: "Learn how props allow components to receive data from other components.",

    code: `function Welcome({ name }) {
  return <h1>Hello {name}</h1>;
}

function App() {
  return <Welcome name="FAYAD" />;
}`,

    question: "What are props used for?",

    answers: ["Passing data to components", "Creating CSS files", "Connecting to a database"],

    correct: 0,
  },

  {
    title: "State",
    description: "Understand state and how components can store changing data.",

    code: `const [count, setCount] = useState(0);

return (
  <button onClick={() => setCount(count + 1)}>
    {count}
  </button>
);`,

    question: "What does state represent in React?",

    answers: ["Data that can change over time", "Only static HTML", "A CSS selector"],

    correct: 0,
  },

  {
    title: "Events",
    description: "Learn how React handles user interactions such as clicks, typing, and submitting forms.",

    code: `function App() {
  function handleClick() {
    alert("Hello FAYAD");
  }

  return <button onClick={handleClick}>Click</button>;
}`,

    question: "Which event handles a button click?",

    answers: ["onClick", "onButton", "clickEventOnly"],

    correct: 0,
  },

  {
    title: "Conditional Rendering",
    description: "Learn how React displays different UI depending on a condition.",

    code: `function App({ isLoggedIn }) {
  return (
    <h1>
      {isLoggedIn ? "Welcome back!" : "Please log in."}
    </h1>
  );
}`,

    question: "What is conditional rendering?",

    answers: ["Showing UI based on a condition", "Creating CSS animations", "Creating database queries"],

    correct: 0,
  },

  {
    title: "Lists & Keys",
    description: "Learn how to render collections of data and why keys are important.",

    code: `const skills = ["HTML", "CSS", "JavaScript"];

function App() {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}`,

    question: "Why are keys used when rendering lists?",

    answers: ["To help React identify list items", "To change CSS colors", "To create variables"],

    correct: 0,
  },

  {
    title: "Forms",
    description: "Learn how React handles form inputs and user-submitted data.",

    code: `function App() {
  return (
    <form>
      <input placeholder="Your name" />
      <button>Submit</button>
    </form>
  );
}`,

    question: "What can React forms handle?",

    answers: ["User input and submission", "Only CSS styles", "Only images"],

    correct: 0,
  },

  {
    title: "Component Composition",
    description: "Learn how multiple components can work together to build larger interfaces.",

    code: `function Header() {
  return <header>FAYAD</header>;
}

function App() {
  return (
    <>
      <Header />
      <main>Learning React</main>
    </>
  );
}`,

    question: "What does component composition mean?",

    answers: ["Combining components to build interfaces", "Removing all components", "Writing only CSS"],

    correct: 0,
  },

  {
    title: "Hooks Introduction",
    description: "Understand what React Hooks are and why they are important in modern React.",

    code: `import { useState } from "react";

function App() {
  const [name, setName] = useState("FAYAD");

  return <h1>{name}</h1>;
}`,

    question: "What are React Hooks?",

    answers: ["Functions that let components use React features", "CSS classes", "HTML attributes"],

    correct: 0,
  },

  {
    title: "useState",
    description: "Learn how useState allows a component to store and update state.",

    code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}`,

    question: "What does useState provide?",

    answers: ["State and a function to update it", "Only CSS", "Only HTML"],

    correct: 0,
  },

  {
    title: "useEffect",
    description: "Learn how useEffect is used for side effects such as data fetching and subscriptions.",

    code: `import { useEffect } from "react";

useEffect(() => {
  console.log("Component rendered");
}, []);`,

    question: "What is useEffect commonly used for?",

    answers: ["Handling side effects", "Creating CSS selectors", "Defining HTML tags"],

    correct: 0,
  },

  {
    title: "useRef",
    description: "Learn how useRef stores values and can reference DOM elements without causing a re-render.",

    code: `import { useRef } from "react";

function App() {
  const inputRef = useRef(null);

  return <input ref={inputRef} />;
}`,

    question: "What can useRef be used for?",

    answers: ["Referencing DOM elements", "Creating CSS animations", "Creating database tables"],

    correct: 0,
  },

  {
    title: "useContext",
    description:
      "Learn how useContext allows components to access shared data without passing props through every level.",

    code: `const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}`,

    question: "What problem can useContext help solve?",

    answers: ["Sharing data across components", "Writing CSS", "Creating HTML documents"],

    correct: 0,
  },

  {
    title: "Custom Hooks",
    description: "Learn how to create reusable logic with your own custom Hooks.",

    code: `function useGreeting(name) {
  return \`Hello ${name}\`;
}`,

    question: "Why create a custom Hook?",

    answers: ["To reuse logic", "To replace CSS", "To create HTML files"],

    correct: 0,
  },

  {
    title: "React Router",
    description: "Learn how React Router creates navigation between views in a React application.",

    code: `import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>`,

    question: "What is React Router used for?",

    answers: ["Client-side navigation", "Database management", "CSS styling"],

    correct: 0,
  },

  {
    title: "API Requests",
    description: "Learn how React applications communicate with APIs to retrieve external data.",

    code: `async function getUsers() {
  const response = await fetch(
    "https://example.com/users"
  );

  const data = await response.json();

  return data;
}`,

    question: "Why do React applications use APIs?",

    answers: ["To communicate with external data sources", "To create CSS selectors", "To replace JavaScript"],

    correct: 0,
  },

  {
    title: "Loading & Error States",
    description: "Learn how to provide good feedback while data is loading or when something goes wrong.",

    code: `if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>Something went wrong.</p>;
}`,

    question: "Why are loading and error states important?",

    answers: ["They improve user experience", "They remove components", "They replace CSS"],

    correct: 0,
  },

  {
    title: "Performance",
    description: "Learn the basic ideas behind improving React application performance.",

    code: `function ProductList({ products }) {
  return products.map((product) => (
    <Product key={product.id} product={product} />
  ));
}`,

    question: "What is React performance optimization about?",

    answers: ["Reducing unnecessary work and renders", "Adding more CSS", "Removing all components"],

    correct: 0,
  },

  {
    title: "React.memo",
    description: "Learn how React.memo can prevent unnecessary component re-renders.",

    code: `const UserCard = React.memo(function UserCard({ name }) {
  return <h2>{name}</h2>;
});`,

    question: "What can React.memo help prevent?",

    answers: ["Unnecessary re-renders", "HTML files", "CSS styles"],

    correct: 0,
  },

  {
    title: "useMemo & useCallback",
    description: "Learn when useMemo and useCallback can help optimize expensive calculations and function references.",

    code: `const total = useMemo(() => {
  return calculateTotal(items);
}, [items]);`,

    question: "What can useMemo cache?",

    answers: ["A calculated value", "An HTML document", "A CSS file"],

    correct: 0,
  },

  {
    title: "State Management",
    description: "Understand different approaches for managing application state as React projects become larger.",

    code: `const [user, setUser] = useState(null);

function login(userData) {
  setUser(userData);
}`,

    question: "What is state management about?",

    answers: ["Managing application data and changes", "Styling buttons", "Creating HTML elements only"],

    correct: 0,
  },

  {
    title: "React Architecture",
    description: "Learn how to organize React applications into clear, maintainable layers and components.",

    code: `src/
├── components/
├── pages/
├── hooks/
├── services/
└── App.jsx`,

    question: "Why is application architecture important?",

    answers: ["It makes projects easier to maintain", "It removes JavaScript", "It replaces React"],

    correct: 0,
  },

  {
    title: "Reusable Components",
    description: "Learn how to design flexible components that can be reused across different parts of an application.",

    code: `function Button({ children }) {
  return (
    <button className="button">
      {children}
    </button>
  );
}`,

    question: "What is a reusable component?",

    answers: ["A component designed to work in multiple places", "A component that works only once", "A CSS file"],

    correct: 0,
  },

  {
    title: "Project Structure",
    description: "Learn how to organize files and folders in a scalable React project.",

    code: `src/
├── components/
├── pages/
├── assets/
├── hooks/
├── services/
└── main.jsx`,

    question: "What does project structure describe?",

    answers: ["How project files and folders are organized", "Only the page colors", "Only the database"],

    correct: 0,
  },

  {
    title: "Best Practices",
    description: "Learn important practices for writing clean, readable, maintainable React applications.",

    code: `function UserCard({ user }) {
  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  );
}`,

    question: "Why are React best practices useful?",

    answers: [
      "They improve code quality and maintainability",
      "They remove components",
      "They make JavaScript unnecessary",
    ],

    correct: 0,
  },

  {
    title: "React + APIs",
    description: "Learn how to combine React components, state, effects, and APIs to build data-driven applications.",

    code: `useEffect(() => {
  fetch("/api/users")
    .then((response) => response.json())
    .then((data) => setUsers(data));
}, []);`,

    question: "What can an API provide to a React application?",

    answers: ["External application data", "Only CSS", "Only HTML structure"],

    correct: 0,
  },

  {
    title: "Final React Project",
    description: "Bring your React knowledge together by planning and building a complete application.",

    code: `function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <Footer />
    </>
  );
}`,

    question: "What is the goal of a final project?",

    answers: ["Apply what you learned in a complete application", "Avoid using React", "Only write CSS"],

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

const codeEditor = document.getElementById("codeEditor");

const runButton = document.getElementById("runCode");
const resetButton = document.getElementById("resetCode");

const output = document.getElementById("output");

const answerButtons = document.querySelectorAll(".answer-options button");

const checkFeedback = document.getElementById("checkFeedback");

const reactResult = document.getElementById("reactResult");

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

  codeEditor.value = lesson.code;

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

  /* NAVIGATION */

  previousButton.disabled = currentLesson === 0;

  nextButton.disabled = currentLesson === lessons.length - 1;

  if (currentLesson === 0) {
    previousButton.querySelector("strong").textContent = "JavaScript Learning";
  } else {
    previousButton.querySelector("strong").textContent = lessons[currentLesson - 1].title;
  }

  const nextLesson = lessons[currentLesson + 1];

  if (nextLesson) {
    nextButton.querySelector("strong").textContent = nextLesson.title;
  } else {
    nextButton.querySelector("strong").textContent = "Course Complete";
  }

  /* RESET QUICK CHECK */

  resetQuickCheck();

  /* SAVE PROGRESS */

  localStorage.setItem("fayad-react-current-lesson", currentLesson);

  /* RESET OUTPUT */

  output.textContent = "Your result will appear here.";

  renderReactPreview(lesson.code);
}

/* =========================================================
   5. SIDEBAR NAVIGATION
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
   8. REACT PREVIEW
   ========================================================= */

function renderReactPreview(code) {
  const match = code.match(/return\s*<h1>(.*?)<\/h1>/);

  if (match) {
    reactResult.textContent = match[1];
    return;
  }

  const headingMatch = code.match(/return\s*\(\s*<h1>(.*?)<\/h1>/);

  if (headingMatch) {
    reactResult.textContent = headingMatch[1];
    return;
  }

  reactResult.textContent = "React Preview";
}

/* =========================================================
   9. RUN CODE
   ========================================================= */

runButton.addEventListener("click", () => {
  const code = codeEditor.value.trim();

  if (!code) {
    output.textContent = "Please write some code first.";
    return;
  }

  renderReactPreview(code);

  output.textContent = "Code executed successfully in the learning preview.";
});

/* =========================================================
   10. RESET CODE
   ========================================================= */

resetButton.addEventListener("click", () => {
  codeEditor.value = lessons[currentLesson].code;

  output.textContent = "Your result will appear here.";

  renderReactPreview(lessons[currentLesson].code);
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

function resetQuickCheck() {
  checkFeedback.textContent = "";

  checkFeedback.style.color = "";

  answerButtons.forEach((button) => {
    button.classList.remove("correct-answer", "wrong-answer");
  });
}

answerButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const correct = lessons[currentLesson].correct;

    answerButtons.forEach((item) => {
      item.classList.remove("correct-answer", "wrong-answer");
    });

    if (index === correct) {
      checkFeedback.textContent = "✓ Correct! Great job.";

      checkFeedback.style.color = "#159570";

      button.classList.add("correct-answer");
    } else {
      checkFeedback.textContent = "✗ Not quite. Try again.";

      checkFeedback.style.color = "#c55353";

      button.classList.add("wrong-answer");
    }
  });
});

/* =========================================================
   13. KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.target.tagName === "TEXTAREA" || event.target.tagName === "INPUT") {
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

const savedLesson = localStorage.getItem("fayad-react-current-lesson");

if (savedLesson !== null && !Number.isNaN(Number(savedLesson))) {
  loadLesson(Number(savedLesson));
} else {
  loadLesson(0);
}
