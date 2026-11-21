let quizData = null;
let lang = localStorage.getItem("lokraj_lang") || "both";
let playerName = localStorage.getItem("lokraj_player") || "Student";
let quizMode = "timed";
let autoNextOn = true;
let soundOn = true;
let isPaused = false;

let selectedClass = null;
let selectedSubject = null;

let activeSession = null;
let qIndex = 0;
let score = 0;
let streak = 0;
let bestStreak = 0;
let timerId = null;
let nextTimeoutId = null;
let timeLeft = 25;
let hintUsed = false;
let sessionReviews = [];

const ICON_SVG = {
  book: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
  "book-open": '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  "grad-cap": '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  "user-grad": '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  award: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  flask: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/></svg>',
  laptop: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
  calculator: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/></svg>',
  globe: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
};

const els = {
  onboardingOverlay: document.getElementById("onboardingOverlay"),
  languageStepCard: document.getElementById("languageStepCard"),
  welcomeStepCard: document.getElementById("welcomeStepCard"),
  petalsLayer: document.getElementById("petalsLayer"),
  shivaAvatarImg: document.getElementById("shivaAvatarImg"),
  shivaAvatarFallback: document.getElementById("shivaAvatarFallback"),
  playerNameInput: document.getElementById("playerNameInput"),
  welcomeSubtitle: document.getElementById("welcomeSubtitle"),
  startWelcomeBtn: document.getElementById("startWelcomeBtn"),
  appShell: document.getElementById("appShell"),
  gridContainer: document.getElementById("gridContainer"),
  heroStats: document.getElementById("heroStats"),
  searchInput: document.getElementById("searchInput"),
  breadcrumbText: document.getElementById("breadcrumbText"),
  screenTitle: document.getElementById("screenTitle"),
  screenSubtitle: document.getElementById("screenSubtitle"),
  quizMeta: document.getElementById("quizMeta"),
  quizCounter: document.getElementById("quizCounter"),
  timerDisplay: document.getElementById("timerDisplay"),
  pauseQuizBtn: document.getElementById("pauseQuizBtn"),
  progressFill: document.getElementById("progressFill"),
  questionPrompt: document.getElementById("questionPrompt"),
  optionsList: document.getElementById("optionsList"),
  explanationBox: document.getElementById("explanationBox"),
  feedbackLabel: document.getElementById("feedbackLabel"),
  explanationText: document.getElementById("explanationText"),
  streakDisplay: document.getElementById("streakDisplay"),
  reviewList: document.getElementById("reviewList"),
  retryWrongBtn: document.getElementById("retryWrongBtn"),
  leaderboardList: document.getElementById("leaderboardList"),
};

function spawnPetals() {
  if (!els.petalsLayer || els.petalsLayer.children.length > 0) return;
  const colors = ["#f472b6", "#fbbf24", "#f9a8d4", "#f59e0b"];
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("span");
    p.className = "petal-node";
    p.style.left = (8 + i * 12) + "%";
    p.style.background = colors[i % colors.length];
    p.style.animationDuration = (10 + (i % 4) * 1.4) + "s";
    p.style.animationDelay = (i * 0.7) + "s";
    els.petalsLayer.appendChild(p);
  }
}

if (els.shivaAvatarImg) {
  els.shivaAvatarImg.onerror = () => {
    els.shivaAvatarImg.classList.add("hidden");
    els.shivaAvatarFallback.classList.remove("hidden");
  };
}

function updateWelcomeCopy() {
  if (els.playerNameInput) {
    els.playerNameInput.placeholder =
      lang === "en" ? "Enter your name..." : "तपाईंको नाम लेख्नुहोस्...";
    if (playerName && playerName !== "Student") {
      els.playerNameInput.value = playerName;
    }
  }
  if (els.welcomeSubtitle) {
    els.welcomeSubtitle.textContent =
      lang === "en" ? "Har Har Mahadev · Class 8–12 Quiz" : "हर हर महादेव";
  }
  if (els.startWelcomeBtn) {
    els.startWelcomeBtn.textContent =
      lang === "en" ? "Start Quiz →" : "क्विज सुरु गर्नुहोस् →";
  }
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
}

function enterAppFromWelcome() {
  const rawName = els.playerNameInput ? els.playerNameInput.value.trim() : "";
  playerName = rawName || playerName || "Student";
  localStorage.setItem("lokraj_player", playerName);
  localStorage.setItem("lokraj_lang", lang);
  els.onboardingOverlay.classList.add("hidden");
  els.appShell.classList.remove("hidden");
  renderDrillDown();
}

