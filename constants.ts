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

export const I18N: Record<Language, I18nContent> = {
  en: {
    nav: {
      dashboard: "Overview",
      symptomChecker: "Symptom Analysis",
      dermatology: "Dermatology Vision",
      rxScanner: "Rx Decrypter",
      labIntel: "Pathology Intel",
      chat: "Asclepius Chat",
      records: "Patient Records",
      config: "Configuration"
    },
    common: {
      save: "Auto-Saved",
      delete: "Delete Record",
      exportPdf: "Export Prescription PDF",
      processing: "Processing Clinical Data...",
      upload: "Upload Clinical Image",
      cancel: "Abort",
      submit: "Run Differential Analysis",
      next: "Next Phase",
      back: "Return",
      welcome: "System Operational",
      systemOperational: "Biosystems Nominal",
      offlineMode: "Offline Protocol Active",
      newIntake: "Start New Intake",
      viewDetails: "View Clinical Details"
    },
    disclaimer: {
      footer: "NOT A MEDICAL DIAGNOSIS. Educational use only. Consult a licensed medical professional for advice.",
      banner: "Non-Clinical Educational Prototype. Data locally encrypted."
    }
  },
  bn: {
    nav: {
      dashboard: "ওভারভিউ",
      symptomChecker: "লক্ষণ বিশ্লেষণ",
      dermatology: "চর্মরোগ ভিশন",
      rxScanner: "প্রেসক্রিপশন ডিক্রিপ্টার",
      labIntel: "প্যাথলজি ইন্টেল",
      chat: "অ্যাসক্লেপিয়াস চ্যাট",
      records: "রোগীর রেকর্ড",
      config: "কনফিগারেশন"
    },
    common: {
      save: "স্বয়ংক্রিয়ভাবে সংরক্ষিত",
      delete: "রেকর্ড মুছুন",
      exportPdf: "প্রেসক্রিপশন পিডিএফ প্রিন্ট",
      processing: "ডেটা প্রক্রিয়া করা হচ্ছে...",
      upload: "ছবি আপলোড করুন",
      cancel: "বাতিল",
      submit: "বিশ্লেষণ শুরু করুন",
      next: "পরবর্তী ধাপ",
      back: "পেছনে",
      welcome: "সিস্টেম সচল",
      systemOperational: "বায়োসিস্টেম স্বাভাবিক",
      offlineMode: "অফলাইন প্রোটোকল",
      newIntake: "নতুন ইনটেক শুরু করুন",
      viewDetails: "বিস্তারিত দেখুন"
    },
    disclaimer: {
      footer: "এটি কোনো চিকিৎসা রোগ নির্ণয় নয়। শুধুমাত্র শিক্ষামূলক ব্যবহারের জন্য। চিকিৎসকের পরামর্শ নিন।",
      banner: "নন-ক্লিনিক্যাল প্রোটোটাইপ।"
    }
  },
  hi: {
    nav: {
      dashboard: "अवलोकन",
      symptomChecker: "लक्षण विश्लेषण",
      dermatology: "त्वचा रोग विजन",
      rxScanner: "आरएक्स डिक्रिप्टर",
      labIntel: "पैथोलॉजी इंटेल",
      chat: "एस्क्लेपियस चैट",
      records: "रोगी रिकॉर्ड",
      config: "कॉन्फ़िगरेशन"
    },
    common: {
      save: "स्वत: सहेजा गया",
      delete: "हटाएं",
      exportPdf: "प्रिस्क्रिप्शन पीडीएफ",
      processing: "प्रक्रिया जारी...",
      upload: "अपलोड करें",
      cancel: "रद्द",
      submit: "विश्लेषण करें",
      next: "अगला",
      back: "वापस",
      welcome: "सिस्टम चालू",
      systemOperational: "सिस्टम सामान्य",
      offlineMode: "ऑफलाइन",
      newIntake: "नई जांच",
      viewDetails: "विवरण देखें"
    },
    disclaimer: {
      footer: "चिकित्सा निदान नहीं। केवल शैक्षिक उपयोग।",
      banner: "गैर-नैदानिक प्रोटोटाइप।"
    }
  },
  ar: {
    nav: {
      dashboard: "نظرة عامة",
      symptomChecker: "تحليل الأعراض",
      dermatology: "رؤية الجلدية",
      rxScanner: "محلل الوصفات",
      labIntel: "ذكاء المختبر",
      chat: "دردشة أسكليبيوس",
      records: "سجلات المرضى",
      config: "إعدادات"
    },
    common: {
      save: "حفظ تلقائي",
      delete: "حذف",
      exportPdf: "تصدير الوصفة",
      processing: "جارٍ المعالجة...",
      upload: "رفع صورة",
      cancel: "إلغاء",
      submit: "بدء التحليل",
      next: "التالي",
      back: "رجوع",
      welcome: "النظام يعمل",
      systemOperational: "الأنظمة طبيعية",
      offlineMode: "وضع غير متصل",
      newIntake: "بدء فحص جديد",
      viewDetails: "عرض التفاصيل"
    },
    disclaimer: {
      footer: "ليس تشخيصًا طبيًا. للاستخدام التعليمي فقط.",
      banner: "نموذج تعليمي غير سريري."
    }
  },
  es: {
    nav: {
      dashboard: "Panel",
      symptomChecker: "Análisis de Síntomas",
      dermatology: "Visión Dermatológica",
      rxScanner: "Desencriptador Rx",
      labIntel: "Intel Patológica",
      chat: "Chat Asclepius",
      records: "Registros de Pacientes",
      config: "Configuración"
    },
    common: {
      save: "Guardado Auto",
      delete: "Eliminar",
      exportPdf: "Exportar PDF",
      processing: "Procesando...",
      upload: "Subir Imagen",
      cancel: "Cancelar",
      submit: "Analizar",
      next: "Siguiente",
      back: "Atrás",
      welcome: "Sistema Operativo",
      systemOperational: "Biosistemas Nominales",
      offlineMode: "Modo Offline",
      newIntake: "Nueva Admisión",
      viewDetails: "Ver Detalles"
    },
    disclaimer: {
      footer: "NO ES UN DIAGNÓSTICO MÉDICO. Uso educativo solamente.",
      banner: "Prototipo educativo."
    }
  },
  fr: {
    nav: {
      dashboard: "Tableau de Bord",
      symptomChecker: "Analyse des Symptômes",
      dermatology: "Vision Dermatologique",
      rxScanner: "Décrypteur Rx",
      labIntel: "Intel Pathologique",
      chat: "Chat Asclepius",
      records: "Dossiers Patients",
      config: "Configuration"
    },
    common: {
      save: "Sauvegarde Auto",
      delete: "Supprimer",
      exportPdf: "Exporter PDF",
      processing: "Traitement...",
      upload: "Télécharger",
      cancel: "Annuler",
      submit: "Analyser",
      next: "Suivant",
      back: "Retour",
      welcome: "Système Actif",
      systemOperational: "Nominal",
      offlineMode: "Hors Ligne",
      newIntake: "Nouvelle Entrée",
      viewDetails: "Voir Détails"
    },
    disclaimer: {
      footer: "PAS UN DIAGNOSTIC MÉDICAL. Usage éducatif uniquement.",
      banner: "Prototype éducatif."
    }
  },
  zh: {
    nav: {
      dashboard: "仪表盘",
      symptomChecker: "症状分析",
      dermatology: "皮肤视觉",
      rxScanner: "处方解读",
      labIntel: "病理智能",
      chat: "Asclepius 聊天",
      records: "患者记录",
      config: "配置"
    },
    common: {
      save: "自动保存",
      delete: "删除",
      exportPdf: "导出 PDF",
      processing: "处理中...",
      upload: "上传",
      cancel: "取消",
      submit: "分析",
      next: "下一步",
      back: "返回",
      welcome: "系统运行",
      systemOperational: "正常",
      offlineMode: "离线",
      newIntake: "新摄入",
      viewDetails: "查看详情"
    },
    disclaimer: {
      footer: "非医疗诊断。仅供教育使用。",
      banner: "教育原型。"
    }
  },
  ja: {
    nav: {
      dashboard: "ダッシュボード",
      symptomChecker: "症状分析",
      dermatology: "皮膚科ビジョン",
      rxScanner: "処方箋解読",
      labIntel: "病理インテリ",
      chat: "Asclepius チャット",
      records: "患者記録",
      config: "設定"
    },
    common: {
      save: "自動保存",
      delete: "削除",
      exportPdf: "PDF出力",
      processing: "処理中...",
      upload: "アップロード",
      cancel: "キャンセル",
      submit: "分析開始",
      next: "次へ",
      back: "戻る",
      welcome: "システム稼働",
      systemOperational: "正常",
      offlineMode: "オフライン",
      newIntake: "新規入力",
      viewDetails: "詳細を見る"
    },
    disclaimer: {
      footer: "医学的診断ではありません。教育目的のみ。",
      banner: "教育用プロトタイプ。"
    }
  }
};

