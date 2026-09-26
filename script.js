/* =========================================================
   QUIZ NEPAL
   COMPLETE QUIZ SYSTEM

   Features:
   - Nepali / English / Both
   - Class 10
   - Class 11
   - General Knowledge
   - 10 Questions
   - 30 Seconds
   - Last 7 Seconds Warning
   - Correct / Wrong / Timeout
   - Score
   - No Repeat Cycle
   - Local Statistics
   - Google Login Structure
   - One vs One Room Code
========================================================= */


/* =========================================================
   FIREBASE
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


/*
  ==========================================================
  IMPORTANT

  Firebase Console बाट आफ्नो config यहाँ राख्नुहोस्।
  अहिले पनि quiz system Firebase बिना चल्छ।

  Example:

  const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  };
  ==========================================================
*/

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

const firebaseEnabled =
  firebaseConfig.apiKey !== "YOUR_API_KEY";


if (firebaseEnabled) {

  try {

    const app = initializeApp(firebaseConfig);

    auth = getAuth(app);

    googleProvider = new GoogleAuthProvider();

  } catch (error) {

    console.error(
      "Firebase Error:",
      error
    );

  }

}


/* =========================================================
   SETTINGS
========================================================= */

const QUESTIONS_PER_GAME = 10;

const QUESTION_TIME = 30;

const WARNING_SECONDS = 7;

const POINTS_PER_CORRECT = 10;


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  ne: {

    brandSubtitle:
      "सिक्नुहोस् • अभ्यास गर्नुहोस् • प्रतिस्पर्धा गर्नुहोस्",

    googleLogin:
      "Google Login",

    logout:
      "Logout",

    createdBy:
      "निर्माता",

    heroTitle:
      "नेपालकै Quiz Learning Platform",

    heroDescription:
      "कक्षा १०, कक्षा ११, सामान्य ज्ञान र One vs One Quiz मार्फत आफ्नो ज्ञान परीक्षण गर्नुहोस्।",

    startLearning:
      "सिकाइ सुरु गर्नुहोस्",

    gamesPlayed:
      "खेलेका Quiz",

    bestScore:
      "उत्कृष्ट Score",

    totalCorrect:
      "कुल सही",

    totalWrong:
      "कुल गलत",

    chooseQuiz:
      "आफ्नो Quiz छान्नुहोस्",

    chooseQuizDescription:
      "आफ्नो कक्षा वा विषय छानेर अभ्यास सुरु गर्नुहोस्।",

    back:
      "फिर्ता",

    subjects:
      "विषय",

    quit:
      "बाहिर निस्कनुहोस्",

    score:
      "Score",

    timeRemaining:
      "बाँकी समय",

    showHint:
      "Hint हेर्नुहोस्",

    chooseAnswer:
      "उत्तर छान्नुहोस्",

    next:
      "अर्को",

    quizCompleted:
      "Quiz पूरा भयो!",

    yourScore:
      "तपाईंको Score",

    correct:
      "सही",

    wrong:
      "गलत",

    timeout:
      "समय सकियो",

    accuracy:
      "Accuracy",

    tryAgain:
      "फेरि खेल्नुहोस्",

    home:
      "Home",

    oneVsOneDescription:
      "साथीहरूसँग Quiz खेल्नुहोस्।",

    createRoom:
      "Room बनाउनुहोस्",

    createRoomDescription:
      "नयाँ room बनाएर साथीलाई code पठाउनुहोस्।",

    createRoomButton:
      "Room बनाउनुहोस्",

    joinRoom:
      "Room Join गर्नुहोस्",

    joinRoomDescription:
      "साथीले दिएको room code राख्नुहोस्।",

    joinRoomButton:
      "Join गर्नुहोस्",

    roomCreated:
      "Room बन्यो",

    shareRoomCode:
      "यो code आफ्नो साथीलाई पठाउनुहोस्।",

    myProfile:
      "मेरो Profile",

    games:
      "Games",

    best:
      "Best",

    allRights:
      "सबै अधिकार सुरक्षित।",

    creator:
      "निर्माता",

    question:
      "प्रश्न",

    ready:
      "तयार",

    answered:
      "उत्तर दिइयो",

    correctAnswer:
      "सही उत्तर!",

    wrongAnswer:
      "गलत उत्तर!",

    timeOut:
      "समय सकियो!",

    hint:
      "Hint",

    roomCode:
      "Room Code",

    roomNotFound:
      "Room code भेटिएन।",

    roomJoined:
      "Room join भयो।",

    loginRequired:
      "पहिला Google Login गर्नुहोस्।",

    loginSuccess:
      "Google Login सफल भयो।",

    logoutSuccess:
      "Logout भयो।",

    quizQuit:
      "Quiz बन्द गरियो।",

    copied:
      "Room code copied।"

  },


  en: {

    brandSubtitle:
      "Learn • Practice • Compete",

    googleLogin:
      "Google Login",

    logout:
      "Logout",

    createdBy:
      "Created by",

    heroTitle:
      "Nepal's Quiz Learning Platform",

    heroDescription:
      "Test your knowledge through Class 10, Class 11, General Knowledge and One vs One quizzes.",

    startLearning:
      "Start Learning",

    gamesPlayed:
      "Games Played",

    bestScore:
      "Best Score",

    totalCorrect:
      "Total Correct",

    totalWrong:
      "Total Wrong",

    chooseQuiz:
      "Choose Your Quiz",

    chooseQuizDescription:
      "Choose your class or subject and start practicing.",

    back:
      "Back",

    subjects:
      "Subjects",

    quit:
      "Quit",

    score:
      "Score",

    timeRemaining:
      "Time Remaining",

    showHint:
      "Show Hint",

    chooseAnswer:
      "Choose an answer",

    next:
      "Next",

    quizCompleted:
      "Quiz Completed!",

    yourScore:
      "Your Score",

    correct:
      "Correct",

    wrong:
      "Wrong",

    timeout:
      "Timeout",

    accuracy:
      "Accuracy",

    tryAgain:
      "Try Again",

    home:
      "Home",

    oneVsOneDescription:
      "Play a quiz with your friends.",

    createRoom:
      "Create Room",

    createRoomDescription:
      "Create a room and send the code to your friend.",

    createRoomButton:
      "Create Room",

    joinRoom:
      "Join Room",

    joinRoomDescription:
      "Enter the room code given by your friend.",

    joinRoomButton:
      "Join",

    roomCreated:
      "Room Created",

    shareRoomCode:
      "Send this code to your friend.",

    myProfile:
      "My Profile",

    games:
      "Games",

    best:
      "Best",

    allRights:
      "All rights reserved.",

    creator:
      "Created by",

    question:
      "Question",

    ready:
      "Ready",

    answered:
      "Answered",

    correctAnswer:
      "Correct Answer!",

    wrongAnswer:
      "Wrong Answer!",

    timeOut:
      "Time is up!",

    hint:
      "Hint",

    roomCode:
      "Room Code",

    roomNotFound:
      "Room code not found.",

    roomJoined:
      "Room joined.",

    loginRequired:
      "Please login with Google first.",

    loginSuccess:
      "Google login successful.",

    logoutSuccess:
      "Logged out.",

    quizQuit:
      "Quiz closed.",

    copied:
      "Room code copied."

  }

};


