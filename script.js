// Lokraj Awasthi QUIZ - Developed by Lokraj Awasthi

let questionBank = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 20; // Changed to 20 seconds

// DOM Elements
const loginForm = document.getElementById('login-form');
const homeBtn = document.getElementById('home-btn');
const reviewBtn = document.getElementById('review-btn');
const restartBtn = document.getElementById('restart-btn');

// 1. LOGIN LOGIC (Anyone can enter their name)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('access-name').value.trim();
   
    // Check if name is not empty
    if (name.length > 0) {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('app-screen').classList.add('active');
        loadQuestions();
    } else {
        alert('कृपया आफ्नो नाम राख्नुहोस्!');
    }
});

// Load Questions from JSON
function loadQuestions() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questionBank = data;
            console.log(`${questionBank.length} प्रश्न सफलतापूर्वक लोड भयो!`);
        })
        .catch(error => { console.error('Error:', error); alert('प्रश्न लोड गर्न समस्या भयो!'); });
}

// Navigation Logic
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
   
    if (sectionId === 'category-section') {
        homeBtn.style.display = 'none';
    } else {
        homeBtn.style.display = 'block';
    }
}

homeBtn.addEventListener('click', () => showSection('category-section'));

// Category Selection
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => startQuiz(card.dataset.category));
});

// START QUIZ
function startQuiz(category) {
    if(questionBank.length === 0) { alert('प्रश्नहरू लोड हुँदैछन्... कृपया पर्खनुहोस्।'); return; }

    const askedKey = `asked_${category}`;
    let askedQuestions = JSON.parse(localStorage.getItem(askedKey)) || [];
   
    let available = questionBank.filter(q =>
        category === 'mixed' ? !askedQuestions.includes(q.id) : q.category === category && !askedQuestions.includes(q.id)
    );

    if (available.length < 10) {
        askedQuestions = [];
        localStorage.removeItem(askedKey);
        available = questionBank.filter(q => category === 'mixed' ? true : q.category === category);
    }

    currentQuestions = shuffleArray(available).slice(0, 10);
    currentQuestions.forEach(q => {
        if(!askedQuestions.includes(q.id)) askedQuestions.push(q.id);
    });
    localStorage.setItem(askedKey, JSON.stringify(askedQuestions));

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    document.getElementById('review-container').innerHTML = '';

    showSection('quiz-section');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) { endQuiz(); return; }

    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('question-counter').textContent = `प्रश्न ${currentQuestionIndex + 1}/10`;
    document.getElementById('question-text').textContent = q.question;
   
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectOption(index);
        container.appendChild(btn);
    });
    startTimer();
}

function startTimer() {
    timeLeft = 20; // Reset to 20 seconds
    document.getElementById('time-left').textContent = timeLeft;
    const progress = document.getElementById('timer-progress');
    progress.style.width = '100%';
    progress.style.background = 'var(--success)';
    clearInterval(timerInterval);
   
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        progress.style.width = `${(timeLeft / 20) * 100}%`; // Updated calculation for 20 seconds
        if (timeLeft <= 5) progress.style.background = 'var(--danger)'; // Red when 5 seconds left
        if (timeLeft <= 0) { clearInterval(timerInterval); selectOption(-1); }
    }, 1000);
}

function selectOption(selectedIndex) {
    clearInterval(timerInterval);
    const q = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === q.answer;
    if (isCorrect) score++;

    userAnswers.push({
        question: q.question,
        userOption: selectedIndex === -1 ? "समय सकियो" : q.options[selectedIndex],
        correctOption: q.options[q.answer],
        isCorrect
    });

    const buttons = document.querySelectorAll('.option-btn');
    if (selectedIndex !== -1) buttons[selectedIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    buttons[q.answer].classList.add('correct');
    buttons.forEach(btn => btn.disabled = true);

    setTimeout(() => { currentQuestionIndex++; loadQuestion(); }, 1200);
}

function endQuiz() {
    showSection('result-section');
    document.getElementById('final-score').textContent = score;
    let msg = score === 10 ? "अद्भुत! तपाईं एकदमै जानकार हुनुहुन्छ! 🏆" :
              score >= 7 ? "धेरै राम्रो! अझै अलि अभ्यास गर्नुहोस्। 👏" :
              score >= 4 ? "ठिकै छ, अर्को पटक अझै राम्रो गर्नुहोला! 👍" :
              "चिन्ता नगर्नुहोस्, फेरि प्रयास गर्नुहोस्! 💪";
    document.getElementById('score-message').textContent = msg;
}

reviewBtn.addEventListener('click', () => {
    const container = document.getElementById('review-container');
    if (container.innerHTML === '') {
        container.innerHTML = userAnswers.map((ans, idx) => `
            <div class="review-item ${ans.isCorrect ? 'correct' : 'wrong'}">
                <strong>${idx+1}. ${ans.question}</strong><br>
                <span style="color:${ans.isCorrect?'green':'red'}">तपाईं: ${ans.userOption}</span><br>
                ${!ans.isCorrect ? `<span style="color:green">सही: ${ans.correctOption}</span>` : ''}
            </div>`).join('');
    } else {
        container.innerHTML = '';
    }
});

restartBtn.addEventListener('click', () => {
    document.getElementById('review-container').innerHTML = '';
    showSection('category-section');
});

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
} 
