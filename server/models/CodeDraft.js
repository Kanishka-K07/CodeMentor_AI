import mongoose from 'mongoose';

const codeDraftSchema = new mongoose.Schema({
  problemId: { type: Number, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

codeDraftSchema.index({ problemId: 1, language: 1 }, { unique: true });

export const CodeDraft = mongoose.model('CodeDraft', codeDraftSchema);
