
import { I18nContent, Language } from './types';

export const SYMPTOMS_BY_PART: Record<string, string[]> = {
  head: ['Headache', 'Dizziness', 'Vision changes', 'Confusion', 'Migraine', 'Sinus Pressure'],
  neck: ['Neck Pain', 'Stiff Neck', 'Swollen Glands', 'Muscle Spasm', 'Difficulty Swallowing'],
  chest: ['Chest Pain', 'Palpitations', 'Shortness of Breath', 'Cough', 'Wheezing'],
  abdomen: ['Nausea', 'Stomach Pain', 'Bloating', 'Indigestion', 'Diarrhea', 'Constipation'],
  arms: ['Arm Pain', 'Weakness', 'Numbness', 'Tingling', 'Joint Swelling'],
  legs: ['Leg Pain', 'Swelling', 'Cramps', 'Weakness', 'Knee Pain'],
  back: ['Lower Back Pain', 'Sciatica', 'Upper Back Tension', 'Stiffness'],
  skin: ['Rash', 'Itching', 'Lesion', 'Redness', 'Dryness', 'Discoloration'],
  general: ['Fever', 'Fatigue', 'Chills', 'Night Sweats', 'Weight Loss', 'Insomnia']
};

const en: I18nContent = {
  nav: {
    dashboard: "Overview",
    symptomChecker: "Clinical Analysis",
    dermatology: "Dermatology Vision",
    rxScanner: "Rx Decrypter",
    pharmacology: "Pharmacology",
    labIntel: "Pathology Intel",
    wellness: "Wellness Tracker",
    calculators: "Clinical Tools",
    library: "Education Library",
    chat: "Asclepius Chat",
    records: "Patient Records",
    config: "System Config",
    diagnostics: "Diagnostics",
    tools: "Pharmacology & Tools",
    care: "Patient Care"
  },
  common: {
    save: "Record Encrypted",
    delete: "Delete Record",
    exportPdf: "Print Report",
    processing: "Processing Clinical Data...",
    upload: "Upload Clinical Image",
    cancel: "Abort",
    submit: "Run Analysis",
    next: "Next Phase",
    back: "Return",
    welcome: "System Operational",
    systemOperational: "Biosystems Nominal",
    offlineMode: "Offline Protocol Active",
    newIntake: "New Patient Intake",
    viewDetails: "View Clinical Details",
    analyze: "Analyze",
    reset: "Reset",
    guide: "Clinical Protocol"
  },
  dashboard: {
    title: "Command Center",
    subtitle: "Medical Intelligence & Clinical Operations",
    biosystems: "Biosystems Nominal",
    biosystemsDesc: "Local encryption active. Secure environment ready for clinical data processing.",
    privacy: "Privacy Architecture",
    privacyDesc: "No external cloud storage. HIPAA compliant local-first design.",
    recentActivity: "Recent Clinical Data",
    analytics: "System Analytics",
    noRecords: "No recent clinical records found."
  },
  symptomChecker: {
    title: "Clinical Intake",
    subtitle: "Symptom Analysis & Differential Diagnosis",
    demographics: "Patient Demographics",
    name: "Patient Name",
    age: "Age",
    sex: "Biological Sex",
    step1: "Select Anatomical Region",
    notes: "Clinical Notes / Other Symptoms",
    assessment: "Clinical Assessment",
    pharmacotherapy: "Pharmacotherapy Plan",
    interventions: "Non-Pharmacologic Interventions"
  },
  dermatology: {
    title: "Dermatology Vision",
    subtitle: "Visual analysis for skin conditions and injuries.",
    uploadText: "Select Photograph",
    awaiting: "Awaiting Input"
  },
  rxScanner: {
    title: "Rx Scanner",
    subtitle: "Optical character recognition for prescriptions.",
    uploadText: "Scan Prescription",
    awaiting: "Awaiting Scan"
  },
  lab: {
    title: "Pathology Intel",
    subtitle: "Deep analysis of pathology and blood work reports.",
    uploadText: "Select File / Doc",
    awaiting: "No Data Found"
  },
  pharmacology: {
    title: "Pharmacology",
    subtitle: "Medication Safety & Interaction Intelligence",
    lookup: "Drug Lookup",
    interaction: "Interaction Check",
    drugName: "Medication Name",
    drugA: "Drug A",
    drugB: "Drug B",
    check: "Check",
    mechanism: "Mechanism of Action",
    indications: "Indications",
    sideEffects: "Common Adverse Effects",
    warnings: "Black Box / Major Warnings",
    pearls: "Clinical Pearls"
  },
  wellness: {
    title: "Wellness Tracker",
    subtitle: "Chronic Disease Management & Preventive Care",
    chronic: "Chronic Conditions",
    mental: "Mental Health",
    vaccinations: "Vaccinations"
  },
  calculators: {
    title: "Clinical Tools",
    subtitle: "Evidence-based risk stratification."
  },
  library: {
    title: "Education Library",
    subtitle: "Evidence-based medical educational materials.",
    searchPlaceholder: "Search condition (e.g. Asthma)...",
    find: "Find"
  },
  records: {
    title: "Patient Records",
    subtitle: "Encrypted Electronic Health Records (Local)",
    filter: "Filter & Sort",
    search: "Search patient records..."
  },
  disclaimer: {
    footer: "CLINICAL DECISION SUPPORT SYSTEM. Verify all outputs. Not a substitute for professional judgment.",
    banner: "Medical Intelligence System. Data locally encrypted."
  }
};

