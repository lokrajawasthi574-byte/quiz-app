const quizData = [
    {
        question: "What is the capital city of Nepal?",
        options: ["Pokhara", "Kathmandu", "Lalitpur", "Biratnagar"],
        correct: 1
    },
    {
        question: "Which is the highest peak in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for Water?",
        options: ["CO2", "H2O", "O2", "NaCl"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options-box");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");

function loadQuestion() {
    optionsBox.innerHTML = "";
    let currentQuestion = quizData[currentQuestionIndex];
    questionBox.innerText = `Q${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.innerText = "Submit Quiz";
    } else {
        nextBtn.innerText = "Next Question";
    }
    nextBtn.style.display = "none"; 

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        
        button.addEventListener("click", () => {
            const allActive = optionsBox.querySelectorAll(".selected");
            allActive.forEach(btn => btn.classList.remove("selected"));
            
            button.classList.add("selected");
            userAnswers[currentQuestionIndex] = index;
            nextBtn.style.display = "block";
        });
        optionsBox.appendChild(button);
    });
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showFullReport();
    }
});

function showFullReport() {
    questionBox.style.display = "none";
    optionsBox.style.display = "none";
    nextBtn.style.display = "none";
    scoreBox.style.display = "block";

    let finalScore = 0;
    let reportHTML = `<h2>Result Summary</h2>`;

    quizData.forEach((item, index) => {
        let userChoice = userAnswers[index];
        let correctChoice = item.correct;
        let isCorrect = userChoice === correctChoice;

        if (isCorrect) finalScore++;

        reportHTML += `
            <div class="report-item ${isCorrect ? 'correct-ans' : 'wrong-ans'}">
                <strong>Q${index + 1}: ${item.question}</strong>
                <div class="report-text">
                    Your Answer: <span class="${isCorrect ? 'text-success' : 'text-danger'}">${item.options[userChoice]}</span><br>
                    Correct Answer: <span class="text-success">${item.options[correctChoice]}</span>
                </div>
            </div>
        `;
    });

    scoreBox.innerHTML = `<div class="score">Your Score: ${finalScore} / ${quizData.length}</div>` + reportHTML;
}

loadQuestion();
