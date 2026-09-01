/* =========================================================
   FAYAD — HTML LEARNING ENGINE
   Fixed version — works with the current HTML structure
========================================================= */

/* =========================================================
   1. LESSON DATA
========================================================= */

const lessons = [
  {
    id: 1,
    group: "HTML FUNDAMENTALS",
    title: "Introduction to HTML",
    description: "Learn what HTML is, why we use it, and how it creates the structure of a web page.",

    content: `
      <article class="content-card">
        <h2>What is HTML?</h2>

        <p>
          HTML stands for
          <strong>HyperText Markup Language</strong>.
        </p>

        <p>
          It is the standard markup language used
          to create and structure content on web pages.
        </p>

        <p>
          HTML tells the browser what each piece
          of content represents.
        </p>
      </article>

      <article class="content-card">
        <div class="info-label">KEY IDEA</div>

        <h2>HTML creates the structure</h2>

        <p>
          Think of a website like a building.
          HTML creates the structure of the building,
          while CSS controls its appearance.
        </p>
      </article>
    `,

    exampleTitle: "Your first HTML code",

    exampleCode: `<h1>Hello World</h1>
<p>Welcome to FAYAD.</p>`,

    result: `
      <h1>Hello World</h1>
      <p>Welcome to FAYAD.</p>
    `,

    explanation: `
      <p>
        The <code>&lt;h1&gt;</code> element represents
        the main heading of the page.
      </p>

      <p>
        The <code>&lt;p&gt;</code> element represents
        a paragraph.
      </p>

      <p>
        HTML elements are used to give structure
        and meaning to web content.
      </p>
    `,

    question: "What does HTML mainly create?",
    options: ["The structure of a web page", "The color of a web page", "Programming logic"],
    correct: 0,

    practice: "Create one heading and one paragraph using HTML.",
    starterCode: `<h1>Hello World</h1>
<p>Welcome to my website.</p>`,
  },

  {
    id: 2,
    group: "HTML FUNDAMENTALS",
    title: "Document Structure",
    description: "Learn how an HTML document is structured and understand the purpose of its main elements.",

    content: `
      <article class="content-card">
        <h2>What is an HTML document?</h2>

        <p>
          An HTML document is a file that contains
          the structure and content of a web page.
        </p>

        <p>
          HTML documents normally follow a basic
          structure that helps the browser understand
          the page correctly.
        </p>
      </article>

      <article class="content-card">
        <div class="info-label">KEY IDEA</div>

        <h2>The basic HTML structure</h2>

        <p>
          The <code>&lt;html&gt;</code> element contains
          the entire document.
        </p>

        <p>
          The <code>&lt;head&gt;</code> contains
          information about the page.
        </p>

        <p>
          The <code>&lt;body&gt;</code> contains
          the visible page content.
        </p>
      </article>
    `,

    exampleTitle: "Basic HTML document",

    exampleCode: `<!DOCTYPE html>

<html>

<head>
  <title>My First Page</title>
</head>

<body>

  <h1>Hello World</h1>

  <p>Welcome to my website.</p>

</body>

</html>`,

    result: `
      <h1>Hello World</h1>
      <p>Welcome to my website.</p>
    `,

    explanation: `
      <p>
        <code>&lt;!DOCTYPE html&gt;</code>
        tells the browser that this is an HTML5 document.
      </p>

      <p>
        <code>&lt;html&gt;</code>
        is the root element.
      </p>

      <p>
        <code>&lt;head&gt;</code>
        contains document information.
      </p>

      <p>
        <code>&lt;body&gt;</code>
        contains visible content.
      </p>
    `,

    question: "Where does visible page content go?",
    options: ["&lt;head&gt;", "&lt;body&gt;", "&lt;title&gt;"],
    correct: 1,

    practice: "Create a complete HTML document with a title, one heading, and one paragraph.",

    starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello</h1>
  <p>My paragraph.</p>
</body>
</html>`,
  },

  {
    id: 3,
    group: "HTML FUNDAMENTALS",
    title: "Tags & Elements",
    description: "Understand HTML tags, elements, opening tags, closing tags, and how elements are created.",

    content: `
      <article class="content-card">
        <h2>What is an HTML tag?</h2>

        <p>
          HTML tags are special keywords written
          inside angle brackets.
        </p>

        <p>
          Tags tell the browser what type of content
          an element represents.
        </p>
      </article>

      <article class="content-card">
        <div class="info-label">KEY IDEA</div>

        <h2>Tag vs Element</h2>

        <p>
          A tag is the markup itself, such as
          <code>&lt;p&gt;</code>.
        </p>

        <p>
          An element usually includes the opening tag,
          content, and closing tag.
        </p>
      </article>
    `,

    exampleTitle: "HTML elements",

    exampleCode: `<h1>Welcome</h1>

<p>This is a paragraph.</p>

<strong>Important text</strong>`,

    result: `
      <h1>Welcome</h1>
      <p>This is a paragraph.</p>
      <strong>Important text</strong>
    `,

    explanation: `
      <p>
        An opening tag starts an element.
      </p>

      <p>
        The content appears between the tags.
      </p>

      <p>
        A closing tag ends the element.
      </p>
    `,

    question: "Which one represents a paragraph element?",
    options: ["&lt;p&gt;Hello&lt;/p&gt;", "&lt;paragraph&gt;Hello&lt;/paragraph&gt;", "&lt;text&gt;Hello&lt;/text&gt;"],
    correct: 0,

    practice: "Create a heading, paragraph, and strong element.",

    starterCode: `<h1>My Heading</h1>
<p>My paragraph.</p>
<strong>Important</strong>`,
  },

  {
    id: 4,
    group: "HTML FUNDAMENTALS",
    title: "Attributes",
    description: "Learn how HTML attributes provide additional information about elements.",

    content: `
      <article class="content-card">
        <h2>What is an attribute?</h2>

        <p>
          An attribute provides additional information
          about an HTML element.
        </p>

        <p>
          Attributes are usually written inside
          the opening tag.
        </p>
      </article>

      <article class="content-card">
        <div class="info-label">KEY IDEA</div>

        <h2>Common attributes</h2>

        <p>
          <code>href</code> specifies the destination
          of a link.
        </p>

        <p>
          <code>src</code> specifies the source of
          an image.
        </p>

        <p>
          <code>alt</code> describes an image.
        </p>
      </article>
    `,

    exampleTitle: "HTML attributes",

    exampleCode: `<a href="https://example.com">
  Visit Example
</a>

<img
  src="image.jpg"
  alt="A beautiful image"
>`,

    result: `
      <a href="https://example.com">
        Visit Example
      </a>
      <br><br>
      <p>Image example using src and alt.</p>
    `,

    explanation: `
      <p>
        Attributes provide additional information
        about HTML elements.
      </p>

      <p>
        They are normally written inside the opening tag.
      </p>

      <p>
        Attributes usually have a name and a value.
      </p>
    `,

    question: "Where are attributes written?",
    options: ["Inside the opening tag", "Inside the closing tag", "Outside the element"],
    correct: 0,

    practice: "Create a link using href and an image using src and alt.",

    starterCode: `<a href="https://example.com">
  Visit Example
</a>

<img src="image.jpg" alt="Example image">`,
  },

  {
    id: 5,
    group: "HTML FUNDAMENTALS",
    title: "Headings",
    description: "Learn how to use HTML headings from h1 to h6 and structure your content correctly.",

    content: `
      <article class="content-card">
        <h2>HTML headings</h2>

        <p>
          HTML provides six heading levels:
          <code>&lt;h1&gt;</code> through
          <code>&lt;h6&gt;</code>.
        </p>

        <p>
          <code>&lt;h1&gt;</code> is the most important
          heading and <code>&lt;h6&gt;</code> is the least.
        </p>
      </article>
    `,

    exampleTitle: "Heading levels",

    exampleCode: `<h1>Main title</h1>
<h2>Section title</h2>
<h3>Subsection</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>`,

    result: `
      <h1>Main title</h1>
      <h2>Section title</h2>
      <h3>Subsection</h3>
    `,

    explanation: `
      <p>
        HTML has six heading levels from
        <code>&lt;h1&gt;</code> to
        <code>&lt;h6&gt;</code>.
      </p>

      <p>
        Headings help organize page content
        into a clear hierarchy.
      </p>
    `,

    question: "Which heading has the highest level?",
    options: ["&lt;h1&gt;", "&lt;h4&gt;", "&lt;h6&gt;"],
    correct: 0,

    practice: "Create an h1 for your page title, an h2 for a section, and an h3 for a subsection.",

    starterCode: `<h1>My Website</h1>
<h2>About Me</h2>
<h3>My Skills</h3>`,
  },

  {
    id: 6,
    group: "HTML FUNDAMENTALS",
    title: "Paragraphs",
    description: "Learn how to create paragraphs and organize readable text in HTML.",

    content: `
      <article class="content-card">
        <h2>Paragraphs in HTML</h2>

        <p>
          The <code>&lt;p&gt;</code> element is used
          to create a paragraph.
        </p>

        <p>
          Paragraphs help divide text into readable
          blocks of content.
        </p>
      </article>
    `,

    exampleTitle: "Creating paragraphs",

    exampleCode: `<p>
  HTML is easy to learn.
</p>

<p>
  You can use HTML to structure
  web pages.
</p>`,

    result: `
      <p>HTML is easy to learn.</p>
      <p>You can use HTML to structure web pages.</p>
    `,

    explanation: `
      <p>
        The <code>&lt;p&gt;</code> element creates
        a paragraph.
      </p>

      <p>
        Using separate paragraphs makes content
        easier to read.
      </p>
    `,

    question: "Which element creates a paragraph?",
    options: ["&lt;text&gt;", "&lt;p&gt;", "&lt;paragraph&gt;"],
    correct: 1,

    practice: "Write a paragraph introducing yourself as a web developer.",

    starterCode: `<p>
  My name is Mido and I am learning web development.
</p>`,
  },

  {
    id: 7,
    group: "TEXT & CONTENT",
    title: "Text Formatting",
    description: "Learn how to emphasize, highlight, and format text using HTML elements.",

    content: `
      <article class="content-card">
        <h2>Formatting text</h2>

        <p>
          HTML provides elements that give meaning
          to different types of text.
        </p>
      </article>
    `,

    exampleTitle: "Text formatting",

    exampleCode: `<strong>Important</strong>

<em>Emphasized</em>

<mark>Highlighted</mark>

<small>Small text</small>`,

    result: `
      <p><strong>Important</strong></p>
      <p><em>Emphasized</em></p>
      <p><mark>Highlighted</mark></p>
      <p><small>Small text</small></p>
    `,

    explanation: `
      <p>
        <code>&lt;strong&gt;</code> gives strong importance.
      </p>

      <p>
        <code>&lt;em&gt;</code> represents emphasis.
      </p>

      <p>
        <code>&lt;mark&gt;</code> highlights text.
      </p>
    `,

    question: "Which element gives strong importance?",
    options: ["&lt;strong&gt;", "&lt;small&gt;", "&lt;mark&gt;"],
    correct: 0,

    practice: "Create text using strong, em, and mark.",

    starterCode: `<strong>Important text</strong>
<em>Emphasized text</em>
<mark>Highlighted text</mark>`,
  },

  {
    id: 8,
    group: "TEXT & CONTENT",
    title: "Links",
    description: "Learn how to create links and navigate between web pages.",

    content: `
      <article class="content-card">
        <h2>HTML links</h2>

        <p>
          Links allow users to move from one page
          to another.
        </p>
      </article>
    `,

    exampleTitle: "Creating a link",

    exampleCode: `<a href="https://example.com">
  Visit Example
</a>`,

    result: `
      <a href="https://example.com">
        Visit Example
      </a>
    `,

    explanation: `
      <p>
        The <code>&lt;a&gt;</code> element creates
        a hyperlink.
      </p>

      <p>
        The <code>href</code> attribute specifies
        where the link goes.
      </p>
    `,

    question: "Which attribute specifies the link destination?",
    options: ["src", "href", "link"],
    correct: 1,

    practice: "Create a link to another page using the href attribute.",

    starterCode: `<a href="https://example.com">
  Visit Example
</a>`,
  },

  {
    id: 9,
    group: "TEXT & CONTENT",
    title: "Images",
    description: "Learn how to add images to web pages using the img element.",

    content: `
      <article class="content-card">
        <h2>Images in HTML</h2>

        <p>
          The <code>&lt;img&gt;</code> element displays
          an image on a web page.
        </p>
      </article>

      <article class="content-card">
        <div class="info-label">IMPORTANT</div>

        <h2>Why is alt important?</h2>

        <p>
          The alt attribute provides alternative text
          that describes the image.
        </p>
      </article>
    `,

    exampleTitle: "Adding an image",

    exampleCode: `<img
  src="profile.jpg"
  alt="Profile photo"
>`,

    result: `
      <div>
        <p>Example image element:</p>
        <code>&lt;img src="profile.jpg" alt="Profile photo"&gt;</code>
      </div>
    `,

    explanation: `
      <p>
        The <code>src</code> attribute specifies
        the image source.
      </p>

      <p>
        The <code>alt</code> attribute provides
        alternative text for the image.
      </p>
    `,

    question: "Which attribute describes an image?",
    options: ["href", "alt", "title"],
    correct: 1,

    practice: "Create an image element with src and alt attributes.",

    starterCode: `<img
  src="profile.jpg"
  alt="Profile photo"
>`,
  },

  {
    id: 10,
    group: "TEXT & CONTENT",
    title: "Lists",
    description: "Learn how to create ordered and unordered lists.",

    content: `
      <article class="content-card">
        <h2>HTML lists</h2>

        <p>
          HTML supports ordered lists and unordered lists.
        </p>
      </article>
    `,

    exampleTitle: "Lists",

    exampleCode: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<ol>
  <li>Learn</li>
  <li>Practice</li>
  <li>Build</li>
</ol>`,

    result: `
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>

      <ol>
        <li>Learn</li>
        <li>Practice</li>
        <li>Build</li>
      </ol>
    `,

    explanation: `
      <p>
        <code>&lt;ul&gt;</code> creates an unordered list.
      </p>

      <p>
        <code>&lt;ol&gt;</code> creates an ordered list.
      </p>

      <p>
        <code>&lt;li&gt;</code> creates a list item.
      </p>
    `,

    question: "Which element creates a list item?",
    options: ["&lt;item&gt;", "&lt;li&gt;", "&lt;list&gt;"],
    correct: 1,

    practice: "Create a list containing the technologies you want to learn.",

    starterCode: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
  },

  {
    id: 11,
    group: "TEXT & CONTENT",
    title: "Tables",
    description: "Learn how to organize data using HTML tables.",

    content: `
      <article class="content-card">
        <h2>HTML tables</h2>

        <p>
          Tables are useful for displaying structured
          data in rows and columns.
        </p>
      </article>
    `,

    exampleTitle: "Simple table",

    exampleCode: `<table>
  <tr>
    <th>Name</th>
    <th>Level</th>
  </tr>

  <tr>
    <td>HTML</td>
    <td>Beginner</td>
  </tr>
</table>`,

    result: `
      <table>
        <tr>
          <th>Name</th>
          <th>Level</th>
        </tr>
        <tr>
          <td>HTML</td>
          <td>Beginner</td>
        </tr>
      </table>
    `,

    explanation: `
      <p>
        <code>&lt;table&gt;</code> creates a table.
      </p>

      <p>
        <code>&lt;tr&gt;</code> creates a table row.
      </p>

      <p>
        <code>&lt;th&gt;</code> creates a header cell.
      </p>

      <p>
        <code>&lt;td&gt;</code> creates a data cell.
      </p>
    `,

    question: "Which element creates a table row?",
    options: ["&lt;tr&gt;", "&lt;td&gt;", "&lt;row&gt;"],
    correct: 0,

    practice: "Create a table with two columns and at least two rows.",

    starterCode: `<table>
  <tr>
    <th>Technology</th>
    <th>Level</th>
  </tr>

  <tr>
    <td>HTML</td>
    <td>Beginner</td>
  </tr>
</table>`,
  },

  {
    id: 12,
    group: "TEXT & CONTENT",
    title: "Semantic HTML",
    description: "Learn why semantic HTML elements make websites more meaningful and accessible.",

    content: `
      <article class="content-card">
        <h2>What is semantic HTML?</h2>

        <p>
          Semantic elements clearly describe
          the meaning of their content.
        </p>

        <p>
          Examples include header, nav, main,
          article, section, aside, and footer.
        </p>
      </article>
    `,

    exampleTitle: "Semantic elements",

    exampleCode: `<header>
  Website Header
</header>

<nav>
  Navigation
</nav>

<main>
  Main Content
</main>

<footer>
  Footer
</footer>`,

    result: `
      <header>Website Header</header>
      <nav>Navigation</nav>
      <main>Main Content</main>
      <footer>Footer</footer>
    `,

    explanation: `
      <p>
        Semantic HTML gives meaning to page structure.
      </p>

      <p>
        Semantic elements can improve accessibility,
        readability, and SEO.
      </p>
    `,

    question: "Which element represents the main content?",
    options: ["&lt;main&gt;", "&lt;div&gt;", "&lt;content&gt;"],
    correct: 0,

    practice: "Create a page structure using header, nav, main, and footer.",

    starterCode: `<header>FAYAD</header>

<nav>
  <a href="#">Home</a>
  <a href="#">Courses</a>
</nav>

<main>
  <h1>HTML Course</h1>
</main>

<footer>
  © 2026 FAYAD
</footer>`,
  },

  {
    id: 13,
    group: "FORMS",
    title: "Forms",
    description: "Learn how HTML forms collect information from users.",

    content: `
      <article class="content-card">
        <h2>HTML forms</h2>

        <p>
          Forms allow users to enter and submit information.
        </p>

        <p>
          Forms commonly contain inputs, labels,
          buttons, selects, and other controls.
        </p>
      </article>
    `,

    exampleTitle: "Basic form",

    exampleCode: `<form>
  <input type="text">

  <button type="submit">
    Submit
  </button>
</form>`,

    result: `
      <form>
        <input type="text" placeholder="Enter your name">
        <button type="submit">Submit</button>
      </form>
    `,

    explanation: `
      <p>
        The <code>&lt;form&gt;</code> element
        contains form controls.
      </p>

      <p>
        Inputs collect information from users.
      </p>

      <p>
        Buttons can submit the form.
      </p>
    `,

    question: "Which element creates a form?",
    options: ["&lt;form&gt;", "&lt;input&gt;", "&lt;submit&gt;"],
    correct: 0,

    practice: "Create a form containing a text input and a submit button.",

    starterCode: `<form>
  <input type="text" placeholder="Your name">
  <button type="submit">Submit</button>
</form>`,
  },

  {
    id: 14,
    group: "FORMS",
    title: "Input",
    description: "Learn the different types of HTML input controls.",

    content: `
      <article class="content-card">
        <h2>Input elements</h2>

        <p>
          The input element allows users to enter
          different types of information.
        </p>

        <p>
          The type attribute changes the kind
          of input control.
        </p>
      </article>
    `,

    exampleTitle: "Input types",

    exampleCode: `<input type="text">

<input type="email">

<input type="password">

<input type="number">

<input type="date">`,

    result: `
      <input type="text" placeholder="Text">
      <br><br>
      <input type="email" placeholder="Email">
      <br><br>
      <input type="password" placeholder="Password">
      <br><br>
      <input type="number" placeholder="Number">
      <br><br>
      <input type="date">
    `,

    explanation: `
      <p>
        <code>type="text"</code> creates a text input.
      </p>

      <p>
        <code>type="email"</code> is designed for email addresses.
      </p>

      <p>
        <code>type="password"</code> hides entered characters.
      </p>

      <p>
        <code>type="number"</code> accepts numeric input.
      </p>
    `,

    question: "Which input type is used for email?",
    options: ["text", "email", "mail"],
    correct: 1,

    practice: "Create text, email, password, and number inputs.",

    starterCode: `<input type="text" placeholder="Name">
<input type="email" placeholder="Email">
<input type="password" placeholder="Password">
<input type="number" placeholder="Age">`,
  },

  {
    id: 15,
    group: "FORMS",
    title: "Labels & Buttons",
    description: "Learn how to create accessible labels and interactive buttons.",

    content: `
      <article class="content-card">
        <h2>Labels and buttons</h2>

        <p>
          Labels describe form controls and buttons
          allow users to perform actions.
        </p>

        <p>
          A label can be connected to an input
          using the for and id attributes.
        </p>
      </article>
    `,

    exampleTitle: "Labels and buttons",

    exampleCode: `<label for="username">
  Username
</label>

<input
  id="username"
  type="text"
>

<button type="submit">
  Submit
</button>`,

    result: `
      <label for="username">Username</label>
      <input id="username" type="text">
      <button type="submit">Submit</button>
    `,

    explanation: `
      <p>
        The <code>for</code> attribute on a label
        connects it to an input's <code>id</code>.
      </p>

      <p>
        Buttons allow users to perform actions.
      </p>
    `,

    question: "Which attribute connects a label to an input?",
    options: ["for", "connect", "target"],
    correct: 0,

    practice: "Create a label connected to a text input using for and id.",

    starterCode: `<label for="username">
  Username
</label>

<input id="username" type="text">

<button>Submit</button>`,
  },

  {
    id: 16,
    group: "PAGE STRUCTURE",
    title: "Header & Navigation",
    description: "Learn how to create website headers and navigation areas.",

    content: `
      <article class="content-card">
        <h2>Header and navigation</h2>

        <p>
          The header usually contains introductory
          content, branding, or navigation.
        </p>

        <p>
          The nav element represents a section
          containing navigation links.
        </p>
      </article>
    `,

    exampleTitle: "Header and navigation",

    exampleCode: `<header>

  <h1>FAYAD</h1>

  <nav>

    <a href="/">Home</a>
    <a href="/courses">Courses</a>
    <a href="/about">About</a>

  </nav>

</header>`,

    result: `
      <header>
        <h1>FAYAD</h1>

        <nav>
          <a href="#">Home</a>
          <a href="#">Courses</a>
          <a href="#">About</a>
        </nav>
      </header>
    `,

    explanation: `
      <p>
        <code>&lt;header&gt;</code> represents
        introductory content for a page or section.
      </p>

      <p>
        <code>&lt;nav&gt;</code> represents
        navigation links.
      </p>
    `,

    question: "Which element represents navigation?",
    options: ["&lt;nav&gt;", "&lt;navigation&gt;", "&lt;menu-area&gt;"],
    correct: 0,

    practice: "Create a header containing a logo and three navigation links.",

    starterCode: `<header>
  <h1>FAYAD</h1>

  <nav>
    <a href="#">Home</a>
    <a href="#">Courses</a>
    <a href="#">About</a>
  </nav>
</header>`,
  },

  {
    id: 17,
    group: "PAGE STRUCTURE",
    title: "Main & Section",
    description: "Learn how main and section elements organize the main content of a page.",

    content: `
      <article class="content-card">
        <h2>Main and section</h2>

        <p>
          The main element contains the primary content
          of a page.
        </p>

        <p>
          Section elements divide content into logical
          sections.
        </p>
      </article>
    `,

    exampleTitle: "Main and section",

    exampleCode: `<main>

  <section>

    <h2>Courses</h2>

    <p>
      Learn web development.
    </p>

  </section>

</main>`,

    result: `
      <main>
        <section>
          <h2>Courses</h2>
          <p>Learn web development.</p>
        </section>
      </main>
    `,

    explanation: `
      <p>
        The <code>&lt;main&gt;</code> element contains
        the primary content of the document.
      </p>

      <p>
        The <code>&lt;section&gt;</code> element represents
        a thematic section of content.
      </p>
    `,

    question: "Which element contains the primary page content?",
    options: ["&lt;main&gt;", "&lt;primary&gt;", "&lt;content&gt;"],
    correct: 0,

    practice: "Create a main element containing two sections.",

    starterCode: `<main>
  <section>
    <h2>HTML</h2>
    <p>Learn HTML.</p>
  </section>

  <section>
    <h2>CSS</h2>
    <p>Learn CSS.</p>
  </section>
</main>`,
  },

  {
    id: 18,
    group: "PAGE STRUCTURE",
    title: "Article & Aside",
    description: "Learn when to use article and aside elements.",

    content: `
      <article class="content-card">
        <h2>Article and aside</h2>

        <p>
          The article element represents independent
          content.
        </p>

        <p>
          The aside element contains related or secondary
          information.
        </p>
      </article>
    `,

    exampleTitle: "Article and aside",

    exampleCode: `<article>

  <h2>HTML Course</h2>

  <p>
    Learn HTML step by step.
  </p>

</article>

<aside>

  Related Courses

</aside>`,

    result: `
      <article>
        <h2>HTML Course</h2>
        <p>Learn HTML step by step.</p>
      </article>

      <aside>
        Related Courses
      </aside>
    `,

    explanation: `
      <p>
        <code>&lt;article&gt;</code> represents
        self-contained content.
      </p>

      <p>
        <code>&lt;aside&gt;</code> represents
        related or secondary content.
      </p>
    `,

    question: "Which element represents related secondary content?",
    options: ["&lt;aside&gt;", "&lt;secondary&gt;", "&lt;side&gt;"],
    correct: 0,

    practice: "Create an article with a title, paragraph, and related aside content.",

    starterCode: `<article>
  <h2>HTML Course</h2>
  <p>Learn HTML step by step.</p>
</article>

<aside>
  Related Courses
</aside>`,
  },

  {
    id: 19,
    group: "PAGE STRUCTURE",
    title: "Footer",
    description: "Learn how to create the footer area of a web page.",

    content: `
      <article class="content-card">
        <h2>HTML footer</h2>

        <p>
          The footer usually contains information
          about the page, copyright, or useful links.
        </p>
      </article>
    `,

    exampleTitle: "Footer",

    exampleCode: `<footer>

  <p>
    © 2026 FAYAD
  </p>

</footer>`,

    result: `
      <footer>
        <p>© 2026 FAYAD</p>
      </footer>
    `,

    explanation: `
      <p>
        The <code>&lt;footer&gt;</code> element represents
        footer content for a page or section.
      </p>

      <p>
        It can contain copyright information,
        links, contact information, and more.
      </p>
    `,

    question: "Which element represents a footer?",
    options: ["&lt;bottom&gt;", "&lt;footer&gt;", "&lt;end&gt;"],
    correct: 1,

    practice: "Create a footer containing a copyright notice.",

    starterCode: `<footer>
  <p>© 2026 FAYAD</p>
</footer>`,
  },

  {
    id: 20,
    group: "ADVANCED HTML",
    title: "Accessibility",
    description: "Learn the basics of making HTML websites accessible to more users.",

    content: `
      <article class="content-card">
        <h2>What is accessibility?</h2>

        <p>
          Accessibility means making websites usable
          by people with different abilities.
        </p>
      </article>

      <article class="content-card">
        <div class="info-label">KEY IDEA</div>

        <h2>Semantic HTML helps accessibility</h2>

        <p>
          Meaningful HTML elements help assistive
          technologies understand page content.
        </p>
      </article>
    `,

    exampleTitle: "Accessible image",

    exampleCode: `<img
  src="student.jpg"
  alt="Student learning HTML"
>`,

    result: `
      <p>
        An accessible image should have meaningful
        alternative text.
      </p>
    `,

    explanation: `
      <p>
        Good HTML structure can make websites easier
        to use for people with different abilities.
      </p>

      <p>
        Meaningful alt text helps users who cannot
        see an image understand its purpose.
      </p>
    `,

    question: "Which attribute helps describe an image?",
    options: ["alt", "description", "image-text"],
    correct: 0,

    practice: "Add meaningful alt text to images and use semantic elements.",

    starterCode: `<img
  src="student.jpg"
  alt="Student learning HTML"
>`,
  },

  {
    id: 21,
    group: "ADVANCED HTML",
    title: "SEO Basics",
    description: "Learn basic HTML practices that help search engines understand your pages.",

    content: `
      <article class="content-card">
        <h2>HTML and SEO</h2>

        <p>
          SEO stands for Search Engine Optimization.
        </p>

        <p>
          Good HTML structure can help search engines
          understand the content of a page.
        </p>
      </article>
    `,

    exampleTitle: "Basic SEO structure",

    exampleCode: `<title>
  Learn HTML | FAYAD
</title>

<h1>
  Learn HTML
</h1>

<p>
  Learn HTML step by step.
</p>`,

    result: `
      <h1>Learn HTML</h1>
      <p>Learn HTML step by step.</p>
    `,

    explanation: `
      <p>
        A meaningful <code>&lt;title&gt;</code> helps
        describe the page.
      </p>

      <p>
        A clear heading hierarchy helps organize
        page content.
      </p>

      <p>
        Descriptive content helps search engines
        understand the page.
      </p>
    `,

    question: "Which element contains the page title?",
    options: ["&lt;title&gt;", "&lt;heading&gt;", "&lt;page-title&gt;"],
    correct: 0,

    practice: "Create a meaningful title, one h1, and descriptive content.",

    starterCode: `<title>Learn HTML | FAYAD</title>

<h1>Learn HTML</h1>

<p>
  Learn HTML step by step with FAYAD.
</p>`,
  },

  {
    id: 22,
    group: "ADVANCED HTML",
    title: "Audio & Video",
    description: "Learn how to add audio and video content to HTML pages.",

    content: `
      <article class="content-card">
        <h2>Multimedia in HTML</h2>

        <p>
          HTML provides audio and video elements
          for displaying multimedia content.
        </p>
      </article>
    `,

    exampleTitle: "Audio and video",

    exampleCode: `<audio controls>

  <source
    src="music.mp3"
    type="audio/mpeg"
  >

</audio>

<video controls width="400">

  <source
    src="video.mp4"
    type="video/mp4"
  >

</video>`,

    result: `
      <p>
        Audio and video elements can contain
        source elements for media files.
      </p>
    `,

    explanation: `
      <p>
        The <code>&lt;audio&gt;</code> element is used
        for audio content.
      </p>

      <p>
        The <code>&lt;video&gt;</code> element is used
        for video content.
      </p>

      <p>
        The <code>&lt;source&gt;</code> element specifies
        the media file.
      </p>
    `,

    question: "Which element is used for video?",
    options: ["&lt;media&gt;", "&lt;video&gt;", "&lt;movie&gt;"],
    correct: 1,

    practice: "Create an audio element and a video element using source.",

    starterCode: `<audio controls>
  <source src="music.mp3" type="audio/mpeg">
</audio>

<video controls width="400">
  <source src="video.mp4" type="video/mp4">
</video>`,
  },
];

