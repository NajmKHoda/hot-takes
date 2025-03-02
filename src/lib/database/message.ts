import mongoose, {Document, Schema} from 'mongoose';

export interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId,
    contents: string,
    timestamp: Date,
    likes: number,
    side: string
}

export const messageSchema: Schema<IMessage> = new Schema(
    {
        senderId: {type: Schema.ObjectId, ref: 'User', required: true},
        contents: {type: String, required: true},
        timestamp: {type: Date, required: true},
        likes: {type: Number, default: 0},
        side: {type: String, required: true}
    },
    {_id: false}
);