export const SAFETY_PROMPT_SUFFIX = `
\n\n
IMPORTANT SAFETY GUARDRAILS:
1. You are Asclepius AI, an educational medical assistant. You are NOT a doctor.
2. DO NOT provide medical diagnoses. Use phrases like "Possible educational categories include..." or "Common patterns associated with this look like..."
3. DO NOT provide specific medication dosages or personalized treatment plans.
4. You MAY list common generic medication NAMES that are typically used for educational context (e.g., "Analgesics like Ibuprofen"), but explicitly state that dosage requires a physician.
5. ALWAYS list "Red Flags" or "Warning Signs" that require immediate in-person medical attention.
6. Format output in clean Markdown.
7. If the user input suggests a life-threatening emergency (chest pain, stroke symptoms, heavy bleeding), IGNORE the analysis and tell them to call emergency services immediately.
`;

export const DISCLAIMER_TEXT = "NOT A MEDICAL DIAGNOSIS. Educational use only. Consult a licensed medical professional for advice.";
export const EMERGENCY_TEXT = "If symptoms are severe, worsening, or involve shortness of breath, chest pain, sudden weakness, confusion, or loss of consciousness, seek urgent in-person medical care immediately.";

export const MOCK_SYMPTOM_ANALYSIS = `
\`\`\`json
{
  "conditions": [
    {
      "name": "Musculoskeletal Neck Strain",
      "description": "A highly plausible condition for a 22-year-old presenting with neck pain. Often results from overuse, sudden movements, or poor posture. Symptoms typically include localized pain, stiffness, and reduced range of motion."
    },
    {
      "name": "Cervical Postural Syndrome",
      "description": "Given the age and potential screen time, 'tech neck' is common. Refers to chronic strain on neck muscles, ligaments, and joints due to sustained awkward positions, particularly forward head posture."
    }
  ],
  "treatments": [
    {
      "name": "Ibuprofen",
      "dosage": "200-400 mg",
      "description": "To reduce pain and inflammation. Consult physician."
    },
    {
      "name": "Cyclobenzaprine",
      "dosage": "5-10 mg",
      "description": "Muscle relaxant for spasms. Prescription only."
    }
  ],
  "lifestyle": [
    "Optimize ergonomics: Ensure monitor is at eye level.",
    "Regular stretching: Chin tucks and neck rotations.",
    "Mindful posture: Check posture every 30 mins.",
    "Heat/Cold therapy: Heat for muscle tightness."
  ]
}
\`\`\`
`;

