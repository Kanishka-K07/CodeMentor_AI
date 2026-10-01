import type { AIHintResponse } from '../types';

// ============================================================
// MOCK AI RESPONSES — Keyed by concept category
// These are realistic, Socratic tutor-style responses
// ============================================================

interface MockAITemplate {
  errorExplanation: string;
  conceptDetected: string;
  hint1: string;
  hint2: string;
  hint3: string;
  learningTakeaway: string;
  followUpQuestion: {
    title: string;
    description: string;
    concept: string;
  };
}

const mockResponses: Record<string, MockAITemplate> = {
  HashMap: {
    errorExplanation:
      "Your solution is giving a Wrong Answer because it's checking for values using a nested loop — comparing every pair of elements. While this eventually finds pairs, it misses the key insight: you can **remember what you've already seen** using a lookup table.",
    conceptDetected: 'HashMap / Frequency Count',
    hint1:
      "🔍 **Hint 1 of 3:** Think about what information you need to store as you scan the array once. For each element, what would make it easy to instantly know if its 'partner' has already been visited?",
    hint2:
      '🔍 **Hint 2 of 3:** A HashMap can map each number to its index. As you visit `nums[i]`, compute `complement = target - nums[i]`. Now ask: does the complement exist as a key in your map? If so, you found your answer!',
    hint3:
      '🔍 **Hint 3 of 3:** Here\'s the exact algorithm — iterate once, and for each number: (1) check if `target - num` is already in the map, and if so return `[map.get(target-num), currentIndex]`; (2) otherwise, put `num → currentIndex` into the map. This is O(n) time.',
    learningTakeaway:
      '💡 **Key Insight:** Whenever a brute-force O(n²) solution feels too slow or complex, ask yourself: "Can I trade space for time?" A HashMap turns O(n) lookups into O(1), reducing this to a single pass.',
    followUpQuestion: {
      title: 'Find All Pairs with Difference K',
      description:
        'Given an array of integers and an integer `k`, find all unique pairs `(a, b)` such that `a - b == k`. Return the count of such pairs. Try to solve this in O(n) time using a HashMap.',
      concept: 'HashMap',
    },
  },

  'Two Pointers': {
    errorExplanation:
      "Your solution uses extra space (a separate array or O(n) auxiliary data structure) to store intermediate results. While correct, this problem can be solved **in-place** using the two-pointer technique — which avoids extra memory entirely.",
    conceptDetected: 'Two Pointers / In-place Manipulation',
    hint1:
      '🔍 **Hint 1 of 3:** Imagine two people — one starting from the left of the array, one from the right. What condition should they check before swapping? How do they move closer to each other?',
    hint2:
      '🔍 **Hint 2 of 3:** Initialize `left = 0` and `right = n-1`. On each step, if the condition (e.g., palindrome check, water comparison) is satisfied, move inward. If not, perform your operation and move the appropriate pointer.',
    hint3:
      '🔍 **Hint 3 of 3:** The core loop: `while (left < right) { if (condition) { swap/update; } left++; right--; }`. The magic is that you\'re converging from both ends, covering all necessary pairs without extra space.',
    learningTakeaway:
      '💡 **Key Insight:** Two pointers work best on **sorted** arrays or when the problem has a natural "narrowing" property. Starting from both ends and converging inward is a powerful O(n) technique that avoids O(n²) brute force.',
    followUpQuestion: {
      title: 'Sort Colors (Dutch National Flag)',
      description:
        'Given an array with only 0s, 1s, and 2s, sort it in-place in a single pass. You must not use the sort function. Use three pointers (low, mid, high) to partition the array.',
      concept: 'Two Pointers',
    },
  },

  'Sliding Window': {
    errorExplanation:
      "Your solution recomputes the sum/result from scratch for every starting position — this is O(n²). The key insight you're missing is that when you **slide** a window forward, you only need to add one new element and remove one old element, making each step O(1).",
    conceptDetected: 'Sliding Window',
    hint1:
      '🔍 **Hint 1 of 3:** Think of a window of fixed size (or variable size) sliding across the array. When the window moves one step right, what exactly changes? What do you need to add, and what do you need to remove?',
    hint2:
      '🔍 **Hint 2 of 3:** For a fixed window of size `k`: initialize the window sum for the first `k` elements. Then, for each new position, `windowSum = windowSum + nums[i] - nums[i - k]`. This removes the leftmost and adds the rightmost element.',
    hint3:
      '🔍 **Hint 3 of 3:** For a variable window (e.g., longest substring), use `left` and `right` pointers. Expand `right` every iteration. When a condition is violated (e.g., duplicate in window), shrink from `left`. Track the max window size throughout.',
    learningTakeaway:
      '💡 **Key Insight:** Sliding Window is the go-to pattern for "contiguous subarray" problems. It converts O(n²) brute force into O(n) by amortizing — each element enters and exits the window exactly once.',
    followUpQuestion: {
      title: 'Minimum Size Subarray Sum',
      description:
        'Given an array of positive integers and a target sum, find the **minimal length** of a subarray whose sum is greater than or equal to the target. Return 0 if no such subarray exists. Solve in O(n) with a variable sliding window.',
      concept: 'Sliding Window',
    },
  },

  'Dynamic Programming': {
    errorExplanation:
      "Your recursive solution is correct but exceeds the time limit because it recomputes the same subproblems repeatedly. For example, in the Fibonacci pattern, `f(n)` calls `f(n-1)` and `f(n-2)`, but `f(n-1)` also calls `f(n-2)` — which was already computed! This exponential redundancy is the root cause.",
    conceptDetected: 'Dynamic Programming / Memoization',
    hint1:
      '🔍 **Hint 1 of 3:** Look at your recursion tree. Are there overlapping subproblems — the same inputs being computed more than once? If yes, you have a DP problem. The key question is: what\'s the smallest subproblem you can start solving from?',
    hint2:
      '🔍 **Hint 2 of 3:** Add a memo cache (HashMap or array). Before computing `solve(i)`, check if you\'ve already computed it. If yes, return the cached result. This simple change transforms exponential time to O(n)!',
    hint3:
      '🔍 **Hint 3 of 3:** Better yet, try bottom-up DP: create a `dp[]` array. Fill it from base cases upward: `dp[0] = base`, `dp[1] = base`, and for each `i` from 2 to n, `dp[i] = dp[i-1] + dp[i-2]` (or whatever your recurrence is). No recursion stack needed!',
    learningTakeaway:
      '💡 **Key Insight:** DP = Recursion + Memory. Any problem with overlapping subproblems and optimal substructure can be solved with DP. Always identify: (1) what are the states? (2) what\'s the recurrence/transition? (3) what are base cases?',
    followUpQuestion: {
      title: 'House Robber',
      description:
        'You are a robber planning to rob houses along a street. Each house has some amount of money. Adjacent houses have security systems — you cannot rob two adjacent houses. Find the maximum amount you can rob. Use DP with the insight that `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.',
      concept: 'Dynamic Programming',
    },
  },

  Stack: {
    errorExplanation:
      "Your solution tries to match brackets by scanning forward and backward, but this doesn't correctly handle nested structures like `({[]})`. The order of closing matters — the most recently opened bracket must be the first to close. This is a perfect fit for a **stack** (Last In, First Out).",
    conceptDetected: 'Stack / LIFO',
    hint1:
      '🔍 **Hint 1 of 3:** A stack works by pushing elements on top and only removing from the top. Think: when you see an opening bracket `(`, `[`, or `{`, what should you do? When you see a closing bracket, what should you check?',
    hint2:
      '🔍 **Hint 2 of 3:** Push every opening bracket onto the stack. When you encounter a closing bracket, peek at the stack\'s top. If it\'s the matching opening bracket, pop it and continue. If not — or if the stack is empty — the string is invalid.',
    hint3:
      '🔍 **Hint 3 of 3:** Final check: after processing all characters, the stack must be **empty** for the string to be valid. Any leftover opening brackets mean they were never closed. Map closing → opening with a HashMap for clean code.',
    learningTakeaway:
      '💡 **Key Insight:** Stacks are perfect when the most recently encountered item is the first one you need to process. Classic patterns: bracket matching, expression evaluation, undo operations, DFS traversal.',
    followUpQuestion: {
      title: 'Daily Temperatures',
      description:
        'Given an array of daily temperatures, return an array where each element is the number of days until a warmer temperature. If no warmer day exists, use 0. Use a monotonic stack to solve in O(n).',
      concept: 'Stack',
    },
  },

  'Binary Search': {
    errorExplanation:
      "Your solution uses a linear scan O(n) instead of taking advantage of the **sorted** property of the array. When an array is sorted, you can always determine which half contains your target by looking at just the middle element — eliminating half the search space each time.",
    conceptDetected: 'Binary Search',
    hint1:
      '🔍 **Hint 1 of 3:** Binary search works by repeatedly halving your search space. Start with the full array. Look at the middle element. Is your target smaller, equal to, or larger than it? Which half can you safely eliminate?',
    hint2:
      '🔍 **Hint 2 of 3:** Set `left = 0`, `right = n-1`. While `left <= right`: compute `mid = left + (right - left) / 2`. If `nums[mid] == target`, return `mid`. If `nums[mid] < target`, set `left = mid + 1`. Else set `right = mid - 1`.',
    hint3:
      '🔍 **Hint 3 of 3:** Common mistakes: (1) Use `left + (right - left) / 2` instead of `(left + right) / 2` to avoid integer overflow. (2) The loop condition is `left <= right`, not `left < right`. (3) For rotated arrays, first determine which half is sorted.',
    learningTakeaway:
      '💡 **Key Insight:** Binary search is O(log n) — searching a billion elements takes only 30 comparisons. Anytime the problem involves a sorted array and asking "does X exist?" or "find the boundary where condition changes from false to true", think binary search.',
    followUpQuestion: {
      title: 'Find Peak Element',
      description:
        'A peak element is one that is strictly greater than its neighbors. Given an integer array, find any peak element and return its index. Solve in O(log n) using binary search.',
      concept: 'Binary Search',
    },
  },

  DFS: {
    errorExplanation:
      "Your solution either misses some nodes or visits them multiple times because it doesn't properly mark nodes as **visited**. In graph/tree traversal, you must track which nodes have already been explored to avoid infinite loops in cyclic graphs or redundant work in dense graphs.",
    conceptDetected: 'DFS / Graph Traversal',
    hint1:
      '🔍 **Hint 1 of 3:** DFS explores as far as possible along each branch before backtracking. Think recursively: to explore from a node, (1) mark it visited, (2) for each unvisited neighbor, recursively explore. What\'s your base case?',
    hint2:
      '🔍 **Hint 2 of 3:** You need a `boolean[][] visited` (for grids) or `Set<Integer> visited` (for graphs). Before calling DFS on a neighbor, always check `if (!visited[next])`. This prevents revisiting and handles cycles.',
    hint3:
      '🔍 **Hint 3 of 3:** For the number-of-islands pattern: iterate every cell. If `grid[r][c] == \'1\'` and not visited, increment count and run DFS. In your DFS, mark current cell visited and recursively DFS in 4 directions (up, down, left, right), checking bounds.',
    learningTakeaway:
      '💡 **Key Insight:** DFS is the foundation of many graph algorithms: connected components, cycle detection, topological sort, pathfinding. The visited set is non-negotiable for correctness. For implicit graphs (like grids), mark cells visited by modifying them in-place.',
    followUpQuestion: {
      title: 'Max Area of Island',
      description:
        'Given a 2D grid of 0s and 1s, find the maximum area of any island (connected group of 1s). Use DFS to explore each island and count cells. Return the maximum count found.',
      concept: 'DFS',
    },
  },

  Recursion: {
    errorExplanation:
      "Your solution is missing a proper **base case** or has the wrong recursive formula. Without a correct base case, recursion never terminates (stack overflow), and without the right formula, results are wrong. Let's identify exactly where the logic breaks.",
    conceptDetected: 'Recursion / Base Cases',
    hint1:
      '🔍 **Hint 1 of 3:** Every recursive function must have two things: (1) a **base case** that stops the recursion when the problem is simple enough, and (2) a **recursive case** that breaks the problem into a smaller version of itself. Which of these is your code missing?',
    hint2:
      '🔍 **Hint 2 of 3:** Write out the small cases by hand: what\'s the answer for n=0? n=1? n=2? Once you see the pattern, write `if (n <= 1) return base_answer;`. Then express `answer(n)` in terms of `answer(n-1)` or `answer(n/2)`, etc.',
    hint3:
      '🔍 **Hint 3 of 3:** Trust the recursion! If your base case returns the right answer and your recursive step correctly reduces the problem size, the whole solution works. Add `System.out.println` calls at the start of your function to trace calls and verify.',
    learningTakeaway:
      '💡 **Key Insight:** Recursion = solving a problem by solving a smaller version of the same problem. Always define: (1) what does this function do? (2) what\'s the simplest input? (3) how does the answer for n relate to the answer for n-1?',
    followUpQuestion: {
      title: 'Power Function (Fast Exponentiation)',
      description:
        'Implement `pow(x, n)` which calculates x raised to the power n. Use recursive divide-and-conquer: `pow(x, n) = pow(x, n/2) * pow(x, n/2)`. Handle negative n and even/odd n separately. Aim for O(log n).',
      concept: 'Recursion',
    },
  },

  Sorting: {
    errorExplanation:
      "Your solution's sorting logic has an issue with the comparator or the algorithm isn't in-place as required. A common mistake is implementing a slow O(n²) sort when O(n log n) is needed, or getting the comparator direction wrong.",
    conceptDetected: 'Sorting / Comparator',
    hint1:
      '🔍 **Hint 1 of 3:** What order are you trying to sort in? Ascending or descending? For custom objects, what field determines their ordering? Make sure your comparator returns a negative number when `a` should come BEFORE `b`.',
    hint2:
      '🔍 **Hint 2 of 3:** Java\'s `Arrays.sort()` uses a comparator: `Arrays.sort(arr, (a, b) -> a - b)` for ascending, or `(a, b) -> b - a` for descending. For safety with large values (to avoid overflow), use `Integer.compare(a, b)` instead of `a - b`.',
    hint3:
      '🔍 **Hint 3 of 3:** If you need to sort by multiple criteria (e.g., first by length, then alphabetically), chain comparators: `Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder())`.',
    learningTakeaway:
      '💡 **Key Insight:** Sorting as a preprocessing step unlocks many efficient algorithms. After sorting, you can use binary search, two pointers, and other techniques that rely on order. The trade-off: O(n log n) sort time, but subsequent operations are much faster.',
    followUpQuestion: {
      title: 'Largest Number',
      description:
        'Given a list of non-negative integers, arrange them so they form the largest number. For example, [3,30,34,5,9] → "9534330". The trick: compare two numbers by concatenating them in both orders and picking which is larger.',
      concept: 'Sorting',
    },
  },

  Backtracking: {
    errorExplanation:
      "Your solution either doesn't generate all valid combinations or generates duplicates. Backtracking requires you to (1) make a choice, (2) explore further, and (3) **undo** the choice (backtrack) before trying the next option. Missing the undo step leads to corrupted state.",
    conceptDetected: 'Backtracking',
    hint1:
      '🔍 **Hint 1 of 3:** Backtracking explores all possibilities by building candidates step by step. At each step, you add one element, recurse to explore further, then **remove** that element before trying the next. Where in your code are you undoing changes?',
    hint2:
      '🔍 **Hint 2 of 3:** Structure: `void backtrack(current, choices) { if (goal reached) { save current; return; } for (each choice) { add choice to current; backtrack(current, remaining choices); remove choice from current; } }`',
    hint3:
      '🔍 **Hint 3 of 3:** For duplicates: sort the input first. Then, when iterating through choices, skip if `i > start && choices[i] == choices[i-1]` — this prevents generating duplicate combinations that start with the same value.',
    learningTakeaway:
      '💡 **Key Insight:** Backtracking is exhaustive search with pruning. It\'s the right tool when you need all possible solutions. The key invariant: after the recursive call returns, the state must be exactly what it was before the call (undo the mutation).',
    followUpQuestion: {
      title: 'Combination Sum',
      description:
        'Given an array of distinct integers and a target, return all unique combinations where numbers sum to target. Numbers can be reused. Use backtracking: at each step, either include the current number (and stay at same index) or skip to the next.',
      concept: 'Backtracking',
    },
  },

  Greedy: {
    errorExplanation:
      "Your solution tries to look ahead too far or uses DP on a problem that has a simpler greedy solution. The greedy approach works when making the locally optimal choice at each step leads to a globally optimal solution — no need to try all possibilities.",
    conceptDetected: 'Greedy Algorithm',
    hint1:
      '🔍 **Hint 1 of 3:** Think about what the "best" local choice is at each step. For stock problems: the best choice is to buy as low as possible. For interval problems: always pick the interval that ends earliest. What\'s the obvious "best" move here?',
    hint2:
      '🔍 **Hint 2 of 3:** Greedy usually involves one pass through the data, tracking a "running best" value. For this problem, what value should you track? What update rule applies at each step?',
    hint3:
      '🔍 **Hint 3 of 3:** Prove your greedy works: can you show that choosing anything other than the locally optimal option never leads to a better global answer? Greedy fails when early choices constrain future options in non-obvious ways — that\'s when DP is needed.',
    learningTakeaway:
      '💡 **Key Insight:** Greedy is O(n) and elegant when it works. It applies when the optimal substructure holds AND the greedy choice property holds. If you find a counterexample to your greedy, switch to DP.',
    followUpQuestion: {
      title: 'Jump Game',
      description:
        'Given an array where each element represents the maximum jump length from that position, determine if you can reach the last index. Use a greedy approach: track the maximum reachable index at each step.',
      concept: 'Greedy',
    },
  },

  default: {
    errorExplanation:
      "Your submission didn't pass all test cases. This is often due to an edge case, off-by-one error, or a fundamental algorithmic issue. Let's break down the problem systematically.",
    conceptDetected: 'Algorithm Design',
    hint1:
      '🔍 **Hint 1 of 3:** Start by tracing through the failing test case manually, step by step. Write out what your code does at each line. Where does the actual behavior diverge from what you expected?',
    hint2:
      '🔍 **Hint 2 of 3:** Check edge cases: empty input, single element, all same elements, maximum constraints, negative numbers. One of these likely exposes the bug. Add a println to output intermediate values.',
    hint3:
      '🔍 **Hint 3 of 3:** Review your loop bounds (< vs <=), initialization values (0 vs -1 vs Integer.MIN_VALUE), and return statements. Off-by-one errors and wrong initial values cause ~40% of all algorithm bugs.',
    learningTakeaway:
      '💡 **Key Insight:** Systematic debugging beats guessing. Always: (1) identify the failing test case, (2) trace your code manually, (3) find the exact step where output diverges from expected, (4) fix the root cause, not the symptom.',
    followUpQuestion: {
      title: 'Find All Duplicates in an Array',
      description:
        'Given an integer array where elements are in range [1, n] and each appears once or twice, find all elements that appear twice. Solve in O(n) time and O(1) extra space by using the array indices as a hash table.',
      concept: 'Arrays',
    },
  },
};