/* =========================================================
   QUESTION BANK
========================================================= */


/*
  Question format:

  {
    id: "unique-id",

    q: {
      ne: "नेपाली प्रश्न",
      en: "English question"
    },

    options: {
      ne: [
        "उत्तर A",
        "उत्तर B",
        "उत्तर C",
        "उत्तर D"
      ],

      en: [
        "Answer A",
        "Answer B",
        "Answer C",
        "Answer D"
      ]
    },

    answer: 0,

    explanation: {
      ne: "व्याख्या",
      en: "Explanation"
    },

    hint: {
      ne: "Hint",
      en: "Hint"
    }
  }
*/


const questionBank = {

  class11: {

    Physics: {

      "Physical World": [

        {
          id: "11phy-pw-001",

          q: {
            ne: "भौतिकशास्त्रले मुख्य रूपमा केको अध्ययन गर्छ?",
            en: "What does physics mainly study?"
          },

          options: {
            ne: [
              "पदार्थ र ऊर्जा तथा तिनका अन्तरक्रिया",
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
            ne: "भौतिकशास्त्रले पदार्थ, ऊर्जा, गति, बल र तिनका अन्तरक्रियाको अध्ययन गर्छ।",
            en: "Physics studies matter, energy, motion, forces and their interactions."
          },

          hint: {
            ne: "प्रकृति र ऊर्जासँग सम्बन्धित विषय सोच्नुहोस्।",
            en: "Think about matter, energy and nature."
          }
        },

        {
          id: "11phy-pw-002",

          q: {
            ne: "SI प्रणालीमा लम्बाइको आधारभूत एकाइ कुन हो?",
            en: "What is the SI base unit of length?"
          },

          options: {
            ne: [
              "मीटर",
              "किलोग्राम",
              "सेकेन्ड",
              "एम्पियर"
            ],

            en: [
              "Metre",
              "Kilogram",
              "Second",
              "Ampere"
            ]
          },

          answer: 0,

          explanation: {
            ne: "SI प्रणालीमा लम्बाइको आधारभूत एकाइ metre (m) हो।",
            en: "The SI base unit of length is the metre (m)."
          },

          hint: {
            ne: "लम्बाइ नाप्ने SI base unit सम्झनुहोस्।",
            en: "Think of the SI base unit used to measure length."
          }
        }

      ]
    },


    Chemistry: {

      "Basic Concepts of Chemistry": [

        {
          id: "11chem-bc-001",

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
            ne: "Chemistry मा particles को amount मापन गर्ने unit सम्झनुहोस्।",
            en: "Think of the unit used to measure amount of particles."
          }
        }

      ]
    },


    Mathematics: {

      "Sets": [

        {
          id: "11math-set-001",

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
            ne: "Set A मा 1, 2 र 3 गरी तीनवटा elements छन्।",
            en: "Set A contains three elements: 1, 2 and 3."
          },

          hint: {
            ne: "Set भित्र भएका distinct elements गन्नुहोस्।",
            en: "Count the distinct elements inside the set."
          }
        }

      ]
    },


    Computer: {

      "Computer System": [

        {
          id: "11comp-cs-001",

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
            en: "Think of the main processing unit of a computer."
          }
        }

      ]
    }

  },


  /* =======================================================
     CLASS 10
  ======================================================= */

  class10: {

    Science: {

      "Force": [

        {
          id: "10sci-force-001",

          q: {
            ne: "बलको SI एकाइ कुन हो?",
            en: "What is the SI unit of force?"
          },

          options: {
            ne: [
              "Newton",
              "Joule",
              "Watt",
              "Pascal"
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
            ne: "बलको SI unit Newton हो।",
            en: "The SI unit of force is Newton."
          },

          hint: {
            ne: "Force को प्रसिद्ध SI unit सम्झनुहोस्।",
            en: "Think of the SI unit associated with force."
          }
        }

      ],


      "Energy": [

        {
          id: "10sci-energy-001",

          q: {
            ne: "ऊर्जाको SI एकाइ कुन हो?",
            en: "What is the SI unit of energy?"
          },

          options: {
            ne: [
              "Joule",
              "Newton",
              "Watt",
              "Volt"
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
            ne: "ऊर्जाको SI unit Joule हो।",
            en: "The SI unit of energy is Joule."
          },

          hint: {
            ne: "Work र energy को SI unit एउटै हुन्छ।",
            en: "Work and energy use the same SI unit."
          }
        }

      ]

    },


    Computer: {

      "Computer Fundamentals": [

        {
          id: "10comp-fund-001",

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
            ne: "CPU ले computer का instructions process गर्ने भएकाले यसलाई brain भनिन्छ।",
            en: "The CPU processes instructions, so it is commonly called the brain of the computer."
          },

          hint: {
            ne: "Computer को processing गर्ने भाग सम्झनुहोस्।",
            en: "Think about the part responsible for processing."
          }
        }

      ]

    },


    "Optional Mathematics": {

      "Algebra": [

        {
          id: "10opt-alg-001",

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
            ne: "5 लाई अर्को side मा लैजाँदा subtraction हुन्छ।",
            en: "Move 5 to the other side using subtraction."
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
          en: "Kathmandu is the capital of Nepal."
        },

        hint: {
          ne: "नेपालको राजनीतिक केन्द्र सम्झनुहोस्।",
          en: "Think of Nepal's political center."
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
          ne: "नेपालको पहाडी क्षेत्रमा प्रसिद्ध फूल सम्झनुहोस्।",
          en: "Think of the famous flower found in Nepal's hills."
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
          ne: "संघीय संरचनामा नेपालको प्रदेश संख्या सम्झनुहोस्।",
          en: "Think of Nepal's federal provincial structure."
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
          ne: "रातको आकाशमा पृथ्वी वरिपरि घुम्ने वस्तु सम्झनुहोस्।",
          en: "Think of the object that orbits Earth and is visible in the night sky."
        }
      }

    ]

  }

};


