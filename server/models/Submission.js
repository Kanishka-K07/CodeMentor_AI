import mongoose from 'mongoose';

const testCaseDetailSchema = new mongoose.Schema({
  id: Number,
  passed: Boolean,
  input: String,
  expected: String,
  got: String,
  executionTime: Number,
  stderr: String,
}, { _id: false });

const submissionSchema = new mongoose.Schema({
  submissionId: { type: String, required: true, unique: true },
  userId: { type: String, index: true, default: null },
  problemId: { type: Number, required: true, index: true },
  problemTitle: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  result: {
    status: { type: String, required: true },
    passedCount: Number,
    totalCount: Number,
    executionTime: Number,
    memoryUsed: Number,
    failedInput: String,
    failedExpected: String,
    failedGot: String,
    compilationError: String,
    runtimeError: String,
    testCaseDetails: [testCaseDetailSchema],
  },
  aiAnalyzed: { type: Boolean, default: false },
  aiResponse: {
    errorExplanation: String,
    conceptDetected: String,
    hint1: String,
    hint2: String,
    hint3: String,
    learningTakeaway: String,
    exactLineNumber: Number,
    failingCodeSnippet: String,
    exactReason: String,
    correctFix: String,
    timeComplexity: String,
    spaceComplexity: String,
    edgeCases: Array,
    codeExplanation: [String],
    followUpQuestion: Object,
  },
  timestamp: { type: Number, default: () => Date.now(), index: true },
}, { timestamps: true });

export const Submission = mongoose.model('Submission', submissionSchema);
