import type { AIHintResponse, JudgeResult } from '../types';
import { analyzeStudentCode } from './aiAnalyzer';

const CANDIDATE_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3-flash-preview',
];

/**
 * Strips code fences (e.g. ```json ... ```) from model response if present.
 */
function cleanJsonText(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  }
  return cleaned.trim();
}

/**
 * Analyzes code using Google Gemini AI with intelligent fallbacks.
 */
export async function analyzeWithGemini(
  problemTitle: string,
  code: string,
  result: JudgeResult,
  topics: string[]
): Promise<AIHintResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.info('[CodeMentor AI] No Gemini API key provided. Using rule-based analyzer.');
    return analyzeStudentCode(problemTitle, code, result, topics);
  }

  const prompt = `You are CodeMentor AI, a world-class Data Structures & Algorithms mentor and coding interview coach.
Analyze the following student submission for a coding problem and provide actionable, encouraging, and pedagogically sound feedback.

STRICT PEDAGOGICAL POLICY:
- Under NO circumstances should you write out full solution code, finished methods, or copy-paste code snippets in "correctFix" or hints.
- The student must write the code themselves to learn effectively.
- In "correctFix", provide ONLY a clear explanation and step-by-step approach on how to fix the error (e.g., explain what types to supply, why a certain condition or map update is needed, and how to structure the return value, without writing the completed code).

PROBLEM DETAILS:
- Title: ${problemTitle}
- Topics: ${topics.join(', ') || 'Algorithms, Data Structures'}

TEST & JUDGE RESULTS:
- Status: ${result.status}
- Test Cases Passed: ${result.passedCount} / ${result.totalCount}
- Failed Input: ${result.failedInput ?? 'None'}
- Expected Output: ${result.failedExpected ?? 'None'}
- Actual Output: ${result.failedGot ?? 'None'}
- Compilation / Runtime Errors: ${result.compilationError || result.runtimeError || 'None'}

STUDENT CODE:
${code.split('\n').map((l, i) => `${i + 1}: ${l}`).join('\n')}

REQUIREMENTS:
Return a single, raw, valid JSON object without markdown fences, with these exact keys:
{
  "errorExplanation": "Clear, friendly explanation of why the code failed (or praise if Accepted)",
  "conceptDetected": "The core DSA pattern or algorithm (e.g. Two Pointers, Monotonic Stack, Kadane's Algorithm)",
  "hint1": "Gentle nudge without revealing the solution",
  "hint2": "Stronger structural clue about the algorithm",
  "hint3": "Direct advice on how to fix or optimize the implementation",
  "learningTakeaway": "Key algorithmic takeaway or interview pattern rule",
  "exactLineNumber": 12, // number of the line causing the issue (or undefined if accepted)
  "failingCodeSnippet": "exact snippet from code that has the bug",
  "exactReason": "detailed explanation of why this line/block fails",
  "correctFix": "Clear explanation and step-by-step approach on how to fix the error. DO NOT provide full copy-paste code.",
  "timeComplexity": "e.g. O(n)",
  "spaceComplexity": "e.g. O(1)",
  "edgeCases": [
    { "input": "example input", "description": "e.g. Empty or single element array", "expectedBehavior": "what should happen" }
  ],
  "codeExplanation": [
    "Step 1: description of what the student code does first",
    "Step 2: description of second step",
    "Step 3: description of return"
  ],
  "followUpQuestion": {
    "title": "Related Practice Question Title",
    "description": "How would you solve this if constraints change or follow-up question",
    "concept": "Core concept"
  }
}`;

  for (const model of CANDIDATE_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`[CodeMentor AI] Gemini model ${model} returned ${response.status}:`, errText);
        continue; // try next candidate model
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        console.warn(`[CodeMentor AI] Empty output from ${model}, trying next...`);
        continue;
      }

      const parsed = JSON.parse(cleanJsonText(rawText));

      return {
        errorExplanation: parsed.errorExplanation || 'Analysis complete.',
        conceptDetected: parsed.conceptDetected || topics[0] || 'Algorithm Logic',
        hint1: parsed.hint1 || 'Consider testing with edge cases.',
        hint2: parsed.hint2 || 'Review the time and space complexity.',
        hint3: parsed.hint3 || 'Look at the failing test case input and trace by hand.',
        learningTakeaway: parsed.learningTakeaway || 'Mastering pattern recognition is key to solving similar problems.',
        exactLineNumber: typeof parsed.exactLineNumber === 'number' ? parsed.exactLineNumber : undefined,
        failingCodeSnippet: parsed.failingCodeSnippet || undefined,
        exactReason: parsed.exactReason || undefined,
        correctFix: parsed.correctFix || undefined,
        timeComplexity: parsed.timeComplexity || 'O(n)',
        spaceComplexity: parsed.spaceComplexity || 'O(1)',
        edgeCases: Array.isArray(parsed.edgeCases) ? parsed.edgeCases : [],
        codeExplanation: Array.isArray(parsed.codeExplanation) ? parsed.codeExplanation : [],
        followUpQuestion: parsed.followUpQuestion || {
          title: `Practice ${parsed.conceptDetected || 'this concept'}`,
          description: 'Try solving a related variant of this problem.',
          concept: parsed.conceptDetected || 'DSA',
        },
      };
    } catch (err) {
      console.warn(`[CodeMentor AI] Error with model ${model}:`, err);
    }
  }

  console.info('[CodeMentor AI] Gemini API calls exhausted or failed. Falling back to local rule-based analysis.');
  return analyzeStudentCode(problemTitle, code, result, topics);
}