/* =========================================================
   STATE
========================================================= */

const state = {

  language: "both",

  currentScreen: "homeScreen",

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
   DOM HELPERS
========================================================= */

const $ = selector =>
  document.querySelector(selector);

const $$ = selector =>
  document.querySelectorAll(selector);


/* =========================================================
   LOCAL STORAGE
========================================================= */

const STORAGE_KEYS = {

  language:
    "quiz_nepal_language",

  stats:
    "quiz_nepal_stats",

  used:
    "quiz_nepal_used_questions"

};


function loadStats() {

  const defaultStats = {

    gamesPlayed: 0,

    bestScore: 0,

    totalCorrect: 0,

    totalWrong: 0,

    totalTimeout: 0

  };


  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEYS.stats
        )
      );

    return {
      ...defaultStats,
      ...(saved || {})
    };

  } catch {

    return defaultStats;

  }

}


function saveStats(stats) {

  localStorage.setItem(
    STORAGE_KEYS.stats,
    JSON.stringify(stats)
  );

}


function getUsedQuestions(key) {

  try {

    return JSON.parse(
      localStorage.getItem(
        `${STORAGE_KEYS.used}_${key}`
      )
    ) || [];

  } catch {

    return [];

  }

}


function saveUsedQuestions(key, ids) {

  localStorage.setItem(
    `${STORAGE_KEYS.used}_${key}`,
    JSON.stringify(ids)
  );

}


/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(key) {

  const lang =
    state.language === "ne"
      ? "ne"
      : "en";

  return (
    translations[lang][key] ||
    translations.en[key] ||
    key
  );

}


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage(language) {

  state.language = language;

  localStorage.setItem(
    STORAGE_KEYS.language,
    language
  );

  document.body.classList.remove(
    "lang-both",
    "lang-ne",
    "lang-en"
  );

  document.body.classList.add(
    `lang-${language}`
  );


  $$(".language-btn").forEach(
    button => {

      button.classList.toggle(
        "active",
        button.dataset.language === language
      );

    }
  );


  $$("[data-i18n]").forEach(
    element => {

      const key =
        element.dataset.i18n;

      const translated =
        translations[language === "ne" ? "ne" : "en"][key];

      if (translated) {

        element.textContent =
          translated;

      }

    }
  );


  updateStats();

}


/* =========================================================
   INITIAL LANGUAGE
========================================================= */

const savedLanguage =
  localStorage.getItem(
    STORAGE_KEYS.language
  ) || "both";

state.language = savedLanguage;


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(screenId) {

  $$(".screen").forEach(
    screen => {

      screen.classList.remove(
        "active"
      );

    }
  );


  const target =
    document.getElementById(
      screenId
    );

  if (!target) return;

  target.classList.add(
    "active"
  );

  state.currentScreen =
    screenId;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(
  message,
  icon = "ℹ️"
) {

  const toast =
    $("#toast");

  const toastMessage =
    $("#toastMessage");

  const toastIcon =
    $("#toastIcon");


  toastMessage.textContent =
    message;

  toastIcon.textContent =
    icon;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2500
    );

}


/* =========================================================
   UPDATE STATS
========================================================= */

function updateStats() {

  const stats =
    loadStats();


  $("#gamesPlayedStat").textContent =
    stats.gamesPlayed;

  $("#bestScoreStat").textContent =
    stats.bestScore;

  $("#correctStat").textContent =
    stats.totalCorrect;

  $("#wrongStat").textContent =
    stats.totalWrong;


  $("#profileGames").textContent =
    stats.gamesPlayed;

  $("#profileBest").textContent =
    stats.bestScore;

  $("#profileCorrect").textContent =
    stats.totalCorrect;

}


