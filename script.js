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
    { question: "Who is known as the Light of Asia?", options: ["Prithvi Narayan Shah", "Bhanubhakta Acharya", "Gautam Buddha", "King Janak"], correct: 2 }
];

// Loop to safely generate 1000+ non-repeated items programmatically
for (let i = 1; i  {
        if (!musicPlaying) {
            bgMusic.play().then(() => {
                musicPlaying = true;
                musicToggleBtn.innerText = "🎵 Music: ON";
            }).catch(err => console.log("Audio load pending."));
        } else {
            bgMusic.pause();
            musicPlaying = false;
            musicToggleBtn.innerText = "🎵 Music: OFF";
        }
    });
}

// 🔐 Authentication & Persistent Identity Cache Storage
if (startAuthBtn) {
    startAuthBtn.addEventListener("click", () => {
        if (!usernameInput) return;
        const enteredName = usernameInput.value.trim();
        if (enteredName === "") {
            alert("Please enter your name/identity to proceed!");
            return;
        }
        localStorage.setItem("quizPlayerName", enteredName);
        playerName = enteredName;
        if (playerIdentity) playerIdentity.innerText = playerName;
        if (authScreen) authScreen.classList.add("hide");
        if (topicScreen) topicScreen.classList.remove("hide");
    });
}

// Memory Recall Configuration on Startup
function checkSavedIdentity() {
    const savedName = localStorage.getItem("quizPlayerName");
    if (savedName && authScreen && topicScreen && playerIdentity) {
        playerName = savedName;
        playerIdentity.innerText = playerName;
        authScreen.classList.add("hide");
        topicScreen.classList.remove("hide");
    }
}

// Categories Event Triggers
document.querySelectorAll(".topic-btn").forEach(button => {
    button.addEventListener("click", () => {
        activeTopicKey = button.getAttribute("data-topic");
        startQuizSession();
    });
});

// Non-Repeated Selection Logic Matrix (10 Random Pickups)
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

    activeIndex = 0;
    score = 0;
    userChoices = [];
    if (topicScreen) topicScreen.classList.add("hide");
    if (reportScreen) reportScreen.classList.add("hide");
    if (gameScreen) gameScreen.classList.remove("hide");
    launchQuestion();
}

// 10 Seconds Core Evaluation Countdown Clock
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

// Active Layout Graphics Rendering Engine
function launchQuestion() {
    if (!optionsContainer || !nextQuestionBtn || !questionText) return;
    optionsContainer.innerHTML = "";
    nextQuestionBtn.classList.add("hide");
   
    let activeQuestion = currentQuestionsList[activeIndex];
    if (!activeQuestion) {
        generateFinalReport();
        return;
    }
   
    if (questionCounter) questionCounter.innerText = `Question: ${activeIndex + 1}/10`;
    questionText.innerText = `Q${activeIndex + 1}. ${activeQuestion.question}`;

    activeQuestion.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option-btn");
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

if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener("click", () => {
        handleNextTransition();
    });
}

function handleNextTransition() {
    clearInterval(timerInterval);
    if (activeIndex < currentQuestionsList.length - 1) {
        activeIndex++;
        launchQuestion();
    } else {
        generateFinalReport();
    }
}

// Evaluation Summary Metric Compilation Matrix
function generateFinalReport() {
    if (!gameScreen || !reportScreen || !scoreSummary || !detailedReport) return;
    gameScreen.classList.add("hide");
    reportScreen.classList.remove("hide");
    score = 0;
    let reportMarkup = "";

    currentQuestionsList.forEach((item, index) => {
        let userChoice = userChoices[index];
        let correctChoice = item.correct;
        let isCorrect = userChoice === correctChoice;
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

if (restartGameBtn) {
    restartGameBtn.addEventListener("click", () => {
        startQuizSession();
    });
}

// Active Initialization Hooks
document.addEventListener("DOMContentLoaded", () => {
    checkSavedIdentity();
});
checkSavedIdentity();
