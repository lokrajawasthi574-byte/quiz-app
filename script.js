// Database definition for UI subject navigation mapping
const database = {
    "Class 10": {
        "Science": ["Force", "Pressure", "Energy", "Light"],
        "Computer": ["Networking", "Cyber Security", "C Language"],
        "Optional Math": ["Matrices", "Trigonometry", "Vectors"]
    },
    "Class 11": {
        "Physics": ["Mechanics", "Heat & Thermodynamics", "Modern Physics"],
        "Chemistry": ["Physical Chemistry", "Organic Chemistry"],
        "Maths": ["Set and Logic", "Algebra", "Calculus"],
        "Computer": ["Number System", "Logic Gates", "C Programming"]
    }
};

// Real Premium Bilingual Question Bank (English / नेपाली)
const realQuestionsPool = {
    // Class 10 Science - Force
    "Class_10_Science_Force": [
        {
            id: "c10_sc_f1",
            question: "What is the correct value of the Universal Gravitational Constant (G)? / विश्वव्यापी गुरुत्वाकर्षण अचर (G) को सही मान कति हो?",
            options: ["6.67 x 10^-11 Nm²/kg²", "6.67 x 10^11 Nm²/kg²", "9.81 m/s²", "6.67 x 10^-9 Nm²/kg²"],
            correct: 0
        },
        {
            id: "c10_sc_f2",
            question: "Where is the value of acceleration due to gravity (g) maximum on Earth? / पृथ्वीको कुन स्थानमा गुरुत्वप्रवेग (g) को मान सबैभन्दा बढी हुन्छ?",
            options: ["At the Equator / भूमध्यरेखामा", "At the Poles / ध्रुवहरूमा", "At the Center of Earth / पृथ्वीको केन्द्रमा", "At Mount Everest peak / सगरमाथाको चुचुरोमा"],
            correct: 1
        },
        {
            id: "c10_sc_f3",
            question: "What happens to the gravitational force between two bodies if the distance between them is doubled? / दुई पिण्डबिचको दुरी दोब्बर बनाउँदा गुरुत्वाकर्षण बलमा के असर पर्छ?",
            options: ["It doubles / दोब्बर हुन्छ", "It becomes half / आधा हुन्छ", "It decreases by 4 times / ४ गुणाले घट्छ", "It remains unchanged / उस्तै रहन्छ"],
            correct: 2
        }
    ],
    // Class 11 Physics - Mechanics
    "Class_11_Physics_Mechanics": [
        {
            id: "c11_ph_m1",
            question: "What is the dimensional formula for linear momentum? / रेखीय संवेग (Linear Momentum) को विमीय सुत्र (Dimensional Formula) के हो?",
            options: ["M L T^-2", "M L² T^-2", "M L T^-1", "M L^-1 T^-1"],
            correct: 2
        },
        {
            id: "c11_ph_m2",
            question: "Rocket propulsion works on the principle of conservation of which quantity? / रकेट प्रक्षेपण कुन परिमाणको संरक्षणको सिद्धान्तमा आधारित छ?",
            options: ["Mass / पिण्ड", "Kinetic Energy / गतिशक्ति", "Angular Momentum / कोणीय संवेग", "Linear Momentum / रेखीय संवेग"],
            correct: 3
        }
    ],
    // Lok Sewa General Knowledge (GK) Premium Bilingual Bank
    "GK_All_General_Knowledge": [
        {
            id: "gk_real_1",
            question: "According to the joint measurement of Nepal and China, what is the official height of Mount Everest? / नेपाल र चीनको संयुक्त मापन अनुसार सगरमाथाको आधिकारिक उचाइ कति हो?",
            options: ["8848.48 meters", "8848.86 meters", "8850.00 meters", "8844.43 meters"],
            correct: 1
        },
        {
            id: "gk_real_2",
            question: "When was the current Constitution of Nepal promulgated? / नेपालको वर्तमान संविधान कहिले जारी भएको हो?",
            options: ["2072 Ashwin 3 / २०७२ असोज ३ गते", "2072 Bhadra 25 / २०७२ भदौ २५ गते", "2073 Ashwin 3 / २०७३ असोज ३ गते", "2071 Magh 5 / २०७१ माघ ५ गते"],
            correct: 0
        },
        {
            id: "gk_real_3",
            question: "Which is the largest district of Nepal by area? / क्षेत्रफलको आधारमा नेपालको सबैभन्दा ठुलो जिल्ला कुन हो?",
            options: ["Humla / हुम्ला", "Dolpa / डोल्पा", "Mustang / मुस्ताङ", "Mugu / मुगु"],
            correct: 1
        },
        {
            id: "gk_real_4",
            question: "Where is the headquarters of the SAARC organization located? / सार्क (SAARC) सचिवालय कहाँ अवस्थित छ?",
            options: ["New Delhi, India / नयाँ दिल्ली, भारत", "Dhaka, Bangladesh / ढाका, बंगलादेश", "Kathmandu, Nepal / काठमाडौँ, नेपाल", "Colombo, Sri Lanka / कोलम्बो, श्रीलंका"],
            correct: 2
        },
        {
            id: "gk_real_5",
            question: "Which river is known as the deepest river of Nepal? / नेपालको सबैभन्दा गहिरो नदी भनेर कुन नदीलाई चिनिन्छ?",
            options: ["Koshi / कोशी", "Gandaki (Narayani) / गण्डकी (नारायणी)", "Karnali / कर्णाली", "Mahakali / महाकाली"],
            correct: 1
        },
        {
            id: "gk_real_6",
            question: "How many local levels (Sthaniya Taha) are there currently in Nepal? / हाल नेपालमा जम्मा कति वटा स्थानीय तहहरू रहेका छन्?",
            options: ["753 वटा", "744 वटा", "77 वटा", "7 वटा"],
            correct: 0
        },
        {
            id: "gk_real_7",
            question: "Which is the smallest province of Nepal by area? / क्षेत्रफलको आधारमा नेपालको सबैभन्दा सानो प्रदेश कुन हो?",
            options: ["Karnali Province / कर्णाली प्रदेश", "Madhesh Province / मधेस प्रदेश", "Bagmati Province / बागमती प्रदेश", "Sudurpashchim Province / सुदूरपश्चिम प्रदेश"],
            correct: 1
        }
    ]
};

