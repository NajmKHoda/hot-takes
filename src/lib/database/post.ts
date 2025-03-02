import mongoose, { Schema, Document, Types } from 'mongoose';
import { messageSchema, IMessage } from './message';

export interface IPost extends Document {
    _id: Types.ObjectId,
    title: string,
    summary: string,
    posterIds: Types.ObjectId[],
    messages: IMessage[]
}

export const postSchema: Schema<IPost> = new Schema(
    {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        posterIds: { type: [Schema.ObjectId], ref: 'User', default: [] },
        messages: { type: [messageSchema], required: true, default: [] }, // Array of messages
    }
);

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);