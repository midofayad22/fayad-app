/*
  The lesson page skeleton, built once per page by the course view so that every course shares ONE markup and ONE stylesheet
  (css/course.css). Cards without data for the open lesson are hidden by the view, never removed.
  Ids are the ones the original JavaScript course page used (tests and styles rely on them).
  All visible text is filled by the view from js/engine/strings.js (data-s="key") — nothing here is hard-coded Arabic.
*/
export function buildShell(doc, root, { editorLabel = "Code", multiPane = false } = {}) {
  root.innerHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header"><p data-s="sidebar.label"></p><h2 id="courseName"></h2></div>
      <button type="button" class="sidebar-toggle" id="sidebarToggle" aria-expanded="false" aria-controls="sidebarGroups"><span data-s="nav.lessons"></span><strong id="sidebarCurrent"></strong></button>
      <div id="sidebarGroups"></div>
    </aside>

    <section class="lesson-content">
      <div class="progress-area">
        <div class="progress-info"><span id="progressLabel"></span><strong id="progressText">0%</strong></div>
        <div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>
      </div>

      <div class="lesson-header" id="lessonHeader">
        <span class="lesson-kicker" id="lessonKicker" hidden></span>
        <span class="lesson-number" id="lessonNumber"></span>
        <h2 class="lesson-title" id="lessonTitle"></h2>
        <p id="lessonDescription"></p>
      </div>

      <div id="lessonSections"></div>
      <article class="body-card" id="bodyCard" hidden><div id="lessonBody"></div></article>
      <article class="body-card key-card" id="keyCard" hidden><div class="info-label" id="keyLabel"></div><p id="keyText"></p></article>

      <article class="example-card" id="exampleCard" hidden>
        <div class="example-header">
          <div><span data-s="example.label"></span><h2 id="exampleHeading"></h2></div>
          <button type="button" class="copy-btn" id="copyButton"></button>
        </div>
        <pre dir="ltr"><code id="exampleCode"></code></pre>
      </article>

      <article class="result-card" id="resultCard" hidden>
        <div class="result-header"><span data-s="result.label"></span></div>
        <div class="result-preview"><div id="exampleResult" class="result-static" hidden></div><div id="jsResultStage" class="result-stage" hidden></div></div>
      </article>

      <section class="explanation-card" id="explainCard" hidden>
        <h3 data-s="explain.heading"></h3>
        <div id="exampleExplanation"></div>
      </section>

      <article class="practice-card" id="practiceCard" hidden>
        <div class="practice-header">
          <div><span data-s="practice.label"></span><h2 id="practiceHeading"></h2></div>
        </div>
        <p class="practice-description" id="practiceText"></p>
        <div class="editor-layout${multiPane ? " has-preview" : ""}">
          <div class="editor-panel">
            <div class="editor-top"><span dir="ltr">${editorLabel}</span></div>
            <textarea id="jsEditor" spellcheck="false" dir="ltr" data-s-attr="aria-label:editor.aria"></textarea>
          </div>
          <div class="preview-panel" id="previewPanel" hidden>
            <div class="editor-top"><span data-s="preview.label"></span></div>
            <div class="preview-host" id="previewHost"></div>
            <p class="preview-note" id="previewNote" hidden></p>
          </div>
        </div>
        <div class="practice-actions">
          <button type="button" class="run-btn" id="runButton"></button>
          <button type="button" class="reset-btn" id="resetButton"></button>
        </div>
        <div class="practice-output" id="outputWrap">
          <span data-s="output.label"></span>
          <div id="output" aria-live="polite"></div>
        </div>
      </article>

      <article class="check-card" id="quickCheck">
        <span data-s="quiz.label"></span>
        <div class="quiz-progress" id="quizProgress" aria-live="polite">
          <span id="quizQuestionNumber"></span><span aria-hidden="true"> / </span><span id="quizTotalQuestions"></span>
        </div>
        <h2 id="questionTitle"></h2>
        <p id="questionInstruction" data-s="quiz.instruction"></p>
        <div class="answer-options" id="answerOptions"></div>
        <div class="answer-feedback" id="answerFeedback" aria-live="polite"></div>
        <div class="quiz-actions" id="quizActions"><button type="button" class="quiz-next-btn" id="quizNextButton" disabled></button></div>
      </article>

      <nav class="lesson-navigation" data-s-attr="aria-label:nav.aria">
        <button type="button" class="nav-btn previous" id="previousButton"><span class="nav-arrow" aria-hidden="true">→</span><div><small data-s="nav.prev"></small><strong></strong></div></button>
        <button type="button" class="nav-btn next" id="nextButton"><div><small data-s="nav.next"></small><strong></strong></div><span class="nav-arrow" aria-hidden="true">←</span></button>
      </nav>
    </section>`;
  return root;
}
