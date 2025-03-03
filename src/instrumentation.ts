import mongoose from 'mongoose';
import Gemini from '@/lib/gemini/gemini';

export async function register() {
    await mongoose.connect(process.env.MONGO_URI!)
    await Gemini.connect(process.env.GEMINI_KEY!)
}