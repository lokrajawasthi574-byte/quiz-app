const quizDatabase = {
  class10: {
    title: "कक्षा १० / Class 10 MCQ Pool",
    subjects: {
      math: {
        title: "अनिवार्य गणित / Mathematics",
        chapters: {
          c1: {
            title: "अध्याय १: समूह / Chapter 1: Sets",
            questions: [
              { qNp: "यदि U={1,2,3,4,5} र A={1,2} भए, A' को मान कति हुन्छ?", qEn: "If U={1,2,3,4,5} and A={1,2}, find A':", options: ["{3,4,5}", "{1,2}", "{5}", "𝜙"], correct: 0 }
            ]
          }
        }
      }
    }
  },
  class11: {
    title: "कक्षा ११ / Class 11 MCQ Pool",
    subjects: {
      physics: {
        title: "भौतिक विज्ञान / Physics",
        chapters: {
          c1: {
            title: "अध्याय १: मेकानिक्स / Chapter 1: Mechanics",
            questions: [
              { qNp: "प्रोजेक्टाइलले अधिकतम क्षितिज दुरी पार गर्न कति कोणमा फ्याँक्नुपर्छ?", qEn: "At what angle should a projectile be launched for maximum range?", options: ["30°", "45°", "60°", "90°"], correct: 1 }
            ]
          }
        }
      }
    }
  },
  gk: {
    title: "सामान्य ज्ञान / Loksewa GK",
    subjects: {
      geo: {
        title: "भूगोल / Geography",
        chapters: {
          c1: {
            title: "नेपालको भूगोल / Geography of Nepal",
            questions: [
              { qNp: "क्षेत्रफलको आधारमा नेपालको सबैभन्दा सानो जिल्ला कुन हो?", qEn: "Which is the smallest district of Nepal?", options: ["ललितपुर", "भक्तपुर", "पर्वत", "काठमाडौं"], correct: 1 }
            ]
          }
        }
      }
    }
  },
  science: {
    title: "बाह्य विज्ञान / Out Knowledge of Science",
    subjects: {
      bio: {
        title: "जीव विज्ञान / Biology",
        chapters: {
          c1: {
            title: "मानव शरीर / Human Body",
            questions: [
              { qNp: "मानव शरीरको सबैभन्दा ठूलो ग्रन्थि कुन हो?", qEn: "Largest gland in human body?", options: ["Pancreas", "Liver", "Thyroid", "Pituitary"], correct: 1 }
            ]
          }
        }
      }
    }
  },
  computer: {
    title: "बाह्य कम्प्युटर / Out Knowledge of Computer",
    subjects: {
      it: {
        title: "सूचना प्रविधि / IT",
        chapters: {
          c1: {
            title: "नेटवर्किङ / Computer Networks",
            questions: [
              { qNp: "IP को पूरा रूप के हो?", qEn: "Full form of IP?", options: ["Internet Protocol", "Internal Protocol", "Instant Provider", "Inter Link"], correct: 0 }
            ]
          }
        }
      }
    }
  }
};

let activeCategory = ""; let activeSubject = ""; let activeChapter = "";
let gameQuestions = []; let currentIndex = 0; let score = 0; let timerRef; let countdown = 30;

function switchScreen(targetId) {
  document.querySelectorAll('.quiz-panel').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(targetId);
  if (target) target.classList.add('active');
}

function navigateToSubjects(catKey) {
  activeCategory = catKey;
  const catData = quizDatabase[catKey];
  const titleEl = document.getElementById("subject-title");
  if (titleEl) titleEl.innerText = catData.title;
 
  const container = document.getElementById("subject-list");
  if (container) {
    container.innerHTML = "";
    Object.keys(catData.subjects).forEach(subKey => {
      let btn = document.createElement("button");
      btn.className = "menu-btn";
      btn.innerText = catData.subjects[subKey].title;
      btn.onclick = function() { navigateToChapters(subKey); };
      container.appendChild(btn);
    });
  }
  switchScreen("subject-screen");
}

function navigateToChapters(subKey) {
  activeSubject = subKey;
  const subData = quizDatabase[activeCategory].subjects[subKey];
  const titleEl = document.getElementById("chapter-title");
  if (titleEl) titleEl.innerText = subData.title;
 
  const container = document.getElementById("chapter-list");
  if (container) {
    container.innerHTML = "";
    Object.keys(subData.chapters).forEach(chKey => {
      let btn = document.createElement("button");
      btn.className = "menu-btn";
      btn.innerText = subData.chapters[chKey].title;
      btn.onclick = function() { launchQuizEngine(chKey); };
      container.appendChild(btn);
    });
  }
  switchScreen("chapter-screen");
}

