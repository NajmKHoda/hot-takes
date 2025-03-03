"use server"

import Gemini from "../gemini/gemini";

/**
 * Analyzes a user argument for logical fallacies using Gemini API
 * @param text The argument text to analyze
 * @returns A JSON string containing the analysis results
 */
export async function analyze(text: string): Promise<string> {
  try {
    // Ensure Gemini is connected before proceeding
    await Gemini.connect();
    
    // Use the enhanced analyzeUserMessage method
    const result = await Gemini.analyzeUserMessage(text);
    
    return result;
  } catch (error) {
    console.error("Error in analyze server action:", error);
    return "[]";
  }
}
