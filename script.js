/* ==================================================
   AWASTHI QUIZ - COMPLETE JAVASCRIPT
   Developed by: Lok Raj Awasthi
   ================================================== */

"use strict";

// ==========================================
// 1. SUBJECTS FOR EACH CLASS
// ==========================================

const classSubjects = {
    class8: ["Science", "Math", "Optional Math", "Computer"],
    class9: ["Science", "Math", "Optional Math", "Computer"],
    class10: ["Science", "Math", "Optional Math", "Computer"],

    class11: ["Physics", "Chemistry", "Biology", "Math", "Computer"],
    class12: ["Physics", "Chemistry", "Biology", "Math", "Computer"]
};

// ==========================================
// 2. GAME SETTINGS
// ==========================================

const QUESTIONS_PER_GAME = 10;
const QUESTION_TIME = 30;
const POINTS_PER_CORRECT = 10;

// ==========================================
// 3. GAME VARIABLES
// ==========================================

let allQuestions = [];
let currentQuestions = [];
let matchQuestions = [];

let currentIndex = 0;
let score = 0;
let timer = null;
let timeLeft = QUESTION_TIME;

let userAnswers = [];
let player1Answers = [];
let player2Answers = [];

let userName = "";

let gameMode = "1p";

let player1Score = 0;
let player2Score = 0;

let currentPlayer = 1;

let musicPlaying = false;
let answered = false;
let questionsLoaded = false;

let selectedClass = "";
let selectedSubject = "";
let selectedChapter = "";

// ==========================================
// 4. DOM ELEMENTS
// ==========================================

const $ = (id) => document.getElementById(id);

const loginForm = $("login-form");

const bgMusic = $("bg-music");
const omSound = $("om-sound");

// ==========================================
// 5. LOAD QUESTIONS FROM JSON
// ==========================================

async function loadQuestions() {

    questionsLoaded = false;

    try {

        const response = await fetch("questions.json");

        if (!response.ok) {
            throw new Error("Questions file not found");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid questions format");
        }

        allQuestions = data
            .filter(q =>
                q &&
                typeof q.question === "string" &&
                Array.isArray(q.options) &&
                q.options.length >= 2 &&
                Number.isInteger(Number(q.answer)) &&
                Number(q.answer) >= 0 &&
                Number(q.answer) < q.options.length
            )
            .map((q, index) => ({
                ...q,
                id: q.id ?? index + 1,
                category: String(q.category || "").toLowerCase(),
                subject: String(q.subject || "").trim(),
                chapter: String(q.chapter || "General").trim()
            }));

        questionsLoaded = true;

        console.log(
            `Successfully loaded ${allQuestions.length} questions!`
        );

    } catch (error) {

        console.error("Question loading error:", error);

        allQuestions = [];
        questionsLoaded = true;

        alert(
            "प्रश्नहरू लोड हुन सकेनन्। कृपया questions.json फाइल जाँच गर्नुहोस्।"
        );
    }
}

// ==========================================
// 6. DIVINE EFFECTS
// ==========================================

function playDivineEffects() {

    if (omSound) {
        omSound.volume = 0.5;

        omSound.play().catch(() => {});
    }

    if (bgMusic) {
        bgMusic.volume = 0.2;

        bgMusic.play()
            .then(() => {
                musicPlaying = true;
                updateMusicIcon();
            })
            .catch(() => {});
    }

    createFlowers();
}

// ==========================================
// 7. FLOWER ANIMATION
// ==========================================

function createFlowers() {

    const container = $("flower-container");

    if (!container) return;

    const flowers = ["🌸", "🌺", "🌼", "🪷"];

    for (let i = 0; i < 20; i++) {

        setTimeout(() => {

            const flower = document.createElement("div");

            flower.className = "flower";

            flower.textContent =
                flowers[Math.floor(Math.random() * flowers.length)];

            flower.style.left = Math.random() * 100 + "vw";

            flower.style.animationDuration =
                Math.random() * 3 + 2 + "s";

            container.appendChild(flower);

            setTimeout(() => flower.remove(), 5000);

        }, i * 150);
    }
}

// ==========================================
// 8. GAME MODE
// ==========================================

function setMode(mode, element) {

    gameMode = mode === "2p" ? "2p" : "1p";

    currentPlayer = 1;

    document.querySelectorAll(".mode-btn").forEach(button => {
        button.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");
    }
}

// ==========================================
// 9. LOGIN / NORMAL ENTRY
// ==========================================

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nameInput = $("access-name");

        userName = nameInput ? nameInput.value.trim() : "";

        if (userName.length < 2) {

            alert("कृपया आफ्नो नाम राख्नुहोस्!");

            return;
        }

        const displayName = $("display-name");

        if (displayName) {
            displayName.textContent = userName;
        }

        await loadQuestions();

        playDivineEffects();

        showScreen("lang-screen");
    });
}

