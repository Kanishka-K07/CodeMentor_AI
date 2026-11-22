import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, 'data');
const USERS_FILE = path.resolve(DATA_DIR, 'fallback_users.json');
const STORE_FILE = path.resolve(DATA_DIR, 'fallback_data.json');

// Ensure data directory exists
function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Read JSON file safely
function readJson(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) return defaultValue;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`[FallbackStorage] Error reading ${filePath}:`, err.message);
    return defaultValue;
  }
}

// Write JSON file safely
function writeJson(filePath, data) {
  try {
    ensureDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`[FallbackStorage] Error writing ${filePath}:`, err.message);
  }
}

export const fallbackStorage = {
  // ── USER MANAGEMENT ──────────────────────────────────────────

  getUsers() {
    return readJson(USERS_FILE, []);
  },

  findUserByEmail(email) {
    const users = this.getUsers();
    const normalized = email.toLowerCase().trim();
    return users.find((u) => u.email.toLowerCase() === normalized) || null;
  },

  findUserById(id) {
    const users = this.getUsers();
    return users.find((u) => u.id === id || u._id === id) || null;
  },

  createUser(userData) {
    const users = this.getUsers();
    const id = `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const newUser = {
      id,
      _id: id,
      name: userData.name,
      email: userData.email.toLowerCase().trim(),
      passwordHash: userData.passwordHash,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.name)}`,
      role: userData.role || 'student',
      userStats: userData.userStats || {},
      problemProgress: userData.problemProgress || {},
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    writeJson(USERS_FILE, users);
    return newUser;
  },

  updateUser(id, updates) {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === id || u._id === id);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...updates,
      id: users[index].id,
      _id: users[index]._id,
    };
    writeJson(USERS_FILE, users);
    return users[index];
  },

  async syncFallbackUsersToMongo(UserModel) {
    try {
      const users = this.getUsers();
      if (!users.length) return;

      console.log(`[FallbackStorage] Checking ${users.length} fallback user(s) for MongoDB sync...`);
      for (const u of users) {
        const existing = await UserModel.findOne({ email: u.email });
        if (!existing) {
          await UserModel.create({
            name: u.name,
            email: u.email,
            passwordHash: u.passwordHash,
            avatar: u.avatar,
            role: u.role,
            userStats: u.userStats,
            problemProgress: u.problemProgress,
          });
          console.log(`[FallbackStorage] Migrated user to MongoDB: ${u.email}`);
        }
      }
    } catch (err) {
      console.warn('[FallbackStorage] Error syncing users to MongoDB:', err.message);
    }
  },

  // ── GENERAL STORE (Submissions, Progress, Drafts, Stats) ─────

  getStore() {
    return readJson(STORE_FILE, {
      submissions: [],
      progress: {},
      drafts: {},
      stats: {},
    });
  },

  saveStore(store) {
    writeJson(STORE_FILE, store);
  },

  getSubmissions(problemId, limit = 50) {
    const store = this.getStore();
    let list = store.submissions || [];
    if (problemId !== undefined && problemId !== null && problemId !== '') {
      list = list.filter((s) => Number(s.problemId) === Number(problemId));
    }
    return list.slice(0, limit);
  },

  saveSubmission(submission) {
    const store = this.getStore();
    store.submissions = store.submissions || [];
    const idx = store.submissions.findIndex((s) => s.id === submission.id || s.submissionId === submission.id);
    const item = {
      ...submission,
      submissionId: submission.id,
      timestamp: submission.timestamp || Date.now(),
    };
    if (idx !== -1) {
      store.submissions[idx] = item;
    } else {
      store.submissions.unshift(item);
    }
    this.saveStore(store);
    return item;
  },

  getProgress() {
    const store = this.getStore();
    return store.progress || {};
  },

  saveProgress(problemId, progressData) {
    const store = this.getStore();
    store.progress = store.progress || {};
    store.progress[problemId] = {
      problemId: Number(problemId),
      ...progressData,
    };
    this.saveStore(store);
    return store.progress[problemId];
  },

  getCodeDraft(problemId, language) {
    const store = this.getStore();
    const key = `${problemId}_${language.toLowerCase()}`;
    return store.drafts?.[key]?.code ?? null;
  },

  saveCodeDraft(problemId, language, code) {
    const store = this.getStore();
    store.drafts = store.drafts || {};
    const key = `${problemId}_${language.toLowerCase()}`;
    store.drafts[key] = {
      code,
      updatedAt: new Date().toISOString(),
    };
    this.saveStore(store);
  },

  deleteCodeDraft(problemId, language) {
    const store = this.getStore();
    if (store.drafts) {
      const key = `${problemId}_${language.toLowerCase()}`;
      delete store.drafts[key];
      this.saveStore(store);
    }
  },

  getStats() {
    const store = this.getStore();
    return store.stats || {};
  },

  saveStats(statsData) {
    const store = this.getStore();
    store.stats = { ...store.stats, ...statsData };
    this.saveStore(store);
    return store.stats;
  },

  bulkSync({ submissions = [], problemProgress = {}, userStats }) {
    const store = this.getStore();
    if (submissions && submissions.length) {
      store.submissions = submissions;
    }
    if (problemProgress && Object.keys(problemProgress).length) {
      store.progress = { ...store.progress, ...problemProgress };
    }
    if (userStats) {
      store.stats = { ...store.stats, ...userStats };
    }
    this.saveStore(store);
  },
};

