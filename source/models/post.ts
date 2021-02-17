import mongoose, { Schema } from 'mongoose';
import IPost from '../interfaces/post';

const PostSchema: Schema = new Schema(
    {
        type: { type: String, required: true },
        age: { type: String, required: true },
        subject: { type: String, required: true },
        createdDate: { type: Date, required: true },
        // messages: [{ type: Schema.Types.ObjectId, ref: Message }],
        userId: { type: Schema.Types.ObjectId, required: true },
        status: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPost>('Post', PostSchema);
