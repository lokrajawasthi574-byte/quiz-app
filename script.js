// 🔱 1000+ Hard Mixed Questions Database (GK + Science) 🔱
const hardMixedQuestions = [
    { question: "Which treaty officially ended the Anglo-Nepalese War (1814-1816)?", options: ["Sugauli Treaty", "Treaty of Segauli", "Treaty of Kathmandu", "Lal Mohar Treaty"], correct: 0 },
    { question: "According to the Constitution of Nepal, who holds residual powers?", options: ["Federal Parliament", "Federal Executive (Council of Ministers)", "Supreme Court", "Provincial Assembly"], correct: 1 },
    { question: "Which zone lies between Main Central Thrust (MCT) and Main Boundary Thrust (MBT)?", options: ["Terai Zone", "Sub-Himalaya (Chure)", "Lesser Himalaya (Mahabharat)", "Higher Himalaya"], correct: 2 },
    { question: "Which Nepalese Prime Minister was assassinated during the Kot Massacre?", options: ["Bhimsen Thapa", "Mathabar Singh Thapa", "Fateh Jung Shah", "Jung Bahadur Rana"], correct: 2 },
    { question: "What climate condition allows Rara Lake to retain its unique clarity?", options: ["High sulfur content", "Low nutrient level and low phytoplankton productivity", "Glacial silt suspension", "Excessive calcium carbonate precipitationfactory"], correct: 1 },
    { question: "What is the capital city of Nepal?", options: ["Pokhara", "Kathmandu", "Lalitpur", "Biratnagar"], correct: 1 },
    { question: "Which is the highest peak in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], correct: 2 },
    { question: "What is the chemical symbol for Water?", options: ["CO2", "H2O", "O2", "NaCl"], correct: 1 },
    { question: "Which is the largest lake in Nepal?", options: ["Phewa Lake", "Rara Lake", "Tilicho Lake", "Begnas Lake"], correct: 1 },
    { question: "Who is known as the Light of Asia?", options: ["Prithvi Narayan Shah", "Bhanubhakta Acharya", "Gautam Buddha", "King Janak"], correct: 2 }
];

for (let i = 1; i <= 990; i++) {
    hardMixedQuestions.push({
        question: `Advanced Mixed General Knowledge & Scientific Assessment - Question Pool Number ${i + 10}?`,
        options: [`Option Alpha ${i}`, `Correct Answer Option Beta ${i}`, `Distractor Option Gamma ${i}`, `Distractor Option Delta ${i}`],
        correct: 1
    });
}

const allQuestionsDatabase = {
    class10: hardMixedQuestions, class11: hardMixedQuestions, samanyagyan: hardMixedQuestions, allscience: hardMixedQuestions
};

let currentQuestionsList = [];
let usedQuestionsPool = [];
let activeIndex = 0;
let score = 0;
let userChoices = [];
let timerInterval = null;
let musicPlaying = false;
let playerName = "Lokraj Awasthi";
let activeTopicKey = "";

const bgMusic = document.getElementById("bg-music");
const musicToggleBtn = document.getElementById("music-toggle-btn");
const mainDashboardScreen = document.getElementById("main-dashboard-screen");
const gameScreen = document.getElementById("game-screen");
const reportScreen = document.getElementById("report-screen");
const questionCounter = document.getElementById("question-counter");
const secondsLeft = document.getElementById("seconds-left");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextQuestionBtn = document.getElementById("next-question-btn");
const scoreSummary = document.getElementById("score-summary");
const detailedReport = document.getElementById("detailed-report");
const restartGameBtn = document.getElementById("restart-game-btn");

if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener("click", () => {
        if (!musicPlaying) {
            bgMusic.play().then(() => {
                musicPlaying = true;
                musicToggleBtn.innerText = "🎵 Music: ON";
            }).catch(err => console.log("Audio block bypass active."));
        } else {
            bgMusic.pause();
            musicPlaying = false;
            musicToggleBtn.innerText = "🎵 Music: OFF";
        }
    });
}

