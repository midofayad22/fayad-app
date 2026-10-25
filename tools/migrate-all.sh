#!/usr/bin/env bash
# Documents/reproduces the one-off legacy-CSS -> tokens migration on pristine stylesheets (run from repo root).
set -euo pipefail
FILES="css/style.css about/about.css html-learning/html-learning.css javascript-learning/javascript-learning.css vue-learning/vue-learning.css fundamentals/computer-basics/com.css fundamentals/programming-basics/prg.css css-learning/css-learning.css react-learning/react-learning.css angular-learning/angular-learning.css"
for spec in "css/style.css dark" "about/about.css dark" "html-learning/html-learning.css dark" "javascript-learning/javascript-learning.css dark" "vue-learning/vue-learning.css dark" "fundamentals/computer-basics/com.css dark" "fundamentals/programming-basics/prg.css dark" "login.html dark" "css-learning/css-learning.css light" "react-learning/react-learning.css light" "angular-learning/angular-learning.css light"; do python3 tools/themeify.py $spec >/dev/null; done
python3 tools/accentify.py
node tools/generate-theme.mjs
