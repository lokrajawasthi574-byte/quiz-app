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

// Loop framework to safely generate 1000+ non-repeated items programmatically
for (let i = 1; i  {
        if (!musicPlaying) {
            bgMusic.play().then(() => {
                musicPlaying = true;
                musicToggleBtn.innerText = "🎵 Music: ON";
            }).catch(err => console.log("Audio pipeline active."));
        } else {
            bgMusic.pause();
            musicPlaying = false;
            musicToggleBtn.innerText = "🎵 Music: OFF";
        }
    });
}

// 🔥 Master Initialization & Bypass Interface Engine
function autoBypassAuthentication() {
    if (playerIdentity) playerIdentity.innerText = playerName;
   
    // Smooth layout transitions with multiple support tags
    if (authScreen) {
        authScreen.style.display = "none";
        authScreen.classList.add("hide");
    }
    if (topicScreen) {
        topicScreen.style.display = "block";
        topicScreen.classList.remove("hide");
    }
}

// Event Listeners for Categories Grid
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".topic-btn").forEach(button => {
        button.addEventListener("click", () => {
            activeTopicKey = button.getAttribute("data-topic");
            startQuizSession();
        });
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
    if (topicScreen) topicScreen.style.display = "none";
    if (reportScreen) reportScreen.style.display = "none";
    if (gameScreen) gameScreen.style.display = "block";
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
    if (activeIndex < currentQuestionsList.length - 1) {
        activeIndex++;
        launchQuestion();
    } else {
        generateFinalReport();
    }
}

function generateFinalReport() {
    if (!gameScreen || !reportScreen || !scoreSummary || !detailedReport) return;
    gameScreen.style.display = "none"; reportScreen.style.display = "block"; score = 0; let reportMarkup = "";

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

// 🔥 FIXED: ब्राउजरमा सबै डेटा लोड हुने बित्तिकै सिधै ४ वटा टपिक खोल्ने नयाँ मास्टर इन्जिन
window.onload = function() {
    autoBypassAuthentication();
};

 
