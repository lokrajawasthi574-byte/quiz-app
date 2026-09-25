// 🔱 1000+ Hard Mixed Questions Database (GK + Science) 🔱
const hardMixedQuestions = [
    { question: "Which treaty officially ended the Anglo-Nepalese War (1814-1816)?", options: ["Sugauli Treaty", "Treaty of Segauli", "Treaty of Kathmandu", "Lal Mohar Treaty"], correct: 0 },
    { question: "According to the Constitution of Nepal, who holds residual powers?", options: ["Federal Parliament", "Federal Executive (Council of Ministers)", "Supreme Court", "Provincial Assembly"], correct: 1 },
    { question: "Which zone lies between Main Central Thrust (MCT) and Main Boundary Thrust (MBT)?", options: ["Terai Zone", "Sub-Himalaya (Chure)", "Lesser Himalaya (Mahabharat)", "Higher Himalaya"], correct: 2 },
    { question: "Which Nepalese Prime Minister was assassinated during the Kot Massacre?", options: ["Bhimsen Thapa", "Mathabar Singh Thapa", "Fateh Jung Shah", "Jung Bahadur Rana"], correct: 2 },
    { question: "What climate condition allows Rara Lake to retain its unique clarity?", options: ["High sulfur content", "Low nutrient level and low phytoplankton productivity", "Glacial silt suspension", "Excessive calcium carbonate precipitation"], correct: 1 },
    { question: "What is the capital city of Nepal?", options: ["Pokhara", "Kathmandu", "Lalitpur", "Biratnagar"], correct: 1 },
    { question: "Which is the highest peak in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], correct: 2 },
    { question: "What is the chemical symbol for Water?", options: ["CO2", "H2O", "O2", "NaCl"], correct: 1 },
    { question: "Which is the largest lake in Nepal?", options: ["Phewa Lake", "Rara Lake", "Tilicho Lake", "Begnas Lake"], correct: 1 },
    { question: "Who is known as the Light of Asia?", options: ["Prithvi Narayan Shah", "Bhanubhakta Acharya", "Gautam Buddha", "King Janakfactory"], correct: 2 }
];

for (let i = 1; i  {
        localStorage.removeItem("quizPlayerName");
        location.reload();
    });
}

if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener("click", () => {
        if (!musicPlaying) {
            bgMusic.play().then(() => {
                musicPlaying = true;
                musicToggleBtn.innerText = "🎵 Music: ON";
            }).catch(err => console.log("Audio target blocked."));
        } else {
            bgMusic.pause();
            musicPlaying = false;
            musicToggleBtn.innerText = "🎵 Music: OFF";
        }
    });
}

// 🔥 FIXED CATEGORY INJECTOR MATRIX
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".topic-btn").forEach(button => {
        button.addEventListener("click", () => {
            activeTopicKey = button.getAttribute("data-topic");
            startQuizSession();
        });
    });
    checkSavedIdentity();
});

// ⚡ LOCAL SIMULATE BYPASS ENGINES FOR TESTING ENVIRONMENT
setTimeout(() => {
    const authBox = document.getElementById("auth-screen");
    if (authBox && !authBox.classList.contains("hide")) {
        const mockBtn = document.createElement("button");
        mockBtn.innerText = "⚡ Bypass Login (Click to Test)";
        mockBtn.className = "action-btn";
        mockBtn.style.marginTop = "25px";
        mockBtn.addEventListener("click", () => {
            playerName = "Lokraj Awasthi Demo";
            localStorage.setItem("quizPlayerName", playerName);
            if (playerIdentity) playerIdentity.innerText = playerName;
            authBox.classList.add("hide");
            if (topicScreen) topicScreen.classList.remove("hide");
        });
        authBox.appendChild(mockBtn);
    }
}, 800);

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
    if (topicScreen) topicScreen.classList.add("hide");
    if (reportScreen) reportScreen.classList.add("hide");
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
    gameScreen.classList.add("hide"); reportScreen.classList.remove("hide"); score = 0; let reportMarkup = "";
    currentQuestionsList.forEach((item, index) => {
        let userChoice = userChoices[index]; let correctChoice = item.correct; let isCorrect = userChoice === correctChoice;
        if (isCorrect) score++;
        reportMarkup += `
            <div class="report-item ${isCorrect ? 'correct-ans' : 'wrong-ans'}">
                <strong>Q${index + 1}: ${item.question}</strong><br>
                Your Choice: <span class="${isCorrect ? 'text-success' : 'text-danger'}">${userChoice !== undefined ? item.options[userChoice] : 'Skipped/Timeout'}</span><br>
