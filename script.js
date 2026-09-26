// Academic Database Structure mapping deep nested items
const database = {
    "Class 10": {
        "Science": ["Force", "Pressure", "Energy", "Light", "Electricity and Magnetism"],
        "Computer": ["Networking and Telecommunication", "Cyber Security", "C Language", "Database Management System"],
        "Optional Math": ["Matrices", "Coordinate Geometry", "Trigonometry", "Vectors", "Transformation"]
    },
    "Class 11": {
        "Physics": ["Mechanics", "Heat & Thermodynamics", "Wave & Optics", "Electricity & Magnetism", "Modern Physics"],
        "Chemistry": ["Physical Chemistry", "Inorganic Chemistry", "Organic Chemistry"],
        "Maths": ["Set and Logic", "Algebra", "Trigonometry", "Analytic Geometry", "Calculus"],
        "Computer": ["Computer System", "Number System", "Logic Gates", "C Programming", "Web Technology"]
    }
};

// Global State Variables
let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let scoreCorrect = 0;
let scoreIncorrect = 0;
let timerInterval;
let timeLeft = 30;
let activeCategory = '', activeSubject = '', activeChapter = '';

// Advanced Unique ID Tracker mapping arrays to guarantee strictly non-repeating operations
let globalUsedQuestionTracker = {
    "Class 10": {},
    "Class 11": {},
    "GK": new Set()
};

// Algorithmic Mocking Factory scaling up to structural limits (200 per chapter / 1,000,000 for GK)
function buildQuestionPool(category, subject, chapter) {
    let memoryStorage = [];
   
    if (category === "GK") {
        // Simulates scalable generation mechanics for Lok Sewa Exams
        for(let i = 1; i <= 1000; i++) {
            memoryStorage.push({
                id: `gk_id_index_${i}`,
                question: `[Lok Sewa GK Q-${i}] Consider geopolitical borders or administrative structural benchmarks: Which observation is correct?`,
                options: [`Incorrect Historical Record`, `Verified Correct GK Answer`, `Alternative Distractor Alpha`, `Alternative Distractor Beta`],
                correct: 1
            });
        }
    } else {
        // High density pool simulation tracking up to 200 items per chapter target
        for(let i = 1; i <= 200; i++) {
            memoryStorage.push({
                id: `${category}_${subject}_${chapter}_qnum_${i}`.replace(/\s+/g, '_'),
                question: `Evaluate the conceptual problem statement from ${category} - ${subject} (${chapter}), Problem Variant #${i}:`,
                options: [`Erroneous Statement A`, `Erroneous Statement B`, `True Analytical Solution`, `Erroneous Statement C`],
                correct: 2
            });
        }
    }
    return memoryStorage;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if(screenId !== 'quiz-screen') clearInterval(timerInterval);
}

function loadChapters(className, subjectName) {
    activeCategory = className;
    activeSubject = subjectName;
   
    const chaptersList = document.getElementById('chapters-list');
    const title = document.getElementById('chapters-title');
    const backBtn = document.getElementById('chapters-back-btn');
   
    title.innerText = `${className} » ${subjectName}`;
    chaptersList.innerHTML = '';
   
    const backScreen = className === 'Class 10' ? 'class10-screen' : 'class11-screen';
    backBtn.onclick = () => showScreen(backScreen);

    const chapters = database[className][subjectName] || [];
    chapters.forEach(chap => {
        const btn = document.createElement('button');
        btn.className = 'btn sub-btn';
        btn.innerText = chap;
        btn.onclick = () => startQuiz(className, subjectName, chap);
        chaptersList.appendChild(btn);
    });
   
    showScreen('chapters-screen');
}

