import { GoogleGenAI } from "@google/genai";
import { 
  SAFETY_PROMPT_SUFFIX, 
  MOCK_SYMPTOM_ANALYSIS, 
  MOCK_DERM_ANALYSIS, 
  MOCK_RX_ANALYSIS, 
  MOCK_LAB_ANALYSIS, 
  MOCK_CHAT_RESPONSE 
} from "../constants";
import { getLanguageLabel } from "../types";

let isOfflineMode = false;

export const initializeGemini = (offline: boolean) => {
  isOfflineMode = offline || !navigator.onLine;
};

const getClinicalSystemPrompt = (langLabel: string, targetAcc: string) => `
IDENTITY: "Asclepius Medical Intelligence".
ROLE: Senior Clinical Consultant.
LANGUAGE: Respond strictly in ${langLabel}.
TARGET_ACCURACY: ${targetAcc}.

STRICT OUTPUT REQUIREMENT: 
You MUST provide your analysis in a structured JSON format to feed the Clinical Bio-Ledger. 
JSON Structure:
{
  "conditions": [
    {
      "name": "Clinical Diagnosis Name",
      "description": "High-fidelity professional description.",
      "confidence": 0.87,
      "specialty": "Medical Specialty",
      "etiology": "Cause/Etiology",
      "pathophysiology": "Mechanism of disease"
    }
  ],
  "treatments": [
    {
      "name": "Medication/Treatment",
      "dosage": "Standard Adult Dose",
      "mechanism": "How it works in the body",
      "description": "General notes"
    }
  ],
  "lifestyle": [
    "Specific preventive or lifestyle protocol item 1",
    "Protocol item 2"
  ]
}

For vision tasks (Dermatology, Rx, Lab):
- Extract all visible identifiers.
- Perform neural decryption.
- Map findings to the JSON structure above.

No introductory text. No conversational filler. JSON only.
`;

export const generateAnalysis = async (prompt: string, language: string = 'en', modelName: string = 'gemini-3-flash-preview') => {
  if (isOfflineMode || !navigator.onLine) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_SYMPTOM_ANALYSIS;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const langLabel = getLanguageLabel(language);
    const systemPrompt = getClinicalSystemPrompt(langLabel, "87.3%");
    const fullPrompt = `${systemPrompt}\n\nUSER_QUERY: ${prompt}\n\n${SAFETY_PROMPT_SUFFIX}`;
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: fullPrompt,
      config: { 
        thinkingConfig: { thinkingBudget: 4000 },
        temperature: 0.1 
      }
    });
    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return "HANDSHAKE FAILED: Neural link interrupted. Please verify connectivity.";
  }
};

export const generateMultimodalAnalysis = async (
  prompt: string, 
  base64Image: string, 
  language: string = 'en',
  mimeType: string = 'image/jpeg',
  modelName: string = 'gemini-3-flash-preview'
) => {
  if (isOfflineMode || !navigator.onLine) {
     await new Promise(resolve => setTimeout(resolve, 1200));
     if (prompt.includes("Dermatology")) return MOCK_DERM_ANALYSIS;
     if (prompt.includes("Rx")) return MOCK_RX_ANALYSIS;
     if (prompt.includes("Lab")) return MOCK_LAB_ANALYSIS;
     return MOCK_SYMPTOM_ANALYSIS;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const langLabel = getLanguageLabel(language);
    const systemPrompt = getClinicalSystemPrompt(langLabel, "87.3%");
    const fullPrompt = `${systemPrompt}\n\nUSER_REQUEST: ${prompt}\n\n${SAFETY_PROMPT_SUFFIX}`;
    const cleanBase64 = base64Image.replace(/^data:(.*,)?/, '');

    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          { inlineData: { mimeType, data: cleanBase64 } },
          { text: fullPrompt }
        ]
      },
      config: { 
        thinkingConfig: { thinkingBudget: 4000 },
        temperature: 0.1 
      }
    });
    return response.text;
  } catch (error: any) {
    console.error("Gemini Vision Error:", error);
    return "BIO-CAPTURE FAILURE: Unable to process clinical image.";
  }
};

export const generateChatResponse = async (
    history: { role: string; parts: { text?: string, inlineData?: any }[] }[], 
    newMessage: string, 
    language: string = 'en',
    image?: string 
) => {
    if (isOfflineMode || !navigator.onLine) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_CHAT_RESPONSE;
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        const langLabel = getLanguageLabel(language);
        const systemPrompt = `You are Asclepius AI Senior Consultant. Follow clinical structure assessment for diagnostic queries. Respond in ${langLabel}.`;

        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: { systemInstruction: systemPrompt },
            history: history as any
        });

        let parts: any[] = [{ text: newMessage }];
        if (image) {
            const cleanBase64 = image.replace(/^data:(.*,)?/, '');
            parts = [{ inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } }, { text: newMessage }];
        }
        const result = await chat.sendMessage({ message: parts });
        return result.text;
    } catch (error) {
        console.error("Gemini Chat Error", error);
        return "COMMUNICATION BREAKDOWN: The neural link has been severed.";
    }
}