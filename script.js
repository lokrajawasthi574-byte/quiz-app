// =========================================================================
// ANTI-CRASH SINGLE-FILE BILINGUAL ENGINE WITH HIGHEST ISOLATION
// Developed for: Lok Raj Awasthi
// =========================================================================

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
                    ]},
                    c2: { title: "अध्याय २: चक्रीय ब्याज / Chapter 2: Compound Interest", questions: [
                        { qNp: "वार्षिक चक्रीय मिश्रधन निकाल्ने सही सूत्र कुन हो?", qEn: "What is the correct formula for annual Compound Amount?", options: ["P(1+R/100)^T", "P(1-R/100)^T", "PTR/100", "P[(1+R/100)^T - 1]"], correct: 0 }
                    ]}
                }
            },
            science: {
                title: "विज्ञान तथा प्रविधि / Science & Tech (Neema)",
                chapters: {
                    c1: { title: "अध्याय १: बल र गुरुत्वाकर्षण / Chapter 1: Force & Gravity", questions: [
                        { qNp: "पृथ्वीको सतहमा गुरुत्वप्रवेग (g) को औसत मान कति हुन्छ?", qEn: "What is the average value of acceleration due to gravity (g) on Earth?", options: ["9.8 m/s^2", "1.67 m/s^2", "8.9 m/s^2", "10 m/s^2"], correct: 0 },
                        { qNp: "दुई पिण्डबीचको दुरीलाई दोब्बर बनाउँदा गुरुत्वाकर्षण बलमा के असर पर्छ?", qEn: "What happens to the gravitational force when the distance between two bodies is doubled?", options: ["४ गुणा बढ्छ", "२ गुणा घट्छ", "४ गुणा घट्छ", "२ गुणा बढ्छ"], correct: 2 }
                    ]},
                    c2: { title: "अध्याय २: चाप / Chapter 2: Pressure", questions: [
                        { qNp: "तरल पदार्थको चाप पत्ता लगाउने सही सूत्र कुन हो?", qEn: "What is the correct formula to calculate liquid pressure?", options: ["P = hdg", "P = F/A", "P = m/v", "P = W/t"], correct: 0 }
                    ]}
                }
            },
            computer: {
                title: "कम्प्युटर विज्ञान / Computer Science (Unique)",
                chapters: {
                    c1: { title: "अध्याय १: डेटाबेस / Chapter 1: Database (MS-Access)", questions: [
                        { qNp: "MS-Access मा प्रत्येक रेकर्डलाई अनौठो रूपमा चिन्न कुन साँचो प्रयोग गरिन्छ?", qEn: "Which key is used to uniquely identify each record in MS-Access?", options: ["Foreign Key", "Primary Key", "Secondary Key", "Composite Key"], correct: 1 }
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
                        { qNp: "प्रोजेक्टाइलले अधिकतम क्षितिज दुरी पार गर्न कति कोणमा फ्याँक्नुपर्छ?", qEn: "Physics (Mechanics): At what angle should a projectile be launched to achieve maximum horizontal range?", options: ["30°", "45°", "60°", "90°"], correct: 1 },
                        { qNp: "कार्य (Work Done) को विमीय सूत्र (Dimensional Formula) कुन हो?", qEn: "Physics (Mechanics): What is the dimensional formula for Work Done?", options: ["[MLT^-2]", "[ML^2T^-2]", "[ML^-1T^-2]", "[M^2LT^-2]"], correct: 1 }
                    ]},
                    c2: { title: "अध्याय २: ताप र थर्मोडायनामिक्स / Chapter 2: Heat & Thermodynamics", questions: [
                        { qNp: "कुन तापक्रममा सेल्सियस र फरेनहाइट दुवै स्केलले एउटै मान देखाउँछन्?", qEn: "Physics (Heat): At what temperature do both Celsius and Fahrenheit scales read the same value?", options: ["0°", "100°", "-40°", "40°"], correct: 2 }
                    ]}
                }
            },
            chemistry: {
                title: "रसायन विज्ञान / Chemistry (Pioneer)",
                chapters: {
                    c1: { title: "अध्याय १: परमाणु संरचना / Chapter 1: Atomic Structure", questions: [
                        { qNp: "कुन सिद्धान्तले भन्छ कि एउटा परमाणुमा दुईवटा इलेक्ट्रोनको चारवटै क्वान्टम संख्या समान हुन सक्दैन?", qEn: "Chemistry: Which principle states that no two electrons in an atom can have the same set of four quantum numbers?", options: ["Aufbau Principle", "Hund's Rule", "Pauli's Exclusion Principle", "Heisenberg Principle"], correct: 2 }
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
            },
            computer: {
                title: "कम्प्युटर विज्ञान / Computer Science (Buddha)",
                chapters: {
                    c1: { title: "अध्याय १: कम्प्युटर आर्किटेक्चर / Chapter 1: Computer Architecture", questions: [
                        { qNp: "कुन लजिक गेटलाई युनिभर्सल गेट (Universal Gate) भनिन्छ?", qEn: "Computer: Which logic gate is known as the universal gate?", options: ["AND gate", "OR gate", "NAND gate", "XOR gate"], correct: 2 }
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
        btn.onclick = () => navigateToChapters(subKey);
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
        btn.onclick = () => launchQuizEngine(chKey);
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

   
 
