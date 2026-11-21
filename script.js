// Yak Quiz - Divine Logic
let questionBank = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 20;
let musicPlaying = false;
let gameMode = '1p';
let player1Score = 0, player2Score = 0, currentPlayer = 1;

// DOM Elements
const loginForm = document.getElementById('login-form');
const bgMusic = document.getElementById('bg-music');
const omSound = document.getElementById('om-sound');

// 1. Load Questions Smartly
function loadQuestions() {
    fetch('questions.json')
        .then(res => res.json())
        .then(data => {
            // Smart Fix: If chapter is missing, add "General" automatically
            questionBank = data.map(q => ({
                ...q,
                chapter: q.chapter || "General Questions"
            }));
            console.log("Loaded " + questionBank.length + " questions!");
        })
        .catch(err => {
            console.error(err);
            alert("प्रश्नहरू लोड हुन सकेन! कृपया questions.json जाँच गर्नुहोस्।");
        });
}

// 2. Divine Effects (Om Sound + Flowers)
function playDivineEffects() {
    omSound.volume = 0.5;
    omSound.play().catch(() => {});
    bgMusic.volume = 0.2;
    bgMusic.play().then(() => { musicPlaying = true; }).catch(() => {});
   
    // Flower Fall
    const container = document.getElementById('flower-container');
    const flowers = ['🌸', '🌺', '🌼', '🪷'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const f = document.createElement('div');
            f.className = 'flower';
            f.innerText = flowers[Math.floor(Math.random() * flowers.length)];
            f.style.left = Math.random() * 100 + 'vw';
            f.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(f);
            setTimeout(() => f.remove(), 5000);
        }, i * 150);
    }
}

// 3. Game Mode & Login
function setMode(mode, el) {
    gameMode = mode;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('access-name').value.trim();
        if (name.length >= 2) {
            document.getElementById('user-display-name').innerText = name;
            playDivineEffects();
            document.getElementById('login-screen').classList.remove('active');
            document.getElementById('lang-screen').classList.add('active');
            loadQuestions();
        }
    });
}

function setLanguage(lang) {
    document.getElementById('lang-screen').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');
}

// Music Toggle
document.getElementById('music-toggle').addEventListener('click', () => {
    if (musicPlaying) { bgMusic.pause(); musicPlaying = false; document.getElementById('music-icon').className = 'fas fa-volume-mute'; }
    else { bgMusic.play(); musicPlaying = true; document.getElementById('music-icon').className = 'fas fa-volume-up'; }
});

// Navigation
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('home-btn').style.display = (id === 'category-section') ? 'none' : 'block';
}

document.getElementById('home-btn').addEventListener('click', () => { currentPlayer = 1; showSection('category-section'); });

// 4. Category & Chapter Logic
function selectCategory(cat) {
    if (cat === 'mixed') {
        startQuiz('mixed', 'All');
        return;
    }

    // Find unique chapters for this category
    const chapters = [...new Set(questionBank.filter(q => q.category === cat).map(q => q.chapter))];
   
    if (chapters.length <= 1) {
        // If only 1 chapter or no chapters, start directly
        startQuiz(cat, chapters[0] || 'General Questions');
    } else {
        // Show chapter screen
        const list = document.getElementById('chapter-list');
        list.innerHTML = '';
        document.getElementById('chapter-title').innerText = cat.replace('class', 'Class ') + ' Chapters';
       
        // Add "All" button
        const allBtn = document.createElement('button');
        allBtn.className = 'chapter-btn';
        allBtn.innerText = 'सबै प्रश्नहरू (All)';
        allBtn.onclick = () => startQuiz(cat, 'All');
        list.appendChild(allBtn);

        chapters.forEach(chap => {
            const btn = document.createElement('button');
            btn.className = 'chapter-btn';
            btn.innerText = chap;
            btn.onclick = () => startQuiz(cat, chap);
            list.appendChild(btn);
        });
        showSection('chapter-screen');
    }
}