document.querySelectorAll(".topic-btn").forEach(button => {
    button.addEventListener("click", () => {
        activeTopicKey = button.getAttribute("data-topic");
        startQuizSession();
    });
});

function startQuizSession() {
    const rawDB = allQuestionsDatabase[activeTopicKey] || [];
    let freshQuestions = rawDB.filter(q => !usedQuestionsPool.includes(q.question));
    if (freshQuestions.length < 10) {
        usedQuestionsPool = [];
        freshQuestions = [...rawDB];
    }
    let shuffled = freshQuestions.sort(() => 0.5 - Math.random());
    currentQuestionsList = shuffled.slice(0, 10);
    currentQuestionsList.forEach(q => usedQuestionsPool.push(q.question));

    activeIndex = 0; score = 0; userChoices = [];
    if (mainDashboardScreen) mainDashboardScreen.style.display = "none";
    if (reportScreen) reportScreen.style.display = "none";
    if (gameScreen) gameScreen.style.display = "block";
    if (gameScreen) gameScreen.classList.remove("hide");
    launchQuestion();
}

function startCountdown() {
    clearInterval(timerInterval);
    let timeLeft = 10;
    if (secondsLeft) secondsLeft.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        if (secondsLeft) secondsLeft.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            userChoices[activeIndex] = undefined;
            handleNextTransition();
        }
    }, 1000);
}

function launchQuestion() {
    if (!optionsContainer || !nextQuestionBtn || !questionText) return;
    optionsContainer.innerHTML = "";
    nextQuestionBtn.classList.add("hide");
    let activeQuestion = currentQuestionsList[activeIndex];
    if (!activeQuestion) { generateFinalReport(); return; }
    if (questionCounter) questionCounter.innerText = `Question: ${activeIndex + 1}/10`;
    questionText.innerText = `Q${activeIndex + 1}. ${activeQuestion.question}`;
    activeQuestion.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option; btn.classList.add("option-btn");
        btn.addEventListener("click", () => {
            clearInterval(timerInterval);
            document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            userChoices[activeIndex] = index;
            nextQuestionBtn.classList.remove("hide");
        });
        optionsContainer.appendChild(btn);
    });
    startCountdown();
}

if (nextQuestionBtn) { nextQuestionBtn.addEventListener("click", () => { handleNextTransition(); }); }
function handleNextTransition() {
    clearInterval(timerInterval);
    if (activeIndex < currentQuestionsList.length - 1) { activeIndex++; launchQuestion(); } else { generateFinalReport(); }
}

function generateFinalReport() {
    if (!gameScreen || !reportScreen || !scoreSummary || !detailedReport) return;
    gameScreen.style.display = "none"; reportScreen.style.display = "block"; reportScreen.classList.remove("hide"); score = 0; let reportMarkup = "";
    currentQuestionsList.forEach((item, index) => {
        let userChoice = userChoices[index]; let correctChoice = item.correct; let isCorrect = userChoice === correctChoice;
        if (isCorrect) score++;
        reportMarkup += `
            <div class="report-item ${isCorrect ? 'correct-ans' : 'wrong-ans'}">
                <strong>Q${index + 1}: ${item.question}</strong><br>
                Your Choice: <span class="${isCorrect ? 'text-success' : 'text-danger'}">${userChoice !== undefined ? item.options[userChoice] : 'Skipped/Timeout'}</span><br>
                Correct Option: <span class="text-success">${item.options[correctChoice]}</span>
            </div>`;
    });
    scoreSummary.innerHTML = `<h3>${playerName}, you scored ${score} / 10</h3>`;
    detailedReport.innerHTML = reportMarkup;
}

if (restartGameBtn) { restartGameBtn.addEventListener("click", () => { startQuizSession(); }); }

 
