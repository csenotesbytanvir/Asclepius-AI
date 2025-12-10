

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
      symptomChecker: "Clinical Analysis",
      dermatology: "Dermatology Vision",
      rxScanner: "Rx Decrypter",
      labIntel: "Pathology Intel",
      chat: "Asclepius Chat",
      records: "Patient Records",
      config: "System Config"
    },
    common: {
      save: "Record Encrypted",
      delete: "Delete Record",
      exportPdf: "Print Clinical Report",
      processing: "Processing Clinical Data...",
      upload: "Upload Clinical Image",
      cancel: "Abort",
      submit: "Run Differential Analysis",
      next: "Next Phase",
      back: "Return",
      welcome: "System Operational",
      systemOperational: "Biosystems Nominal",
      offlineMode: "Offline Protocol Active",
      newIntake: "New Patient Intake",
      viewDetails: "View Clinical Details"
    },
    disclaimer: {
      footer: "CLINICAL DECISION SUPPORT SYSTEM. Verify all outputs. Not a substitute for professional judgment.",
      banner: "Medical Intelligence System. Data locally encrypted."
    }
  },
  bn: {
    nav: {
      dashboard: "ওভারভিউ",
      symptomChecker: "ক্লিনিক্যাল বিশ্লেষণ",
      dermatology: "চর্মরোগ ভিশন",
      rxScanner: "প্রেসক্রিপশন ডিক্রিপ্টার",
      labIntel: "প্যাথলজি ইন্টেল",
      chat: "অ্যাসক্লেপিয়াস চ্যাট",
      records: "রোগীর রেকর্ড",
      config: "সিস্টেম কনফিগ"
    },
    common: {
      save: "রেকর্ড এনক্রিপ্ট করা হয়েছে",
      delete: "রেকর্ড মুছুন",
      exportPdf: "ক্লিনিক্যাল রিপোর্ট প্রিন্ট",
      processing: "ডেটা প্রক্রিয়া করা হচ্ছে...",
      upload: "ছবি আপলোড করুন",
      cancel: "বাতিল",
      submit: "বিশ্লেষণ শুরু করুন",
      next: "পরবর্তী ধাপ",
      back: "পেছনে",
      welcome: "সিস্টেম সচল",
      systemOperational: "বায়োসিস্টেম স্বাভাবিক",
      offlineMode: "অফলাইন প্রোটোকল",
      newIntake: "নতুন রোগী ইনটেক",
      viewDetails: "বিস্তারিত দেখুন"
    },
    disclaimer: {
      footer: "ক্লিনিক্যাল ডিসিশন সাপোর্ট সিস্টেম। সমস্ত ফলাফল যাচাই করুন।",
      banner: "মেডিকেল ইন্টেলিজেন্স সিস্টেম।"
    }
  },
  hi: {
    nav: {
      dashboard: "अवलोकन",
      symptomChecker: "नैदानिक विश्लेषण",
      dermatology: "त्वचा रोग विजन",
      rxScanner: "आरएक्स डिक्रिप्टर",
      labIntel: "पैथोलॉजी इंटेल",
      chat: "एस्क्लेपियस चैट",
      records: "रोगी रिकॉर्ड",
      config: "सिस्टम कॉन्फ़िगरेशन"
    },
    common: {
      save: "रिकॉर्ड एन्क्रिप्टेड",
      delete: "हटाएं",
      exportPdf: "नैदानिक रिपोर्ट प्रिंट",
      processing: "प्रक्रिया जारी...",
      upload: "अपलोड करें",
      cancel: "रद्द",
      submit: "विश्लेषण करें",
      next: "अगला",
      back: "वापस",
      welcome: "सिस्टम चालू",
      systemOperational: "सिस्टम सामान्य",
      offlineMode: "ऑफलाइन",
      newIntake: "नई रोगी जांच",
      viewDetails: "विवरण देखें"
    },
    disclaimer: {
      footer: "नैदानिक निर्णय समर्थन प्रणाली।",
      banner: "चिकित्सा खुफिया प्रणाली।"
    }
  },
  ar: {
    nav: {
      dashboard: "نظرة عامة",
      symptomChecker: "التحليل السريري",
      dermatology: "رؤية الجلدية",
      rxScanner: "محلل الوصفات",
      labIntel: "ذكاء المختبر",
      chat: "دردشة أسكليبيوس",
      records: "سجلات المرضى",
      config: "إعدادات النظام"
    },
    common: {
      save: "تم تشفير السجل",
      delete: "حذف",
      exportPdf: "طباعة التقرير",
      processing: "جارٍ المعالجة...",
      upload: "رفع صورة",
      cancel: "إلغاء",
      submit: "بدء التحليل",
      next: "التالي",
      back: "رجوع",
      welcome: "النظام يعمل",
      systemOperational: "الأنظمة طبيعية",
      offlineMode: "وضع غير متصل",
      newIntake: "مريض جديد",
      viewDetails: "عرض التفاصيل"
    },
    disclaimer: {
      footer: "نظام دعم القرار السريري. تحقق من جميع النتائج.",
      banner: "نظام الذكاء الطبي."
    }
  },
  es: {
    nav: {
      dashboard: "Panel",
      symptomChecker: "Análisis Clínico",
      dermatology: "Visión Dermatológica",
      rxScanner: "Desencriptador Rx",
      labIntel: "Intel Patológica",
      chat: "Chat Asclepius",
      records: "Registros de Pacientes",
      config: "Configuración"
    },
    common: {
      save: "Registro Encriptado",
      delete: "Eliminar",
      exportPdf: "Imprimir Informe",
      processing: "Procesando...",
      upload: "Subir Imagen",
      cancel: "Cancelar",
      submit: "Analizar",
      next: "Siguiente",
      back: "Atrás",
      welcome: "Sistema Operativo",
      systemOperational: "Biosistemas Nominales",
      offlineMode: "Modo Offline",
      newIntake: "Nuevo Paciente",
      viewDetails: "Ver Detalles"
    },
    disclaimer: {
      footer: "SISTEMA DE APOYO A LA DECISIÓN CLÍNICA.",
      banner: "Sistema de Inteligencia Médica."
    }
  },
  fr: {
    nav: {
      dashboard: "Tableau de Bord",
      symptomChecker: "Analyse Clinique",
      dermatology: "Vision Dermatologique",
      rxScanner: "Décrypteur Rx",
      labIntel: "Intel Pathologique",
      chat: "Chat Asclepius",
      records: "Dossiers Patients",
      config: "Configuration"
    },
    common: {
      save: "Dossier Chiffré",
      delete: "Supprimer",
      exportPdf: "Imprimer Rapport",
      processing: "Traitement...",
      upload: "Télécharger",
      cancel: "Annuler",
      submit: "Analyser",
      next: "Suivant",
      back: "Retour",
      welcome: "Système Actif",
      systemOperational: "Nominal",
      offlineMode: "Hors Ligne",
      newIntake: "Nouveau Patient",
      viewDetails: "Voir Détails"
    },
    disclaimer: {
      footer: "SYSTÈME D'AIDE À LA DÉCISION CLINIQUE.",
      banner: "Système de renseignement médical."
    }
  },
  zh: {
    nav: {
      dashboard: "仪表盘",
      symptomChecker: "临床分析",
      dermatology: "皮肤视觉",
      rxScanner: "处方解读",
      labIntel: "病理智能",
      chat: "Asclepius 聊天",
      records: "患者记录",
      config: "系统配置"
    },
    common: {
      save: "记录已加密",
      delete: "删除",
      exportPdf: "打印临床报告",
      processing: "处理中...",
      upload: "上传",
      cancel: "取消",
      submit: "分析",
      next: "下一步",
      back: "返回",
      welcome: "系统运行",
      systemOperational: "正常",
      offlineMode: "离线",
      newIntake: "新患者",
      viewDetails: "查看详情"
    },
    disclaimer: {
      footer: "临床决策支持系统。",
      banner: "医疗智能系统。"
    }
  },
  ja: {
    nav: {
      dashboard: "ダッシュボード",
      symptomChecker: "臨床分析",
      dermatology: "皮膚科ビジョン",
      rxScanner: "処方箋解読",
      labIntel: "病理インテリ",
      chat: "Asclepius チャット",
      records: "患者記録",
      config: "システム設定"
    },
    common: {
      save: "記録暗号化済み",
      delete: "削除",
      exportPdf: "臨床レポート印刷",
      processing: "処理中...",
      upload: "アップロード",
      cancel: "キャンセル",
      submit: "分析開始",
      next: "次へ",
      back: "戻る",
      welcome: "システム稼働",
      systemOperational: "正常",
      offlineMode: "オフライン",
      newIntake: "新規患者",
      viewDetails: "詳細を見る"
    },
    disclaimer: {
      footer: "臨床意思決定支援システム。",
      banner: "医療インテリジェンスシステム。"
    }
  }
};

