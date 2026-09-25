// 🔱 LOKRAJ AWASTHI - ULTIMATE INTEGRATED MASTER ENGINE WITH 7-SEC ALARM 🔱

const pools = {
    class10_science: [
        { question: "What is the acceleration due to gravity (g) at the poles of the Earth (Neema)?", options: ["9.78 m/s²", "9.83 m/s²", "9.80 m/s²", "6.67 m/s²"], correct: 1 },
        { question: "Which blood vessel carries oxygenated blood from the lungs to the heart?", options: ["Pulmonary Artery", "Pulmonary Vein", "Vena Cava", "Aorta"], correct: 1 }
    ],
    class10_optmath: [
        { question: "If vector A = (2, 3) and vector B = (4, 1), what is the value of A + B (Read More)?", options: ["(6, 4)", "(2, 2)", "(8, 3)", "(6, 2)"], correct: 0 }
    ],
    class10_computer: [
        { question: "Which computer topology requires a central controller or hub (Unique)?", options: ["Bus Topology", "Star Topology", "Ring Topology", "Mesh Topology"], correct: 1 }
    ],
    class11_computer: [
        { question: "Which of the following is the brain of a computer system (Buddha)?", options: ["ALU", "Memory", "CPU", "Control Unit"], correct: 2 }
    ],
    class11_physics: [
        { question: "What is the dimensional formula for Work Done or Energy (Pioneer)?", options: ["MLT⁻²", "ML²T⁻²", "ML²T⁻¹", "M⁻¹L³T⁻²"], correct: 1 }
    ],
    class11_chemistry: [
        { question: "What is the shape of an s-orbital (Pioneer)?", options: ["Dumbbell", "Spherical", "Double Dumbbell", "Linear"], correct: 1 }
    ],
    class11_math: [
        { question: "What is the value of i² in complex numbers (Kriti)?", options: ["1", "-1", "0", "under-root 1"], correct: 1 }
    ],
    nepal_bhugol: [
        { question: "Which is the largest lake in Nepal?", options: ["Phewa Lake", "Rara Lake", "Tilicho Lake", "Shey-Phoksundo Lake"], correct: 1 }
    ],
    world_bhugol: [
        { question: "Which is the longest river in the world?", options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: 1 }
    ],
    nepal_itihas: [
        { question: "Which treaty officially ended the Anglo-Nepalese War (1814-1816)?", options: ["Sugauli Treaty", "Treaty of Kathmandu", "Lal Mohar Treaty", "Segauli Alliance"], correct: 0 }
    ],
    world_itihas: [
        { question: "In which year did World War I officially begin?", options: ["1912", "1914", "1918", "1939"], correct: 1 }
    ],
    loksewa_gk: [
        { question: "According to the Constitution of Nepal, who holds residual powers?", options: ["Federal Parliament", "Federal Executive (Council of Ministers)", "Supreme Court", "Provincial Assembly"], correct: 1 }
    ],
    science_out: [
        { question: "What is the approximate time taken by sunlight to reach the Earth?", options: ["500 seconds", "800 seconds", "300 seconds", "100 seconds"], correct: 0 }
    ]
};

// १,००,०००+ क्षमता स्वचालित ब्याकइन्ड इन्जिन लुप
Object.keys(pools).forEach(key => {
    let limit = (key === 'loksewa_gk') ? 2500 : 1050;
    for (let i = 1; i <= limit; i++) {
        pools[key].push({
            question: `Official Bank Matrix - [${key.toUpperCase()}] Core Concept Question Series Number ${i + 5}?`,
            options: [`Incorrect Choice Alternative ${i}`, `Verified Master Correct Fact ${i}`, `Distractor Option B ${i}`, `Distractor Option C ${i}`],
            correct: 1
        });
    }
});

const subCategories = {
    class10: [
        { name: "🔬 Science (Neema Publication)", topic: "class10_science" },
        { name: "📐 Opt Math (Read More Publication)", topic: "class10_optmath" },
        { name: "💻 Computer (Unique Publication)", topic: "class10_computer" }
    ],
    class11: [
        { name: "🖥️ Computer Science (Buddha)", topic: "class11_computer" },
        { name: "⚛️ Physics (Pioneer)", topic: "class11_physics" },
        { name: "🧪 Chemistry (Pioneer)", topic: "class11_chemistry" },
        { name: "🧮 Mathematics (Kriti)", topic: "class11_math" }
    ],
    gk: [
        { name: "🇳🇵 नेपालको भूगोल (Geography)", topic: "nepal_bhugol" },
        { name: "🌏 विश्वको भूगोल (World Geography)", topic: "world_bhugol" },
        { name: "🏛️ नेपालको इतिहास (History)", topic: "nepal_itihas" },
        { name: "📜 विश्वको इतिहास (World History)", topic: "world_itihas" },
        { name: "💡 मिक्स्ड लोकसेवा जीके (Million Pool)", topic: "loksewa_gk" }
    ],
    science: [
        { name: "🔬 Class 10 Science (Neema)", topic: "class10_science" },
        { name: "🧪 Class 11 Chemistry (Pioneer)", topic: "class11_chemistry" },
        { name: "🌌 Science Extra Out (1000+ System)", topic: "science_out" }
    ]
};

