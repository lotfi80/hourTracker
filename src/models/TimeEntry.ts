import mongoose, { Types, Document, Schema } from 'mongoose';

export interface ITimeEntry extends Document {
    user: Types.ObjectId;
    client: Types.ObjectId;
    date: Date;
    start_time: string;
    end_time: string;
    start_break?: Date;
    end_break?: Date;
    notes?: string;
}

const TimeEntrySchema: Schema<ITimeEntry> = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    date: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    start_break: { type: Date, required: false },
    end_break: { type: Date, required: false },
    notes: { type: String, required: false },
},{timestamps :true});

export const TimeEntry = mongoose.model<ITimeEntry>('TimeEntry', TimeEntrySchema);
