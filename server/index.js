import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { Submission } from './models/Submission.js';
import { Progress } from './models/Progress.js';
import { CodeDraft } from './models/CodeDraft.js';
import { UserStats } from './models/UserStats.js';
import { User } from './models/User.js';
import authRouter from './routes/auth.js';
import { fallbackStorage } from './fallbackStorage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.SERVER_PORT || process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codementor_ai';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

// ============================================================
// AUTH ROUTES  (/api/auth/*)
// ============================================================
app.use('/api/auth', authRouter);

// ============================================================
// 1. HEALTH CHECK
// ============================================================
app.get('/api/health', (req, res) => {
  const isConnected = isDbConnected();
  res.json({
    status: 'ok',
    database: isConnected ? 'connected' : 'fallback (local storage)',
    databaseName: isConnected ? (mongoose.connection.name || 'codementor_ai') : 'server/data (local)',
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// 2. SUBMISSIONS
// ============================================================
app.get('/api/submissions', async (req, res) => {
  try {
    const { problemId, limit = 50 } = req.query;

    if (isDbConnected()) {
      const filter = problemId ? { problemId: Number(problemId) } : {};
      const submissions = await Submission.find(filter)
        .sort({ timestamp: -1 })
        .limit(Number(limit))
        .lean();
      return res.json(submissions);
    }

    const submissions = fallbackStorage.getSubmissions(problemId, Number(limit));
    res.json(submissions);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

app.post('/api/submissions', async (req, res) => {
  try {
    const sub = req.body;
    if (!sub || !sub.id || sub.problemId === undefined) {
      return res.status(400).json({ error: 'Invalid submission data' });
    }

    if (isDbConnected()) {
      const doc = await Submission.findOneAndUpdate(
        { submissionId: sub.id },
        {
          submissionId: sub.id,
          problemId: sub.problemId,
          problemTitle: sub.problemTitle,
          language: sub.language,
          code: sub.code,
          result: sub.result,
          aiAnalyzed: Boolean(sub.aiAnalyzed),
          aiResponse: sub.aiResponse || null,
          timestamp: sub.timestamp || Date.now(),
        },
        { upsert: true, new: true }
      );
      return res.status(201).json(doc);
    }

    const saved = fallbackStorage.saveSubmission(sub);
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving submission:', err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// ============================================================
// 3. PROBLEM PROGRESS
// ============================================================
app.get('/api/progress', async (req, res) => {
  try {
    if (isDbConnected()) {
      const items = await Progress.find().lean();
      const map = {};
      for (const item of items) {
        map[item.problemId] = item;
      }
      return res.json(map);
    }

    res.json(fallbackStorage.getProgress());
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

app.post('/api/progress', async (req, res) => {
  try {
    const { problemId, status, attempts, solvedAt, bestSubmissionId } = req.body;
    if (problemId === undefined) {
      return res.status(400).json({ error: 'Missing problemId' });
    }

    if (isDbConnected()) {
      const doc = await Progress.findOneAndUpdate(
        { problemId: Number(problemId) },
        {
          problemId: Number(problemId),
          status,
          attempts: Number(attempts) || 0,
          solvedAt: solvedAt || undefined,
          bestSubmissionId: bestSubmissionId || undefined,
        },
        { upsert: true, new: true }
      );
      return res.json(doc);
    }

    const saved = fallbackStorage.saveProgress(problemId, {
      status,
      attempts: Number(attempts) || 0,
      solvedAt,
      bestSubmissionId,
    });
    res.json(saved);
  } catch (err) {
    console.error('Error updating progress:', err);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// ============================================================
// 4. CODE DRAFTS (PERSISTENT EDITOR CODE)
// ============================================================
app.get('/api/code/:problemId/:language', async (req, res) => {
  try {
    const { problemId, language } = req.params;

    if (isDbConnected()) {
      const draft = await CodeDraft.findOne({
        problemId: Number(problemId),
        language: language.toLowerCase(),
      }).lean();
      return res.json({ code: draft ? draft.code : null });
    }

    const code = fallbackStorage.getCodeDraft(problemId, language);
    res.json({ code });
  } catch (err) {
    console.error('Error fetching code draft:', err);
    res.status(500).json({ error: 'Failed to fetch draft' });
  }
});

app.post('/api/code/:problemId/:language', async (req, res) => {
  try {
    const { problemId, language } = req.params;
    const { code } = req.body;
    if (code === undefined) {
      return res.status(400).json({ error: 'Missing code' });
    }

    if (isDbConnected()) {
      await CodeDraft.findOneAndUpdate(
        { problemId: Number(problemId), language: language.toLowerCase() },
        { code, updatedAt: new Date() },
        { upsert: true }
      );
      return res.json({ success: true });
    }

    fallbackStorage.saveCodeDraft(problemId, language, code);
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving code draft:', err);
    res.status(500).json({ error: 'Failed to save draft' });
  }
});

app.delete('/api/code/:problemId/:language', async (req, res) => {
  try {
    const { problemId, language } = req.params;

    if (isDbConnected()) {
      await CodeDraft.deleteOne({
        problemId: Number(problemId),
        language: language.toLowerCase(),
      });
      return res.json({ success: true });
    }

    fallbackStorage.deleteCodeDraft(problemId, language);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting code draft:', err);
    res.status(500).json({ error: 'Failed to delete draft' });
  }
});

// ============================================================
// 5. USER STATS
// ============================================================
app.get('/api/stats', async (req, res) => {
  try {
    if (isDbConnected()) {
      let stats = await UserStats.findOne().lean();
      if (!stats) {
        stats = await UserStats.create({});
      }
      return res.json(stats);
    }

    res.json(fallbackStorage.getStats());
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.post('/api/stats', async (req, res) => {
  try {
    const data = req.body;

    if (isDbConnected()) {
      const doc = await UserStats.findOneAndUpdate(
        {},
        { $set: data },
        { upsert: true, new: true }
      );
      return res.json(doc);
    }

    const saved = fallbackStorage.saveStats(data);
    res.json(saved);
  } catch (err) {
    console.error('Error saving stats:', err);
    res.status(500).json({ error: 'Failed to save stats' });
  }
});

// ============================================================
// 6. BULK STATE SYNC (SYNC LOCALSTORAGE <-> MONGODB/FALLBACK)
// ============================================================
app.post('/api/sync', async (req, res) => {
  try {
    const { submissions = [], problemProgress = {}, userStats } = req.body;

    if (isDbConnected()) {
      for (const sub of submissions) {
        if (sub && sub.id) {
          await Submission.findOneAndUpdate(
            { submissionId: sub.id },
            {
              submissionId: sub.id,
              problemId: sub.problemId,
              problemTitle: sub.problemTitle,
              language: sub.language,
              code: sub.code,
              result: sub.result,
              aiAnalyzed: Boolean(sub.aiAnalyzed),
              aiResponse: sub.aiResponse || null,
              timestamp: sub.timestamp || Date.now(),
            },
            { upsert: true }
          );
        }
      }

      for (const [pId, p] of Object.entries(problemProgress)) {
        if (p) {
          await Progress.findOneAndUpdate(
            { problemId: Number(pId) },
            {
              problemId: Number(pId),
              status: p.status,
              attempts: Number(p.attempts) || 0,
              solvedAt: p.solvedAt,
              bestSubmissionId: p.bestSubmission?.id,
            },
            { upsert: true }
          );
        }
      }

      if (userStats) {
        await UserStats.findOneAndUpdate({}, { $set: userStats }, { upsert: true });
      }

      return res.json({ success: true, message: 'Synced with MongoDB cluster successfully' });
    }

    fallbackStorage.bulkSync({ submissions, problemProgress, userStats });
    res.json({ success: true, message: 'Synced with local fallback storage successfully' });
  } catch (err) {
    console.error('Error during bulk sync:', err);
    res.status(500).json({ error: 'Failed to sync state' });
  }
});

// ============================================================
// 7. LEADERBOARD
// ============================================================
app.get('/api/leaderboard', async (req, res) => {
  try {
    const { period = 'alltime', limit = 20 } = req.query;
    
    let users = [];
    if (isDbConnected()) {
      users = await User.find({}, {
        name: 1, avatar: 1, userStats: 1, createdAt: 1
      }).lean();
    } else {
      users = fallbackStorage.getUsers();
    }
    
    let leaderboard = users
      .filter(u => u.userStats && typeof u.userStats.points === 'number')
      .map(u => ({
        id: (u._id || u.id || '').toString(),
        name: u.name || 'Anonymous',
        avatar: u.avatar || '',
        points: u.userStats.points || 0,
        totalSolved: u.userStats.totalSolved || 0,
        easySolved: u.userStats.easySolved || 0,
        mediumSolved: u.userStats.mediumSolved || 0,
        hardSolved: u.userStats.hardSolved || 0,
        currentStreak: u.userStats.currentStreak || 0,
        bestStreak: u.userStats.bestStreak || 0,
        rank: u.userStats.rank || 'Beginner',
      }))
      .sort((a, b) => b.points - a.points)
      .slice(0, Number(limit));
    
    return res.json({ leaderboard, period });
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// ============================================================
// START SERVER & CONNECT MONGODB (RESILIENT)
// ============================================================
let isConnecting = false;

async function connectDb() {
  if (isConnecting || isDbConnected()) return;
  isConnecting = true;

  try {
    console.log(`[MongoDB] Connecting to: ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected successfully to database: ${mongoose.connection.name}`);

    // Sync any users created in fallback mode
    await fallbackStorage.syncFallbackUsersToMongo(User);
  } catch (err) {
    console.warn(`[MongoDB] Notice: Could not connect to local MongoDB (${err.message}).`);
    console.warn(`[MongoDB] Running in Local Fallback Storage mode (server/data/).`);
    console.warn(`[MongoDB] All authentication and problem features work seamlessly.`);
    console.warn(`[MongoDB] (Optional) To enable MongoDB on Windows: run 'net start MongoDB' as Admin.`);
    // Retry in background
    setTimeout(connectDb, 20000);
  } finally {
    isConnecting = false;
  }
}

// Start Express server immediately - NEVER exit or block on MongoDB
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`[CodeMentor Server] Backend running at http://localhost:${PORT}`);
  console.log(`[CodeMentor Server] Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
  // Attempt DB connection in background
  connectDb();
});
