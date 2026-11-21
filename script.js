"use strict";

// ==========================================
// 1. TRANSLATIONS
// ==========================================
const translations = {
    ne: {
        langTitle: "भाषा छान्नुहोस्",
        langSubtitle: "Select Language",
        nameTitle: "आफ्नो नाम लेख्नुहोस्",
        namePlaceholder: "तपाईंको नाम...",
        startBtn: "क्विज सुरु गर्नुहोस्",
        greeting: "नमस्ते",
        selectClass: "आफ्नो Class छान्नुहोस्",
        back: "पछाडि",
        subjects: "विषयहरू",
        chapters: "अध्यायहरू",
        allChapters: "सबै अध्याय",
        quit: "छोड्नुहोस्",
        result: "नतिजा",
        correct: "सही",
        wrong: "गलत",
        viewAnswers: "उत्तर हेर्नुहोस्",
        hideAnswers: "लुकाउनुहोस्",
        playAgain: "पुनः खेल्नुहोस्",
        exit: "बाहिर निस्कनुहोस्",
        correctAnswer: "सही उत्तर! +10 अंक",
        wrongAnswer: "गलत उत्तर!",
        timeUp: "समय सकियो!",
        excellent: "अद्भुत! Excellent!",
        good: "राम्रो! Good Job!",
        tryAgain: "अझै मेहनत गर्नुहोस्!",
        newRecord: "नयाँ कीर्तिमान! ",
        quitConfirm: "के तपाईं क्विज छोड्न चाहनुहुन्छ?",
        noQuestions: "यस विषयमा प्रश्नहरू छैनन्!",
        nameAlert: "कृपया नाम राख्नुहोस्!"
    },
    en: {
        langTitle: "Select Language",
        langSubtitle: "भाषा छान्नुहोस्",
        nameTitle: "Enter Your Name",
        namePlaceholder: "Your name...",
        startBtn: "Start Quiz",
        greeting: "Welcome",
        selectClass: "Select Your Class",
        back: "Back",
        subjects: "Subjects",
        chapters: "Chapters",
        allChapters: "All Chapters",
        quit: "Quit",
        result: "Result",
        correct: "Correct",
        wrong: "Wrong",
        viewAnswers: "View Answers",
        hideAnswers: "Hide Answers",
        playAgain: "Play Again",
        exit: "Exit",
        correctAnswer: "Correct! +10 points",
        wrongAnswer: "Wrong Answer!",
        timeUp: "Time's Up!",
        excellent: "Excellent!",
        good: "Good Job!",
        tryAgain: "Keep Trying!",
        newRecord: "New Record! ",
        quitConfirm: "Do you want to quit the quiz?",
        noQuestions: "No questions for this subject!",
        nameAlert: "Please enter your name!"
    }
};

let currentLang = 'ne';

// ==========================================
// 2. SETTINGS
// ==========================================
const classSubjects = {
    class8:  ["Science", "Math", "Optional Math", "Computer"],
    class9:  ["Science", "Math", "Optional Math", "Computer"],
    class10: ["Science", "Math", "Optional Math", "Computer"],
    class11: ["Physics", "Chemistry", "Biology", "Math", "Computer"],
    class12: ["Physics", "Chemistry", "Biology", "Math", "Computer"]
};

const QUESTIONS_PER_GAME = 10;
const QUESTION_TIME = 30;
const POINTS_PER_CORRECT = 10;

let allQuestions = [];
let currentQuestions = [];
let currentIndex = 0, score = 0, timer = null, timeLeft = QUESTION_TIME;
let userAnswers = [];
let userName = "";
let selectedClass = "", selectedSubject = "";
let questionsLoaded = false;
let answered = false;

const $ = (id) => document.getElementById(id);

