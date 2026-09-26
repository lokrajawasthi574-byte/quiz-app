/*
====================================================
QUIZ NEPAL
Google Login + 4 Categories + Quiz System
====================================================
*/

/* ==================================================
   FIREBASE CONFIG
   ==================================================
   तलको Firebase जानकारी आफ्नो Firebase project बाट
   राख्नुपर्छ।

   Google Login चलाउन Firebase Authentication मा
   Google provider enable गर्नुपर्छ।
================================================== */

import { initializeApp }
  from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain:
    "YOUR_PROJECT.firebaseapp.com",

  projectId:
    "YOUR_PROJECT_ID",

  storageBucket:
    "YOUR_PROJECT.appspot.com",

  messagingSenderId:
    "YOUR_MESSAGING_SENDER_ID",

  appId:
    "YOUR_APP_ID"

};


/* ==================================================
   FIREBASE START
================================================== */

let firebaseReady = false;

let auth = null;

let googleProvider = null;


try {

  if (
    firebaseConfig.apiKey !== "YOUR_API_KEY" &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID"
  ) {

    const app =
      initializeApp(firebaseConfig);

    auth = getAuth(app);

    googleProvider =
      new GoogleAuthProvider();

    firebaseReady = true;

  }

} catch (error) {

  console.error(
    "Firebase error:",
    error
  );

}


/* ==================================================
   DOM
================================================== */

const loginPage =
  document.getElementById("loginPage");

const homePage =
  document.getElementById("homePage");

const subjectPage =
  document.getElementById("subjectPage");

const chapterPage =
  document.getElementById("chapterPage");

const quizPage =
  document.getElementById("quizPage");

const resultPage =
  document.getElementById("resultPage");

const onePage =
  document.getElementById("onePage");


const googleLoginBtn =
  document.getElementById("googleLoginBtn");

const logoutBtn =
  document.getElementById("logoutBtn");

const loginMessage =
  document.getElementById("loginMessage");

const userEmail =
  document.getElementById("userEmail");


/* ==================================================
   PAGE NAVIGATION
================================================== */

function showPage(page) {

  document
    .querySelectorAll(".page")
    .forEach(p => {

      p.classList.remove("active");

    });

  page.classList.add("active");

  window.scrollTo(0, 0);
}


/* ==================================================
   GOOGLE LOGIN
================================================== */

async function googleLogin() {

  loginMessage.textContent = "";

  if (!firebaseReady) {

    loginMessage.textContent =
      "पहिले Firebase Config राख्नुहोस्।";

    showToast(
      "Firebase setup पूरा भएको छैन।"
    );

    return;
  }


  try {

    googleLoginBtn.disabled = true;

    googleLoginBtn.innerHTML =
      "Google Login हुँदैछ...";


    await signInWithPopup(
      auth,
      googleProvider
    );


  } catch (error) {

    console.error(error);

    loginMessage.textContent =
      "Google Login हुन सकेन।";

    showToast(
      error.message || "Login failed"
    );


    googleLoginBtn.disabled = false;

    googleLoginBtn.innerHTML =
      '<span class="google-g">G</span>' +
      '<span>Continue with Google</span>';

  }

}


googleLoginBtn
  .addEventListener(
    "click",
    googleLogin
  );


/* ==================================================
   AUTH STATE
================================================== */

if (firebaseReady) {

  onAuthStateChanged(
    auth,
    user => {

      if (user) {

        openHome(user);

      } else {

        showPage(loginPage);

      }

    }
  );

} else {

  /*
    Firebase config नभएसम्म
    Login page नै देखिन्छ।
  */

  showPage(loginPage);

}


/* ==================================================
   OPEN HOME
================================================== */

function openHome(user) {

  showPage(homePage);

  if (user) {

    userEmail.textContent =
      user.email || "";

  }

}


/* ==================================================
   LOGOUT
================================================== */

logoutBtn.addEventListener(
  "click",
  async () => {

    if (auth && firebaseReady) {

      try {

        await signOut(auth);

        showPage(loginPage);

      } catch (error) {

        console.error(error);

      }

    } else {

      showPage(loginPage);

    }

  }
);


/* ==================================================
   LANGUAGE
================================================== */

const neBtn =
  document.getElementById("neBtn");

const enBtn =
  document.getElementById("enBtn");

const bothBtn =
  document.getElementById("bothBtn");


