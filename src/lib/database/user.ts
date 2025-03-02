import mongoose, {Document, Schema, Types} from 'mongoose';
import {IPost, postSchema} from './post';

export interface IUser extends Document {
    _id: Types.ObjectId,
    username: string,
    password: string, // Hashed using bcrypt
    bio: string,
    email: string,
    posts: IPost[],
    joinDate: Date
}

export const userSchema: Schema<IUser> = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        bio: {type: String, default: "Hi there! I'd love to debate."},
        email: {type: String, required: true},
        posts: {type: [postSchema], default: []},
        joinDate: {type: Date, default: Date.now}
    }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);