function startQuiz(className, subjectName, chapterName) {
    activeCategory = className;
    activeSubject = subjectName;
    activeChapter = chapterName;
   
    let basePool = buildQuestionPool(className, subjectName, chapterName);
    let executionPool = [];

    // Tracking filter layer isolation to avoid repeats on "Play Again"
    if (className === "GK") {
        executionPool = basePool.filter(q => !globalUsedQuestionTracker["GK"].has(q.id));
        if (executionPool.length < 10) {
            globalUsedQuestionTracker["GK"].clear(); // Reset tracker if target scope limits exhaust
            executionPool = basePool;
        }
    } else {
        if (!globalUsedQuestionTracker[className][subjectName]) {
            globalUsedQuestionTracker[className][subjectName] = {};
        }
        if (!globalUsedQuestionTracker[className][subjectName][chapterName]) {
            globalUsedQuestionTracker[className][subjectName][chapterName] = new Set();
        }
       
        let activeSet = globalUsedQuestionTracker[className][subjectName][chapterName];
        executionPool = basePool.filter(q => !activeSet.has(q.id));
       
        if (executionPool.length < 10) {
            activeSet.clear();
            executionPool = basePool;
        }
    }
   
    // Sort array randomly and extract 10 unique nodes
    executionPool.sort(() => 0.5 - Math.random());
    currentQuizQuestions = executionPool.slice(0, 10);
   
    // Write extracted items back to memory ledger maps
    currentQuizQuestions.forEach(q => {
        if (className === "GK") {
            globalUsedQuestionTracker["GK"].add(q.id);
        } else {
            globalUsedQuestionTracker[className][subjectName][chapterName].add(q.id);
        }
    });

    currentQuestionIndex = 0;
    scoreCorrect = 0;
    scoreIncorrect = 0;
   
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 30;
   
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('timer-box').classList.remove('warning');
    document.getElementById('alarm-banner').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';

    const activeQ = currentQuizQuestions[currentQuestionIndex];
    document.getElementById('question-counter').innerText = `Question: ${currentQuestionIndex + 1}/10`;
    document.getElementById('question-text').innerText = activeQ.question;
   
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
   
    activeQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn option';
        btn.innerText = opt;
        btn.onclick = () => handleAnswerVerification(idx, btn);
        optionsContainer.appendChild(btn);
    });

    executeCountdownTimer();
}

function executeCountdownTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
       
        // Critical Section triggers at final 7 seconds remaining
        if (timeLeft <= 7 && timeLeft > 0) {
            document.getElementById('timer-box').classList.add('warning');
            document.getElementById('alarm-banner').style.display = 'block';
            document.getElementById('alarm-sound').play().catch(()=>{});
        }
       
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeoutExhaustion();
        }
    }, 1000);
}

function handleAnswerVerification(selectedIndex, selectedBtn) {
    clearInterval(timerInterval);
    const activeQ = currentQuizQuestions[currentQuestionIndex];
    const choices = document.querySelectorAll('.option');
   
    choices.forEach(opt => opt.disabled = true);
   
    if (selectedIndex === activeQ.correct) {
        selectedBtn.classList.add('correct');
        scoreCorrect++;
    } else {
        selectedBtn.classList.add('incorrect');
        choices[activeQ.correct].classList.add('correct');
        scoreIncorrect++;
    }
   
    document.getElementById('next-btn').style.display = 'block';
}

function handleTimeoutExhaustion() {
    const activeQ = currentQuizQuestions[currentQuestionIndex];
    const choices = document.querySelectorAll('.option');
    choices.forEach(opt => opt.disabled = true);
    choices[activeQ.correct].classList.add('correct');
    scoreIncorrect++;
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 10) {
        loadQuestion();
    } else {
        displayPerformanceSummary();
    }
}

function displayPerformanceSummary() {
    showScreen('result-screen');
    document.getElementById('correct-score').innerText = scoreCorrect;
    document.getElementById('incorrect-score').innerText = scoreIncorrect;
}

function restartCurrentQuiz() {
    startQuiz(activeCategory, activeSubject, activeChapter);
}

 
