import type { Language, AppState, Submission, ProblemProgress, UserStats } from '../types';

const STATE_KEY = 'ai-codementor-state-v1';
const CODE_PREFIX = 'ai_codementor_code_';

export const storageService = {
  /**
   * Check connection status of backend & MongoDB cluster
   */
  async checkDbHealth(): Promise<{ connected: boolean; dbName?: string }> {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) return { connected: false };
      const data = await res.json();
      return {
        connected: data.database === 'connected',
        dbName: data.databaseName,
      };
    } catch {
      return { connected: false };
    }
  },

  /**
   * Get saved code for a specific problem and language (synchronous fast read from localStorage)
   */
  getCode(problemId: number, language: Language, defaultCode: string): string {
    try {
      const key = `${CODE_PREFIX}${problemId}_${language}`;
      const saved = localStorage.getItem(key);
      return saved ?? defaultCode;
    } catch {
      return defaultCode;
    }
  },

  /**
   * Asynchronously fetch code draft from MongoDB if available
   */
  async fetchRemoteCode(problemId: number, language: Language): Promise<string | null> {
    try {
      const res = await fetch(`/api/code/${problemId}/${language}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.code ?? null;
    } catch {
      return null;
    }
  },

  /**
   * Save code for a specific problem and language (persists to localStorage + MongoDB)
   */
  saveCode(problemId: number, language: Language, code: string): void {
    try {
      const key = `${CODE_PREFIX}${problemId}_${language}`;
      localStorage.setItem(key, code);

      // Asynchronously sync draft to MongoDB
      fetch(`/api/code/${problemId}/${language}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      }).catch((e) => console.debug('[MongoDB] Draft sync skipped:', e));
    } catch (e) {
      console.warn('Failed to save code to storage:', e);
    }
  },

  /**
   * Clear saved code for a specific problem and language (Reset)
   */
  resetCode(problemId: number, language: Language): void {
    try {
      const key = `${CODE_PREFIX}${problemId}_${language}`;
      localStorage.removeItem(key);

      fetch(`/api/code/${problemId}/${language}`, {
        method: 'DELETE',
      }).catch((e) => console.debug('[MongoDB] Draft delete skipped:', e));
    } catch (e) {
      console.warn('Failed to reset code in storage:', e);
    }
  },

  /**
   * Load full AppState from localStorage (instant rendering)
   */
  loadAppState(): AppState | null {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as AppState;
    } catch {
      return null;
    }
  },

  /**
   * Save full AppState (persists to localStorage + bulk syncs to MongoDB)
   */
  saveAppState(state: AppState): void {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));

      // Asynchronously sync state to MongoDB
      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissions: state.submissions,
          problemProgress: state.problemProgress,
          userStats: state.userStats,
        }),
      }).catch((e) => console.debug('[MongoDB] Sync to cluster skipped:', e));
    } catch (e) {
      console.warn('Failed to save AppState:', e);
    }
  },

  /**
   * Fetch submissions directly from MongoDB
   */
  async fetchRemoteSubmissions(problemId?: number): Promise<Submission[]> {
    try {
      const url = problemId ? `/api/submissions?problemId=${problemId}` : '/api/submissions';
      const res = await fetch(url);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  /**
   * Fetch problem progress directly from MongoDB
   */
  async fetchRemoteProgress(): Promise<Record<number, ProblemProgress> | null> {
    try {
      const res = await fetch('/api/progress');
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  /**
   * Fetch user stats directly from MongoDB
   */
  async fetchRemoteStats(): Promise<UserStats | null> {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },
};
