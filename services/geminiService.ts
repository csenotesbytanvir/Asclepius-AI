
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

let aiInstance: GoogleGenAI | null = null;
let isOfflineMode = false;

export const initializeGemini = (key: string, offline: boolean) => {
  isOfflineMode = offline;
  if (!offline && key) {
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
};

export const getGeminiInstance = () => {
    return aiInstance;
}

export const generateAnalysis = async (prompt: string, language: string = 'en', modelName: string = 'gemini-2.5-flash') => {
  if (isOfflineMode) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_SYMPTOM_ANALYSIS;
  }

  if (!aiInstance) throw new Error("API not initialized");

  try {
    const langLabel = getLanguageLabel(language);
    const fullPrompt = `IMPORTANT: Respond entirely in ${langLabel} language.\n\n` + prompt + SAFETY_PROMPT_SUFFIX;
    const response = await aiInstance.models.generateContent({
      model: modelName,
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Analysis failed. Please try again.");
  }
};

export const generateMultimodalAnalysis = async (
  prompt: string, 
  base64Image: string, 
  language: string = 'en',
  mimeType: string = 'image/jpeg',
  modelName: string = 'gemini-2.5-flash'
) => {
  if (isOfflineMode) {
     await new Promise(resolve => setTimeout(resolve, 1500));
     if (prompt.includes("Dermatology")) return MOCK_DERM_ANALYSIS;
     if (prompt.includes("Pharmacist")) return MOCK_RX_ANALYSIS;
     if (prompt.includes("Lab")) return MOCK_LAB_ANALYSIS;
     return MOCK_SYMPTOM_ANALYSIS;
  }

  if (!aiInstance) throw new Error("API not initialized");

  try {
    const langLabel = getLanguageLabel(language);
    const fullPrompt = `IMPORTANT: Respond entirely in ${langLabel} language.\n\n` + prompt + SAFETY_PROMPT_SUFFIX;
    
    // Clean base64 string if it contains the data url prefix
    const cleanBase64 = base64Image.replace(/^data:(.*,)?/, '');

    const response = await aiInstance.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64
            }
          },
          { text: fullPrompt }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw new Error("Visual analysis failed. Please ensure the image is clear.");
  }
};

export const generateChatResponse = async (history: { role: string; parts: { text: string }[] }[], newMessage: string, language: string = 'en') => {
    if (isOfflineMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return MOCK_CHAT_RESPONSE;
    }

    if (!aiInstance) throw new Error("API not initialized");

    try {
        const langLabel = getLanguageLabel(language);
        const chat = aiInstance.chats.create({
            model: 'gemini-2.5-flash',
            history: [
                {
                    role: 'user',
                    parts: [{ text: `System Instruction: You are Asclepius AI. Respond entirely in ${langLabel} language. ` + SAFETY_PROMPT_SUFFIX }]
                },
                {
                    role: 'model',
                    parts: [{ text: "Understood. I am Asclepius AI, an educational medical assistant. I will not diagnose, prescribe, or provide personalized advice. I will always include safety warnings." }]
                },
                ...history
            ]
        });

        const result = await chat.sendMessage({ message: newMessage });
        return result.text;
    } catch (error) {
        console.error("Gemini Chat Error", error);
        throw error;
    }
}