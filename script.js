/**
* Awasthi Quiz - Core Application Script
* Creator & Owner: Lok Raj Awasthi
*/

// ==========================================
// 1. EXTENSIBLE SCALABLE QUESTION BANK DATABASE STRUCTURE
// ==========================================
// यहाँ पछि हजारौँ/लाखौँ प्रश्नहरू सजिलै थप्न सकिन्छ।
const QuestionBank = {
    class10_science: [
        { q: "बल (Force) को SI एकाइ के हो?", o: ["Newton", "Pascal", "Joule", "Watt"], a: 0, e: "बलको SI एकाइ न्यूटन (Newton) हो।" },
        { q: "कुन तत्वको रासायनिक संकेत 'O' हो?", o: ["Gold", "Oxygen", "Osmium", "Iron"], a: 1, e: "Oxygen लाई आवर्त तालिकामा 'O' संकेतले जनाइन्छ।" },
        { q: "प्रकाश एक माध्यमबाट अर्को माध्यममा जाँदा बाङ्गिने प्रक्रियालाई के भनिन्छ?", o: ["Reflection", "Refraction", "Dispersion", "Absorption"], a: 1, e: "प्रकाशको गतिमा परिवर्तन आउने हुनाले Refraction (अमर्तन) हुन्छ।" }
    ],
    class10_computer: [
        { q: "तलका मध्ये कुन अपरेटिङ सिस्टम हो?", o: ["Windows", "MS Word", "Excel", "Google Chrome"], a: 0, e: "Windows एक लोकप्रिय सिस्टम सफ्टवेयर वा अपरेटिङ सिस्टम हो।" },
        { q: "Decimal संख्या 5 को Binary मान कति हुन्छ?", o: ["100", "101", "110", "111"], a: 1, e: "5 लाई बाइनरीमा परिवर्तन गर्दा 101 हुन्छ।" }
    ],
    class10_optmath: [
        { q: "यदि म्याट्रिक्स A को अर्डर 2x3 र B को 3x2 छ भने, म्याट्रिक्स AB को अर्डर कति हुन्छ?", o: ["2x2", "3x3", "2x3", "3x2"], a: 0, e: "गुणन गर्दा पहिलोको लहर र दोस्रोको स्तम्भ बाँकी रही 2x2 अर्डर बन्छ।" }
    ],
    class11_physics: [
        { q: "कार्य (Work Done) को आयामी सूत्र (Dimensional Formula) के हो?", o: ["MLT⁻²", "ML²T⁻²", "MLT⁻¹", "ML²T⁻¹"], a: 1, e: "Work = Force x Distance = [MLT⁻²] * [L] = [ML²T⁻²] हुन्छ।" }
    ],
    loksewa_gk: [
        { q: "प्रसिद्ध न्यातपोल मन्दिर कसले निर्माण गरेका हुन्?", o: ["प्रताप मल्ल", "भूपतीन्द्र मल्ल", "जयस्थिति मल्ल", "अंशुवर्मा"], a: 1, e: "भक्तपुरको पाँचतले न्यातपोल मन्दिर राजा भूपतीन्द्र मल्लले बनाएका हुन्।" },
        { q: "नेपालको सबैभन्दा गहिरो ताल कुन हो?", o: ["रारा ताल", "फेवा ताल", "शे-फोक्सुण्डो ताल", "तिलिचो ताल"], a: 2, e: "शे-फोक्सुण्डो ताल नेपालको सबैभन्दा गहिरो ताल मानिन्छ।" }
    ]
};

// यदि कुनै विधामा प्रश्न नभएमा वा खाली भएमा सुरक्षित राख्न ब्याकअप प्रश्न प्रणाली
function getQuestionsCategory(categoryKey) {
    if (QuestionBank[categoryKey] && QuestionBank[categoryKey].length > 0) {
        return QuestionBank[categoryKey];
    }
    return [
        { q: "Awasthi Quiz को Creator र Owner को हुनुहुन्छ?", o: ["Lok Raj Awasthi", "Ram Shrestha", "Hari Awasthi", "None"], a: 0, e: "Awasthi Quiz को सम्पूर्ण स्वामित्व लोक राज अवस्थीसँग रहेको छ।" },
        { q: "क्विज खेल्दा प्रति प्रश्न कति समय उपलब्ध हुन्छ?", o: ["10s", "20s", "30s", "45s"], a: 2, e: "प्रत्येक प्रश्न मिलाउनका लागि ३० सेकेन्डको समय दिइन्छ।" }
    ];
}

// ==========================================
// 2. STATE MANAGEMENT VARIABLES
// ==========================================
let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 30;
let isSoundEnabled = true;
let activeCategoryKey = "";

// Progress Analytics
let quizStats = { total: 0, correct: 0, incorrect: 0, skipped: 0 };
let mistakeQuestionsList = [];
let isMistakeModeActive = false;

