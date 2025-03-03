'use server'

import Gemini from "@/lib/gemini/gemini";

export async function analyze(argumentText: string) : Promise<string> {
    return await Gemini.analyzeUserMessage(argumentText)
}