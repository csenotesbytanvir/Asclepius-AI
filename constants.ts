
import { I18nContent, Language } from './types';

export const SYMPTOMS_BY_PART: Record<string, string[]> = {
  head: [
      'Headache', 'Dizziness', 'Vision changes', 'Confusion', 'Migraine', 'Sinus Pressure',
      'Memory Loss', 'Fainting', 'Scalp Tenderness', 'Facial Droop', 'Speech Difficulty'
  ],
  neck: [
      'Neck Pain', 'Stiff Neck', 'Swollen Glands', 'Muscle Spasm', 'Difficulty Swallowing',
      'Hoarseness', 'Lump in Neck', 'Throat Pain'
  ],
  chest: [
      'Chest Pain', 'Palpitations', 'Shortness of Breath', 'Cough', 'Wheezing',
      'Heartburn', 'Tightness', 'Rapid Heartbeat', 'Chest Pressure'
  ],
  abdomen: [
      'Nausea', 'Stomach Pain', 'Bloating', 'Indigestion', 'Diarrhea', 'Constipation',
      'Vomiting', 'Loss of Appetite', 'Blood in Stool', 'Abdominal Cramps'
  ],
  arms: [
      'Arm Pain', 'Weakness', 'Numbness', 'Tingling', 'Joint Swelling',
      'Shoulder Pain', 'Hand Tremor', 'Cold Hands', 'Wrist Pain'
  ],
  legs: [
      'Leg Pain', 'Swelling', 'Cramps', 'Weakness', 'Varicose Veins',
      'Knee Pain', 'Foot Numbness', 'Cold Feet', 'Calf Pain'
  ],
  back: [
      'Lower Back Pain', 'Sciatica', 'Upper Back Tension', 'Spinal Tenderness',
      'Stiffness', 'Limited Mobility', 'Shooting Pain', 'Muscle Knots'
  ],
  skin: [
      'Rash', 'Itching', 'Lesion', 'Redness', 'Dryness', 'Hives',
      'Discoloration', 'Bruising', 'Acne', 'Warts', 'Moles changing'
  ],
  general: [
      'Fever', 'Fatigue', 'Chills', 'Night Sweats', 'Weight Loss', 
      'Weight Gain', 'Insomnia', 'Dehydration', 'Anxiety'
  ]
};

const defaultEn: I18nContent = {
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
    uploadText: "Upload Image",
    awaiting: "Awaiting Input"
  },
  rxScanner: {
    title: "Rx Scanner",
    subtitle: "Optical character recognition for prescriptions.",
    uploadText: "Upload Rx Image",
    awaiting: "Awaiting Scan"
  },
  lab: {
    title: "Pathology Intel",
    subtitle: "Deep analysis of pathology and blood work reports.",
    uploadText: "Select File",
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
    title: "Clinical Calculators",
    subtitle: "Evidence-based risk stratification and medical formulas."
  },
  library: {
    title: "Patient Library",
    subtitle: "Evidence-based educational materials.",
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

const defaultBn: I18nContent = {
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
    biosystemsDesc: "স্থানীয় এনক্রিপশন সক্রিয়। ক্লিনিক্যাল ডেটা প্রক্রিয়াকরণের জন্য নিরাপদ পরিবেশ প্রস্তুত।",
    privacy: "প্রাইভেসি আর্কিটেকচার",
    privacyDesc: "কোন ক্লাউড স্টোরেজ নেই। HIPAA অনুগত লোকাল-ফার্স্ট ডিজাইন।",
    recentActivity: "সাম্প্রতিক ক্লিনিক্যাল ডেটা",
    analytics: "সিস্টেম অ্যানালিটিক্স",
    noRecords: "কোন সাম্প্রতিক ক্লিনিক্যাল রেকর্ড পাওয়া যায়নি।"
  },
  symptomChecker: {
    title: "ক্লিনিক্যাল ইনটেক",
    subtitle: "লক্ষণ বিশ্লেষণ এবং ডিফারেনশিয়াল ডায়াগনসিস",
    demographics: "রোগীর তথ্য",
    name: "রোগীর নাম",
    age: "বয়স",
    sex: "লিঙ্গ",
    step1: "শারীরিক অঞ্চল নির্বাচন করুন",
    notes: "ক্লিনিক্যাল নোট / অন্যান্য লক্ষণ",
    assessment: "ক্লিনিক্যাল মূল্যায়ন",
    pharmacotherapy: "ফার্মাকোথেরাপি পরিকল্পনা",
    interventions: "অ-ফার্মাকোলজিক হস্তক্ষেপ"
  },
  dermatology: {
    title: "চর্মরোগ ভিশন",
    subtitle: "ত্বকের অবস্থা এবং আঘাতের চাক্ষুষ বিশ্লেষণ।",
    uploadText: "ছবি আপলোড",
    awaiting: "ইনপুটের অপেক্ষায়"
  },
  rxScanner: {
    title: "প্রেসক্রিপশন স্ক্যানার",
    subtitle: "প্রেসক্রিপশনের জন্য অপটিক্যাল ক্যারেক্টার রিকগনিশন।",
    uploadText: "Rx ছবি আপলোড",
    awaiting: "স্ক্যানের অপেক্ষায়"
  },
  lab: {
    title: "প্যাথলজি ইন্টেল",
    subtitle: "প্যাথলজি এবং রক্ত পরীক্ষার রিপোর্টের গভীর বিশ্লেষণ।",
    uploadText: "ফাইল নির্বাচন",
    awaiting: "কোন ডেটা পাওয়া যায়নি"
  },
  pharmacology: {
    title: "ফার্মাকোলজি",
    subtitle: "ঔষধ নিরাপত্তা এবং মিথস্ক্রিয়া বুদ্ধিমত্তা",
    lookup: "ড্রাগ অনুসন্ধান",
    interaction: "ইন্টারঅ্যাকশন চেক",
    drugName: "ঔষধের নাম",
    drugA: "ঔষধ ১",
    drugB: "ঔষধ ২",
    check: "চেক করুন",
    mechanism: "কাজের প্রক্রিয়া (Mechanism)",
    indications: "নির্দেশনা",
    sideEffects: "পার্শ্ব প্রতিক্রিয়া",
    warnings: "সতর্কতা",
    pearls: "ক্লিনিক্যাল নোট"
  },
  wellness: {
    title: "ওয়েলনেস ট্র্যাকার",
    subtitle: "দীর্ঘস্থায়ী রোগ ব্যবস্থাপনা এবং প্রতিরোধমূলক যত্ন",
    chronic: "দীর্ঘস্থায়ী রোগ",
    mental: "মানসিক স্বাস্থ্য",
    vaccinations: "টিকা"
  },
  calculators: {
    title: "ক্লিনিক্যাল ক্যালকুলেটর",
    subtitle: "প্রমাণ-ভিত্তিক ঝুঁকি স্তরবিন্যাস এবং মেডিকেল সূত্র।"
  },
  library: {
    title: "রোগী লাইব্রেরি",
    subtitle: "প্রমাণ-ভিত্তিক শিক্ষামূলক উপকরণ।",
    searchPlaceholder: "অবস্থা অনুসন্ধান করুন (যেমন: হাঁপানি)...",
    find: "খুঁজুন"
  },
  records: {
    title: "রোগীর রেকর্ড",
    subtitle: "এনক্রিপ্ট করা ইলেকট্রনিক স্বাস্থ্য রেকর্ড (লোকাল)",
    filter: "ফিল্টার এবং সাজান",
    search: "রোগীর রেকর্ড অনুসন্ধান করুন..."
  },
  disclaimer: {
    footer: "ক্লিনিক্যাল ডিসিশন সাপোর্ট সিস্টেম। সমস্ত ফলাফল যাচাই করুন।",
    banner: "মেডিকেল ইন্টেলিজেন্স সিস্টেম।"
  }
};

