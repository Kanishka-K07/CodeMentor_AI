import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AppState, AppAction, Submission, UserStats } from '../types';

// ============================================================
// INITIAL STATE
// ============================================================
const initialStats: UserStats = {
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  totalAttempted: 0,
  totalSubmissions: 0,
  acceptedSubmissions: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastActivityDate: '',
  points: 0,
  rank: 'Beginner',
  topicMastery: {
    Arrays: 0, Strings: 0, HashMap: 0, 'Two Pointers': 0, 'Sliding Window': 0,
    Stack: 0, Queue: 0, 'Linked List': 0, 'Binary Search': 0, Recursion: 0,
    Sorting: 0, Trees: 0, BST: 0, Heap: 0, Graphs: 0, BFS: 0, DFS: 0,
    Greedy: 0, Backtracking: 0, 'Dynamic Programming': 0, Math: 0,
  },
  weakConcepts: [],
  activityCalendar: {},
};

const initialState: AppState = {
  theme: 'dark',
  language: 'java',
  problemProgress: {},
  submissions: [],
  userStats: { ...initialStats },
  currentProblemId: null,
  lastAIResponse: null,
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function getRank(points: number): string {
  if (points >= 5000) return 'Grand Master';
  if (points >= 3000) return 'Master';
  if (points >= 1500) return 'Expert';
  if (points >= 700) return 'Intermediate';
  if (points >= 200) return 'Apprentice';
  return 'Beginner';
}

function getPointsForSolve(difficulty: string): number {
  if (difficulty === 'Hard') return 100;
  if (difficulty === 'Medium') return 50;
  return 20;
}

/**
 * Calculates current and best streaks from the activity calendar.
 *
 * Algorithm:
 *  - Sort all dates that have at least 1 submission.
 *  - Walk the sorted dates forward, counting consecutive days.
 *  - Track the longest consecutive run as bestStreak.
 *  - After the walk, currentStreak is the last run length IF the last
 *    active date is today or yesterday; otherwise 0.
 */
function calculateStreak(activityCalendar: Record<string, number>): { current: number; best: number } {
  const dates = Object.keys(activityCalendar)
    .filter((d) => activityCalendar[d] > 0)
    .sort(); // lexicographic sort works for YYYY-MM-DD

  if (dates.length === 0) return { current: 0, best: 0 };

  let best = 1;
  let runLength = 1;

  for (let i = 1; i < dates.length; i++) {
    // Parse each date as local midnight to avoid UTC-shift issues
    const [py, pm, pd] = dates[i - 1].split('-').map(Number);
    const [cy, cm, cd] = dates[i].split('-').map(Number);
    const prevMs = new Date(py, pm - 1, pd).getTime();
    const currMs = new Date(cy, cm - 1, cd).getTime();
    const diffDays = Math.round((currMs - prevMs) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      runLength++;
    } else {
      runLength = 1;
    }
    if (runLength > best) best = runLength;
  }

  // Check whether the last active date is today or yesterday
  const lastDateStr = dates[dates.length - 1];
  const [ly, lm, ld] = lastDateStr.split('-').map(Number);
  const lastMs = new Date(ly, lm - 1, ld).getTime();
  const todayMs = (() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
  })();
  const daysAgo = Math.round((todayMs - lastMs) / (1000 * 60 * 60 * 24));

  const current = daysAgo <= 1 ? runLength : 0;

  return { current, best };
}

/**
 * Returns today's date as a local YYYY-MM-DD string (avoids UTC-day drift).
 */
function todayLocalKey(): string {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
}

/**
 * Deep-merge saved state with the current initial state so that new fields
 * added to the schema in future releases still appear with their default
 * values rather than being undefined.
 */
function mergeWithInitial(saved: Partial<AppState>): AppState {
  return {
    ...initialState,
    ...saved,
    userStats: {
      ...initialStats,
      ...(saved.userStats ?? {}),
      // Ensure topicMastery contains ALL topics (new ones default to 0)
      topicMastery: {
        ...initialStats.topicMastery,
        ...(saved.userStats?.topicMastery ?? {}),
      },
      activityCalendar: saved.userStats?.activityCalendar ?? {},
      weakConcepts: saved.userStats?.weakConcepts ?? [],
    },
    problemProgress: saved.problemProgress ?? {},
    submissions: saved.submissions ?? [],
  };
}