export const SAFETY_PROMPT_SUFFIX = `
\n\n
IMPORTANT CLINICAL PROTOCOL AND IDENTITY:
1. You are Asclepius AI, a professional Medical Intelligence & Clinical Decision Support System.
2. You were architected by Tanvir Ahmmed and Team Curadex.
3. You are NOT Google Gemini or OpenAI. Do not mention Google or Gemini.
4. Your audience consists of medical professionals or students using this for differential diagnosis support.
5. Use professional medical terminology (e.g., "Etiology", "Pathophysiology", "Pharmacotherapy").
6. Provide structured, high-level clinical differentials.
7. When listing medications, provide standard clinical dosages if appropriate for the context, but append a standard "Verify Dosage" warning. 
8. Always emphasize "Clinical Correlation Required".
9. Format output in clean Markdown.
`;

export const EMERGENCY_TEXT = "CRITICAL PROTOCOL: If patient presents with hemodynamic instability, altered mental status, or acute distress, initiate emergency response immediately.";

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

export const MOCK_DERM_ANALYSIS = `
## Dermatology Vision Analysis

**Clinical Observation:**
- Well-circumscribed, hyperpigmented macule with regular borders.
- No sign of ulceration or satellite lesions.

**Differential Diagnosis:**
1. **Benign Melanocytic Nevus**
2. **Solar Lentigo**
3. **Seborrheic Keratosis**

**Clinical Recommendations:**
- **Dermoscopy** required for definitive evaluation.
- Monitor for ABCDE criteria evolution.
- Biopsy if changing rapidly.

**Status:** Non-diagnostic screening result.
`;

