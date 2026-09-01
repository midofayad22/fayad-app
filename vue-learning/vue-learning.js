/* =========================================================
   FAYAD — VUE LEARNING ENGINE
   Complete working version
========================================================= */

const lessons = [
  {
    id: 1,
    group: "VUE FUNDAMENTALS",
    title: "Introduction to Vue",
    description: "Learn what Vue is, why developers use it, and how it helps build interactive web interfaces.",

    content: `
      <h2>What is Vue?</h2>

      <p>
        <strong>Vue.js</strong> is a progressive JavaScript framework used
        to build user interfaces and interactive web applications.
      </p>

      <p>
        Vue makes it easier to create dynamic interfaces by connecting
        your HTML with JavaScript data.
      </p>

      <p>
        Vue is designed to be approachable, flexible, and easy to integrate
        into existing projects.
      </p>
    `,

    keyTitle: "Vue makes interfaces reactive",
    keyDescription:
      "Think of Vue as a bridge between your JavaScript data and your HTML interface. When the data changes, Vue can automatically update the page.",

    example: `
<div id="app">
  <h1>{{ message }}</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Hello Vue!"
    };
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h1>Hello Vue!</h1>
      </div>
    `,

    challenge: "Create a heading that displays a Vue message.",

    starterCode: `
<div id="app">
  <h1>{{ message }}</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Hello Vue!"
    };
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>createApp()</code> creates a Vue application.
      </p>

      <p>
        <code>data()</code> returns the data that Vue manages.
      </p>

      <p>
        <code>{{ message }}</code> displays the value of
        <code>message</code> inside the HTML.
      </p>
    `,

    question: "What is Vue mainly used for?",

    options: ["Building interactive user interfaces", "Creating databases", "Designing computer hardware"],

    correct: 0,
  },

  {
    id: 2,
    group: "VUE FUNDAMENTALS",
    title: "Vue Application",
    description: "Learn how to create a Vue application and connect it to an HTML element.",

    content: `
      <h2>Creating a Vue Application</h2>

      <p>
        A Vue application starts by calling
        <code>createApp()</code>.
      </p>

      <p>
        After creating the application, we use
        <code>mount()</code> to tell Vue which HTML element it should control.
      </p>
    `,

    keyTitle: "createApp starts Vue",
    keyDescription:
      "The createApp function creates your Vue application, while mount connects it to an element in the page.",

    example: `
<div id="app">
  <h1>{{ title }}</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      title: "My Vue App"
    };
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h1>My Vue App</h1>
      </div>
    `,

    challenge: "Change the title displayed by the Vue application.",

    starterCode: `
<div id="app">
  <h1>{{ title }}</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      title: "My Vue App"
    };
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>createApp()</code> creates the Vue application.
      </p>

      <p>
        <code>mount("#app")</code> connects Vue to the element
        whose ID is <code>app</code>.
      </p>
    `,

    question: "Which method connects a Vue app to an HTML element?",

    options: ["connect()", "mount()", "attach()"],

    correct: 1,
  },

  {
    id: 3,
    group: "VUE FUNDAMENTALS",
    title: "Template Syntax",
    description: "Learn how Vue template syntax allows JavaScript data to appear inside HTML.",

    content: `
      <h2>Vue Template Syntax</h2>

      <p>
        Vue provides a simple template syntax for connecting data
        with HTML.
      </p>

      <p>
        One of the most common features is
        <code>{{ }}</code>, called interpolation.
      </p>

      <p>
        Interpolation allows Vue data to be displayed directly inside
        the HTML template.
      </p>
    `,

    keyTitle: "Use {{ }} to display data",
    keyDescription: "Vue interpolation lets you place reactive data directly inside your HTML template.",

    example: `
<div id="app">
  <h1>{{ name }}</h1>
  <p>{{ message }}</p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: "FAYAD",
      message: "Welcome to Vue!"
    };
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h1>FAYAD</h1>
        <p>Welcome to Vue!</p>
      </div>
    `,

    challenge: "Display a name and a message using Vue interpolation.",

    starterCode: `
<div id="app">
  <h1>{{ name }}</h1>
  <p>{{ message }}</p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: "FAYAD",
      message: "Welcome to Vue!"
    };
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>{{ name }}</code> displays the value stored in
        the <code>name</code> property.
      </p>

      <p>
        <code>{{ message }}</code> displays the value stored in
        the <code>message</code> property.
      </p>
    `,

    question: "What is {{ }} commonly used for in Vue?",

    options: ["Displaying data in a template", "Creating CSS animations", "Creating database tables"],

    correct: 0,
  },

  {
    id: 4,
    group: "VUE FUNDAMENTALS",
    title: "Data",
    description: "Learn how Vue stores reactive data inside the data function.",

    content: `
      <h2>Vue Data</h2>

      <p>
        Vue applications can contain data such as names, numbers,
        messages, and other values.
      </p>

      <p>
        In the Options API, this data is commonly returned from
        the <code>data()</code> function.
      </p>
    `,

    keyTitle: "Data drives the interface",
    keyDescription: "When Vue data changes, the interface can react and display the updated value automatically.",

    example: `
<div id="app">
  <h1>{{ count }}</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      count: 10
    };
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h1>10</h1>
      </div>
    `,

    challenge: "Change the value of count to 100.",

    starterCode: `
<div id="app">
  <h1>{{ count }}</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      count: 10
    };
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        The <code>data()</code> function returns an object containing
        the application's reactive data.
      </p>

      <p>
        Here, <code>count</code> stores the number
        <code>10</code>.
      </p>
    `,

    question: "Where is component data returned in the Vue Options API?",

    options: ["data()", "style()", "html()"],

    correct: 0,
  },

  {
    id: 5,
    group: "VUE FUNDAMENTALS",
    title: "Methods",
    description: "Learn how Vue methods allow your application to perform actions.",

    content: `
      <h2>Vue Methods</h2>

      <p>
        Methods are functions that can be used to perform actions
        inside a Vue application.
      </p>

      <p>
        They can respond to user interactions such as button clicks.
      </p>
    `,

    keyTitle: "Methods perform actions",
    keyDescription: "Use methods when your Vue application needs to execute logic in response to an event.",

    example: `
<div id="app">
  <button @click="sayHello">
    Click Me
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  methods: {
    sayHello() {
      alert("Hello Vue!");
    }
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <button style="padding:10px 16px;">
          Click Me
        </button>
      </div>
    `,

    challenge: "Create a button that calls a Vue method when clicked.",

    starterCode: `
<div id="app">
  <button @click="sayHello">
    Click Me
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  methods: {
    sayHello() {
      alert("Hello Vue!");
    }
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        The <code>methods</code> option contains functions that
        Vue can call.
      </p>

      <p>
        <code>@click</code> listens for a click event.
      </p>

      <p>
        When the button is clicked, Vue calls
        <code>sayHello()</code>.
      </p>
    `,

    question: "Where are Vue methods defined in the Options API?",

    options: ["methods", "functions", "actions"],

    correct: 0,
  },

  {
    id: 6,
    group: "VUE FUNDAMENTALS",
    title: "Events",
    description: "Learn how Vue handles user events such as clicks.",

    content: `
      <h2>Vue Events</h2>

      <p>
        Vue provides event listeners that make it easy to respond
        to user interactions.
      </p>

      <p>
        The <code>@click</code> directive is commonly used to
        listen for button clicks.
      </p>
    `,

    keyTitle: "@click handles clicks",
    keyDescription: "Vue event directives allow your interface to react when the user interacts with elements.",

    example: `
<div id="app">
  <button @click="count++">
    Clicked {{ count }} times
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      count: 0
    };
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <button style="padding:10px 16px;">
          Clicked 0 times
        </button>
      </div>
    `,

    challenge: "Create a button that increases count when clicked.",

    starterCode: `
<div id="app">
  <button @click="count++">
    Clicked {{ count }} times
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      count: 0
    };
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>@click</code> listens for a click.
      </p>

      <p>
        <code>count++</code> increases the value of
        <code>count</code> by one.
      </p>
    `,

    question: "Which Vue directive listens for a click?",

    options: ["@hover", "@click", "@press"],

    correct: 1,
  },

  {
    id: 7,
    group: "TEMPLATES & DIRECTIVES",
    title: "Conditional Rendering",
    description: "Learn how Vue can show or hide elements based on conditions.",

    content: `
      <h2>Conditional Rendering</h2>

      <p>
        Vue provides directives such as <code>v-if</code> for
        conditionally displaying elements.
      </p>

      <p>
        If the condition is true, Vue renders the element.
      </p>
    `,

    keyTitle: "v-if controls visibility",
    keyDescription: "Use v-if when an element should only appear when a specific condition is true.",

    example: `
<div id="app">
  <p v-if="isLoggedIn">
    Welcome back!
  </p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      isLoggedIn: true
    };
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>Welcome back!</p>
      </div>
    `,

    challenge: "Display a message only when isLoggedIn is true.",

    starterCode: `
<div id="app">
  <p v-if="isLoggedIn">
    Welcome back!
  </p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      isLoggedIn: true
    };
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>v-if</code> conditionally renders an element.
      </p>

      <p>
        When <code>isLoggedIn</code> is true, the paragraph appears.
      </p>
    `,

    question: "Which directive is used for conditional rendering?",

    options: ["v-if", "v-show-text", "v-condition"],

    correct: 0,
  },

  {
    id: 8,
    group: "TEMPLATES & DIRECTIVES",
    title: "Lists",
    description: "Learn how to render multiple items using Vue's v-for directive.",

    content: `
      <h2>Rendering Lists</h2>

      <p>
        Vue uses <code>v-for</code> to render a list of items.
      </p>

      <p>
        This is useful when you have arrays containing multiple
        values.
      </p>
    `,

    keyTitle: "v-for renders lists",
    keyDescription: "Use v-for when you need to repeat an HTML element for every item in an array.",

    example: `
<div id="app">
  <ul>
    <li v-for="item in items">
      {{ item }}
    </li>
  </ul>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      items: ["HTML", "CSS", "JavaScript"]
    };
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
      </div>
    `,

    challenge: "Render all items from an array using v-for.",

    starterCode: `
<div id="app">
  <ul>
    <li v-for="item in items">
      {{ item }}
    </li>
  </ul>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      items: ["HTML", "CSS", "JavaScript"]
    };
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>v-for</code> repeats the <code>li</code> element
        for every item in the array.
      </p>

      <p>
        The current item is available through the
        <code>item</code> variable.
      </p>
    `,

    question: "Which directive renders lists in Vue?",

    options: ["v-repeat", "v-for", "v-list"],

    correct: 1,
  },

  {
    id: 9,
    group: "TEMPLATES & DIRECTIVES",
    title: "Binding Attributes",
    description: "Learn how to dynamically bind HTML attributes using v-bind.",

    content: `
      <h2>Binding Attributes</h2>

      <p>
        Vue can dynamically control HTML attributes using
        <code>v-bind</code>.
      </p>

      <p>
        The shorthand for <code>v-bind</code> is a colon
        <code>:</code>.
      </p>
    `,

    keyTitle: "Use : to bind attributes",
    keyDescription: "Vue lets you connect HTML attributes directly to reactive data.",

    example: `
<div id="app">
  <img :src="imageUrl" alt="Vue Logo">
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      imageUrl: "https://vuejs.org/images/logo.png"
    };
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>Image source is dynamically bound.</p>
      </div>
    `,

    challenge: "Bind an image src attribute to a Vue data property.",

    starterCode: `
<div id="app">
  <img :src="imageUrl" alt="Vue Logo">
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      imageUrl: "https://vuejs.org/images/logo.png"
    };
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>:src</code> is the shorthand syntax for
        <code>v-bind:src</code>.
      </p>

      <p>
        The value of <code>src</code> comes from
        <code>imageUrl</code>.
      </p>
    `,

    question: "What is the shorthand for v-bind?",

    options: ["#", ":", "@"],

    correct: 1,
  },

  {
    id: 10,
    group: "COMPONENTS",
    title: "Components",
    description: "Learn the basic idea of Vue components and why they are useful.",

    content: `
      <h2>Vue Components</h2>

      <p>
        Components are reusable pieces of a Vue application's
        user interface.
      </p>

      <p>
        A large application can be divided into smaller components
        such as buttons, navigation bars, cards, and forms.
      </p>
    `,

    keyTitle: "Components make interfaces reusable",
    keyDescription:
      "Breaking an application into components makes it easier to organize, reuse, and maintain your code.",

    example: `
<div id="app">
  <user-card></user-card>
</div>

<script>
const { createApp } = Vue;

const UserCard = {
  template: \`
    <div>
      <h2>FAYAD</h2>
      <p>Vue Developer</p>
    </div>
  \`
};

createApp({
  components: {
    UserCard
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>FAYAD</h2>
        <p>Vue Developer</p>
      </div>
    `,

    challenge: "Create a simple reusable Vue component.",

    starterCode: `
<div id="app">
  <user-card></user-card>
</div>

<script>
const { createApp } = Vue;

const UserCard = {
  template: \`
    <div>
      <h2>FAYAD</h2>
      <p>Vue Developer</p>
    </div>
  \`
};

createApp({
  components: {
    UserCard
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>UserCard</code> is a reusable component.
      </p>

      <p>
        It is registered inside the application's
        <code>components</code> option.
      </p>

      <p>
        The component can then be used with
        <code>&lt;user-card&gt;</code>.
      </p>
    `,

    question: "Why do we use components?",

    options: ["To make UI pieces reusable", "To replace HTML completely", "To create operating systems"],

    correct: 0,
  },

  {
    id: 11,
    group: "COMPONENTS",
    title: "Props",
    description: "Learn how components receive data from their parent components using props.",

    content: `
      <h2>Props</h2>

      <p>
        Props allow a parent component to pass data to a child component.
      </p>

      <p>
        They are useful when the same component needs to display
        different data.
      </p>
    `,

    keyTitle: "Props pass data to children",
    keyDescription: "A parent component can provide values to a child component through props.",

    example: `
<div id="app">
  <user-card name="FAYAD"></user-card>
</div>

<script>
const { createApp } = Vue;

const UserCard = {
  props: ["name"],

  template: \`
    <h2>Hello {{ name }}</h2>
  \`
};

createApp({
  components: {
    UserCard
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Hello FAYAD</h2>
      </div>
    `,

    challenge: "Pass a name from the parent to the child component.",

    starterCode: `
<div id="app">
  <user-card name="FAYAD"></user-card>
</div>

<script>
const { createApp } = Vue;

const UserCard = {
  props: ["name"],

  template: \`
    <h2>Hello {{ name }}</h2>
  \`
};

createApp({
  components: {
    UserCard
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>props</code> defines the data that a component can receive.
      </p>

      <p>
        Here the parent sends the value
        <code>name="FAYAD"</code>.
      </p>

      <p>
        The child receives it through the
        <code>name</code> prop.
      </p>
    `,

    question: "What are props mainly used for?",

    options: ["Passing data to child components", "Styling components", "Creating CSS files"],

    correct: 0,
  },

  {
    id: 12,
    group: "COMPONENTS",
    title: "Computed Properties",
    description: "Learn how computed properties derive values from reactive data.",

    content: `
      <h2>Computed Properties</h2>

      <p>
        Computed properties are useful when you need a value that
        is calculated from existing reactive data.
      </p>

      <p>
        Vue automatically tracks the data used by a computed property.
      </p>
    `,

    keyTitle: "Computed values are derived",
    keyDescription: "Use computed properties when a value should be calculated from other reactive data.",

    example: `
<div id="app">
  <p>{{ fullName }}</p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      firstName: "Abdul",
      lastName: "Fayad"
    };
  },

  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    }
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>Abdul Fayad</p>
      </div>
    `,

    challenge: "Create a computed property that combines two values.",

    starterCode: `
<div id="app">
  <p>{{ fullName }}</p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      firstName: "Abdul",
      lastName: "Fayad"
    };
  },

  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    }
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        The <code>computed</code> option contains derived values.
      </p>

      <p>
        <code>fullName</code> combines <code>firstName</code>
        and <code>lastName</code>.
      </p>
    `,

    question: "What are computed properties used for?",

    options: ["Derived values", "HTML comments", "CSS selectors"],

    correct: 0,
  },

  {
    id: 13,
    group: "FORMS & USER INPUT",
    title: "Form Input",
    description: "Learn how v-model connects form inputs with Vue data.",

    content: `
      <h2>v-model</h2>

      <p>
        Vue provides <code>v-model</code> for two-way data binding
        between form controls and reactive data.
      </p>

      <p>
        This means that when the user changes the input,
        the Vue data can update automatically.
      </p>
    `,

    keyTitle: "v-model creates two-way binding",
    keyDescription: "Use v-model when you want an input and Vue data to stay synchronized.",

    example: `
<div id="app">
  <input v-model="name">

  <p>Hello {{ name }}</p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: ""
    };
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <input style="padding:8px;" placeholder="Type your name">
        <p>Hello</p>
      </div>
    `,

    challenge: "Connect an input field to a Vue data property using v-model.",

    starterCode: `
<div id="app">
  <input v-model="name">

  <p>Hello {{ name }}</p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: ""
    };
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>v-model</code> connects the input value with
        the <code>name</code> data property.
      </p>

      <p>
        Typing in the input updates the Vue data.
      </p>
    `,

    question: "Which directive is commonly used for form two-way binding?",

    options: ["v-model", "v-input", "v-form"],

    correct: 0,
  },

  {
    id: 14,
    group: "FORMS & USER INPUT",
    title: "Forms & Events",
    description: "Learn how to handle form submission in Vue.",

    content: `
      <h2>Handling Forms</h2>

      <p>
        Vue can listen for form submission events using
        <code>@submit</code>.
      </p>

      <p>
        The <code>.prevent</code> modifier can prevent the browser's
        default form submission behavior.
      </p>
    `,

    keyTitle: "@submit.prevent",
    keyDescription: "Use @submit.prevent when you want Vue to handle a form submission without reloading the page.",

    example: `
<div id="app">
  <form @submit.prevent="submitForm">
    <input v-model="name">
    <button>Submit</button>
  </form>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: ""
    };
  },

  methods: {
    submitForm() {
      alert("Form submitted!");
    }
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <form>
          <input style="padding:8px;" placeholder="Name">
          <button style="padding:8px 12px;">Submit</button>
        </form>
      </div>
    `,

    challenge: "Handle form submission with Vue.",

    starterCode: `
<div id="app">
  <form @submit.prevent="submitForm">
    <input v-model="name">
    <button>Submit</button>
  </form>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: ""
    };
  },

  methods: {
    submitForm() {
      alert("Form submitted!");
    }
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>@submit.prevent</code> listens for the form submission
        and prevents the browser from reloading the page.
      </p>

      <p>
        The <code>submitForm()</code> method contains the form logic.
      </p>
    `,

    question: "What does .prevent do?",

    options: ["Prevents the default browser action", "Deletes the form", "Creates a new component"],

    correct: 0,
  },

  {
    id: 15,
    group: "APPLICATION STRUCTURE",
    title: "Vue Application Structure",
    description: "Understand how Vue applications are organized into reusable pieces.",

    content: `
      <h2>Application Structure</h2>

      <p>
        A Vue project can contain components, views, assets,
        composables, and other files.
      </p>

      <p>
        Organizing the application into logical parts makes the
        project easier to maintain.
      </p>
    `,

    keyTitle: "Good structure makes projects scalable",
    keyDescription: "Organize Vue applications into reusable components and logical folders as the project grows.",

    example: `
src/
├── components/
├── views/
├── assets/
├── App.vue
└── main.js
    `,

    result: `
      <div style="font-family: monospace; padding: 20px;">
        src/<br>
        ├── components/<br>
        ├── views/<br>
        ├── assets/<br>
        ├── App.vue<br>
        └── main.js
      </div>
    `,

    challenge: "Think about how you would organize a Vue application.",

    starterCode: `
<!-- A simple Vue application -->

<div id="app">
  <h1>My Vue Application</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Hello Vue!"
    };
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>components</code> can contain reusable UI components.
      </p>

      <p>
        <code>views</code> can contain larger page-level components.
      </p>

      <p>
        <code>main.js</code> is commonly used as an application entry point.
      </p>
    `,

    question: "Why is application structure important?",

    options: ["It helps organize and maintain the project", "It makes HTML unnecessary", "It replaces JavaScript"],

    correct: 0,
  },

  {
    id: 16,
    group: "APPLICATION STRUCTURE",
    title: "Vue Router",
    description: "Learn the purpose of Vue Router for creating multiple views in a Vue application.",

    content: `
      <h2>Vue Router</h2>

      <p>
        Vue Router is used to create navigation between different
        views or pages in a Vue application.
      </p>

      <p>
        It allows applications to behave like multi-page websites
        while remaining a single-page application.
      </p>
    `,

    keyTitle: "Router controls navigation",
    keyDescription: "Vue Router maps URLs to components and allows users to navigate between views.",

    example: `
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/about",
    component: About
  }
];
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>/ → Home</p>
        <p>/about → About</p>
      </div>
    `,

    challenge: "Define two routes: Home and About.",

    starterCode: `
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/about",
    component: About
  }
];
    `,

    explanation: `
      <p>
        The <code>routes</code> array defines available application routes.
      </p>

      <p>
        The <code>path</code> represents the URL.
      </p>

      <p>
        The <code>component</code> determines what should be displayed.
      </p>
    `,

    question: "What is Vue Router used for?",

    options: ["Application navigation", "Database management", "CSS animations"],

    correct: 0,
  },

  {
    id: 17,
    group: "APPLICATION STRUCTURE",
    title: "Lifecycle Hooks",
    description: "Learn the idea behind Vue lifecycle hooks.",

    content: `
      <h2>Lifecycle Hooks</h2>

      <p>
        Vue components go through different stages during their
        lifetime.
      </p>

      <p>
        Lifecycle hooks allow you to run code at specific stages,
        such as when a component is mounted.
      </p>
    `,

    keyTitle: "Hooks run at specific lifecycle stages",
    keyDescription: "Lifecycle hooks let you execute logic when important component lifecycle events occur.",

    example: `
<script>
const { createApp } = Vue;

createApp({
  mounted() {
    console.log("Component mounted!");
  }
}).mount("#app");
</script>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>Component mounted!</p>
      </div>
    `,

    challenge: "Use mounted() to run code after the component is mounted.",

    starterCode: `
<div id="app">
  <h1>Hello Vue</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  mounted() {
    console.log("Component mounted!");
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        <code>mounted()</code> runs after the component has been
        mounted to the DOM.
      </p>
    `,

    question: "When does mounted() run?",

    options: ["After the component is mounted", "Before JavaScript loads", "Only when CSS changes"],

    correct: 0,
  },

  {
    id: 18,
    group: "ADVANCED VUE",
    title: "Watchers",
    description: "Learn how watchers can react when reactive data changes.",

    content: `
      <h2>Watchers</h2>

      <p>
        Watchers allow you to run logic when a specific reactive
        value changes.
      </p>

      <p>
        They are useful when a change should trigger a side effect
        or another operation.
      </p>
    `,

    keyTitle: "Watch changes in data",
    keyDescription: "Use watchers when you need to react to a change in reactive data with additional logic.",

    example: `
createApp({
  data() {
    return {
      search: ""
    };
  },

  watch: {
    search(newValue) {
      console.log("Search:", newValue);
    }
  }
}).mount("#app");
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>Watcher observes changes to search.</p>
      </div>
    `,

    challenge: "Create a watcher that reacts when a value changes.",

    starterCode: `
const { createApp } = Vue;

createApp({
  data() {
    return {
      search: ""
    };
  },

  watch: {
    search(newValue) {
      console.log("Search:", newValue);
    }
  }
}).mount("#app");
    `,

    explanation: `
      <p>
        The <code>watch</code> option contains watchers.
      </p>

      <p>
        The watcher runs whenever the watched property changes.
      </p>
    `,

    question: "What does a watcher react to?",

    options: ["Changes in reactive data", "Only CSS changes", "HTML comments"],

    correct: 0,
  },

  {
    id: 19,
    group: "ADVANCED VUE",
    title: "Composition API",
    description: "Learn the basic idea of Vue's Composition API.",

    content: `
      <h2>Composition API</h2>

      <p>
        The Composition API provides functions such as
        <code>ref()</code> and <code>computed()</code> for organizing
        component logic.
      </p>

      <p>
        It is especially useful for organizing complex reusable logic.
      </p>
    `,

    keyTitle: "Composition API organizes logic",
    keyDescription: "The Composition API lets you group related logic together using composable functions.",

    example: `
<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <button style="padding:10px 16px;">0</button>
      </div>
    `,

    challenge: "Create a reactive counter using ref().",

    starterCode: `
<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
    `,

    explanation: `
      <p>
        <code>ref()</code> creates a reactive reference.
      </p>

      <p>
        In JavaScript, the value is accessed through
        <code>.value</code>.
      </p>

      <p>
        In templates, Vue automatically unwraps the ref,
        so <code>{{ count }}</code> can be used directly.
      </p>
    `,

    question: "Which function creates a reactive reference in the Composition API?",

    options: ["ref()", "reactiveHTML()", "state()"],

    correct: 0,
  },

  {
    id: 20,
    group: "ADVANCED VUE",
    title: "Composables",
    description: "Learn how composables help you reuse Vue logic across components.",

    content: `
      <h2>Composables</h2>

      <p>
        A composable is a reusable function that contains Vue
        Composition API logic.
      </p>

      <p>
        Composables help avoid duplicating the same logic in multiple
        components.
      </p>
    `,

    keyTitle: "Reuse logic with composables",
    keyDescription: "Composables allow you to extract reusable reactive logic into separate functions.",

    example: `
import { ref } from "vue";

export function useCounter() {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  return {
    count,
    increment
  };
}
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>Reusable counter logic</p>
      </div>
    `,

    challenge: "Create a reusable counter composable.",

    starterCode: `
import { ref } from "vue";

export function useCounter() {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  return {
    count,
    increment
  };
}
    `,

    explanation: `
      <p>
        <code>useCounter()</code> is a composable.
      </p>

      <p>
        It contains reactive state and a function that can be reused
        by multiple components.
      </p>
    `,

    question: "What is the main purpose of a composable?",

    options: ["Reuse Vue logic", "Create HTML tags", "Replace CSS"],

    correct: 0,
  },

  {
    id: 21,
    group: "ADVANCED VUE",
    title: "Performance Basics",
    description: "Learn basic ideas for keeping Vue applications efficient.",

    content: `
      <h2>Vue Performance</h2>

      <p>
        Good component design and avoiding unnecessary work can help
        Vue applications remain fast.
      </p>

      <p>
        Vue's reactivity system updates the interface when relevant
        reactive state changes.
      </p>
    `,

    keyTitle: "Keep updates focused",
    keyDescription:
      "Efficient Vue applications avoid unnecessary rendering work and keep components focused on clear responsibilities.",

    example: `
const visibleItems = computed(() => {
  return items.filter(item => item.visible);
});
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>Only visible items are selected.</p>
      </div>
    `,

    challenge: "Filter a list using a computed property.",

    starterCode: `
const visibleItems = computed(() => {
  return items.filter(item => item.visible);
});
    `,

    explanation: `
      <p>
        Computed properties can derive only the data that the
        interface needs.
      </p>

      <p>
        Keeping components focused can also make applications easier
        to maintain and optimize.
      </p>
    `,

    question: "What can help keep a Vue application efficient?",

    options: ["Avoiding unnecessary work", "Duplicating every component", "Adding unnecessary calculations"],

    correct: 0,
  },

  {
    id: 22,
    group: "ADVANCED VUE",
    title: "Vue Best Practices",
    description: "Review important practices for building maintainable Vue applications.",

    content: `
      <h2>Vue Best Practices</h2>

      <p>
        Good Vue applications use clear component responsibilities,
        meaningful names, reusable logic, and a consistent project structure.
      </p>

      <p>
        As your application grows, keeping components small and focused
        makes the code easier to understand and maintain.
      </p>
    `,

    keyTitle: "Write maintainable Vue code",
    keyDescription:
      "Use reusable components, clear names, organized logic, and simple data flow to build maintainable Vue applications.",

    example: `
<template>
  <UserCard
    :name="user.name"
    :role="user.role"
  />
</template>
    `,

    result: `
      <div style="font-family: sans-serif; padding: 20px;">
        <p>A clean, reusable Vue component.</p>
      </div>
    `,

    challenge: "Build a small reusable component using the concepts you learned.",

    starterCode: `
<div id="app">
  <h1>{{ message }}</h1>
  <button @click="changeMessage">
    Change Message
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "You are learning Vue!"
    };
  },

  methods: {
    changeMessage() {
      this.message = "Keep going!";
    }
  }
}).mount("#app");
</script>
    `,

    explanation: `
      <p>
        Good Vue code separates responsibilities into clear,
        reusable pieces.
      </p>

      <p>
        The concepts you've learned can be combined to create
        complete interactive applications.
      </p>
    `,

    question: "What is a good Vue practice?",

    options: [
      "Keep components focused and reusable",
      "Put everything into one huge component",
      "Duplicate the same logic everywhere",
    ],

    correct: 0,
  },
];

