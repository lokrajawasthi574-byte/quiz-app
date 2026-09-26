let selectedPool = [];
let gameQuestions = [];
let currentIndex = 0;
let correctTally = 0;
let timerRef;
let countdown = 30;
const gameLimit = 10;

function initializeQuiz(mode) {
    // विन्डो ग्लोबल स्कोपबाट सही एरे तान्ने सुरक्षा जाँच
    if (mode === 'class10' && typeof questionsClass10 !== 'undefined') {
        selectedPool = [...questionsClass10];
    } else if (mode === 'class11' && typeof questionsClass11 !== 'undefined') {
        selectedPool = [...questionsClass11];
    } else if (mode === 'gk' && typeof questionsSamanyaGyan !== 'undefined') {
        selectedPool = [...questionsSamanyaGyan];
    } else if (mode === 'science' && typeof questionsOutScience !== 'undefined') {
        selectedPool = [...questionsOutScience];
    } else if (mode === 'computer' && typeof questionsOutComputer !== 'undefined') {
        selectedPool = [...questionsOutComputer];
    } else {
        selectedPool = [];
    }

    if (selectedPool.length === 0) {
        alert("त्रुटि: प्रश्न भण्डार लोड हुन सकेन! कृपया फाइलहरू सही नाममा सेभ भएको जाँच गर्नुहोस्। / Error: Question pool empty!");
        return;
    }

    // प्रश्नहरू र्‍यान्डम गर्ने
    selectedPool.sort(() => Math.random() - 0.5);
    gameQuestions = selectedPool.slice(0, gameLimit);

    currentIndex = 0;
    correctTally = 0;

    document.getElementById("welcome-screen").classList.remove("active");
    document.getElementById("game-screen").classList.add("active");

    renderCurrentQuestion();
}

function renderCurrentQuestion() {
    killClock();
    document.getElementById("forward-btn").classList.add("hidden");

    let data = gameQuestions[currentIndex];
    document.getElementById("q-progress").innerText = `प्रश्न / Question: ${currentIndex + 1}/${gameLimit}`;
   
    // नेपाली र अंग्रेजी दुवै भाषालाई लाइन ब्रेक गरेर देखाउने सुन्दर व्यवस्था
    document.getElementById("display-question-text").innerHTML = `
        <div style="color: #d35400; font-weight: bold; margin-bottom: 8px;">🇳🇵 ${data.questionNp}</div>
        <div style="color: #2c3e50; font-style: italic;">🇬🇧 ${data.questionEn}</div>
    `;

    let targetBox = document.getElementById("display-options-box");
    targetBox.innerHTML = "";

    data.options.forEach((opt, index) => {
        let btn = document.createElement("button");
        btn.className = "option-item";
        btn.innerText = opt;
        btn.onclick = () => evaluateChoice(btn, index, data.correct);
        targetBox.appendChild(btn);
    });

    triggerClock();
}

function triggerClock() {
    let clockEl = document.getElementById("countdown-clock");
    let audioTrack = document.getElementById("beep-alarm");
    countdown = 30;
    clockEl.innerText = countdown;

    timerRef = setInterval(() => {
        countdown--;
        clockEl.innerText = countdown;

        if (countdown <= 7) {
            clockEl.classList.add("critical");
            try { audioTrack.play(); } catch (err) { }
        }

        if (countdown <= 0) {
            clearInterval(timerRef);
            lockOptionsOnTimeout();
        }
    }, 1000);
}

function evaluateChoice(element, chosenIdx, actualIdx) {
    clearInterval(timerRef);
    document.getElementById("beep-alarm").pause();

    let list = document.getElementById("display-options-box").getElementsByClassName("option-item");
    for (let button of list) { button.disabled = true; }

    if (chosenIdx === actualIdx) {
        element.classList.add("correct-choice");
        correctTally++;
    } else {
        element.classList.add("wrong-choice");
        list[actualIdx].classList.add("correct-choice");
    }
    document.getElementById("forward-btn").classList.remove("hidden");
}

function lockOptionsOnTimeout() {
    let list = document.getElementById("display-options-box").getElementsByClassName("option-item");
    let data = gameQuestions[currentIndex];
    for (let button of list) { button.disabled = true; }
    list[data.correct].classList.add("correct-choice");
    document.getElementById("forward-btn").classList.remove("hidden");
}

function moveToNext() {
    currentIndex++;
    if (currentIndex < gameLimit) {
        renderCurrentQuestion();
    } else {
        displayFinalResults();
    }
}

function killClock() {
    clearInterval(timerRef);
    let clockEl = document.getElementById("countdown-clock");
    clockEl.classList.remove("critical");
    let audioTrack = document.getElementById("beep-alarm");
    audioTrack.pause();
    audioTrack.currentTime = 0;
}

function displayFinalResults() {
    document.getElementById("game-screen").classList.remove("active");
    document.getElementById("score-screen").classList.add("active");
    document.getElementById("total-right").innerText = correctTally;
    document.getElementById("total-wrong").innerText = gameLimit - correctTally;
}

function resetToHome() {
    document.getElementById("score-screen").classList.remove("active");
    document.getElementById("welcome-screen").classList.add("active");
}

 