document.querySelectorAll("[data-pick-lang]").forEach((btn) => {
  btn.onclick = () => {
    lang = btn.dataset.pickLang;
    localStorage.setItem("lokraj_lang", lang);
    updateWelcomeCopy();
    els.languageStepCard.classList.add("hidden");
    els.welcomeStepCard.classList.remove("hidden");
  };
});

document.getElementById("welcomeForm").onsubmit = (e) => {
  e.preventDefault();
  enterAppFromWelcome();
};

document.getElementById("backToLangBtn").onclick = () => {
  els.welcomeStepCard.classList.add("hidden");
  els.languageStepCard.classList.remove("hidden");
};

document.getElementById("skipWelcomeBtn").onclick = enterAppFromWelcome;

document.getElementById("openWelcomeBtn").onclick = () => {
  clearInterval(timerId);
  clearTimeout(nextTimeoutId);
  updateWelcomeCopy();
  els.welcomeStepCard.classList.add("hidden");
  els.languageStepCard.classList.remove("hidden");
  els.appShell.classList.add("hidden");
  els.onboardingOverlay.classList.remove("hidden");
};

function formatBilingual(enText, neText) {
  if (lang === "en") return enText;
  if (lang === "ne") return neText || enText;
  return neText && neText !== enText ? enText + " / " + neText : enText;
}

function playBeep(freq, duration) {
  if (!soundOn) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  gain.gain.value = 0.08;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function showView(name) {
  ["homeView", "quizView", "resultView", "leaderboardView"].forEach((id) => {
    document.getElementById(id).classList.toggle("hidden", id !== name + "View");
  });
  document.querySelectorAll(".nav-link").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === name);
  });
}

function renderStatsSummary() {
  if (!quizData || !els.heroStats) return;
  let totalSubjects = 0;
  let totalChapters = 0;
  let totalQuestions = 0;
  quizData.classes.forEach((c) => {
    totalSubjects += c.subjects.length;
    c.subjects.forEach((s) => {
      totalChapters += s.chapters.length;
      s.chapters.forEach((ch) => (totalQuestions += ch.questions.length));
    });
  });
  quizData.standaloneSubjects.forEach((s) => (totalQuestions += s.questions.length));
  els.heroStats.innerHTML =
    "<div><strong>" + quizData.classes.length + "</strong><span>Classes (8–12)</span></div>" +
    "<div><strong>" + totalSubjects + "</strong><span>Subjects</span></div>" +
    "<div><strong>" + totalChapters + "</strong><span>Chapters</span></div>" +
    "<div><strong>" + totalQuestions + "</strong><span>Questions</span></div>";
}