// ==========================================
// 10. LANGUAGE SELECTION
// ==========================================

function setLanguage(lang) {

    showScreen("category-screen");
}

// ==========================================
// 11. MUSIC CONTROL
// ==========================================

function updateMusicIcon() {

    const icon = $("music-icon");

    if (!icon) return;

    icon.className = musicPlaying
        ? "fas fa-volume-up"
        : "fas fa-volume-mute";
}

const musicToggle = $("music-toggle");

if (musicToggle) {

    musicToggle.addEventListener("click", () => {

        if (!bgMusic) return;

        if (musicPlaying) {

            bgMusic.pause();
            musicPlaying = false;

        } else {

            bgMusic.play()
                .then(() => {
                    musicPlaying = true;
                })
                .catch(() => {
                    musicPlaying = false;
                });
        }

        updateMusicIcon();
    });
}

// ==========================================
// 12. SCREEN NAVIGATION
// ==========================================

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = $(id);

    if (target) {
        target.classList.add("active");
    } else {
        console.error("Screen not found:", id);
    }
}

// ==========================================
// 13. CLASS SELECTION
// ==========================================

function selectCategory(category) {

    if (!classSubjects[category]) {

        alert("कृपया सही Class छान्नुहोस्!");

        return;
    }

    selectedClass = category;

    const title = $("subject-title");

    if (title) {

        title.textContent =
            category.replace("class", "Class ") + " - Subjects";
    }

    const list = $("subject-list");

    if (!list) return;

    list.innerHTML = "";

    classSubjects[category].forEach(subject => {

        const card = document.createElement("div");

        card.className = "cat-card";

        let icon = "fa-book";

        if (
            ["Science", "Physics", "Chemistry", "Biology"]
                .includes(subject)
        ) {
            icon = "fa-flask";
        }

        if (subject.includes("Math")) {
            icon = "fa-calculator";
        }

        if (subject === "Computer") {
            icon = "fa-laptop-code";
        }

        card.innerHTML = `
            <i class="fas ${icon}"></i>
            <h3></h3>
        `;

        card.querySelector("h3").textContent = subject;

        card.addEventListener("click", () => {
            selectSubject(subject);
        });

        list.appendChild(card);
    });

    showScreen("subject-screen");
}

// ==========================================
// 14. SUBJECT SELECTION
// ==========================================

function selectSubject(subject) {

    if (!classSubjects[selectedClass]?.includes(subject)) {

        alert("Invalid subject!");

        return;
    }

    selectedSubject = subject;

    loadChapters(selectedClass, subject);
}

// ==========================================
// 15. CHAPTER LOADING
// ==========================================

function loadChapters(category, subject) {

    if (!questionsLoaded) {

        alert("प्रश्नहरू लोड हुँदैछन्। केही समयपछि प्रयास गर्नुहोस्।");

        return;
    }

    const filtered = allQuestions.filter(q =>

        q.category === category.toLowerCase() &&

        q.subject.toLowerCase() === subject.toLowerCase()

    );

    if (filtered.length === 0) {

        alert(
            "यस विषयमा अहिले प्रश्नहरू उपलब्ध छैनन्!"
        );

        return;
    }

    const chapters = [
        ...new Set(filtered.map(q => q.chapter))
    ];

    const title = $("chapter-title");

    if (title) {
        title.textContent = `${subject} - Chapters`;
    }

    const list = $("chapter-list");

    if (!list) return;

    list.innerHTML = "";

    // ALL CHAPTERS BUTTON

    const allButton = document.createElement("button");

    allButton.className = "chapter-btn";

    allButton.textContent = "सबै अध्याय (All Chapters)";

    allButton.addEventListener("click", () => {

        selectedChapter = "All Chapters";

        startQuiz(filtered);
    });

    list.appendChild(allButton);

    // INDIVIDUAL CHAPTERS

    chapters.forEach(chapter => {

        const button = document.createElement("button");

        button.className = "chapter-btn";

        button.textContent = chapter;

        button.addEventListener("click", () => {

            selectedChapter = chapter;

            const chapterQuestions = filtered.filter(
                q => q.chapter === chapter
            );

            startQuiz(chapterQuestions);
        });

        list.appendChild(button);
    });

    showScreen("chapter-screen");
}

// ==========================================
// 16. SHUFFLE QUESTIONS
// ==========================================