function setLanguage(mode) {

  document.body.classList.remove(
    "lang-ne",
    "lang-en"
  );


  if (mode === "ne") {

    document.body.classList.add(
      "lang-ne"
    );

  }


  if (mode === "en") {

    document.body.classList.add(
      "lang-en"
    );

  }


  document
    .querySelectorAll(".language-btn")
    .forEach(btn =>
      btn.classList.remove("active")
    );


  if (mode === "ne") {

    neBtn.classList.add("active");

  } else if (mode === "en") {

    enBtn.classList.add("active");

  } else {

    bothBtn.classList.add("active");

  }


  localStorage.setItem(
    "quizLanguage",
    mode
  );

}


neBtn.addEventListener(
  "click",
  () => setLanguage("ne")
);

enBtn.addEventListener(
  "click",
  () => setLanguage("en")
);

bothBtn.addEventListener(
  "click",
  () => setLanguage("both")
);


const savedLanguage =
  localStorage.getItem(
    "quizLanguage"
  ) || "ne";

setLanguage(savedLanguage);


/* ==================================================
   CURRICULUM
================================================== */

const curriculum = {

  class10: {

    Science: [
      "Scientific Study",
      "Living Beings",
      "Biodiversity",
      "Body Systems",
      "Force and Motion",
      "Energy",
      "Electricity",
      "Light",
      "Heat",
      "Matter"
    ],

    Computer: [
      "Computer Fundamentals",
      "Operating System",
      "Internet",
      "Networking",
      "Database",
      "Programming",
      "Cyber Security"
    ],

    "Optional Mathematics": [
      "Sets",
      "Algebra",
      "Geometry",
      "Trigonometry",
      "Statistics",
      "Probability"
    ]

  },


  class11: {

    Physics: [
      "Physical World",
      "Units and Measurements",
      "Motion in a Straight Line",
      "Motion in a Plane",
      "Laws of Motion",
      "Work Energy and Power",
      "System of Particles",
      "Gravitation",
      "Mechanical Properties of Solids",
      "Mechanical Properties of Fluids",
      "Thermal Properties",
      "Thermodynamics",
      "Kinetic Theory",
      "Oscillations",
      "Waves"
    ],

    Chemistry: [
      "Basic Concepts of Chemistry",
      "Atomic Structure",
      "Periodic Table",
      "Chemical Bonding",
      "States of Matter",
      "Thermodynamics",
      "Equilibrium",
      "Redox Reaction",
      "Organic Chemistry",
      "Hydrocarbons"
    ],

    Mathematics: [
      "Sets",
      "Relations and Functions",
      "Sequence and Series",
      "Quadratic Equation",
      "Complex Numbers",
      "Permutation and Combination",
      "Binomial Theorem",
      "Coordinate Geometry",
      "Straight Line",
      "Trigonometry",
      "Statistics",
      "Probability"
    ],

    Computer: [
      "Computer System",
      "Number System",
      "Boolean Algebra",
      "Computer Network",
      "Operating System",
      "Database",
      "Programming",
      "Web Technology",
      "Cyber Security"
    ]

  },

  gk: {

    "General Knowledge": [
      "Nepal GK",
      "World GK",
      "Science GK",
      "History GK",
      "Geography GK",
      "Current Affairs"
    ]

  }

};


/* ==================================================
   QUESTION HELPER
================================================== */

function makeQuestion(
  id,
  ne,
  en,
  neOptions,
  enOptions,
  answer,
  explanation = ""
) {

  return {

    id,

    question: {
      ne,
      en
    },

    options: {
      ne: neOptions,
      en: enOptions
    },

    answer,

    explanation

  };

}


/* ==================================================
   QUESTION BANK
   यो seed/sample bank हो।
   पछि प्रत्येक chapter मा 200 questions थप्न
   यही format प्रयोग गर्न सकिन्छ।
================================================== */

const questionBank = {};


/* -------------------------
   CLASS 10 SCIENCE
------------------------- */

