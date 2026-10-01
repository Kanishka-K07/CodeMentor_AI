import { useState, useCallback } from 'react';
import type { Problem, JudgeResult, Language } from '../types';
import { executeAllTests, staticSyntaxCheck } from '../services/executionEngine';

// ============================================================
// JUDGE HOOK — Uses real Piston API for code execution.
// Falls back to static-analysis-only mock ONLY if Piston is
// completely unreachable (network error / 5xx).
// ============================================================

function simulateExecutionTime(code: string): number {
  const base = 50 + Math.random() * 150;
  return Math.round(base + code.length / 10);
}

function simulateMemory(): number {
  return Math.round(40 * 1024 + Math.random() * 5 * 1024);
}

// ============================================================
// OFFLINE MOCK
//
// DESIGN PRINCIPLES (to prevent false Accepted results):
//  1. staticSyntaxCheck() is the FIRST gate — compilation errors
//     are NEVER bypassed, even offline.
//  2. Stub / obviously incomplete code → Wrong Answer immediately.
//  3. strictAnalyzeCode() requires MULTIPLE specific algorithm signals,
//     not just a single keyword. When in doubt → Wrong Answer.
//  4. The default case ALWAYS returns Wrong Answer (never Accepted)
//     because we cannot safely verify any unknown problem offline.
//  5. All results carry OFFLINE_WARNING so the user knows results
//     are approximate.
// ============================================================

const OFFLINE_WARNING =
  '⚠️  Offline Mode: The Piston execution API is unreachable. ' +
  'Results are based on static code analysis only and may not be accurate. ' +
  'Try again when the API is back online for real execution.';

function mockEvaluate(
  problem: Problem,
  code: string,
  language: Language,
  isRun: boolean
): JudgeResult {
  const tests = isRun ? problem.examples : problem.hiddenTests;
  const totalCount = tests.length;
  const executionTime = simulateExecutionTime(code);

  // ── Gate 1: Compilation check ────────────────────────────────────────────
  const syntaxError = staticSyntaxCheck(code, language);
  if (syntaxError) {
    return {
      status: 'Compilation Error',
      passedCount: 0,
      totalCount,
      executionTime: 0,
      memoryUsed: 0,
      compilationError: syntaxError,
      testCaseDetails: tests.map((t, i) => ({
        id: i + 1, passed: false,
        input: t.input, expected: t.expected, got: 'Compilation Error',
      })),
    };
  }

  // ── Gate 2: Stub / obviously incomplete code ─────────────────────────────
  const bodyLines = code.split('\n').filter((l) => {
    const t = l.trim();
    return (
      t.length > 3 &&
      !t.startsWith('//') && !t.startsWith('*') &&
      !t.startsWith('import ') && !t.startsWith('class ') &&
      !t.startsWith('public ') && !t.startsWith('private ') &&
      !t.startsWith('}') && t !== '{'
    );
  });

  const isStub =
    bodyLines.length < 3 ||
    code.includes('// Write your code here') ||
    code.includes('# Write your code here') ||
    code.includes('// TODO') ||
    /\{\s*(\/\/[^\n]*)?\s*\}/.test(code); // empty method body

  if (isStub) {
    return {
      status: 'Wrong Answer',
      passedCount: 0,
      totalCount,
      executionTime,
      memoryUsed: simulateMemory(),
      failedInput: tests[0]?.input,
      failedExpected: tests[0]?.expected,
      failedGot: 'null (incomplete implementation)',
      compilationError: OFFLINE_WARNING,
      testCaseDetails: tests.map((t, i) => ({
        id: i + 1, passed: false,
        input: t.input, expected: t.expected, got: 'null (unimplemented)',
      })),
    };
  }

  // ── Gate 3: Strict algorithmic analysis ──────────────────────────────────
  const analysis = strictAnalyzeCode(problem.id, code, language);

  if (analysis.accepted) {
    return {
      status: 'Accepted',
      passedCount: totalCount,
      totalCount,
      executionTime,
      memoryUsed: simulateMemory(),
      compilationError: OFFLINE_WARNING,
      testCaseDetails: tests.map((t, i) => ({
        id: i + 1, passed: true,
        input: t.input, expected: t.expected, got: t.expected,
      })),
    };
  }

  const failIndex   = analysis.failIndex ?? 0;
  const failedTest  = tests[failIndex] ?? tests[0];
  const passedCount = failIndex;

  return {
    status: 'Wrong Answer',
    passedCount,
    totalCount,
    executionTime,
    memoryUsed: simulateMemory(),
    failedInput:    failedTest?.input,
    failedExpected: failedTest?.expected,
    failedGot:      analysis.failedGot ?? 'Wrong output',
    compilationError: OFFLINE_WARNING,
    testCaseDetails: tests.map((t, i) => ({
      id: i + 1,
      passed: i < passedCount,
      input: t.input,
      expected: t.expected,
      got: i < passedCount ? t.expected : (analysis.failedGot ?? 'Wrong output'),
    })),
  };
}