function renderDrillDown() {
  if (!quizData) return;
  renderStatsSummary();
  els.gridContainer.innerHTML = "";
  const query = (els.searchInput ? els.searchInput.value : "").trim().toLowerCase();

  if (query) {
    els.breadcrumbText.textContent = formatBilingual("Search Results", "खोज नतिजा");
    els.screenTitle.textContent = '"' + query + '"';
    quizData.classes.forEach((cls) => {
      cls.subjects.forEach((sub) => {
        sub.chapters.forEach((ch) => {
          const hay = (cls.name + " " + sub.name + " " + sub.nameNe + " " + ch.name + " " + ch.nameNe).toLowerCase();
          if (hay.includes(query)) {
            const card = document.createElement("button");
            card.className = "cat-card";
            card.innerHTML =
              '<span class="cat-icon">' + ICON_SVG["book-open"] + "</span>" +
              "<h3>" + formatBilingual(ch.name, ch.nameNe) + "</h3>" +
              "<p>" + cls.name + " · " + sub.name + " · " + ch.questions.length + " Qs</p>";
            card.onclick = () => startQuiz(ch.name, ch.nameNe, ch.questions);
            els.gridContainer.appendChild(card);
          }
        });
      });
    });
    return;
  }

  if (!selectedClass) {
    els.breadcrumbText.textContent = formatBilingual(
      "Welcome, " + playerName + " · All Categories",
      "स्वागत छ, " + playerName + " · सबै विषयहरू"
    );
    els.screenTitle.textContent = formatBilingual("Choose Category", "विषय छान्नुहोस्");
    els.screenSubtitle.textContent = formatBilingual(
      "Click a Class to pick Subject and Chapter, or choose a standalone topic.",
      "विषय र पाठ छान्न कक्षामा क्लिक गर्नुहोस्।"
    );

    quizData.classes.forEach((cls) => {
      const card = document.createElement("button");
      card.className = "cat-card";
      card.innerHTML =
        '<span class="cat-icon">' + (ICON_SVG[cls.icon] || ICON_SVG.book) + "</span>" +
        "<h3>" + formatBilingual(cls.name, cls.nameNe) + "</h3>" +
        "<p>" + cls.subjects.length + (lang === "ne" ? " विषय" : " Subjects") + "</p>";
      card.onclick = () => {
        selectedClass = cls;
        selectedSubject = null;
        renderDrillDown();
      };
      els.gridContainer.appendChild(card);
    });

    quizData.standaloneSubjects.forEach((sub) => {
      const card = document.createElement("button");
      card.className = "cat-card";
      card.innerHTML =
        '<span class="cat-icon">' + (ICON_SVG[sub.icon] || ICON_SVG.globe) + "</span>" +
        "<h3>" + formatBilingual(sub.name, sub.nameNe) + "</h3>" +
        "<p>" + sub.questions.length + (lang === "ne" ? " प्रश्न" : " Questions") + "</p>";
      card.onclick = () => startQuiz(sub.name, sub.nameNe, sub.questions);
      els.gridContainer.appendChild(card);
    });
    return;
  }

  if (selectedClass && !selectedSubject) {
    els.breadcrumbText.textContent = formatBilingual(selectedClass.name, selectedClass.nameNe);
    els.screenTitle.textContent = formatBilingual("Select Subject", "विषय छान्नुहोस्");

    const backCard = document.createElement("button");
    backCard.className = "cat-card";
    backCard.innerHTML = "<h3>← Back</h3><p>All Classes</p>";
    backCard.onclick = () => {
      selectedClass = null;
      renderDrillDown();
    };
    els.gridContainer.appendChild(backCard);

    selectedClass.subjects.forEach((sub) => {
      const card = document.createElement("button");
      card.className = "cat-card";
      card.innerHTML =
        '<span class="cat-icon">' + ICON_SVG["book-open"] + "</span>" +
        "<h3>" + formatBilingual(sub.name, sub.nameNe) + "</h3>" +
        "<p>" + sub.chapters.length + (lang === "ne" ? " पाठ" : " Chapters") + "</p>";
      card.onclick = () => {
        selectedSubject = sub;
        renderDrillDown();
      };
      els.gridContainer.appendChild(card);
    });
    return;
  }

  els.breadcrumbText.textContent =
    formatBilingual(selectedClass.name, selectedClass.nameNe) +
    " › " +
    formatBilingual(selectedSubject.name, selectedSubject.nameNe);
  els.screenTitle.textContent = formatBilingual("Select Chapter", "पाठ छान्नुहोस्");

  const backSub = document.createElement("button");
  backSub.className = "cat-card";
  backSub.innerHTML = "<h3>← Back</h3><p>Subjects</p>";
  backSub.onclick = () => {
    selectedSubject = null;
    renderDrillDown();
  };
  els.gridContainer.appendChild(backSub);

  const allChCard = document.createElement("button");
  allChCard.className = "cat-card";
  const allSubQuestions = selectedSubject.chapters.flatMap((c) => c.questions);
  allChCard.innerHTML =
    '<span class="cat-icon">' + ICON_SVG.award + "</span>" +
    "<h3>" + formatBilingual("All Chapters Combined", "सबै पाठहरू सँगै") + "</h3>" +
    "<p>" + allSubQuestions.length + " Questions</p>";
  allChCard.onclick = () =>
    startQuiz(selectedSubject.name + " (All)", selectedSubject.nameNe + " (सबै)", allSubQuestions);
  els.gridContainer.appendChild(allChCard);

  selectedSubject.chapters.forEach((ch) => {
    const card = document.createElement("button");
    card.className = "cat-card";
    card.innerHTML =
      '<span class="cat-icon">' + ICON_SVG.book + "</span>" +
      "<h3>" + formatBilingual(ch.name, ch.nameNe) + "</h3>" +
      "<p>" + ch.questions.length + " Questions</p>";
    card.onclick = () => startQuiz(ch.name, ch.nameNe, ch.questions);
    els.gridContainer.appendChild(card);
  });
}

function startQuiz(title, titleNe, questions) {
  clearInterval(timerId);
  clearTimeout(nextTimeoutId);
  activeSession = { title, titleNe, questions };
  qIndex = 0;
  score = 0;
  streak = 0;
  bestStreak = 0;
  hintUsed = false;
  isPaused = false;
  sessionReviews = [];
  els.pauseQuizBtn.textContent = "Pause";
  showView("quiz");
  renderQuestion();
}

