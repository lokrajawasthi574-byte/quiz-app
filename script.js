/**
* ==========================================================================
* AWASTHI QUIZ - APPLICATION ENGINE SYSTEM (PART 3)
* Creator & Owner: Lok Raj Awasthi
* Architectural Framework: Dynamic Multi-Module Front-End Prototype
* ==========================================================================
*/

// --- Comprehensive Simulated Database (Scalable Architecture Design) ---
const AWASTHI_QUIZ_DATABASE = {
    classes: {
        class10: {
            science: [
                {
                    id: "c10_sci_ch1_1",
                    question: "हाम्रो ब्रह्माण्डमा गुरुत्वाकर्षण बल (Gravitational Force) वस्तुको पिण्ड र दूरीमा कसरी निर्भर गर्दछ?",
                    options: [
                        "पिण्डको गुणनफलसँग समानुपातिक र दूरीको वर्गसँग व्युत्क्रमानुपातिक",
                        "पिण्डको गुणनफलसँग व्युत्क्रमानुपातिक र दूरीसँग समानुपातिक",
                        "पिण्ड र दूरी दुवैसँग सधैं समानुपातिक",
                        "माथिका कुनै पनि भनाइ सत्य छैनन्"
                    ],
                    correct: 0,
                    explanation: "न्युटनको गुरुत्वाकर्षण नियम अनुसार, बल वस्तुहरूको पिण्डको गुणनफलसँग समानुपातिक (Directly Proportional) र तिनीहरूको केन्द्रबीचको दूरीको वर्गसँग व्युत्क्रमानुपातिक (Inversely Proportional) हुन्छ।",
                    difficulty: "medium"
                },
                {
                    id: "c10_sci_ch1_2",
                    question: "यदि पृथ्वीको अर्धव्यास (Radius) लाई आधा बनाउने हो भने यसको सतहमा गुरुत्वप्रवेग (g) को मान कति गुणाले परिवर्तन हुन्छ?",
                    options: ["२ गुणा बढ्छ", "४ गुणा बढ्छ", "२ गुणा घट्छ", "समान रहन्छ"],
                    correct: 1,
                    explanation: "गुरुत्वप्रवेग g = GM/R² सूत्र अनुसार, अर्धव्यास (R) आधा गर्दा R² को मान १/४ हुन्छ, जसले गर्दा g को मान ४ गुणाले वृद्धि हुन जान्छ।",
                    difficulty: "hard"
                }
            ],
            computer: [
                {
                    id: "c10_comp_ch1_1",
                    question: "कम्प्युटर नेटवर्किङमा प्रयोग हुने 'Topology' ले मुख्यतया केलाई बुझाउँछ?",
                    options: [
                        "नेटवर्कमा कम्प्युटरहरूको भौतिक वा तार्किक व्यवस्थापन (Layout)",
                        "इन्टरनेट चलाउने एक विशेष सफ्टवेयर",
                        "कम्प्युटर भाइरस नष्ट गर्ने एउटा विधि",
                        "डाटा सेभ गर्ने हार्डडिस्कको प्रकार"
                    ],
                    correct: 0,
                    explanation: "नेटवर्क टोपलोजी (Network Topology) भन्नाले नेटवर्कमा रहेका विभिन्न नोड वा कम्प्युटरहरू एकआपसमा जोडिने भौतिक वा तार्किक ढाँचा (Structure/Layout) लाई बुझाउँछ।",
                    difficulty: "easy"
                }
            ],
            optmath: []
        },
        class11: {
            physics: [
                {
                    id: "c11_phy_ch1_1",
                    question: "Which of the following dimensions correctly represents the Universal Gravitational Constant (G)?",
                    options: ["[M⁻¹ L³ T⁻²]", "[M¹ L² T⁻²]", "[M⁻² L³ T⁻¹]", "[M⁻¹ L² T⁻³]"],
                    correct: 0,
                    explanation: "Since F = G*m1*m2/r², we have G = F*r²/(m1*m2). Substituting dimensions: [M L T⁻²] * [L²] / [M²] = [M⁻¹ L³ T⁻²].",
                    difficulty: "hard"
                }
            ],
            chemistry: [],
            mathematics: [],
            computer: []
        }
    },
    generalKnowledge: {
        nepal_history: [
            {
                id: "gk_nh_1",
                question: "नेपालको इतिहासमा 'जनताका संकास्पद राजा' भनेर कुन मल्ल राजालाई चिनिन्छ?",
                options: ["प्रताप मल्ल", "लक्ष्मीनरसिंह मल्ल", "योगनरेन्द्र मल्ल", "महेन्द्र मल्ल"],
                correct: 2,
                explanation: "राजा योगनरेन्द्र मल्ललाई जनताले विभिन्न कालखण्डमा शंकास्पद दृष्टिकोणले हेरेका र䀘 मृत्युको प्रसङ्ग पनि रहस्यमयी भएकाले इतिहासमा उनलाई सो नामले स्मरण गरिन्छ।",
                difficulty: "medium"
            }
        ],
        nepal_geography: [
            {
                id: "gk_ng_1",
                question: "नेपालको सबैभन्दा गहिरो ताल रारा ताल समुद्र सतहबाट कति उचाइमा अवस्थित छ?",
                options: ["२,९९० मिटर", "३,२०० मिटर", "२,५०० मिटर", "१,८०० मिटर"],
                correct: 0,
                explanation: "नेपालको मुगु जिल्लामा अवस्थित पर्यटकीय तथा प्राकृतिक रूपले महत्त्वपूर्ण रारा ताल समुद्र सतहबाट २,९९० मिटरको उचाइमा रहेको छ।",
                difficulty: "easy"
            }
        ]
    },
    lokSewa: {
        constitution: [
            {
                id: "ls_con_1",
                question: "नेपालको वर्तमान संविधान (२०७२) मा कति वटा भाग, धारा र अनुसूचीहरू रहेका छन्?",
                options: [
                    "३५ भाग, ३०८ धारा, ९ अनुसूची",
                    "३० भाग, ३०० धारा, ७ अनुसूची",
                    "३२ भाग, ३१५ धारा, ८ अनुसूची",
                    "३८ भाग, ३२५ धारा, १० अनुसूची"
                ],
                correct: 0,
                explanation: "नेपालको संविधान (२०७२) असोज ३ गते जारी भएको हो, जसमा ३५ भाग, ३०८ धारा र ९ वटा अनुसूचीहरू समावेश गरिएका छन्।",
                difficulty: "easy"
            }
        ]
    }
};

