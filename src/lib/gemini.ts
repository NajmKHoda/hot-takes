import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Configure safety settings to allow debate-style responses
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

// Hardcoded API key for development - use the one from .env
const GEMINI_API_KEY = 'AIzaSyAN3Naj8IOv8BjvXAreO8laQ6YqwfO6ibU';

// Get API key from environment or window object
const getApiKey = () => {
  // For debugging only
  console.log('API Key sources:', {
    windowKey: typeof window !== 'undefined' ? Boolean(window.ENV_GEMINI_API_KEY) : false,
    envKey: Boolean(process.env.NEXT_PUBLIC_GEMINI_API_KEY),
    hardcodedKey: Boolean(GEMINI_API_KEY)
  });
  
  if (typeof window !== 'undefined' && window.ENV_GEMINI_API_KEY) {
    return window.ENV_GEMINI_API_KEY;
  }
  
  if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    return process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  }
  
  // Use hardcoded key as fallback for development
  return GEMINI_API_KEY;
};

// Create Gemini client instance
const createGeminiClient = () => {
  const apiKey = getApiKey();
  
  try {
    return new GoogleGenerativeAI(apiKey);
  } catch (error) {
    console.error('Error initializing Gemini:', error);
    return null;
  }
};

/**
 * Generates a response using Gemini that plays devil's advocate against the user's argument
 * 
 * @param userMessage The message from the user
 * @param debateTopic The topic of the debate
 * @param debateHistory Optional list of previous messages for context
 * @returns A promise that resolves to the Gemini-generated response
 */
export async function generateDebateResponse(
  userMessage: string,
  debateTopic: string,
  debateHistory: { content: string; sender: "user" | "opponent" }[] = []
): Promise<string> {
  try {
    const genAI = createGeminiClient();
    
    if (!genAI) {
      console.error('Failed to initialize Gemini client, using fallback response');
      // Fallback responses in case of API failure
      const fallbackResponses = [
        "I disagree with your position. The evidence suggests otherwise.",
        "That's an interesting perspective, but it fails to address the core issue.",
        "Your argument overlooks several critical factors that contradict your conclusion.",
        "While I understand your point, there are stronger counterarguments worth considering.",
        "That reasoning has some logical gaps that undermine your overall position."
      ];
      
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
    
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings,
    });

    // Build conversation history for context
    const historyContext = debateHistory.length > 0
      ? `Previous messages in this debate:\n${debateHistory
          .map(msg => `${msg.sender === "user" ? "User" : "Opponent"}: ${msg.content}`)
          .join("\n")}\n\n`
      : "";

    // Craft a prompt that encourages Gemini to play devil's advocate
    const prompt = `
You are participating in a rapid-fire debate on the topic: "${debateTopic}".

${historyContext}

The user's most recent argument is: "${userMessage}"

Your task is to play devil's advocate and counter their argument effectively. Your response should:
1. Be concise (no more than 2-3 sentences)
2. Challenge the user's perspective with a strong counterpoint
3. Use persuasive language and relevant facts or logic
4. Stay directly relevant to the topic and the user's specific points
5. Adopt a slightly adversarial but respectful tone

Respond as if you are the user's debate opponent. Do not include any labels, prefixes, or explanations - just the debate response itself.
`;

    // Generate the response
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Ensure the response is clean (remove any quotes or prefixes Gemini might add)
    return response
      .trim()
      .replace(/^["']|["']$/g, "")
      .replace(/^(Opponent: |Response: )/i, "");
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    
    // Fallback responses in case of API failure
    const fallbackResponses = [
      "I disagree with your position. The evidence suggests otherwise.",
      "That's an interesting perspective, but it fails to address the core issue.",
      "Your argument overlooks several critical factors that contradict your conclusion.",
      "While I understand your point, there are stronger counterarguments worth considering.",
      "That reasoning has some logical gaps that undermine your overall position."
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
}