/* =========================================================
   STATE
========================================================= */

const STORAGE_KEY = "fayad-vue-learning-progress";

let currentLesson = 1;
let completedLessons = [];

let currentLessonData = null;

/* =========================================================
   DOM ELEMENTS
========================================================= */

const lessonLinks = document.querySelectorAll(".lesson");

const progressText = document.getElementById("progress-text");

const progressFill = document.getElementById("progress-fill");

const lessonNumber = document.getElementById("lesson-number");

const lessonTitle = document.getElementById("lesson-title");

const lessonDescription = document.getElementById("lesson-description");

const lessonContent = document.getElementById("lesson-content");

const keyTitle = document.getElementById("key-title");

const keyDescription = document.getElementById("key-description");

const exampleCode = document.getElementById("example-code");

const exampleResult = document.getElementById("example-result");

const codeEditor = document.getElementById("code-editor");

const challengeText = document.getElementById("challenge-text");

const codeExplanation = document.getElementById("code-explanation");

const question = document.getElementById("question");

const answerOptions = document.getElementById("answer-options");

const answerFeedback = document.getElementById("answer-feedback");

const previousButton = document.getElementById("previous-btn");

const nextButton = document.getElementById("next-btn");

const previousTitle = document.getElementById("previous-title");

const nextTitle = document.getElementById("next-title");

