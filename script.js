// MCQ प्रश्नहरूको भण्डार (यहाँ तपाईँले थप प्रश्नहरू सहजै थप्न सक्नुहुन्छ)
const quizData = [
    {
        question: "भगवान शिवको निवास स्थान कहाँ मानिन्छ?",
        options: ["अमरनाथ", "कैलाश पर्वत", "मुक्तिनाथ", "केदारनाथ"],
        answer: "कैलाश पर्वत"
    },
    {
        question: "नेपालको सबैभन्दा लामो नदी कुन हो?",
        options: ["कोशी", "गण्डकी", "कर्णाली", "बागमती"],
        answer: "कर्णाली"
    },
    {
        question: "सौरमण्डलको सबैभन्दा ठूलो ग्रह कुन हो?",
        options: ["मंगल", "शनि", "पृथ्वी", "बृहस्पति"],
        answer: "बृहस्पति"
    },
    {
        question: "भगवान शिवको धनुषको नाम के हो?",
        options: ["गाण्डिव", "पिनाक", "शार्ङ्ग", "कोदण्ड"],
        answer: "पिनाक"
    },
    {
        question: "नेपालको राष्ट्रिय चरा कुन हो?",
        options: ["डाँफे", "मुनाल", "मयूर", "गौंथली"],
        answer: "डाँफे"
    }
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15; // प्रत्येक प्रश्नको लागि १५ सेकेन्ड समय
const timeLimit = 15;

// Elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const currentQuestionEl = document.getElementById("current-question");
const totalQuestionsEl = document.getElementById("total-questions");
const progressBar = document.getElementById("progress-bar");
const timeLeftEl = document.getElementById("time-left");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");
const resultTotalEl = document.getElementById("result-total");
const resultMessage = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    totalQuestionsEl.textContent = quizData.length;
    resultContainer.classList.add("hide");
    quizContainer.classList.remove("hide");
    showQuestion();
}

// Show Question
function showQuestion() {
    resetState();
   
    // Progress update
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Get current question
    let currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    // Generate Options
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });

    startTimer();
}

// Reset Screen for New Question
function resetState() {
    clearInterval(timer);
    timeLeft = timeLimit;
    timeLeftEl.textContent = timeLeft;
    nextBtn.classList.add("hide");
    optionsContainer.innerHTML = "";
}

// Timer Logic
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

// Handle Answer Selection
function selectAnswer(selectedButton, correctAnswer) {
    clearInterval(timer);
    const allButtons = optionsContainer.querySelectorAll(".option-btn");
   
    if (selectedButton.textContent === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        // सही जवाफलाई हरियो रंग दिने
        highlightCorrectAnswer(correctAnswer);
    }

    // सबै बटन डिसेबल गर्ने ताकि दोबारा क्लिक गर्न नमिल्ला
    allButtons.forEach(btn => btn.disabled = true);
    nextBtn.classList.remove("hide");
}

// Highlight Correct Answer
function highlightCorrectAnswer(correctAnswer) {
    const allButtons = optionsContainer.querySelectorAll(".option-btn");
    allButtons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
    });
}

// Automatically Handle Timeout
function autoTimeOut() {
    const correctAnswer = quizData[currentQuestionIndex].answer;
    highlightCorrectAnswer(correctAnswer);
    const allButtons = optionsContainer.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.disabled = true);
    nextBtn.classList.remove("hide");
}

// Next Button Click
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Show Final Result
function showResult() {
    progressBar.style.width = "100%";
    quizContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
   
    scoreEl.textContent = score;
    resultTotalEl.textContent = quizData.length;

    // Message based on score
    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "अद्भूत! तपाईँमाथि महादेवको कृपा छ। 🔱";
    } else if (percentage >= 60) {
        resultMessage.textContent = "उत्कृष्ट प्रदर्शन! अझै प्रयास गर्नुहोला। 👍";
    } else {
        resultMessage.textContent = "प्रयासको लागि धन्यवाद! पुनः कोसिस गर्नुहोस्। 😊";
    }
}

// Restart Quiz
restartBtn.addEventListener("click", startQuiz);

// Initialize game on load
window.onload = startQuiz;

 