function startCountdown() {
  clearInterval(timerId);
  if (quizMode !== "timed") {
    els.timerDisplay.textContent = "Practice";
    return;
  }
  els.timerDisplay.textContent = timeLeft + "s";
  timerId = setInterval(() => {
    if (isPaused) return;
    timeLeft -= 1;
    els.timerDisplay.textContent = timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(timerId);
      selectAnswer(-1);
    }
  }, 1000);
}

function renderQuestion() {
  clearInterval(timerId);
  const q = activeSession.questions[qIndex];
  els.quizMeta.textContent = formatBilingual(activeSession.title, activeSession.titleNe);
  els.quizCounter.textContent = (qIndex + 1) + " / " + activeSession.questions.length;
  els.progressFill.style.width = ((qIndex / activeSession.questions.length) * 100) + "%";
  els.questionPrompt.textContent = formatBilingual(q.prompt, q.promptNe);
  els.explanationBox.classList.add("hidden");
  els.streakDisplay.textContent = "Streak: " + streak;

  els.optionsList.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = String.fromCharCode(65 + idx) + ". " + formatBilingual(opt, q.optionsNe?.[idx]);
    btn.onclick = () => selectAnswer(idx);
    els.optionsList.appendChild(btn);
  });

  timeLeft = 25;
  startCountdown();
}

function advanceQuestion() {
  clearTimeout(nextTimeoutId);
  qIndex += 1;
  if (qIndex < activeSession.questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function selectAnswer(chosenIndex) {
  clearInterval(timerId);
  const q = activeSession.questions[qIndex];
  const buttons = els.optionsList.querySelectorAll(".option-btn");
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) btn.classList.add("correct");
    else if (idx === chosenIndex) btn.classList.add("wrong");
  });

  const isCorrect = chosenIndex === q.correctIndex;
  sessionReviews.push({ question: q, chosenIndex, isCorrect });

  if (isCorrect) {
    score += 1;
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    playBeep(760, 0.14);
    els.feedbackLabel.textContent = formatBilingual("Correct!", "सही उत्तर!");
  } else {
    streak = 0;
    playBeep(220, 0.2);
    els.feedbackLabel.textContent = formatBilingual("Incorrect", "गलत उत्तर");
  }

  els.explanationText.textContent = formatBilingual(q.explanation, q.explanationNe);
  els.explanationBox.classList.remove("hidden");
  els.streakDisplay.textContent = "Streak: " + streak;

  if (autoNextOn) {
    nextTimeoutId = setTimeout(advanceQuestion, 950);
  }
}

document.getElementById("nextQuestionBtn").onclick = advanceQuestion;

function finishQuiz() {
  const total = activeSession.questions.length;
  const accuracy = Math.round((score / total) * 100);
  const xp = score * 20 + bestStreak * 5;
  const rank =
    accuracy >= 90 ? "Grandmaster" : accuracy >= 75 ? "Scholar" : accuracy >= 50 ? "Apprentice" : "Learner";

  document.getElementById("resultRankTitle").textContent = "Quiz Complete · " + rank;
  document.getElementById("finalScore").textContent = score + "/" + total;
  document.getElementById("finalAccuracy").textContent = accuracy + "%";
  document.getElementById("finalXp").textContent = String(xp);
  document.getElementById("finalStreak").textContent = String(bestStreak);

  const missed = sessionReviews.filter((r) => !r.isCorrect).map((r) => r.question);
  els.retryWrongBtn.classList.toggle("hidden", missed.length === 0);
  els.retryWrongBtn.onclick = () =>
    startQuiz(activeSession.title + " (Missed)", activeSession.titleNe + " (गलत प्रश्न)", missed);

  els.reviewList.innerHTML = sessionReviews
    .map((r, i) => {
      const cls = r.isCorrect ? "correct" : "wrong";
      const rightOpt = formatBilingual(r.question.options[r.question.correctIndex], r.question.optionsNe?.[r.question.correctIndex]);
      return (
        '<div class="review-item ' + cls + '">' +
        "<strong>" + (i + 1) + ". " + formatBilingual(r.question.prompt, r.question.promptNe) + "</strong>" +
        "<p>Correct: " + rightOpt + "</p>" +
        "</div>"
      );
    })
    .join("");

  const history = JSON.parse(localStorage.getItem("lokraj_lb") || "[]");
  history.unshift({
    player: playerName,
    title: activeSession.title,
    score: score + "/" + total,
    accuracy,
    date: new Date().toLocaleDateString(),
  });
  localStorage.setItem("lokraj_lb", JSON.stringify(history.slice(0, 30)));
  showView("result");
}