questionBank.class10 = {

  Science: {

    "Scientific Study": [

      makeQuestion(
        "10-sci-001",
        "वैज्ञानिक अध्ययनमा परिकल्पना भनेको के हो?",
        "What is a hypothesis in scientific study?",
        [
          "परीक्षण गर्न सकिने अनुमान",
          "अन्तिम निष्कर्ष",
          "मापनको एकाइ",
          "उपकरण"
        ],
        [
          "A testable prediction",
          "Final conclusion",
          "Unit of measurement",
          "Instrument"
        ],
        0
      ),

      makeQuestion(
        "10-sci-002",
        "SI पद्धतिमा लम्बाइको एकाइ कुन हो?",
        "What is the SI unit of length?",
        [
          "मिटर",
          "लिटर",
          "सेकेन्ड",
          "किलोग्राम"
        ],
        [
          "Metre",
          "Litre",
          "Second",
          "Kilogram"
        ],
        0
      )

    ],

    "Living Beings": [

      makeQuestion(
        "10-sci-003",
        "जीवको आधारभूत एकाइ कुन हो?",
        "What is the basic unit of life?",
        [
          "तन्तु",
          "कोष",
          "अंग",
          "जीव"
        ],
        [
          "Tissue",
          "Cell",
          "Organ",
          "Organism"
        ],
        1
      )

    ],

    "Force and Motion": [

      makeQuestion(
        "10-sci-004",
        "बलको SI एकाइ कुन हो?",
        "What is the SI unit of force?",
        [
          "जुल",
          "न्युटन",
          "वाट",
          "पास्कल"
        ],
        [
          "Joule",
          "Newton",
          "Watt",
          "Pascal"
        ],
        1
      )

    ]

  },


  Computer: {

    "Computer Fundamentals": [

      makeQuestion(
        "10-com-001",
        "CPU को पूरा रूप के हो?",
        "What is the full form of CPU?",
        [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Program Utility",
          "Control Processing User"
        ],
        [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Program Utility",
          "Control Processing User"
        ],
        0
      )

    ]

  },


  "Optional Mathematics": {

    Sets: [

      makeQuestion(
        "10-opt-001",
        "सेट भन्नाले के बुझिन्छ?",
        "What is a set?",
        [
          "स्पष्ट रूपमा परिभाषित वस्तुहरूको संग्रह",
          "एउटा संख्या",
          "एउटा रेखा",
          "एउटा कोण"
        ],
        [
          "A well-defined collection of objects",
          "A number",
          "A line",
          "An angle"
        ],
        0
      )

    ]

  }

};


/* -------------------------
   CLASS 11
------------------------- */

questionBank.class11 = {

  Physics: {

    "Physical World": [

      makeQuestion(
        "11-phy-001",
        "भौतिकशास्त्रले मुख्य रूपमा के अध्ययन गर्छ?",
        "What does physics mainly study?",
        [
          "पदार्थ र ऊर्जाका प्राकृतिक घटनाहरू",
          "केवल जीवजन्तु",
          "केवल भाषा",
          "केवल इतिहास"
        ],
        [
          "Natural phenomena involving matter and energy",
          "Only animals",
          "Only language",
          "Only history"
        ],
        0
      )

    ],

    "Units and Measurements": [

      makeQuestion(
        "11-phy-002",
        "बलको SI एकाइ कुन हो?",
        "What is the SI unit of force?",
        [
          "जुल",
          "न्युटन",
          "वाट",
          "कुलम्ब"
        ],
        [
          "Joule",
          "Newton",
          "Watt",
          "Coulomb"
        ],
        1
      )

    ],

    "Motion in a Straight Line": [

      makeQuestion(
        "11-phy-003",
        "वेगको SI एकाइ कुन हो?",
        "What is the SI unit of velocity?",
        [
          "m/s",
          "m/s²",
          "kg/m",
          "N/m"
        ],
        [
          "m/s",
          "m/s²",
          "kg/m",
          "N/m"
        ],
        0
      )

    ]

  },


  Chemistry: {

    "Basic Concepts of Chemistry": [

      makeQuestion(
        "11-chem-001",
        "मोल भनेको के हो?",
        "What is a mole?",
        [
          "पदार्थको मात्रा मापन गर्ने एकाइ",
          "द्रव्यमानको एकाइ",
          "लम्बाइको एकाइ",
          "समयको एकाइ"
        ],
        [
          "A unit for measuring amount of substance",
          "Unit of mass",
          "Unit of length",
          "Unit of time"
        ],
        0
      )

    ],

    "Atomic Structure": [

      makeQuestion(
        "11-chem-002",
        "इलेक्ट्रोनको आवेश कस्तो हुन्छ?",
        "What is the charge of an electron?",
        [
          "धनात्मक",
          "ऋणात्मक",
          "तटस्थ",
          "दुईवटै"
        ],
        [
          "Positive",
          "Negative",
          "Neutral",
          "Both"
        ],
        1
      )

    ]

  },


  Mathematics: {

    Sets: [

      makeQuestion(
        "11-math-001",
        "रिक्त सेटमा कति वटा सदस्य हुन्छन्?",
        "How many elements does an empty set have?",
        [
          "०",
          "१",
          "२",
          "अनन्त"
        ],
        [
          "0",
          "1",
          "2",
          "Infinite"
        ],
        0
      )

    ],

    "Sequence and Series": [

      makeQuestion(
        "11-math-002",
        "अंकगणितीय श्रेणीमा common difference लाई के भनिन्छ?",
        "What is the common difference in an arithmetic progression?",
        [
          "लगातार दुई पदको अन्तर",
          "लगातार दुई पदको गुणन",
          "पहिलो पद",
          "अन्तिम पद"
        ],
        [
          "Difference between consecutive terms",
          "Product of consecutive terms",
          "First term",
          "Last term"
        ],
        0
      )

    ]

  },


  Computer: {

    "Computer System": [

      makeQuestion(
        "11-com-001",
        "RAM कस्तो memory हो?",
        "What type of memory is RAM?",
        [
          "Volatile memory",
          "Permanent memory",
          "Optical memory",
          "Paper memory"
        ],
        [
          "Volatile memory",
          "Permanent memory",
          "Optical memory",
          "Paper memory"
        ],
        0
      )

    ]

  }

};