/* =========================================================
   2. STATE
========================================================= */

let currentLesson = 1;

let completedLessons = [];

try {
  completedLessons = JSON.parse(localStorage.getItem("fayad-html-progress") || "[]");

  if (!Array.isArray(completedLessons)) {
    completedLessons = [];
  }
} catch (error) {
  completedLessons = [];
}

/* =========================================================
   3. DOM ELEMENTS
========================================================= */

const lessonsContainer = document.querySelector(".sidebar");

const lessonNumber = document.getElementById("lesson-number");

const lessonTitle = document.getElementById("lesson-title");

const lessonDescription = document.getElementById("lesson-description");

const lessonContent = document.getElementById("lesson-content");

const progressText = document.getElementById("progress-text");

const progressFill = document.getElementById("progress-fill");

const exampleCode = document.getElementById("example-code");

const exampleResult = document.getElementById("example-result");

const codeExplanation = document.getElementById("code-explanation");

const question = document.getElementById("question");

const answerOptions = document.getElementById("answer-options");

const answerFeedback = document.getElementById("answer-feedback");

const challengeText = document.getElementById("challenge-text");

const codeEditor = document.getElementById("code-editor");

const livePreview = document.getElementById("live-preview");

const runCodeButton = document.getElementById("run-code");

const resetCodeButton = document.getElementById("reset-code");

