
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

export const generateChatResponse = async (
    history: { role: string; parts: { text?: string, inlineData?: any }[] }[], 
    newMessage: string, 
    language: string = 'en',
    image?: string // Base64 optional
) => {
    if (isOfflineMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return MOCK_CHAT_RESPONSE;
    }

    if (!aiInstance) throw new Error("API not initialized");

    try {
        const langLabel = getLanguageLabel(language);
        const systemPrompt = `You are Asclepius AI, an advanced medical intelligence system architected by Tanvir Ahmmed.
        
        Identity & Core Directives:
        1. Identify strictly as "Asclepius AI".
        2. Your primary goal is to assist medical professionals and students.
        3. Respond in ${langLabel}.
        
        Behavioral Protocols:
        - Be helpful, conversational, and highly intelligent.
        - You CAN provide detailed medical explanations, differentials, pharmacology, and physiology.
        - You CAN analyze medical images if provided (X-Rays, Dermatology, Reports).
        - Structure your answers with Markdown.
        
        Safety Limits:
        - Do NOT provide definitive diagnoses for real-world individuals.
        - ALWAYS suggest clinical correlation.
        `;

        // If image is provided in this turn, we must use a model capable of vision (Gemini 2.5 Flash supports it).
        // We construct the chat with history + new message.
        // Google GenAI SDK Chat manages history internally, but we can pass initial history.
        // For vision in chat, we might need to send the image part in `sendMessage`.

        const chat = aiInstance.chats.create({
            model: 'gemini-2.5-flash',
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }]
                },
                {
                    role: 'model',
                    parts: [{ text: `Understood. I am Asclepius AI. I am ready to assist with high-level clinical reasoning and medical information in ${langLabel}.` }]
                },
                ...history
            ]
        });

        let parts: any[] = [{ text: newMessage }];
        
        if (image) {
            const cleanBase64 = image.replace(/^data:(.*,)?/, '');
            parts = [
                {
                    inlineData: {
                        mimeType: 'image/jpeg', // Assuming jpeg for simplicity, or detect from string
                        data: cleanBase64
                    }
                },
                { text: newMessage }
            ];
        }

        const result = await chat.sendMessage(parts);
        return result.text;
    } catch (error) {
        console.error("Gemini Chat Error", error);
        throw error;
    }
}