/* -------------------------
   GENERAL KNOWLEDGE
------------------------- */

questionBank.gk = {

  "General Knowledge": {

    "Nepal GK": [

      makeQuestion(
        "gk-nep-001",
        "नेपालको राजधानी कुन हो?",
        "What is the capital of Nepal?",
        [
          "पोखरा",
          "काठमाडौं",
          "विराटनगर",
          "नेपालगञ्ज"
        ],
        [
          "Pokhara",
          "Kathmandu",
          "Biratnagar",
          "Nepalgunj"
        ],
        1
      ),

      makeQuestion(
        "gk-nep-002",
        "नेपालको राष्ट्रिय फूल कुन हो?",
        "What is the national flower of Nepal?",
        [
          "गुलाब",
          "लालीगुराँस",
          "कमल",
          "सयपत्री"
        ],
        [
          "Rose",
          "Rhododendron",
          "Lotus",
          "Marigold"
        ],
        1
      )

    ],

    "World GK": [

      makeQuestion(
        "gk-world-001",
        "विश्वको सबैभन्दा ठूलो महासागर कुन हो?",
        "Which is the largest ocean in the world?",
        [
          "Atlantic Ocean",
          "Indian Ocean",
          "Pacific Ocean",
          "Arctic Ocean"
        ],
        [
          "Atlantic Ocean",
          "Indian Ocean",
          "Pacific Ocean",
          "Arctic Ocean"
        ],
        2
      )

    ],

    "Science GK": [

      makeQuestion(
        "gk-sci-001",
        "पानीको रासायनिक सूत्र के हो?",
        "What is the chemical formula of water?",
        [
          "CO₂",
          "H₂O",
          "O₂",
          "NaCl"
        ],
        [
          "CO₂",
          "H₂O",
          "O₂",
          "NaCl"
        ],
        1
      )

    ]

  }

};


/* ==================================================
   CURRENT QUIZ STATE
================================================== */

let currentCategory = "";

let currentSubject = "";

let currentChapter = "";

let currentQuestions = [];

let currentQuestionIndex = 0;

let score = 0;

let correct = 0;

let wrong = 0;

let timeout = 0;

let timer = null;

let timeLeft = 30;

let questionLocked = false;


/* ==================================================
   CATEGORY CLICK
================================================== */

document
  .querySelectorAll(".category-card")
  .forEach(card => {

    card.addEventListener(
      "click",
      () => {

        const category =
          card.dataset.category;

        openCategory(category);

      }
    );

  });


function openCategory(category) {

  currentCategory = category;


  if (category === "one") {

    showPage(onePage);

    return;

  }


  showSubjects(category);

}


/* ==================================================
   SUBJECT PAGE
================================================== */