const copyButton = document.getElementById("copy-btn");

const runButton = document.getElementById("run-code");

const resetButton = document.getElementById("reset-code");

const livePreview = document.getElementById("live-preview");

const languageButton = document.querySelector(".language-btn");

/* =========================================================
   LOAD PROGRESS
========================================================= */

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      completedLessons = [];
      return;
    }

    const parsed = JSON.parse(saved);

    if (Array.isArray(parsed)) {
      completedLessons = parsed.map(Number).filter(Number.isFinite);
    }
  } catch (error) {
    console.error("Unable to load Vue learning progress:", error);

    completedLessons = [];
  }
}

/* =========================================================
   SAVE PROGRESS
========================================================= */

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
  } catch (error) {
    console.error("Unable to save Vue learning progress:", error);
  }
}

/* =========================================================
   COMPLETE LESSON
========================================================= */

function markLessonCompleted(id) {
  const numericId = Number(id);

  if (!completedLessons.includes(numericId)) {
    completedLessons.push(numericId);

    completedLessons.sort((a, b) => a - b);

    saveProgress();
  }

  renderSidebar();
  updateProgress();
}

/* =========================================================
   SIDEBAR
========================================================= */

function renderSidebar() {
  lessonLinks.forEach((link) => {
    const id = Number(link.dataset.lesson) + 1;

    const status = link.querySelector(".lesson-status");

    link.classList.remove("active", "completed");

    status.classList.remove("current", "completed");

    if (id === currentLesson) {
      link.classList.add("active");
      status.classList.add("current");
    }

    if (completedLessons.includes(id)) {
      link.classList.add("completed");
      status.classList.add("completed");
    }
  });
}

