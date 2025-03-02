import mongoose, { Schema, Document, Types } from 'mongoose';
import { postSchema, IPost } from './post';

export interface IUser extends Document {
    _id: Types.ObjectId,
    username: string,
    password: string, // Hashed using bcrypt
    email: string,
    posts: IPost[]
}

export const userSchema: Schema<IUser> = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        posts: { type: [postSchema], default: [] }
    }
);

export const User = mongoose.model<IUser>('User', userSchema);