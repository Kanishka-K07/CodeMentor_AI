// ============================================================
// CORE TYPES FOR AI CODEMENTOR
// ============================================================

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Language = 'java' | 'python' | 'cpp' | 'javascript';

export type Topic =
  | 'Arrays'
  | 'Strings'
  | 'HashMap'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Stack'
  | 'Queue'
  | 'Linked List'
  | 'Binary Search'
  | 'Recursion'
  | 'Sorting'
  | 'Trees'
  | 'BST'
  | 'Heap'
  | 'Graphs'
  | 'BFS'
  | 'DFS'
  | 'Greedy'
  | 'Backtracking'
  | 'Dynamic Programming'
  | 'Divide and Conquer'
  | 'Math';

export type JudgeStatus =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compilation Error'
  | 'Runtime Error'
  | 'Time Limit Exceeded'
  | 'Pending'
  | 'Running';

export interface TestCase {
  id: string;
  input: string;
  expected: string;
  explanation?: string;
}

export interface HiddenTestCase {
  id: string;
  input: string;
  expected: string;
}

export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topics: Topic[];
  description: string;
  constraints: string[];
  examples: TestCase[];
  hiddenTests: HiddenTestCase[];
  starterCode: Record<string, string>;
  concepts: string[];
  acceptanceRate: number;
  timeLimit: number; // ms
  memoryLimit: number; // MB
}

export interface JudgeResult {
  status: JudgeStatus;
  passedCount: number;
  totalCount: number;
  executionTime: number; // ms
  memoryUsed: number; // KB
  failedInput?: string;
  failedExpected?: string;
  failedGot?: string;
  compilationError?: string;
  runtimeError?: string;
  output?: string; // for Run (not Submit)
  testCaseDetails?: Array<{
    id: number;
    passed: boolean;
    input: string;
    expected: string;
    got: string;
  }>;
}

export interface Submission {
  id: string;
  problemId: number;
  problemTitle: string;
  language: Language;
  code: string;
  result: JudgeResult;
  timestamp: number;
  aiAnalyzed: boolean;
}

export interface AIHintResponse {
  errorExplanation: string;
  conceptDetected: string;
  hint1: string;
  hint2: string;
  hint3: string;
  learningTakeaway: string;
  exactLineNumber?: number;
  failingCodeSnippet?: string;
  exactReason?: string;
  correctFix?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  edgeCases?: Array<{ input: string; description: string; expectedBehavior: string }>;
  codeExplanation?: string[];
  followUpQuestion: {
    title: string;
    description: string;
    concept: string;
  };
}

export interface ProblemProgress {
  problemId: number;
  status: 'unsolved' | 'attempted' | 'solved';
  attempts: number;
  bestSubmission?: Submission;
  submissions: Submission[];
  solvedAt?: number;
}

export interface UserStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalAttempted: number;
  totalSubmissions: number;
  acceptedSubmissions: number;
  currentStreak: number;
  bestStreak: number;
  lastActivityDate: string; // ISO date string
  points: number;
  rank: string;
  topicMastery: Record<string, number>; // topic -> 0-100 score
  weakConcepts: string[];
  activityCalendar: Record<string, number>; // date -> submissions count
}

export interface AppState {
  theme: 'dark' | 'light';
  language: Language;
  problemProgress: Record<number, ProblemProgress>;
  submissions: Submission[];
  userStats: UserStats;
  currentProblemId: number | null;
  lastAIResponse: AIHintResponse | null;
}

export type AppAction =
  | { type: 'SET_THEME'; payload: 'dark' | 'light' }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_CURRENT_PROBLEM'; payload: number }
  | { type: 'ADD_SUBMISSION'; payload: Submission }
  | { type: 'SET_AI_RESPONSE'; payload: AIHintResponse }
  | { type: 'LOAD_STATE'; payload: AppState };