// ==========================================
// 3. 🌸 GARLAND INITIALIZATION (Round flowers, no gaps)
// ==========================================
function initGarlands() {
    // Use only safe emojis that work on all devices
    const flowers = ['🌸', '🌼', '🌺', '🌻', '🌷', '🌹'];
    const rudraksha = '📿';
   
    // Create long continuous pattern (no gaps)
    let hPattern = '';
    for (let i = 0; i < 100; i++) {
        if (i % 8 === 7) {
            hPattern += rudraksha;
        } else {
            hPattern += flowers[i % flowers.length];
        }
    }
   
    // Double it for seamless scrolling
    const hDouble = hPattern + hPattern;
   
    $('garland-top').textContent = hDouble;
    $('garland-bottom').textContent = hDouble;
   
    // Vertical pattern
    let vPattern = '';
    for (let i = 0; i < 100; i++) {
        if (i % 8 === 7) {
            vPattern += rudraksha + '\n';
        } else {
            vPattern += flowers[i % flowers.length] + '\n';
        }
    }
    const vDouble = vPattern + vPattern;
   
    $('garland-left').textContent = vDouble;
    $('garland-right').textContent = vDouble;
}

// ==========================================
// 4. WELCOME → LANGUAGE (3 seconds)
// ==========================================
window.addEventListener('load', function() {
    setTimeout(function() {
        showScreen('language-screen');
    }, 3000);
});

// ==========================================
// 5. LANGUAGE SELECTION (100% WORKING)
// ==========================================
function selectLanguage(lang) {
    console.log('Language selected:', lang);
    currentLang = lang;
    updateAllTexts();
    showScreen('name-screen');
}

function updateAllTexts() {
    const t = translations[currentLang];
    $('lang-title').textContent = t.langTitle;
    $('lang-subtitle').textContent = t.langSubtitle;
    $('name-title').textContent = t.nameTitle;
    $('access-name').placeholder = t.namePlaceholder;
    $('start-btn').innerHTML = t.startBtn + ' <i class="fas fa-arrow-right"></i>';
    $('select-class-text').textContent = t.selectClass;
   
    const backTexts = document.querySelectorAll('.back-text');
    backTexts.forEach(function(el) { el.textContent = t.back; });
   
    const quitTexts = document.querySelectorAll('.quit-text');
    quitTexts.forEach(function(el) { el.textContent = t.quit; });
   
    $('result-title').textContent = t.result;
    $('correct-label').textContent = t.correct;
    $('wrong-label').textContent = t.wrong;
    $('review-text').textContent = t.viewAnswers;
    $('replay-text').textContent = t.playAgain;
    $('exit-text').textContent = t.exit;
}

// ==========================================
// 6. LOAD QUESTIONS
// ==========================================
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error('File not found');
        const data = await response.json();

        allQuestions = data
            .filter(function(q) {
                return q && typeof q.question === 'string' &&
                       Array.isArray(q.options) &&
                       !isNaN(q.answer);
            })
            .map(function(q, i) {
                return {
                    id: q.id || (i + 1),
                    category: String(q.category || '').toLowerCase().trim(),
                    subject: String(q.subject || '').trim(),
                    chapter: String(q.chapter || 'General').trim(),
                    question: q.question,
                    options: q.options,
                    answer: q.answer
                };
            });

        questionsLoaded = true;
        console.log('Loaded ' + allQuestions.length + ' questions!');
    } catch (error) {
        console.error(error);
        alert('Questions failed to load! Check questions.json.');
    }
}

// ==========================================
// 7. NAVIGATION
// ==========================================
function showScreen(id) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
        screens[i].classList.remove('active');
    }
    var target = $(id);
    if (target) {
        target.classList.add('active');
    }
}

// ==========================================
// 8. DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initGarlands();
    loadQuestions();
    updateAllTexts();
   
    // Name form submit
    var nameForm = $('name-form');
    if (nameForm) {
        nameForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var nameInput = $('access-name');
            userName = nameInput.value.trim();
            if (userName.length < 2) {
                alert(translations[currentLang].nameAlert);
                return;
            }
            if (!questionsLoaded) {
                loadQuestions().then(function() {
                    renderClasses();
                    showScreen('category-screen');
                });
            } else {
                renderClasses();
                showScreen('category-screen');
            }
        });
    }
});

