// Yak Pro Max Quiz - Complete Logic
// Developed by Lokraj Awasthi

// ===== STATE VARIABLES =====
let allQuestions = [];
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;
let userAnswers = [];
let userName = "";
let gameMode = '1p';
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let musicPlaying = false;

// ===== DOM ELEMENTS =====
const loginForm = document.getElementById('login-form');
const bgMusic = document.getElementById('bg-music');
const omSound = document.getElementById('om-sound');

// ===== LOAD QUESTIONS FROM JSON =====
function loadQuestions() {
    fetch('questions.json')
        .then(res => res.json())
        .then(data => {
            allQuestions = data.map(q => ({
                ...q,
                chapter: q.chapter || "General"
            }));
            console.log("Loaded " + allQuestions.length + " questions!");
        })
        .catch(err => {
            console.error("Error loading questions:", err);
            // Fallback sample questions
            allQuestions = [
                { id: 1, category: "class10", chapter: "Force", question: "SI unit of force is?", options: ["Joule", "Newton", "Watt", "Pascal"], answer: 1 },
                { id: 2, category: "class10", chapter: "Force", question: "गुरुत्वाकर्षण बल कसमा निर्भर गर्छ?", options: ["पिण्ड र दूरी", "मात्र पिण्ड", "मात्र दूरी", "आयतन"], answer: 0 },
                { id: 3, category: "gk", chapter: "Nepal", question: "Capital of Nepal?", options: ["Pokhara", "Kathmandu", "Lalitpur", "Bhaktapur"], answer: 1 }
            ];
        });
}

// ===== DIVINE EFFECTS =====
function playDivineEffects() {
    omSound.volume = 0.5;
    omSound.play().catch(() => {});
    bgMusic.volume = 0.2;
    bgMusic.play().then(() => { musicPlaying = true; }).catch(() => {});
    createFlowers();
}

function createFlowers() {
    const container = document.getElementById('flower-container');
    const flowers = ['🌸', '🌺', '🌼', '🪷'];
    for(let i=0; i<20; i++) {
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

// ===== GAME MODE =====
function setMode(mode, el) {
    gameMode = mode;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}

// ===== LOGIN =====
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        userName = document.getElementById('access-name').value.trim();
        if(userName.length >= 2) {
            document.getElementById('display-name').innerText = userName;
            playDivineEffects();
            loadQuestions();
            showScreen('lang-screen');
        } else {
            alert('कृपया आफ्नो नाम राख्नुहोस्!');
        }
    });
}

// ===== LANGUAGE =====
function setLanguage(lang) {
    showScreen('category-screen');
}

// ===== MUSIC TOGGLE =====
document.getElementById('music-toggle').addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
        document.getElementById('music-icon').className = 'fas fa-volume-mute';
    } else {
        bgMusic.play();
        musicPlaying = true;
        document.getElementById('music-icon').className = 'fas fa-volume-up';
    }
});

// ===== NAVIGATION =====
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// ===== CATEGORY SELECTION =====
function selectCategory(cat) {
    let filtered = cat === 'mixed' ? allQuestions : allQuestions.filter(q => q.category === cat);
   
    if(filtered.length === 0) {
        alert("यस विषयमा अहिले प्रश्नहरू छैनन्! कृपया अर्को विषय छान्नुहोस्।");
        return;
    }

    const chapters = [...new Set(filtered.map(q => q.chapter || "General"))];
   
    if(chapters.length <= 1) {
        startQuiz(filtered);
    } else {
        document.getElementById('chapter-title').innerText = `${cat.replace('class', 'Class ')} - Chapters`;
        const list = document.getElementById('chapter-list');
        list.innerHTML = '';
       
        const allBtn = document.createElement('button');
        allBtn.className = 'chapter-btn';
        allBtn.innerText = 'सबै अध्याय (All Chapters)';
        allBtn.onclick = () => startQuiz(filtered);
        list.appendChild(allBtn);

        chapters.forEach(chap => {
            const btn = document.createElement('button');
            btn.className = 'chapter-btn';
            btn.innerText = chap;
            btn.onclick = () => startQuiz(filtered.filter(q => (q.chapter || "General") === chap));
            list.appendChild(btn);
        });
        showScreen('chapter-screen');
    }
}

