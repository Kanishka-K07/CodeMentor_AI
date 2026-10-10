import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    // User Stats
    userStats: {
      totalSolved: { type: Number, default: 0 },
      easySolved: { type: Number, default: 0 },
      mediumSolved: { type: Number, default: 0 },
      hardSolved: { type: Number, default: 0 },
      totalAttempted: { type: Number, default: 0 },
      totalSubmissions: { type: Number, default: 0 },
      acceptedSubmissions: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 },
      bestStreak: { type: Number, default: 0 },
      lastActivityDate: { type: String, default: '' },
      points: { type: Number, default: 0 },
      rank: { type: String, default: 'Beginner' },
      topicMastery: { type: Map, of: Number, default: {} },
      weakConcepts: { type: [String], default: [] },
      activityCalendar: { type: Map, of: Number, default: {} },
    },
    // Problem Progress map: problemId -> progress data
    problemProgress: {
      type: Map,
      of: new mongoose.Schema(
        {
          problemId: Number,
          status: { type: String, enum: ['unsolved', 'attempted', 'solved'], default: 'unsolved' },
          attempts: { type: Number, default: 0 },
          bestSubmissionId: String,
          solvedAt: Number,
        },
        { _id: false }
      ),
      default: {},
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
