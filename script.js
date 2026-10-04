// Lokraj Awasthi Quiz - Developed by Lokraj Awasthi

let questionBank = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 20;
let musicPlaying = false;
let selectedLanguage = 'en';

// DOM Elements
const loginForm = document.getElementById('login-form');
const homeBtn = document.getElementById('home-btn');
const reviewBtn = document.getElementById('review-btn');
const restartBtn = document.getElementById('restart-btn');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const bgMusic = document.getElementById('bg-music');
const langScreen = document.getElementById('lang-screen');
const appScreen = document.getElementById('app-screen');
const loginScreen = document.getElementById('login-screen');
const btnEn = document.getElementById('btn-en');
const btnNp = document.getElementById('btn-np');

// Helper: Get text based on selected language
function getText(text) {
    if (text && text.includes('/')) {
        const parts = text.split('/');
        return selectedLanguage === 'en' ? parts[0].trim() : (parts[1] ? parts[1].trim() : parts[0].trim());
    }
    return text;
}

// Load Questions from JSON
function loadQuestions() {
    fetch('questions.json')
        .then(response => {
            if (!response.ok) throw new Error("HTTP error! Status: " + response.status);
            return response.json();
        })
        .then(data => {
            questionBank = data;
            console.log("Loaded " + questionBank.length + " questions!");
        })
        .catch(error => {
            console.error('Error:', error);
            alert("️ प्रश्नहरू लोड हुन सकेन!\n\n1. फाइलको नाम 'questions.json' (सानो अक्षर) छ कि छैन जाँच गर्नुहोस्।\n2. JSON मा कमा (,) को गल्ती छ कि छैन जाँच गर्नुहोस्।");
        });
}

// 1. LOGIN - When user submits name
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('access-name').value.trim();
       
        if (name.length >= 2) {
            // Hide login, show language screen
            loginScreen.classList.remove('active');
            langScreen.classList.add('active');
        } else {
            alert('कृपया आफ्नो नाम राख्नुहोस्!');
        }
    });
}

// 2. LANGUAGE BUTTONS - English
if (btnEn) {
    btnEn.addEventListener('click', () => {
        selectedLanguage = 'en';
        langScreen.classList.remove('active');
        appScreen.classList.add('active');
        loadQuestions();
        startMusic();
    });
}

// 3. LANGUAGE BUTTONS - Nepali
if (btnNp) {
    btnNp.addEventListener('click', () => {
        selectedLanguage = 'np';
        langScreen.classList.remove('active');
        appScreen.classList.add('active');
        loadQuestions();
        startMusic();
    });
}

// Start Music
function startMusic() {
    if (bgMusic) {
        bgMusic.volume = 0.3;
        bgMusic.play().then(() => {
            musicPlaying = true;
            if(musicIcon) musicIcon.className = 'fas fa-volume-up';
        }).catch(() => {
            console.log("Music autoplay blocked");
        });
    }
}

// Music Toggle Button
if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            bgMusic.pause();
            musicPlaying = false;
            if(musicIcon) musicIcon.className = 'fas fa-volume-mute';
            musicToggle.classList.add('muted');
        } else {
            bgMusic.play();
            musicPlaying = true;
            if(musicIcon) musicIcon.className = 'fas fa-volume-up';
            musicToggle.classList.remove('muted');
        }
    });
}

// Navigation: Show specific section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
   
    if (homeBtn) {
        homeBtn.style.display = sectionId === 'category-section' ? 'none' : 'block';
    }
}

// Home Button
if (homeBtn) {
    homeBtn.addEventListener('click', () => showSection('category-section'));
}

// Category Cards Click
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => startQuiz(card.dataset.category));
});

// START QUIZ
function startQuiz(category) {
    if(questionBank.length === 0) {
        alert('प्रश्नहरू लोड हुँदैछन्... कृपया पर्खनुहोस्।');
        return;
    }

    const askedKey = `asked_${category}_${selectedLanguage}`;
    let askedQuestions = JSON.parse(localStorage.getItem(askedKey)) || [];
   
    let available = questionBank.filter(q =>
        category === 'mixed' ? !askedQuestions.includes(q.id) : q.category === category && !askedQuestions.includes(q.id)
    );

    if (available.length < 10) {
        askedQuestions = [];
        localStorage.removeItem(askedKey);
        available = questionBank.filter(q => category === 'mixed' ? true : q.category === category);
    }

    if (available.length === 0) {
        alert("माफ गर्नुहोस्, यस विषयका प्रश्नहरू फेला परेनन्!");
        return;
    }

    currentQuestions = shuffleArray(available).slice(0, 10);
    currentQuestions.forEach(q => {
        if(!askedQuestions.includes(q.id)) askedQuestions.push(q.id);
    });
    localStorage.setItem(askedKey, JSON.stringify(askedQuestions));

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    const reviewContainer = document.getElementById('review-container');
    if(reviewContainer) reviewContainer.innerHTML = '';

    showSection('quiz-section');
    loadQuestion();
}