function showSubjects(category) {

  const list =
    document.getElementById(
      "subjectList"
    );

  list.innerHTML = "";


  let subjects =
    Object.keys(
      curriculum[category] || {}
    );


  if (!subjects.length) {

    showToast(
      "यो category मा subjects तयार गरिएको छैन।"
    );

    return;

  }


  subjects.forEach(subject => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "selection-button";


    button.innerHTML = `

      <span class="selection-ne">
        ${subject}
      </span>

      <span class="selection-en">
        ${subject}
      </span>

    `;


    button.addEventListener(
      "click",
      () => {

        currentSubject =
          subject;

        showChapters(
          category,
          subject
        );

      }
    );


    list.appendChild(button);

  });


  document.getElementById(
    "subjectTitle"
  ).textContent =
    category === "class10"
      ? "कक्षा १० - Subjects"
      : category === "class11"
        ? "कक्षा ११ - Subjects"
        : "General Knowledge";


  showPage(subjectPage);

}


/* ==================================================
   CHAPTER PAGE
================================================== */

function showChapters(
  category,
  subject
) {

  const list =
    document.getElementById(
      "chapterList"
    );

  list.innerHTML = "";


  const chapters =
    curriculum[category][subject] || [];


  chapters.forEach(chapter => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "selection-button";


    button.innerHTML = `

      <span class="selection-ne">
        ${chapter}
      </span>

      <span class="selection-en">
        ${chapter}
      </span>

    `;


    button.addEventListener(
      "click",
      () => {

        currentChapter =
          chapter;

        startQuiz(
          category,
          subject,
          chapter
        );

      }
    );


    list.appendChild(button);

  });


  document.getElementById(
    "chapterTitle"
  ).textContent =
    subject;


  showPage(chapterPage);

}


/* ==================================================
   QUESTION GETTER
================================================== */

function getQuestions(
  category,
  subject,
  chapter
) {

  let questions = [];


  if (
    questionBank[category] &&
    questionBank[category][subject] &&
    questionBank[category][subject][chapter]
  ) {

    questions =
      questionBank
        [category]
        [subject]
        [chapter];

  }


  return questions;

}


/* ==================================================
   SHUFFLE
================================================== */

function shuffle(array) {

  const copy =
    [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      copy[i],
      copy[j]
    ] =
    [
      copy[j],
      copy[i]
    ];

  }

  return copy;

}


/* ==================================================
   START QUIZ
================================================== */

function startQuiz(
  category,
  subject,
  chapter
) {

  const bank =
    getQuestions(
      category,
      subject,
      chapter
    );


  if (!bank.length) {

    showToast(
      "यो chapter मा अहिले प्रश्नहरू थपिएको छैन।"
    );

    return;

  }


  /*
    Production मा हरेक chapter मा
    200 questions राख्न सकिन्छ।
  */

  currentQuestions =
    shuffle(bank)
      .slice(
        0,
        Math.min(10, bank.length)
      );


  currentQuestionIndex = 0;

  score = 0;

  correct = 0;

  wrong = 0;

  timeout = 0;


  document.getElementById(
    "score"
  ).textContent = "0";


  document.getElementById(
    "quizInfo"
  ).textContent =
    `${subject} • ${chapter}`;


  document.getElementById(
    "questionTotal"
  ).textContent =
    currentQuestions.length;


  showPage(quizPage);

  renderQuestion();

}


/* ==================================================
   RENDER QUESTION
================================================== */

function renderQuestion() {

  clearTimer();


  const question =
    currentQuestions[
      currentQuestionIndex
    ];


  if (!question) {

    finishQuiz();

    return;

  }


  questionLocked = false;


  timeLeft = 30;


  const number =
    currentQuestionIndex + 1;


  document.getElementById(
    "questionNumber"
  ).textContent =
    number;


  document.getElementById(
    "timer"
  ).textContent =
    timeLeft;


  document.getElementById(
    "timer"
  ).classList.remove(
    "warning"
  );


  document.getElementById(
    "progressBar"
  ).style.width =
    (
      number /
      currentQuestions.length *
      100
    ) + "%";


  const qBox =
    document.getElementById(
      "questionText"
    );


  qBox.innerHTML = `

    <span class="question-ne">
      ${escapeHTML(
        question.question.ne
      )}
    </span>

    <span class="question-en">
      ${escapeHTML(
        question.question.en
      )}
    </span>

  `;


  const answerList =
    document.getElementById(
      "answerList"
    );


  answerList.innerHTML = "";


  question.options.ne.forEach(
    (neOption, index) => {

      const button =
        document.createElement(
          "button"
        );

      button.type = "button";

      button.className =
        "answer-button";


      button.innerHTML = `

        <span>
          ${String.fromCharCode(65 + index)}.
          ${escapeHTML(neOption)}
        </span>

        <span class="answer-en">
          ${escapeHTML(
            question.options.en[index]
          )}
        </span>

      `;


      button.addEventListener(
        "click",
        () => {

          selectAnswer(
            index,
            question.answer
          );

        }
      );


      answerList.appendChild(
        button
      );

    }
  );


  document.getElementById(
    "explanation"
  ).classList.add(
    "hidden"
  );


  const nextBtn =
    document.getElementById(
      "nextBtn"
    );

  nextBtn.disabled = true;

  nextBtn.textContent =
    currentQuestionIndex ===
    currentQuestions.length - 1
      ? "See Result →"
      : "Next →";


  startTimer();

}


