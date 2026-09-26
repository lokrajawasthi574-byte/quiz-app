<!DOCTYPE html>
<html lang="ne">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔱 हर हर महादेव क्विज प्लेटफर्म 🔱</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="mahadev-bg-overlay"></div>
    <div class="side-border left-border"></div>
    <div class="side-border right-border"></div>

    <div class="quiz-main-container">
        <header class="app-header">
            <h1>🔱 हर हर महादेव 🔱</h1>
        </header>

        <!-- स्क्रिन १: गृहपृष्ठ -->
        <section id="category-screen" class="quiz-panel active">
            <div class="developer-profile">
                <h3>👨‍💻 Developer Identity</h3>
                <p><strong>Name:</strong> Lok Raj Awasthi</p>
                <p><strong>System:</strong> Premium Chapter-wise Quiz (Bilingual)</p>
            </div>
            <h2>कृपया विधा छनोट गर्नुहोस् / Select Category:</h2>
            <div class="grid-list">
                <!-- फिक्स्ड: पाँचवटै बटनमा दुरुस्त क्लिक कमाण्ड सेट -->
                <button class="menu-btn" onclick="navigateToSubjects('class10')">📚 Class 10 MCQ Pool</button>
                <button class="menu-btn" onclick="navigateToSubjects('class11')">🎓 Class 11 MCQ Pool</button>
                <button class="menu-btn" onclick="navigateToSubjects('gk')">🌍 सामान्य ज्ञान (Loksewa GK)</button>
                <button class="menu-btn" onclick="navigateToSubjects('science')">🧪 Out Knowledge of Science</button>
                <button class="menu-btn" onclick="navigateToSubjects('computer')">💻 Out Knowledge of Computer</button>
            </div>
        </section>

        <!-- स्क्रिन २: विषय छनोट पृष्ठ -->
        <section id="subject-screen" class="quiz-panel">
            <h2 id="subject-title">विषयहरू / Subjects</h2>
            <div id="subject-list" class="grid-list"></div>
            <button class="back-btn" onclick="backToCategories()">⬅️ Back</button>
        </section>

        <!-- स्क्रिन ३: च्याप्टर छनोट पृष्ठ -->
        <section id="chapter-screen" class="quiz-panel">
            <h2 id="chapter-title">अध्यायहरू / Chapters</h2>
            <div id="chapter-list" class="grid-list"></div>
            <button class="back-btn" onclick="backToSubjects()">⬅️ Back</button>
        </section>

        <!-- स्क्रिन ४: मुख्य गेमप्ले -->
        <section id="game-screen" class="quiz-panel">
            <div class="game-status-bar">
                <span id="q-progress">प्रश्न: १/१०</span>
                <div id="countdown-clock" class="clock-display">३०</div>
            </div>
            <div class="question-box" id="display-question-text"></div>
            <div id="display-options-box" class="options-vertical-grid"></div>
            <button id="forward-btn" class="control-btn hidden" onclick="moveToNext()">Next ➡️</button>
        </section>

        <!-- स्क्रिन ५: नतिजा कार्ड -->
        <section id="score-screen" class="quiz-panel">
            <h2>📊 क्विजको अन्तिम नतिजा / Result</h2>
            <div class="score-board">
                <p>कुल खेलिएका प्रश्न / Total: <strong>१०</strong></p>
                <p class="txt-success">सहि उत्तर / Correct: <span id="total-right">०</span></p>
                <p class="txt-danger">गलत उत्तर / Incorrect: <span id="total-wrong">०</span></p>
            </div>
            <button class="control-btn" onclick="resetToHome()">Home 🏠</button>
        </section>
    </div>

    <audio id="beep-alarm" src="https://google.com" preload="auto"></audio>

    <script src="script.js"></script>
</body>
</html>

 