function shuffleQuestions(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

// ==========================================
// 17. START QUIZ
// ==========================================

function startQuiz(questions) {

    if (!questions || questions.length === 0) {

        alert("कुनै प्रश्न उपलब्ध छैन!");

        return;
    }

    clearInterval(timer);

    // Select maximum 10 random questions.

    matchQuestions = shuffleQuestions(questions)
        .slice(0, QUESTIONS_PER_GAME);

    currentQuestions = [...matchQuestions];

    currentIndex = 0;

    currentPlayer = 1;

    score = 0;

    player1Score = 0;
    player2Score = 0;

    userAnswers = [];
    player1Answers = [];
    player2Answers = [];

    answered = false;

    const review = $("review-container");

    if (review) {

        review.innerHTML = "";

        review.classList.add("hidden");
    }

    const reviewButton = $("toggle-review-btn");

    if (reviewButton) {
        reviewButton.textContent = "उत्तर हेर्नुहोस्";
    }

    showScreen("quiz-screen");

    updatePlayerDisplay();

    loadQuestion();
}

// ==========================================
// 18. PLAYER DISPLAY
// ==========================================

function updatePlayerDisplay() {

    const playerDisplay = $("current-player");

    if (playerDisplay) {

        playerDisplay.textContent =
            gameMode === "2p"
                ? `Player ${currentPlayer}`
                : userName;
    }
}

// ==========================================
// 19. LOAD QUESTION
// ==========================================

function loadQuestion() {

    clearInterval(timer);

    if (currentIndex >= currentQuestions.length) {

        finishRound();

        return;
    }

    answered = false;

    const q = currentQuestions[currentIndex];

    const counter = $("question-counter");

    const questionText = $("question-text");

    const container = $("options-container");

    if (!counter || !questionText || !container) {

        console.error("Quiz HTML elements are missing!");

        return;
    }

    counter.textContent =
        `प्रश्न ${currentIndex + 1} / ${currentQuestions.length}`;

    questionText.textContent = q.question;

    container.innerHTML = "";

    q.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "option-btn";

        button.textContent = option;

        button.addEventListener("click", () => {

            checkAnswer(index, button);
        });

        container.appendChild(button);
    });

    startTimer();
}

// ==========================================
// 20. QUESTION TIMER
// ==========================================

function startTimer() {

    clearInterval(timer);

    timeLeft = QUESTION_TIME;

    const timeDisplay = $("time-left");

    const progress = $("timer-progress");

    if (timeDisplay) {
        timeDisplay.textContent = timeLeft;
    }

    if (progress) {
        progress.style.width = "100%";
    }

    timer = setInterval(() => {

        timeLeft--;

        if (timeDisplay) {
            timeDisplay.textContent = timeLeft;
        }

        if (progress) {

            progress.style.width =
                (timeLeft / QUESTION_TIME * 100) + "%";
        }

        if (timeLeft <= 0) {

            clearInterval(timer);

            checkAnswer(-1, null);
        }

    }, 1000);
}

// ==========================================
// 21. CHECK ANSWER
// ==========================================

function checkAnswer(selected, button) {

    if (answered) return;

    answered = true;

    clearInterval(timer);

    const q = currentQuestions[currentIndex];

    const isCorrect = selected === Number(q.answer);

    // Give 10 points for every correct answer.

    if (isCorrect) {

        score += POINTS_PER_CORRECT;
    }

    const userAnswer =
        selected === -1
            ? "समय सकियो"
            : q.options[selected];

    userAnswers.push({

        question: q.question,

        user: userAnswer,

        correct: q.options[q.answer],

        isCorrect: isCorrect
    });

    const buttons = document.querySelectorAll(".option-btn");

    // Show correct and wrong answers.

    buttons.forEach((btn, index) => {

        btn.disabled = true;

        if (index === Number(q.answer)) {

            btn.classList.add("correct");
        }
    });

    if (button && !isCorrect) {

        button.classList.add("wrong");
    }

    // Update score.

    const scoreDisplay = $("current-score");

    if (scoreDisplay) {
        scoreDisplay.textContent = score;
    }

    // Optional feedback element.

    const feedback = $("answer-feedback");

    if (feedback) {

        feedback.textContent = isCorrect
            ? "सही उत्तर! +10 अंक"
            : selected === -1
                ? "समय सकियो!"
                : "गलत उत्तर!";
    }

    setTimeout(() => {

        currentIndex++;

        loadQuestion();

    }, 1200);
}

// ==========================================
// 22. FINISH PLAYER ROUND
// ==========================================

function finishRound() {

    clearInterval(timer);

    if (gameMode === "2p") {

        if (currentPlayer === 1) {

            player1Score = score;

            player1Answers = [...userAnswers];

            currentPlayer = 2;

            alert(
                "Player 1 को खेल सकियो! अब Player 2 को पालो।"
            );

            // Same questions for fair competition.

            currentQuestions = [...matchQuestions];

            currentIndex = 0;

            score = 0;

            userAnswers = [];

            updatePlayerDisplay();

            const scoreDisplay = $("current-score");

            if (scoreDisplay) {
                scoreDisplay.textContent = 0;
            }

            loadQuestion();

            return;
        }

        if (currentPlayer === 2) {

            player2Score = score;

            player2Answers = [...userAnswers];

            showMultiplayerResult();

            return;
        }
    }

    showResult();
}

