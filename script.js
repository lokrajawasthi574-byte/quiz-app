/* ==================================================
   AWASTHI QUIZ - COMPLETE JAVASCRIPT
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
                !isNaN(q.answer) &&
                Number(q.answer) >= 0 &&
                Number(q.answer) < q.options.length
            )
            .map((q, index) => ({
                ...q,
                id: q.id ?? index + 1,
                category: String(q.category || "").toLowerCase().trim(),
                subject: String(q.subject || "").trim(),
                chapter: String(q.chapter || "General").trim()
            }));

        questionsLoaded = true;
        console.log(`Successfully loaded ${allQuestions.length} questions!`);

    } catch (error) {
        console.error("Question loading error:", error);
        allQuestions = [];
        questionsLoaded = false;
        alert("प्रश्नहरू लोड हुन सकेनन्। कृपया questions.json फाइल जाँच गर्नुहोस्।");
    }
}

// ==========================================
// 6. GAME MODE
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
// 7. LOGIN
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

        if (!questionsLoaded) {
            await loadQuestions();
        }
       
        showScreen("lang-screen");
    });
}

// ==========================================
// 8. SCREEN NAVIGATION
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
// 9. CLASS SELECTION
// ==========================================
function selectCategory(category) {
    console.log("Class selected:", category);
   
    if (!classSubjects[category]) {
        alert("कृपया सही Class छान्नुहोस्!");
        return;
    }
    selectedClass = category;
    const title = $("subject-title");
    if (title) {
        title.textContent = category.replace("class", "Class ") + " - Subjects";
    }

    const list = $("subject-list");
    if (!list) {
        console.error("subject-list not found!");
        return;
    }
    list.innerHTML = "";

    classSubjects[category].forEach(subject => {
        const card = document.createElement("div");
        card.className = "cat-card";
        let icon = "fa-book";

        if (["Science", "Physics", "Chemistry", "Biology"].includes(subject)) icon = "fa-flask";
        if (subject.includes("Math")) icon = "fa-calculator";
        if (subject === "Computer") icon = "fa-laptop-code";

        card.innerHTML = `<i class="fas ${icon}"></i><h3>${subject}</h3>`;
       
        card.onclick = function() {
            console.log("Subject clicked:", subject);
            selectSubject(subject);
        };
       
        list.appendChild(card);
    });

    showScreen("subject-screen");
}

// ==========================================
// 10. SUBJECT SELECTION
// ==========================================
function selectSubject(subject) {
    console.log("Subject selected:", subject);
   
    if (!classSubjects[selectedClass]?.includes(subject)) {
        alert("Invalid subject!");
        return;
    }
    selectedSubject = subject;
    loadChapters(selectedClass, subject);
}

// ==========================================
// 11. CHAPTER LOADING
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
        alert("यस विषयमा अहिले प्रश्नहरू उपलब्ध छैनन्!");
        return;
    }

    const chapters = [...new Set(filtered.map(q => q.chapter))];
    const title = $("chapter-title");
    if (title) title.textContent = `${subject} - Chapters`;

    const list = $("chapter-list");
    if (!list) return;
    list.innerHTML = "";

    const allButton = document.createElement("button");
    allButton.className = "chapter-btn";
    allButton.textContent = "सबै अध्याय (All Chapters)";
    allButton.onclick = () => {
        selectedChapter = "All Chapters";
        startQuiz(filtered);
    };
    list.appendChild(allButton);

    chapters.forEach(chapter => {
        const button = document.createElement("button");
        button.className = "chapter-btn";
        button.textContent = chapter;
        button.onclick = () => {
            selectedChapter = chapter;
            const chapterQuestions = filtered.filter(q => q.chapter === chapter);
            startQuiz(chapterQuestions);
        };
        list.appendChild(button);
    });

    showScreen("chapter-screen");
}

// ==========================================
// 12. SHUFFLE QUESTIONS
// ==========================================
function shuffleQuestions(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ==========================================
// 13. START QUIZ
// ==========================================
function startQuiz(questions) {
    if (!questions || questions.length === 0) {
        alert("कुनै प्रश्न उपलब्ध छैन!");
        return;
    }

    clearInterval(timer);
    matchQuestions = shuffleQuestions(questions).slice(0, QUESTIONS_PER_GAME);
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
    if (reviewButton) reviewButton.textContent = "उत्तर हेर्नुहोस्";

    showScreen("quiz-screen");
    updatePlayerDisplay();
    loadQuestion();
}

// ==========================================
// 14. PLAYER DISPLAY
// ==========================================
function updatePlayerDisplay() {
    const playerDisplay = $("current-player");
    if (playerDisplay) {
        playerDisplay.textContent = gameMode === "2p" ? `Player ${currentPlayer}` : userName;
    }
}

// ==========================================
// 15. LOAD QUESTION
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

    counter.textContent = `प्रश्न ${currentIndex + 1} / ${currentQuestions.length}`;
    questionText.textContent = q.question;
    container.innerHTML = "";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = option;
        button.onclick = () => checkAnswer(index, button);
        container.appendChild(button);
    });

    startTimer();
}

// ==========================================
// 16. QUESTION TIMER
// ==========================================
function startTimer() {
    clearInterval(timer);
    timeLeft = QUESTION_TIME;
    const timeDisplay = $("time-left");
    const progress = $("timer-progress");

    if (timeDisplay) timeDisplay.textContent = timeLeft;
    if (progress) progress.style.width = "100%";

    timer = setInterval(() => {
        timeLeft--;
        if (timeDisplay) timeDisplay.textContent = timeLeft;
        if (progress) progress.style.width = ((timeLeft / QUESTION_TIME) * 100) + "%";

        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1, null);
        }
    }, 1000);
}

// ==========================================
// 17. CHECK ANSWER
// ==========================================
function checkAnswer(selected, button) {
    if (answered) return;
    answered = true;
    clearInterval(timer);

    const q = currentQuestions[currentIndex];
    const isCorrect = String(selected) === String(q.answer);

    if (isCorrect) {
        score += POINTS_PER_CORRECT;
    }

    const userAnswer = selected === -1 ? "समय सकियो" : q.options[selected];
    userAnswers.push({
        question: q.question,
        user: userAnswer,
        correct: q.options[q.answer],
        isCorrect: isCorrect
    });

    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (String(index) === String(q.answer)) {
            btn.classList.add("correct");
        }
    });

    if (button && !isCorrect) {
        button.classList.add("wrong");
    }

    const scoreDisplay = $("current-score");
    if (scoreDisplay) scoreDisplay.textContent = score;

    const feedback = $("answer-feedback");
    if (feedback) {
        feedback.textContent = isCorrect ? "सही उत्तर! +10 अंक" : (selected === -1 ? "समय सकियो!" : "गलत उत्तर!");
    }

    setTimeout(() => {
        currentIndex++;
        loadQuestion();
    }, 1500);
}

// ==========================================
// 18. FINISH PLAYER ROUND
// ==========================================
function finishRound() {
    clearInterval(timer);

    if (gameMode === "2p") {
        if (currentPlayer === 1) {
            player1Score = score;
            player1Answers = [...userAnswers];
            currentPlayer = 2;
            score = 0;
            userAnswers = [];
            currentIndex = 0;
            currentQuestions = [...matchQuestions];

            const scoreDisplay = $("current-score");
            if (scoreDisplay) scoreDisplay.textContent = 0;

            showPlayerTransitionOverlay(2);
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

function showPlayerTransitionOverlay(playerNum) {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;";
    overlay.innerHTML = `
        <h2 style="font-size: 2.5rem; margin-bottom: 20px;">Player ${playerNum} को पालो!</h2>
        <p style="font-size: 1.2rem;">कृपया डिभाइस Player ${playerNum} लाई दिनुहोस्।</p>
        <p style="margin-top: 30px; font-size: 1rem; opacity: 0.8;">स्वचालित रूपमा सुरु हुँदैछ...</p>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.remove();
        updatePlayerDisplay();
        loadQuestion();
    }, 2500);
}

// ==========================================
// 19. SINGLE PLAYER RESULT
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
    if (finalScore) finalScore.textContent = score;
    if (total) total.textContent = `/ ${currentQuestions.length * POINTS_PER_CORRECT}`;

    const savedHighScore = localStorage.getItem('awasthiQuizHighScore') || 0;
    if (score > savedHighScore) {
        localStorage.setItem('awasthiQuizHighScore', score);
    }
    const highScoreDisplay = $("high-score-display");
    if (highScoreDisplay) {
        highScoreDisplay.textContent = `सर्वोच्च स्कोर: ${Math.max(score, savedHighScore)}`;
    }

    const percentage = currentQuestions.length > 0
        ? (score / (currentQuestions.length * POINTS_PER_CORRECT)) * 100
        : 0;

    let message;
    if (percentage >= 80) message = "अद्भुत! Excellent! 🏆";
    else if (percentage >= 50) message = "राम्रो! Good Job! 👍";
    else message = "अझै मेहनत गर्नुहोस्! 💪";

    const messageElement = $("score-message");
    if (messageElement) {
        messageElement.textContent = (score > savedHighScore && score > 0) ? "नयाँ कीर्तिमान! 🎉 " + message : message;
    }

    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const wrongCount = userAnswers.length - correctCount;

    if ($("correct-count")) $("correct-count").textContent = correctCount;
    if ($("wrong-count")) $("wrong-count").textContent = wrongCount;

    showAnswerReview(userAnswers);
}

// ==========================================
// 20. ANSWER REVIEW
// ==========================================
function showAnswerReview(answers) {
    const container = $("review-container");
    if (!container) return;

    container.innerHTML = answers.map((answer, index) => `
        <div class="review-item ${answer.isCorrect ? 'correct' : 'wrong'}">
            <strong>${index + 1}. ${answer.question}</strong>
            <p>तपाईंको उत्तर: ${answer.user}</p>
            ${!answer.isCorrect ? `<p>सही उत्तर: ${answer.correct}</p>` : ''}
        </div>
    `).join('');
}

// ==========================================
// 21. MULTIPLAYER RESULT
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
    if (p1) p1.textContent = `Player 1: ${player1Score}`;
    if (p2) p2.textContent = `Player 2: ${player2Score}`;

    let winner;
    if (player1Score > player2Score) winner = "Player 1 विजयी! 🏆";
    else if (player2Score > player1Score) winner = "Player 2 विजयी! 🏆";
    else winner = "खेल बराबर भयो! 🤝";

    const winnerText = $("winner-text");
    if (winnerText) winnerText.textContent = winner;
}

// ==========================================
// 22. TOGGLE ANSWER REVIEW
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
// 23. RESTART QUIZ
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
// 24. QUIT QUIZ
// ==========================================
function quitQuiz() {
    const confirmQuit = confirm("के तपाईं क्विज छोड्न चाहनुहुन्छ?");
    if (!confirmQuit) return;

    clearInterval(timer);
    currentIndex = 0;
    score = 0;
    currentPlayer = 1;
    userAnswers = [];
    showScreen("category-screen");
}

// ==========================================
// 25. INITIALIZE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("Awasthi Quiz initialized!");
}); 
