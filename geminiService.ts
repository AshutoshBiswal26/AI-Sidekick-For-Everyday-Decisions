
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not found. AI features will be disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const SYSTEM_INSTRUCTION = `You are "AI Sidekick", an advanced AI assistant dedicated to helping users make better everyday decisions. Your goal is to provide clear, insightful, and actionable advice.
When a user presents a decision-making scenario:
1. Analyze the core problem or choice.
2. If applicable, explore potential options or angles the user might not have considered.
3. Offer a balanced perspective, outlining pros and cons where relevant.
4. Provide reasoning and explanations for your suggestions.
5. Encourage thoughtful consideration rather than giving definitive commands.
6. Maintain a supportive, empathetic, and slightly informal tone, like a helpful friend.
7. Format your response clearly. Use markdown for headings, lists, and emphasis where it enhances readability.
User's decision query is:`;

export const getDecisionAdvice = async (userQuery: string): Promise<string> => {
  if (!ai) {
    return Promise.reject("AI service is not available. Please ensure the API_KEY is configured.");
  }

  try {
    const fullPrompt = `${SYSTEM_INSTRUCTION}\n\n"${userQuery}"`;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: fullPrompt,
      config: {
        // Omitting thinkingConfig to default to enabled thinking for higher quality
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching decision advice from Gemini API:", error);
    if (error instanceof Error) {
      return Promise.reject(`Failed to get advice from AI: ${error.message}`);
    }
    return Promise.reject("An unknown error occurred while contacting the AI service.");
  }
};
