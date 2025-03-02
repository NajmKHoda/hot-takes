import mongoose, { Schema, Document, Types } from 'mongoose'

interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId,
    contents: string
    timestamp: Date
}

interface IPost extends Document {
    _id: Types.ObjectId,
    posterId: Types.ObjectId, // user that is posting
    responderId: Types.ObjectId, // user that responds/picks up (will be $unset if not set)
    messages: IMessage[]
}

interface IUser extends Document {
    _id: Types.ObjectId,
    username: string,
    email: string,
    posts: IPost[]
}

const messageSchema: Schema<IMessage> = new Schema(
    {
        senderId: { type: Schema.ObjectId, ref: 'User', required: true },
        contents: { type: String, required: true },
        timestamp: { type: Date, required: true }
    },
    { _id: false }
)

const postSchema: Schema<IPost> = new Schema(
    {
        posterId: { type: Schema.ObjectId, ref: 'User', required: true },
        responderId: { type: Schema.ObjectId, ref: 'User', default: null }, // responderId can be null
        messages: { type: [messageSchema], required: true }, // Array of messages
    }
)

const userSchema: Schema<IUser> = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        posts: { type: [postSchema], required: true }
    }
)

const User = mongoose.model<IUser>('User', userSchema);
const Post = mongoose.model<IPost>('Post', postSchema);