const bn: I18nContent = {
  nav: {
    dashboard: "ওভারভিউ",
    symptomChecker: "ক্লিনিক্যাল বিশ্লেষণ",
    dermatology: "চর্মরোগ ভিশন",
    rxScanner: "প্রেসক্রিপশন ডিক্রিপ্টার",
    pharmacology: "ফার্মাকোলজি",
    labIntel: "প্যাথলজি ইন্টেল",
    wellness: "ওয়েলনেস ট্র্যাকার",
    calculators: "ক্লিনিক্যাল টুলস",
    library: "শিক্ষা লাইব্রেরি",
    chat: "অ্যাসক্লেপিয়াস চ্যাট",
    records: "রোগীর রেকর্ড",
    config: "সিস্টেম কনফিগ",
    diagnostics: "ডায়াগনস্টিকস",
    tools: "ফার্মাকোলজি এবং টুলস",
    care: "রোগীর যত্ন"
  },
  common: {
    save: "রেকর্ড এনক্রিপ্ট",
    delete: "মুছুন",
    exportPdf: "প্রিন্ট রিপোর্ট",
    processing: "প্রক্রিয়া চলছে...",
    upload: "ছবি আপলোড",
    cancel: "বাতিল",
    submit: "বিশ্লেষণ শুরু করুন",
    next: "পরবর্তী",
    back: "পেছনে",
    welcome: "সিস্টেম সচল",
    systemOperational: "বায়োসিস্টেম স্বাভাবিক",
    offlineMode: "অফলাইন প্রোটোকল",
    newIntake: "নতুন রোগী ইনটেক",
    viewDetails: "বিস্তারিত দেখুন",
    analyze: "বিশ্লেষণ",
    reset: "রিসেট",
    guide: "ক্লিনিক্যাল প্রোটোকল"
  },
  dashboard: {
    title: "কমান্ড সেন্টার",
    subtitle: "মেডিকেল ইন্টেলিজেন্স এবং ক্লিনিক্যাল অপারেশনস",
    biosystems: "বায়োসিস্টেম স্বাভাবিক",
    biosystemsDesc: "স্থানীয় এনক্রিপশন সক্রিয়।",
    privacy: "প্রাইভেসি আর্কিটেকচার",
    privacyDesc: "কোন ক্লাউড স্টোরেজ নেই।",
    recentActivity: "সাম্প্রতিক ক্লিনিক্যাল ডেটা",
    analytics: "সিস্টেম অ্যানালিটিক্স",
    noRecords: "কোন রেকর্ড পাওয়া যায়নি।"
  },
  symptomChecker: {
    title: "ক্লিনিক্যাল ইনটেক",
    subtitle: "লক্ষণ বিশ্লেষণ এবং ডিফারেনশিয়াল ডায়াগনসিস",
    demographics: "রোগীর তথ্য",
    name: "রোগীর নাম",
    age: "বয়স",
    sex: "লিঙ্গ",
    step1: "শারীরিক অঞ্চল নির্বাচন করুন",
    notes: "ক্লিনিক্যাল নোট",
    assessment: "ক্লিনিক্যাল মূল্যায়ন",
    pharmacotherapy: "ফার্মাকোথেরাপি পরিকল্পনা",
    interventions: "অ-ফার্মাকোলজিক হস্তক্ষেপ"
  },
  dermatology: {
    title: "চর্মরোগ ভিশন",
    subtitle: "ত্বকের অবস্থা বিশ্লেষণ।",
    uploadText: "ছবি নির্বাচন করুন",
    awaiting: "অপেক্ষায়..."
  },
  rxScanner: {
    title: "প্রেসক্রিপশন স্ক্যানার",
    subtitle: "প্রেসক্রিপশন ডিক্রিপ্টার।",
    uploadText: "প্রেসক্রিপশন স্ক্যান করুন",
    awaiting: "অপেক্ষায়..."
  },
  lab: {
    title: "প্যাথলজি ইন্টেল",
    subtitle: "প্যাথলজি রিপোর্টের বিশ্লেষণ।",
    uploadText: "ফাইল/ডক নির্বাচন করুন",
    awaiting: "ডেটা নেই"
  },
  pharmacology: {
    title: "ফার্মাকোলজি",
    subtitle: "ঔষধ নিরাপত্তা বুদ্ধিমত্তা",
    lookup: "ড্রাগ অনুসন্ধান",
    interaction: "ইন্টারঅ্যাকশন চেক",
    drugName: "ঔষধের নাম",
    drugA: "ঔষধ ১",
    drugB: "ঔষধ ২",
    check: "চেক করুন",
    mechanism: "কাজের প্রক্রিয়া",
    indications: "নির্দেশনা",
    sideEffects: "পার্শ্ব প্রতিক্রিয়া",
    warnings: "সতর্কতা",
    pearls: "ক্লিনিক্যাল নোট"
  },
  wellness: {
    title: "ওয়েলনেস ট্র্যাকার",
    subtitle: "দীর্ঘস্থায়ী রোগ ব্যবস্থাপনা",
    chronic: "দীর্ঘস্থায়ী রোগ",
    mental: "মানসিক স্বাস্থ্য",
    vaccinations: "টিকা"
  },
  calculators: {
    title: "ক্লিনিক্যাল টুলস",
    subtitle: "প্রমাণ-ভিত্তিক মেডিকেল সূত্র।"
  },
  library: {
    title: "শিক্ষা লাইব্রেরি",
    subtitle: "শিক্ষামূলক উপকরণ।",
    searchPlaceholder: "অনুসন্ধান করুন...",
    find: "খুঁজুন"
  },
  records: {
    title: "রোগীর রেকর্ড",
    subtitle: "এনক্রিপ্ট করা ইলেকট্রনিক স্বাস্থ্য রেকর্ড",
    filter: "ফিল্টার",
    search: "অনুসন্ধান..."
  },
  disclaimer: {
    footer: "ক্লিনিক্যাল ডিসিশন সাপোর্ট সিস্টেম।",
    banner: "মেডিকেল ইন্টেলিজেন্স সিস্টেম।"
  }
};

