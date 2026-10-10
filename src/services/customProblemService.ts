import type { Problem, Difficulty, Topic, TestCase, HiddenTestCase } from '../types';

const CANDIDATE_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3-flash-preview',
];

function cleanJsonText(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  }
  return cleaned.trim();
}

/**
 * Intelligent local DSA synthesizer that converts any custom user prompt
 * into a structured Java coding problem with test cases and expected outputs.
 */
export function synthesizeCustomProblemLocally(userPrompt: string): Problem {
  const prompt = userPrompt.trim();
  const lower = prompt.toLowerCase();

  // 1. Detect Topics & Concept
  const topics: Topic[] = [];
  if (lower.includes('string') || lower.includes('palindrome') || lower.includes('anagram') || lower.includes('substring') || lower.includes('vowel')) {
    topics.push('Strings');
  }
  if (lower.includes('array') || lower.includes('matrix') || lower.includes('subarray') || lower.includes('duplicate') || lower.includes('sum')) {
    topics.push('Arrays');
  }
  if (lower.includes('map') || lower.includes('frequency') || lower.includes('count') || lower.includes('hash')) {
    topics.push('HashMap');
  }
  if (lower.includes('two pointer') || lower.includes('reverse') || lower.includes('sorted')) {
    topics.push('Two Pointers');
  }
  if (lower.includes('window') || lower.includes('longest substring') || lower.includes('consecutive')) {
    topics.push('Sliding Window');
  }
  if (lower.includes('stack') || lower.includes('parenthes') || lower.includes('bracket') || lower.includes('postfix')) {
    topics.push('Stack');
  }
  if (lower.includes('tree') || lower.includes('bst') || lower.includes('root') || lower.includes('leaf') || lower.includes('depth')) {
    topics.push('Trees');
  }
  if (lower.includes('dynamic programming') || lower.includes('dp') || lower.includes('knapsack') || lower.includes('fibonacci')) {
    topics.push('Dynamic Programming');
  }
  if (lower.includes('sort') || lower.includes('median') || lower.includes('kth')) {
    topics.push('Sorting');
  }
  if (lower.includes('binary search') || lower.includes('search in')) {
    topics.push('Binary Search');
  }
  if (topics.length === 0) {
    topics.push('Arrays', 'Math');
  }

  // 2. Determine Difficulty
  let difficulty: Difficulty = 'Easy';
  if (lower.includes('hard') || lower.includes('dp') || lower.includes('graph') || lower.includes('trie') || lower.includes('segment tree') || lower.includes('median of two sorted')) {
    difficulty = 'Hard';
  } else if (lower.includes('medium') || lower.includes('subsequence') || lower.includes('longest') || lower.includes('matrix') || lower.includes('permut') || lower.includes('combination')) {
    difficulty = 'Medium';
  }

  // 3. Generate Title
  let title = prompt.split('\n')[0].replace(/^#+\s*/, '').replace(/^[0-9]+[.)]\s*/, '').trim();
  if (title.length > 55) {
    title = title.substring(0, 55).replace(/\s+\S*$/, '') + '...';
  }
  if (title.length < 5) {
    title = 'Custom Challenge: ' + (topics[0] || 'Algorithm Problem');
  }

  // 4. Synthesize Java Method Signature & Test Cases
  let starterCode = '';
  let examples: TestCase[] = [];
  let hiddenTests: HiddenTestCase[] = [];

  if (lower.includes('palindrome')) {
    starterCode = `class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your solution here\n        return false;\n    }\n}`;
    examples = [
      { id: '1', input: '"racecar"', expected: 'true', explanation: '"racecar" reads the same forwards and backwards.' },
      { id: '2', input: '"hello"', expected: 'false', explanation: '"hello" reversed is "olleh".' },
      { id: '3', input: '"A man, a plan, a canal: Panama"', expected: 'true', explanation: 'Ignoring non-alphanumeric characters, it is a palindrome.' },
    ];
    hiddenTests = [
      { id: 'h1', input: '""', expected: 'true' },
      { id: 'h2', input: '"a"', expected: 'true' },
      { id: 'h3', input: '"ab_a"', expected: 'true' },
      { id: 'h4', input: '"0P"', expected: 'false' },
    ];
  } else if (lower.includes('reverse string') || (lower.includes('reverse') && lower.includes('string'))) {
    starterCode = `class Solution {\n    public String reverseString(String s) {\n        // Write your solution here\n        return "";\n    }\n}`;
    examples = [
      { id: '1', input: '"hello"', expected: '"olleh"' },
      { id: '2', input: '"Hannah"', expected: '"hannaH"' },
    ];
    hiddenTests = [
      { id: 'h1', input: '"a"', expected: '"a"' },
      { id: 'h2', input: '"code"', expected: '"edoc"' },
      { id: 'h3', input: '""', expected: '""' },
    ];
  } else if (lower.includes('two sum') || (lower.includes('sum') && lower.includes('target'))) {
    starterCode = `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n}`;
    examples = [
      { id: '1', input: '[2,7,11,15], target=9', expected: '[0,1]', explanation: 'nums[0] + nums[1] == 9, so return [0, 1].' },
      { id: '2', input: '[3,2,4], target=6', expected: '[1,2]' },
    ];
    hiddenTests = [
      { id: 'h1', input: '[3,3], target=6', expected: '[0,1]' },
      { id: 'h2', input: '[-1,-2,-3,-4,-5], target=-8', expected: '[2,4]' },
      { id: 'h3', input: '[0,4,3,0], target=0', expected: '[0,3]' },
    ];
  } else if (lower.includes('max') && (lower.includes('subarray') || lower.includes('sum'))) {
    starterCode = `class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}`;
    examples = [
      { id: '1', input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { id: '2', input: '[1]', expected: '1' },
      { id: '3', input: '[5,4,-1,7,8]', expected: '23' },
    ];
    hiddenTests = [
      { id: 'h1', input: '[-1]', expected: '-1' },
      { id: 'h2', input: '[-2,-1]', expected: '-1' },
      { id: 'h3', input: '[1,2,3,4]', expected: '10' },
    ];
  } else if (lower.includes('anagram')) {
    starterCode = `class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write your solution here\n        return false;\n    }\n}`;
    examples = [
      { id: '1', input: '"anagram"|"nagaram"', expected: 'true' },
      { id: '2', input: '"rat"|"car"', expected: 'false' },
    ];
    hiddenTests = [
      { id: 'h1', input: '"a"|"a"', expected: 'true' },
      { id: 'h2', input: '"ab"|"a"', expected: 'false' },
      { id: 'h3', input: '"listen"|"silent"', expected: 'true' },
    ];
  } else if (lower.includes('parenthes') || lower.includes('bracket')) {
    starterCode = `class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n        return false;\n    }\n}`;
    examples = [
      { id: '1', input: '"()"', expected: 'true' },
      { id: '2', input: '"()[]{}"', expected: 'true' },
      { id: '3', input: '"(]"', expected: 'false' },
    ];
    hiddenTests = [
      { id: 'h1', input: '"(["', expected: 'false' },
      { id: 'h2', input: '"{[]}"', expected: 'true' },
      { id: 'h3', input: '"]"', expected: 'false' },
    ];
  } else if (lower.includes('fibonacci')) {
    starterCode = `class Solution {\n    public int fib(int n) {\n        // Write your solution here\n        return 0;\n    }\n}`;
    examples = [
      { id: '1', input: '2', expected: '1' },
      { id: '2', input: '3', expected: '2' },
      { id: '3', input: '4', expected: '3' },
    ];
    hiddenTests = [
      { id: 'h1', input: '0', expected: '0' },
      { id: 'h2', input: '1', expected: '1' },
      { id: 'h3', input: '10', expected: '55' },
    ];
  } else {
    // Generic algorithmic challenge template
    starterCode = `class Solution {\n    public int solve(int[] nums) {\n        // Implement your solution for: ${title}\n        return 0;\n    }\n}`;
    examples = [
      { id: '1', input: '[1,2,3,4,5]', expected: '15', explanation: 'Sample evaluation for standard input' },
      { id: '2', input: '[10,20]', expected: '30' },
    ];
    hiddenTests = [
      { id: 'h1', input: '[0]', expected: '0' },
      { id: 'h2', input: '[-1,1]', expected: '0' },
      { id: 'h3', input: '[100]', expected: '100' },
    ];
  }

  const customId = 9000 + Math.floor(Math.random() * 900);

  return {
    id: customId,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    difficulty,
    topics,
    description: prompt.length > 20 ? prompt : `${prompt}\n\nAnalyze the requirements and implement the optimal solution. Make sure to handle all corner and edge cases.`,
    constraints: [
      'Time complexity should be optimal (O(N) or O(N log N)).',
      'Memory limit: 256 MB.',
      'Input constraints follow standard DSA competitive programming guidelines.',
    ],
    examples,
    hiddenTests,
    starterCode: {
      java: starterCode,
    },
    concepts: topics,
    acceptanceRate: difficulty === 'Easy' ? 78 : difficulty === 'Medium' ? 52 : 34,
    timeLimit: 2000,
    memoryLimit: 256,
  };
}

/**
 * Generates or enhances a custom problem with Google Gemini AI.
 * Falls back safely to synthesizeCustomProblemLocally if API key is not present or on failure.
 */
export async function generateCustomProblemWithAI(userPrompt: string): Promise<Problem> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return synthesizeCustomProblemLocally(userPrompt);
  }

  const systemPrompt = `You are an elite competitive programming and DSA problem designer.
A student or developer provided the following custom problem question / requirements:
"""
${userPrompt}
"""

Analyze this problem carefully, determine the requirements, edge cases, and expected outputs.
Generate a valid Java solution template and 3-5 comprehensive test cases (including edge cases like empty, single element, negative numbers, boundary constraints) with accurate expected outputs.

REQUIREMENTS:
Return ONLY a valid JSON object without markdown fences, matching this structure:
{
  "title": "Short, clear title",
  "difficulty": "Easy" | "Medium" | "Hard",
  "topics": ["Array", "String", "Two Pointers", "Dynamic Programming", "Stack", etc.],
  "description": "Clear problem statement, input/output requirements, constraints",
  "constraints": ["1 <= nums.length <= 10^5", "...", "..."],
  "starterCode": {
    "java": "class Solution {\\n    public ... methodName(...) {\\n        // Solution\\n    }\\n}"
  },
  "examples": [
    { "id": "1", "input": "[2,7,11,15], target=9", "expected": "[0,1]", "explanation": "..." },
    { "id": "2", "input": "...", "expected": "..." }
  ],
  "hiddenTests": [
    { "id": "h1", "input": "...", "expected": "..." },
    { "id": "h2", "input": "...", "expected": "..." },
    { "id": "h3", "input": "...", "expected": "..." }
  ],
  "concepts": ["Core Pattern 1", "Core Pattern 2"]
}`;

  for (const model of CANDIDATE_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
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

      if (parsed.title && parsed.starterCode?.java && Array.isArray(parsed.examples)) {
        const customId = 9000 + Math.floor(Math.random() * 900);
        return {
          id: customId,
          title: parsed.title,
          slug: parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          difficulty: (parsed.difficulty as Difficulty) || 'Medium',
          topics: Array.isArray(parsed.topics) ? parsed.topics : ['Arrays'],
          description: parsed.description || userPrompt,
          constraints: Array.isArray(parsed.constraints) ? parsed.constraints : ['Optimal time and space required.'],
          examples: parsed.examples.map((ex: any, idx: number) => ({
            id: String(idx + 1),
            input: String(ex.input ?? ''),
            expected: String(ex.expected ?? ''),
            explanation: ex.explanation ? String(ex.explanation) : undefined,
          })),
          hiddenTests: Array.isArray(parsed.hiddenTests) && parsed.hiddenTests.length > 0
            ? parsed.hiddenTests.map((ht: any, idx: number) => ({
                id: `h${idx + 1}`,
                input: String(ht.input ?? ''),
                expected: String(ht.expected ?? ''),
              }))
            : parsed.examples.map((ex: any, idx: number) => ({
                id: `h${idx + 1}`,
                input: String(ex.input ?? ''),
                expected: String(ex.expected ?? ''),
              })),
          starterCode: {
            java: parsed.starterCode.java,
          },
          concepts: Array.isArray(parsed.concepts) ? parsed.concepts : parsed.topics || [],
          acceptanceRate: 65,
          timeLimit: 2000,
          memoryLimit: 256,
        };
      }
    } catch {
      // try next model or fallback
    }
  }

  // Fallback to offline rule-based synthesizer
  return synthesizeCustomProblemLocally(userPrompt);
}
