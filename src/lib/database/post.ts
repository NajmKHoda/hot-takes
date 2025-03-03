import mongoose, {Document, Schema, Types} from 'mongoose';
import {IMessage, messageSchema} from './message';

export interface IPost extends Document {
    _id: Types.ObjectId,
    title: string,
    summary: string,
    posterIds: Types.ObjectId[],
    messages: IMessage[],
    createdAt: Date,
    likedBy: Types.ObjectId[]
}

export const postSchema: Schema<IPost> = new Schema(
    {
        title: {type: String, required: true},
        summary: {type: String, required: true},
        posterIds: {type: [Schema.ObjectId], ref: 'User', default: []},
        messages: {type: [messageSchema], required: true, default: []}, // Array of messages
        createdAt: {type: Date, default: Date.now},
        likedBy: {type: [Schema.ObjectId], ref: 'User', default: []}
    }
);

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);