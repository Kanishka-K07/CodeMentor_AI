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

function calculateStreak(activityCalendar: Record<string, number>): { current: number; best: number } {
  const today = new Date();
  let current = 0;
  let best = 0;
  let temp = 0;

  // Build sorted date list
  const dates = Object.keys(activityCalendar).sort();

  for (let i = 0; i < dates.length; i++) {
    if (i === 0) { temp = 1; }
    else {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diff = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
      if (diff === 1) temp++;
      else temp = 1;
    }
    best = Math.max(best, temp);
  }

  // Calculate current streak (ending today or yesterday)
  if (dates.length > 0) {
    const lastDate = new Date(dates[dates.length - 1]);
    const todayStr = today.toISOString().split('T')[0];
    const diffFromToday = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffFromToday <= 1) {
      current = temp;
    }
  }

  return { current, best };
}

// ============================================================
// REDUCER
// ============================================================
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

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

      // Update submissions list
      const updatedSubmissions = [sub, ...state.submissions].slice(0, 200);

      // Update stats
      const stats = { ...state.userStats };
      stats.totalSubmissions += 1;
      if (sub.result.status === 'Accepted') stats.acceptedSubmissions += 1;

      // Get difficulty from problem data (we'll pass it via submission metadata)
      if (isNewSolve) {
        stats.totalSolved += 1;
        if (!wasAttempted) stats.totalAttempted += 1;

        // Points
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

      // Activity calendar
      const dateKey = new Date().toISOString().split('T')[0];
      stats.activityCalendar = {
        ...stats.activityCalendar,
        [dateKey]: (stats.activityCalendar[dateKey] || 0) + 1,
      };
      stats.lastActivityDate = dateKey;

      // Streak
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

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AppState;
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to localStorage on every state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Apply theme class
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
