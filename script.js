// Lokraj Awasthi Quiz - Developed by Lokraj Awasthi

let questionBank = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 20;
let musicPlaying = false;
let gameMode = '1p'; // '1p' or '2p'
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

// DOM Elements
const loginForm = document.getElementById('login-form');
const homeBtn = document.getElementById('home-btn');
const reviewBtn = document.getElementById('review-btn');
const restartBtn = document.getElementById('restart-btn');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const bgMusic = document.getElementById('bg-music');
const omSound = document.getElementById('om-sound');
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');

// 1. Play Om Sound & Start Music on first interaction
function playDivineSound() {
    if(omSound) {
        omSound.volume = 0.5;
        omSound.play().catch(e => console.log("Audio play blocked"));
    }
    startMusic();
    createFlowerFall();
}

// Flower Fall Animation
function createFlowerFall() {
    const container = document.getElementById('flower-container');
    const flowers = ['🌸', '🌺', '🌼', '🌻', '🪷'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = Math.random() * 100 + 'vw';
            flower.style.animationDuration = (Math.random() * 3 + 2) + 's';
            flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
            container.appendChild(flower);
            setTimeout(() => flower.remove(), 5000);
        }, i * 100);
    }
}

// Game Mode Selection
function setMode(mode) {
    gameMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// Load Questions (Simulated for 2083 Syllabus Structure)
function loadQuestions() {
    // NOTE: Replace this with your actual fetch('questions.json') if you have the file.
    // For now, using a robust fallback structure so the app works immediately.
    questionBank = [
        { id: 1, category: 'class10', chapter: 'Force', question: "SI unit of force is?", options: ["Joule", "Newton", "Watt", "Pascal"], answer: 1 },
        { id: 2, category: 'class10', chapter: 'Force', question: "गुरुत्वाकर्षण बल कसमा निर्भर गर्छ?", options: ["पिण्ड र दूरी", "मात्र पिण्ड", "मात्र दूरी", "आयतन"], answer: 0 },
        { id: 3, category: 'class11', chapter: 'Physics', question: "Dimension of Force is?", options: ["[MLT⁻²]", "[ML²T⁻²]", "[MLT⁻¹]", "[M⁰L⁰T⁰]"], answer: 0 },
        { id: 4, category: 'class11', chapter: 'Chemistry', question: "Atomic number of Oxygen is?", options: ["6", "8", "10", "12"], answer: 1 },
        { id: 5, category: 'mixed', chapter: 'GK', question: "Nepal ko rashtriya phul kun ho?", options: ["Gurans", "Rose", "Lotus", "Sunflower"], answer: 0 }
        // Add more questions here following the same format!
    ];
    console.log("Loaded " + questionBank.length + " questions!");
}

// Login Form Submit
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('access-name').value.trim();
        if (name.length >= 2) {
            playDivineSound(); // Play Om and Flowers
            document.getElementById('user-display-name').innerText = "🙏 " + name;
            loginScreen.classList.remove('active');
            document.getElementById('lang-screen').classList.add('active');
            loadQuestions();
        } else {
            alert('कृपया आफ्नो नाम राख्नुहोस्!');
        }
    });
}

function startMusic() {
    if (bgMusic) {
        bgMusic.volume = 0.2;
        bgMusic.play().then(() => {
            musicPlaying = true;
            if(musicIcon) musicIcon.className = 'fas fa-volume-up';
        }).catch(() => console.log("Music autoplay blocked"));
    }
}

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

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    if (homeBtn) {
        homeBtn.style.display = (sectionId === 'category-section') ? 'none' : 'block';
    }
}

if (homeBtn) {
    homeBtn.addEventListener('click', () => {
        currentPlayer = 1;
        score = 0;
        showSection('category-section');
    });
}

document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const cat = card.dataset.category;
        // Check if category has chapters (simplified logic)
        if (cat === 'class10' || cat === 'class11') {
            showChapterScreen(cat);
        } else {
            startQuiz(cat, 'All');
        }
    });
});