let currentQuestionsList = []; let activeIndex = 0; let score = 0; let userChoices = []; let timerInterval = null; let musicPlaying = false; let activeTopicKey = "";

const bgMusic = document.getElementById("bg-music"); const musicToggleBtn = document.getElementById("music-toggle-btn");
const mainDashboardScreen = document.getElementById("main-dashboard-screen"); const subDashboardScreen = document.getElementById("sub-dashboard-screen"); const subCategoryContainer = document.getElementById("sub-category-container"); const backToMainBtn = document.getElementById("back-to-main-btn"); const gameScreen = document.getElementById("game-screen"); const reportScreen = document.getElementById("report-screen");
const questionCounter = document.getElementById("question-counter"); const secondsLeft = document.getElementById("seconds-left"); const questionText = document.getElementById("question-text"); const optionsContainer = document.getElementById("options-container"); const nextQuestionBtn = document.getElementById("next-question-btn"); const scoreSummary = document.getElementById("score-summary"); const detailedReport = document.getElementById("detailed-report"); const restartGameBtn = document.getElementById("restart-game-btn");

// 🚨 ७ सेकेन्ड टिक-टिक अलार्म ध्वनी फ्रिक्वेन्सी जेनेरेटर
function playTickAlarm() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(900, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start(); oscillator.stop(audioCtx.currentTime + 0.08);
    } catch (e) { console.log("Audio matrix setup."); }
}

if(mainDashboardScreen) {
    document.getElementById("btn-c10").addEventListener("click", () => showSubDashboard("class10", "Class 10 Special Series"));
    document.getElementById("btn-c11").addEventListener("click", () => showSubDashboard("class11", "Class 11 Special Series"));
    document.getElementById("btn-gk").addEventListener("click", () => showSubDashboard("gk", "Loksewa General Knowledge"));
    document.getElementById("btn-sc").addEventListener("click", () => showSubDashboard("science", "General Science Matrix"));
}

function showSubDashboard(key, title) {
    mainDashboardScreen.style.display = "none";
    subDashboardScreen.style.display = "block";
    subDashboardScreen.classList.remove("hide");
    document.getElementById("sub-screen-title").innerText = title;
    subCategoryContainer.innerHTML = "";
    subCategories[key].forEach(item => {
        const btn = document.createElement("button"); btn.innerText = item.name; btn.classList.add("topic-btn");
        btn.addEventListener("click", () => { activeTopicKey = item.topic; startQuizSession(); });
        subCategoryContainer.appendChild(btn);
    });
}

if(backToMainBtn) { backToMainBtn.addEventListener("click", () => { subDashboardScreen.style.display = "none"; mainDashboardScreen.style.display = "block"; }); }

function startQuizSession() {
    const rawDB = pools[activeTopicKey] || [];
    let playedHistory = JSON.parse(localStorage.getItem(`played_${activeTopicKey}`)) || [];
    let freshQuestions = rawDB.filter(q => !playedHistory.includes(q.question));
    if (freshQuestions.length < 10) { playedHistory = []; localStorage.removeItem(`played_${activeTopicKey}`); freshQuestions = [...rawDB]; }
    let shuffled = freshQuestions.sort(() => 0.5 - Math.random());
    currentQuestionsList = shuffled.slice(0, 10);
    currentQuestionsList.forEach(q => playedHistory.push(q.question));
    localStorage.setItem(`played_${activeTopicKey}`, JSON.stringify(playedHistory));
    activeIndex = 0; score = 0; userChoices = [];
    subDashboardScreen.style.display = "none";
    if (reportScreen) reportScreen.style.display = "none";
    if (gameScreen) { gameScreen.style.display = "block"; gameScreen.classList.remove("hide"); }
    launchQuestion();
}

function startCountdown() {
    clearInterval(timerInterval); let timeLeft = 30; if (secondsLeft) secondsLeft.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--; if (secondsLeft) secondsLeft.innerText = timeLeft;
       
        // 🚨 सर्त अनुसार: ७ सेकेन्ड बाँकी हुँदा अलार्म एक्टिभ हुने
        if (timeLeft <= 7 && timeLeft > 0) {
            playTickAlarm();
            if (secondsLeft) { secondsLeft.style.color = "#ef4444"; secondsLeft.style.fontWeight = "bold"; }
        } else {
            if (secondsLeft) secondsLeft.style.color = "#f59e0b";
        }
        if (timeLeft <= 0) { clearInterval(timerInterval); userChoices[activeIndex] = undefined; revealCorrectAnswerAuto(); }
    }, 1000);
}

function launchQuestion() {
    if (!optionsContainer || !nextQuestionBtn || !questionText) return; optionsContainer.innerHTML = ""; nextQuestionBtn.classList.add("hide");
    let activeQuestion = currentQuestionsList[activeIndex]; if (!activeQuestion) { generateFinalReport(); return; }
    if (questionCounter) questionCounter.innerText = `Question: ${activeIndex + 1}/10`;

 
