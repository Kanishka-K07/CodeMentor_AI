import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  problemId: { type: Number, required: true, unique: true },
  status: { type: String, enum: ['unsolved', 'attempted', 'solved'], default: 'unsolved' },
  attempts: { type: Number, default: 0 },
  solvedAt: { type: Number },
  bestSubmissionId: { type: String },
}, { timestamps: true });

export const Progress = mongoose.model('Progress', progressSchema);
