/* ==========================================================
   Fayyad App - Programming Basics JavaScript Module
   Theme: Programming Orange / Interactive JS Engine
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("%c [Fayyad App] Programming Basics JS Loaded Successfully ", "background: #000; color: #facc15; padding: 4px; font-weight: bold; border-radius: 4px;");

    // Interactive Code Simulator Logic
    const runBtn = document.getElementById("run-code-btn");
    const consoleOutput = document.getElementById("console-output");

    if (runBtn && consoleOutput) {
        runBtn.addEventListener("click", () => {
            consoleOutput.style.color = "#facc15";
            consoleOutput.textContent = "Compiling and executing script...";
            
            setTimeout(() => {
                let developer = "Abdullhamid";
                let level = "Junior Frontend";
                let result = `${developer} is a ${level} developer! 🚀`;
                
                consoleOutput.style.color = "#10b981";
                consoleOutput.textContent = `> Output: ${result}`;
            }, 600);
        });
    }
});