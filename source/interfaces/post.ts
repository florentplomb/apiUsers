import { Document } from 'mongoose';

export default interface IPost extends Document {
    type: 'positive' | 'negative' | 'interogative';
    age: 'adult' | 'teenager' | 'child';
    subject: string;
    author: string;
    messages: string[];
    userId: string;
    createdDate: Date;
    status: 'inProgress' | 'open' | 'closed';
}
