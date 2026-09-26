/**
* Awasthi Quiz - Core Engine
* Creator & Owner: Lok Raj Awasthi
* Responsive, Client-side Randomized Engine for Educational Testing
*/

// Global App States
let currentQuestionIndex = 0;
let quizQuestions = [];
let score = 0;
let xpPoints = 0;
let timerInterval = null;
let timeLeft = 30;
let selectedLanguage = 'en';
let answeredHistory = [];

// Hard-coded architecture pointer for scale demonstration (Will connect to Firebase/Firestore APIs)
const MOCK_DB_ENDPOINT = "assets/data/questions.json";

// Initial Demo Questions Pool Structure
const sampleQuestionsPool = [
    {
        id: 1,
        category: "Class 10 - Science",
        question_en: "Which element has the chemical symbol 'O'?",
        question_np: "कुन तत्वको रासायनिक संकेत 'O' हो?",
        options_en: ["Oxygen", "Gold", "Osmium", "Iron"],
        options_np: ["अक्सिजन", "सुन", "अस्मियम", "फलाम"],
        correctIndex: 0,
        explanation_en: "Oxygen is represented by the symbol O and has atomic number 8.",
        explanation_np: "अक्सिजनलाई संकेत O ले जनाइन्छ र यसको परमाणु संख्या ८ हुन्छ।"
    },
    {
        id: 2,
        category: "Lok Sewa - Geography",
        question_en: "Which is the highest peak in the world?",
        question_np: "विश्वको सर्वोच्च शिखर कुन हो?",
        options_en: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
        options_np: ["केटु", "सगरमाथा", "कञ्चनजङ्घा", "लोत्से"],
        correctIndex: 1,
        explanation_en: "Mount Everest is Earth's highest mountain above sea level, located in Nepal.",
        explanation_np: "सगरमाथा पृथ्वीको सबैभन्दा अग्लो हिमाल हो, जुन नेपालमा अवस्थित छ।"
    }
];

// Sound Synthesizer System for strict cross-browser accessibility
const soundControls = {
    muted: false,
    playWarning() {
        if (this.muted) return;
        // Frequency alert audio simulation for 7 seconds warning
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    setupTheme();
    setupEventListeners();
});

// Theme Toggle Engine
function setupTheme() {
    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    const themeToggleBtn = document.getElementById("theme-toggle");
    if(themeToggleBtn) {
        themeToggleBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    document.getElementById("theme-toggle").innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
}

// Global Operations Triggers
function setupEventListeners() {
    // Landing screen transition
    const welcomeScreen = document.getElementById("welcome-screen");
    if (welcomeScreen) {
        welcomeScreen.addEventListener("click", () => {
            welcomeScreen.classList.add("hidden");
            document.getElementById("auth-screen").classList.remove("hidden");
        });
    }

    // Language Toggle
    const langBtn = document.getElementById("lang-switch");
    if(langBtn) {
        langBtn.addEventListener("click", () => {
            selectedLanguage = selectedLanguage === 'en' ? 'np' : 'en';
            langBtn.innerText = selectedLanguage === 'en' ? 'नेपाली' : 'English';
            // If active in quiz, re-render question node text
            if(quizQuestions.length > 0 && currentQuestionIndex < quizQuestions.length) {
                renderCurrentQuestion();
            }
        });
    }

    // Audio Mute System
    const soundBtn = document.getElementById("sound-toggle");
    if(soundBtn) {
        soundBtn.addEventListener("click", () => {
            soundControls.muted = !soundControls.muted;
            soundBtn.innerText = soundControls.muted ? "🔇 Sound Off" : "🔊 Sound On";
        });
    }
}

// Authentication Simulator Engine
function authenticateUser(provider) {
    console.log(`Authenticating via: ${provider}`);
    document.getElementById("auth-screen").classList.add("hidden");
    document.getElementById("main-dashboard").classList.remove("hidden");
}

function logoutUser() {
    document.getElementById("main-dashboard").classList.add("hidden");
    document.getElementById("auth-screen").classList.remove("hidden");
}

// Dynamic Core Quiz Lifecycle Engine
function startQuizEngine(category) {
    console.log(`Initializing question matrix for target: ${category}`);
   
    // Filter logic or fallback validation mock up
    quizQuestions = shuffleArray([...sampleQuestionsPool]).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    xpPoints = 0;
    answeredHistory = [];

    document.getElementById("main-dashboard").classList.add("hidden");
    document.getElementById("quiz-playground").classList.remove("hidden");
    document.getElementById("result-screen").classList.add("hidden");
   
    renderCurrentQuestion();
}

function renderCurrentQuestion() {
    resetTimer();
    if (currentQuestionIndex >= quizQuestions.length) {
        terminateQuizSession();
        return;
    }

    const qData = quizQuestions[currentQuestionIndex];
   
    // Update Tracking DOM indicators
    document.getElementById("current-question-num").innerText = currentQuestionIndex + 1;
    document.getElementById("total-questions-count").innerText = quizQuestions.length;
   
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    document.getElementById("quiz-progress-bar").style.width = `${progressPercent}%`;

    // Render Text fields dynamically based on active localization setup
    document.getElementById("question-text-node").innerText = selectedLanguage === 'en' ? qData.question_en : qData.question_np;
   
    const optionsContainer = document.getElementById("options-box-wrapper");
    optionsContainer.innerHTML = "";

    const operationalOptionsArray = selectedLanguage === 'en' ? qData.options_en : qData.options_np;
   
    operationalOptionsArray.forEach((optionText, idx) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option glass-panel font-medium text-left p-4 rounded-xl transition-all";
        btn.innerText = optionText;
        btn.onclick = () => evaluationSelection(idx, btn);
        optionsContainer.appendChild(btn);
    });

    document.getElementById("explanation-banner").classList.add("hidden");
    document.getElementById("next-question-trigger").classList.add("hidden");
   
    initiateTimerCounter();
}

