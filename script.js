/* =========================================================
   QUIZ NEPAL - COMPLETE SCRIPT
   ========================================================= */

/* =========================================================
   FIREBASE IMPORT
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
   =========================================================
   IMPORTANT:
   आफ्नो Firebase Console बाट वास्तविक config यहाँ राख्नुहोस्।
   Config नराख्दा पनि quiz system चल्नेछ,
   तर Google Login चल्दैन।
   ========================================================= */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};


/* =========================================================
   FIREBASE INITIALIZATION
   ========================================================= */

let auth = null;
let googleProvider = null;

const firebaseEnabled =
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "YOUR_API_KEY" &&
  firebaseConfig.authDomain &&
  firebaseConfig.authDomain !== "YOUR_PROJECT.firebaseapp.com";

if (firebaseEnabled) {
  try {
    const app = initializeApp(firebaseConfig);

    auth = getAuth(app);

    googleProvider = new GoogleAuthProvider();

  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}


/* =========================================================
   QUIZ SETTINGS
   ========================================================= */

const QUESTIONS_PER_GAME = 10;

const QUESTION_TIME = 30;

const WARNING_SECONDS = 7;

const POINTS_PER_CORRECT = 10;


/* =========================================================
   LANGUAGE
   ========================================================= */

let languageMode =
  localStorage.getItem("quizNepalLanguage") || "both";


/* =========================================================
   STATE
   ========================================================= */

const state = {

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

  quizFinished: false

};


/* =========================================================
   QUESTION BANK
   =========================================================
   अहिले sample questions राखिएका छन्।

   पछि यही structure मा:
   - Class 10
   - Class 11
   - GK
   का धेरै questions थप्न सकिन्छ।
   ========================================================= */

const questionBank = {

  class10: {

    Science: {

      "Force": [

        {
          id: "10-sci-force-001",

          q: {
            ne: "बलको SI एकाइ कुन हो?",
            en: "What is the SI unit of force?"
          },

          options: {
            ne: [
              "न्युटन",
              "जुल",
              "वाट",
              "पास्कल"
            ],

            en: [
              "Newton",
              "Joule",
              "Watt",
              "Pascal"
            ]
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

      ],

      "Energy": [

        {
          id: "10-sci-energy-001",

          q: {
            ne: "ऊर्जाको SI एकाइ कुन हो?",
            en: "What is the SI unit of energy?"
          },

          options: {
            ne: [
              "जुल",
              "न्युटन",
              "वाट",
              "भोल्ट"
            ],

            en: [
              "Joule",
              "Newton",
              "Watt",
              "Volt"
            ]
          },

          answer: 0,

          explanation: {
            ne: "ऊर्जाको SI एकाइ Joule हो।",
            en: "The SI unit of energy is Joule."
          },

          hint: {
            ne: "Work र energy को SI unit एउटै हुन्छ।",
            en: "Work and energy have the same SI unit."
          }
        }

      ]

    },


    Computer: {

      "Computer Fundamentals": [

        {
          id: "10-computer-001",

          q: {
            ne: "Computer को brain भनेर सामान्यतया कुनलाई भनिन्छ?",
            en: "Which component is commonly called the brain of a computer?"
          },

          options: {
            ne: [
              "CPU",
              "Monitor",
              "Keyboard",
              "Printer"
            ],

            en: [
              "CPU",
              "Monitor",
              "Keyboard",
              "Printer"
            ]
          },

          answer: 0,

          explanation: {
            ne: "CPU ले instructions process गर्ने भएकाले यसलाई computer को brain भनिन्छ।",
            en: "The CPU processes instructions, so it is commonly called the brain of the computer."
          },

          hint: {
            ne: "Computer को मुख्य processing unit सम्झनुहोस्।",
            en: "Think of the main processing unit."
          }
        }

      ]

    },


    "Optional Mathematics": {

      "Algebra": [

        {
          id: "10-opt-algebra-001",

          q: {
            ne: "यदि x + 5 = 12 भने x को मान कति हुन्छ?",
            en: "If x + 5 = 12, what is the value of x?"
          },

          options: {
            ne: [
              "7",
              "5",
              "17",
              "6"
            ],

            en: [
              "7",
              "5",
              "17",
              "6"
            ]
          },

          answer: 0,

          explanation: {
            ne: "x + 5 = 12 भएकाले x = 12 - 5 = 7 हुन्छ।",
            en: "Since x + 5 = 12, x = 12 - 5 = 7."
          },

          hint: {
            ne: "5 लाई अर्को side मा लैजानुहोस्।",
            en: "Move 5 to the other side."
          }
        }

      ]

    }

  },


  /* =======================================================
     CLASS 11
     ======================================================= */

  class11: {

    Physics: {

      "Physical World": [

        {
          id: "11-physics-pw-001",

          q: {
            ne: "भौतिकशास्त्रले मुख्य रूपमा केको अध्ययन गर्छ?",
            en: "What does physics mainly study?"
          },

          options: {
            ne: [
              "पदार्थ, ऊर्जा र तिनका अन्तरक्रिया",
              "केवल जीवजन्तु",
              "केवल भाषा",
              "केवल इतिहास"
            ],

            en: [
              "Matter, energy and their interactions",
              "Only animals",
              "Only language",
              "Only history"
            ]
          },

          answer: 0,

          explanation: {
            ne: "भौतिकशास्त्रले पदार्थ, ऊर्जा, गति, बल तथा अन्तरक्रियाको अध्ययन गर्छ।",
            en: "Physics studies matter, energy, motion, forces and interactions."
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
          id: "11-chem-basic-001",

          q: {
            ne: "पदार्थको मात्रा मापन गर्ने SI एकाइ कुन हो?",
            en: "What is the SI unit of amount of substance?"
          },

          options: {
            ne: [
              "मोल",
              "किलोग्राम",
              "लिटर",
              "मिटर"
            ],

            en: [
              "Mole",
              "Kilogram",
              "Litre",
              "Metre"
            ]
          },

          answer: 0,

          explanation: {
            ne: "Amount of substance को SI unit mole हो।",
            en: "The SI unit of amount of substance is mole."
          },

          hint: {
            ne: "Chemistry मा amount of substance को unit सम्झनुहोस्।",
            en: "Think about the SI unit of amount of substance."
          }
        }

      ]

    },


    Mathematics: {

      "Sets": [

        {
          id: "11-math-sets-001",

          q: {
            ne: "यदि A = {1, 2, 3} भने A मा कति वटा elements छन्?",
            en: "If A = {1, 2, 3}, how many elements does A contain?"
          },

          options: {
            ne: [
              "3",
              "2",
              "4",
              "1"
            ],

            en: [
              "3",
              "2",
              "4",
              "1"
            ]
          },

          answer: 0,

          explanation: {
            ne: "A set मा 1, 2 र 3 गरी तीनवटा elements छन्।",
            en: "The set contains three elements."
          },

          hint: {
            ne: "Set भित्रका elements गन्नुहोस्।",
            en: "Count the elements in the set."
          }
        }

      ]

    },


    Computer: {

      "Computer System": [

        {
          id: "11-computer-system-001",

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
            en: "Think of the main processing unit."
          }
        }

      ]

    }

  },


  /* =======================================================
     GENERAL KNOWLEDGE
     ======================================================= */

  gk: {

    "Nepal General Knowledge": [

      {
        id: "gk-nepal-001",

        q: {
          ne: "नेपालको राजधानी कुन हो?",
          en: "What is the capital city of Nepal?"
        },

        options: {
          ne: [
            "काठमाडौं",
            "पोखरा",
            "विराटनगर",
            "नेपालगञ्ज"
          ],

          en: [
            "Kathmandu",
            "Pokhara",
            "Biratnagar",
            "Nepalgunj"
          ]
        },

        answer: 0,

        explanation: {
          ne: "नेपालको राजधानी काठमाडौं हो।",
          en: "Kathmandu is the capital city of Nepal."
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
          ne: [
            "लालीगुराँस",
            "कमल",
            "गुलाब",
            "सयपत्री"
          ],

          en: [
            "Rhododendron",
            "Lotus",
            "Rose",
            "Marigold"
          ]
        },

        answer: 0,

        explanation: {
          ne: "लालीगुराँस नेपालको राष्ट्रिय फूल हो।",
          en: "Rhododendron is the national flower of Nepal."
        },

        hint: {
          ne: "नेपालको प्रसिद्ध पहाडी फूल सम्झनुहोस्।",
          en: "Think of Nepal's famous hill flower."
        }
      },


      {
        id: "gk-nepal-003",

        q: {
          ne: "नेपालमा कति वटा प्रदेश छन्?",
          en: "How many provinces are there in Nepal?"
        },

        options: {
          ne: [
            "७",
            "५",
            "६",
            "८"
          ],

          en: [
            "7",
            "5",
            "6",
            "8"
          ]
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
          ne: [
            "चन्द्रमा",
            "सूर्य",
            "मंगल",
            "शुक्र"
          ],

          en: [
            "Moon",
            "Sun",
            "Mars",
            "Venus"
          ]
        },

        answer: 0,

        explanation: {
          ne: "चन्द्रमा पृथ्वीको प्राकृतिक satellite हो।",
          en: "The Moon is Earth's natural satellite."
        },

        hint: {
          ne: "रातको आकाशमा देखिने पृथ्वीको satellite सम्झनुहोस्।",
          en: "Think of Earth's natural satellite."
        }
      }

    ]

  }

};


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

  ne: {

    loginTitle:
      "Google Account बाट Login गर्नुहोस्",

    loginButton:
      "Google बाट Login",

    logout:
      "Logout",

    chooseQuiz:
      "आफ्नो Quiz छान्नुहोस्",

    class10:
      "कक्षा १०",

    class11:
      "कक्षा ११",

    gk:
      "सामान्य ज्ञान",

    one:
      "एक विरुद्ध एक",

    subjects:
      "विषय",

    chapters:
      "अध्याय",

    back:
      "← फिर्ता",

    exit:
      "← बाहिर",

    next:
      "अर्को →",

    correct:
      "सही",

    wrong:
      "गलत",

    timeout:
      "समय सकियो",

    home:
      "Home",

    playAgain:
      "फेरि खेल्नुहोस्",

    quizComplete:
      "Quiz पूरा भयो!",

    points:
      "Points",

    question:
      "प्रश्न",

    roomCreated:
      "Room बन्यो",

    copy:
      "Copy Code",

    join:
      "Join Room",

    loginRequired:
      "पहिला Google Login गर्नुहोस्।"

  },

  en: {

    loginTitle:
      "Login with your Google Account",

    loginButton:
      "Continue with Google",

    logout:
      "Logout",

    chooseQuiz:
      "Choose Your Quiz",

    class10:
      "Class 10",

    class11:
      "Class 11",

    gk:
      "General Knowledge",

    one:
      "One vs One",

    subjects:
      "Subjects",

    chapters:
      "Chapters",

    back:
      "← Back",

    exit:
      "← Exit",

    next:
      "Next →",

    correct:
      "Correct",

    wrong:
      "Wrong",

    timeout:
      "Timeout",

    home:
      "Home",

    playAgain:
      "Play Again",

    quizComplete:
      "Quiz Complete!",

    points:
      "Points",

    question:
      "Question",

    roomCreated:
      "Room Created",

    copy:
      "Copy Code",

    join:
      "Join Room",

    loginRequired:
      "Please login with Google first."

  },

  both: {

    loginTitle:
      "Google Account बाट Login गर्नुहोस् / Login with Google Account",

    loginButton:
      "Google बाट Login / Continue with Google",

    logout:
      "Logout",

    chooseQuiz:
      "आफ्नो Quiz छान्नुहोस् / Choose Your Quiz",

    class10:
      "कक्षा १० / Class 10",

    class11:
      "कक्षा ११ / Class 11",

    gk:
      "सामान्य ज्ञान / General Knowledge",

    one:
      "एक विरुद्ध एक / One vs One",

    subjects:
      "विषय / Subjects",

    chapters:
      "अध्याय / Chapters",

    back:
      "← फिर्ता / Back",

    exit:
      "← बाहिर / Exit",

    next:
      "अर्को / Next →",

    correct:
      "सही / Correct",

    wrong:
      "गलत / Wrong",

    timeout:
      "समय सकियो / Timeout",

    home:
      "Home",

    playAgain:
      "फेरि खेल्नुहोस् / Play Again",

    quizComplete:
      "Quiz पूरा भयो / Quiz Complete!",

    points:
      "Points",

    question:
      "प्रश्न / Question",

    roomCreated:
      "Room बन्यो / Room Created",

    copy:
      "Copy Code",

    join:
      "Join Room",

    loginRequired:
      "पहिला Google Login गर्नुहोस् / Please login with Google first."

  }

};


/* =========================================================
   DOM HELPER
   ========================================================= */

function $(id) {
  return document.getElementById(id);
}


/* =========================================================
   PAGE ELEMENTS
   ========================================================= */

const pages = [
  "loginPage",
  "homePage",
  "subjectPage",
  "chapterPage",
  "quizPage",
  "resultPage",
  "onePage"
];


/* =========================================================
   SHOW PAGE
   ========================================================= */

function showPage(pageId) {

  pages.forEach(id => {

    const page = $(id);

    if (!page) return;

    page.classList.remove("active");

    page.style.display = "none";

  });


  const target = $(pageId);

  if (!target) {
    console.error("Page not found:", pageId);
    return;
  }


  target.classList.add("active");

  target.style.display = "block";

  state.currentPage = pageId;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  const toast = $("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);
}


/* =========================================================
   LANGUAGE HELPERS
   ========================================================= */

function getText(value) {

  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  if (languageMode === "ne") {
    return value.ne || value.en || "";
  }

  if (languageMode === "en") {
    return value.en || value.ne || "";
  }

  return `${value.ne || ""}<br><span class="english-line">${value.en || ""}</span>`;
}


function setLanguage(mode) {

  if (!["ne", "en", "both"].includes(mode)) {
    mode = "both";
  }

  languageMode = mode;

  localStorage.setItem(
    "quizNepalLanguage",
    mode
  );

  updateLanguageButtons();

  updateStaticTexts();

  if (state.currentPage === "quizPage") {
    renderQuestion();
  }

  if (state.currentPage === "subjectPage") {
    renderSubjects();
  }

  if (state.currentPage === "chapterPage") {
    renderChapters();
  }
}


/* =========================================================
   LANGUAGE BUTTONS
   ========================================================= */

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
      languageMode === key
    );

  });
}