/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {
  const total = lessons.length;

  const completed = completedLessons.length;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (progressText) {
    progressText.textContent = `${percentage}%`;
  }

  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }
}

/* =========================================================
   LOAD LESSON
========================================================= */

function loadLesson(id) {
  const numericId = Number(id);

  const lesson = lessons.find((item) => item.id === numericId);

  if (!lesson) {
    return;
  }

  currentLesson = numericId;

  currentLessonData = lesson;

  if (lessonNumber) {
    lessonNumber.textContent = `LESSON ${String(lesson.id).padStart(2, "0")}`;
  }

  if (lessonTitle) {
    lessonTitle.textContent = lesson.title;
  }

  if (lessonDescription) {
    lessonDescription.textContent = lesson.description;
  }

  if (lessonContent) {
    lessonContent.innerHTML = lesson.content;
  }

  if (keyTitle) {
    keyTitle.textContent = lesson.keyTitle;
  }

  if (keyDescription) {
    keyDescription.textContent = lesson.keyDescription;
  }

  if (exampleCode) {
    exampleCode.textContent = lesson.example.trim();
  }

  if (exampleResult) {
    exampleResult.innerHTML = lesson.result;
  }

  if (codeEditor) {
    codeEditor.value = lesson.starterCode.trim();
  }

  if (challengeText) {
    challengeText.textContent = lesson.challenge;
  }

  if (codeExplanation) {
    codeExplanation.innerHTML = lesson.explanation;
  }

  renderQuiz(lesson);
  updateNavigation();
  renderSidebar();
  updateProgress();

  runCode();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* =========================================================
   QUIZ
========================================================= */

function renderQuiz(lesson) {
  if (!question || !answerOptions) {
    return;
  }

  question.textContent = lesson.question;

  answerOptions.innerHTML = "";

  if (answerFeedback) {
    answerFeedback.textContent = "";
    answerFeedback.className = "answer-feedback";
  }

  lesson.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = option;

    button.addEventListener("click", () => {
      handleAnswer(index, lesson);
    });

    answerOptions.appendChild(button);
  });
}

