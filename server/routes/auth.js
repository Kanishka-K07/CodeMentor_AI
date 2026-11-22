import express from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { requireAuth, generateToken } from '../middleware/auth.js';
import { fallbackStorage } from '../fallbackStorage.js';

const router = express.Router();

/**
 * Format user for API response (strips sensitive fields)
 */
function sanitizeUser(user) {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.passwordHash;
  return {
    id: obj._id ? obj._id.toString() : (obj.id || String(obj._id || '')),
    name: obj.name,
    email: obj.email,
    avatar: obj.avatar || '',
    role: obj.role || 'student',
    userStats: obj.userStats || {},
    problemProgress: obj.problemProgress || {},
    createdAt: obj.createdAt,
  };
}

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

// ============================================================
// 1. REGISTER (/api/auth/register)
// ============================================================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, initialData } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if account already exists
    if (isDbConnected()) {
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(400).json({ error: 'An account with this email already exists' });
      }
    } else {
      const existing = fallbackStorage.findUserByEmail(normalizedEmail);
      if (existing) {
        return res.status(400).json({ error: 'An account with this email already exists' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userStats = initialData?.userStats || {};
    const problemProgress = initialData?.problemProgress || {};
    const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`;

    let savedUser;
    if (isDbConnected()) {
      const user = new User({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        avatar,
        userStats,
        problemProgress,
      });
      await user.save();
      savedUser = user;
    } else {
      savedUser = fallbackStorage.createUser({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        avatar,
        userStats,
        problemProgress,
      });
    }

    const token = generateToken(savedUser);

    res.status(201).json({
      user: sanitizeUser(savedUser),
      token,
      message: 'Account created successfully',
    });
  } catch (err) {
    console.error('[Auth Register Error]:', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// ============================================================
// 2. LOGIN (/api/auth/login)
// ============================================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = null;

    if (isDbConnected()) {
      user = await User.findOne({ email: normalizedEmail });
    }
    // Also check fallback storage if not found or if DB offline
    if (!user) {
      user = fallbackStorage.findUserByEmail(normalizedEmail);
    }

    if (!user) {
      return res.status(401).json({
        error: 'Account not found. Please click "Create one free" below to register.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }

    const token = generateToken(user);

    res.json({
      user: sanitizeUser(user),
      token,
      message: 'Logged in successfully',
    });
  } catch (err) {
    console.error('[Auth Login Error]:', err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// ============================================================
// 3. GET CURRENT USER (/api/auth/me)
// ============================================================
router.get('/me', requireAuth, async (req, res) => {
  try {
    let user = null;
    if (isDbConnected()) {
      user = await User.findById(req.user.id);
    }
    if (!user) {
      user = fallbackStorage.findUserById(req.user.id);
    }

    if (!user) {
      return res.status(404).json({ error: 'User session not found' });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    console.error('[Auth Me Error]:', err);
    res.status(500).json({ error: 'Failed to fetch user session' });
  }
});

// ============================================================
// 4. UPDATE PROFILE (/api/auth/profile)
// ============================================================
router.put('/profile', requireAuth, async (req, res) => {
  try {
    const { name, avatar, currentPassword, newPassword } = req.body;
    let user = null;
    const isMongo = isDbConnected();

    if (isMongo) {
      user = await User.findById(req.user.id);
    }
    if (!user) {
      user = fallbackStorage.findUserById(req.user.id);
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let updatedPasswordHash = null;
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required to set a new password' });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters' });
      }
      const salt = await bcrypt.genSalt(10);
      updatedPasswordHash = await bcrypt.hash(newPassword, salt);
    }

    if (isMongo && user.save) {
      if (name) user.name = name.trim();
      if (avatar) user.avatar = avatar;
      if (updatedPasswordHash) user.passwordHash = updatedPasswordHash;
      await user.save();
      return res.json({ user: sanitizeUser(user), message: 'Profile updated successfully' });
    } else {
      const updates = {};
      if (name) updates.name = name.trim();
      if (avatar) updates.avatar = avatar;
      if (updatedPasswordHash) updates.passwordHash = updatedPasswordHash;
      const updated = fallbackStorage.updateUser(req.user.id, updates);
      return res.json({ user: sanitizeUser(updated || user), message: 'Profile updated successfully' });
    }
  } catch (err) {
    console.error('[Auth Profile Error]:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ============================================================
// 5. SYNC USER DATA (/api/auth/sync)
// ============================================================
router.post('/sync', requireAuth, async (req, res) => {
  try {
    const { userStats, problemProgress } = req.body;
    let user = null;
    const isMongo = isDbConnected();

    if (isMongo) {
      user = await User.findById(req.user.id);
    }
    if (!user) {
      user = fallbackStorage.findUserById(req.user.id);
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (isMongo && user.save) {
      if (userStats) {
        user.userStats = { ...user.userStats, ...userStats };
      }
      if (problemProgress) {
        user.problemProgress = { ...user.problemProgress, ...problemProgress };
      }
      await user.save();
      return res.json({ success: true, user: sanitizeUser(user) });
    } else {
      const currentStats = user.userStats || {};
      const currentProgress = user.problemProgress || {};
      const updated = fallbackStorage.updateUser(req.user.id, {
        userStats: userStats ? { ...currentStats, ...userStats } : currentStats,
        problemProgress: problemProgress ? { ...currentProgress, ...problemProgress } : currentProgress,
      });
      return res.json({ success: true, user: sanitizeUser(updated || user) });
    }
  } catch (err) {
    console.error('[Auth Sync Error]:', err);
    res.status(500).json({ error: 'Failed to sync user data' });
  }
});

export default router;
