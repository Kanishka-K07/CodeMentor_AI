import type { Language, AppState } from '../types';

const STATE_KEY = 'ai-codementor-state-v1';
const CODE_PREFIX = 'ai_codementor_code_';

export const storageService = {
  /**
   * Get saved code for a specific problem and language
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
   * Save code for a specific problem and language
   */
  saveCode(problemId: number, language: Language, code: string): void {
    try {
      const key = `${CODE_PREFIX}${problemId}_${language}`;
      localStorage.setItem(key, code);
    } catch (e) {
      console.warn('Failed to save code to localStorage:', e);
    }
  },

  /**
   * Clear saved code for a specific problem and language (Reset)
   */
  resetCode(problemId: number, language: Language): void {
    try {
      const key = `${CODE_PREFIX}${problemId}_${language}`;
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Failed to reset code in localStorage:', e);
    }
  },

  /**
   * Load full AppState from localStorage
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
   * Save full AppState to localStorage
   */
  saveAppState(state: AppState): void {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save AppState:', e);
    }
  },
};
