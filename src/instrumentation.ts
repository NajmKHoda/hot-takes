import mongoose from 'mongoose';

export async function register() {
    await mongoose.connect(process.env.MONGO_URI!)
}