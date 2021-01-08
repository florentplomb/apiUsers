import { Document } from 'mongoose';

export default interface IPost extends Document {
    title: string;
    author: string;
    userId: string;
}
