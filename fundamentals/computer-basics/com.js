/* ==========================================================
   Fayyad App - Computer Basics JavaScript Module
   Theme: Cyber Green / Yellow interactive logic
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("%c [Fayyad App] Computer Basics JS Loaded Successfully ", "background: #000; color: #facc15; padding: 4px; font-weight: bold; border-radius: 4px;");

    // 1. Toggle History Milestones functionality
    const toggleBtn = document.getElementById("toggle-history-btn");
    const historyList = document.getElementById("history-list");

    if (toggleBtn && historyList) {
        toggleBtn.addEventListener("click", () => {
            historyList.classList.toggle("show");
            if (historyList.classList.contains("show")) {
                toggleBtn.textContent = "Hide Key Milestones";
                toggleBtn.style.backgroundColor = "#059669";
            } else {
                toggleBtn.textContent = "Show Key Milestones";
                toggleBtn.style.backgroundColor = "#10b981";
            }
        });
    }

    // 2. Interactive Quiz Functionality
    const quizButtons = document.querySelectorAll(".quiz-btn");
    const quizResult = document.getElementById("quiz-result");

    quizButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const isCorrect = e.target.getAttribute("data-correct") === "true";
            
            // Reset styles for all buttons
            quizButtons.forEach(btn => {
                btn.style.background = "rgba(255, 255, 255, 0.05)";
                btn.style.color = "#f3f4f6";
            });

            if (isCorrect) {
                e.target.style.background = "#10b981";
                e.target.style.color = "#fff";
                quizResult.textContent = "🎉 Correct! Vacuum tubes were used in the 1st generation computers.";
                quizResult.style.color = "#10b981";
            } else {
                e.target.style.background = "#ef4444";
                e.target.style.color = "#fff";
                quizResult.textContent = "❌ Incorrect. Try again! Think about early computing tech.";
                quizResult.style.color = "#ef4444";
            }
        });
    });
});