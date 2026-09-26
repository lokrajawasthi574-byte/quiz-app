let selectedPool = [];
let gameQuestions = [];
let currentIndex = 0;
let correctTally = 0;
let timerRef;
let countdown = 30;
const gameLimit = 10;

// खेल सुरु गर्ने र १० वटा र्‍यान्डम प्रश्न फिल्टर गर्ने फङ्सन
function initializeQuiz(mode) {
    if (mode === 'class10') {
        selectedPool = [...questionsClass10];
    } else if (mode === 'class11') {
        selectedPool = [...questionsClass11];
    } else if (mode === 'gk') {
        selectedPool = [...questionsSamanyaGyan];
    } else if (mode === 'science') {
        selectedPool = [...questionsOutScience];
    } else if (mode === 'computer') {
        selectedPool = [...questionsOutComputer];
    }

    if (selectedPool.length === 0) {
        alert("त्रुटि: यो क्याटेगोरीमा प्रश्नहरू उपलब्ध छैनन्!");
        return;
    }

    // प्रश्नहरूलाई अनपेक्षित रूपमा र्‍यान्डम (Shuffle) गर्ने भिडियो गेम मेकानिक्स
    selectedPool.sort(() => Math.random() - 0.5);
    gameQuestions = selectedPool.slice(0, gameLimit);

    currentIndex = 0;
    correctTally = 0;

    document.getElementById("welcome-screen").classList.remove("active");
    document.getElementById("game-screen").classList.add("active");

    renderCurrentQuestion();
}

// प्रश्न र अप्सन स्क्रिनमा लोड गर्ने
function renderCurrentQuestion() {
    killClock();
    document.getElementById("forward-btn").classList.add("hidden");

    let data = gameQuestions[currentIndex];
    document.getElementById("q-progress").innerText = `प्रश्न: ${currentIndex + 1}/${gameLimit}`;
    document.getElementById("display-question-text").innerText = data.question;

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

// ३० सेकेन्डको टाइमर र अन्तिम ७ सेकेन्ड अलार्म लोजिक
function triggerClock() {
    let clockEl = document.getElementById("countdown-clock");
    let audioTrack = document.getElementById("beep-alarm");
    countdown = 30;
    clockEl.innerText = countdown;

    timerRef = setInterval(() => {
        countdown--;
        clockEl.innerText = countdown;

        // अन्तिम ७ सेकेन्डमा अलार्म बजाउने
        if (countdown <= 7) {
            clockEl.classList.add("critical");
            try {
                audioTrack.play();
            } catch (err) { console.log("अडियो प्ले ब्लक भयो"); }
        }

        // समय शून्य हुँदा स्वतः लक हुने
        if (countdown <= 0) {
            clearInterval(timerRef);
            lockOptionsOnTimeout();
        }
    }, 1000);
}

// उत्तर सही वा गलत भएको जाँच्ने (हरियो/रातो डेकोरेसन)
function evaluateChoice(element, chosenIdx, actualIdx) {
    clearInterval(timerRef);
    document.getElementById("beep-alarm").pause();

    let list = document.getElementById("display-options-box").getElementsByClassName("option-item");
    for (let button of list) {
        button.disabled = true;
    }

    if (chosenIdx === actualIdx) {
        element.classList.add("correct-choice");
        correctTally++;
    } else {
        element.classList.add("wrong-choice");
        list[actualIdx].classList.add("correct-choice"); // सहि उत्तर फ्ल्यास गरिदिने
    }

    document.getElementById("forward-btn").classList.remove("hidden");
}

// समय सकिँदा स्वतः सहि उत्तर देखाउने संयन्त्र
function lockOptionsOnTimeout() {
    let list = document.getElementById("display-options-box").getElementsByClassName("option-item");
    let data = gameQuestions[currentIndex];

    for (let button of list) {
        button.disabled = true;
    }
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

 
