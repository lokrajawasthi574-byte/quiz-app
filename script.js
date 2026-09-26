/* =========================================================
   QUIZ NEPAL - COMPLETE SCRIPT
   Works with the current index.html structure
========================================================= */

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let auth = null;
let googleProvider = null;
let firebaseReady = false;

try {
  if (
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "YOUR_API_KEY" &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID"
  ) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    firebaseReady = true;
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}


/* =========================================================
   SETTINGS
========================================================= */

const QUESTIONS_PER_GAME = 10;
const QUESTION_TIME = 30;
const WARNING_SECONDS = 7;
const POINTS_PER_CORRECT = 10;

const STORAGE_KEYS = {
  language: "quiz_nepal_language",
  stats: "quiz_nepal_stats",
  used: "quiz_nepal_used_questions",
  demoUser: "quiz_nepal_demo_user"
};


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  ne: {
    back: "फिर्ता",
    subjects: "विषय",
    chooseSubject: "विषय छान्नुहोस्",
    chapters: "अध्याय",
    chooseChapter: "अध्याय छान्नुहोस्",
    question: "प्रश्न",
    next: "अर्को →",
    exit: "बाहिर निस्कनुहोस्",
    score: "Score",
    correct: "सही",
    wrong: "गलत",
    timeout: "समय सकियो",
    accuracy: "Accuracy",
    completed: "Quiz पूरा भयो!",
    yourResult: "तपाईंको परिणाम",
    playAgain: "फेरि खेल्नुहोस्",
    home: "Home",
    loginRequired: "पहिला Google Login गर्नुहोस्।",
    loginSuccess: "Google Login सफल भयो।",
    logoutSuccess: "Logout भयो।",
    quizQuit: "Quiz बन्द गरियो।",
    correctAnswer: "सही उत्तर!",
    wrongAnswer: "गलत उत्तर!",
    timeOut: "समय सकियो!",
    roomCreated: "Room बन्यो।",
    roomJoined: "Room join भयो।",
    roomNotFound: "Room code भेटिएन।",
    copied: "Room code copied।",
    enterRoomCode: "Room code राख्नुहोस्।",
    noQuestions: "यस chapter मा अहिले पर्याप्त प्रश्न छैन।",
    games: "खेलेका Quiz",
    best: "उत्कृष्ट Score",
    totalCorrect: "कुल सही",
    totalWrong: "कुल गलत"
  },

  en: {
    back: "Back",
    subjects: "Subjects",
    chooseSubject: "Choose a subject",
    chapters: "Chapters",
    chooseChapter: "Choose a chapter",
    question: "Question",
    next: "Next →",
    exit: "Exit",
    score: "Score",
    correct: "Correct",
    wrong: "Wrong",
    timeout: "Timeout",
    accuracy: "Accuracy",
    completed: "Quiz Completed!",
    yourResult: "Your Result",
    playAgain: "Play Again",
    home: "Home",
    loginRequired: "Please login with Google first.",
    loginSuccess: "Google login successful.",
    logoutSuccess: "Logged out.",
    quizQuit: "Quiz closed.",
    correctAnswer: "Correct Answer!",
    wrongAnswer: "Wrong Answer!",
    timeOut: "Time is up!",
    roomCreated: "Room created.",
    roomJoined: "Room joined.",
    roomNotFound: "Room code not found.",
    copied: "Room code copied.",
    enterRoomCode: "Enter room code.",
    noQuestions: "There are not enough questions in this chapter yet.",
    games: "Games Played",
    best: "Best Score",
    totalCorrect: "Total Correct",
    totalWrong: "Total Wrong"
  }

};


/* =========================================================
   QUESTION BANK
   Your existing questionBank is expected here.
   IMPORTANT:
   Keep your existing complete questionBank ABOVE this
   section if you already have it.
========================================================= */

/*
   If your current script.js already contains the large
   questionBank from the previous code, KEEP THAT BANK.

   The code below works with that same structure.
*/


/* =========================================================
   FALLBACK QUESTION BANK
   Used only if questionBank does not exist.
========================================================= */

