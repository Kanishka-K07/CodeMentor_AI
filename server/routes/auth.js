import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { requireAuth, generateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * Format user for API response (strips sensitive fields)
 */
function sanitizeUser(user) {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.passwordHash;
  return {
    id: obj._id ? obj._id.toString() : obj.id,
    name: obj.name,
    email: obj.email,
    avatar: obj.avatar || '',
    role: obj.role || 'student',
    userStats: obj.userStats || {},
    problemProgress: obj.problemProgress || {},
    createdAt: obj.createdAt,
  };
}

// ============================================================
// 1. REGISTER
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
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Initial user stats and progress (can merge guest localStorage data if provided)
    const userStats = initialData?.userStats || {};
    const problemProgress = initialData?.problemProgress || {};

    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`,
      userStats,
      problemProgress,
    });

    await user.save();
    const token = generateToken(user);

    res.status(201).json({
      user: sanitizeUser(user),
      token,
      message: 'Account created successfully',
    });
  } catch (err) {
    console.error('[Auth Register Error]:', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// ============================================================
// 2. LOGIN
// ============================================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
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
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    console.error('[Auth Me Error]:', err);
    res.status(500).json({ error: 'Failed to fetch user session' });
  }
});

// ============================================================
// 4. UPDATE PROFILE
// ============================================================
router.put('/profile', requireAuth, async (req, res) => {
  try {
    const { name, avatar, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name.trim();
    if (avatar) user.avatar = avatar;

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
      user.passwordHash = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    res.json({ user: sanitizeUser(user), message: 'Profile updated successfully' });
  } catch (err) {
    console.error('[Auth Profile Error]:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ============================================================
// 5. SYNC USER DATA (CLOUD PROGRESS SYNC)
// ============================================================
router.post('/sync', requireAuth, async (req, res) => {
  try {
    const { userStats, problemProgress } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userStats) {
      user.userStats = {
        ...user.userStats,
        ...userStats,
      };
    }

    if (problemProgress) {
      user.problemProgress = {
        ...user.problemProgress,
        ...problemProgress,
      };
    }

    await user.save();
    res.json({ success: true, user: sanitizeUser(user) });
  } catch (err) {
    console.error('[Auth Sync Error]:', err);
    res.status(500).json({ error: 'Failed to sync user data' });
  }
});

export default router;