/* =========================================================
   CATEGORY DATA
========================================================= */

const categoryInfo = {

  class11: {

    title: {
      ne: "कक्षा ११",
      en: "Class 11"
    },

    description: {
      ne: "कक्षा ११ का विषयहरू अभ्यास गर्नुहोस्।",
      en: "Practice Class 11 subjects."
    }

  },


  class10: {

    title: {
      ne: "कक्षा १०",
      en: "Class 10"
    },

    description: {
      ne: "कक्षा १० का विषयहरू अभ्यास गर्नुहोस्।",
      en: "Practice Class 10 subjects."
    }

  },


  gk: {

    title: {
      ne: "सामान्य ज्ञान",
      en: "General Knowledge"
    },

    description: {
      ne: "लोकसेवा तथा सामान्य ज्ञानको अभ्यास।",
      en: "General knowledge and Lok Sewa practice."
    }

  }

};


/* =========================================================
   SUBJECT ICONS
========================================================= */

const subjectIcons = {

  Physics: "⚛️",

  Chemistry: "🧪",

  Mathematics: "📐",

  Computer: "💻",

  Science: "🔬",

  "Optional Mathematics": "📊",

  "Nepal General Knowledge": "🇳🇵",

  "World General Knowledge": "🌍"

};


/* =========================================================
   OPEN CATEGORY
========================================================= */

function openCategory(category) {

  if (category === "onevsone") {

    showScreen(
      "onevsoneScreen"
    );

    return;

  }


  if (!questionBank[category]) {

    showToast(
      "Category unavailable",
      "⚠️"
    );

    return;

  }


  state.category =
    category;


  const info =
    categoryInfo[category];


  $("#categoryTitle").textContent =
    state.language === "ne"
      ? info.title.ne
      : info.title.en;


  $("#categoryDescription").textContent =
    state.language === "ne"
      ? info.description.ne
      : info.description.en;


  renderSubjects();

  showScreen(
    "categoryScreen"
  );

}


/* =========================================================
   RENDER SUBJECTS
========================================================= */

function renderSubjects() {

  const grid =
    $("#subjectGrid");

  grid.innerHTML = "";


  const category =
    questionBank[
      state.category
    ];


  Object.keys(category)
    .forEach(subject => {

      const chapterCount =
        Object.keys(
          category[subject]
        ).length;


      const button =
        document.createElement(
          "button"
        );


      button.className =
        "subject-card";


      button.innerHTML = `

        <div class="subject-icon">
          ${subjectIcons[subject] || "📚"}
        </div>

        <div>
          <h3>${subject}</h3>

          <p>
            ${chapterCount}
            ${
              state.language === "ne"
                ? " अध्याय"
                : " chapters"
            }
          </p>
        </div>

        <div class="subject-arrow">
          →
        </div>

      `;


      button.addEventListener(
        "click",
        () => {

          openSubject(
            subject
          );

        }
      );


      grid.appendChild(
        button
      );

    });

}


/* =========================================================
   OPEN SUBJECT
========================================================= */

function openSubject(subject) {

  state.subject =
    subject;


  $("#chapterTitle").textContent =
    subject;


  $("#chapterDescription").textContent =
    state.language === "ne"
      ? "अध्याय छान्नुहोस् र Quiz सुरु गर्नुहोस्।"
      : "Choose a chapter and start the quiz.";


  renderChapters();

  showScreen(
    "chapterScreen"
  );

}


/* =========================================================
   GET CHAPTERS
========================================================= */

function getChapters() {

  if (
    state.category === "gk"
  ) {

    return questionBank.gk;

  }


  return questionBank[
    state.category
  ][
    state.subject
  ];

}


/* =========================================================
   RENDER CHAPTERS
========================================================= */

function renderChapters(
  searchTerm = ""
) {

  const grid =
    $("#chapterGrid");

  grid.innerHTML = "";


  const chapters =
    getChapters();


  let chapterNames =
    Object.keys(
      chapters
    );


  const search =
    searchTerm
      .trim()
      .toLowerCase();


  if (search) {

    chapterNames =
      chapterNames.filter(
        chapter =>
          chapter
            .toLowerCase()
            .includes(search)
      );

  }


  $("#chapterCount").textContent =
    `${chapterNames.length} ${
      state.language === "ne"
        ? "अध्याय"
        : "Chapters"
    }`;


  if (
    chapterNames.length === 0
  ) {

    grid.innerHTML = `

      <div class="empty-state">

        <div class="empty-icon">
          🔍
        </div>

        <h3>
          ${
            state.language === "ne"
              ? "अध्याय भेटिएन"
              : "No chapter found"
          }
        </h3>

      </div>

    `;

    return;

  }


  chapterNames.forEach(
    (chapter, index) => {

      const questions =
        chapters[chapter];


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "chapter-card";


      card.innerHTML = `

        <div class="chapter-number">
          ${index + 1}
        </div>

        <h3>
          ${chapter}
        </h3>

        <p>
          ${questions.length}
          ${
            state.language === "ne"
              ? " प्रश्न उपलब्ध"
              : " questions available"
          }
        </p>

      `;


      card.addEventListener(
        "click",
        () => {

          startQuiz(
            chapter
          );

        }
      );


      grid.appendChild(
        card
      );

    });

}


/* =========================================================
   QUESTION COLLECTION
========================================================= */