/**
 * Evaluates student code against test cases using Gemini AI as an intelligent judge.
 * Used when external execution sandboxes are unreachable or offline.
 */
export async function judgeWithGemini(
  problem: { title: string; description: string },
  code: string,
  language: string,
  tests: Array<{ id: string | number; input: string; expected: string }>
): Promise<JudgeResult | null> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') return null;

  const prompt = `You are an automated LeetCode-style code execution judge.
Evaluate the following student code against each test case with complete precision.

PROBLEM: ${problem.title}
DESCRIPTION: ${problem.description}

LANGUAGE: ${language}
STUDENT CODE:
${code}

TEST CASES:
${tests.map((t, idx) => `Test ${idx + 1}:
  Input: ${t.input}
  Expected Output: ${t.expected}`).join('\n')}

INSTRUCTIONS:
1. Check for syntax / compilation errors in the student's code. If invalid, set status to "Compilation Error".
2. Mentally simulate and execute the code for each test case.
3. Compare the actual output with the expected output (ignoring trivial whitespace formatting like "[0, 1]" vs "[0,1]").
4. Set status to "Accepted" only if ALL test cases pass. Otherwise set to "Wrong Answer" or "Runtime Error".
5. Return ONLY a single raw valid JSON object without markdown fences, with this structure:
{
  "status": "Accepted",
  "passedCount": 3,
  "totalCount": 3,
  "failedInput": null,
  "failedExpected": null,
  "failedGot": null,
  "compilationError": null,
  "runtimeError": null,
  "testCaseDetails": [
    {
      "id": 1,
      "passed": true,
      "input": "...",
      "expected": "...",
      "got": "..."
    }
  ]
}`;

  for (const model of CANDIDATE_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) continue;

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsed = JSON.parse(cleanJsonText(rawText));
      if (!parsed.status) continue;

      const totalCount = tests.length;
      const isAccepted = parsed.status === 'Accepted';
      const passedCount = typeof parsed.passedCount === 'number'
        ? parsed.passedCount
        : (isAccepted ? totalCount : 0);

      return {
        status: parsed.status,
        passedCount,
        totalCount,
        executionTime: 75,
        memoryUsed: 40 * 1024,
        failedInput: parsed.failedInput || undefined,
        failedExpected: parsed.failedExpected || undefined,
        failedGot: parsed.failedGot || undefined,
        compilationError: parsed.compilationError || undefined,
        runtimeError: parsed.runtimeError || undefined,
        testCaseDetails: Array.isArray(parsed.testCaseDetails)
          ? parsed.testCaseDetails.map((td: any, i: number) => ({
              id: td.id ?? i + 1,
              passed: Boolean(td.passed),
              input: td.input || tests[i]?.input || '',
              expected: td.expected || tests[i]?.expected || '',
              got: td.got || (td.passed ? tests[i]?.expected : 'Incorrect output'),
            }))
          : tests.map((t, i) => ({
              id: i + 1,
              passed: isAccepted,
              input: t.input,
              expected: t.expected,
              got: isAccepted ? t.expected : 'Wrong output',
            })),
      };
    } catch {
      // try next model
    }
  }

  return null;
}
