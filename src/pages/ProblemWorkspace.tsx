import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';
import {
  Play, Send, ChevronLeft, ChevronRight, ChevronDown, RotateCcw, Copy,
  CheckCircle, XCircle, AlertCircle, Clock, Cpu, Brain,
  Lock, BookOpen, Sparkles, Lightbulb, HelpCircle, ArrowRight,
  RefreshCw, Code2, Check, ExternalLink
} from 'lucide-react';
import { getProblemById, problems } from '../data/problems';
import { useAppContext } from '../store/AppContext';
import { useJudge } from '../hooks/useJudge';
import { useAI } from '../hooks/useAI';
import { storageService } from '../services/storageService';
import type { JudgeResult, Language, Submission, AIHintResponse } from '../types';
import { nanoid } from '../utils/nanoid';

// ============================================================
// HELPER BADGES
// ============================================================
function DifficultyBadge({ d }: { d: string }) {
  return <span className={`badge-${d.toLowerCase()}`}>{d}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const isOk = status === 'Accepted';
  return (
    <span className={isOk ? 'badge-accepted' : 'badge-wrong'}>
      {isOk ? <CheckCircle size={12} /> : <XCircle size={12} />}
      {status}
    </span>
  );
}

// ============================================================
// JUDGE BANNER RESULT DISPLAY
// ============================================================
function JudgeBanner({ result }: { result: JudgeResult }) {
  const configs = {
    'Accepted':           { color: '#3fb950', bg: 'rgba(63,185,80,0.1)',   border: 'rgba(63,185,80,0.3)',   icon: CheckCircle, emoji: '✅' },
    'Wrong Answer':       { color: '#f85149', bg: 'rgba(248,81,73,0.1)',   border: 'rgba(248,81,73,0.3)',   icon: XCircle,     emoji: '❌' },
    'Compilation Error':  { color: '#f85149', bg: 'rgba(248,81,73,0.1)',   border: 'rgba(248,81,73,0.3)',   icon: XCircle,     emoji: '🔴' },
    'Runtime Error':      { color: '#d29922', bg: 'rgba(210,153,34,0.1)',  border: 'rgba(210,153,34,0.3)',  icon: AlertCircle, emoji: '💥' },
    'Time Limit Exceeded':{ color: '#d29922', bg: 'rgba(210,153,34,0.1)',  border: 'rgba(210,153,34,0.3)',  icon: Clock,       emoji: '⏱' },
  };

  const cfg  = configs[result.status as keyof typeof configs] ?? configs['Wrong Answer'];
  const Icon = cfg.icon;

  // Distinguish: real compile error (status === Compilation Error) vs
  // offline-mode warning piggy-backed on compilationError for other statuses.
  const isRealCompileError = result.status === 'Compilation Error' && result.compilationError;
  const isOfflineWarning   = result.status !== 'Compilation Error' &&
                             result.compilationError?.startsWith('⚠️');

  return (
    <div className="rounded-xl p-4 animate-fade-in space-y-3" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon size={20} style={{ color: cfg.color }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: cfg.color }}>
              {cfg.emoji} {result.status}
            </p>
            {result.status !== 'Compilation Error' && (
              <p className="text-xs text-muted mt-0.5">
                {result.passedCount}/{result.totalCount} test cases passed
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-4 text-xs text-muted">
          {result.executionTime > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={11} /> {result.executionTime}ms
            </span>
          )}
          {result.memoryUsed > 0 && (
            <span className="flex items-center gap-1">
              <Cpu size={11} /> {Math.round(result.memoryUsed / 1024)}MB
            </span>
          )}
        </div>
      </div>

      {/* Real compilation error — shown in red monospace block */}
      {isRealCompileError && (
        <pre className="text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap"
             style={{ background: 'rgba(248,81,73,0.08)', color: '#f85149', fontFamily: 'monospace', border: '1px solid rgba(248,81,73,0.25)' }}>
          {result.compilationError}
        </pre>
      )}

      {/* Offline-mode warning — shown in amber notice box */}
      {isOfflineWarning && (
        <div className="flex items-start gap-2 text-xs p-2.5 rounded-lg"
             style={{ background: 'rgba(210,153,34,0.1)', border: '1px solid rgba(210,153,34,0.3)', color: '#d29922' }}>
          <AlertCircle size={13} style={{ marginTop: 1, flexShrink: 0 }} />
          <span>{result.compilationError}</span>
        </div>
      )}

      {result.failedInput && result.status !== 'Accepted' && (
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded-lg" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
              <div className="text-muted text-[10px] uppercase font-semibold mb-1">Input</div>
              <code style={{ color: 'var(--color-text-primary)', fontSize: '0.8rem' }}>{result.failedInput}</code>
            </div>
            <div className="p-2.5 rounded-lg" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
              <div className="text-muted text-[10px] uppercase font-semibold mb-1">Expected Output</div>
              <code style={{ color: '#3fb950', fontSize: '0.8rem' }}>{result.failedExpected}</code>
            </div>
            <div className="p-2.5 rounded-lg" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
              <div className="text-muted text-[10px] uppercase font-semibold mb-1">Actual Output</div>
              <code style={{ color: '#f85149', fontSize: '0.8rem' }}>{result.failedGot}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ============================================================
// SOCRATIC HINTS PER PROBLEM
// ============================================================
const PROBLEM_HINTS: Record<number, string> = {
  // Easy (1–20)
  1:  "Think about how you can store previously seen numbers and quickly check whether the required complement already exists. A single pass with a HashMap can get you from O(n²) to O(n).",
  2:  "Consider whether you need to restart the running sum from scratch at each position, or if there's a smarter decision at each step. Kadane's insight: keep running sum only if it's positive.",
  3:  "You need to detect any repeated element. What data structure lets you check membership in O(1)? Once you've seen a number, can you immediately tell if it appears again?",
  4:  "Track two things as you scan the prices array: the minimum price seen so far, and the maximum profit you could make by selling at the current price. One pass is enough.",
  5:  "Use a write pointer 'j' that only advances when you place a non-zero element. After placing all non-zeros, what do you still need to do to the remaining positions?",
  6:  "Use two pointers, one from each end, and skip non-alphanumeric characters. Convert to lowercase before comparing. When do the pointers stop?",
  7:  "Use two pointers starting at opposite ends of the array. Swap the characters they point to, then move them toward each other. Stop when they meet in the middle.",
  8:  "Count character frequencies for both strings. Two strings are anagrams if and only if they have exactly the same character frequencies. A single 26-element array is enough.",
  9:  "Rotate the matrix by first transposing along the diagonal (swap [i][j] with [j][i]), then reverse each row. No extra matrix needed.",
  10: "Think about a sliding window with a frequency map. When does your window become invalid? How do you restore validity by shrinking from the left?",
  11: "XOR has a special property: a ^ a = 0 and a ^ 0 = a. XOR all numbers together. Pairs cancel out, leaving only the unique element.",
  12: "To climb n stairs, you can arrive from stair n-1 or stair n-2. So the number of ways to reach n equals ways(n-1) + ways(n-2). This is the Fibonacci sequence!",
  13: "Think of a stack. When you see '(', '{', '[' push it. When you see a closing bracket, check if it matches the top of the stack. What should the stack be at the end?",
  14: "Think about what a 'good' time to merge two intervals is. Sort intervals by start time. If the current interval overlaps with the last merged one, extend it.",
  15: "Use a prefix sum technique. The product of a range [i, j] = prefix[j+1] / prefix[i]. But division with zeros is tricky — think about left and right products separately.",
  16: "Binary search requires the array to be sorted or have a monotonic property. What invariant do you maintain about which half of the search space must contain the answer?",
  17: "Store non-zero elements by overwriting from the start using a pointer. Fill the rest with zeros. Or: swap non-zero elements with the next available position.",
  18: "Two-pointer approach after sorting: fix the first element, then use left/right pointers for the remaining two. Skip duplicates carefully.",
  19: "Use two pointers with a gap of n between them. Move the fast pointer n+1 steps ahead, then advance both until fast reaches the end.",
  20: "Group characters by their frequency, then rebuild the string by picking the most frequent character that isn't the same as the last one placed.",
  // Medium (21–40)
  21: "Binary search on the answer space: the minimum maximum subarray sum. For a given candidate answer, can you check in O(n) if it's achievable with k partitions?",
  22: "Think about intervals and sweep line. Sort start and end events separately. At any point, how many intervals are active simultaneously?",
  23: "Use a min-heap (priority queue) of size k. Merge the linked lists by always extracting the smallest current head across all k lists.",
  24: "To rotate without extra space: GCD gives you the number of cycles. Follow each element to its destination, cyclically.",
  25: "Sort meetings by end time. Greedily assign each new meeting to any room whose previous meeting has already ended (use a min-heap of end times).",
  26: "Think about what it means for one interval to be 'above' or 'below' the target line. Divide and conquer with the midpoint.",
  27: "Consider the element at each position: what's the maximum rectangle with this element as the shortest bar? A monotone stack gives O(n).",
  28: "Binary search: left = 0, right = n-1. Check mid: is nums[mid] == target? Is it in the left half or right half? Which half is guaranteed to be sorted?",
  29: "Can binary search apply even when the array is rotated? At least one half is always sorted. Use that half to decide which direction to search.",
  30: "Two pointers: left counts container height from left, right from right. Move the pointer with the smaller height inward. Why does this greedy choice work?",
  31: "Try Dijkstra's shortest path or BFS on an implicit graph. Nodes are states (word), edges exist between words that differ by one character.",
  32: "Use topological sort (BFS/DFS) to detect cycles and order tasks. A cycle in the prerequisite graph means no valid ordering exists.",
  33: "Dynamic programming: for each cell, the answer is min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 if cell is '1', else 0.",
  34: "Bottom-up DP: dp[0] = 0. For each amount a, try each coin c: dp[a] = min(dp[a], dp[a-c] + 1). Initialize unreachable states with infinity.",
  35: "BFS from all 0-cells simultaneously. The distance of each 1-cell is its shortest distance to any 0-cell.",
  36: "Try prefix XOR. A subarray sum divisible by k means two prefix sums have the same remainder mod k. Use a HashMap to track counts.",
  37: "Think about the longest increasing subsequence. A greedy approach with binary search achieves O(n log n): maintain a 'patience sort' pile.",
  38: "Consider each element as a potential center of a partition (Dutch national flag). Count elements less than, equal to, and greater than the median.",
  39: "Sliding window over the sorted array with two pointers. The window [left, right] has a 'badness' of (right - left + 1) - count(nums in window). Minimize this.",
  40: "Sort the input. BFS/DFS from unvisited nodes — connected components in an adjacency list formed by adjacent elements. Union-Find works cleanly here.",
  // Hard (41–50)
  41: "Consider all possible orderings of brackets. Backtracking with pruning: only add '(' if count < n, only add ')' if count < open brackets used.",
  42: "Two-pointer or stack approach. With two pointers, track the maximum height from left and right. Water at position i = min(maxLeft[i], maxRight[i]) - height[i].",
  43: "Segment tree or BIT for range queries. The count of integers in [lower, upper] can be maintained as a binary indexed tree over a sorted compressed array.",
  44: "DP with backtracking and memoization. Let dp[i][j] = true if s[0..i] matches p[0..j]. Handle '*' carefully: zero or more of the preceding element.",
  45: "Manacher's algorithm finds all palindromic substrings in O(n). Or expand from each center: O(n²). The trick is reusing previously computed palindrome radii.",
  46: "Sliding window of size k. Use a deque to maintain the maximum efficiently in O(1) per step — the deque holds indices in monotonically decreasing order of values.",
  47: "BFS/DFS finding connected components. Two cells are connected if they share an edge. Count the number of connected components of '1's.",
  48: "DP: for each number, check all smaller numbers that could be its left neighbor in an increasing subsequence. O(n²) DP or O(n log n) with binary search + patience sort.",
  49: "Dijkstra's algorithm on an implicit weighted graph where edges represent arithmetic operations. States = current value, transitions = apply +/-/* / operations.",
  50: "Think about what information you need from subtrees. LCA can be found with DFS: a node is LCA if it's the root of the subtree containing both p and q.",
};

const DEFAULT_HINT = "Think carefully about the problem constraints. What data structure would let you trade space for time? Can you reduce the number of passes over the data?";

// ============================================================
// PROBLEM DESCRIPTION PANEL
// ============================================================
function ProblemPanel({ problem }: { problem: ReturnType<typeof getProblemById> }) {
  const [hintOpen, setHintOpen] = useState<boolean>(false);
  if (!problem) return null;

  return (
    <div className="h-full overflow-y-auto problem-description pr-1 space-y-5">
      {/* Title & meta */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-muted text-sm">{problem.id}.</span>
          <h1 className="text-lg font-bold text-primary">{problem.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge d={problem.difficulty} />
          {problem.topics.map((t) => (
            <span key={t} className="topic-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-secondary leading-relaxed space-y-2">
        {problem.description.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>
            {paragraph.split('`').map((part, i) =>
              i % 2 === 0 ? (
                <span key={i}>{part}</span>
              ) : (
                <code
                  key={i}
                  className="px-1.5 py-0.5 rounded text-xs mx-0.5"
                  style={{ background: 'rgba(88,166,255,0.12)', color: '#58a6ff', fontFamily: 'monospace' }}
                >
                  {part}
                </code>
              )
            )}
          </p>
        ))}
      </div>

      {/* Examples */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wide">Examples</h3>
        {problem.examples.map((ex, i) => (
          <div key={ex.id} className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <div
              className="px-3 py-1.5 text-xs font-semibold text-muted"
              style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}
            >
              Example {i + 1}
            </div>
            <div className="p-3 space-y-1.5 text-xs">
              <div>
                <span className="font-semibold text-muted">Input: </span>
                <code className="text-primary font-mono">{ex.input}</code>
              </div>
              <div>
                <span className="font-semibold text-muted">Output: </span>
                <code className="font-mono text-emerald-400" style={{ color: '#3fb950' }}>{ex.expected}</code>
              </div>
              {ex.explanation && (
                <div>
                  <span className="font-semibold text-muted">Explanation: </span>
                  <span className="text-secondary">{ex.explanation}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Constraints */}
      <div className="rounded-lg p-4" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
        <h3 className="text-xs font-semibold text-muted mb-2 uppercase tracking-wide">Constraints</h3>
        <ul className="space-y-1">
          {problem.constraints.map((c, i) => (
            <li key={i} className="text-xs text-secondary flex items-start gap-2">
              <span className="mt-1 shrink-0 text-sky-400">•</span>
              <code className="font-mono">{c}</code>
            </li>
          ))}
        </ul>
      </div>

      {/* Hidden tests notice */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted"
        style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
      >
        <Lock size={13} />
        <span>
          {problem.hiddenTests.length} hidden test cases will evaluate your submission
        </span>
      </div>

      {/* Socratic Hint (collapsible) */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: '1px solid rgba(251,191,36,0.25)', background: 'rgba(251,191,36,0.04)' }}
      >
        <button
          onClick={() => setHintOpen((o) => !o)}
          className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold transition-all hover:bg-amber-400/5"
          style={{ color: '#fbbf24' }}
          aria-expanded={hintOpen}
        >
          <span className="flex items-center gap-2">
            <Lightbulb size={13} className="text-amber-400" />
            Hint
          </span>
          <ChevronDown
            size={14}
            className="transition-transform duration-200"
            style={{ transform: hintOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
        {hintOpen && (
          <div
            className="px-3 pb-3 pt-1 text-xs text-secondary leading-relaxed animate-fade-in"
            style={{ borderTop: '1px solid rgba(251,191,36,0.15)' }}
          >
            {PROBLEM_HINTS[problem.id] ?? DEFAULT_HINT}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// WORKSPACE PAGE
// ============================================================
export default function ProblemWorkspace() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { runCode, submitCode, isRunning, isSubmitting } = useJudge();
  const { analyze, response: aiResponse, isLoading: isAiLoading } = useAI();

  const problem = getProblemById(Number(id));
  const problemId = problem?.id ?? 1;

  // Code persistence state
  const [code, setCode] = useState<string>('');

  // Monaco Editor Ref & Line Jumping
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const handleJumpToLine = (lineNumber: number) => {
    if (!editorRef.current) return;
    editorRef.current.revealLineInCenter(lineNumber);
    editorRef.current.setPosition({ lineNumber, column: 1 });
    editorRef.current.focus();
  };

  // Bottom panel tabs & AI Sub-tabs
  const [activeTab, setActiveTab] = useState<'testcase' | 'result' | 'ai-tutor'>('testcase');
  const [aiSubTab, setAiSubTab] = useState<'diagnostic' | 'complexity' | 'edgecases' | 'explanation'>('diagnostic');
  const [customInput, setCustomInput] = useState<string>('');

  // Results
  const [runResult, setRunResult] = useState<JudgeResult | null>(null);
  const [submitResult, setSubmitResult] = useState<JudgeResult | null>(null);

  // Progressive hints unlock level (1, 2, or 3)
  const [unlockedHintLevel, setUnlockedHintLevel] = useState<number>(1);

  const getStarterCode = (lang: Language) => {
    if (!problem) return '';
    if (problem.starterCode[lang]) return problem.starterCode[lang];
    if (lang === 'cpp') {
      return `#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    // Solution for ${problem.title}\n};`;
    }
    if (lang === 'javascript') {
      return `/**\n * @param {any} input\n * @return {any}\n */\nvar solution = function(input) {\n    // Solution for ${problem.title}\n};`;
    }
    return problem.starterCode.java || problem.starterCode.python || '';
  };

  // Load code from persistence whenever problemId or language changes
  useEffect(() => {
    if (!problem) return;
    const defaultStarter = getStarterCode(state.language);
    const saved = storageService.getCode(problem.id, state.language, defaultStarter);
    setCode(saved);
    setCustomInput(problem.examples[0]?.input ?? '');
    setRunResult(null);
    setSubmitResult(null);
    setUnlockedHintLevel(1);
    setActiveTab('testcase');
  }, [problemId, state.language]);

  // Debounced auto-save code to storageService as student types
  const saveTimeoutRef = useRef<any>(null);
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (!problem) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      storageService.saveCode(problem.id, state.language, newCode);
    }, 400);
  };

  // Language switch
  const handleLanguageChange = (newLang: Language) => {
    if (!problem) return;
    // Save current language code first
    storageService.saveCode(problem.id, state.language, code);
    dispatch({ type: 'SET_LANGUAGE', payload: newLang });
    const defaultStarter = getStarterCode(newLang);
    const nextCode = storageService.getCode(problem.id, newLang, defaultStarter);
    setCode(nextCode);
  };

  // Reset current language code
  const handleReset = () => {
    if (!problem) return;
    const defaultStarter = getStarterCode(state.language);
    setCode(defaultStarter);
    storageService.resetCode(problem.id, state.language);
    toast.success(`Reset ${state.language.toUpperCase()} code to starter template`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  // Run code against test cases / custom input
  const handleRun = async () => {
    if (!problem) return;
    storageService.saveCode(problem.id, state.language, code);

    setRunResult(null);
    setSubmitResult(null);
    setActiveTab('result');

    const result = await runCode(problem, code, state.language);
    setRunResult(result);

    // Trigger AI Tutor analysis automatically on failure
    if (result.status !== 'Accepted') {
      analyze(problem.title, code, result, problem.topics);
    }

    if (result.status === 'Accepted') {
      toast.success('Run complete: All sample tests passed!');
    } else {
      toast.error(`Run finished: ${result.status}`);
    }
  };

  // Submit code against hidden test cases
  const handleSubmit = async () => {
    if (!problem) return;
    storageService.saveCode(problem.id, state.language, code);

    setSubmitResult(null);
    setRunResult(null);
    setActiveTab('result');
    setUnlockedHintLevel(1);

    const result = await submitCode(problem, code, state.language);
    setSubmitResult(result);

    const submission: Submission & { difficulty: string; topics: string[] } = {
      id: nanoid(),
      problemId: problem.id,
      problemTitle: problem.title,
      language: state.language,
      code,
      result,
      timestamp: Date.now(),
      aiAnalyzed: false,
      // Extra metadata for AppContext stats tracking
      difficulty: problem.difficulty,
      topics: problem.topics,
    };

    dispatch({ type: 'ADD_SUBMISSION', payload: submission });

    if (result.status === 'Accepted') {
      toast.success('🎉 Accepted! Great work!', { duration: 4000 });
      setActiveTab('result');
    } else {
      toast.error(`${result.status} — AI Tutor analysis ready`, { duration: 4000 });
      analyze(problem.title, code, result, problem.topics);
      setTimeout(() => setActiveTab('ai-tutor'), 500);
    }
  };

  const prevId = problem && problem.id > 1 ? problem.id - 1 : null;
  const nextId = problem && problem.id < 50 ? problem.id + 1 : null;

  const recommendedNextProblem = problem
    ? problems.find((p) => p.id !== problem.id && p.topics.some((t) => problem.topics.includes(t)))
    : null;

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted">
        <AlertCircle size={32} className="mb-3" />
        <p>Problem not found.</p>
        <Link to="/problems" className="btn-primary mt-4">Back to Problems</Link>
      </div>
    );
  }

  const latestResult = submitResult || runResult;

  const getMonacoLanguage = (lang: Language) => {
    if (lang === 'java') return 'java';
    if (lang === 'python') return 'python';
    if (lang === 'cpp') return 'cpp';
    return 'javascript';
  };

  return (
    <div className="animate-fade-in space-y-3" style={{ minHeight: 'calc(100vh - 110px)' }}>
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Link to="/problems" className="btn-ghost py-1 px-2 text-xs">
            <ChevronLeft size={14} /> Problem Catalog
          </Link>
          <span className="text-muted text-xs">/</span>
          <span className="text-primary text-sm font-semibold">{problem.id}. {problem.title}</span>
          <DifficultyBadge d={problem.difficulty} />
          {state.problemProgress[problem.id]?.status === 'solved' && (
            <span className="badge-accepted text-xs">
              <CheckCircle size={12} /> Solved
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {prevId && (
            <Link to={`/problems/${prevId}`} className="btn-ghost py-1.5 px-3 text-xs flex items-center gap-1">
              <ChevronLeft size={14} /> Prev
            </Link>
          )}
          {nextId && (
            <Link to={`/problems/${nextId}`} className="btn-ghost py-1.5 px-3 text-xs flex items-center gap-1">
              Next <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Problem Description */}
        <div className="glass-card p-5 flex flex-col" style={{ height: 'calc(100vh - 170px)' }}>
          <ProblemPanel problem={problem} />
        </div>

        {/* Right Column: Editor & Integrated Bottom Output / AI Tutor Panel */}
        <div className="flex flex-col gap-3" style={{ height: 'calc(100vh - 170px)' }}>
          {/* Top Toolbar */}
          <div
            className="flex items-center justify-between px-3 py-2 rounded-xl shrink-0"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
          >
            {/* Language Selector (4 Languages: Java, Python, C++, JS) */}
            <div className="flex gap-1">
              {([
                { id: 'java', label: '☕ Java' },
                { id: 'python', label: '🐍 Python' },
                { id: 'cpp', label: '⚡ C++' },
                { id: 'javascript', label: '🌐 JS' },
              ] as const).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLanguageChange(item.id)}
                  className="text-xs px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1"
                  style={{
                    background: state.language === item.id ? 'rgba(88,166,255,0.18)' : 'transparent',
                    color: state.language === item.id ? '#58a6ff' : 'var(--color-text-muted)',
                    border: state.language === item.id ? '1px solid rgba(88,166,255,0.35)' : '1px solid transparent',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button onClick={handleCopy} className="btn-ghost py-1.5 px-2.5 text-xs">
                <Copy size={13} /> Copy
              </button>
              <button onClick={handleReset} className="btn-ghost py-1.5 px-2.5 text-xs">
                <RotateCcw size={13} /> Reset
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 monaco-container overflow-hidden rounded-xl" style={{ minHeight: '260px' }}>
            <Editor
              height="100%"
              language={getMonacoLanguage(state.language)}
              value={code}
              onChange={(v) => handleCodeChange(v ?? '')}
              onMount={handleEditorMount}
              theme="vs-dark"
              options={{
                fontSize: 13.5,
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 12, bottom: 12 },
                lineNumbers: 'on',
                wordWrap: 'on',
                renderLineHighlight: 'line',
                cursorStyle: 'line',
                bracketPairColorization: { enabled: true },
                autoIndent: 'full',
                formatOnType: true,
                tabSize: 4,
              }}
            />
          </div>

          {/* Action Buttons: Run & Submit */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleRun}
              disabled={isRunning || isSubmitting}
              className="btn-ghost flex-1 justify-center py-2.5 text-xs"
            >
              {isRunning ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  Running Code...
                </span>
              ) : (
                <>
                  <Play size={14} className="text-sky-400" /> Run Code
                </>
              )}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
              className="btn-success flex-1 justify-center py-2.5 text-xs"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  Judging Tests...
                </span>
              ) : (
                <>
                  <Send size={14} /> Submit Solution
                </>
              )}
            </button>
          </div>

          {/* ============================================================ */}
          {/* INTEGRATED BOTTOM PANEL (Input + Test Results + AI Tutor)     */}
          {/* ============================================================ */}
          <div
            className="rounded-xl overflow-hidden flex flex-col shrink-0"
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              maxHeight: '260px',
            }}
          >
            {/* Panel Tabs Header */}
            <div
              className="flex items-center justify-between border-b px-2 shrink-0"
              style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveTab('testcase')}
                  className="px-3 py-2 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  style={{
                    borderBottom: activeTab === 'testcase' ? '2px solid #58a6ff' : '2px solid transparent',
                    color: activeTab === 'testcase' ? '#58a6ff' : 'var(--color-text-muted)',
                  }}
                >
                  <Code2 size={13} /> Testcase Input
                </button>
                <button
                  onClick={() => setActiveTab('result')}
                  className="px-3 py-2 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  style={{
                    borderBottom: activeTab === 'result' ? '2px solid #58a6ff' : '2px solid transparent',
                    color: activeTab === 'result' ? '#58a6ff' : 'var(--color-text-muted)',
                  }}
                >
                  <CheckCircle size={13} /> Test Result
                  {latestResult && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: latestResult.status === 'Accepted' ? '#3fb950' : '#f85149' }}
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('ai-tutor')}
                  className="px-3 py-2 text-xs font-semibold flex items-center gap-1.5 transition-all relative"
                  style={{
                    borderBottom: activeTab === 'ai-tutor' ? '2px solid #bc8cff' : '2px solid transparent',
                    color: activeTab === 'ai-tutor' ? '#bc8cff' : 'var(--color-text-muted)',
                  }}
                >
                  <Brain size={13} style={{ color: '#bc8cff' }} />
                  <span>AI Error Tutor</span>
                  {aiResponse && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse">
                      Active
                    </span>
                  )}
                </button>
              </div>

              {latestResult && (
                <div className="text-[11px] text-muted pr-2">
                  Status: <span className="font-semibold text-primary">{latestResult.status}</span>
                </div>
              )}
            </div>

            {/* Panel Body Content */}
            <div className="p-3 overflow-y-auto flex-1 space-y-3">
              {/* 1. TESTCASE / INPUT TAB */}
              {activeTab === 'testcase' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted font-medium">Sample Test Inputs:</span>
                    <span className="text-[11px] text-secondary">Pre-populated from examples</span>
                  </div>
                  <div className="flex gap-2">
                    {problem.examples.map((ex, idx) => (
                      <button
                        key={ex.id}
                        onClick={() => setCustomInput(ex.input)}
                        className="text-xs px-2.5 py-1 rounded-md transition-all font-mono"
                        style={{
                          background: customInput === ex.input ? 'rgba(88,166,255,0.15)' : 'var(--color-bg-secondary)',
                          color: customInput === ex.input ? '#58a6ff' : 'var(--color-text-muted)',
                          border: customInput === ex.input ? '1px solid rgba(88,166,255,0.3)' : '1px solid var(--color-border)',
                        }}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter custom input..."
                    className="w-full h-24 p-2.5 rounded-lg text-xs font-mono resize-none focus:outline-none focus:border-blue-500"
                    style={{
                      background: 'var(--color-bg-secondary)',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-border)',
                    }}
                  />
                </div>
              )}

              {/* 2. TEST RESULT TAB (with Test Case Cards Breakdown) */}
              {activeTab === 'result' && (
                <div className="space-y-3 animate-fade-in">
                  {!latestResult && !isRunning && !isSubmitting && (
                    <div className="text-center py-6 text-xs text-muted">
                      Click <strong className="text-primary">Run Code</strong> or <strong className="text-emerald-400">Submit</strong> to execute tests and view output.
                    </div>
                  )}

                  {(isRunning || isSubmitting) && (
                    <div className="flex flex-col items-center justify-center py-6 space-y-2">
                      <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs text-muted">
                        {isRunning ? 'Evaluating sample test cases...' : 'Testing against hidden test suite...'}
                      </p>
                    </div>
                  )}

                  {latestResult && !isRunning && !isSubmitting && (
                    <>
                      <JudgeBanner result={latestResult} />

                      {/* Visual Test Case Breakdown */}
                      {latestResult.testCaseDetails && latestResult.testCaseDetails.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-muted uppercase tracking-wide">
                            Test Suite Execution Breakdown:
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {latestResult.testCaseDetails.map((tc) => (
                              <div
                                key={tc.id}
                                className="p-2.5 rounded-lg text-xs flex items-center justify-between"
                                style={{
                                  background: tc.passed ? 'rgba(63,185,80,0.06)' : 'rgba(248,81,73,0.06)',
                                  border: tc.passed ? '1px solid rgba(63,185,80,0.2)' : '1px solid rgba(248,81,73,0.2)',
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  {tc.passed ? (
                                    <CheckCircle size={14} className="text-emerald-400" />
                                  ) : (
                                    <XCircle size={14} className="text-red-400" />
                                  )}
                                  <span className="font-semibold text-primary">Case {tc.id}:</span>
                                  <code className="text-muted font-mono">{tc.input}</code>
                                </div>
                                <div className="flex items-center gap-3 font-mono text-[11px]">
                                  <span>Exp: <span className="text-emerald-400">{tc.expected}</span></span>
                                  <span>Got: <span className={tc.passed ? 'text-emerald-400' : 'text-red-400'}>{tc.got}</span></span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Success / Accepted guidance */}
                      {latestResult.status === 'Accepted' && (
                        <div
                          className="p-3 rounded-lg flex items-center justify-between text-xs"
                          style={{ background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.25)' }}
                        >
                          <div>
                            <p className="font-semibold text-emerald-400 mb-0.5">🎉 All Hidden Test Cases Passed!</p>
                            <p className="text-secondary text-[11px]">
                              Your code passed with {latestResult.executionTime}ms runtime. Code automatically saved.
                            </p>
                          </div>
                          {recommendedNextProblem && (
                            <Link
                              to={`/problems/${recommendedNextProblem.id}`}
                              className="btn-primary py-1 px-2.5 text-xs whitespace-nowrap"
                            >
                              Next Problem →
                            </Link>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* 3. AI TUTOR TAB (Progressive Hints + Sub-tabs: Diagnostic, Complexity, Edge Cases, Code Breakdown) */}
              {activeTab === 'ai-tutor' && (
                <div className="space-y-3 animate-fade-in">
                  {isAiLoading && (
                    <div className="flex items-center gap-3 py-6 justify-center text-xs text-muted">
                      <Brain size={18} className="ai-pulse" style={{ color: '#bc8cff' }} />
                      <span>AI CodeMentor is analyzing your code logic and test failures...</span>
                    </div>
                  )}

                  {!isAiLoading && !aiResponse && (
                    <div className="text-center py-6 text-xs text-muted space-y-2">
                      <Brain size={24} className="mx-auto text-purple-400/50" />
                      <p>Run or Submit your code to receive Socratic guidance and progressive hints.</p>
                      <button
                        onClick={() => {
                          if (latestResult) {
                            analyze(problem.title, code, latestResult, problem.topics);
                          } else {
                            toast.error('Run or Submit code first to generate error feedback');
                          }
                        }}
                        className="btn-ghost py-1 px-3 text-xs mx-auto inline-flex items-center gap-1"
                      >
                        <Sparkles size={12} style={{ color: '#bc8cff' }} /> Analyze Current Code
                      </button>
                    </div>
                  )}

                  {!isAiLoading && aiResponse && (
                    <div className="space-y-3">
                      {/* AI Toolkit Sub-navigation */}
                      <div className="flex border-b pb-1 gap-2 border-slate-800 text-xs">
                        {[
                          { id: 'diagnostic', label: '🎯 Diagnostic & Hints' },
                          { id: 'complexity', label: '📊 Complexity' },
                          { id: 'edgecases', label: '⚡ Edge Cases' },
                          { id: 'explanation', label: '📖 Code Breakdown' },
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setAiSubTab(sub.id as any)}
                            className="px-2.5 py-1 rounded-md transition-all font-semibold"
                            style={{
                              background: aiSubTab === sub.id ? 'rgba(188,140,255,0.15)' : 'transparent',
                              color: aiSubTab === sub.id ? '#bc8cff' : 'var(--color-text-muted)',
                              border: aiSubTab === sub.id ? '1px solid rgba(188,140,255,0.3)' : '1px solid transparent',
                            }}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>

                      {/* SUB-TAB 1: DIAGNOSTIC & HINTS */}
                      {aiSubTab === 'diagnostic' && (
                        <div className="space-y-3 animate-fade-in">
                          {/* Exact Line Diagnostic Card */}
                          <div
                            className="p-3 rounded-lg space-y-2"
                            style={{ background: 'rgba(188,140,255,0.08)', border: '1px solid rgba(188,140,255,0.25)' }}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold flex items-center gap-1.5" style={{ color: '#bc8cff' }}>
                                <Brain size={14} /> Diagnostic Feedback
                              </span>
                              <span className="topic-tag">{aiResponse.conceptDetected}</span>
                            </div>

                            {aiResponse.exactLineNumber && (
                              <div className="flex items-center justify-between bg-purple-950/40 p-2 rounded border border-purple-800/40 text-xs">
                                <div>
                                  <span className="text-purple-300 font-semibold">📍 Line {aiResponse.exactLineNumber}:</span>{' '}
                                  <code className="text-secondary font-mono">{aiResponse.failingCodeSnippet || 'Code line'}</code>
                                </div>
                                <button
                                  onClick={() => handleJumpToLine(aiResponse.exactLineNumber!)}
                                  className="btn-ghost py-0.5 px-2 text-[11px] text-purple-300 hover:text-white"
                                >
                                  🎯 Jump to Line {aiResponse.exactLineNumber}
                                </button>
                              </div>
                            )}

                            {aiResponse.exactReason && (
                              <p className="text-xs text-secondary leading-relaxed">
                                <strong>Why:</strong> {aiResponse.exactReason}
                              </p>
                            )}

                            {aiResponse.correctFix && (
                              <p className="text-xs text-emerald-300 leading-relaxed bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
                                <strong>Suggested Fix:</strong> {aiResponse.correctFix}
                              </p>
                            )}
                          </div>

                          {/* Progressive Hints Section */}
                          <div className="space-y-2">
                            <div className="text-xs font-semibold text-primary flex items-center gap-1.5">
                              <Lightbulb size={13} className="text-amber-400" /> Socratic Progressive Hints:
                            </div>

                            {/* Hint 1 */}
                            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-secondary leading-relaxed">
                              <div className="font-semibold text-amber-300 mb-1 flex items-center gap-1">
                                <span>🔍 Hint 1 of 3 (Conceptual):</span>
                              </div>
                              {aiResponse.hint1}
                            </div>

                            {/* Hint 2 */}
                            {unlockedHintLevel >= 2 ? (
                              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-secondary leading-relaxed animate-fade-in">
                                <div className="font-semibold text-sky-400 mb-1 flex items-center gap-1">
                                  <span>🔍 Hint 2 of 3 (Algorithmic Insight):</span>
                                </div>
                                {aiResponse.hint2}
                              </div>
                            ) : (
                              <button
                                onClick={() => setUnlockedHintLevel(2)}
                                className="w-full p-2.5 rounded-lg border border-dashed text-xs text-muted hover:text-primary transition-all flex items-center justify-center gap-2"
                                style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}
                              >
                                <Lock size={12} className="text-amber-400" />
                                <span>Unlock Hint 2 (Data Structure & Algorithm Guidance)</span>
                              </button>
                            )}

                            {/* Hint 3 */}
                            {unlockedHintLevel >= 3 ? (
                              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-secondary leading-relaxed animate-fade-in">
                                <div className="font-semibold text-purple-300 mb-1 flex items-center gap-1">
                                  <span>🔍 Hint 3 of 3 (Structural Pattern & Edge Cases):</span>
                                </div>
                                {aiResponse.hint3}
                              </div>
                            ) : unlockedHintLevel >= 2 ? (
                              <button
                                onClick={() => setUnlockedHintLevel(3)}
                                className="w-full p-2.5 rounded-lg border border-dashed text-xs text-muted hover:text-primary transition-all flex items-center justify-center gap-2"
                                style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}
                              >
                                <Lock size={12} className="text-purple-400" />
                                <span>Unlock Hint 3 (Code Pattern & Implementation Insight)</span>
                              </button>
                            ) : null}
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 2: COMPLEXITY ANALYSIS */}
                      {aiSubTab === 'complexity' && (
                        <div className="space-y-3 animate-fade-in">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                              <span className="text-muted font-semibold block uppercase text-[10px]">Time Complexity</span>
                              <span className="text-sky-400 text-sm font-mono font-bold block">{aiResponse.timeComplexity || 'O(N)'}</span>
                              <p className="text-[11px] text-secondary">Based on dynamic loop & iteration structure.</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                              <span className="text-muted font-semibold block uppercase text-[10px]">Space Complexity</span>
                              <span className="text-purple-400 text-sm font-mono font-bold block">{aiResponse.spaceComplexity || 'O(1)'}</span>
                              <p className="text-[11px] text-secondary">Based on memory allocations & containers.</p>
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-900/40 text-xs text-secondary leading-relaxed">
                            💡 <strong>Optimization Tip:</strong> If your solution uses O(N²) time complexity, consider using a HashMap or Two-Pointer strategy to optimize to O(N) linear time complexity.
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 3: EDGE CASES */}
                      {aiSubTab === 'edgecases' && (
                        <div className="space-y-2 animate-fade-in text-xs">
                          <span className="text-muted font-semibold uppercase text-[10px] block">Recommended Edge Cases to Test:</span>
                          <div className="space-y-2">
                            {aiResponse.edgeCases?.map((ec, idx) => (
                              <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-amber-300 font-semibold">{ec.input}</span>
                                  <span className="text-muted text-[10px]">{ec.description}</span>
                                </div>
                                <p className="text-secondary text-[11px]">{ec.expectedBehavior}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 4: CODE BREAKDOWN */}
                      {aiSubTab === 'explanation' && (
                        <div className="space-y-2 animate-fade-in text-xs">
                          <span className="text-muted font-semibold uppercase text-[10px] block">Step-by-Step Code Execution Breakdown:</span>
                          <div className="space-y-1.5">
                            {aiResponse.codeExplanation?.map((step, idx) => (
                              <div key={idx} className="p-2 rounded bg-slate-900/60 border border-slate-800 text-secondary text-[11px]">
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Learning Takeaway */}
                      <div
                        className="p-3 rounded-lg text-xs leading-relaxed"
                        style={{ background: 'rgba(57,211,83,0.08)', border: '1px solid rgba(57,211,83,0.25)', color: '#e6edf3' }}
                      >
                        <span className="font-semibold text-emerald-400 block mb-1">💡 Key Learning Takeaway:</span>
                        {aiResponse.learningTakeaway}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