export const MOCK_DERM_ANALYSIS = `
## Dermatology Vision Analysis

**Visual Observation:**
- The image appears to show a discrete, raised lesion with regular borders.
- Coloration appears uniform.

**Educational Differentials:**
1. **Benign Nevus (Mole)**: Common pigmentation.
2. **Seborrheic Keratosis**: Common benign skin growth.

**Management Education:**
- Monitor for ABCDE changes (Asymmetry, Border, Color, Diameter, Evolution).
- Protect from sun exposure.

**Disclaimer:** AI cannot rule out malignancy. Please see a dermatologist for dermoscopy.
`;

export const MOCK_RX_ANALYSIS = `
## Rx Extraction

**Detected Medications:**
- **Amoxicillin**
- **Prednisone**

**Usage Instructions:**
- Amoxicillin: Twice daily for 10 days.
- Prednisone: Take with food, tapering dose.

**Educational Drug Class:**
- **Amoxicillin**: Antibiotic for bacterial infections.
- **Prednisone**: Corticosteroid for inflammation.

**⚠️ Safety Warnings:**
- Finish full antibiotic course.
- Prednisone may cause insomnia or mood changes. Verify tapering schedule.
`;

export const MOCK_LAB_ANALYSIS = `
## Lab Report Intelligence

**Extracted Values:**
- **WBC**: 12.5 (High) - *Educational Note*: Leukocytosis often indicates infection or inflammation.
- **Hemoglobin**: 14.0 (Normal)
- **Platelets**: 250 (Normal)

**Summary:**
The elevated White Blood Cell count suggests an immune response. This is a common pattern in bacterial infections.

**Action:**
Discuss these results with your ordering physician.
`;

export const MOCK_CHAT_RESPONSE = "This is a simulated response in Offline Mode. I can explain general medical concepts like 'Dehydration' or 'Hypertension', but I cannot process live queries without an API key.";