function getCurrentQuestionBank() {

  if (
    state.category === "gk"
  ) {

    return questionBank.gk[
      state.subject
    ];

  }


  return questionBank[
    state.category
  ][
    state.subject
  ][
    state.chapter
  ];

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

  const result =
    [...array];


  for (
    let i = result.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    [
      result[i],
      result[j]
    ] = [
      result[j],
      result[i]
    ];

  }


  return result;

}


/* =========================================================
   SELECT QUESTIONS
========================================================= */

function selectQuizQuestions(
  bank,
  key
) {

  let used =
    getUsedQuestions(
      key
    );


  let available =
    bank.filter(
      question =>
        !used.includes(
          question.id
        )
    );


  /*
    यदि available questions 0 भयो भने
    नयाँ cycle सुरु हुन्छ।
  */

  if (
    available.length === 0
  ) {

    used = [];

    available =
      [...bank];

  }


  /*
    यदि bank मा 10 भन्दा कम छन् भने
    available सबै प्रश्न प्रयोग हुन्छ।
  */

  const selected =
    shuffle(
      available
    ).slice(
      0,
      Math.min(
        QUESTIONS_PER_GAME,
        available.length
      )
    );


  const newUsed =
    [
      ...new Set([
        ...used,
        ...selected.map(
          question =>
            question.id
        )
      ])
    ];


  /*
    सबै bank सकिएपछि अर्को game मा
    नयाँ cycle सुरु हुन्छ।
  */

  if (
    newUsed.length >=
    bank.length
  ) {

    saveUsedQuestions(
      key,
      selected.map(
        question =>
          question.id
      )
    );

  } else {

    saveUsedQuestions(
      key,
      newUsed
    );

  }


  return selected;

}


/* =========================================================
   START QUIZ
========================================================= */

function startQuiz(
  chapter
) {

  state.chapter =
    chapter;


  const bank =
    getCurrentQuestionBank();


  if (
    !bank ||
    bank.length === 0
  ) {

    showToast(
      "यस chapter मा अहिले प्रश्न छैन।",
      "⚠️"
    );

    return;

  }


  const key =
    [
      state.category,
      state.subject,
      state.chapter
    ]
      .join("__")
      .replace(
        /\s+/g,
        "_"
      );


  state.questions =
    selectQuizQuestions(
      bank,
      key
    );


  state.currentQuestionIndex =
    0;

  state.score =
    0;

  state.correct =
    0;

  state.wrong =
    0;

  state.timeout =
    0;

  state.answered =
    false;

  state.quizFinished =
    false;


  $("#quizCategoryLabel").textContent =
    getCategoryDisplayName();


  $("#quizChapterLabel").textContent =
    state.chapter;


  $("#quizScore").textContent =
    "0";


  showScreen(
    "quizScreen"
  );


  renderQuestion();

}


/* =========================================================
   CATEGORY DISPLAY NAME
========================================================= */

function getCategoryDisplayName() {

  if (
    state.category === "class11"
  ) {

    return state.language === "ne"
      ? "कक्षा ११"
      : "Class 11";

  }


  if (
    state.category === "class10"
  ) {

    return state.language === "ne"
      ? "कक्षा १०"
      : "Class 10";

  }


  return state.language === "ne"
    ? "सामान्य ज्ञान"
    : "General Knowledge";

}


/* =========================================================
   RENDER QUESTION
========================================================= */

function renderQuestion() {

  clearTimer();


  const question =
    state.questions[
      state.currentQuestionIndex
    ];


  if (!question) {

    finishQuiz();

    return;

  }


  state.answered =
    false;


  $("#questionNumber").textContent =
    `${t("question")} ${
      state.currentQuestionIndex + 1
    } / ${
      state.questions.length
    }`;


  $("#questionStatus").textContent =
    t("ready");


  $("#quizProgress").style.width =
    `${
      (
        (state.currentQuestionIndex + 1) /
        state.questions.length
      ) * 100
    }%`;


  $("#questionTypeLabel").textContent =
    "MCQ";


  renderQuestionText(
    question
  );


  renderOptions(
    question
  );


  $("#questionFeedback")
    .classList.add(
      "hidden"
    );


  $("#questionFeedback")
    .textContent = "";


  $("#hintBox")
    .classList.add(
      "hidden"
    );


  $("#hintBox").textContent =
    "";


  $("#hintBtn").disabled =
    false;


  $("#nextQuestionBtn").disabled =
    true;


  $("#answerState").textContent =
    t("chooseAnswer");


  startTimer();

}


/* =========================================================
   QUESTION TEXT
========================================================= */

function renderQuestionText(
  question
) {

  const text =
    getLocalizedText(
      question.q
    );


  $("#questionText").textContent =
    text;

}


/* =========================================================
   LOCALIZED TEXT
========================================================= */

function getLocalizedText(
  object
) {

  if (
    state.language === "ne"
  ) {

    return object.ne;

  }


  if (
    state.language === "en"
  ) {

    return object.en;

  }


  return `${object.ne}\n\n${object.en}`;

}


/* =========================================================
   RENDER OPTIONS
========================================================= */

