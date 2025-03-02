import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId,
    contents: string
    timestamp: Date
}

export const messageSchema: Schema<IMessage> = new Schema(
    {
        senderId: { type: Schema.ObjectId, ref: 'User', required: true },
        contents: { type: String, required: true },
        timestamp: { type: Date, required: true }
    },
    { _id: false }
);