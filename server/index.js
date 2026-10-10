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
import authRouter from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.SERVER_PORT || process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codementor_ai';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ============================================================
// AUTH ROUTES  (/api/auth/*)
// ============================================================
app.use('/api/auth', authRouter);

// ============================================================
// 1. HEALTH CHECK
// ============================================================
app.get('/api/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'ok',
    database: isConnected ? 'connected' : 'disconnected',
    databaseName: mongoose.connection.name || 'codementor_ai',
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// 2. SUBMISSIONS
// ============================================================
app.get('/api/submissions', async (req, res) => {
  try {
    const { problemId, limit = 50 } = req.query;
    const filter = problemId ? { problemId: Number(problemId) } : {};
    const submissions = await Submission.find(filter)
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .lean();
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

    res.status(201).json(doc);
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
    const items = await Progress.find().lean();
    const map = {};
    for (const item of items) {
      map[item.problemId] = item;
    }
    res.json(map);
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

    res.json(doc);
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
    const draft = await CodeDraft.findOne({
      problemId: Number(problemId),
      language: language.toLowerCase(),
    }).lean();

    res.json({ code: draft ? draft.code : null });
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

    await CodeDraft.findOneAndUpdate(
      { problemId: Number(problemId), language: language.toLowerCase() },
      { code, updatedAt: new Date() },
      { upsert: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Error saving code draft:', err);
    res.status(500).json({ error: 'Failed to save draft' });
  }
});

app.delete('/api/code/:problemId/:language', async (req, res) => {
  try {
    const { problemId, language } = req.params;
    await CodeDraft.deleteOne({
      problemId: Number(problemId),
      language: language.toLowerCase(),
    });
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
    let stats = await UserStats.findOne().lean();
    if (!stats) {
      stats = await UserStats.create({});
    }
    res.json(stats);
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.post('/api/stats', async (req, res) => {
  try {
    const data = req.body;
    const doc = await UserStats.findOneAndUpdate(
      {},
      { $set: data },
      { upsert: true, new: true }
    );
    res.json(doc);
  } catch (err) {
    console.error('Error saving stats:', err);
    res.status(500).json({ error: 'Failed to save stats' });
  }
});

// ============================================================
// 6. BULK STATE SYNC (SYNC LOCALSTORAGE <-> MONGODB)
// ============================================================
app.post('/api/sync', async (req, res) => {
  try {
    const { submissions = [], problemProgress = {}, userStats } = req.body;

    // 1. Sync submissions
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

    // 2. Sync progress
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

    // 3. Sync stats
    if (userStats) {
      await UserStats.findOneAndUpdate({}, { $set: userStats }, { upsert: true });
    }

    res.json({ success: true, message: 'Synced with MongoDB cluster successfully' });
  } catch (err) {
    console.error('Error during bulk sync:', err);
    res.status(500).json({ error: 'Failed to sync state' });
  }
});

// ============================================================
// START SERVER & CONNECT MONGODB
// ============================================================
async function startServer() {
  try {
    console.log(`[MongoDB] Connecting to: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI);
    console.log(`[MongoDB] Connected successfully to database: ${mongoose.connection.name}`);

    app.listen(PORT, () => {
      console.log(`[CodeMentor Server] Backend API running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('[MongoDB] Connection error:', err.message);
    process.exit(1);
  }
}

startServer();