/* =========================================================
   QUIZ ANSWER
========================================================= */

function handleAnswer(selectedIndex, lesson) {
  const buttons = answerOptions.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.remove("correct", "wrong");
  });

  const selectedButton = buttons[selectedIndex];

  if (selectedIndex === lesson.correct) {
    selectedButton.classList.add("correct");

    if (answerFeedback) {
      answerFeedback.textContent = "Correct! Great job.";

      answerFeedback.className = "answer-feedback correct";
    }

    markLessonCompleted(lesson.id);
  } else {
    selectedButton.classList.add("wrong");

    if (buttons[lesson.correct]) {
      buttons[lesson.correct].classList.add("correct");
    }

    if (answerFeedback) {
      answerFeedback.textContent = "Not quite. The correct answer is highlighted.";

      answerFeedback.className = "answer-feedback wrong";
    }
  }
}

/* =========================================================
   NAVIGATION
========================================================= */

function updateNavigation() {
  const currentIndex = lessons.findIndex((lesson) => lesson.id === currentLesson);

  const previous = lessons[currentIndex - 1];

  const next = lessons[currentIndex + 1];

  if (previous) {
    previousButton.disabled = false;

    previousTitle.textContent = previous.title;
  } else {
    previousButton.disabled = true;

    previousTitle.textContent = "Home";
  }

  if (next) {
    nextButton.disabled = false;

    nextTitle.textContent = next.title;
  } else {
    nextButton.disabled = false;

    nextTitle.textContent = "Course Completed";
  }
}

