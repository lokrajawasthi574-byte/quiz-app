// =========================================================================
// CLASS 10 COMPREHENSIVE MCQ BANK (ALL TOPICS INCLUDED)
// Publications: Read More (Math), Neema (Science), Unique (Computer)
// Developed for: Lok Raj Awasthi
// =========================================================================

const questionsClass10 = [
    // --- SCIENCE & TECHNOLOGY (NEEMA PUBLICATION) - ALL TOPICS ---
    {
        question: "विज्ञान (Force & Gravity): यदि दुईवटा पिण्डबीचको दुरीलाई आधा (Half) गरियो भने तिनीहरूबीचको गुरुत्वाकर्षण बलमा के असर पर्छ?",
        options: ["२ गुणा बढ्छ", "४ गुणा बढ्छ", "२ गुणा घट्छ", "४ गुणा घट्छ"],
        correct: 1
    },
    {
        question: "विज्ञान (Pressure): १ वायुमण्डलीय चाप (1 atm) बराबर कति पास्कल (Pascal) हुन्छ?",
        options: ["760 Pa", "10^5 Pa", "1.01 x 10^5 Pa", "1.01 x 10^6 Pa"],
        correct: 2
    },
    {
        question: "विज्ञान (Energy & Heat): कुनै पदार्थको तापक्रम १ डिग्री सेल्सियसले बढाउन आवश्यक पर्ने तापशक्तिको परिमाणलाई के भनिन्छ?",
        options: ["तापधारण क्षमता", "विशिष्ट तापधारण क्षमता", "गुप्त ताप", "क्यालोरी"],
        correct: 0
    },
    {
        question: "विज्ञान (Light): गाडीको साइड मिरर (Side Mirror) मा पछाडिको दृश्य हेर्न कुन ऐना प्रयोग गरिन्छ?",
        options: ["कन्केभ ऐना (Concave)", "कन्भेक्स ऐना (Convex)", "समतल ऐना (Plane)", "सिलिन्ड्रिकल ऐना"],
        correct: 1
    },
    {
        question: "विज्ञान (Electricity): घरेलु वायरिङमा फ्युज (Fuse) लाई सधैँ कुन तारसँग सिरिजमा जोडिन्छ?",
        options: ["Neutral Wire", "Live Wire", "Earth Wire", "जुनसुकै तार"],
        correct: 1
    },
    {
        question: "विज्ञान (Classification of Elements): आधुनिक आवर्त तालिकाको d-block मा पर्ने तत्वहरूलाई के भनिन्छ?",
        options: ["Alkali Metals", "Lanthanides", "Transition Elements", "Halogens"],
        correct: 2
    },
    {
        question: "विज्ञान (Chemical Reaction): रासायनिक प्रतिक्रियाको दर (Rate of Reaction) बढाउन वा घटाउन प्रयोग गरिने पदार्थलाई के भनिन्छ?",
        options: ["अम्ल (Acid)", "लवण (Salt)", "उत्प्रेरक (Catalyst)", "क्षार (Base)"],
        correct: 2
    },
    {
        question: "विज्ञान (Metals): फलामको मुख्य धाउ (Main Ore of Iron) कुन हो?",
        options: ["Bauxite", "Hematite", "Copper Pyrites", "Calamine"],
        correct: 1
    },
    {
        question: "विज्ञान (Hydrocarbons): संतृप्त हाइड्रोकार्बन (Saturated Hydrocarbon) को सामान्य सूत्र कुन हो?",
        options: ["CnH2n+2", "CnH2n", "CnH2n-2", "CnH2n+1"],
        correct: 0
    },
    {
        question: "विज्ञान (Life Process/Nervous System): मानव मस्तिष्कको कुन भागले शरीरको सन्तुलन (Balance) नियन्त्रण गर्छ?",
        options: ["Cerebrum (प्रमस्तिष्क)", "Cerebellum (अनुमस्तिष्क)", "Medulla Oblongata", "Pons"],
        correct: 1
    },
    {
        question: "विज्ञान (Chromosomes): डाउन सिन्ड्रोम (Down Syndrome) मानव शरीरको कुन क्रोमोजोमको ट्राइसोमीले गर्दा हुन्छ?",
        options: ["१३ औँ", "१८ औँ", "२१ औँ", "२३ औँ"],
        correct: 2
    },

    // --- COMPULSORY MATHEMATICS (READ MORE PUBLICATION) - ALL TOPICS ---
    {
        question: "गणित (Sets): यदि U = {1, 2, 3, 4, 5} र A = {1, 2, 3} भए, A को पूरक समूह (A') को मान कति हुन्छ?",
        options: ["{1, 2}", "{4, 5}", "{1, 2, 3, 4, 5}", "𝜙"],
        correct: 1
    },
    {
        question: "गणित (Arithmetic/Compound Interest): चक्रीय मिश्रधन (Compound Amount) निकाल्ने सहि सूत्र कुन हो?",
        options: ["P(1 + R/100)^T", "P(1 - R/100)^T", "PT&R/100", "P[(1 + R/100)^T - 1]"],
        correct: 0
    },
    {
        question: "गणित (Mensuration): ६ सेमी व्यास भएको गोला (Sphere) को आयतन (Volume) कति हुन्छ?",
        options: ["३६𝝿 सेमी³", "२८८𝝿 सेमी³", "१२𝝿 सेमी³", "४८𝝿 सेमी³"],
        correct: 0
    },
    {
        question: "गणित (Algebra/Indices): (x^a / x^b)^(a+b) को सरलीकृत मान कुन हो?",
        options: ["x^(a^2 + b^2)", "x^(a^2 - b^2)", "1", "x"],
        correct: 1
    },
    {
        question: "गणित (Geometry/Triangles): एउटै आधार र उही समानान्तर रेखाहरूबीच बनेका त्रिभुज र समानान्तर चतुर्भुजको क्षेत्रफलको सम्बन्ध कस्तो हुन्छ?",
        options: ["बराबर हुन्छन्", "त्रिभुज सप्रामुको आधा हुन्छ", "त्रिभुज सप्रामुको दोब्बर हुन्छ", "कुनै सम्बन्ध हुँदैन"],
        correct: 1
    },
    {
        question: "गणित (Trigonometry): यदि 📐C = 90° भएको समकोण त्रिभुजमा तल्लो कोण 𝜃 भए, tan𝜃 को मान के हुन्छ?",
        options: ["p/h", "b/h", "p/b", "b/p"],
        correct: 2
    },
    {
        question: "गणित (Statistics): मध्यिका (Median) को श्रेणी पत्ता लगाउने सूत्र कुन हो?",
        options: ["N/2 औँ पद", "N/4 औँ पद", "3N/4 औँ पद", "👶 पद"],
        correct: 0
    },

    // --- COMPUTER SCIENCE (UNIQUE PUBLICATION) - ALL TOPICS ---
    {
        question: "कम्प्युटर (Networking): संसारको सबैभन्दा ठूलो नेटवर्क (Network of Networks) लाई के भनिन्छ?",
        options: ["Intranet", "Extranet", "Internet", "Ethernet"],
        correct: 2
    },
    {
        question: "कम्प्युटर (Database): एमएस-एक्सेस (MS-Access) मा एउटा टेबलको डाटालाई अर्को टेबलसँग जोड्ने साँचोलाई के भनिन्छ?",
        options: ["Primary Key", "Foreign Key", "Candidate Key", "Composite Key"],
        correct: 1
    },
    {
        question: "कम्प्युटर (QBASIC Programming): QBASIC मा कन्डिसन चेक गर्नका लागि प्रयोग गरिने स्टेटमेन्ट कुन हो?",
        options: ["FOR...NEXT", "SELECT CASE / IF...THEN", "PRINT", "LET"],
        correct: 1
    },
    {
        question: "कम्प्युटर (Cyber Security): कम्प्युटर र नेटवर्कलाई अनधिकृत पहुँच (Unauthorized access) बाट जोगाउने सुरक्षा प्रणालीलाई के भनिन्छ?",
        options: ["Antivirus", "Firewall", "Router", "Backup"],
        correct: 1
    }
];

 