/* =========================================================
   STATIC TEXT
   ========================================================= */

function updateStaticTexts() {

  const t =
    translations[languageMode];

  if (!t) return;


  const loginTitle =
    document.querySelector(".login-title");

  if (loginTitle) {
    loginTitle.textContent = t.loginTitle;
  }


  const loginButton =
    $("googleLoginBtn");

  if (loginButton) {
    loginButton.querySelector("span:last-child").textContent =
      t.loginButton;
  }


  const logout =
    $("logoutBtn");

  if (logout) {
    logout.textContent = t.logout;
  }


  const chooseTitle =
    $("chooseTitle");

  if (chooseTitle) {
    chooseTitle.textContent = t.chooseQuiz;
  }


  const subjectTitle =
    $("subjectTitle");

  if (
    subjectTitle &&
    state.category
  ) {
    subjectTitle.textContent = t.subjects;
  }


  const chapterTitle =
    $("chapterTitle");

  if (
    chapterTitle &&
    state.subject
  ) {
    chapterTitle.textContent = t.chapters;
  }


  const quitButton =
    $("quitQuizBtn");

  if (quitButton) {
    quitButton.textContent = t.exit;
  }


  const nextButton =
    $("nextBtn");

  if (
    nextButton &&
    !state.answered
  ) {
    nextButton.textContent = t.next;
  }



 