const copyButton = document.getElementById("copy-btn");

const previousButton = document.getElementById("previous-btn");

const nextButton = document.getElementById("next-btn");

const previousTitle = document.getElementById("previous-title");

const nextTitle = document.getElementById("next-title");

const languageButton = document.querySelector(".language-btn");

/* =========================================================
   4. HELPERS
========================================================= */

function escapeHTML(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function saveProgress() {
  localStorage.setItem("fayad-html-progress", JSON.stringify(completedLessons));
}

/* =========================================================
   5. SIDEBAR
========================================================= */

function renderSidebar() {
  const sidebar = document.querySelector(".sidebar");

  if (!sidebar) return;

  const lessonLinks = sidebar.querySelectorAll(".lesson");

  lessonLinks.forEach((link) => {
    const lessonIndex = Number(link.dataset.lesson);

    const lessonId = lessonIndex + 1;

    link.classList.toggle("active", lessonId === currentLesson);

    const status = link.querySelector(".lesson-status");

    if (!status) return;

    status.classList.remove("current", "completed");

    if (lessonId === currentLesson) {
      status.classList.add("current");
    }

    if (completedLessons.includes(lessonId)) {
      status.classList.add("completed");
      status.textContent = "✓";
    } else {
      status.textContent = String(lessonId).padStart(2, "0");
    }
  });
}

/* =========================================================
   6. LOAD LESSON
========================================================= */

function loadLesson(id) {
  const lesson = lessons.find((item) => item.id === Number(id));

  if (!lesson) return;

  currentLesson = lesson.id;

  /* -------------------------
     HEADER
  ------------------------- */

  if (lessonNumber) {
    lessonNumber.textContent = `LESSON ${String(lesson.id).padStart(2, "0")}`;
  }

  if (lessonTitle) {
    lessonTitle.textContent = lesson.title;
  }

  if (lessonDescription) {
    lessonDescription.textContent = lesson.description;
  }

  /* -------------------------
     CONTENT
  ------------------------- */

  if (lessonContent) {
    lessonContent.innerHTML = lesson.content;
  }

  /* -------------------------
     EXAMPLE
  ------------------------- */

  if (exampleCode) {
    exampleCode.textContent = lesson.exampleCode;
  }

  if (exampleResult) {
    exampleResult.innerHTML = lesson.result;
  }

  /* -------------------------
     EXPLANATION
  ------------------------- */

  if (codeExplanation) {
    codeExplanation.innerHTML = lesson.explanation;
  }

  /* -------------------------
     PRACTICE
  ------------------------- */

  if (challengeText) {
    challengeText.textContent = lesson.practice;
  }

  if (codeEditor) {
    codeEditor.value = lesson.starterCode;
  }

  /* -------------------------
     QUICK CHECK
  ------------------------- */

  renderQuiz(lesson);

  /* -------------------------
     UPDATE UI
  ------------------------- */

  renderSidebar();

  updateProgress();

  updateNavigation();

  updatePreview();

  /* -------------------------
     SCROLL
  ------------------------- */

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* =========================================================
   8. NAVIGATION
========================================================= */

function updateNavigation() {
  const previous = lessons.find((lesson) => lesson.id === currentLesson - 1);

  const next = lessons.find((lesson) => lesson.id === currentLesson + 1);

  if (previousButton) {
    previousButton.disabled = !previous;
  }

  if (nextButton) {
    nextButton.disabled = !next;
  }

  if (previousTitle) {
    previousTitle.textContent = previous ? previous.title : "Start of course";
  }

  if (nextTitle) {
    nextTitle.textContent = next ? next.title : "Course completed";
  }
}

/* =========================================================
   9. COMPLETE LESSON
========================================================= */

function markLessonCompleted(id) {
  id = Number(id);

  if (!Number.isFinite(id)) {
    return;
  }

  // Make sure the lesson actually exists
  const lessonExists = lessons.some((lesson) => Number(lesson.id) === id);

  if (!lessonExists) {
    return;
  }

  // Prevent duplicate completion
  if (!completedLessons.some((lessonId) => Number(lessonId) === id)) {
    completedLessons.push(id);
  }

  // Keep only valid lesson IDs and remove duplicates
  completedLessons = [
    ...new Set(
      completedLessons.map(Number).filter((lessonId) => lessons.some((lesson) => Number(lesson.id) === lessonId)),
    ),
  ].sort((a, b) => a - b);

  saveProgress();
  renderSidebar();
  updateProgress();
}

/* =========================================================
   10. QUICK CHECK
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

    button.innerHTML = option;

    button.addEventListener("click", () => {
      const buttons = answerOptions.querySelectorAll("button");

      buttons.forEach((item) => {
        item.disabled = true;
        item.classList.remove("correct", "wrong");
      });

      if (index === lesson.correct) {
        button.classList.add("correct");

        if (answerFeedback) {
          answerFeedback.textContent = "Correct! Great job.";

          answerFeedback.className = "answer-feedback correct";
        }

        markLessonCompleted(lesson.id);
      } else {
        button.classList.add("wrong");

        if (buttons[lesson.correct]) {
          buttons[lesson.correct].classList.add("correct");
        }

        if (answerFeedback) {
          answerFeedback.textContent = "Not quite. The correct answer is highlighted.";

          answerFeedback.className = "answer-feedback wrong";
        }
      }
    });

    answerOptions.appendChild(button);
  });
}

/* =========================================================
   11. COPY CODE
========================================================= */

async function copyExampleCode() {
  if (!exampleCode || !copyButton) {
    return;
  }

  const code = exampleCode.textContent;

  try {
    await navigator.clipboard.writeText(code);

    const oldText = copyButton.textContent;

    copyButton.textContent = "Copied!";

    setTimeout(() => {
      copyButton.textContent = oldText;
    }, 1500);
  } catch (error) {
    /* Fallback */

    const textarea = document.createElement("textarea");

    textarea.value = code;

    document.body.appendChild(textarea);

    textarea.select();

    try {
      document.execCommand("copy");

      copyButton.textContent = "Copied!";

      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1500);
    } catch (fallbackError) {
      console.error("Copy failed:", fallbackError);
    }

    textarea.remove();
  }
}

/* =========================================================
   12. PLAYGROUND
========================================================= */

function updatePreview() {
  if (!codeEditor || !livePreview) {
    return;
  }

  const code = codeEditor.value;

  const documentContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style>

body {
  font-family:
    Arial,
    sans-serif;

  padding: 20px;

  line-height: 1.6;
}

img {
  max-width: 100%;
}

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
}

a {
  margin-right: 10px;
}

</style>

</head>

<body>

${code}

</body>
</html>
`;

  livePreview.srcdoc = documentContent;
}

function resetEditor() {
  const lesson = lessons.find((item) => item.id === currentLesson);

  if (!lesson || !codeEditor) {
    return;
  }

  codeEditor.value = lesson.starterCode;

  updatePreview();
}

/* =========================================================
   13. SIDEBAR CLICK EVENTS
========================================================= */

function setupSidebar() {
  const links = document.querySelectorAll(".sidebar .lesson");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const index = Number(link.dataset.lesson);

      if (Number.isNaN(index)) {
        return;
      }

      loadLesson(index + 1);
    });
  });
}

/* =========================================================
   14. PREVIOUS BUTTON
========================================================= */

function setupPreviousButton() {
  if (!previousButton) {
    return;
  }

  previousButton.addEventListener("click", () => {
    const previous = lessons.find((lesson) => lesson.id === currentLesson - 1);

    if (previous) {
      loadLesson(previous.id);
    }
  });
}

/* =========================================================
   15. NEXT BUTTON
========================================================= */

function setupNextButton() {
  if (!nextButton) {
    return;
  }

  nextButton.addEventListener("click", () => {
    // Complete the current lesson first
    markLessonCompleted(currentLesson);

    const currentIndex = lessons.findIndex((lesson) => Number(lesson.id) === Number(currentLesson));

    const nextLesson = lessons[currentIndex + 1];

    if (nextLesson) {
      loadLesson(nextLesson.id);
      return;
    }

    // Course completed
    updateProgress();
    renderSidebar();

    alert("Congratulations! You completed the HTML Learning Path.");
  });
}

/* =========================================================
   16. LANGUAGE BUTTON
========================================================= */

function setupLanguageButton() {
  if (!languageButton) {
    return;
  }

  languageButton.addEventListener("click", () => {
    alert("Arabic learning mode will be added later.");
  });
}

/* =========================================================
   17. INITIALIZE
========================================================= */

function initializeLearningEngine() {
  setupSidebar();

  setupPreviousButton();

  setupNextButton();

  setupLanguageButton();

  if (copyButton) {
    copyButton.addEventListener("click", copyExampleCode);
  }

  if (runCodeButton) {
    runCodeButton.addEventListener("click", updatePreview);
  }

  if (resetCodeButton) {
    resetCodeButton.addEventListener("click", resetEditor);
  }

  if (codeEditor) {
    codeEditor.addEventListener("input", updatePreview);
  }

  loadLesson(currentLesson);
}

/* =========================================================
   18. START
========================================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLearningEngine);
} else {
  initializeLearningEngine();
}