// ============================================================
// REDUCER
// ============================================================
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return mergeWithInitial(action.payload);

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };

    case 'SET_CURRENT_PROBLEM':
      return { ...state, currentProblemId: action.payload };

    case 'SET_AI_RESPONSE':
      return { ...state, lastAIResponse: action.payload };

    case 'ADD_SUBMISSION': {
      const sub: Submission = action.payload;

      // ── Duplicate prevention ──────────────────────────────────────────────
      // If a submission with the same id already exists, skip it silently.
      if (state.submissions.some((s) => s.id === sub.id)) return state;

      const prev = state.problemProgress[sub.problemId];
      const isNewSolve = sub.result.status === 'Accepted' && (!prev || prev.status !== 'solved');
      const wasAttempted = prev && prev.status === 'attempted';

      // Update problem progress
      const updatedProgress = {
        ...state.problemProgress,
        [sub.problemId]: {
          problemId: sub.problemId,
          status: sub.result.status === 'Accepted' ? 'solved' : 'attempted',
          attempts: (prev?.attempts ?? 0) + 1,
          submissions: [...(prev?.submissions ?? []), sub],
          bestSubmission: sub.result.status === 'Accepted' ? sub : prev?.bestSubmission,
          solvedAt: isNewSolve ? Date.now() : prev?.solvedAt,
        } as any,
      };

      // Update submissions list (deduplicated, newest first, capped at 200)
      const updatedSubmissions = [sub, ...state.submissions]
        .filter((s, idx, arr) => arr.findIndex((x) => x.id === s.id) === idx)
        .slice(0, 200);

      // Update stats
      const stats = { ...state.userStats };
      stats.totalSubmissions += 1;
      if (sub.result.status === 'Accepted') stats.acceptedSubmissions += 1;

      if (isNewSolve) {
        stats.totalSolved += 1;
        if (!wasAttempted) stats.totalAttempted += 1;

        const difficulty = (sub as any).difficulty || 'Easy';
        stats.points += getPointsForSolve(difficulty);
        if (difficulty === 'Easy') stats.easySolved += 1;
        else if (difficulty === 'Medium') stats.mediumSolved += 1;
        else stats.hardSolved += 1;

        // Topic mastery
        const topics: string[] = (sub as any).topics || [];
        topics.forEach((t) => {
          stats.topicMastery[t] = Math.min(100, (stats.topicMastery[t] || 0) + 10);
        });
      } else if (!prev || prev.status === 'unsolved') {
        stats.totalAttempted = Object.values(updatedProgress).filter(
          (p) => (p as any).status !== 'unsolved'
        ).length;
      }

      // Activity calendar — use local date to avoid UTC-day drift
      const dateKey = todayLocalKey();
      stats.activityCalendar = {
        ...stats.activityCalendar,
        [dateKey]: (stats.activityCalendar[dateKey] || 0) + 1,
      };
      stats.lastActivityDate = dateKey;

      // Streak (recalculated from the full calendar)
      const { current, best } = calculateStreak(stats.activityCalendar);
      stats.currentStreak = current;
      stats.bestStreak = Math.max(stats.bestStreak, best);

      // Rank
      stats.rank = getRank(stats.points);

      // Weak concepts — topics with mastery < 30
      stats.weakConcepts = Object.entries(stats.topicMastery)
        .filter(([, v]) => v < 30 && v > 0)
        .sort(([, a], [, b]) => a - b)
        .slice(0, 5)
        .map(([k]) => k);

      return {
        ...state,
        problemProgress: updatedProgress,
        submissions: updatedSubmissions,
        userStats: stats,
      };
    }

    default:
      return state;
  }
}

// ============================================================
// CONTEXT
// ============================================================
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = 'ai-codementor-state-v1';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from localStorage on mount and deep-merge with initial schema
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AppState>;
        dispatch({ type: 'LOAD_STATE', payload: parsed as AppState });
      }
    } catch {
      // Ignore parse errors — start fresh with initialState
    }
  }, []);

  // Persist to localStorage on every state change + async MongoDB sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[AppContext] localStorage write failed:', e);
    }

    // Fire-and-forget MongoDB sync (non-fatal if backend is offline)
    fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submissions: state.submissions,
        problemProgress: state.problemProgress,
        userStats: state.userStats,
      }),
    }).catch((e) => console.debug('[MongoDB] Sync skipped:', e));

    // Apply theme class to root
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