function launchQuizEngine(chKey) {
  activeChapter = chKey;
  let mainPool = quizDatabase[activeCategory].subjects[activeSubject].chapters[chKey].questions;
  gameQuestions = [...mainPool];
  currentIndex = 0; score = 0;
  switchScreen("game-screen");
  loadQuestion();
}

function loadQuestion() {
  killClock();
  const fBtn = document.getElementById("forward-btn");
  if (fBtn) fBtn.classList.add("hidden");

  let data = gameQuestions[currentIndex];
  const progEl = document.getElementById("q-progress");
  if (progEl) progEl.innerText = `प्रश्न: ${currentIndex + 1}/${gameQuestions.length}`;
 
  const qTxtEl = document.getElementById("display-question-text");
  if (qTxtEl) {
    qTxtEl.innerHTML = `
      <div style="color: #d35400; font-weight: bold; margin-bottom: 8px;">🇳🇵 ${data.qNp}</div>
      <div style="color: #2c3e50; font-style: italic;">🇬🇧 ${data.qEn}</div>
    `;
  }

  let targetBox = document.getElementById("display-options-box");
  if (targetBox) {
    targetBox.innerHTML = "";
    data.options.forEach((opt, index) => {
      let btn = document.createElement("button");
      btn.className = "option-item";
      btn.innerText = opt;
      btn.onclick = function() { evaluateChoice(btn, index, data.correct); };
      targetBox.appendChild(btn);
    });
  }
  triggerClock();
}

function triggerClock() {
  let clockEl = document.getElementById("countdown-clock");
  countdown = 30;
  if (clockEl) clockEl.innerText = countdown;

  timerRef = setInterval(() => {
    countdown--;
    if (clockEl) clockEl.innerText = countdown;
    if (countdown <= 7) {
      if (clockEl) clockEl.classList.add("critical");
      try { document.getElementById("beep-alarm").play(); } catch (err) {}
    }
    if (countdown <= 0) {
      clearInterval(timerRef);
      lockOptionsOnTimeout();
    }
  }, 1000);
}

function evaluateChoice(element, chosenIdx, actualIdx) {
  clearInterval(timerRef);
  try { document.getElementById("beep-alarm").pause(); } catch(e){}
  let list = document.getElementById("display-options-box").getElementsByClassName("option-item");
  for (let button of list) { button.disabled = true; }
  if (chosenIdx === actualIdx) { element.classList.add("correct-choice"); score++; }
  else { element.classList.add("wrong-choice"); if (list[actualIdx]) list[actualIdx].classList.add("correct-choice"); }
  const fBtn = document.getElementById("forward-btn");
  if (fBtn) fBtn.classList.remove("hidden");
}

function lockOptionsOnTimeout() {
  let list = document.getElementById("display-options-box").getElementsByClassName("option-item");
  for (let button of list) { button.disabled = true; }
  let idx = gameQuestions[currentIndex].correct;
  if (list[idx]) list[idx].classList.add("correct-choice");
  const fBtn = document.getElementById("forward-btn");
  if (fBtn) fBtn.classList.remove("hidden");
}

function moveToNext() {
  currentIndex++;
  if (currentIndex < gameQuestions.length) { loadQuestion(); }
  else { displayFinalResults(); }
}

function killClock() {
  clearInterval(timerRef);
  let clockEl = document.getElementById("countdown-clock");
  if (clockEl) clockEl.classList.remove("critical");
  try {
    let audioTrack = document.getElementById("beep-alarm");
    audioTrack.pause(); audioTrack.currentTime = 0;
  } catch(e){}
}

function displayFinalResults() {
  switchScreen("score-screen");
  const rEl = document.getElementById("total-right");
  if (rEl) rEl.innerText = score;
  const wEl = document.getElementById("total-wrong");
  if (wEl) wEl.innerText = gameQuestions.length - score;
}

function backToCategories() { switchScreen("category-screen"); }
function backToSubjects() { navigateToSubjects(activeCategory); }
function resetToHome() { switchScreen("category-screen"); }

 