// Timer Controller Execution Node
function initiateTimerCounter() {
    timeLeft = 30;
    const timerDisplay = document.getElementById("timer-countdown-text");
    timerDisplay.classList.remove("warning");
    timerDisplay.innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 7) {
            timerDisplay.classList.add("warning");
            soundControls.playWarning();
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeoutExceeded();
        }
    }, 1000);
}

function resetTimer() {
    if(timerInterval) clearInterval(timerInterval);
}

function handleTimeoutExceeded() {
    // Process structural skip upon complete timeout expiry
    evaluationSelection(-1, null);
}

// Selection Evaluator Engine
function evaluationSelection(chosenIndex, targetButtonElement) {
    resetTimer();
    const qData = quizQuestions[currentQuestionIndex];
    const optionsButtons = document.querySelectorAll("#options-box-wrapper .quiz-option");
   
    // Disable multiple inputs
    optionsButtons.forEach(btn => btn.disabled = true);

    const isCorrect = (chosenIndex === qData.correctIndex);
   
    if (chosenIndex === -1) {
        // Skipped configuration
        answeredHistory.push({ status: 'skipped', questionId: qData.id });
    } else if (isCorrect) {
        targetButtonElement.classList.add("correct");
        score += 10;
        xpPoints += 15;
        answeredHistory.push({ status: 'correct', questionId: qData.id });
    } else {
        if(targetButtonElement) targetButtonElement.classList.add("incorrect");
        optionsButtons[qData.correctIndex].classList.add("correct");
        answeredHistory.push({ status: 'incorrect', questionId: qData.id });
    }

    // Display Explanatory text feedback matrix block
    const expBanner = document.getElementById("explanation-banner");
    const expText = document.getElementById("explanation-content-text");
    expText.innerText = selectedLanguage === 'en' ? qData.explanation_en : qData.explanation_np;
    expBanner.classList.remove("hidden");

    document.getElementById("next-question-trigger").classList.remove("hidden");
}

function advanceNextQuestion() {
    currentQuestionIndex++;
    renderCurrentQuestion();
}

function skipActiveQuestion() {
    evaluationSelection(-1, null);
}

// Performance Processing Dashboard Termination Node
function terminateQuizSession() {
    document.getElementById("quiz-playground").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    const totalQuestions = quizQuestions.length;
    const corrects = answeredHistory.filter(h => h.status === 'correct').length;
    const incorrects = answeredHistory.filter(h => h.status === 'incorrect').length;

 