// ============================================================
// STRICT CODE ANALYSER
//
// Each case requires MULTIPLE specific signals drawn from the
// actual algorithm structure, not just keyword presence.
// The default case returns Wrong Answer — never a false Accepted.
// ============================================================
function strictAnalyzeCode(
  problemId: number,
  code: string,
  _language: Language
): { accepted: boolean; failIndex?: number; failedGot?: string } {
  const c = code;

  switch (problemId) {

    case 1: { // Two Sum — HashMap one-pass
      const hasHashMap  = /HashMap|new\s+HashMap/.test(c);
      const hasContains = c.includes('containsKey') || c.includes('.has(');
      const hasPut      = c.includes('.put(');
      const hasLoop     = /for\s*\(/.test(c) || /while\s*\(/.test(c);
      const hasReturn   = /return\s+new\s+int\s*\[/.test(c) || /return\s+\[/.test(c);
      const selfMatch   = c.includes('nums[i] + nums[i]');
      if (selfMatch) return { accepted: false, failIndex: 2, failedGot: '[0,0] (self-match bug)' };
      if (hasHashMap && hasContains && hasPut && hasLoop && hasReturn) return { accepted: true };
      if (hasLoop && !hasHashMap) return { accepted: false, failIndex: 0, failedGot: 'Time Limit Exceeded (O(n²) — use HashMap)' };
      return { accepted: false, failIndex: 0, failedGot: 'Wrong output — missing HashMap one-pass logic' };
    }

    case 2: { // Maximum Subarray — Kadane's algorithm
      const hasMaxCall  = /Math\.max\s*\(/.test(c);
      const hasCurrSum  = c.includes('current') || c.includes('curr') || /sum\s*[+]=/.test(c);
      const hasLoop     = /for\s*\(/.test(c);
      const hasReturn   = c.includes('return') && (c.includes('max') || c.includes('result'));
      // Wrong init: setting maxSum = 0 without nums[0] fallback
      const badInit     = /(?:maxSum|result|max)\s*=\s*0\b/.test(c) &&
                          !c.includes('Integer.MIN') && !c.includes('nums[0]');
      if (badInit) return { accepted: false, failIndex: 2, failedGot: '0 (wrong: maxSum initialized to 0 fails for all-negative input)' };
      if (hasMaxCall && hasCurrSum && hasLoop && hasReturn) return { accepted: true };
      return { accepted: false, failIndex: 0, failedGot: 'Wrong sum — missing Kadane\'s update logic' };
    }

    case 3: { // Contains Duplicate — Set membership
      const hasSet     = /HashSet|new\s+HashSet|Set\s*</.test(c);
      const hasAdd     = c.includes('.add(');
      const hasCheck   = c.includes('.contains(') || c.includes('.add(') && c.includes('return true');
      const hasFalse   = c.includes('return false');
      if (hasSet && hasAdd && hasCheck && hasFalse) return { accepted: true };
      return { accepted: false, failIndex: 0, failedGot: 'false — missing HashSet duplicate detection' };
    }

    case 4: { // Best Time to Buy and Sell Stock
      const hasMinTrack   = /minPrice|min_price/.test(c) || (c.includes('Math.min') && c.includes('price'));
      const hasMaxProfit  = /maxProfit|max_profit/.test(c) || (c.includes('Math.max') && c.includes('profit'));
      const hasLoop       = /for\s*\(/.test(c) || /while\s*\(/.test(c);
      const reversedSub   = /minPrice\s*-\s*price|min\s*-\s*price/.test(c);
      if (reversedSub) return { accepted: false, failIndex: 1, failedGot: 'Negative profit (subtraction reversed: should be price - minPrice)' };
      if (hasMinTrack && hasMaxProfit && hasLoop) return { accepted: true };
      return { accepted: false, failIndex: 0, failedGot: '0 — missing min-price tracking' };
    }

    case 5: { // Move Zeroes — two-pointer overwrite
      const hasTwoPtr    = (/int\s+j\s*=\s*0/.test(c) || /insertPos/.test(c)) && /for\s*\(/.test(c);
      const hasNonZero   = /!=\s*0/.test(c);
      const hasTailZero  = /nums\[j\+\+\]\s*=\s*0|nums\[insertPos/.test(c) || c.includes('Arrays.fill');
      const jOutside     = /\}\s*\n\s*j\+\+/.test(c);
      if (jOutside) return { accepted: false, failIndex: 0, failedGot: '[0,0,0,0,0] (j incremented outside if-block)' };
      if (hasTwoPtr && hasNonZero && hasTailZero) return { accepted: true };
      return { accepted: false, failIndex: 0, failedGot: 'Incorrect arrangement' };
    }

    case 6: { // Valid Palindrome
      const hasFilter  = c.includes('isLetterOrDigit') || c.includes('replaceAll') || /matches\(/.test(c);
      const hasTwoPts  = c.includes('left') && c.includes('right');
      const hasCase    = c.includes('toLowerCase') || c.includes('equalsIgnoreCase');
      if (hasFilter && hasTwoPts && hasCase) return { accepted: true };
      return { accepted: false, failIndex: 0, failedGot: 'false — missing non-alphanumeric filtering' };
    }

    case 7: { // Reverse String
      const hasSwap     = (c.includes('left') && c.includes('right') && c.includes('temp')) ||
                          (c.includes('swap') && c.includes('s['));
      const hasHalfStop = /length\s*\/\s*2/.test(c) || /s\.length\s*\/\s*2/.test(c);
      if (hasSwap && hasHalfStop) return { accepted: true };
      if (hasSwap && !hasHalfStop) return { accepted: false, failIndex: 1, failedGot: 'Array unchanged (loop runs full length — double swap restores original)' };
      return { accepted: false, failIndex: 0, failedGot: 'Unmodified array' };
    }

    case 8: { // Valid Anagram — frequency count
      const hasFreq     = /int\[\]\s*(count|freq)/.test(c) || (/HashMap/.test(c) && c.includes('getOrDefault'));
      const hasLenChk   = /\.length\(\)\s*!=|\.length\s*!=/.test(c) || c.includes('s.length() != t.length()');
      const hasReturns  = c.includes('return true') && c.includes('return false');
      if (hasFreq && hasLenChk && hasReturns) return { accepted: true };
      if (!hasLenChk) return { accepted: false, failIndex: 3, failedGot: 'true (missing length check — anagram of different length passes)' };
      return { accepted: false, failIndex: 0, failedGot: 'false — incorrect frequency counting' };
    }

    case 11: { // Single Number — XOR
      const hasXOR  = /\^\s*=|\^\s*nums/.test(c) || /result\s*\^=/.test(c);
      const hasLoop = /for\s*\(/.test(c);
      if (hasXOR && hasLoop) return { accepted: true };
      return { accepted: false, failIndex: 0, failedGot: 'Wrong — must use XOR (^) operator in a loop' };
    }

    case 12: { // Climbing Stairs — DP / Fibonacci
      const hasDPUpdate = /dp\[i\]\s*=\s*dp\[i\s*-\s*1\]\s*\+\s*dp\[i\s*-\s*2\]/.test(c);
      const hasFibVars  = (/\ba\s*=/.test(c) && /\bb\s*=/.test(c)) ||
                          (/prev/.test(c) && /curr/.test(c));
      if (hasDPUpdate || hasFibVars) return { accepted: true };
      return { accepted: false, failIndex: 0, failedGot: 'null — missing DP/Fibonacci recurrence relation' };
    }

    case 28: { // Binary Search
      const hasMid    = /mid\s*=.*left.*right/.test(c) || /mid\s*=\s*left\s*\+/.test(c);
      const hasBounds = /left\s*=\s*mid\s*\+\s*1/.test(c) && /right\s*=\s*mid\s*-\s*1/.test(c);
      const stuckBug  = /left\s*=\s*mid[^+\-]/.test(c);
      if (stuckBug) return { accepted: false, failIndex: 1, failedGot: 'Infinite loop (left = mid must be left = mid + 1)' };
      if (hasMid && hasBounds) return { accepted: true };
      return { accepted: false, failIndex: 0, failedGot: '-1 — incorrect boundary updates in binary search' };
    }

    case 34: { // Coin Change — bottom-up DP
      const hasDPInit = /dp\[0\]\s*=\s*0/.test(c) || /Arrays\.fill/.test(c);
      const hasDPLoop = /for.*coin/.test(c) || /for.*coins/.test(c);
      const hasMinDP  = /Math\.min/.test(c) && /dp\[/.test(c);
      if (hasDPInit && hasDPLoop && hasMinDP) return { accepted: true };
      return { accepted: false, failIndex: 0, failedGot: '-1 — missing DP Coin Change recurrence' };
    }

    default: {
      // ⚠️ Unknown problem — NEVER return Accepted offline.
      // We cannot verify correctness without real execution.
      return {
        accepted: false,
        failIndex: 0,
        failedGot: 'Cannot verify correctness offline. Please retry when the Piston API is available.',
      };
    }
  }
}

// ============================================================
// HOOK
// ============================================================
export function useJudge() {
  const [isRunning, setIsRunning]       = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const runCode = useCallback(
    async (problem: Problem, code: string, language: Language): Promise<JudgeResult> => {
      setIsRunning(true);
      const tests = problem.examples;
      try {
        const result = await executeAllTests(code, language, tests, true);
        setIsRunning(false);
        return result;
      } catch (err) {
        console.warn('[CodeMentor] Piston API unavailable — static-analysis fallback:', err);
        await new Promise((r) => setTimeout(r, 600 + Math.random() * 300));
        const result = mockEvaluate(problem, code, language, true);
        setIsRunning(false);
        return result;
      }
    },
    []
  );

  const submitCode = useCallback(
    async (problem: Problem, code: string, language: Language): Promise<JudgeResult> => {
      setIsSubmitting(true);
      const tests = problem.hiddenTests;
      try {
        const result = await executeAllTests(code, language, tests, false);
        setIsSubmitting(false);
        return result;
      } catch (err) {
        console.warn('[CodeMentor] Piston API unavailable — static-analysis fallback:', err);
        await new Promise((r) => setTimeout(r, 1200 + Math.random() * 400));
        const result = mockEvaluate(problem, code, language, false);
        setIsSubmitting(false);
        return result;
      }
    },
    []
  );

  return { runCode, submitCode, isRunning, isSubmitting };
}
