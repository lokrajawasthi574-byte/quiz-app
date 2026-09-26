// १. २०० वटा प्रश्नहरू सहजै अट्ने गरी बनाइएको मुख्य भण्डार (नमुनाका लागि ३० वटा राखिएका छन्)
const allQuestionsBank = [
    { question: "भगवान शिवको निवास स्थान कहाँ मानिन्छ?", options: ["अमरनाथ", "कैलाश पर्वत", "मुक्तिनाथ", "केदारनाथ"], answer: "कैलाश पर्वत" },
    { question: "नेपालको सबैभन्दा लामो नदी कुन हो?", options: ["कोशी", "गण्डकी", "कर्णाली", "बागमती"], answer: "कर्णाली" },
    { question: "सौरमण्डलको सबैभन्दा ठूलो ग्रह कुन हो?", options: ["मंगल", "शनि", "पृथ्वी", "बृहस्पति"], answer: "बृहस्पति" },
    { question: "भगवान शिवको धनुषको नाम के हो?", options: ["गाण्डिव", "पिनाक", "शार्ङ्ग", "कोदण्ड"], answer: "पिनाक" },
    { question: "नेपालको राष्ट्रिय चरा कुन हो?", options: ["डाँफे", "मुनाल", "मयूर", "गौंथली"], answer: "डाँफे" },
    { question: "गौतम बुद्धको जन्म कहाँ भएको हो?", options: ["लुम्बिनी", "जनकपुर", "काठमाडौँ", "पोखरा"], answer: "लुम्बिनी" },
    { question: "नेपालको राष्ट्रिय झण्डामा कुन कुन रङ छ?", options: ["रातो र हरियो", "सिम्रिक, नीलो र सेतो", "पहेंलो र रातो", "सेतो र नीलो"], answer: "सिम्रिक, नीलो र सेतो" },
    { question: "संसारको सबैभन्दा अग्लो शिखर कुन हो?", options: ["के२", "कञ्चनजङ्घा", "लहोत्से", "सगरमाथा"], answer: "सगरमाथा" },
    { question: "एक दिनमा कति घण्टा हुन्छ?", options: ["१२ घण्टा", "२४ घण्टा", "४८ घण्टा", "६० घण्टा"], answer: "२४ घण्टा" },
    { question: "नेपालको राजधानी कहाँ हो?", options: ["ललितपुर", "भक्तपुर", "काठमाडौँ", "पोखरा"], answer: "काठमाडौँ" },
    { question: "सूर्यको सबैभन्दा नजिकको ग्रह कुन हो?", options: ["बुध", "शुक्र", "पृथ्वी", "मंगल"], answer: "बुध" },
    { question: "नेपालको राष्ट्रिय फूल कुन हो?", options: ["गुलाफ", "लालीगुँरास", "सयपत्री", "कमल"], answer: "लालीगुँरास" },
    { question: "काठमाडौँ उपत्यकाभित्र कतिवटा जिल्ला छन्?", options: ["२ वटा", "३ वटा", "४ वटा", "५ वटा"], answer: "३ वटा" },
    { question: "क्षेत्रफलको हिसाबले नेपालको सबैभन्दा ठूलो जिल्ला कुन हो?", options: ["हुम्ला", "डोल्पा", "मुस्ताङ", "कैलाली"], answer: "डोल्पा" },
    { question: "मानव शरीरमा कतिवटा हड्डीहरू हुन्छन्?", options: ["२०६ वटा", "२१0 वटा", "१९५ वटा", "३०० वटा"], answer: "२०६ वटा" },
    { question: "पानीको रासायनिक सूत्र (Chemical Formula) के हो?", options: ["CO2", "H2O", "O2", "NaCl"], answer: "H2O" },
    { question: "संसारको सबैभन्दा सानो महादेश कुन हो?", options: ["एशिया", "युरोप", "अष्ट्रेलिया", "अफ्रिका"], answer: "अष्ट्रेलिया" },
    { question: "नेपाल कुन महादेशमा पर्दछ?", options: ["युरोप", "अफ्रिका", "अन्तर्राष्ट्रिय", "एशिया"], answer: "एशिया" },
    { question: "क्रिकेट खेलमा एक ओभरमा कति बल हुन्छन्?", options: ["४ बल", "६ बल", "८ बल", "५ बल"], answer: "६ बल" },
    { question: "कम्प्युटरको दिमाग (Brain) भनेर कसलाई चिनिन्छ?", options: ["RAM", "CPU", "Hard Disk", "Monitor"], answer: "CPU" },
    { question: "नेपालको राष्ट्रिय जनावर कुन हो?", options: ["बाघ", "हात्ती", "गाई", "एकसिंगे गैँडा"], answer: "गाई" },
    { question: "पृथ्वीले सूर्यको परिक्रमा गर्न कति समय लगाउँछ?", options: ["२४ घण्टा", "३६५ दिन", "३0 दिन", "१२ महिना"], answer: "३६५ दिन" },
    { question: "महाकवि देवकोटाको पूरा नाम के हो?", options: ["लक्ष्मीप्रसाद देवकोटा", "लेखनाथ पौड्याल", "भानुभक्त आचार्य", "माधवप्रसाद घिमिरे"], answer: "लक्ष्मीप्रसाद देवकोटा" },
    { question: "टेलिफोनको आविष्कार कसले गरेका हुन्?", options: ["अल्बर्ट आइन्स्टाइन", "थॉमस एडिसन", "अलेक्जेन्डर ग्राहम बेल", "न्युटन"], answer: "अलेक्जेन्डर ग्राहम बेल" },
    { question: "नेपालमा कतिवटा प्रदेशहरू छन्?", options: ["५ वटा", "७ वटा", "१४ वटा", "७७ वटा"], answer: "७ वटा" },
    { question: "फेवा ताल नेपालको कुन सहरमा पर्दछ?", options: ["चितवन", "काठमाडौँ", "पोखरा", "धरान"], answer: "पोखरा" },
    { question: "भानुभक्त आचार्यको जन्म कहाँ भएको हो?", options: ["तनहुँ", "गोरखा", "कास्की", "लम्जुङ"], answer: "तनहुँ" },
    { question: "नेपालको वर्तमान मुद्रा के हो?", options: ["भारु", "टका", "डलर", "रुपैयाँ"], answer: "रुपैयाँ" },
    { question: "अङ्ग्रजी वर्णमाला (Alphabet) मा कतिवटा अक्षर हुन्छन्?", options: ["२१ वटा", "२६ वटा", "५२ वटा", "२४ वटा"], answer: "२६ वटा" },
    { question: "सगरमाथाको उचाइ कति मिटर छ?", options: ["८८४८.८६", "८८५0", "८०००", "८४४८"], answer: "८८४८.८६" }
   
    // तपाईँले यसै गरी अन्तिममा कमा (,) दिँदै २०० वा सोभन्दा बढी प्रश्नहरू थप्न सक्नुहुन्छ।
];