function showChapterScreen(category) {
    const chapters = [...new Set(questionBank.filter(q => q.category === category).map(q => q.chapter))];
    const list = document.getElementById('chapter-list');
    list.innerHTML = '';
   
    // Add "All Chapters" button
    const allBtn = document.createElement('button');
    allBtn.className = 'chapter-btn';
    allBtn.innerText = 'सबै अध्याय (All Chapters)';
    allBtn.onclick = () => startQuiz(category, 'All');
    list.appendChild(allBtn);

    if (chapters.length > 0) {
        chapters.forEach(chap => {
            const btn = document.createElement('button');
            btn.className = 'chapter-btn';
            btn.innerText = chap;
            btn.onclick = () => startQuiz(category, chap);
            list.appendChild(btn);
        });
    } else {
        const noData = document.createElement('p');
        noData.innerText = "अहिलेको लागि प्रश्न थपिँदैछ...";
        noData.style.color = "white";
        noData.style.textAlign = "center";
        list.appendChild(noData);
    }
   
    document.getElementById('chapter-title').innerText = category === 'class10' ? "Class 10 Chapters" : "Class 11 Chapters";
    showSection('chapter-screen');
}

function startQuiz(category, chapter) {
    let available = questionBank.filter(q => {
        if (category === 'mixed') return true;
        if (chapter === 'All') return q.category === category;
        return q.category === category && q.chapter === chapter;
    });

    if (available.length === 0) {
        alert("माफ गर्नुहोस्, यस विषयका प्रश्नहरू अहिले फेला परेनन्! कृपया अर्को छान्नुहोस्।");
        return;
    }

    // Shuffle and pick max 10
    currentQuestions = shuffleArray(available).slice(0, 10);
    currentQuestionIndex = 0;
    userAnswers = [];
   
    if (gameMode === '2p' && currentPlayer === 1) {
        player1Score = 0;
        score = 0;
    } else if (gameMode === '2p' && currentPlayer === 2) {
        player2Score = 0;
        score = 0;
    } else {
        score = 0;
    }

    document.getElementById('review-container').innerHTML = '';
    showSection('quiz-section');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        if (gameMode === '2p' && currentPlayer === 1) {
            player1Score = score;
            currentPlayer = 2;
            alert("Player 1 को सकियो! अब Player 2 को पालो। फोन पास गर्नुहोस्।");
            currentQuestionIndex = 0;
            startQuiz(currentQuestions[0].category, currentQuestions[0].chapter); // Restart for P2
            return;
        } else if (gameMode === '2p' && currentPlayer === 2) {
            player2Score = score;
            endQuizMultiplayer();
            return;
        } else {
            endQuiz();
            return;
        }
    }

    const q = currentQuestions[currentQuestionIndex];
    const playerName = gameMode === '2p' ? ` (Player ${currentPlayer})` : '';
    document.getElementById('question-counter').textContent = `प्रश्न ${currentQuestionIndex + 1}/${currentQuestions.length}${playerName}`;
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

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1200);
}

function endQuiz() {
    showSection('result-section');
    document.getElementById('singleplayer-result').style.display = 'block';
    document.getElementById('multiplayer-result').style.display = 'none';
    document.getElementById('final-score').textContent = score;
  
    let msg = score === currentQuestions.length ? "अद्भुत! Amazing! 🏆" :
              score >= (currentQuestions.length * 0.7) ? "धेरै राम्रो! Very Good! 👏" :
              score >= (currentQuestions.length * 0.4) ? "ठिकै छ! Not bad! 👍" :
              "फेरि प्रयास गर्नुहोस्! Try again! 💪";
    document.getElementById('score-message').textContent = msg;
}

function endQuizMultiplayer() {
    showSection('result-section');
    document.getElementById('singleplayer-result').style.display = 'none';
    document.getElementById('multiplayer-result').style.display = 'block';
   
    document.getElementById('p1-final-score').innerText = `👤 Player 1 Score: ${player1Score} / ${currentQuestions.length}`;
    document.getElementById('p2-final-score').innerText = `👤 Player 2 Score: ${player2Score} / ${currentQuestions.length}`;
   
    let winner = "";
    if (player1Score > player2Score) winner = "🏆 Player 1 विजयी भयो! 🏆";
    else if (player2Score > player1Score) winner = "🏆 Player 2 विजयी भयो! 🏆";
    else winner = "🤝 बराबर (Draw)! दुवै उत्कृष्ट! 🤝";
   
    document.getElementById('winner-text').innerText = winner;
}

if (reviewBtn) {
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
}

if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        currentPlayer = 1;
        score = 0;
        document.getElementById('review-container').innerHTML = '';
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

function setLanguage(lang) {
    // Language logic can be expanded here
    document.getElementById('lang-screen').classList.remove('active');
    appScreen.classList.add('active');
} 