/* ==================================================
   ANSWER
================================================== */

function selectAnswer(
  selected,
  correctAnswer
) {

  if (questionLocked) {
    return;
  }


  questionLocked = true;


  clearTimer();


  const buttons =
    document.querySelectorAll(
      ".answer-button"
    );


  buttons.forEach(
    (button, index) => {

      button.disabled = true;


      if (
        index === correctAnswer
      ) {

        button.classList.add(
          "correct"
        );

      }


      if (
        index === selected &&
        selected !== correctAnswer
      ) {

        button.classList.add(
          "wrong"
        );

      }

    }
  );


  if (
    selected === correctAnswer
  ) {

    correct++;

    score += 10;

  } else {

    wrong++;

  }


  document.getElementById(
    "score"
  ).textContent =
    score;


  showExplanation();


  document.getElementById(
    "nextBtn"
  ).disabled = false;

}


/* ==================================================
   TIMEOUT
================================================== */

function handleTimeout() {

  if (questionLocked) {
    return;
  }


  questionLocked = true;


  timeout++;


  const question =
    currentQuestions[
      currentQuestionIndex
    ];


  const buttons =
    document.querySelectorAll(
      ".answer-button"
    );


  buttons.forEach(
    (button, index) => {

      button.disabled = true;


      if (
        index === question.answer
      ) {

        button.classList.add(
          "timeout"
        );

        button.classList.add(
          "correct"
        );

      }

    }
  );


  showExplanation();


  document.getElementById(
    "nextBtn"
  ).disabled = false;


  showToast(
    "समय सकियो!"
  );

}


/* ==================================================
   TIMER
================================================== */

function startTimer() {

  clearTimer();


  timer =
    setInterval(
      () => {

        timeLeft--;


        const timerElement =
          document.getElementById(
            "timer"
          );


        timerElement.textContent =
          timeLeft;


        if (timeLeft <= 7) {

          timerElement.classList.add(
            "warning"
          );

          beep();

        }


        if (timeLeft <= 0) {

          clearTimer();

          handleTimeout();

        }

      },
      1000
    );

}


function clearTimer() {

  if (timer) {

    clearInterval(timer);

    timer = null;

  }

}


/* ==================================================
   WARNING SOUND
================================================== */

let audioContext = null;


function beep() {

  try {

    if (!audioContext) {

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


    oscillator.frequency.value =
      800;

    oscillator.type =
      "sine";


    gain.gain.setValueAtTime(
      .06,
      audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      .001,
      audioContext.currentTime + .12
    );


    oscillator.connect(gain);

    gain.connect(
      audioContext.destination
    );


    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + .12
    );

  } catch (error) {

    console.log(
      "Audio unavailable"
    );

  }

}


/* ==================================================
   EXPLANATION
================================================== */

function showExplanation() {

  const question =
    currentQuestions[
      currentQuestionIndex
    ];


  const explanation =
    document.getElementById(
      "explanation"
    );


  if (
    question.explanation
  ) {

    explanation.textContent =
      question.explanation;

  } else {

    explanation.textContent =
      "सही उत्तर माथि देखाइएको छ।";

  }


  explanation.classList.remove(
    "hidden"
  );

}


/* ==================================================
   NEXT
================================================== */

document
  .getElementById("nextBtn")
  .addEventListener(
    "click",
    () => {

      if (!questionLocked) {
        return;
      }


      currentQuestionIndex++;


      if (
        currentQuestionIndex >=
        currentQuestions.length
      ) {

        finishQuiz();

      } else {

        renderQuestion();

      }

    }
  );