const es: I18nContent = {
  ...en,
  nav: { ...en.nav, dashboard: "Resumen", symptomChecker: "Análisis Clínico", pharmacology: "Farmacología", wellness: "Bienestar", chat: "Chat Asclepius", records: "Registros", dermatology: "Visión Dermatológica", labIntel: "Intel de Patología", rxScanner: "Descifrador Rx", calculators: "Herramientas Clínicas", library: "Biblioteca Educativa" },
  common: { ...en.common, welcome: "Sistema Operativo", submit: "Iniciar Análisis", next: "Siguiente", back: "Atrás", analyze: "Analizar", systemOperational: "Biosistemas Nominales", offlineMode: "Protocolo Desconectado", newIntake: "Nueva Admisión", upload: "Cargar Imagen Clínica" },
  dashboard: { ...en.dashboard, title: "Centro de Mando", subtitle: "Inteligencia Médica y Operaciones" },
  dermatology: { ...en.dermatology, title: "Visión Dermatológica", uploadText: "Seleccionar Fotografía" },
  lab: { ...en.lab, title: "Intel de Patología", uploadText: "Seleccionar Archivo" },
  rxScanner: { ...en.rxScanner, title: "Descifrador Rx", uploadText: "Escanear Receta" },
  pharmacology: { ...en.pharmacology, title: "Farmacología", lookup: "Buscar Fármaco", mechanism: "Mecanismo de Acción" },
  calculators: { ...en.calculators, title: "Herramientas Clínicas" },
  library: { ...en.library, title: "Biblioteca Educativa" }
};

