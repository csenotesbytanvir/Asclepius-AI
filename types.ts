
export type RecordType = 'symptom' | 'derm' | 'rx' | 'lab' | 'chat';

export interface RecordBase {
  id: string;
  type: RecordType;
  title: string;
  createdAt: number; // timestamp
  language: string;
  payload: any; // Decrypted payload
}

// Stored version is encrypted
export interface EncryptedRecord {
  id: string;
  iv: string; // Base64
  data: string; // Base64
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
    activityByDate: { date: string; count: number }[];
    demographics: { ageGroups: Record<string, number>; gender: Record<string, number> };
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
    labIntel: string;
    chat: string;
    records: string;
    config: string;
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
  };
  disclaimer: {
    footer: string;
    banner: string;
  };
}