// Global Tracking States variables
let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let scoreCorrect = 0;
let scoreIncorrect = 0;
let timerInterval;
let timeLeft = 30;
let activeCategory = '', activeSubject = '', activeChapter = '';
let globalPlayedHistory = new Set();

function generateQuestionsPool(category, subject, chapter) {
    const accessKey = `${category}_${subject}_${chapter}`.replace(/\s+/g, '_');
   
    if (realQuestionsPool[accessKey]) {
        return realQuestionsPool[accessKey];
    }
   
    if (category === "GK") {
        return realQuestionsPool["GK_All_General_Knowledge"];
    }

    // Dynamic Bilingual structural backup generator for fields without manual data
    let computedPool = [];
    for (let i = 1; i <= 200; i++) {
        computedPool.push({
            id: `${accessKey}_dynamic_q_${i}`,
            question: `[${category} - ${chapter}] Bilingual Question Framework Variant #${i} / द्विभाषिक अभ्यास प्रश्न श्रृंखला #${i}`,
            options: [
                "Sample Practice Option A / अभ्यास विकल्प क",
                "Sample Practice Option B / अभ्यास विकल्प ख",
                "Correct Answer Node / सही प्रमाणित उत्तर",
                "Sample Practice Option D / अभ्यास विकल्प घ"
            ],
            correct: 2
        });
    }
    return computedPool;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if(screenId !== 'quiz-screen') clearInterval(timerInterval);
}

function loadChapters(className, subjectName) {
    activeCategory = className;
    activeSubject = subjectName;
   
    const chaptersList = document.getElementById('chapters-list');
    const title = document.getElementById('chapters-title');
    const backBtn = document.getElementById('chapters-back-btn');
   
    title.innerText = `${className} - ${subjectName}`;
    chaptersList.innerHTML = '';
   
    const backScreen = className === 'Class 10' ? 'class10-screen' : 'class11-screen';
    backBtn.onclick = () => showScreen(backScreen);

    const chapters = database[className][subjectName] || [];
    chapters.forEach(chap => {
        const btn = document.createElement('button');
        btn.className = 'btn sub-btn';
        btn.innerText = chap;
        btn.onclick = () => startQuiz(className, subjectName, chap);
        chaptersList.appendChild(btn);
    });
    showScreen('chapters-screen');
}

function startQuiz(className, subjectName, chapterName) {
    activeCategory = className;
    activeSubject = subjectName;
    activeChapter = chapterName;
   
    let basePool = generateQuestionsPool(className, subjectName, chapterName);
    let freshAvailable = basePool.filter(q => !globalPlayedHistory.has(q.id));
   
    if (freshAvailable.length === 0) {
        globalPlayedHistory.clear();
        freshAvailable = basePool;
    }
   
    freshAvailable.sort(() => 0.5 - Math.random());
    currentQuizQuestions = freshAvailable.slice(0, Math.min(10, freshAvailable.length));
   
    currentQuizQuestions.forEach(q => globalPlayedHistory.add(q.id));

    currentQuestionIndex = 0;
    scoreCorrect = 0;
    scoreIncorrect = 0;
   
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 30;
   
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('timer-box').classList.remove('warning');
    document.getElementById('alarm-banner').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';

    const currentQ = currentQuizQuestions[currentQuestionIndex];
    document.getElementById('question-counter').innerText = `Question: ${currentQuestionIndex + 1}/${currentQuizQuestions.length}`;
    document.getElementById('question-text').innerText = currentQ.question;
   
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
   
    currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn option';
        btn.innerText = opt;
        btn.onclick = () => processAnswerSelection(idx, btn);
        optionsContainer.appendChild(btn);
    });

    startClockTicker();
}

function startClockTicker() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
       
        if (timeLeft <= 7 && timeLeft > 0) {
            document.getElementById('timer-box').classList.add('warning');

 
