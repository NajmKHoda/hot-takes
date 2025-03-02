import mongoose, { Schema, Document } from 'mongoose'

interface IMessage {
    senderId: mongoose.Types.ObjectId,
    contents: string
    timestamp: Date
}

interface IPost extends Document {
    _id: mongoose.Types.ObjectId,
    posterId: mongoose.Types.ObjectId, // user that is posting
    responderId: mongoose.Types.ObjectId, // user that responds/picks up (will be $unset if not set)
    messages: IMessage[]
}

interface IUser extends Document {
    _id: mongoose.Types.ObjectId,
    username: string,
    email: string,
    posts: IPost[]
}

const userSchema: Schema<IUser> = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        posts: { type: IPost[], required: true }
    }
)