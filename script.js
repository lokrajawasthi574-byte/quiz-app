// ==========================================
// Lokraj Awasthi QUIZ - Developed by Lokraj Awasthi
// ==========================================

let questionBank = [];
let currentUser = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 10;

const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const loginForm = document.getElementById('login-form');
const userDisplay = document.getElementById('user-display');
const logoutBtn = document.getElementById('logout-btn');

// Load questions from JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questionBank = data;
        console.log(`${questionBank.length} प्रश्नहरू सफलतापूर्वक लोड भयो!`);
    })
    .catch(error => {
        console.error('प्रश्न लोड गर्न समस्या:', error);
        alert('प्रश्नहरू लोड गर्न समस्या भयो। कृपया questions.json फाइल जाँच गर्नुहोस्।');
    });

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
   
    if(email && password.length >= 4) {
        currentUser = email.split('@')[0];
        localStorage.setItem('yakQuizUser', currentUser);
        showApp();
    } else {
        alert('कृपया वैध इमेल र कम्तिमा ४ अक्षरको पासवर्ड राख्नुहोस्।');
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('yakQuizUser');
    currentUser = null;
    loginScreen.classList.add('active');
    appScreen.classList.remove('active');
});

window.addEventListener('load', () => {
    const savedUser = localStorage.getItem('yakQuizUser');
    if(savedUser) {
        currentUser = savedUser;
        showApp();
    }
});

function showApp() {
    loginScreen.classList.remove('active');
    appScreen.classList.add('active');
    userDisplay.textContent = currentUser;
    showSection('category-section');
}

// Category Selection
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        startQuiz(category);
    });
});

function startQuiz(category) {
    if(questionBank.length === 0) {
        alert('प्रश्नहरू लोड हुँदैछन्। कृपया केही समय पर्खनुहोस्।');
        return;
    }

    const askedKey = `askedQuestions_${currentUser}`;
    let askedQuestions = JSON.parse(localStorage.getItem(askedKey)) || [];
   
    let availableQuestions = questionBank.filter(q => {
        if (category === 'mixed') return !askedQuestions.includes(q.id);
        return q.category === category && !askedQuestions.includes(q.id);
    });

    if (availableQuestions.length < 10) {
        alert('यस विषयका सबै नयाँ प्रश्नहरू सकिएका छन्! पुराना प्रश्नहरू फेरि मिसाउँदैछौं।');
        askedQuestions = [];
        availableQuestions = questionBank.filter(q => category === 'mixed' ? true : q.category === category);
    }

    currentQuestions = shuffleArray(availableQuestions).slice(0, 10);
   
    currentQuestions.forEach(q => {
        if(!askedQuestions.includes(q.id)) askedQuestions.push(q.id);
    });
    localStorage.setItem(askedKey, JSON.stringify(askedQuestions));

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
   
    showSection('quiz-section');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('question-counter').textContent = `प्रश्न ${currentQuestionIndex + 1}/10`;
    document.getElementById('question-text').textContent = q.question;
   
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    timeLeft = 10;
    document.getElementById('time-left').textContent = timeLeft;
    document.getElementById('timer-progress').style.width = '100%';
    document.getElementById('timer-progress').style.background = 'var(--success)';

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        const percentage = (timeLeft / 10) * 100;
        document.getElementById('timer-progress').style.width = `${percentage}%`;

        if (timeLeft <= 3) {
            document.getElementById('timer-progress').style.background = 'var(--danger)';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectOption(-1);
        }
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
        isCorrect: isCorrect
    });

    const buttons = document.querySelectorAll('.option-btn');
    if (selectedIndex !== -1) {
        buttons[selectedIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    }
    buttons[q.answer].classList.add('correct');

    buttons.forEach(btn => btn.disabled = true);

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

function endQuiz() {
    showSection('result-section');
    document.getElementById('final-score').textContent = score;
   
    let message = "";
    if (score === 10) message = "अद्भुत! तपाईं एकदमै जानकार हुनुहुन्छ! 🏆";
    else if (score >= 7) message = "धेरै राम्रो! 👏";
    else if (score >= 4) message = "ठिकै छ, अझै अभ्यास गर्नुहोस्! 👍";
    else message = "चिन्ता नगर्नुहोस्, फेरि प्रयास गर्नुहोस्! 💪";
   
    document.getElementById('score-message').textContent = message;

    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';
   
    userAnswers.forEach((ans, idx) => {
        const div = document.createElement('div');
        div.className = `review-item ${ans.isCorrect ? 'correct' : 'wrong'}`;
        div.innerHTML = `
            <strong>प्रश्न ${idx + 1}:</strong> ${ans.question}<br>
            <span style="color: ${ans.isCorrect ? 'green' : 'red'}">
                तपाईंको उत्तर: ${ans.userOption}
            </span><br>
            ${!ans.isCorrect ? `<span style="color: green">सही उत्तर: ${ans.correctOption}</span>` : ''}
        `;
        reviewContainer.appendChild(div);
    });
}

document.getElementById('restart-btn').addEventListener('click', () => {
    showSection('category-section');
});

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
} 