function renderLeaderboard() {
  const history = JSON.parse(localStorage.getItem("lokraj_lb") || "[]");
  els.leaderboardList.innerHTML = history.length
    ? history
        .map(
          (item) =>
            '<div class="lb-row"><span>' +
            (item.player ? item.player + " · " : "") +
            item.title +
            "</span><strong>" +
            item.score +
            " (" +
            item.accuracy +
            "%)</strong></div>"
        )
        .join("")
    : "<p>No completed sessions yet.</p>";
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.onclick = () => {
    lang = btn.dataset.lang;
    localStorage.setItem("lokraj_lang", lang);
    document.querySelectorAll(".lang-btn").forEach((b) => b.classList.toggle("active", b === btn));
    renderDrillDown();
  };
});

document.getElementById("modeToggleBtn").onclick = (e) => {
  quizMode = quizMode === "timed" ? "practice" : "timed";
  e.target.textContent = quizMode === "timed" ? "Mode: Timed (25s)" : "Mode: Practice";
};

document.getElementById("autoNextToggleBtn").onclick = (e) => {
  autoNextOn = !autoNextOn;
  e.target.textContent = autoNextOn ? "Auto-Next: ON" : "Auto-Next: OFF";
};

document.getElementById("soundToggleBtn").onclick = (e) => {
  soundOn = !soundOn;
  e.target.textContent = soundOn ? "Sound: ON" : "Sound: OFF";
};

els.pauseQuizBtn.onclick = () => {
  isPaused = !isPaused;
  els.pauseQuizBtn.textContent = isPaused ? "Resume" : "Pause";
};

document.getElementById("hint5050Btn").onclick = () => {
  if (hintUsed || !activeSession) return;
  const q = activeSession.questions[qIndex];
  const wrongIndices = [0, 1, 2, 3].filter((i) => i !== q.correctIndex).slice(0, 2);
  const buttons = els.optionsList.querySelectorAll(".option-btn");
  wrongIndices.forEach((i) => {
    buttons[i].disabled = true;
    buttons[i].style.opacity = "0.35";
  });
  hintUsed = true;
};

document.getElementById("skipBtn").onclick = () => {
  if (!activeSession) return;
  clearInterval(timerId);
  selectAnswer(-1);
};

document.getElementById("exitQuizBtn").onclick = () => {
  clearInterval(timerId);
  clearTimeout(nextTimeoutId);
  showView("home");
};

document.getElementById("playAgainBtn").onclick = () => {
  startQuiz(activeSession.title, activeSession.titleNe, activeSession.questions);
};

document.getElementById("backHomeBtn").onclick = () => showView("home");

document.getElementById("clearHistoryBtn").onclick = () => {
  localStorage.removeItem("lokraj_lb");
  renderLeaderboard();
};

if (els.searchInput) {
  els.searchInput.oninput = renderDrillDown;
}

function startMixChallenge() {
  if (!quizData) return;
  const pool = [];
  quizData.classes.forEach((c) =>
    c.subjects.forEach((s) => s.chapters.forEach((ch) => pool.push(...ch.questions)))
  );
  quizData.standaloneSubjects.forEach((s) => pool.push(...s.questions));
  const picked = pool.sort(() => Math.random() - 0.5).slice(0, 10);
  startQuiz("Mix Challenge", "मिश्रित चुनौती", picked);
}

document.getElementById("mixQuizBtn").onclick = startMixChallenge;
document.getElementById("homeMixBar").onclick = startMixChallenge;

document.querySelectorAll(".nav-link").forEach((btn) => {
  btn.onclick = () => {
    clearInterval(timerId);
    clearTimeout(nextTimeoutId);
    const view = btn.dataset.view;
    if (view === "leaderboard") renderLeaderboard();
    showView(view);
  };
});

spawnPetals();
updateWelcomeCopy();

fetch("questions.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load questions.json");
    return res.json();
  })
  .then((data) => {
    quizData = data;
    renderDrillDown();
  })
  .catch(() => {
    els.gridContainer.innerHTML =
      '<div class="cat-card" style="grid-column: 1 / -1;"><h3>Open with VS Code Live Server</h3><p>Place questions.json in the same folder and open index.html via Live Server.</p></div>';
  }); 
