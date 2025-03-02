import {GoogleGenerativeAI} from "@google/generative-ai";

class Gemini {
    private static genAI: GoogleGenerativeAI;

    public static async connect(apiKey: string) {
        if (this.genAI) return; // already exists
        try {
            this.genAI = new GoogleGenerativeAI(apiKey);
            console.log("Gemini connected successfully.");
        } catch (error) {
            console.error("Failed to connect to Gemini:", error);
            throw error;
        }
    }

    public static async analyzeUserMessage(message: string) {
        if (!this.genAI)
            throw new Error("Gemini is not connected.");

        return this.generateText(
            "Analyze the following user message for logical fallacies and misinformation. "
            + "Provide a concise analysis of the user's message, ideally around 3 bullet points or less. "
            + "Do not use * characters for special formatting, only new lines. "
            + "If the user's argument is logically sound, simply return only the following text: 'argument-sound'. "
            + "User message: " + message
        )
    }

    public static async generateText(prompt: string) {
        if (!this.genAI)
            throw new Error("Gemini is not connected.");

        try {
            const model = this.genAI.getGenerativeModel({model: "gemini-2.0-flash"});
            const result = await model.generateContent(prompt);
            const response = result.response;
            return response.text();
        } catch (error) {
            console.error("Failed to generate text:", error);
            throw error;
        }
    }
}

export default Gemini;
