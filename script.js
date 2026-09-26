// =========================================================================
// PREMIUM NO-REPEAT ENGINE WITH COMPLETE CHAPTERS & LOCAL STORAGE TRACKING
// Developed for: Lok Raj Awasthi (Google AdSense Maximize Earning Version)
// =========================================================================

const quizDatabase = {
    class10: {
        title: "कक्षा १० / Class 10 MCQ Pool",
        subjects: {
            math: {
                title: "अनिवार्य गणित / Mathematics",
                chapters: {
                    c1: { title: "अध्याय १: समूह / Chapter 1: Sets", questions: [] },
                    c2: { title: "अध्याय २: चक्रीय ब्याज / Chapter 2: Compound Interest", questions: [] },
                    c3: { title: "अध्याय ३: जनसंख्या वृद्धि र ह्रास / Chapter 3: Population Growth & Depreciation", questions: [] },
                    c4: { title: "अध्याय ४: मुद्रा विनिमय / Chapter 4: Currency Exchange", questions: [] },
                    c5: { title: "अध्याय ५: क्षेत्रमिति (क्षेत्रफल) / Chapter 5: Mensuration (Area)", questions: [] },
                    c6: { title: "अध्याय ६: क्षेत्रमिति (आयतन) / Chapter 6: Mensuration (Volume)", questions: [] },
                    c7: { title: "अध्याय ७: बीजगणित (HCF/LCM) / Chapter 7: Algebra (HCF/LCM)", questions: [] },
                    c8: { title: "अध्याय ८: घतांक / Chapter 8: Indices", questions: [] },
                    c9: { title: "अध्याय ९: करणी / Chapter 9: Radicals", questions: [] },
                    c10: { title: "अध्याय १०: समीकरण / Chapter 10: Equations", questions: [] },
                    c11: { title: "अध्याय ११: ज्यामिति (त्रिभुज र चतुर्भुज) / Chapter 11: Geometry (Triangles & Quadrilaterals)", questions: [] },
                    c12: { title: "अध्याय १२: रचना / Chapter 12: Construction", questions: [] },
                    c13: { title: "अध्याय १३: वृत्त / Chapter 13: Circle", questions: [] },
                    c14: { title: "अध्याय १४: त्रिकोणमिति / Chapter 14: Trigonometry", questions: [] },
                    c15: { title: "अध्याय १५: तथ्यांकशास्त्र / Chapter 15: Statistics", questions: [] },
                    c16: { title: "अध्याय १६: सम्भाव्यता / Chapter 16: Probability", questions: [] }
                }
            },
            science: {
                title: "विज्ञान तथा प्रविधि / Science & Tech",
                chapters: {
                    c1: { title: "अध्याय १: बल र गुरुत्वाकर्षण / Chapter 1: Force & Gravity", questions: [] },
                    c2: { title: "अध्याय २: चाप / Chapter 2: Pressure", questions: [] },
                    c3: { title: "अध्याय ३: उर्जा / Chapter 3: Energy", questions: [] },
                    c4: { title: "अध्याय ४: ताप / Chapter 4: Heat", questions: [] },
                    c5: { title: "अध्याय ५: प्रकाश / Chapter 5: Light", questions: [] },
                    c6: { title: "अध्याय ६: ध्वनि / Chapter 6: Sound", questions: [] },
                    c7: { title: "अध्याय ७: विद्युत र चुम्बकत्व / Chapter 7: Electricity & Magnetism", options: [], questions: [] },
                    c8: { title: "अध्याय ८: वर्गीकरण / Chapter 8: Classification of Living Beings", questions: [] },
                    c9: { title: "अध्याय ९: जीवहरूको सञ्चालन / Chapter 9: Life Processes", questions: [] },
                    c10: { title: "अध्याय १०: वंशाणुक्रम / Chapter 10: Heredity", questions: [] },
                    c11: { title: "अध्याय ११: पर्यावरण / Chapter 11: Ecosystem", questions: [] },
                    c12: { title: "अध्याय १२: तत्वहरूको वर्गीकरण / Chapter 12: Classification of Elements", questions: [] },
                    c13: { title: "अध्याय १३: रासायनिक प्रतिक्रिया / Chapter 13: Chemical Reaction", questions: [] },
                    c14: { title: "अध्याय १४: अम्ल, क्षार र लवण / Chapter 14: Acid, Base & Salt", questions: [] },
                    c15: { title: "अध्याय १५: केही ग्यासहरू / Chapter 15: Some Gases", questions: [] },
                    c16: { title: "अध्याय १६: धातुहरू / Chapter 16: Metals", questions: [] },
                    c17: { title: "अध्याय १७: हाइड्रोकार्बन / Chapter 17: Hydrocarbons", questions: [] },
                    c18: { title: "अध्याय १८: दैनिक जीवनमा रसायन / Chapter 18: Chemicals in Daily Life", questions: [] },
                    c19: { title: "अध्याय १९: ब्रह्माण्ड र इतिहास / Chapter 19: Universe & Earth History", questions: [] }
                }
            }
        }
    },
    class11: {
        title: "कक्षा ११ / Class 11 MCQ Pool",
        subjects: {
            physics: {
                title: "भौतिक विज्ञान / Physics (Pioneer)",
                chapters: {
                    c1: { title: "अध्याय १: मापन र विमीय विश्लेषण / Chapter 1: Units & Dimensions", questions: [] },
                    c2: { title: "अध्याय २: स्केलर र भेक्टर / Chapter 2: Vectors", questions: [] },
                    c3: { title: "अध्याय ३: सरल रेखामा गति / Chapter 3: Kinematics", questions: [] },
                    c4: { title: "अध्याय ४: न्यूटनको गतिको नियम / Chapter 4: Laws of Motion", questions: [] },
                    c5: { title: "अध्याय ५: कार्य, उर्जा र शक्ति / Chapter 5: Work, Energy & Power", questions: [] },
                    c6: { title: "अध्याय ६: वृत्ताकार गति / Chapter 6: Circular Motion", questions: [] },
                    c7: { title: "अध्याय ७: गुरुत्वाकर्षण / Chapter 7: Gravitation", questions: [] },
                    c8: { title: "अध्याय ८: घर्षण / Chapter 8: Friction", questions: [] },
                    c9: { title: "अध्याय ९: पदार्थको इलास्टिसिटी / Chapter 9: Elasticity", questions: [] },
                    c10: { title: "अध्याय १०: भाईब्रेसन र छाल / Chapter 10: Hydrostatics", questions: [] },
                    c11: { title: "अध्याय ११: ताप र तापक्रम / Chapter 11: Temperature & Heat", questions: [] },
                    c12: { title: "अध्याय १२: थर्मल एक्सपान्सन / Chapter 12: Thermal Expansion", questions: [] },
                    c13: { title: "अध्याय १३: ग्यासहरूको नियम / Chapter 13: Ideal Gas", questions: [] },
                    c14: { title: "अध्याय १४: थर्मोडायनामिक्सको पहिलो नियम / Chapter 14: First Law of Thermodynamics", questions: [] },
                    c15: { title: "अध्याय १५: प्रकाशको परावर्तन र आवर्तन / Chapter 15: Reflection & Refraction", questions: [] },
                    c16: { title: "अध्याय १६: लेन्स र प्रिजम / Chapter 16: Lenses & Prisms", questions: [] },
                    c17: { title: "अध्याय १७: स्थिर विद्युत / Chapter 17: Electrostatics", questions: [] },
                    c18: { title: "अध्याय १८: विद्युत प्रवाह / Chapter 18: Current Electricity", questions: [] }
                }
            },
            chemistry: {
                title: "रसायन विज्ञान / Chemistry (Pioneer)",
                chapters: {
                    c1: { title: "अध्याय १: रासायनिक गन्तीको आधार / Chapter 1: Stoichiometry", questions: [] },
                    c2: { title: "अध्याय २: परमाणुको आधुनिक बनोट / Chapter 2: Atomic Structure", questions: [
                        { qNp: "कुन सिद्धान्तले भन्छ कि एуटा परमाणुमा दुईवटा इलेक्ट्रोनको चारवटै क्वान्टम संख्या समान हुन सक्दैन?", qEn: "Which principle states that no two electrons in an atom can have the same set of four quantum numbers?", options: ["Aufbau Principle", "Hund's Rule", "Pauli's Exclusion Principle", "Heisenberg Principle"], correct: 2 }
                    ] },
                    c3: { title: "अध्याय ३: आवर्त तालिका / Chapter 3: Periodic Table", questions: [] },
                    c4: { title: "अध्याय ४: रासायनिक बन्धन / Chapter 4: Chemical Bonding", questions: [] },
                    c5: { title: "अध्याय ५: अक्सिडेशन र रिडक्सन / Chapter 5: Redox Reactions", questions: [] },
                    c6: { title: "अध्याय ६: ग्यास र तरल अवस्था / Chapter 6: States of Matter", questions: [] },
                    c7: { title: "अध्याय ७: रासायनिक सन्तुलन / Chapter 7: Chemical Equilibrium", questions: [] },
                    c8: { title: "अध्याय ८: गैर-धातुहरू / Chapter 8: Non-Metals", questions: [] },
                    c9: { title: "अध्याय ९: धातु विज्ञानको परिचय / Chapter 9: Introduction to Metallurgy", questions: [] },
                    c10: { title: "अध्याय १०: अर्गानिक केमिस्ट्रीको आधार / Chapter 10: Fundamentals of Organic Chemistry", questions: [] },
                    c11: { title: "अध्याय ११: हाइड्रोकार्बनहरू / Chapter 11: Hydrocarbons", questions: [] }
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
                    c1: { title: "नेपालको भूगोल / Geography of Nepal", questions: [] },
                    c2: { title: "विश्वको भूगोल / World Geography", questions: [] }
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
                    c1: { title: "मानव शरीर प्रणाली / Human Body System", questions: [] }
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
                    c1: { title: "नेटवर्किङ र सुरक्षा / Computer Networks & Security", questions: [] }
                }
            }
        }
    }
};

// च्याप्टरवाइज १०० प्रश्नको नमूना बेस (ब्याकअप डेटाबेस ताकी प्रश्न खाली नहोस्)
const sampleQuestions = [
    { qNp: "अनिवार्य प्रश्न नमूना १: यसको सही उत्तर कुन हो?", qEn: "Sample Question 1: What is the correct answer?", options: ["विकल्प ए / Option A", "विकल्प बी / Option B", "विकल्प सी / Option C", "विकल्प डी / Option D"], correct: 0 },

 