// ==========================================
// 3. SOUND EFFECTS GENERATOR (Web Audio API)
// ==========================================
// बाहिरी अडियो फाइल नचाहिने गरी ब्राउजरबाटै चेतावनी र दायाँ/बायाँ उत्तरको बीप साउन्ड सिर्जना गर्छ
function playTone(frequency, duration, type = "sine") {
    if (!isSoundEnabled) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) { console.log("Audio API issue."); }
}

// ==========================================
// 4. SCREEN ROUTER CONTROL
// ==========================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'flex-active', 'hidden'));
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
   
    const target = document.getElementById(screenId);
    if(screenId === "welcome-screen" || screenId === "auth-screen") {
        target.classList.add('active');
        document.getElementById('main-header').classList.add('hidden');
    } else {
        target.classList.add('flex-active');
        document.getElementById('main-header').classList.remove('hidden');
    }
}

// ==========================================
// 5. INTERACTIVE EVENT HANDLERS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
   
    // Welcome Screen Button Trigger
    document.getElementById("btn-get-started").addEventListener("click", () => {
        showScreen("auth-screen");
    });

    // Login/Register Form Switcher
    document.getElementById("tab-login").addEventListener("click", () => {
        document.getElementById("tab-login").classList.add("active");
        document.getElementById("tab-register").classList.remove("active");
        document.getElementById("form-login").classList.add("active");
        document.getElementById("form-register").classList.remove("active");
    });

    document.getElementById("tab-register").addEventListener("click", () => {
        document.getElementById("tab-register").classList.add("active");
        document.getElementById("tab-login").classList.remove("active");
        document.getElementById("form-register").classList.add("active");
        document.getElementById("form-login").classList.remove("active");
    });

    // Form Submissions Simulation
    document.getElementById("form-login").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        document.getElementById("user-display-email").innerText = email.split('@')[0];
        showScreen("dashboard-screen");
    });

    document.getElementById("form-register").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("खाता सफलतापूर्वक सिर्जना भयो!");
        const email = document.getElementById("register-email").value;
        document.getElementById("user-display-email").innerText = email.split('@')[0];
        showScreen("dashboard-screen");
    });

    // Navbar Controls logic
    document.getElementById("btn-toggle-theme").addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        document.getElementById("btn-toggle-theme").innerHTML = nextTheme === "dark" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    document.getElementById("btn-toggle-sound").addEventListener("click", () => {
        isSoundEnabled = !isSoundEnabled;
        document.getElementById("btn-toggle-sound").innerHTML = isSoundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    });

    document.getElementById("btn-logout").addEventListener("click", () => {
        showScreen("welcome-screen");
    });

    // Skip/Next Handle
    document.getElementById("btn-skip").addEventListener("click", () => {
        clearInterval(timerInterval);
        quizStats.skipped++;
        goToNextQuestion();
    });

    document.getElementById("btn-retry-mistakes").addEventListener("click", () => {
        if(mistakeQuestionsList.length === 0) {
            alert("यो गेममा कुनै पनि प्रश्न गलत भएको छैन! राम्रो काम।");
            return;
        }
        isMistakeModeActive = true;
        currentQuizQuestions = [...mistakeQuestionsList];
        startQuizSession();
    });
});

// ==========================================
// 6. CORE QUIZ FLOW MECHANICS
// ==========================================
function startQuizFlow(categoryKey) {
    activeCategoryKey = categoryKey;
    isMistakeModeActive = false;
   
    let rawQuestions = getQuestionsCategory(categoryKey);
   
    // र्‍यान्डम प्रश्न छनोट (Shuffle) गर्ने र बढीमा १० वटा मात्र निकाल्ने व्यवस्था
    currentQuizQuestions = rawQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
   
    startQuizSession();
}

function startQuizSession() {
    currentQuestionIndex = 0;
    score = 0;
    quizStats = { total: currentQuizQuestions.length, correct: 0, incorrect: 0, skipped: 0 };
    if(!isMistakeModeActive) mistakeQuestionsList = [];
   
    document.getElementById("quiz-category-title").innerText = activeCategoryKey.toUpperCase().replace("_", " ");
    showScreen("quiz-arena");
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerInterval);
    document.getElementById("explanation-panel").classList.add("hidden");
    document.getElementById("btn-skip").innerText = "Skip / Next";
   
    let currentQ = currentQuizQuestions[currentQuestionIndex];
    document.getElementById("current-q-num").innerText = `Question ${currentQuestionIndex + 1}/${currentQuizQuestions.length}`;
    document.getElementById("question-text").innerText = currentQ.q;
   
    // Progress Bar Update
    let progressPct = ((currentQuestionIndex) / currentQuizQuestions.length) * 100;
    document.getElementById("quiz-progress-bar").style.width = `${progressPct}%`;

    // Render 4 answer Options
    const optContainer = document.getElementById("options-container");
    optContainer.innerHTML = "";
   
    currentQ.o.forEach((optionText, idx) => {
        const btn = document.createElement("button");

 
