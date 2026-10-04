// Lokraj Awasthi Quiz - Developed by Lokraj Awasthi

let questionBank = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 20;
let musicPlaying = false;
let selectedLanguage = 'en'; // Default language

// DOM Elements
const loginForm = document.getElementById('login-form');
const homeBtn = document.getElementById('home-btn');
const reviewBtn = document.getElementById('review-btn');
const restartBtn = document.getElementById('restart-btn');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const bgMusic = document.getElementById('bg-music');

// Helper function to split English/Nepali text
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
            console.log("सफलतापूर्वक " + questionBank.length + " वटा प्रश्न लोड भयो!");
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            alert("⚠️ त्रुटि: प्रश्नहरू लोड हुन सकेन!\n\n१. फाइलको नाम ठ्याक्कै 'questions.json' (सानो अक्षर) छ कि छैन जाँच गर्नुहोस्।\n. JSON फाइलमा कमा (,) को गल्ती छ।");
        });
}

// 1. LOGIN LOGIC
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('access-name').value.trim();
       
        if (name.length >= 2) {
            document.getElementById('login-screen').classList.remove('active');
            showLanguageSelection(); // Show language screen instead of app screen directly
        } else {
            alert('कृपया आफ्नो नाम राख्नुहोस्!');
        }
    });
}

// 2. LANGUAGE SELECTION SCREEN (Injected via JS)
function showLanguageSelection() {
    const langDiv = document.createElement('div');
    langDiv.id = 'lang-selection-screen';
    langDiv.className = 'screen active';
    langDiv.style.cssText = "justify-content: center; align-items: center; text-align: center;";
   
    langDiv.innerHTML = `
        <div style="background: rgba(255,255,255,0.95); padding: 40px 20px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 90%; max-width: 400px;">
            <h2 style="color: #6C63FF; margin-bottom: 10px; font-size: 1.8rem;">Choose Language</h2>
            <p style="color: #666; margin-bottom: 30px; font-size: 1.1rem;">भाषा छान्नुहोस्</p>
            <button id="btn-en" style="width: 100%; padding: 15px; font-size: 1.2rem; margin-bottom: 15px; border: none; border-radius: 10px; background: #6C63FF; color: white; cursor: pointer; font-weight: bold; transition: 0.3s;">🇬🇧 English</button>
            <button id="btn-np" style="width: 100%; padding: 15px; font-size: 1.2rem; border: none; border-radius: 10px; background: #FF9933; color: white; cursor: pointer; font-weight: bold; transition: 0.3s;">🇳🇵 नेपाली (Nepali)</button>
        </div>
    `;
   
    document.body.appendChild(langDiv);

    document.getElementById('btn-en').onclick = () => setLanguage('en');
    document.getElementById('btn-np').onclick = () => setLanguage('np');
}

function setLanguage(lang) {
    selectedLanguage = lang;
    document.getElementById('lang-selection-screen').remove();
    document.getElementById('app-screen').classList.add('active');
    loadQuestions();
   
    // Start music
    if (bgMusic) {
        bgMusic.volume = 0.3;
        bgMusic.play().then(() => {
            musicPlaying = true;
            if(musicIcon) musicIcon.className = 'fas fa-volume-up';
        }).catch(() => {});
    }
}

// Music Control
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

// Navigation Logic
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
   
    if (homeBtn) {
        homeBtn.style.display = sectionId === 'category-section' ? 'none' : 'block';
    }
}

if (homeBtn) {
    homeBtn.addEventListener('click', () => showSection('category-section'));
}

// Category Selection
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => startQuiz(card.dataset.category));
});

// START QUIZ
function startQuiz(category) {
    if(questionBank.length === 0) { alert('प्रश्नहरू लोड हुँदैछन्... कृपया पर्खनुहोस्।'); return; }

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

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) { endQuiz(); return; }

    const q = currentQuestions[currentQuestionIndex];
   
    // Apply Language Logic
    document.getElementById('question-counter').textContent = selectedLanguage === 'en' ? `Question ${currentQuestionIndex + 1}/10` : `प्रश्न ${currentQuestionIndex + 1}/१०`;
    document.getElementById('question-text').textContent = getText(q.question);
   
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = getText(opt); // Apply language to options too
        btn.onclick = () => selectOption(index);
        container.appendChild(btn);
    });
    startTimer();
}

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
        if (timeLeft <= 0) { clearInterval(timerInterval); selectOption(-1); }
    }, 1000);
}

function selectOption(selectedIndex) {
    clearInterval(timerInterval);
    const q = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === q.answer;
    if (isCorrect) score++;

    userAnswers.push({
        question: getText(q.question),
        userOption: selectedIndex === -1 ? (selectedLanguage === 'en' ? "Time's up" : "समय सकियो") : getText(q.options[selectedIndex]),
        correctOption: getText(q.options[q.answer]),
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
   
    let msg = "";
    if (selectedLanguage === 'en') {
        msg = score === 10 ? "Amazing! You are a genius! " :
              score >= 7 ? "Very Good! Keep practicing. 👏" :
              score >= 4 ? "Not bad! Try to do better next time. 👍" :
              "Don't worry, try again! 💪";
    } else {
        msg = score === 10 ? "अद्भुत! तपाईं एकदमै जानकार हुनुहुन्छ! 🏆" :
              score >= 7 ? "धेरै राम्रो! अझै अलि अभ्यास गर्नुहोस्। 👏" :
              score >= 4 ? "ठिकै छ, अर्को पटक अझै राम्रो गर्नुहोला! 👍" :
              "चिन्ता नगर्नुहोस्, फेरि प्रयास गर्नुहोस्! 💪";
    }
    document.getElementById('score-message').textContent = msg;
}

if (reviewBtn) {
    reviewBtn.addEventListener('click', () => {
        const container = document.getElementById('review-container');
        if (container.innerHTML === '') {
            container.innerHTML = userAnswers.map((ans, idx) => `
                <div class="review-item ${ans.isCorrect ? 'correct' : 'wrong'}">
                    <strong>${idx+1}. ${ans.question}</strong><br>
                    <span style="color:${ans.isCorrect?'green':'red'}">${selectedLanguage === 'en' ? 'Your Answer' : 'तपाईं'}: ${ans.userOption}</span><br>
                    ${!ans.isCorrect ? `<span style="color:green">${selectedLanguage === 'en' ? 'Correct' : 'सही'}: ${ans.correctOption}</span>` : ''}
                </div>`).join('');
        } else {
            container.innerHTML = '';
        }
    });
}

if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        const reviewContainer = document.getElementById('review-container');
        if(reviewContainer) reviewContainer.innerHTML = '';
        showSection('category-section');
    });
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
} 