// ==========================================
// 9. CLASS SELECTION
// ==========================================
function renderClasses() {
    var t = translations[currentLang];
    $('greeting-text').textContent = t.greeting + ', ' + userName + '!';
    var list = $('class-list');
    list.innerHTML = '';
   
    var classes = Object.keys(classSubjects);
    for (var i = 0; i < classes.length; i++) {
        var cls = classes[i];
        var card = document.createElement('div');
        card.className = 'cat-card';
        var isHigh = cls.indexOf('11') !== -1 || cls.indexOf('12') !== -1;
        card.innerHTML = '<i class="fas ' + (isHigh ? 'fa-graduation-cap' : 'fa-school') + '"></i><h3>' + cls.replace('class', 'Class ') + '</h3>';
        card.onclick = (function(c) {
            return function() { selectCategory(c); };
        })(cls);
        list.appendChild(card);
    }
}

function selectCategory(category) {
    selectedClass = category;
    $('subject-title').textContent = category.replace('class', 'Class ') + ' - ' + translations[currentLang].subjects;
    var list = $('subject-list');
    list.innerHTML = '';

    var subs = classSubjects[category];
    for (var i = 0; i < subs.length; i++) {
        var sub = subs[i];
        var card = document.createElement('div');
        card.className = 'cat-card';
        var icon = 'fa-book';
        if (['Science', 'Physics', 'Chemistry', 'Biology'].indexOf(sub) !== -1) icon = 'fa-flask';
        if (sub.indexOf('Math') !== -1) icon = 'fa-calculator';
        if (sub === 'Computer') icon = 'fa-laptop-code';

        card.innerHTML = '<i class="fas ' + icon + '"></i><h3>' + sub + '</h3>';
        card.onclick = (function(s) {
            return function() { selectSubject(s); };
        })(sub);
        list.appendChild(card);
    }
    showScreen('subject-screen');
}

function selectSubject(subject) {
    selectedSubject = subject;
    loadChapters(selectedClass, subject);
}

// ==========================================
// 10. CHAPTERS
// ==========================================
function loadChapters(category, subject) {
    if (!questionsLoaded) {
        alert('Questions loading...');
        return;
    }

    var filtered = allQuestions.filter(function(q) {
        return q.category === category.toLowerCase() &&
               q.subject.toLowerCase() === subject.toLowerCase();
    });

    if (filtered.length === 0) {
        alert(translations[currentLang].noQuestions);
        return;
    }

    var t = translations[currentLang];
    $('chapter-title').textContent = subject + ' - ' + t.chapters;
    var list = $('chapter-list');
    list.innerHTML = '';

    var allBtn = document.createElement('button');
    allBtn.className = 'chapter-btn';
    allBtn.textContent = t.allChapters;
    allBtn.onclick = function() { startQuiz(filtered); };
    list.appendChild(allBtn);

    var chapters = [];
    var chapterMap = {};
    for (var i = 0; i < filtered.length; i++) {
        var chap = filtered[i].chapter;
        if (!chapterMap[chap]) {
            chapterMap[chap] = true;
            chapters.push(chap);
        }
    }

    for (var i = 0; i < chapters.length; i++) {
        var chap = chapters[i];
        var btn = document.createElement('button');
        btn.className = 'chapter-btn';
        btn.textContent = chap;
        btn.onclick = (function(c) {
            return function() {
                var chapQs = filtered.filter(function(q) { return q.chapter === c; });
                startQuiz(chapQs);
            };
        })(chap);
        list.appendChild(btn);
    }
    showScreen('chapter-screen');
}

// ==========================================
// 11. QUIZ LOGIC
// ==========================================
function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
}

function startQuiz(questions) {
    currentQuestions = shuffle(questions).slice(0, QUESTIONS_PER_GAME);
    currentIndex = 0;
    score = 0;
    userAnswers = [];
    answered = false;
    $('current-score').textContent = 0;
    $('current-player').textContent = userName;
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    if (currentIndex >= currentQuestions.length) {
        showResult();
        return;
    }

    answered = false;
    var q = currentQuestions[currentIndex];
    $('question-counter').textContent = (currentIndex + 1) + '/' + currentQuestions.length;
    $('question-text').textContent = q.question;
    $('answer-feedback').textContent = '';

    var container = $('options-container');
    container.innerHTML = '';
    for (var i = 0; i < q.options.length; i++) {
        var btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = q.options[i];
        btn.onclick = (function(idx, b) {
            return function() { checkAnswer(idx, b); };
        })(i, btn);
        container.appendChild(btn);
    }
    startTimer();
}