const fallbackQuestionBank = {

  class10: {

    Science: {

      "Force": [
        {
          id: "10-science-force-001",
          q: {
            ne: "बलको SI एकाइ कुन हो?",
            en: "What is the SI unit of force?"
          },
          options: {
            ne: ["Newton", "Joule", "Watt", "Pascal"],
            en: ["Newton", "Joule", "Watt", "Pascal"]
          },
          answer: 0,
          explanation: {
            ne: "बलको SI एकाइ Newton हो।",
            en: "The SI unit of force is Newton."
          },
          hint: {
            ne: "Force को SI unit सम्झनुहोस्।",
            en: "Think of the SI unit of force."
          }
        }
      ]

    },

    Computer: {

      "Computer Fundamentals": [
        {
          id: "10-computer-001",
          q: {
            ne: "Computer को brain भनेर कुनलाई भनिन्छ?",
            en: "Which component is called the brain of a computer?"
          },
          options: {
            ne: ["CPU", "Monitor", "Keyboard", "Printer"],
            en: ["CPU", "Monitor", "Keyboard", "Printer"]
          },
          answer: 0,
          explanation: {
            ne: "CPU ले instructions process गर्छ।",
            en: "The CPU processes instructions."
          },
          hint: {
            ne: "Processing unit सम्झनुहोस्।",
            en: "Think about the processing unit."
          }
        }
      ]

    },

    "Optional Mathematics": {

      "Algebra": [
        {
          id: "10-math-001",
          q: {
            ne: "यदि x + 5 = 12 भने x को मान कति हुन्छ?",
            en: "If x + 5 = 12, what is x?"
          },
          options: {
            ne: ["7", "5", "17", "6"],
            en: ["7", "5", "17", "6"]
          },
          answer: 0,
          explanation: {
            ne: "12 - 5 = 7 भएकाले x = 7 हुन्छ।",
            en: "12 - 5 = 7, so x = 7."
          },
          hint: {
            ne: "5 लाई subtract गर्नुहोस्।",
            en: "Subtract 5."
          }
        }
      ]

    }

  },

  class11: {

    Physics: {

      "Physical World": [
        {
          id: "11-physics-001",
          q: {
            ne: "भौतिकशास्त्रले मुख्य रूपमा केको अध्ययन गर्छ?",
            en: "What does physics mainly study?"
          },
          options: {
            ne: [
              "पदार्थ र ऊर्जा",
              "केवल जीवजन्तु",
              "केवल भाषा",
              "केवल इतिहास"
            ],
            en: [
              "Matter and energy",
              "Only animals",
              "Only language",
              "Only history"
            ]
          },
          answer: 0,
          explanation: {
            ne: "भौतिकशास्त्रले पदार्थ, ऊर्जा र तिनका अन्तरक्रियाको अध्ययन गर्छ।",
            en: "Physics studies matter, energy and their interactions."
          },
          hint: {
            ne: "Matter र energy सम्झनुहोस्।",
            en: "Think about matter and energy."
          }
        }
      ]

    },

    Chemistry: {

      "Basic Concepts of Chemistry": [
        {
          id: "11-chemistry-001",
          q: {
            ne: "पदार्थको मात्रा मापन गर्ने SI एकाइ कुन हो?",
            en: "What is the SI unit of amount of substance?"
          },
          options: {
            ne: ["मोल", "किलोग्राम", "लिटर", "मिटर"],
            en: ["Mole", "Kilogram", "Litre", "Metre"]
          },
          answer: 0,
          explanation: {
            ne: "Amount of substance को SI unit mole हो।",
            en: "The SI unit of amount of substance is mole."
          },
          hint: {
            ne: "Chemistry मा amount of substance को unit सम्झनुहोस्।",
            en: "Think of the chemistry unit for amount of substance."
          }
        }
      ]

    },

    Mathematics: {

      "Sets": [
        {
          id: "11-math-001",
          q: {
            ne: "यदि A = {1, 2, 3} भने A मा कति elements छन्?",
            en: "If A = {1, 2, 3}, how many elements are in A?"
          },
          options: {
            ne: ["3", "2", "4", "1"],
            en: ["3", "2", "4", "1"]
          },
          answer: 0,
          explanation: {
            ne: "A मा 3 वटा elements छन्।",
            en: "A contains 3 elements."
          },
          hint: {
            ne: "Elements गन्नुहोस्।",
            en: "Count the elements."
          }
        }
      ]

    },

    Computer: {

      "Computer System": [
        {
          id: "11-computer-001",
          q: {
            ne: "CPU को पूरा रूप के हो?",
            en: "What is the full form of CPU?"
          },
          options: {
            ne: [
              "Central Processing Unit",
              "Computer Processing User",
              "Central Program Utility",
              "Computer Program Unit"
            ],
            en: [
              "Central Processing Unit",
              "Computer Processing User",
              "Central Program Utility",
              "Computer Program Unit"
            ]
          },
          answer: 0,
          explanation: {
            ne: "CPU को पूरा रूप Central Processing Unit हो।",
            en: "CPU stands for Central Processing Unit."
          },
          hint: {
            ne: "Computer को process गर्ने मुख्य unit सम्झनुहोस्।",
            en: "Think about the main processing unit."
          }
        }
      ]

    }

  },

  gk: {

    "Nepal General Knowledge": [

      {
        id: "gk-nepal-001",
        q: {
          ne: "नेपालको राजधानी कुन हो?",
          en: "What is the capital city of Nepal?"
        },
        options: {
          ne: ["काठमाडौं", "पोखरा", "विराटनगर", "नेपालगञ्ज"],
          en: ["Kathmandu", "Pokhara", "Biratnagar", "Nepalgunj"]
        },
        answer: 0,
        explanation: {
          ne: "नेपालको राजधानी काठमाडौं हो।",
          en: "Kathmandu is the capital of Nepal."
        },
        hint: {
          ne: "नेपालको राजधानी सम्झनुहोस्।",
          en: "Think of Nepal's capital."
        }
      },

      {
        id: "gk-nepal-002",
        q: {
          ne: "नेपालको राष्ट्रिय फूल कुन हो?",
          en: "What is the national flower of Nepal?"
        },
        options: {
          ne: ["लालीगुराँस", "कमल", "गुलाब", "सयपत्री"],
          en: ["Rhododendron", "Lotus", "Rose", "Marigold"]
        },
        answer: 0,
        explanation: {
          ne: "लालीगुराँस नेपालको राष्ट्रिय फूल हो।",
          en: "Rhododendron is the national flower of Nepal."
        },
        hint: {
          ne: "नेपालको राष्ट्रिय फूल सम्झनुहोस्।",
          en: "Think of Nepal's national flower."
        }
      },

      {
        id: "gk-nepal-003",
        q: {
          ne: "नेपालमा कति वटा प्रदेश छन्?",
          en: "How many provinces are there in Nepal?"
        },
        options: {
          ne: ["७", "५", "६", "८"],
          en: ["7", "5", "6", "8"]
        },
        answer: 0,
        explanation: {
          ne: "नेपालमा ७ वटा प्रदेश छन्।",
          en: "Nepal has seven provinces."
        },
        hint: {
          ne: "नेपालको संघीय संरचना सम्झनुहोस्।",
          en: "Think about Nepal's federal structure."
        }
      }

    ],

    "World General Knowledge": [

      {
        id: "gk-world-001",
        q: {
          ne: "पृथ्वीको प्राकृतिक satellite कुन हो?",
          en: "What is Earth's natural satellite?"
        },
        options: {
          ne: ["चन्द्रमा", "सूर्य", "मंगल", "शुक्र"],
          en: ["Moon", "Sun", "Mars", "Venus"]
        },
        answer: 0,
        explanation: {
          ne: "चन्द्रमा पृथ्वीको प्राकृतिक satellite हो।",
          en: "The Moon is Earth's natural satellite."
        },
        hint: {
          ne: "रातको आकाशमा देखिने पृथ्वीको satellite सम्झनुहोस्।",
          en: "Think of Earth's satellite visible at night."
        }
      }

    ]

  }

};