// --- Application Core Global State ---
let APP_STATE = {
    currentUser: null,
    activeView: "home",
    isAudioEnabled: true,
    activeTheme: "dark",
   
    // Active Quiz Engine Runtime Data
    quizRuntime: {
        currentPool: [],
        currentIndex: 0,
        score: 0,
        xpEarned: 0,
        correctCount: 0,
        incorrectCount: 0,
        skippedCount: 0,
        timerInterval: null,
        timeLeft: 30,
        startTime: null,
        totalTimeSpent: 0,
        userAnswers: [],
        bookmarkedQuestions: new Set(),
        mistakeBook: new Set()
    },
   
    // User Metrics System
    userProfile: {
        username: "Guest User",
        level: 1,
        xp: 120,
        points: 450,
        streak: 3,
        history: []
    }
};

// --- Audio Asset Drivers ---
const AudioEngine = {
    playTick: () => { },
    playAlarm: () => {
        if (!APP_STATE.isAudioEnabled) return;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    },
    playFeedback: (isCorrect) => {
        if (!APP_STATE.isAudioEnabled) return;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(isCorrect ? 880 : 220, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    }
};

// --- Initialization & Document DOM Setup ---
document.addEventListener("DOMContentLoaded", () => {
    initViewRouter();
    setupCoreInteractions();
    loadDemoStatistics();
});

// --- View Router & Screen Switching Logic ---
function initViewRouter() {
    document.querySelectorAll(".nav-link, .user-profile-trigger, .footer-links-col a").forEach(element => {
        element.addEventListener("click", (e) => {
            const targetView = element.getAttribute("data-view");
            if (targetView) {
                e.preventDefault();
                switchView(targetView);
            }
        });
    });
}

function switchView(viewId) {
    if (!APP_STATE.currentUser && (viewId === 'dashboard' || viewId === 'admin')) {
        viewId = 'auth';
    }

    APP_STATE.activeView = viewId;
   
    document.querySelectorAll(".app-view").forEach(view => {
        view.classList.remove("active-view");
    });
   
    const targetNode = document.getElementById(`${viewId}-view`);
    if (targetNode) {
        targetNode.classList.add("active-view");
        window.scrollTo(0, 0);
    }
   
    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("data-view") === viewId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    if (viewId === 'dashboard') populateDashboardUI();
    if (viewId === 'leaderboard') renderLeaderboardData('global');
}

// --- Interaction Handlers Setup ---
function setupCoreInteractions() {
    // 1. Entrance Welcome Screen Dismissal
    const enterBtn = document.getElementById("dismiss-welcome-btn");
    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            const overlay = document.getElementById("welcome-overlay");
            const mainApp = document.getElementById("main-app-interface");
           
            overlay.style.opacity = "0";
            overlay.style.visibility = "hidden";
            mainApp.style.display = "block";
            setTimeout(() => mainApp.style.opacity = "1", 50);
            switchView("home");
        });
    }

    // 2. Authentication Flow Handling
    const loginForm = document.getElementById("auth-form-element");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("auth-email-input").value;
           
            APP_STATE.currentUser = { email: email };
            APP_STATE.userProfile.username = email.split('@')[0];
           
            document.getElementById("header-user-display-name").innerText = APP_STATE.userProfile.username;
            switchView("dashboard");
        });
    }

    // 3. Audio & Theme Toggle Control Switches
    document.getElementById("audio-toggle-btn").addEventListener("click", () => {
        APP_STATE.isAudioEnabled = !APP_STATE.isAudioEnabled;
        const icon = document.getElementById("audio-toggle-btn").querySelector("i");

 
