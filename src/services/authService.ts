// ============================================================
// AUTH SERVICE — talks to /api/auth/* endpoints
// ============================================================

const BASE = '/api/auth';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  userStats?: Record<string, unknown>;
  problemProgress?: Record<string, unknown>;
  createdAt?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  message?: string;
}

// ── helpers ──────────────────────────────────────────────────

function getToken(): string | null {
  return localStorage.getItem('cm_auth_token');
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data as T;
}

// ── public API ───────────────────────────────────────────────

export const authService = {
  /** Register a new account. Optionally pass existing localStorage data to migrate guest progress. */
  async register(
    name: string,
    email: string,
    password: string,
    initialData?: { userStats?: unknown; problemProgress?: unknown }
  ): Promise<AuthResponse> {
    const res = await fetch(`${BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, initialData }),
    });
    return handleResponse<AuthResponse>(res);
  },

  /** Login with email + password. */
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<AuthResponse>(res);
  },

  /** Fetch the currently-authenticated user (validates stored token). */
  async me(): Promise<AuthUser | null> {
    const token = getToken();
    if (!token) return null;
    try {
      const res = await fetch(`${BASE}/me`, { headers: authHeaders() });
      if (!res.ok) return null;
      const { user } = await res.json();
      return user as AuthUser;
    } catch {
      return null;
    }
  },

  /** Sync userStats + problemProgress for the logged-in user. */
  async sync(userStats: unknown, problemProgress: unknown): Promise<void> {
    const token = getToken();
    if (!token) return;
    try {
      await fetch(`${BASE}/sync`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ userStats, problemProgress }),
      });
    } catch {
      // Non-fatal — local state is still the source of truth
    }
  },

  /** Update profile (name / avatar / password). */
  async updateProfile(payload: {
    name?: string;
    avatar?: string;
    currentPassword?: string;
    newPassword?: string;
  }): Promise<AuthUser> {
    const res = await fetch(`${BASE}/profile`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await handleResponse<{ user: AuthUser }>(res);
    return data.user;
  },

  /** Persist token to localStorage. */
  saveToken(token: string) {
    localStorage.setItem('cm_auth_token', token);
  },

  /** Remove token from localStorage (logout). */
  clearToken() {
    localStorage.removeItem('cm_auth_token');
  },

  getToken,
};
