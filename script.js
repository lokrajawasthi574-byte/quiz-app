"use strict";

// ==========================================
// 1. SETTINGS
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
// 2. 🌺 FALLING FLOWERS (Continuous)
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

// हर 500ms मा एउटा नयाँ फूल खस्छ
setInterval(createFallingFlower, 500);

// ==========================================
// 3. LOAD QUESTIONS
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
        alert("प्रश्नहरू लोड हुन सकेनन्! questions.json जाँच गर्नुहोस्।");
    }
}

// ==========================================
// 4. NAVIGATION
// ==========================================
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = $(id);
    if (target) target.classList.add("active");
}

// ==========================================
// 5. LOGIN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadQuestions();
    renderClasses();
});

$("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    userName = $("access-name").value.trim();
    if (userName.length < 2) return alert("कृपया नाम राख्नुहोस्!");
    $("display-name").textContent = userName;
    if (!questionsLoaded) await loadQuestions();
    showScreen("category-screen");
});

// ==========================================
// 6. CLASS SELECTION
// ==========================================
function renderClasses() {
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
    $("subject-title").textContent = `${category.replace('class', 'Class ')} - Subjects`;
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
// 7. CHAPTERS
// ==========================================
function loadChapters(category, subject) {
    if (!questionsLoaded) return alert("प्रश्नहरू लोड हुँदैछन्...");

    const filtered = allQuestions.filter(q =>
        q.category === category.toLowerCase() &&
        q.subject.toLowerCase() === subject.toLowerCase()
    );

    if (filtered.length === 0) return alert("यस विषयमा प्रश्नहरू छैनन्!");

    $("chapter-title").textContent = `${subject} - Chapters`;
    const list = $("chapter-list");
    list.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.className = "chapter-btn";
    allBtn.textContent = "सबै अध्याय (All Chapters)";
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
// 8. QUIZ LOGIC
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

    document.querySelectorAll(".option-btn").forEach((b, i) => {
        b.disabled = true;
        if (String(i) === String(q.answer)) b.classList.add("correct");
    });
    if (btn && !isCorrect) btn.classList.add("wrong");

    if (isCorrect) {
        score += POINTS_PER_CORRECT;
        $("current-score").textContent = score;
        $("answer-feedback").textContent = "सही उत्तर! +10 अंक 🌸";
    } else {
        $("answer-feedback").textContent = selected === -1 ? "समय सकियो!" : "गलत उत्तर!";
    }

    userAnswers.push({
        question: q.question,
        user: selected === -1 ? "समय सकियो" : q.options[selected],
        correct: q.options[q.answer],
        isCorrect
    });

    setTimeout(() => { currentIndex++; loadQuestion(); }, 1500);
}

// ==========================================
// 9. RESULT & REVIEW
// ==========================================
function showResult() {
    clearInterval(timer);
    showScreen("result-screen");
    $("final-score").textContent = score;
    $("total-q").textContent = `/ ${currentQuestions.length * POINTS_PER_CORRECT}`;

    const correct = userAnswers.filter(a => a.isCorrect).length;
    $("correct-count").textContent = correct;
    $("wrong-count").textContent = userAnswers.length - correct;

    const pct = (score / (currentQuestions.length * POINTS_PER_CORRECT)) * 100;
    $("score-message").textContent = pct >= 80 ? "अद्भुत! Excellent! 🏆" : pct >= 50 ? "राम्रो! Good Job! 👍" : "अझै मेहनत गर्नुहोस्! 💪";

    const hs = parseInt(localStorage.getItem('quizHighScore') || 0);
    if (score > hs) localStorage.setItem('quizHighScore', score);
}

function toggleReview() {
    const box = $("review-container");
    const btn = $("toggle-review-btn");
    if (box.classList.contains("hidden")) {
        box.innerHTML = userAnswers.map((a, i) => `
            <div class="review-item ${a.isCorrect ? 'correct' : 'wrong'}">
                <strong>${i+1}. ${a.question}</strong><br>
                तपाईंको: ${a.user} ${!a.isCorrect ? `<br>सही: ${a.correct}` : ''}
            </div>`).join("");
        box.classList.remove("hidden");
        btn.innerHTML = '<i class="fas fa-eye-slash"></i> लुकाउनुहोस्';
    } else {
        box.classList.add("hidden");
        btn.innerHTML = '<i class="fas fa-eye"></i> उत्तर हेर्नुहोस्';
    }
}

function restartGame() { showScreen("category-screen"); }
function quitQuiz() {
    if (confirm("के तपाईं क्विज छोड्न चाहनुहुन्छ?")) {
        clearInterval(timer);
        showScreen("category-screen");
    }
} 