// २. गेम लजिक र नो-रिपिट कन्ट्रोलर
let currentSessionQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
const timeLimit = 15;
const QUESTIONS_PER_ROUND = 10; // एक पटकमा १० वटा मात्र सोधिने

// ब्राउजरको लोकल मेमोरीबाट पहिले खेलिसकेका प्रश्नहरूको नम्बर लिने
let playedQuestionIndexes = JSON.parse(localStorage.getItem('playedQuestions')) || [];

// DOM Elements
const welcomeContainer = document.getElementById("welcome-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const startGameBtn = document.getElementById("start-game-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const currentQuestionEl = document.getElementById("current-question");
const totalQuestionsEl = document.getElementById("total-questions");
const progressBar = document.getElementById("progress-bar");
const timeLeftEl = document.getElementById("time-left");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const resultTotalEl = document.getElementById("result-total");
const resultMessage = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");

startGameBtn.addEventListener("click", () => {
    welcomeContainer.classList.add("hide");
    setupNewRound();
});

// १० वटा नदोहोरिने प्रश्नहरू छान्ने मुख्य फङ्सन
function setupNewRound() {
    // यदि सबै प्रश्नहरू खेलिसकेको भए (मेमोरी भरिएपछि) स्वतः रिसेट गर्ने
    if (playedQuestionIndexes.length >= allQuestionsBank.length) {
        playedQuestionIndexes = [];
        localStorage.setItem('playedQuestions', JSON.stringify(playedQuestionIndexes));
    }

    // बाँकी रहेका नखेलिएका प्रश्नहरूको लिस्ट निकाल्ने
    let unplayedIndexes = [];
    for (let i = 0; i < allQuestionsBank.length; i++) {
        if (!playedQuestionIndexes.includes(i)) {
            unplayedIndexes.push(i);
        }
    }

    // बाँकी प्रश्नहरूलाई रेन्डम बनाउने (मिस्रित गर्ने)
    unplayedIndexes.sort(() => Math.random() - 0.5);

    // यो राउन्डको लागि १० वटा प्रश्न छान्ने
    let itemsToSelect = Math.min(QUESTIONS_PER_ROUND, unplayedIndexes.length);
    currentSessionQuestions = [];
   
    for (let i = 0; i < itemsToSelect; i++) {
        let questionIndex = unplayedIndexes[i];
        currentSessionQuestions.push(allQuestionsBank[questionIndex]);
        playedQuestionIndexes.push(questionIndex); // खेलेको सूचीमा नम्बर थप्ने
    }

    // मेमोरीमा सुरक्षित गर्ने ताकि अर्को खेलमा यो नदोहोरियोस्
    localStorage.setItem('playedQuestions', JSON.stringify(playedQuestionIndexes));

    startQuiz();
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    totalQuestionsEl.textContent = currentSessionQuestions.length;
    resultContainer.classList.add("hide");
    quizContainer.classList.remove("hide");
    showQuestion();
}

function showQuestion() {
    resetState();
   
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex / currentSessionQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    let currentQuestion = currentSessionQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });

    startTimer();
}

function resetState() {
    clearInterval(timer);
    timeLeft = timeLimit;
    timeLeftEl.textContent = timeLeft;
    nextBtn.classList.add("hide");
    optionsContainer.innerHTML = "";
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            autoTimeOut();
        }
    }, 1000);
}

function selectAnswer(selectedButton, correctAnswer) {
    clearInterval(timer);
    const allButtons = optionsContainer.querySelectorAll(".option-btn");
   
    if (selectedButton.textContent === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        highlightCorrectAnswer(correctAnswer);
    }

    allButtons.forEach(btn => btn.disabled = true);
    nextBtn.classList.remove("hide");
}

function highlightCorrectAnswer(correctAnswer) {
    const allButtons = optionsContainer.querySelectorAll(".option-btn");
    allButtons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
    });
}

function autoTimeOut() {
    const correctAnswer = currentSessionQuestions[currentQuestionIndex].answer;
    highlightCorrectAnswer(correctAnswer);
    const allButtons = optionsContainer.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.disabled = true);
    nextBtn.classList.remove("hide");
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentSessionQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    progressBar.style.width = "100%";
    quizContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
   
    scoreEl.textContent = score;
    resultTotalEl.textContent = currentSessionQuestions.length;

    const percentage = (score / currentSessionQuestions.length) * 100;
    if (percentage === 100) {

 
