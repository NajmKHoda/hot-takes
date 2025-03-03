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

        // Create a comprehensive prompt for debate argument analysis
        // This focuses specifically on detecting common logical fallacies in debate arguments
        const prompt = `
Analyze the following debate argument for logical fallacies. Your goal is to identify if the argument contains any common logical fallacies.

Common fallacies to look for include:
- Ad Hominem: Attacking the person instead of addressing their argument
- Appeal to Authority: Claiming something is true because an authority figure says so
- Appeal to Emotion: Using emotion instead of facts to persuade
- Appeal to Popularity: Claiming something is true because many people believe it
- Bandwagon Fallacy: Assuming something is good or true because it's popular
- Black and White Fallacy: Presenting only two options when more exist
- False Cause: Claiming one event caused another without sufficient evidence
- Hasty Generalization: Drawing broad conclusions from limited evidence
- Slippery Slope: Claiming one small step will lead to extreme consequences
- Straw Man: Misrepresenting an opponent's argument to make it easier to attack
- Red Herring: Introducing an irrelevant topic to divert attention
- Tu Quoque: Avoiding criticism by turning it back on the accuser
- Circular Reasoning: Using the conclusion as a premise
- No True Scotsman: Redefining a term to exclude counterexamples

For each fallacy you identify, provide:
1. The name of the fallacy
2. A description of the fallacy
3. A probability score (0.0 to 1.0) indicating your confidence that this fallacy is present
4. Specific examples/quotes from the argument that demonstrate the fallacy

Return your analysis as a JSON array with this structure:
[
  {
    "name": "Fallacy Name",
    "description": "Brief description of what this fallacy is",
    "probability": 0.75,
    "examples": ["Direct quote or paraphrase showing the fallacy"]
  }
]

If you don't find any significant logical fallacies, return an empty array: []

Be strict in your analysis. Only identify clear fallacies, not just weak arguments.

Argument to analyze: "${message}"`;

        try {
            return await this.generateText(prompt);
        } catch (error) {
            console.error("Failed to analyze argument:", error);
            return "[]";
        }
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
