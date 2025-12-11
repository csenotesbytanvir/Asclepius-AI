
export type RecordType = 'symptom' | 'derm' | 'rx' | 'lab' | 'chat' | 'wellness' | 'interaction';

export interface RecordBase {
  id: string;
  type: RecordType;
  title: string;
  createdAt: number; // timestamp
  language: string;
  payload: any; // Decrypted payload
  meta?: {
      age?: string;
      sex?: string;
      bodyPart?: string;
      condition?: string;
  };
}

// Stored version is encrypted
export interface EncryptedRecord {
  id: string;
  iv: string; // Base64
  data: string; // Base64
  meta?: {
      age?: string;
      sex?: string;
      bodyPart?: string;
      condition?: string;
  };
}

export interface SymptomPayload {
  demographics: { name: string; age: string; sex: string };
  symptom?: string;
  bodyPart?: string;
  symptoms?: string[];
  otherSymptoms?: string; // Free text
  duration?: string;
  severity?: number;
  history?: string;
  
  // Structured result
  conditions?: { name: string; description: string }[];
  treatments?: { name: string; dosage: string; description: string }[];
  lifestyle?: string[];
  rawAnalysis: string; // Markdown fallback
}

export interface AnalyticsData {
    totalRecords: number;
    conditionsMap: Record<string, number>;
    typeDistribution: Record<RecordType, number>;
    activityByDate: { date: string; label: string; count: number }[];
    demographics: { 
        ageGroups: Record<string, number>; 
        gender: Record<string, number>;
    };
    bodyParts: Record<string, number>;
}

export type Language = 'en' | 'bn' | 'hi' | 'ar' | 'es' | 'fr' | 'zh' | 'ja';
export type AppTheme = 'nebula' | 'clinical' | 'onyx';

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'ar', label: 'العربية (Arabic)' },
  { code: 'es', label: 'Español (Spanish)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'zh', label: '中文 (Chinese)' },
  { code: 'ja', label: '日本語 (Japanese)' },
];

export const getLanguageLabel = (code: string): string => {
    return LANGUAGES.find(l => l.code === code)?.label || 'English';
};

export interface I18nContent {
  nav: {
    dashboard: string;
    symptomChecker: string;
    dermatology: string;
    rxScanner: string;
    pharmacology: string;
    labIntel: string;
    wellness: string;
    calculators: string;
    library: string;
    chat: string;
    records: string;
    config: string;
    diagnostics: string;
    tools: string;
    care: string;
  };
  common: {
    save: string;
    delete: string;
    exportPdf: string;
    processing: string;
    upload: string;
    cancel: string;
    submit: string;
    next: string;
    back: string;
    welcome: string;
    systemOperational: string;
    offlineMode: string;
    newIntake: string;
    viewDetails: string;
    analyze: string;
    reset: string;
    guide: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    biosystems: string;
    biosystemsDesc: string;
    privacy: string;
    privacyDesc: string;
    recentActivity: string;
    analytics: string;
    noRecords: string;
  };
  symptomChecker: {
    title: string;
    subtitle: string;
    demographics: string;
    name: string;
    age: string;
    sex: string;
    step1: string;
    notes: string;
    assessment: string;
    pharmacotherapy: string;
    interventions: string;
  };
  dermatology: {
    title: string;
    subtitle: string;
    uploadText: string;
    awaiting: string;
  };
  rxScanner: {
    title: string;
    subtitle: string;
    uploadText: string;
    awaiting: string;
  };
  lab: {
    title: string;
    subtitle: string;
    uploadText: string;
    awaiting: string;
  };
  pharmacology: {
    title: string;
    subtitle: string;
    lookup: string;
    interaction: string;
    drugName: string;
    drugA: string;
    drugB: string;
    check: string;
    mechanism: string;
    indications: string;
    sideEffects: string;
    warnings: string;
    pearls: string;
  };
  wellness: {
    title: string;
    subtitle: string;
    chronic: string;
    mental: string;
    vaccinations: string;
  };
  calculators: {
    title: string;
    subtitle: string;
  };
  library: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    find: string;
  };
  records: {
    title: string;
    subtitle: string;
    filter: string;
    search: string;
  };
  disclaimer: {
    footer: string;
    banner: string;
  };
}