export const I18N: Record<Language, I18nContent> = {
  en: defaultEn,
  bn: defaultBn,
  hi: defaultEn, // Placeholder for simplicity in this update
  ar: defaultEn, // Placeholder
  es: defaultEn, // Placeholder
  fr: defaultEn, // Placeholder
  zh: defaultEn, // Placeholder
  ja: defaultEn, // Placeholder
};

export const SAFETY_PROMPT_SUFFIX = `
\n\n
IMPORTANT CLINICAL PROTOCOL:
1. You are **Asclepius AI**, a professional Medical Intelligence System architected by **Tanvir Ahmmed**. 
2. **DO NOT** start your response with "As Asclepius AI" or "I am Asclepius AI". Go DIRECTLY to the clinical analysis or answer.
3. Your audience consists of medical professionals or students. Use professional terminology (e.g., "Etiology", "Pathophysiology").
4. Provide structured, high-level clinical differentials.
5. When listing medications, append a standard "Verify Dosage" warning. 
6. Always emphasize "Clinical Correlation Required".
7. RED FLAG DETECTION: If the input suggests a medical emergency (chest pain, stroke symptoms, severe bleeding), start your response with "🚨 **RED FLAG ALERT**" and recommend immediate escalation.
8. Format output in clean Markdown.
`;

export const EMERGENCY_TEXT = "CRITICAL PROTOCOL: If patient presents with hemodynamic instability, altered mental status, or acute distress, initiate emergency response immediately.";

// Mock data remains same...
export const MOCK_SYMPTOM_ANALYSIS = `
\`\`\`json
{
  "conditions": [
    {
      "name": "Cervical Radiculopathy",
      "description": "Compression of nerve roots in the cervical spine. Symptoms align with localized neck pain radiating to the upper extremity. Differential includes disc herniation or spondylosis."
    },
    {
      "name": "Myofascial Pain Syndrome",
      "description": "Chronic pain disorder involving trigger points in the trapezius or levator scapulae. Associated with postural strain ('Text Neck') and repetitive microtrauma."
    }
  ],
  "treatments": [
    {
      "name": "Naproxen",
      "dosage": "500mg BID",
      "description": "NSAID for inflammation/pain control. Monitor renal function."
    },
    {
      "name": "Cyclobenzaprine",
      "dosage": "10mg qHS",
      "description": "Muscle relaxant for acute spasm. Caution: Sedation."
    }
  ],
  "lifestyle": [
    "Ergonomic modification: Monitor height adjustment.",
    "Physical Therapy: Cervical stabilization exercises.",
    "Modality: Moist heat application PRN.",
    "Activity modification: Avoid prolonged flexion."
  ]
}
\`\`\`
`;
export const MOCK_DERM_ANALYSIS = `Dermatology Analysis MOCK`;
export const MOCK_RX_ANALYSIS = `Rx Analysis MOCK`;
export const MOCK_LAB_ANALYSIS = `Lab Analysis MOCK`;
export const MOCK_CHAT_RESPONSE = "Asclepius AI (Offline Mode): Unable to access live medical databases. Displaying cached clinical protocols only.";
