import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    hash: string;
    clients?: Types.ObjectId[];
    timeEntry?: Types.ObjectId[];
    
    registerDate: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    timeEntry: [{ type: Schema.Types.ObjectId, ref: 'TimeEntry' }],
    registerDate: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', UserSchema);