export const MOCK_RX_ANALYSIS = `
## Clinical Rx Extraction

**Identified Agents:**
- **Amoxicillin (Amoxil)**
- **Prednisone (Deltasone)**

**Regimen:**
- Amoxicillin: 500mg PO TID x 10 days.
- Prednisone: 40mg PO daily x 5 days, then taper.

**Pharmacology:**
- **Amoxicillin**: Beta-lactam antibiotic. Mechanism: Cell wall synthesis inhibition.
- **Prednisone**: Glucocorticoid. Mechanism: Anti-inflammatory/Immunosuppressive.

**Clinical Pearls:**
- Monitor for hypersensitivity.
- Prednisone: Take with food to minimize GI upset. Monitor glucose in diabetics.
`;

export const MOCK_LAB_ANALYSIS = `
## Pathology Intelligence

**Abnormal Values:**
- **WBC**: 14.2 K/uL (Ref: 4.5-11.0) [HIGH]
- **Neutrophils**: 82% (Ref: 40-70) [HIGH]

**Interpretation:**
Findings are consistent with **Neutrophilic Leukocytosis**, suggestive of an acute bacterial etiology or acute stress response.

**Recommendations:**
- Clinical correlation with fever/symptoms.
- Consider blood cultures if septic.
- Follow-up CBC in 24-48 hours.
`;

export const MOCK_CHAT_RESPONSE = "Asclepius AI (Offline Mode): Unable to access live medical databases. Displaying cached clinical protocols only.";