// ==========================================
// 23. SINGLE PLAYER RESULT
// ==========================================

function showResult() {

    clearInterval(timer);

    showScreen("result-screen");

    const single = $("singleplayer-result");

    const multi = $("multiplayer-result");

    if (single) single.style.display = "block";

    if (multi) multi.style.display = "none";

    const finalScore = $("final-score");

    const total = $("total-q");

    if (finalScore) {
        finalScore.textContent = score;
    }

    if (total) {
        total.textContent = `/ ${currentQuestions.length * POINTS_PER_CORRECT}`;
    }

    const percentage =
        currentQuestions.length > 0
            ? (score / (currentQuestions.length * POINTS_PER_CORRECT)) * 100
            : 0;

    let message;

    if (percentage >= 80) {

        message = "अद्भुत! Excellent! 🏆";

    } else if (percentage >= 50) {

        message = "राम्रो! Good Job! 👍";

    } else {

        message = "अझै मेहनत गर्नुहोस्! 💪";
    }

    const messageElement = $("score-message");

    if (messageElement) {
        messageElement.textContent = message;
    }

    // Correct and wrong count.

    const correctCount = userAnswers.filter(
        a => a.isCorrect
    ).length;

    const wrongCount = userAnswers.length - correctCount;

    if ($("correct-count")) {
        $("correct-count").textContent = correctCount;
    }

    if ($("wrong-count")) {
        $("wrong-count").textContent = wrongCount;
    }

    showAnswerReview(userAnswers);
}

// ==========================================
// 24. ANSWER REVIEW
// ==========================================

function showAnswerReview(answers) {

    const container = $("review-container");

    if (!container) return;

    container.innerHTML = answers.map((answer, index) => {

        const item = document.createElement("div");

        item.className =
            `review-item ${answer.isCorrect ? "correct" : "wrong"}`;

        const question = document.createElement("strong");

        question.textContent =
            `${index + 1}. ${answer.question}`;

        const user = document.createElement("p");

        user.textContent = `तपाईंको उत्तर: ${answer.user}`;

        const correct = document.createElement("p");

        correct.textContent =
            `सही उत्तर: ${answer.correct}`;

        item.appendChild(question);
        item.appendChild(user);

        if (!answer.isCorrect) {

            item.appendChild(correct);
        }

        return item.outerHTML;

    }).join("");
}

// ==========================================
// 25. MULTIPLAYER RESULT
// ==========================================

function showMultiplayerResult() {

    clearInterval(timer);

    showScreen("result-screen");

    const single = $("singleplayer-result");

    const multi = $("multiplayer-result");

    if (single) single.style.display = "none";

    if (multi) multi.style.display = "block";

    const p1 = $("p1-final-score");

    const p2 = $("p2-final-score");

    if (p1) {
        p1.textContent = `Player 1: ${player1Score}`;
    }

    if (p2) {
        p2.textContent = `Player 2: ${player2Score}`;
    }

    let winner;

    if (player1Score > player2Score) {

        winner = "Player 1 विजयी! 🏆";

    } else if (player2Score > player1Score) {

        winner = "Player 2 विजयी! 🏆";

    } else {

        winner = "खेल बराबर भयो! 🤝";
    }

    const winnerText = $("winner-text");

    if (winnerText) {
        winnerText.textContent = winner;
    }
}

// ==========================================
// 26. TOGGLE ANSWER REVIEW
// ==========================================

function toggleReview() {

    const container = $("review-container");

    const button = $("toggle-review-btn");

    if (!container || !button) return;

    if (container.classList.contains("hidden")) {

        container.classList.remove("hidden");

        button.textContent = "लुकाउनुहोस्";

    } else {

        container.classList.add("hidden");

        button.textContent = "उत्तर हेर्नुहोस्";
    }
}

// ==========================================
// 27. RESTART QUIZ
// ==========================================

function restartGame() {

    clearInterval(timer);

    currentIndex = 0;

    score = 0;

    player1Score = 0;

    player2Score = 0;

    currentPlayer = 1;

    userAnswers = [];

    player1Answers = [];

    player2Answers = [];

    showScreen("category-screen");
}

// ==========================================
// 28. QUIT QUIZ
// ==========================================

function quitQuiz() {

    const confirmQuit = confirm(
        "के तपाईं क्विज छोड्न चाहनुहुन्छ?"
    );

    if (!confirmQuit) return;

    clearInterval(timer);

    currentIndex = 0;

    score = 0;

    currentPlayer = 1;

    userAnswers = [];

    showScreen("category-screen");
}

// ==========================================
// 29. INITIALIZE WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadQuestions();

    console.log("Awasthi Quiz initialized successfully!");

});

 