/* =========================================================
   PREVIOUS BUTTON
========================================================= */

if (previousButton) {
  previousButton.addEventListener("click", () => {
    const index = lessons.findIndex((lesson) => lesson.id === currentLesson);

    if (index > 0) {
      loadLesson(lessons[index - 1].id);
    }
  });
}

/* =========================================================
   NEXT BUTTON
========================================================= */

if (nextButton) {
  nextButton.addEventListener("click", () => {
    const current = lessons.find((lesson) => lesson.id === currentLesson);

    if (!current) {
      return;
    }

    /*
     * Completing a lesson is controlled here too.
     * This makes the progress bar advance when
     * the learner moves forward.
     */
    markLessonCompleted(current.id);

    const index = lessons.findIndex((lesson) => lesson.id === currentLesson);

    const next = lessons[index + 1];

    if (next) {
      loadLesson(next.id);
    } else {
      updateProgress();
      renderSidebar();

      alert("Congratulations! You completed the Vue Learning Path.");
    }
  });
}

/* =========================================================
   SIDEBAR EVENTS
========================================================= */

lessonLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const index = Number(link.dataset.lesson);

    const lesson = lessons[index];

    if (lesson) {
      loadLesson(lesson.id);
    }
  });
});

/* =========================================================
   COPY CODE
========================================================= */

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    if (!currentLessonData) {
      return;
    }

    const code = currentLessonData.example.trim();

    try {
      await navigator.clipboard.writeText(code);

      copyButton.textContent = "Copied!";

      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  });
}

