"use strict";

// ==========================================
// 1. TRANSLATIONS (Nepali & English)
// ==========================================
const translations = {
    ne: {
        greeting: "नमस्ते",
        selectClass: "आफ्नो Class छान्नुहोस्",
        back: "पछाडि",
        subjects: "विषयहरू",
        chapters: "अध्यायहरू",
        allChapters: "सबै अध्याय",
        startQuiz: "क्विज सुरु गर्नुहोस्",
        quit: "छोड्नुहोस्",
        result: "नतिजा",
        correct: "सही",
        wrong: "गलत",
        viewAnswers: "उत्तर हेर्नुहोस्",
        hideAnswers: "लुकाउनुहोस्",
        playAgain: "पुनः खेल्नुहोस्",
        exit: "बाहिर निस्कनुहोस्",
        correctAnswer: "सही उत्तर! +10 अंक 🌸",
        wrongAnswer: "गलत उत्तर!",
        timeUp: "समय सकियो!",
        enterName: "आफ्नो नाम लेख्नुहोस्",
        namePlaceholder: "तपाईंको नाम...",
        selectLanguage: "भाषा छान्नुहोस्",
        excellent: "अद्भुत! Excellent! 🏆",
        good: "राम्रो! Good Job! 👍",
        tryAgain: "अझै मेहनत गर्नुहोस्! 💪",
        newRecord: "नयाँ कीर्तिमान! 🎉 ",
        quitConfirm: "के तपाईं क्विज छोड्न चाहनुहुन्छ?"
    },
    en: {
        greeting: "Welcome",
        selectClass: "Select Your Class",
        back: "Back",
        subjects: "Subjects",
        chapters: "Chapters",
        allChapters: "All Chapters",
        startQuiz: "Start Quiz",
        quit: "Quit",
        result: "Result",
        correct: "Correct",
        wrong: "Wrong",
        viewAnswers: "View Answers",
        hideAnswers: "Hide Answers",
        playAgain: "Play Again",
        exit: "Exit",
        correctAnswer: "Correct! +10 points 🌸",
        wrongAnswer: "Wrong Answer!",
        timeUp: "Time's Up!",
        enterName: "Enter Your Name",
        namePlaceholder: "Your name...",
        selectLanguage: "Select Language",
        excellent: "Excellent! 🏆",
        good: "Good Job! 👍",
        tryAgain: "Keep Trying! 💪",
        newRecord: "New Record! 🎉 ",
        quitConfirm: "Do you want to quit the quiz?"
    }
};

let currentLang = 'ne'; // Default Nepali

// ==========================================
// 2. SETTINGS
// ==========================================
const classSubjects = {
    class8:  ["Science", "Math", "Optional Math", "Computer"],
    class9:  ["Science", "Math", "Optional Math", "Computer"],
    class10: ["Science", "Math", "Optional Math", "Computer"],
    class11: ["Physics", "Chemistry", "Biology", "Math", "Computer"],
    class12: ["Physics", "Chemistry", "Biology", "Math", "Computer"]
};

const QUESTIONS_PER_GAME = 10;
const QUESTION_TIME = 30;
const POINTS_PER_CORRECT = 10;

let allQuestions = [];
let currentQuestions = [];
let currentIndex = 0, score = 0, timer = null, timeLeft = QUESTION_TIME;
let userAnswers = [];
let userName = "";
let selectedClass = "", selectedSubject = "";
let questionsLoaded = false;
let answered = false;

const $ = (id) => document.getElementById(id);

// ==========================================
// 3. 🌸 4-SIDED GARLAND INITIALIZATION
// ==========================================
function initGarlands() {
    const flowerPattern = "🌸🌼🌺🌷🌹🌻";
    const rudraksha = "📿";
    const longPattern = (flowerPattern + rudraksha).repeat(8);

    $("garland-top").textContent = longPattern + longPattern;
    $("garland-bottom").textContent = longPattern + longPattern;

    const verticalPattern = [];
    for (let i = 0; i < 60; i++) {
        if (i % 6 === 5) verticalPattern.push(rudraksha);
        else verticalPattern.push(flowerPattern[i % 6]);
    }
    const vText = verticalPattern.join("\n");
    $("garland-left").innerHTML = vText + "\n" + vText;
    $("garland-right").innerHTML = vText + "\n" + vText;
}

// ==========================================
// 4. 🌺 FALLING FLOWERS
// ==========================================
function createFallingFlower() {
    const container = $("flower-container");
    if (!container) return;

    const flowers = ["🌸", "🌺", "🌼", "🌷", "🌹", "🪷", "🌻"];
    const flower = document.createElement("div");
    flower.className = "falling-flower";
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.fontSize = (Math.random() * 1.5 + 1) + "rem";
    flower.style.animationDuration = (Math.random() * 4 + 4) + "s";
    container.appendChild(flower);

    setTimeout(() => flower.remove(), 8000);
}

