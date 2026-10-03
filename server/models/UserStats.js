import mongoose from 'mongoose';

const userStatsSchema = new mongoose.Schema({
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
  rank: { type: String, default: 'Bronze Coder' },
  topicMastery: { type: Map, of: Number, default: {} },
  weakConcepts: { type: [String], default: [] },
  activityCalendar: { type: Map, of: Number, default: {} },
}, { timestamps: true });

export const UserStats = mongoose.model('UserStats', userStatsSchema);