/* =========================================================
   RUN CODE
========================================================= */

function runCode() {
  if (!codeEditor || !livePreview) {
    return;
  }

  const code = codeEditor.value;

  const vueCDN = "https://unpkg.com/vue@3/dist/vue.global.js";

  const finalHTML = `
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">

  <style>
    body {
      font-family:
        Arial,
        sans-serif;

      padding: 24px;

      color: #111;

      background: #fff;
    }

    button,
    input {
      font: inherit;
    }

    button {
      padding: 8px 14px;
      cursor: pointer;
    }

    img {
      max-width: 100%;
    }
  </style>
</head>

<body>

${code}

<script src="${vueCDN}"><\/script>

</body>
</html>
`;

  livePreview.srcdoc = finalHTML;
}

/* =========================================================
   RUN BUTTON
========================================================= */

if (runButton) {
  runButton.addEventListener("click", () => {
    runCode();
  });
}

/* =========================================================
   RESET CODE
========================================================= */

if (resetButton) {
  resetButton.addEventListener("click", () => {
    if (!currentLessonData) {
      return;
    }

    codeEditor.value = currentLessonData.starterCode.trim();

    runCode();
  });
}

/* =========================================================
   AUTO PREVIEW
========================================================= */

if (codeEditor) {
  codeEditor.addEventListener("input", () => {
    clearTimeout(window.__vuePreviewTimer);

    window.__vuePreviewTimer = setTimeout(runCode, 400);
  });
}

/* =========================================================
   LANGUAGE BUTTON
========================================================= */

if (languageButton) {
  languageButton.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("lang");

    if (current === "en") {
      document.documentElement.setAttribute("lang", "ar");

      document.documentElement.setAttribute("dir", "rtl");

      languageButton.textContent = "EN";
    } else {
      document.documentElement.setAttribute("lang", "en");

      document.documentElement.setAttribute("dir", "ltr");

      languageButton.textContent = "AR";
    }
  });
}

/* =========================================================
   INITIALIZE
========================================================= */

function init() {
  loadProgress();

  if (!lessons.some((lesson) => lesson.id === currentLesson)) {
    currentLesson = 1;
  }

  loadLesson(currentLesson);
}

init();
