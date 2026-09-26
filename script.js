const quizDatabase = {
    class10: {
        title: "कक्षा १० / Class 10 (Neema/ReadMore/Unique)",
        subjects: {
            math: {
                title: "अनिवार्य गणित / Mathematics (Read More)",
                chapters: {
                    c1: { title: "अध्याय १: समूह / Chapter 1: Sets", questions: [
                        { qNp: "यदि U={1,2,3,4,5} र A={1,2} भए, A' को मान कति हुन्छ?", qEn: "If U={1,2,3,4,5} and A={1,2}, what is the value of A'?", options: ["{3,4,5}", "{1,2}", "{5}", "𝜙"], correct: 0 },
                        { qNp: "समूह A र B मा साझा परेका सदस्यहरूको समूहलाई के भनिन्छ?", qEn: "What is the set of common elements between set A and B called?", options: ["Union", "Intersection", "Difference", "Subset"], correct: 1 }
                    ]}
                }
            },
            science: {
                title: "विज्ञान तथा प्रविधि / Science & Tech (Neema)",
                chapters: {
                    c1: { title: "अध्याय १: बल र गुरुत्वाकर्षण / Chapter 1: Force & Gravity", questions: [
                        { qNp: "पृथ्वीको सतहमा गुरुत्वप्रवेग (g) को औसत मान कति हुन्छ?", qEn: "What is the average value of acceleration due to gravity (g) on Earth?", options: ["9.8 m/s^2", "1.67 m/s^2", "8.9 m/s^2", "10 m/s^2"], correct: 0 }
                    ]}
                }
            }
        }
    },
    class11: {
        title: "कक्षा ११ / Class 11 (Pioneer/Buddha/Kriti)",
        subjects: {
            physics: {
                title: "भौतिक विज्ञान / Physics (Pioneer)",
                chapters: {
                    c1: { title: "अध्याय १: मेकानिक्स (यान्त्रिकी) / Chapter 1: Mechanics", questions: [
                        { qNp: "प्रोजेक्टाइलले अधिकतम क्षितिज दुरी पार गर्न कति कोणमा फ्याँक्नुपर्छ?", qEn: "Physics (Mechanics): At what angle should a projectile be launched to achieve maximum horizontal range?", options: ["30°", "45°", "60°", "90°"], correct: 1 }
                    ]}
                }
            },
            math: {
                title: "उच्च गणित / Mathematics (Kriti)",
                chapters: {
                    c1: { title: "अध्याय १: बीजगणित / Chapter 1: Algebra", questions: [
                        { qNp: "यदि w एक काल्पनिक एकाइको घनमूल हो भने, 1 + w + w^2 को मान कति हुन्छ?", qEn: "Mathematics: If w is an imaginary cube root of unity, then what is 1 + w + w^2?", options: ["1", "0", "-1", "w"], correct: 1 }
                    ]}
                }
            }
        }
    },
    gk: {
        title: "सामान्य ज्ञान / Loksewa GK",
        subjects: {
            geography: {
                title: "भूगोल / Geography",
                chapters: {
                    c1: { title: "नेपालको भूगोल / Geography of Nepal", questions: [
                        { qNp: "क्षेत्रफलको आधारमा नेपालको सबैभन्दा सानो जिल्ला कुन हो?", qEn: "Which is the smallest district of Nepal by area?", options: ["ललितपुर / Lalitpur", "भक्तपुर / Bhaktapur", "पर्वत / Parbat", "काठमाडौं / Kathmandu"], correct: 1 }
                    ]}
                }
            }
        }
    },
    science: {
        title: "बाह्य विज्ञान / Out Knowledge of Science",
        subjects: {
            biology: {
                title: "जीव विज्ञान / General Biology",
                chapters: {
                    c1: { title: "मानव शरीर / Human Body System", questions: [
                        { qNp: "मानव शरीरको सबैभन्दा ठूलो ग्रन्थि (Gland) कुन हो?", qEn: "Which is the largest gland in the human body?", options: ["Pancreas", "Liver", "Thyroid", "Pituitary"], correct: 1 }
                    ]}
                }
            }
        }
    },
    computer: {
        title: "बाह्य कम्प्युटर / Out Knowledge of Computer",
        subjects: {
            it: {
                title: "सूचना प्रविधि / Information Technology",
                chapters: {
                    c1: { title: "नेटवर्किङ / Computer Networks", questions: [
                        { qNp: "नेटवर्कको सन्दर्भमा 'IP' को पूरा रूप के हो?", qEn: "What is the full form of 'IP' in computer networking?", options: ["Internet Protocol", "Internal Protocol", "Instant Provider", "Inter Link"], correct: 0 }
                    ]}
                }
            }
        }
    }
};