// Load Current Question
function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
   
    // Update counter text based on language
    const counterText = selectedLanguage === 'en'
        ? `Question ${currentQuestionIndex + 1}/10`
        : `प्रश्न ${currentQuestionIndex + 1}/१०`;
    document.getElementById('question-counter').textContent = counterText;
   
    // Show question in selected language
    document.getElementById('question-text').textContent = getText(q.question);
   
    // Create option buttons
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = getText(opt);
        btn.onclick = () => selectOption(index);
        container.appendChild(btn);
    });
   
    startTimer();
}

// Timer
function startTimer() {
    timeLeft = 20;
    document.getElementById('time-left').textContent = timeLeft;
    const progress = document.getElementById('timer-progress');
    progress.style.width = '100%';
    progress.style.background = 'var(--success)';
    clearInterval(timerInterval);
   
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        progress.style.width = `${(timeLeft / 20) * 100}%`;
        if (timeLeft <= 5) progress.style.background = 'var(--danger)';
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectOption(-1);
        }
    }, 1000);
}

// Select Option
function selectOption(selectedIndex) {
    clearInterval(timerInterval);
    const q = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === q.answer;
    if (isCorrect) score++;

    const timeUpText = selectedLanguage === 'en' ? "Time's up" : "समय सकियो";
    const yourAnsText = selectedLanguage === 'en' ? 'Your Answer' : 'तपाईं';
    const correctText = selectedLanguage === 'en' ? 'Correct' : 'सही';

    userAnswers.push({
        question: getText(q.question),
        userOption: selectedIndex === -1 ? timeUpText : getText(q.options[selectedIndex]),
        correctOption: getText(q.options[q.answer]),
        isCorrect
    });

    const buttons = document.querySelectorAll('.option-btn');
    if (selectedIndex !== -1) buttons[selectedIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    buttons[q.answer].classList.add('correct');
    buttons.forEach(btn => btn.disabled = true);

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1200);
}

// End Quiz - Show Result
function endQuiz() {
    showSection('result-section');
    document.getElementById('final-score').textContent = score;
   
    let msg = "";
    if (selectedLanguage === 'en') {
        msg = score === 10 ? "Amazing! You are a genius! 🏆" :
              score >= 7 ? "Very Good! Keep practicing. 👏" :
              score >= 4 ? "Not bad! Try better next time. 👍" :
              "Don't worry, try again! 💪";
    } else {
        msg = score === 10 ? "अद्भुत! तपाईं एकदमै जानकार हुनुहुन्छ! 🏆" :
              score >= 7 ? "धेरै राम्रो! अझै अलि अभ्यास गर्नुहोस्। 👏" :
              score >= 4 ? "ठिकै छ, अर्को पटक अझै राम्रो गर्नुहोला! 👍" :
              "चिन्ता नगर्नुहोस्, फेरि प्रयास गर्नुहोस्! 💪";
    }
    document.getElementById('score-message').textContent = msg;
}

// Review Button
if (reviewBtn) {
    reviewBtn.addEventListener('click', () => {
        const container = document.getElementById('review-container');
        const yourAnsText = selectedLanguage === 'en' ? 'Your Answer' : 'तपाईं';
        const correctText = selectedLanguage === 'en' ? 'Correct' : 'सही';
       
        if (container.innerHTML === '') {
            container.innerHTML = userAnswers.map((ans, idx) => `
                <div class="review-item ${ans.isCorrect ? 'correct' : 'wrong'}">
                    <strong>${idx+1}. ${ans.question}</strong><br>
                    <span style="color:${ans.isCorrect?'green':'red'}">${yourAnsText}: ${ans.userOption}</span><br>
                    ${!ans.isCorrect ? `<span style="color:green">${correctText}: ${ans.correctOption}</span>` : ''}
                </div>`).join('');
        } else {
            container.innerHTML = '';
        }
    });
}

// Restart Button
if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        const reviewContainer = document.getElementById('review-container');
        if(reviewContainer) reviewContainer.innerHTML = '';
        showSection('category-section');
    });
}

// Shuffle Array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
} 