setInterval(createFallingFlower, 500);

// ==========================================
// 5. WELCOME SCREEN (3 sec color rotate)
// ==========================================
setTimeout(() => {
    showScreen("language-screen");
}, 3000);

// ==========================================
// 6. LANGUAGE SELECTION
// ==========================================
function selectLanguage(lang) {
    currentLang = lang;
    updateAllTexts();
    showScreen("name-screen");
}

function updateAllTexts() {
    const t = translations[currentLang];
    $("name-title").textContent = t.enterName;
    $("access-name").placeholder = t.namePlaceholder;
    $("start-btn").innerHTML = `${t.startQuiz} <i class="fas fa-arrow-right"></i>`;
    $("select-class-text").textContent = t.selectClass;
    document.querySelectorAll(".back-text").forEach(el => el.textContent = t.back);
    $("quit-text").textContent = t.quit;
    $("result-title").textContent = t.result;
    $("correct-label").textContent = t.correct;
    $("wrong-label").textContent = t.wrong;
    $("review-text").textContent = t.viewAnswers;
    $("replay-text").textContent = t.playAgain;
    $("exit-text").textContent = t.exit;
}

// ==========================================
// 7. LOAD QUESTIONS
// ==========================================
async function loadQuestions() {
    try {
        const response = await fetch("questions.json");
        if (!response.ok) throw new Error("File not found");
        const data = await response.json();

        allQuestions = data
            .filter(q => q && typeof q.question === "string" && Array.isArray(q.options) && !isNaN(q.answer))
            .map((q, i) => ({
                ...q,
                id: q.id ?? i + 1,
                category: String(q.category || "").toLowerCase().trim(),
                subject: String(q.subject || "").trim(),
                chapter: String(q.chapter || "General").trim()
            }));

        questionsLoaded = true;
        console.log(`Loaded ${allQuestions.length} questions!`);
    } catch (error) {
        console.error(error);
        alert("Questions failed to load! Check questions.json.");
    }
}

// ==========================================
// 8. NAVIGATION
// ==========================================
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = $(id);
    if (target) target.classList.add("active");
}

// ==========================================
// 9. NAME INPUT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initGarlands();
    loadQuestions();
    updateAllTexts();
});

$("name-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    userName = $("access-name").value.trim();
    if (userName.length < 2) return alert(currentLang === 'ne' ? "कृपया नाम राख्नुहोस्!" : "Please enter your name!");
    if (!questionsLoaded) await loadQuestions();
    renderClasses();
    showScreen("category-screen");
});

// ==========================================
// 10. CLASS SELECTION
// ==========================================
function renderClasses() {
    const t = translations[currentLang];
    $("greeting-text").textContent = `${t.greeting}, ${userName}! 🙏`;
    const list = $("class-list");
    list.innerHTML = "";
    Object.keys(classSubjects).forEach(cls => {
        const card = document.createElement("div");
        card.className = "cat-card";
        const isHigh = cls.includes("11") || cls.includes("12");
        card.innerHTML = `<i class="fas ${isHigh ? 'fa-graduation-cap' : 'fa-school'}"></i><h3>${cls.replace('class', 'Class ')}</h3>`;
        card.onclick = () => selectCategory(cls);
        list.appendChild(card);
    });
}

function selectCategory(category) {
    selectedClass = category;
    $("subject-title").textContent = `${category.replace('class', 'Class ')} - ${translations[currentLang].subjects}`;
    const list = $("subject-list");
    list.innerHTML = "";

    classSubjects[category].forEach(sub => {
        const card = document.createElement("div");
        card.className = "cat-card";
        let icon = "fa-book";
        if (["Science", "Physics", "Chemistry", "Biology"].includes(sub)) icon = "fa-flask";
        if (sub.includes("Math")) icon = "fa-calculator";
        if (sub === "Computer") icon = "fa-laptop-code";

        card.innerHTML = `<i class="fas ${icon}"></i><h3>${sub}</h3>`;
        card.onclick = () => selectSubject(sub);
        list.appendChild(card);
    });
    showScreen("subject-screen");
}

function selectSubject(subject) {
    selectedSubject = subject;
    loadChapters(selectedClass, subject);
}

// ==========================================
// 11. CHAPTERS
// ==========================================
function loadChapters(category, subject) {
    if (!questionsLoaded) return alert("Questions loading...");

    const filtered = allQuestions.filter(q =>
        q.category === category.toLowerCase() &&
        q.subject.toLowerCase() === subject.toLowerCase()
    );

    if (filtered.length === 0) return alert(currentLang === 'ne' ? "यस विषयमा प्रश्नहरू छैनन्!" : "No questions for this subject!");

    const t = translations[currentLang];
    $("chapter-title").textContent = `${subject} - ${t.chapters}`;
    const list = $("chapter-list");
    list.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.className = "chapter-btn";
    allBtn.textContent = t.allChapters;
    allBtn.onclick = () => startQuiz(filtered);
    list.appendChild(allBtn);

    [...new Set(filtered.map(q => q.chapter))].forEach(chap => {
        const btn = document.createElement("button");
        btn.className = "chapter-btn";
        btn.textContent = chap;
        btn.onclick = () => startQuiz(filtered.filter(q => q.chapter === chap));
        list.appendChild(btn);
    });
    showScreen("chapter-screen");
}