let activeCategory = "";
let activeSubject = "";
let activeChapter = "";
let activePool = [];
let gameQuestions = [];
let currentIndex = 0;
let score = 0;
let timerRef;
let countdown = 30;

function switchScreen(targetId) {
    document.querySelectorAll('.quiz-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
}

function navigateToSubjects(catKey) {
    activeCategory = catKey;
    const catData = quizDatabase[catKey];
    document.getElementById("subject-title").innerText = catData.title;
   
    const container = document.getElementById("subject-list");
    container.innerHTML = "";
   
    Object.keys(catData.subjects).forEach(subKey => {
        let btn = document.createElement("button");
        btn.className = "menu-btn";
        btn.innerText = catData.subjects[subKey].title;
        // फिक्स्ड: स्ट्रिङ पास गरेर सुरक्षित क्लिक इभेन्ट बाइन्डिङ
        btn.setAttribute("onclick", `navigateToChapters('${subKey}')`);
        container.appendChild(btn);
    });
   
    switchScreen("subject-screen");
}

function navigateToChapters(subKey) {
    activeSubject = subKey;
    const subData = quizDatabase[activeCategory].subjects[subKey];
    document.getElementById("chapter-title").innerText = subData.title;
   
    const container = document.getElementById("chapter-list");
    container.innerHTML = "";
   
    Object.keys(subData.chapters).forEach(chKey => {
        let btn = document.createElement("button");
        btn.className = "menu-btn";
        btn.innerText = subData.chapters[chKey].title;
        btn.setAttribute("onclick", `launchQuizEngine('${chKey}')`);
        container.appendChild(btn);
    });

    switchScreen("chapter-screen");
}

function launchQuizEngine(chKey) {
    activeChapter = chKey;
    activePool = [...quizDatabase[activeCategory].subjects[activeSubject].chapters[chKey].questions];
   
    if (activePool.length === 0) {
        alert("त्रुटि: यस अध्यायमा प्रश्नहरू थप्न बाँकी छ!");
        return;
    }

    activePool.sort(() => Math.random() - 0.5);
    gameQuestions = activePool.slice(0, 10);

    currentIndex = 0;
    score = 0;
   
    switchScreen("game-screen");
    loadQuestion();
}

function loadQuestion() {
    killClock();
    document.getElementById("forward-btn").classList.add("hidden");

    let data = gameQuestions[currentIndex];
    document.getElementById("q-progress").innerText = `प्रश्न / Question: ${currentIndex + 1}/${gameQuestions.length}`;
   
    document.getElementById("display-question-text").innerHTML = `
        <div style="color: #d35400; font-weight: bold; margin-bottom: 8px;">🇳🇵 ${data.qNp}</div>
        <div style="color: #2c3e50; font-style: italic;">🇬🇧 ${data.qEn}</div>
    `;

    let targetBox = document.getElementById("display-options-box");
    targetBox.innerHTML = "";

    data.options.forEach((opt, index) => {
        let btn = document.createElement("button");
        btn.className = "option-item";
        btn.innerText = opt;
        btn.setAttribute("onclick", `evaluateChoice(this, ${index}, ${data.correct})`);
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
        score++;
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
    if (currentIndex < gameQuestions.length) {
        loadQuestion();
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
    switchScreen("score-screen");
    document.getElementById("total-right").innerText = score;
    document.getElementById("total-wrong").innerText = gameQuestions.length - score;
}

function backToCategories() { switchScreen("category-screen"); }
function backToSubjects() { navigateToSubjects(activeCategory); }
function resetToHome() { switchScreen("category-screen"); }

 
