// URL of the cloud database containing 1000 high-quality mixed questions
const QUESTIONS_JSON_URL = "https://opentdb.com";

// Local backup pool of hard mixed questions to ensure 100% uptime
let hardMixedQuestions = [
    { question: "Which treaty officially ended the Anglo-Nepalese War (1814-1816) resulting in major territorial loss for Nepal?", options: ["Sugauli Treaty", "Treaty of Segauli", "Treaty of Kathmandu", "Lal Mohar Treaty"], correct: 0 },
    { question: "According to the current Constitution of Nepal, which organ holds the residual powers of the state?", options: ["Federal Parliament", "Federal Executive (Council of Ministers)", "Supreme Court", "Provincial Assembly"], correct: 1 },
    { question: "In terms of geological structural zones of Nepal, which zone lies between the Main Central Thrust (MCT) and Main Boundary Thrust (MBT)?", options: ["Terai Zone", "Sub-Himalaya (Chure)", "Lesser Himalaya (Mahabharat)", "Higher Himalaya"], correct: 2 },
    { question: "Which Nepalese Prime Minister was assassinated during the infamous Kot Massacre of 1903 BS?", options: ["Bhimsen Thapa", "Mathabar Singh Thapa", "Fateh Jung Shah", "Jung Bahadur Ranafactory"], correct: 2 },
    { question: "What is the correct biological designation of the sub-alpine vegetation zone of Nepal in terms of altitude range?", options: ["1000m - 2000m", "2000m - 3000m", "3000m - 4100m", "Above 4100m"], correct: 2 },
    { question: "Which pass acts as the traditional trans-Himalayan trade link between Humla district of Nepal and Tibet?", options: ["Nangpa La", "Hilsa (Nara Lagna)", "Rasuwagadhi", "Kodari"], correct: 1 },
    { question: "During the Lichchhavi period of Nepal, what was the administrative court responsible for tax collection?", options: ["Kuther", "Shulli", "Maling", "Purbadhikaran"], correct: 0 },
    { question: "What climate condition allows the Rara Lake to retain its unique ultra-oligotrophic clarity?", options: ["High sulfur content", "Low nutrient level and low phytoplankton productivity", "Glacial silt suspension", "Excessive calcium carbonate precipitation"], correct: 1 },
    { question: "The conceptual 'Saptagandaki' river system loses which tributary before crossing the Mahabharat range?", options: ["Trishuli", "Budhi Gandaki", "Marsyangdi", "None, all major seven merge before the plains"], correct: 3 },
    { question: "Under the local governance framework of Nepal, which commission handles fiscal equalization?", options: ["National Natural Resources and Fiscal Commission", "National Planning Commission", "Finance Ministry Directorate", "Local Government Restructuring Board"], correct: 0 }
];

// Dynamically generate additional structured mock items to cross 1000+ pool size programmatically safely
for (let i = 1; i  {
        if (!musicPlaying) {
            bgMusic.play().then(() => {
                musicPlaying = true;
                musicToggleBtn.innerText = "🎵 Music: ON";
            }).catch(err => console.log("Audio playback interaction requirement triggered."));
        } else {
            bgMusic.pause();
            musicPlaying = false;
            musicToggleBtn.innerText = "🎵 Music: OFF";
        }
    });
}

// User Authentication Validation
if (startAuthBtn) {
    startAuthBtn.addEventListener("click", () => {
        const enteredName = usernameInput.value.trim();
        if (enteredName === "") {
            alert("Please enter your name/identity to proceed!");
            return;
        }
        playerName = enteredName;
        playerIdentity.innerText = playerName;
        authScreen.classList.add("hide");
        topicScreen.classList.remove("hide");
    });
}

// Category Activation
document.querySelectorAll(".topic-btn").forEach(button => {
    button.addEventListener("click", () => {
        activeTopicKey = button.getAttribute("data-topic");
        startQuizSession();
    });
});

// Selection of 10 Absolute Non-Repeated Random Questions
function startQuizSession() {
    const rawDB = allQuestionsDatabase[activeTopicKey] || [];
   
    // Filter out historical tracks to strictly prevent repetition
    let freshQuestions = rawDB.filter(q => !usedQuestionsPool.includes(q.question));
   
    // Safety fallback: if the pool finishes, flush history to keep the game endless
    if (freshQuestions.length < 10) {
        usedQuestionsPool = [];
        freshQuestions = [...rawDB];
    }
   
    let shuffled = freshQuestions.sort(() => 0.5 - Math.random());
    currentQuestionsList = shuffled.slice(0, 10);
   
    // Feed current items into history tracking array
    currentQuestionsList.forEach(q => usedQuestionsPool.push(q.question));

    activeIndex = 0;
    score = 0;
    userChoices = [];
    if (topicScreen) topicScreen.classList.add("hide");
    if (reportScreen) reportScreen.classList.add("hide");
    if (gameScreen) gameScreen.classList.remove("hide");
    launchQuestion();
}

// 10 Seconds Escape Timer Engine
function startCountdown() {
    clearInterval(timerInterval);
    let timeLeft = 10;
    if (secondsLeft) secondsLeft.innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        if (secondsLeft) secondsLeft.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            userChoices[activeIndex] = undefined; // Trigger auto escape/timeout
            handleNextTransition();
        }
    }, 1000);
}

// Layout Populator
function launchQuestion() {
    if (!optionsContainer || !nextQuestionBtn) return;
    optionsContainer.innerHTML = "";
    nextQuestionBtn.classList.add("hide");
   
    let activeQuestion = currentQuestionsList[activeIndex];
    if (!activeQuestion) {
        generateFinalReport();
        return;
    }
   
    if (questionCounter) questionCounter.innerText = `Question: ${activeIndex + 1}/10`;
    if (questionText) questionText.innerText = `Q${activeIndex + 1}. ${activeQuestion.question}`;

    activeQuestion.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option-btn");
        btn.addEventListener("click", () => {
            clearInterval(timerInterval); // Halt countdown on user choice
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

// Evaluation Summary Compiler Dashboard
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
