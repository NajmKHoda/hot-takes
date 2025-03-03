import {GoogleGenerativeAI} from "@google/generative-ai";

// Hardcoded API key for development - same as used in API route
const GEMINI_API_KEY = 'AIzaSyAN3Naj8IOv8BjvXAreO8laQ6YqwfO6ibU';

class Gemini {
    private static genAI: GoogleGenerativeAI;
    private static connected: boolean = false;

    public static async connect(apiKey: string = GEMINI_API_KEY) {
        if (this.connected) return; // already exists
        try {
            console.log('Connecting to Gemini API...');
            this.genAI = new GoogleGenerativeAI(apiKey);
            if (this.genAI) {
                console.log("Gemini connected successfully.");
                this.connected = true;
            } else
                throw new Error("Failed to connect to Gemini.")
        } catch (error) {
            console.error("Failed to connect to Gemini:", error);
            throw error;
        }
        return Promise.resolve();
    }

    public static async analyzeUserMessage(message: string) {
        if (!this.connected) {
            // Try to connect with hardcoded key if environment variable fails
            try {
                await Gemini.connect();
            } catch (error) {
                console.error("Failed to connect with API key:", error);
                return "[]"; // Return empty array as fallback
            }
        }

        return this.generateText(
            "Analyze the following user message for logical fallacies and misinformation. "
            + "Provide a concise analysis of the user's message, ideally around 3 bullet points or less. "
            + "Provide your response STRICTLY in JSON (WITHOUT ANY FORMATTING) with a list of logical fallacies that the user's argument contains. "
            + "JSON should have name of fallacy, description, probability(0-1) and specific example of where user uses the fallacy. "
            + "If the user's argument is logically sound, return an empty json array. "
            + "User message: " + message
        );
    }

    public static async generateText(prompt: string) {
        if (!this.connected) {
            throw new Error("Gemini is not connected.");
        }

        try {
            // Use gemini-1.5-flash model which we know works
            const model = this.genAI.getGenerativeModel({model: "gemini-1.5-flash"});
            const result = await model.generateContent(prompt);
            const response = result.response;
            return response.text();
        } catch (error) {
            console.error("Failed to generate text:", error);
            // Return empty JSON array as fallback
            return "[]";
        }
    }
}

export default Gemini;