// ===== QUIZ LOGIC =====
function startQuiz(questions) {
    currentQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    currentIndex = 0;
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
    document.getElementById('review-container').classList.add('hidden');
    document.getElementById('toggle-review-btn').innerText = 'उत्तर हेर्नुहोस्';
   
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    if(currentIndex >= currentQuestions.length) {
        if (gameMode === '2p' && currentPlayer === 1) {
            player1Score = score;
            currentPlayer = 2;
            alert("Player 1 सकियो! अब Player 2 को पालो।");
            currentIndex = 0;
            startQuiz(currentQuestions);
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
   
    const q = currentQuestions[currentIndex];
    document.getElementById('question-counter').innerText = `प्रश्न ${currentIndex + 1}/${currentQuestions.length}`;
    document.getElementById('question-text').innerText = q.question;
   
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i, btn);
        container.appendChild(btn);
    });
    startTimer();
}

function startTimer() {
    timeLeft = 20;
    document.getElementById('time-left').innerText = timeLeft;
    document.getElementById('timer-progress').style.width = '100%';
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = timeLeft;
        document.getElementById('timer-progress').style.width = (timeLeft/20*100) + '%';
        if(timeLeft <= 0) { clearInterval(timer); checkAnswer(-1, null); }
    }, 1000);
}

function checkAnswer(selected, btn) {
    clearInterval(timer);
    const q = currentQuestions[currentIndex];
    const isCorrect = selected === q.answer;
    if(isCorrect) score++;

    userAnswers.push({
        q: q.question,
        user: selected === -1 ? 'समय सकियो' : q.options[selected],
        correct: q.options[q.answer],
        isCorrect
    });

    const btns = document.querySelectorAll('.option-btn');
    if(selected !== -1) btn.classList.add(isCorrect ? 'correct' : 'wrong');
    btns[q.answer].classList.add('correct');
    btns.forEach(b => b.disabled = true);

    setTimeout(() => { currentIndex++; loadQuestion(); }, 1500);
}

// ===== RESULT =====
function showResult() {
    showScreen('result-screen');
    document.getElementById('singleplayer-result').style.display = 'block';
    document.getElementById('multiplayer-result').style.display = 'none';
    document.getElementById('final-score').innerText = score;
    document.getElementById('total-q').innerText = `/ ${currentQuestions.length}`;
   
    const percentage = (score / currentQuestions.length) * 100;
    let msg = percentage >= 80 ? "अद्भुत! Excellent! 🏆" : percentage >= 50 ? "राम्रो! Good Job! 👍" : "अझै मेहनत गर्नुहोस्! 💪";
    document.getElementById('score-message').innerText = msg;

    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = userAnswers.map((a, i) => `
        <div class="review-item ${a.isCorrect ? 'correct' : 'wrong'}">
            <strong>${i+1}. ${a.q}</strong><br>
            <span style="color:${a.isCorrect ? '#00E676' : '#FF5252'}">तपाईं: ${a.user}</span><br>
            ${!a.isCorrect ? `<span style="color:#00E676">सही: ${a.correct}</span>` : ''}
        </div>
    `).join('');
}

function showMultiplayerResult() {
    showScreen('result-screen');
    document.getElementById('singleplayer-result').style.display = 'none';
    document.getElementById('multiplayer-result').style.display = 'block';
    document.getElementById('p1-final-score').innerText = `Player 1: ${player1Score}`;
    document.getElementById('p2-final-score').innerText = `Player 2: ${player2Score}`;
    document.getElementById('winner-text').innerText = player1Score > player2Score ? "Player 1 विजयी! 🏆" : player2Score > player1Score ? "Player 2 विजयी! 🏆" : "बराबर! 🤝";
}

function toggleReview() {
    const rc = document.getElementById('review-container');
    const btn = document.getElementById('toggle-review-btn');
    if(rc.classList.contains('hidden')) {
        rc.classList.remove('hidden');
        btn.innerText = 'लुकाउनुहोस्';
    } else {
        rc.classList.add('hidden');
        btn.innerText = 'उत्तर हेर्नुहोस्';
    }
}

function quitQuiz() {
    clearInterval(timer);
    if(confirm("के तपाईं क्विज छोड्न चाहनुहुन्छ?")) {
        currentPlayer = 1;
        showScreen('category-screen');
    }
}

// Initialize
loadQuestions(); 
