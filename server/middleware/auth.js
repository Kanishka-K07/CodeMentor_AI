import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'codementor_super_secret_jwt_key_2026';

/**
 * Authentication middleware: verifies JWT token from Authorization header
 */
export function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authentication token' });
  }
}

/**
 * Optional authentication middleware: if token exists, verifies and attaches req.user,
 * but allows guest requests through if no token is provided.
 */
export function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    }
  } catch (err) {
    // Ignore invalid token in optional mode
    req.user = null;
  }
  next();
}

export function generateToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role || 'student',
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}