// 5. Quiz Logic
function startQuiz(category, chapter) {
    let available = questionBank.filter(q => {
        if (category === 'mixed') return true;
        if (chapter === 'All') return q.category === category;
        return q.category === category && q.chapter === chapter;
    });

    if (available.length === 0) {
        alert("यस विषयमा प्रश्न फेला परेन! कृपया अर्को छान्नुहोस्।");
        return;
    }

    currentQuestions = available.sort(() => 0.5 - Math.random()).slice(0, 10);
    currentQuestionIndex = 0;
    userAnswers = [];
   
    if (gameMode === '2p' && currentPlayer === 1) player1Score = 0;
    else if (gameMode === '2p' && currentPlayer === 2) player2Score = 0;
    else score = 0;

    showSection('quiz-section');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        if (gameMode === '2p' && currentPlayer === 1) {
            player1Score = score;
            currentPlayer = 2;
            alert("Player 1 सकियो! अब Player 2 को पालो।");
            currentQuestionIndex = 0;
            startQuiz(currentQuestions[0].category, currentQuestions[0].chapter);
            return;
        } else if (gameMode === '2p' && currentPlayer === 2) {
            player2Score = score;
            showMultiplayerResult();
            return;
        } else {
            showResult();
            return;
        }
    }

    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('question-counter').innerText = `प्रश्न ${currentQuestionIndex + 1}/${currentQuestions.length}`;
    document.getElementById('question-text').innerText = q.question;
   
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectOption(i, btn);
        container.appendChild(btn);
    });
    startTimer();
}

function startTimer() {
    timeLeft = 20;
    document.getElementById('time-left').innerText = timeLeft;
    document.getElementById('timer-progress').style.width = '100%';
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = timeLeft;
        document.getElementById('timer-progress').style.width = (timeLeft/20*100) + '%';
        if (timeLeft <= 0) { clearInterval(timerInterval); selectOption(-1, null); }
    }, 1000);
}

function selectOption(index, btn) {
    clearInterval(timerInterval);
    const q = currentQuestions[currentQuestionIndex];
    const isCorrect = index === q.answer;
    if (isCorrect) score++;

    userAnswers.push({ q: q.question, user: index === -1 ? 'समय सकियो' : q.options[index], correct: q.options[q.answer], isCorrect });

    const btns = document.querySelectorAll('.option-btn');
    if (index !== -1) btns[index].classList.add(isCorrect ? 'correct' : 'wrong');
    btns[q.answer].classList.add('correct');
    btns.forEach(b => b.disabled = true);

    setTimeout(() => { currentQuestionIndex++; loadQuestion(); }, 1500);
}

function showResult() {
    showSection('result-section');
    document.getElementById('singleplayer-result').style.display = 'block';
    document.getElementById('multiplayer-result').style.display = 'none';
    document.getElementById('final-score').innerText = score;
    document.getElementById('score-message').innerText = score >= 7 ? "उत्कृष्ट! 🏆" : score >= 4 ? "राम्रो! 👍" : "अझै प्रयास गर्नुहोस्! 💪";
}

function showMultiplayerResult() {
    showSection('result-section');
    document.getElementById('singleplayer-result').style.display = 'none';
    document.getElementById('multiplayer-result').style.display = 'block';
    document.getElementById('p1-final-score').innerText = `Player 1: ${player1Score}`;
    document.getElementById('p2-final-score').innerText = `Player 2: ${player2Score}`;
    document.getElementById('winner-text').innerText = player1Score > player2Score ? "Player 1 विजयी! 🏆" : player2Score > player1Score ? "Player 2 विजयी! 🏆" : "बराबर! 🤝";
}

// Review & Restart
document.getElementById('review-btn').addEventListener('click', () => {
    const c = document.getElementById('review-container');
    if (c.innerHTML === '') {
        c.innerHTML = userAnswers.map((a, i) => `
            <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:8px; margin-bottom:8px; border-left: 4px solid ${a.isCorrect?'var(--success)':'var(--danger)'}">
                <strong>${i+1}. ${a.q}</strong><br>
                <span style="color:${a.isCorrect?'var(--success)':'var(--danger)'}">तपाईं: ${a.user}</span><br>
                ${!a.isCorrect ? `<span style="color:var(--success)">सही: ${a.correct}</span>` : ''}
            </div>
        `).join('');
    } else { c.innerHTML = ''; }
});

document.getElementById('restart-btn').addEventListener('click', () => {
    currentPlayer = 1;
    document.getElementById('review-container').innerHTML = '';
    showSection('category-section');
}); 



