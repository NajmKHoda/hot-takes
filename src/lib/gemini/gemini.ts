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

    public static async generateText(prompt: string) {
        if (!this.genAI)
            throw new Error("Gemini is not connected.");

        try {
            const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
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
