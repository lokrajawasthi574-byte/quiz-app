// Mock Distributed Database System Structures for Architecture Scaling
const questionDatabase = {
    class10: [
        {
            q: "पानीको घनत्व कुन तापक्रममा सबैभन्दा धेरै हुन्छ?",
            options: ["0°C", "4°C", "100°C", "-4°C"],
            correct: 1,
            explanation: "पानीको विशिष्ट विशेषताका कारण 4°C मा यसको घनत्व सबैभन्दा उच्च (Maximum Density) हुन्छ।"
        },
        {
            q: "कम्प्युटरको मुख्य प्रोसेसिङ युनिट (Brain) लाई के भनिन्छ?",
            options: ["RAM", "ALU", "CPU", "Hard Disk"],
            correct: 2,
            explanation: "CPU (Central Processing Unit) लाई कम्प्युटरको मष्तिष्क भनिन्छ जसले सबै गणना गर्दछ।"
        }
    ],
    class11: [
        {
            q: "What is the dimensional formula for Work Done?",
            options: ["M¹L¹T⁻²", "M¹L²T⁻²", "M¹L²T⁻¹", "M¹L¹T⁻¹"],
            correct: 1,
            explanation: "Work = Force × Distance = [MLT⁻²] × [L] = [ML²T⁻²]."
        }
    ],
    loksewa: [
        {
            q: "नेपालको संविधान (२०७२) मा कतिवटा अनुसूचीहरू रहेका छन्?",
            options: ["७ वटा", "८ वटा", "९ वटा", "१० वटा"],
            correct: 2,
            explanation: "नेपालको वर्तमान संविधानमा ३५ भाग, ३०८ धारा र ९ वटा अनुसूचीहरू व्यवस्था गरिएको छ।"
        }
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 30;

// Central Navigation Controller
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
   
    document.getElementById(`${tabId}-tab`).classList.add('active');
    clearInterval(timerInterval);
}

// Quiz Game Engine Launcher
function startQuiz(category, subjectName) {
    currentQuestions = questionDatabase[category] || [];
    if(currentQuestions.length === 0) {
        alert("This category database is being indexed via Cloud services.");
        return;
    }
   
    currentQuestionIndex = 0;
    score = 0;
    switchTab('quiz');
    document.getElementById('quiz-title').innerText = `${subjectName} Engine`;
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 30;
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('explanation-box').classList.add('hidden');
   
    const nextBtn = document.getElementById('next-btn');
    nextBtn.classList.add('disabled');
    nextBtn.disabled = true;

    const qData = currentQuestions[currentQuestionIndex];
    document.getElementById('question-text').innerText = qData.q;
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
   
    // Update Graphical Progress Bar
    const progressPercent = ((currentQuestionIndex) / currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;

    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';
   
    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectOption(idx, btn);
        optionsList.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
       
        // Critical 7 Seconds Audio Cues logic anchor
        if(timeLeft <= 7 && timeLeft > 0) {
            document.getElementById('timer').style.color = '#ef4444';
        } else {
            document.getElementById('timer').style.color = 'var(--accent)';
        }

        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            autoRevealCorrect();
        }
    }, 1000);
}

function selectOption(selectedIdx, selectedBtn) {
    clearInterval(timerInterval);
    const qData = currentQuestions[currentQuestionIndex];
    const options = document.getElementById('options-list').children;
   
    if(selectedIdx === qData.correct) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
        options[qData.correct].classList.add('correct'); // Highlight answer
    }

    // Disable all options post selection
    for(let btn of options) { btn.disabled = true; }
   
    // Reveal Structured Explanation
    document.getElementById('explanation-text').innerText = qData.explanation;
    document.getElementById('explanation-box').classList.remove('hidden');

    const nextBtn = document.getElementById('next-btn');
    nextBtn.classList.remove('disabled');
    nextBtn.disabled = false;
}

function autoRevealCorrect() {
    const qData = currentQuestions[currentQuestionIndex];
    const options = document.getElementById('options-list').children;
    options[qData.correct].classList.add('correct');
    for(let btn of options) { btn.disabled = true; }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if(currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    switchTab('result');
    document.getElementById('res-score').innerText = `${score}/${currentQuestions.length}`;
    const accuracy = Math.round((score / currentQuestions.length) * 100);
    document.getElementById('res-accuracy').innerText = `${accuracy}%`;
}

// Admin Interaction Management
function handleAdminAdd(event) {
    event.preventDefault();
    const cat = document.getElementById('form-cat').value;
    const q = document.getElementById('form-q').value;
    const opts = document.getElementById('form-opts').value.split(',').map(s => s.trim());
    const correct = parseInt(document.getElementById('form-correct').value);
    const exp = document.getElementById('form-exp').value;

    if(opts.length !== 4) {
        alert("Please enter exactly 4 comma-separated options.");
        return;
    }

    questionDatabase[cat].push({ q, options: opts, correct, explanation: exp });
    alert("New Dynamic Quiz Question compiled into Application Context Memory successfully.");
    document.getElementById('add-question-form').reset();
}

// Light & Dark Mode Toggle Action
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
}

 