/* ==================================================
   FINISH
================================================== */

function finishQuiz() {

  clearTimer();


  const total =
    currentQuestions.length;


  const percent =
    total > 0
      ? Math.round(
          correct /
          total *
          100
        )
      : 0;


  document.getElementById(
    "resultScore"
  ).textContent =
    score;


  document.getElementById(
    "resultCorrect"
  ).textContent =
    correct;


  document.getElementById(
    "resultWrong"
  ).textContent =
    wrong;


  document.getElementById(
    "resultTimeout"
  ).textContent =
    timeout;


  document.getElementById(
    "resultPercent"
  ).textContent =
    percent + "%";


  document.getElementById(
    "resultInfo"
  ).textContent =
    `${currentSubject} • ${currentChapter}`;


  saveStats();


  showPage(resultPage);

}


/* ==================================================
   RESTART
================================================== */

document
  .getElementById("playAgainBtn")
  .addEventListener(
    "click",
    () => {

      startQuiz(
        currentCategory,
        currentSubject,
        currentChapter
      );

    }
  );


/* ==================================================
   HOME
================================================== */

document
  .getElementById("homeBtn")
  .addEventListener(
    "click",
    () => {

      showPage(homePage);

    }
  );


/* ==================================================
   EXIT QUIZ
================================================== */

document
  .getElementById("quitQuizBtn")
  .addEventListener(
    "click",
    () => {

      clearTimer();

      showPage(homePage);

    }
  );


/* ==================================================
   BACK BUTTONS
================================================== */

document
  .getElementById("subjectBackBtn")
  .addEventListener(
    "click",
    () => {

      showPage(homePage);

    }
  );


document
  .getElementById("chapterBackBtn")
  .addEventListener(
    "click",
    () => {

      showPage(subjectPage);

    }
  );


document
  .getElementById("oneBackBtn")
  .addEventListener(
    "click",
    () => {

      showPage(homePage);

    }
  );


/* ==================================================
   ONE VS ONE
================================================== */

document
  .getElementById("createRoomBtn")
  .addEventListener(
    "click",
    () => {

      const code =
        Math.floor(
          100000 +
          Math.random() * 900000
        ).toString();


      document.getElementById(
        "roomCode"
      ).textContent =
        code;


      document.getElementById(
        "roomBox"
      ).classList.remove(
        "hidden"
      );


      localStorage.setItem(
        "quizRoom",
        code
      );


      showToast(
        "Room तयार भयो!"
      );

    }
  );


document
  .getElementById("copyRoomBtn")
  .addEventListener(
    "click",
    async () => {

      const code =
        document.getElementById(
          "roomCode"
        ).textContent;


      try {

        await navigator.clipboard.writeText(
          code
        );

        showToast(
          "Room code copied!"
        );

      } catch {

        showToast(
          "Code: " + code
        );

      }

    }
  );


document
  .getElementById("joinRoomBtn")
  .addEventListener(
    "click",
    () => {

      const input =
        document.getElementById(
          "roomInput"
        );


      const code =
        input.value
          .trim()
          .toUpperCase();


      if (code.length !== 6) {

        showToast(
          "६ अंकको room code राख्नुहोस्।"
        );

        return;

      }


      document.getElementById(
        "oneMessage"
      ).textContent =
        `Room ${code} मा join गर्ने request तयार भयो।`;


      showToast(
        "Room code accepted!"
      );

    }
  );


/* ==================================================
   STATS
================================================== */

function saveStats() {

  const old =
    JSON.parse(
      localStorage.getItem(
        "quizStats"
      ) || "{}"
    );


  const stats = {

    games:
      (old.games || 0) + 1,

    correct:
      (old.correct || 0) + correct,

    wrong:
      (old.wrong || 0) + wrong,

    timeout:
      (old.timeout || 0) + timeout,

    best:
      Math.max(
        old.best || 0,
        score
      )

  };


  localStorage.setItem(
    "quizStats",
    JSON.stringify(stats)
  );

}


/* ==================================================
   TOAST
================================================== */

let toastTimer = null;


function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );


  toast.textContent =
    message;


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


/* ==================================================
   HTML ESCAPE
================================================== */

function escapeHTML(value) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );

}


/* ==================================================
   INITIAL
================================================== */

showPage(loginPage); 