/* =========================================================
   QUESTION BANK SELECTOR
========================================================= */

function getQuestionBank() {

  if (
    typeof questionBank !== "undefined" &&
    questionBank &&
    typeof questionBank === "object"
  ) {
    return questionBank;
  }

  return fallbackQuestionBank;
}


/* =========================================================
   STATE
========================================================= */

const state = {

  language: loadLanguage(),

  currentPage: "loginPage",

  category: null,

  subject: null,

  chapter: null,

  questions: [],

  currentQuestionIndex: 0,

  score: 0,

  correct: 0,

  wrong: 0,

  timeout: 0,

  answered: false,

  timer: null,

  timeLeft: QUESTION_TIME,

  quizFinished: false,

  currentUser: null,

  lastQuizKey: null

};


/* =========================================================
   DOM HELPER
========================================================= */

function $(id) {
  return document.getElementById(id);
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;

function showToast(message) {

  const toast = $("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* =========================================================
   LANGUAGE
========================================================= */

function loadLanguage() {

  const saved =
    localStorage.getItem(STORAGE_KEYS.language);

  if (
    saved === "ne" ||
    saved === "en" ||
    saved === "both"
  ) {
    return saved;
  }

  return "both";
}


function saveLanguage() {

  localStorage.setItem(
    STORAGE_KEYS.language,
    state.language
  );
}


function getText(value) {

  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  if (state.language === "ne") {
    return value.ne || value.en || "";
  }

  if (state.language === "en") {
    return value.en || value.ne || "";
  }

  const ne = value.ne || "";
  const en = value.en || "";

  if (ne && en) {
    return `${ne}<br><span class="english-line">${en}</span>`;
  }

  return ne || en;
}


/* =========================================================
   LANGUAGE BUTTONS
========================================================= */

function setLanguage(language) {

  if (
    language !== "ne" &&
    language !== "en" &&
    language !== "both"
  ) {
    return;
  }

  state.language = language;

  saveLanguage();

  updateLanguageButtons();

  updateStaticLanguage();

  if (state.currentPage === "quizPage") {
    renderCurrentQuestion();
  }
}


function updateLanguageButtons() {

  const buttons = {
    ne: $("neBtn"),
    en: $("enBtn"),
    both: $("bothBtn")
  };

  Object.entries(buttons).forEach(([key, button]) => {

    if (!button) return;

    button.classList.toggle(
      "active",
      state.language === key
    );

  });
}


function updateStaticLanguage() {

  const t =
    state.language === "en"
      ? translations.en
      : translations.ne;


  if ($("chooseTitle")) {
    $("chooseTitle").textContent =
      state.language === "en"
        ? "Choose Your Quiz"
        : "आफ्नो Quiz छान्नुहोस्";
  }


  if ($("chooseDescription")) {
    $("chooseDescription").textContent =
      state.language === "en"
        ? "Choose your class or quiz category and start practicing."
        : "आफ्नो कक्षा वा Quiz category छानेर अभ्यास सुरु गर्नुहोस्।";
  }


  if ($("gamesPlayedLabel")) {
    $("gamesPlayedLabel").textContent = t.games;
  }


  if ($("bestScoreLabel")) {
    $("bestScoreLabel").textContent = t.best;
  }


  if ($("correctLabel")) {
    $("correctLabel").textContent = t.totalCorrect;
  }


  if ($("wrongLabel")) {
    $("wrongLabel").textContent = t.totalWrong;
  }


  if ($("subjectTitle") && state.subject) {
    $("subjectTitle").textContent =
      state.language === "en"
        ? "Subjects"
        : "विषय";
  }


  if ($("chapterTitle") && state.chapter) {
    $("chapterTitle").textContent =
      state.language === "en"
        ? "Chapters"
        : "अध्याय";
  }


  if ($("nextBtn")) {
    $("nextBtn").textContent =
      state.language === "en"
        ? "Next →"
        : "अर्को →";
  }


  if ($("quitQuizBtn")) {
    $("quitQuizBtn").textContent =
      state.language === "en"
        ? "← Exit"
        : "← बाहिर निस्कनुहोस्";
  }


  updateResultLabels();

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageId) {

  const pages =
    document.querySelectorAll(".page");

  pages.forEach(page => {

    page.classList.remove("active");

    page.style.display = "none";

  });


  const page = $(pageId);

  if (!page) {
    console.error(
      `Page not found: ${pageId}`
    );
    return;
  }


  page.classList.add("active");

  page.style.display = "block";

  state.currentPage = pageId;

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

}


function goHome() {

  stopTimer();

  state.category = null;
  state.subject = null;
  state.chapter = null;
  state.questions = [];

  showPage("homePage");

  updateStats();

}


function goBackFromSubject() {

  state.subject = null;

  showPage("homePage");

}


function goBackFromChapter() {

  state.chapter = null;

  showPage("subjectPage");

}


/* =========================================================
   AUTH / LOGIN
========================================================= */

function getDemoUser() {

  try {

    const saved =
      localStorage.getItem(
        STORAGE_KEYS.demoUser
      );

    if (saved) {
      return JSON.parse(saved);
    }

  } catch (error) {
    console.error(error);
  }

  return null;
}


function setDemoUser() {

  const user = {

    uid: "demo-user",

    displayName: "Quiz Nepal User",

    email: "demo@quiznepal.local",

    photoURL: ""

  };

  localStorage.setItem(
    STORAGE_KEYS.demoUser,
    JSON.stringify(user)
  );

  return user;
}


async function loginWithGoogle() {

  const button = $("googleLoginBtn");
  const message = $("loginMessage");


  if (!firebaseReady) {

    const demoUser = setDemoUser();

    state.currentUser = demoUser;

    if (message) {
      message.textContent =
        "Demo Login सफल भयो। Firebase config राखेपछि वास्तविक Google Login चल्नेछ।";
    }

    updateUserUI();

    showToast(
      state.language === "en"
        ? "Demo login successful."
        : "Demo Login सफल भयो।"
    );

    showPage("homePage");

    return;
  }


  try {

    if (button) {
      button.disabled = true;
      button.textContent = "Signing in...";
    }


    const result =
      await signInWithPopup(
        auth,
        googleProvider
      );


    state.currentUser =
      result.user;


    updateUserUI();

    showToast(
      translations[
        state.language === "en"
          ? "en"
          : "ne"
      ].loginSuccess
    );


    showPage("homePage");


  } catch (error) {

    console.error(
      "Google Login Error:",
      error
    );


    if (message) {

      message.textContent =
        error?.message ||
        "Google Login failed.";

    }


    showToast(
      "Google Login failed."
    );


  } finally {

    if (button) {

      button.disabled = false;

      button.innerHTML =
        '<span class="google-icon">G</span><span>Continue with Google</span>';

    }

  }

}


async function logoutUser() {

  try {

    if (firebaseReady && auth) {

      await signOut(auth);

    } else {

      localStorage.removeItem(
        STORAGE_KEYS.demoUser
      );

    }

    state.currentUser = null;

    showPage("loginPage");

    showToast(
      state.language === "en"
        ? "Logged out."
        : "Logout भयो।"
    );

  } catch (error) {

    console.error(
      "Logout error:",
      error
    );

  }

}


function updateUserUI() {

  const email =
    $("userEmail");

  if (!email) return;


  if (state.currentUser) {

    email.textContent =
      state.currentUser.email || "";

  } else {

    email.textContent = "";

  }

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

function initializeAuthListener() {

  if (!firebaseReady || !auth) {

    const demoUser =
      getDemoUser();

    if (demoUser) {

      state.currentUser =
        demoUser;

      updateUserUI();

      showPage("homePage");

    } else {

      showPage("loginPage");

    }

    return;
  }


  onAuthStateChanged(
    auth,
    user => {

      state.currentUser =
        user || null;

      updateUserUI();


      if (user) {

        showPage("homePage");

      } else {

        showPage("loginPage");

      }

    }
  );

}


/* =========================================================
   CATEGORY
========================================================= */

function openCategory(category) {

  if (!state.currentUser) {

    showToast(
      translations[
        state.language === "en"
          ? "en"
          : "ne"
      ].loginRequired
    );

    showPage("loginPage");

    return;
  }


  state.category = category;


  if (category === "one") {

    showPage("onePage");

    return;
  }


  renderSubjects();

  showPage("subjectPage");

}


/* =========================================================
   GET SUBJECTS
========================================================= */

function getSubjects(category) {

  const bank =
    getQuestionBank();

  const data =
    bank[category];

  if (!data) return [];

  return Object.keys(data);

}


/* =========================================================
   GET CHAPTERS
========================================================= */

function getChapters(
  category,
  subject
) {

  const bank =
    getQuestionBank();

  const data =
    bank?.[category]?.[subject];

  if (!data) return [];

  if (Array.isArray(data)) {
    return [];
  }

  return Object.keys(data);

}


/* =========================================================
   RENDER SUBJECTS
========================================================= */

function renderSubjects() {

  const list =
    $("subjectList");

  if (!list) return;


  list.innerHTML = "";


  const subjects =
    getSubjects(
      state.category
    );


  const categoryName =
    getCategoryName(
      state.category
    );


  $("subjectTitle").textContent =
    state.language === "en"
      ? `${categoryName.en} Subjects`
      : `${categoryName.ne} का विषय`;


  $("subjectSubtitle").textContent =
    state.language === "en"
      ? "Choose a subject"
      : "विषय छान्नुहोस्";


  if (!subjects.length) {

    list.innerHTML =
      `<div class="empty-state">
        ${
          state.language === "en"
            ? "No subjects available yet."
            : "अहिले कुनै विषय उपलब्ध छैन।"
        }
      </div>`;

    return;
  }


  subjects.forEach(
    (subject, index) => {

      const button =
        document.createElement(
          "button"
        );

      button.type = "button";

      button.className =
        "selection-card";


      const icon =
        getSubjectIcon(subject);


      button.innerHTML = `
        <span class="selection-icon">
          ${icon}
        </span>

        <span class="selection-title">
          ${escapeHTML(subject)}
        </span>

        <span class="selection-arrow">
          →
        </span>
      `;


      button.addEventListener(
        "click",
        () => {

          state.subject =
            subject;

          renderChapters();

          showPage(
            "chapterPage"
          );

        }
      );


      list.appendChild(button);

    }
  );

}


/* =========================================================
   RENDER CHAPTERS
========================================================= */

function renderChapters() {

  const list =
    $("chapterList");

  if (!list) return;


  list.innerHTML = "";


  const chapters =
    getChapters(
      state.category,
      state.subject
    );


  $("chapterTitle").textContent =
    state.subject || "Chapters";


  $("chapterSubtitle").textContent =
    state.language === "en"
      ? "Choose a chapter"
      : "अध्याय छान्नुहोस्";


  if (!chapters.length) {

    list.innerHTML =
      `<div class="empty-state">
        ${
          state.language === "en"
            ? "No chapters available yet."
            : "अहिले कुनै chapter उपलब्ध छैन।"
        }
      </div>`;

    return;
  }


  chapters.forEach(
    chapter => {

      const button =
        document.createElement(
          "button"
        );

      button.type = "button";

      button.className =
        "selection-card";


      const count =
        getChapterQuestions(
          state.category,
          state.subject,
          chapter
        ).length;


      button.innerHTML = `
        <span class="selection-icon">
          📖
        </span>

        <span class="selection-content">

          <span class="selection-title">
            ${escapeHTML(chapter)}
          </span>

          <span class="selection-meta">
            ${count} ${
              state.language === "en"
                ? "questions available"
                : "प्रश्न उपलब्ध"
            }
          </span>

        </span>

        <span class="selection-arrow">
          →
        </span>
      `;


      button.addEventListener(
        "click",
        () => {

          state.chapter =
            chapter;

          startQuiz();

        }
      );


      list.appendChild(button);

    }
  );

}


/* =========================================================
   QUESTION ACCESS
========================================================= */

function getChapterQuestions(
  category,
  subject,
  chapter
) {

  const bank =
    getQuestionBank();


  if (category === "gk") {

    return (
      bank?.gk?.[chapter] ||
      []
    );

  }


  return (
    bank?.[category]?.[subject]?.[chapter] ||
    []
  );

}


/* =========================================================
   NO REPEAT SYSTEM
========================================================= */

function getUsedKey() {

  return [
    state.category,
    state.subject || "",
    state.chapter || ""
  ].join("::");

}


function loadUsedQuestions() {

  try {

    const all =
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEYS.used
        ) || "{}"
      );

    return all;

  } catch (error) {

    console.error(error);

    return {};

  }

}


function saveUsedQuestions(all) {

  localStorage.setItem(
    STORAGE_KEYS.used,
    JSON.stringify(all)
  );

}


function selectQuestions(
  available
) {

  const key =
    getUsedKey();


  if (!available.length) {
    return [];
  }


  const allUsed =
    loadUsedQuestions();


  let usedIds =
    Array.isArray(
      allUsed[key]
    )
      ? allUsed[key]
      : [];


  let unused =
    available.filter(
      question =>
        !usedIds.includes(
          question.id
        )
    );


  /*
    If the current cycle has fewer than
    10 remaining questions, start a
    new cycle after exhausting them.

    This prevents forced duplicates
    inside a cycle.
  */

  if (unused.length === 0) {

    usedIds = [];

    unused =
      [...available];

  }


  shuffle(unused);


  const selected =
    unused.slice(
      0,
      Math.min(
        QUESTIONS_PER_GAME,
        unused.length
      )
    );


  const newIds =
    selected.map(
      question =>
        question.id
    );


  usedIds = [
    ...new Set([
      ...usedIds,
      ...newIds
    ])
  ];


  /*
    Once all available questions have
    been used, reset the cycle.
  */

  if (
    usedIds.length >=
    available.length
  ) {

    allUsed[key] = [];

  } else {

    allUsed[key] =
      usedIds;

  }


  saveUsedQuestions(
    allUsed
  );


  return selected;

}


/* =========================================================
   START QUIZ
========================================================= */

function startQuiz() {

  const available =
    getChapterQuestions(
      state.category,
      state.subject,
      state.chapter
    );


  if (!available.length) {

    showToast(
      translations[
        state.language === "en"
          ? "en"
          : "ne"
      ].noQuestions
    );

    return;
  }


  state.questions =
    selectQuestions(
      available
    );


  if (!state.questions.length) {

    showToast(
      translations[
        state.language === "en"
          ? "en"
          : "ne"
      ].noQuestions
    );

    return;
  }


  state.currentQuestionIndex = 0;

  state.score = 0;

  state.correct = 0;

  state.wrong = 0;

  state.timeout = 0;

  state.answered = false;

  state.quizFinished = false;

  state.lastQuizKey =
    getUsedKey();


  updateScore();

  updateQuizInfo();

  showPage("quizPage");

  renderCurrentQuestion();

}


/* =========================================================
   QUIZ INFO
========================================================= */

function updateQuizInfo() {

  const parts = [];


  if (state.category) {
    parts.push(
      getCategoryName(
        state.category
      ).ne
    );
  }


  if (state.subject) {
    parts.push(
      state.subject
    );
  }


  if (state.chapter) {
    parts.push(
      state.chapter
    );
  }


  if ($("quizInfo")) {

    $("quizInfo").textContent =
      parts.join(" • ");

  }

}


/* =========================================================
   RENDER QUESTION
========================================================= */

function renderCurrentQuestion() {

  stopTimer();


  const question =
    state.questions[
      state.currentQuestionIndex
    ];


  if (!question) {

    finishQuiz();

    return;
  }


  state.answered = false;

  state.timeLeft =
    QUESTION_TIME;


  const total =
    state.questions.length;


  const current =
    state.currentQuestionIndex + 1;


  if ($("questionNumber")) {
    $("questionNumber").textContent =
      current;
  }


  if ($("questionTotal")) {
    $("questionTotal").textContent =
      total;
  }


  if ($("questionText")) {

    $("questionText").innerHTML =
      getText(
        question.q
      );

  }


  renderAnswers(question);

  updateProgress();

  updateTimerUI();

  startTimer();

}


/* =========================================================
   ANSWERS
========================================================= */

function renderAnswers(question) {

  const list =
    $("answerList");

  if (!list) return;


  list.innerHTML = "";


  const options =
    state.language === "ne"
      ? question.options.ne
      : state.language === "en"
        ? question.options.en
        : question.options.ne;


  options.forEach(
    (option, index) => {

      const button =
        document.createElement(
          "button"
        );

      button.type = "button";

      button.className =
        "answer-button";


      let content =
        "";


      if (state.language === "both") {

        const ne =
          question.options.ne?.[index] ||
          "";

        const en =
          question.options.en?.[index] ||
          "";

        content = `
          <span class="answer-ne">
            ${escapeHTML(ne)}
          </span>

          <span class="answer-en">
            ${escapeHTML(en)}
          </span>
        `;

      } else {

        content =
          escapeHTML(
            option
          );

      }


      button.innerHTML = `
        <span class="answer-letter">
          ${String.fromCharCode(65 + index)}
        </span>

        <span class="answer-content">
          ${content}
        </span>
      `;


      button.addEventListener(
        "click",
        () => {

          handleAnswer(
            index
          );

        }
      );


      list.appendChild(
        button
      );

    }
  );

}


/* =========================================================
   HANDLE ANSWER
========================================================= */

function handleAnswer(
  selectedIndex
) {

  if (state.answered) {
    return;
  }


  state.answered = true;

  stopTimer();


  const question =
    state.questions[
      state.currentQuestionIndex
    ];


  const buttons =
    document.querySelectorAll(
      ".answer-button"
    );


  buttons.forEach(
    button => {

      button.disabled = true;

    }
  );


  const correctIndex =
    Number(
      question.answer
    );


  if (
    selectedIndex ===
    correctIndex
  ) {

    state.correct += 1;

    state.score +=
      POINTS_PER_CORRECT;


    if (buttons[selectedIndex]) {

      buttons[selectedIndex]
        .classList.add(
          "correct"
        );

    }


    showFeedback(
      true,
      question
    );

  } else {

    state.wrong += 1;


    if (buttons[selectedIndex]) {

      buttons[selectedIndex]
        .classList.add(
          "wrong"
        );

    }


    if (buttons[correctIndex]) {

      buttons[correctIndex]
        .classList.add(
          "correct"
        );

    }


    showFeedback(
      false,
      question
    );

  }


  updateScore();

  updateNextButton();

}


/* =========================================================
   TIMEOUT
========================================================= */

function handleTimeout() {

  if (state.answered) {
    return;
  }


  state.answered = true;

  stopTimer();

  state.timeout += 1;


  const question =
    state.questions[
      state.currentQuestionIndex
    ];


  const correctIndex =
    Number(
      question.answer
    );


  const buttons =
    document.querySelectorAll(
      ".answer-button"
    );


  buttons.forEach(
    button => {

      button.disabled = true;

    }
  );


  if (buttons[correctIndex]) {

    buttons[correctIndex]
      .classList.add(
        "correct"
      );

  }


  showFeedback(
    null,
    question
  );


  updateNextButton();

}


/* =========================================================
   FEEDBACK
========================================================= */

function showFeedback(
  result,
  question
) {

  const explanation =
    $("explanation");

  if (!explanation) return;


  let title = "";


  if (result === true) {

    title =
      state.language === "en"
        ? "Correct Answer!"
        : "सही उत्तर!";

  } else if (result === false) {

    title =
      state.language === "en"
        ? "Wrong Answer!"
        : "गलत उत्तर!";

  } else {

    title =
      state.language === "en"
        ? "Time is up!"
        : "समय सकियो!";

  }


  explanation.innerHTML = `
    <strong>
      ${title}
    </strong>

    <p>
      ${getText(
        question.explanation
      )}
    </p>
  `;


  explanation.classList.remove(
    "hidden"
  );

}


/* =========================================================
   NEXT BUTTON
========================================================= */

function updateNextButton() {

  const button =
    $("nextBtn");

  if (!button) return;


  button.disabled =
    !state.answered;


  const isLast =
    state.currentQuestionIndex >=
    state.questions.length - 1;


  button.textContent =
    isLast
      ? (
          state.language === "en"
            ? "Finish ✓"
            : "समाप्त ✓"
        )
      : (
          state.language === "en"
            ? "Next →"
            : "अर्को →"
        );

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

  if (!state.answered) {
    return;
  }


  if (
    state.currentQuestionIndex >=
    state.questions.length - 1
  ) {

    finishQuiz();

    return;

  }


  state.currentQuestionIndex += 1;

  renderCurrentQuestion();

}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

  stopTimer();


  state.timeLeft =
    QUESTION_TIME;


  updateTimerUI();


  state.timer =
    setInterval(
      () => {

        state.timeLeft -= 1;

        updateTimerUI();


        if (
          state.timeLeft <=
          WARNING_SECONDS
        ) {

          playWarningSound();

        }


        if (
          state.timeLeft <= 0
        ) {

          handleTimeout();

        }

      },
      1000
    );

}


function stopTimer() {

  if (state.timer) {

    clearInterval(
      state.timer
    );

    state.timer = null;

  }

}


function updateTimerUI() {

  const timer =
    $("timer");

  if (!timer) return;


  timer.textContent =
    String(
      Math.max(
        0,
        state.timeLeft
      )
    );


  timer.classList.toggle(
    "warning",
    state.timeLeft <=
    WARNING_SECONDS
  );


  const progress =
    (
      state.timeLeft /
      QUESTION_TIME
    ) * 100;


  timer.style.setProperty(
    "--timer-progress",
    `${progress}%`
  );

}


/* =========================================================
   WARNING SOUND
========================================================= */

let audioContext = null;

function playWarningSound() {

  try {

    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }


    const AudioCtx =
      window.AudioContext ||
      window.webkitAudioContext;


    if (!AudioCtx) {
      return;
    }


    if (!audioContext) {

      audioContext =
        new AudioCtx();

    }


    if (
      audioContext.state ===
      "suspended"
    ) {

      audioContext.resume();

    }


    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();


    oscillator.type =
      "sine";


    oscillator.frequency.value =
      880;


    gain.gain.setValueAtTime(
      0.04,
      audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.12
    );


    oscillator.connect(
      gain
    );

    gain.connect(
      audioContext.destination
    );


    oscillator.start();

    oscillator.stop(
      audioContext.currentTime +
      0.12
    );

  } catch (error) {

    /*
      Audio is optional.
      Quiz should continue even if
      browser blocks audio.
    */

    console.warn(
      "Warning sound unavailable."
    );

  }

}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

  const bar =
    $("progressBar");

  if (!bar) return;


  const total =
    state.questions.length;


  const current =
    state.currentQuestionIndex + 1;


  const percent =
    total > 0
      ? (
          current /
          total
        ) * 100
      : 0;


  bar.style.width =
    `${percent}%`;

}


/* =========================================================
   SCORE
========================================================= */

function updateScore() {

  if ($("score")) {

    $("score").textContent =
      state.score;

  }

}


/* =========================================================
   FINISH QUIZ
========================================================= */

function finishQuiz() {

  if (state.quizFinished) {
    return;
  }


  state.quizFinished = true;


  stopTimer();


  const total =
    state.questions.length;


  const answered =
    state.correct +
    state.wrong +
    state.timeout;


  const percent =
    total > 0
      ? Math.round(
          (
            state.correct 