function startTimer() {
    timeLeft = QUESTION_TIME;
    $('time-left').textContent = timeLeft;
    $('timer-progress').style.width = '100%';
    timer = setInterval(function() {
        timeLeft--;
        $('time-left').textContent = timeLeft;
        $('timer-progress').style.width = ((timeLeft / QUESTION_TIME) * 100) + '%';
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1, null);
        }
    }, 1000);
}

function checkAnswer(selected, btn) {
    if (answered) return;
    answered = true;
    clearInterval(timer);

    var q = currentQuestions[currentIndex];
    var isCorrect = String(selected) === String(q.answer);
    var t = translations[currentLang];

    var buttons = document.querySelectorAll('.option-btn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if (String(i) === String(q.answer)) {
            buttons[i].classList.add('correct');
        }
    }
    if (btn && !isCorrect) {
        btn.classList.add('wrong');
    }

    if (isCorrect) {
        score += POINTS_PER_CORRECT;
        $('current-score').textContent = score;
        $('answer-feedback').textContent = t.correctAnswer;
    } else {
        $('answer-feedback').textContent = selected === -1 ? t.timeUp : t.wrongAnswer;
    }

    userAnswers.push({
        question: q.question,
        user: selected === -1 ? t.timeUp : q.options[selected],
        correct: q.options[q.answer],
        isCorrect: isCorrect
    });

    setTimeout(function() {
        currentIndex++;
        loadQuestion();
    }, 1500);
}

// ==========================================
// 12. RESULT & REVIEW
// ==========================================
function showResult() {
    clearInterval(timer);
    showScreen('result-screen');
    var t = translations[currentLang];

    $('final-score').textContent = score;
    $('total-q').textContent = '/ ' + (currentQuestions.length * POINTS_PER_CORRECT);

    var correct = 0;
    for (var i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i].isCorrect) correct++;
    }
    $('correct-count').textContent = correct;
    $('wrong-count').textContent = userAnswers.length - correct;

    var pct = (score / (currentQuestions.length * POINTS_PER_CORRECT)) * 100;
    var msg = pct >= 80 ? t.excellent : pct >= 50 ? t.good : t.tryAgain;

    var hs = parseInt(localStorage.getItem('quizHighScore') || '0');
    if (score > hs) {
        localStorage.setItem('quizHighScore', score);
        msg = t.newRecord + msg;
    }
    $('score-message').textContent = msg;
}

function toggleReview() {
    var box = $('review-container');
    var btn = $('toggle-review-btn');
    var t = translations[currentLang];
   
    if (box.classList.contains('hidden')) {
        var html = '';
        for (var i = 0; i < userAnswers.length; i++) {
            var a = userAnswers[i];
            var cls = a.isCorrect ? 'correct' : 'wrong';
            html += '<div class="review-item ' + cls + '">';
            html += '<strong>' + (i+1) + '. ' + a.question + '</strong><br>';
            html += (currentLang === 'ne' ? 'तपाईंको' : 'Your') + ': ' + a.user;
            if (!a.isCorrect) {
                html += '<br>' + (currentLang === 'ne' ? 'सही' : 'Correct') + ': ' + a.correct;
            }
            html += '</div>';
        }
        box.innerHTML = html;
        box.classList.remove('hidden');
        btn.innerHTML = '<i class="fas fa-eye-slash"></i> ' + t.hideAnswers;
    } else {
        box.classList.add('hidden');
        btn.innerHTML = '<i class="fas fa-eye"></i> ' + t.viewAnswers;
    }
}

function restartGame() {
    showScreen('category-screen');
}

function quitQuiz() {
    var t = translations[currentLang];
    if (confirm(t.quitConfirm)) {
        clearInterval(timer);
        showScreen('category-screen');
    }
} 
