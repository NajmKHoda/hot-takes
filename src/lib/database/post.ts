import mongoose, { Schema, Document, Types } from 'mongoose';
import { messageSchema, IMessage } from './message';

export interface IPost extends Document {
    _id: Types.ObjectId,
    posterId: Types.ObjectId, // user that is posting
    responderId: Types.ObjectId, // user that responds/picks up (will be $unset if not set)
    messages: IMessage[]
}

export const postSchema: Schema<IPost> = new Schema(
    {
        posterId: { type: Schema.ObjectId, ref: 'User', required: true },
        responderId: { type: Schema.ObjectId, ref: 'User', default: null }, // responderId can be null
        messages: { type: [messageSchema], required: true }, // Array of messages
    }
);

export const Post = mongoose.model<IPost>('Post', postSchema);