export function getMockAIResponse(
  concept: string,
  status: string,
  problemTitle: string
): AIHintResponse {
  const key = Object.keys(mockResponses).find(
    (k) => concept.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(concept.toLowerCase())
  ) ?? 'default';

  const template = mockResponses[key];

  return {
    errorExplanation: `**"${problemTitle}"** — ${template.errorExplanation}`,
    conceptDetected: template.conceptDetected,
    hint1: template.hint1,
    hint2: template.hint2,
    hint3: template.hint3,
    learningTakeaway: template.learningTakeaway,
    followUpQuestion: template.followUpQuestion,
  };
}

export const mockConceptMap: Record<string, string> = {
  'Two Sum': 'HashMap',
  'Maximum Subarray': 'Dynamic Programming',
  'Contains Duplicate': 'HashMap',
  'Best Time to Buy and Sell Stock': 'Greedy',
  'Move Zeroes': 'Two Pointers',
  'Valid Palindrome': 'Two Pointers',
  'Reverse String': 'Two Pointers',
  'Valid Anagram': 'HashMap',
  'First Unique Character in a String': 'HashMap',
  'Longest Common Prefix': 'Sorting',
  'Single Number': 'Math',
  'Climbing Stairs': 'Dynamic Programming',
  'Merge Sorted Array': 'Two Pointers',
  'Find Missing Number': 'Math',
  'Count Elements with Equal Divisors': 'Arrays',
  'Maximum Average Subarray I': 'Sliding Window',
  'Intersection of Two Arrays': 'HashMap',
  'Majority Element': 'HashMap',
  'Roman to Integer': 'HashMap',
  "Pascal's Triangle": 'Dynamic Programming',
  '3Sum': 'Two Pointers',
  'Longest Substring Without Repeating Characters': 'Sliding Window',
  'Group Anagrams': 'HashMap',
  'Container With Most Water': 'Two Pointers',
  'Add Two Numbers (Linked List)': 'Recursion',
  'Valid Parentheses': 'Stack',
  'Min Stack': 'Stack',
  'Binary Search': 'Binary Search',
  'Search in Rotated Sorted Array': 'Binary Search',
  'Kth Largest Element in an Array': 'Sorting',
  'Number of Islands': 'DFS',
  'Lowest Common Ancestor of a BST': 'Recursion',
  'Binary Tree Level Order Traversal': 'DFS',
  'Coin Change': 'Dynamic Programming',
  'Product of Array Except Self': 'Arrays',
  'Maximum Depth of Binary Tree': 'Recursion',
  'Subarray Sum Equals K': 'HashMap',
  'Top K Frequent Elements': 'Sorting',
  'Spiral Matrix': 'Arrays',
  'Decode Ways': 'Dynamic Programming',
  'Trapping Rain Water': 'Two Pointers',
  'Longest Valid Parentheses': 'Stack',
  'N-Queens': 'Backtracking',
  'Merge K Sorted Lists': 'Sorting',
  'Word Break': 'Dynamic Programming',
  'Course Schedule': 'DFS',
  'Alien Dictionary': 'DFS',
  'Longest Increasing Subsequence': 'Dynamic Programming',
  'Serialize and Deserialize Binary Tree': 'DFS',
  'Regular Expression Matching': 'Dynamic Programming',
};
