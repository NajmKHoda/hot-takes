import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './user';

const SESSION_DURATION = Number(process.env.SESSION_DURATION!);

export interface ISession extends Document {
    _id: Types.ObjectId,
    user: Types.ObjectId | IUser,
    createdAt: Date
}

export const sessionSchema: Schema<ISession> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now, expires: SESSION_DURATION },
});

export const Session = mongoose.model<ISession>('Session', sessionSchema);