function renderOptions(
  question
) {

  const container =
    $("#questionOptions");

  container.innerHTML = "";


  const letters =
    ["A", "B", "C", "D"];


  question.options.ne.forEach(
    (_, index) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "answer-btn";


      const ne =
        question.options.ne[
          index
        ];

      const en =
        question.options.en[
          index
        ];


      let content = "";


      if (
        state.language === "ne"
      ) {

        content =
          ne;

      } else if (
        state.language === "en"
      ) {

        content =
          en;

      } else {

        content =
          `${ne}<br><small>${en}</small>`;

      }


      button.innerHTML = `

        <span class="answer-letter">
          ${letters[index]}
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


      container.appendChild(
        button
      );

    });

}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

  state.timeLeft =
    QUESTION_TIME;


  updateTimerUI();


  state.timer =
    setInterval(
      () => {

        state.timeLeft--;

        updateTimerUI();


        if (
          state.timeLeft <= 0
        ) {

          clearTimer();

          handleTimeout();

        }

      },
      1000
    );

}


/* =========================================================
   UPDATE TIMER
========================================================= */

function updateTimerUI() {

  const timerBox =
    $("#timerBox");

  const timerText =
    $("#timerText");


  timerText.textContent =
    state.timeLeft;


  timerBox.classList.remove(
    "warning",
    "danger"
  );


  if (
    state.timeLeft <=
    WARNING_SECONDS
  ) {

    timerBox.classList.add(
      "warning"
    );


    if (
      state.timeLeft <= 3
    ) {

      timerBox.classList.add(
        "danger"
      );

    }


    playWarningSound();

  }

}


/* =========================================================
   TIMER CLEAR
========================================================= */

function clearTimer() {

  if (
    state.timer
  ) {

    clearInterval(
      state.timer
    );

    state.timer =
      null;

  }

}


/* =========================================================
   WARNING SOUND
========================================================= */

let audioContext = null;


function playWarningSound() {

  /*
    Browser ले sound permission/user interaction
    माग्न सक्छ।

    प्रत्येक second मा loud sound नबजाउन
    छोटो beep मात्र राखिएको छ।
  */

  if (
    state.timeLeft >
    WARNING_SECONDS
  ) {

    return;

  }


  if (
    state.timeLeft % 2 !== 0
  ) {

    return;

  }


  try {

    if (
      !audioContext
    ) {

      audioContext =
        new (
          window.AudioContext ||
          window.webkitAudioContext
        )();

    }


    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();


    oscillator.type =
      "sine";

    oscillator.frequency.value =
      state.timeLeft <= 3
        ? 880
        : 620;


    gain.gain.value =
      0.05;


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

  } catch {

    // Sound unavailable.
  }

}


/* =========================================================
   ANSWER
========================================================= */

function handleAnswer(
  selectedIndex
) {

  if (
    state.answered
  ) {

    return;

  }


  state.answered =
    true;


  clearTimer();


  const question =
    state.questions[
      state.currentQuestionIndex
    ];


  const buttons =
    $$(".answer-btn");


  buttons.forEach(
    button => {

      button.disabled =
        true;

    }
  );


  const selectedButton =
    buttons[selectedIndex];


  const correctButton =
    buttons[
      question.answer
    ];


  if (
    selectedIndex ===
    question.answer
  ) {

    state.correct++;

    state.score +=
      POINTS_PER_CORRECT;


    selectedButton.classList.add(
      "correct"
    );


    $("#answerState").textContent =
      t("correctAnswer");


    showFeedback(
      question,
      true
    );


  } else {

    state.wrong++;


    selectedButton.classList.add(
      "incorrect"
    );


    correctButton.classList.add(
      "correct"
    );


    $("#answerState").textContent =
      t("wrongAnswer");


    showFeedback(
      question,
      false
    );

  }


  $("#quizScore").textContent =
    state.score;


  $("#questionStatus").textContent =
    t("answered");


  $("#nextQuestionBtn").disabled =
    false;

}


/* =========================================================
   TIMEOUT
========================================================= */

function handleTimeout() {

  if (
    state.answered
  ) {

    return;

  }


  state.answered =
    true;


  state.timeout++;


  const question =
    state.questions[
      state.currentQuestionIndex
    ];


  const buttons =
    $$(".answer-btn");


  buttons.forEach(
    button => {

      button.disabled =
        true;

    }
  );


  const correctButton =
    buttons[
      question.answer
    ];


  if (
    correctButton
  ) {

    correctButton.classList.add(
      "timeout-correct"
    );

  }


  $("#answerState").textContent =
    t("timeOut");


  $("#questionStatus").textContent =
    t("timeout");


  showFeedback(
    question,
    false,
    true
  );


  $("#nextQuestionBtn").disabled =
    false;

}


/* =========================================================
   FEEDBACK
========================================================= */

function showFeedback(
  question,
  isCorrect,
  isTimeout = false
) {

  const box =
    $("#questionFeedback");


  let prefix = "";


  if (
    isTimeout
  ) {

    prefix =
      state.language === "ne"
        ? "⏰ समय सकियो। "
        : "⏰ Time is up. ";

  } else if (
    isCorrect
  ) {

    prefix =
      state.language === "ne"
        ? "✅ सही! "
        : "✅ Correct! ";

  } else {

    prefix =
      state.language === "ne"
        ? "❌ गलत! "
        : "❌ Wrong! ";

  }


  box.textContent =
    prefix +
    getLocalizedText(
      question.explanation
    );


  box.classList.remove(
    "hidden"
  );

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

  if (
    !state.answered
  ) {

    return;

  }


  state.currentQuestionIndex++;


  if (
    state.currentQuestionIndex >=
    state.questions.length
  ) {

    finishQuiz();

    return;

  }


  renderQuestion();

}


/* =========================================================
   FINISH QUIZ
========================================================= */

function finishQuiz() {

  clearTimer();


  state.quizFinished =
    true;


  const stats =
    loadStats();


  stats.gamesPlayed++;


  stats.totalCorrect +=
    state.correct;


  stats.totalWrong +=
    state.wrong;


  stats.totalTimeout +=
    state.timeout;


  if (
    state.score >
    stats.bestScore
  ) {

    stats.bestScore =
      state.score;

  }


  saveStats(
    stats
  );


  showResult();

}


/* =========================================================
   RESULT
========================================================= */

function showResult() {

  const total =
    state.questions.length;


  const percentage =
    total > 0
      ? Math.round(
          (state.correct / total) *
          100
        )
      : 0;


  $("#finalScore").textContent =
    `${state.score} / ${
      total * POINTS_PER_CORRECT
    }`;


  $("#finalCorrect").textContent =
    state.correct;


  $("#finalWrong").textContent =
    state.wrong;


  $("#finalTimeout").textContent =
    state.timeout;


  $("#finalPercentage").textContent =
    `${percentage}%`;


  let icon =
    "🏆";


  let message =
    state.language === "ne"
      ? "राम्रो प्रयास!"
      : "Great effort!";


  if (
    percentage >= 80
  ) {

    icon =
      "🏆";

    message =
      state.language === "ne"
        ? "अति राम्रो! तपाईंले उत्कृष्ट गर्नुभयो।"
        : "Excellent! You performed very well.";

  } else if (
    percentage >= 50
  ) {

    icon =
      "👏";

    message =
      state.language === "ne"
        ? "राम्रो! अझै अभ्यास गर्दा अझ राम्रो हुन्छ।"
        : "Good job! More practice can make you even better.";

  } else {

    icon =
      "💪";

    message =
      state.language === "ne"
        ? "अभ्यास जारी राख्नुहोस्। तपाईं अझ राम्रो गर्न सक्नुहुन्छ।"
        : "Keep practicing. You can improve.";

  }


  $("#resultIcon").textContent =
    icon;


  $("#resultMessage").textContent =
    message;


  showScreen(
    "resultScreen"
  );


  updateStats();

}


/* =========================================================
   RETRY
========================================================= */

function retryQuiz() {

  if (
    state.chapter
  ) {

    startQuiz(
      state.chapter
    );

  }

}


/* =========================================================
   HINT
========================================================= */

function showHint() {

  const question =
    state.questions[
      state.currentQuestionIndex
    ];


  if (!question) {
    return;
  }


  $("#hintBox").textContent =
    getLocalizedText(
      question.hint
    );


  $("#hintBox").classList.remove(
    "hidden"
  );


  $("#hintBtn").disabled =
    true;

}


/* =========================================================
   HOME
========================================================= */

function goHome() {

  clearTimer();

  showScreen(
    "homeScreen"
  );

  updateStats();

}


/* =========================================================
   ONE VS ONE ROOM CODE
========================================================= */

function generateRoomCode() {

  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


  let code = "";


  for (
    let i = 0;
    i < 6;
    i++
  ) {

    code +=
      characters[
        Math.floor(
          Math.random() *
          characters.length
        )
      ];

  }


  return code;

}


/* =========================================================
   CREATE ROOM
========================================================= */

function createRoom() {

  const code =
    generateRoomCode();


  $("#generatedRoomCode")
    .textContent =
    code;


  $("#roomResult")
    .classList.remove(
      "hidden"
    );


  showToast(
    state.language === "ne"
      ? "Room तयार भयो।"
      : "Room created.",
    "⚔️"
  );

}


/* =========================================================
   JOIN ROOM
========================================================= */

function joinRoom() {

  const input =
    $("#roomCodeInput");


  const code =
    input.value
      .trim()
      .toUpperCase();


  if (
    code.length < 4
  ) {

    showToast(
      state.language === "ne"
        ? "सही room code राख्नुहोस्।"
        : "Enter a valid room code.",
      "⚠️"
    );

    return;

  }


  showToast(
    state.language === "ne"
      ? `Room ${code} join गर्न खोजिँदैछ।`
      : `Trying to join room ${code}.`,
    "🎮"
  );


  /*
    वास्तविक online multiplayer को लागि
    Firebase Realtime Database / Firestore
    जोड्नुपर्छ।

    यो UI/room-code structure त्यसका लागि
    तयार गरिएको हो।
  */

}


/* =========================================================
   COPY ROOM CODE
========================================================= */

async function copyRoomCode() {

  const code =
    $("#generatedRoomCode")
      .textContent;


  try {

    await navigator.clipboard.writeText(
      code
    );


    showToast(
      t("copied"),
      "📋"
    );

  } catch {

    showToast(
      code,
      "📋"
    );

  }

}


/* =========================================================
   GOOGLE LOGIN
========================================================= */

async function loginWithGoogle() {

  if (
    !auth ||
    !googleProvider
  ) {

    showToast(
      state.language === "ne"
        ? "पहिला Firebase Config राख्नुहोस्।"
        : "Please configure Firebase first.",
      "⚠️"
    );

    return;

  }


  try {

    await signInWithPopup(
      auth,
      googleProvider
    );


    showToast(
      t("loginSuccess"),
      "✅"
    );

  } catch (error) {

    console.error(
      error
    );


    showToast(
      error.message ||
      "Login failed",
      "❌"
    );

  }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutUser() {

  if (!auth) {

    return;

  }


  try {

    await signOut(
      auth
    );


    showToast(
      t("logoutSuccess"),
      "👋"
    );

  } catch (error) {

    console.error(
      error
    );

  }

}


/* =========================================================
   UPDATE USER UI
========================================================= */

function updateUserUI(
  user
) {

  const loginBtn =
    $("#googleLoginBtn");

  const logoutBtn =
    $("#logoutBtn");


  const name =
    $("#userName");

  const email =
    $("#userEmail");

  const avatar =
    $("#userAvatar");

  const profileName =
    $("#profileName");

  const profileEmail =
    $("#profileEmail");

  const profileAvatar =
    $("#profileAvatar");


  if (user) {

    loginBtn.classList.add(
      "hidden"
    );

    logoutBtn.classList.remove(
      "hidden"
    );


    name.textContent =
      user.displayName ||
      "Google User";


    email.textContent =
      user.email ||
      "";


    profileName.textContent =
      user.displayName ||
      "Google User";


    profileEmail.textContent =
      user.email ||
      "";


    if (
      user.photoURL
    ) {

      avatar.innerHTML =
        `<img src="${user.photoURL}" alt="Profile">`;

      profileAvatar.innerHTML =
        `<img src="${user.photoURL}" alt="Profile">`;

    }


  } else {

    loginBtn.classList.remove(
      "hidden"
    );

    logoutBtn.classList.add(
      "hidden"
    );


    name.textContent =
      "Guest User";


    email.textContent =
      state.language === "ne"
        ? "Progress save गर्न Login गर्नुहोस्"
        : "Login to save your progress";


    profileName.textContent =
      "Guest User";


    profileEmail.textContent =
      "Not logged in";


    avatar.textContent =
      "👤";


    profileAvatar.textContent =
      "👤";

  }

}


/* =========================================================
   EVENT LISTENERS
========================================================= */


/* Language */

$$(".language-btn")
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          applyLanguage(
            button.dataset.language
          );


          /*
            यदि chapter screen खुला छ भने
            language अनुसार पुनः render।
          */

          if (
            state.currentScreen ===
            "categoryScreen"
          ) {

            renderSubjects();

          }


          if (
            state.currentScreen ===
            "chapterScreen"
          ) {

            renderChapters(
              $("#chapterSearch").value
            );

          }


          if (
            state.currentScreen ===
            "quizScreen" &&
            !state.answered
          ) {

            renderQuestion();

          }

        }
      );

    }
  );


/* Home */

$("#startLearningBtn")
  .addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      $("#categoryTitle").textContent =
        state.language === "ne"
          ? "Quiz छान्नुहोस्"
          : "Choose Quiz";


      showToast(
        state.language === "ne"
          ? "तलबाट Quiz छान्नुहोस्।"
          : "Choose a quiz below.",
        "🎯"
      );

    }
  );


/* Category cards */

$$("[data-open-category]")
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          openCategory(
            button.dataset.openCategory
          );

        }
      );

    }
  );


/* Back home */

$$("[data-go-home]")
  .forEach(
    button => {

      button.addEventListener(
        "click",
        goHome
      );

    }
  );


/* Subjects back */

$("#backToSubjectsBtn")
  .addEventListener(
    "click",
    () => {

      openCategory(
        state.category
      );

    }
  );


/* Chapter search */

$("#chapterSearch")
  .addEventListener(
    "input",
    event => {

      renderChapters(
        event.target.value
      );

    }
  );


/* Quit quiz */

$("#quitQuizBtn")
  .addEventListener(
    "click",
    () => {

      const confirmed =
        window.confirm(
          state.language === "ne"
            ? "Quiz बन्द गर्ने?"
            : "Quit this quiz?"
        );


      if (
        confirmed
      ) {

        clearTimer();

        showToast(
          t("quizQuit"),
          "👋"
        );

        goHome();

      }

    }
  );


/* Next */

$("#nextQuestionBtn")
  .addEventListener(
    "click",
    nextQuestion
  );


/* Hint */

$("#hintBtn")
  .addEventListener(
    "click",
    showHint
  );


/* Retry */

$("#retryQuizBtn")
  .addEventListener(
    "click",
    retryQuiz
  );


/* Result home */

$("#backHomeFromResultBtn")
  .addEventListener(
    "click",
    goHome
  );


/* Create room */

$("#createRoomBtn")
  .addEventListener(
    "click",
    createRoom
  );


/* Join room */

$("#joinRoomBtn")
  .addEventListener(
    "click",
    joinRoom
  );


/* Copy room */

$("#copyRoomCodeBtn")
  .addEventListener(
    "click",
    copyRoomCode
  );


/* Google Login */

$("#googleLoginBtn")
  .addEventListener(
    "click",
    loginWithGoogle
  );


/* Logout */

$("#logoutBtn")
  .addEventListener(
    "click",
    logoutUser
  );


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

if (auth) {

  onAuthStateChanged(
    auth,
    user => {

      updateUserUI(
        user
      );

    }
  );

} else {

  updateUserUI(
    null
  );

}


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

function initializeAppUI() {

  applyLanguage(
    state.language
  );


  updateStats();


  $("#currentYear")
    .textContent =
    new Date()
      .getFullYear();


  showScreen(
    "homeScreen"
  );

}


initializeAppUI();


/* =========================================================
   PREVENT ACCIDENTAL PAGE EXIT DURING QUIZ
========================================================= */

window.addEventListener(
  "beforeunload",
  event => {

    if (
      state.currentScreen ===
      "quizScreen" &&
      !state.quizFinished
    ) {

      event.preventDefault();

      event.returnValue = "";

    }

  }
);


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    /*
      A / B / C / D बाट answer select
    */

    if (
      state.currentScreen !==
      "quizScreen"
    ) {

      return;

    }


    if (
      state.answered
    ) {

      return;

    }


    const keys = {
      a: 0,
      b: 1,
      c: 2,
      d: 3
    };


    const key =
      event.key.toLowerCase();


    if (
      Object.prototype.hasOwnProperty.call(
        keys,
        key
      )
    ) {

      handleAnswer(
        keys[key]
      );

    }

  }
);


/* =========================================================
   DEBUG HELPERS
========================================================= */

window.quizNepal = {

  state,

  questionBank,

  startQuiz,

  openCategory,

  goHome,

  updateStats

}; 