// ==========================================
// 12. QUIZ LOGIC
// ==========================================
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function startQuiz(questions) {
    currentQuestions = shuffle(questions).slice(0, QUESTIONS_PER_GAME);
    currentIndex = 0; score = 0; userAnswers = []; answered = false;
    $("current-score").textContent = 0;
    $("current-player").textContent = userName;
    showScreen("quiz-screen");
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    if (currentIndex >= currentQuestions.length) return showResult();

    answered = false;
    const q = currentQuestions[currentIndex];
    $("question-counter").textContent = `${currentIndex + 1}/${currentQuestions.length}`;
    $("question-text").textContent = q.question;
    $("answer-feedback").textContent = "";

    const container = $("options-container");
    container.innerHTML = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(i, btn);
        container.appendChild(btn);
    });
    startTimer();
}

function startTimer() {
    timeLeft = QUESTION_TIME;
    $("time-left").textContent = timeLeft;
    $("timer-progress").style.width = "100%";
    timer = setInterval(() => {
        timeLeft--;
        $("time-left").textContent = timeLeft;
        $("timer-progress").style.width = `${(timeLeft / QUESTION_TIME) * 100}%`;
        if (timeLeft <= 0) { clearInterval(timer); checkAnswer(-1, null); }
    }, 1000);
}

function checkAnswer(selected, btn) {
    if (answered) return;
    answered = true;
    clearInterval(timer);

    const q = currentQuestions[currentIndex];
    const isCorrect = String(selected) === String(q.answer);
    const t = translations[currentLang];

    document.querySelectorAll(".option-btn").forEach((b, i) => {
        b.disabled = true;
        if (String(i) === String(q.answer)) b.classList.add("correct");
    });
    if (btn && !isCorrect) btn.classList.add("wrong");

    if (isCorrect) {
        score += POINTS_PER_CORRECT;
        $("current-score").textContent = score;
        $("answer-feedback").textContent = t.correctAnswer;
    } else {
        $("answer-feedback").textContent = selected === -1 ? t.timeUp : t.wrongAnswer;
    }

    userAnswers.push({
        question: q.question,
        user: selected === -1 ? t.timeUp : q.options[selected],
        correct: q.options[q.answer],
        isCorrect
    });

    setTimeout(() => { currentIndex++; loadQuestion(); }, 1500);
}

// ==========================================
// 13. RESULT & REVIEW
// ==========================================
function showResult() {
    clearInterval(timer);
    showScreen("result-screen");
    const t = translations[currentLang];

    $("final-score").textContent = score;
    $("total-q").textContent = `/ ${currentQuestions.length * POINTS_PER_CORRECT}`;

    const correct = userAnswers.filter(a => a.isCorrect).length;
    $("correct-count").textContent = correct;
    $("wrong-count").textContent = userAnswers.length - correct;

    const pct = (score / (currentQuestions.length * POINTS_PER_CORRECT)) * 100;
    let msg = pct >= 80 ? t.excellent : pct >= 50 ? t.good : t.tryAgain;

    const hs = parseInt(localStorage.getItem('quizHighScore') || 0);
    if (score > hs) {
        localStorage.setItem('quizHighScore', score);
        msg = t.newRecord + msg;
    }
    $("score-message").textContent = msg;
}

function toggleReview() {
    const box = $("review-container");
    const btn = $("toggle-review-btn");
    const t = translations[currentLang];
    if (box.classList.contains("hidden")) {
        box.innerHTML = userAnswers.map((a, i) => `
            <div class="review-item ${a.isCorrect ? 'correct' : 'wrong'}">
                <strong>${i+1}. ${a.question}</strong><br>
                ${currentLang === 'ne' ? 'तपाईंको' : 'Your'}: ${a.user}
                ${!a.isCorrect ? `<br>${currentLang === 'ne' ? 'सही' : 'Correct'}: ${a.correct}` : ''}
            </div>`).join("");
        box.classList.remove("hidden");
        btn.innerHTML = `<i class="fas fa-eye-slash"></i> ${t.hideAnswers}`;
    } else {
        box.classList.add("hidden");
        btn.innerHTML = `<i class="fas fa-eye"></i> ${t.viewAnswers}`;
    }
}

function restartGame() { showScreen("category-screen"); }
function quitQuiz() {
    const t = translations[currentLang];
    if (confirm(t.quitConfirm)) {
        clearInterval(timer);
        showScreen("category-screen");
    }
} 