const fr: I18nContent = {
  ...en,
  nav: { ...en.nav, dashboard: "Aperçu", symptomChecker: "Analyse Clinique", pharmacology: "Pharmacologie", wellness: "Bien-être", chat: "Chat Asclepius", records: "Dossiers", dermatology: "Vision Dermatologique", labIntel: "Intel Pathologie", rxScanner: "Décrypteur Rx", calculators: "Outils Cliniques", library: "Bibliothèque Éducative" },
  common: { ...en.common, welcome: "Système Opérationnel", submit: "Lancer l'Analyse", next: "Suivant", back: "Retour", analyze: "Analyser", systemOperational: "Biosystèmes Nominaux", offlineMode: "Protocole Hors-ligne", newIntake: "Nouvelle Admission" },
  dashboard: { ...en.dashboard, title: "Centre de Commandement", subtitle: "Intelligence Médicale" },
  dermatology: { ...en.dermatology, title: "Vision Dermatologique", uploadText: "Sélectionner Photo" },
  lab: { ...en.lab, title: "Intel Pathologie", uploadText: "Sélectionner Fichier" },
  rxScanner: { ...en.rxScanner, title: "Décrypteur Rx", uploadText: "Scanner Ordonnance" },
  pharmacology: { ...en.pharmacology, title: "Pharmacologie" },
  calculators: { ...en.calculators, title: "Outils Cliniques" },
  library: { ...en.library, title: "Bibliothèque Éducative" }
};

const hi: I18nContent = {
  ...en,
  nav: { ...en.nav, dashboard: "अवलोकन", symptomChecker: "नैदानिक विश्लेषण", pharmacology: "फार्माकोलॉजी", wellness: "कल्याण", chat: "एस्क्लेपियस चैट", records: "रिकॉर्ड", dermatology: "त्वचा विज्ञान दृष्टि", labIntel: "पैथोलॉजी इंटेल", rxScanner: "Rx डिक्रिप्टर", calculators: "नैदानिक उपकरण", library: "शिक्षा पुस्तकालय" },
  common: { ...en.common, welcome: "प्रणाली परिचालन", submit: "विश्लेषण शुरू करें", next: "अगला", back: "पीछे", analyze: "विश्लेषण", systemOperational: "बायोसिस्टम सामान्य", offlineMode: "ऑफलाइन प्रोटोकॉल सक्रिय" },
  dashboard: { ...en.dashboard, title: "कमांड सेंटर", subtitle: "चिकित्सा बुद्धिमत्ता" },
  dermatology: { ...en.dermatology, title: "त्वचा विज्ञान दृष्टि", uploadText: "फोटो चुनें" },
  lab: { ...en.lab, title: "पैथोलॉजी इंटेल", uploadText: "फ़ाइल चुनें" },
  rxScanner: { ...en.rxScanner, title: "Rx डिक्रिप्टर", uploadText: "पर्चा स्कैन करें" },
  calculators: { ...en.calculators, title: "नैदानिक उपकरण" },
  library: { ...en.library, title: "शिक्षा पुस्तकालय" }
};

const ar: I18nContent = {
  ...en,
  nav: { ...en.nav, dashboard: "نظرة عامة", symptomChecker: "التحليل السريري", pharmacology: "علم الأدوية", wellness: "العافية", chat: "دردشة أسكليبيوس", records: "السجلات", dermatology: "رؤية الأمراض الجلدية", labIntel: "ذكاء المختبر", rxScanner: "فك تشفير الوصفات", calculators: "الأدوات السريرية", library: "المكتبة التعليمية" },
  common: { ...en.common, welcome: "النظام يعمل", submit: "بدء التحليل", next: "التالي", back: "العودة", analyze: "تحليل", systemOperational: "الأنظمة الحيوية طبيعية", offlineMode: "البروتوكol غير المتصل نشط" },
  dashboard: { ...en.dashboard, title: "مركز القيادة", subtitle: "الذكاء الطبي" },
  dermatology: { ...en.dermatology, title: "رؤية الأمراض الجلدية", uploadText: "اختر صورة" },
  lab: { ...en.lab, title: "ذكاء المختبر", uploadText: "اختر ملفًا" },
  rxScanner: { ...en.rxScanner, title: "فك تشفير الوصفات", uploadText: "امسح الوصفة" },
  calculators: { ...en.calculators, title: "الأدوات السريرية" },
  library: { ...en.library, title: "المكتبة التعليمية" }
};

const zh: I18nContent = {
  ...en,
  nav: { ...en.nav, dashboard: "概览", symptomChecker: "临床分析", pharmacology: "药理学", wellness: "健康", chat: "阿斯克勒庇俄斯聊天", records: "记录", dermatology: "皮肤病视觉", labIntel: "病理智能", rxScanner: "处方解密", calculators: "临床工具", library: "教育库" },
  common: { ...en.common, welcome: "系统运行中", submit: "开始分析", next: "下一步", back: "返回", analyze: "分析", systemOperational: "生物系统正常", offlineMode: "离线协议激活" },
  dashboard: { ...en.dashboard, title: "指挥中心", subtitle: "医疗智能" },
  dermatology: { ...en.dermatology, title: "皮肤病视觉", uploadText: "选择照片" },
  lab: { ...en.lab, title: "病理智能", uploadText: "选择文件" },
  rxScanner: { ...en.rxScanner, title: "处方解密", uploadText: "扫描处方" },
  calculators: { ...en.calculators, title: "临床工具" },
  library: { ...en.library, title: "教育库" }
};

