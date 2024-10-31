import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IClient extends Document {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    user: Types.ObjectId;
    timeEntry?: Types.ObjectId[];
    createdAt: Date;
}

const ClientSchema: Schema<IClient> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: String, required: false },
    country: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timeEntry: [{ type: Schema.Types.ObjectId, ref: 'TimeEntry' }],
    createdAt: { type: Date, default: Date.now },
});

export const Client = mongoose.model<IClient>('Client', ClientSchema);