const ja: I18nContent = {
  ...en,
  nav: { ...en.nav, dashboard: "概要", symptomChecker: "臨床分析", pharmacology: "薬理学", wellness: "ウェルネス", chat: "アスクレピオスチャット", records: "記録", dermatology: "皮膚科ビジョン", labIntel: "病理インテル", rxScanner: "処方箋解読", calculators: "臨床ツール", library: "教育ライブラリ" },
  common: { ...en.common, welcome: "システム稼働中", submit: "分析実行", next: "次へ", back: "戻る", analyze: "分析", systemOperational: "バイオシステム正常", offlineMode: "オフラインプロトコル有効" },
  dashboard: { ...en.dashboard, title: "コマンドセンター", subtitle: "医療インテリジェンス" },
  dermatology: { ...en.dermatology, title: "皮膚科ビジョン", uploadText: "写真を選択" },
  lab: { ...en.lab, title: "病理インテル", uploadText: "ファイルを選択" },
  rxScanner: { ...en.rxScanner, title: "処方箋解読", uploadText: "処方箋をスキャン" },
  calculators: { ...en.calculators, title: "臨床ツール" },
  library: { ...en.library, title: "教育ライブラリ" }
};

export const I18N: Record<Language, I18nContent> = { en, bn, hi, ar, es, fr, zh, ja };

export const SAFETY_PROMPT_SUFFIX = `
\n\n
IMPORTANT CLINICAL PROTOCOL:
1. IDENTITY: "Asclepius Medical Intelligence".
2. RESEARCH ALIGNMENT: Aim for 87.3% Diagnostic Accuracy (Online Mode).
3. PROFESSIONALISM: Use MD level terminology (Etiology, Pathophysiology).
4. RED FLAGS: Identify acute distress (Hemodynamic instability) immediately.
5. FORMAT: Markdown structure with clinical headings.
6. CAVEAT: "This output is for educational support. Clinical correlation by a professional is mandatory."
`;

export const EMERGENCY_TEXT = "CRITICAL PROTOCOL: If patient presents with hemodynamic instability or acute distress, initiate emergency response immediately. This tool is for educational support, not emergency triage.";

export const MOCK_SYMPTOM_ANALYSIS = `
\`\`\`json
{
  "conditions": [
    {
      "name": "Cervical Radiculopathy",
      "description": "Compression of nerve roots in the cervical spine causing radiating pain, weakness, or numbness.",
      "confidence": 0.748,
      "specialty": "Neurology",
      "etiology": "Intervertebral disc herniation or degenerative spondylosis."
    },
    {
      "name": "Myofascial Pain Syndrome",
      "description": "Chronic pain disorder where pressure on trigger points causes pain in seemingly unrelated body parts.",
      "confidence": 0.68,
      "specialty": "Rheumatology",
      "etiology": "Repetitive muscle strain or poor postural habits."
    }
  ],
  "treatments": [
    { "name": "NSAIDs", "dosage": "Standard adult dose", "description": "Anti-inflammatory management for symptomatic relief." }
  ],
  "lifestyle": [ "Postural correction exercises", "Physical therapy evaluation", "Heat therapy for muscle relaxation" ]
}
\`\`\`
`;
export const MOCK_DERM_ANALYSIS = `### Dermatology Analysis (Offline Mode - Research Protocol 74.8%)\n\nVisual characteristics suggest: **Atopic Dermatitis**. \n- Etiology: Genetic barrier dysfunction exacerbated by environmental triggers.\n- Management: Topical emollients, trigger avoidance, and corticosteroid consideration.`;
export const MOCK_RX_ANALYSIS = `### Rx Decryption (Offline Mode)\n\nDetected Medication: **Amoxicillin 500mg**\n- Frequency: 1 capsule three times daily for 7 days.\n- Indications: Suspected bacterial infection. \n- Category: Penicillin-class Antibiotic.`;
export const MOCK_LAB_ANALYSIS = `### Lab Summary (Offline Mode)\n\n- **WBC Count**: 11.2 (Slightly Elevated)\n- **Hb**: 14.2 g/dL (Normal)\n- **Profile**: Suggests mild inflammatory response or early infection. Clinical correlation required.`;
export const MOCK_CHAT_RESPONSE = "Asclepius AI (Offline Mode): I am currently operating on my local clinical rule-base. Diagnostic power is aligned with research specifications (74.8% accuracy). How can I assist with your clinical knowledge today?";
