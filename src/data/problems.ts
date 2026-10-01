import type { Problem, Language } from '../types';

// ============================================================
// 50 ORIGINAL LEETCODE-STYLE PROBLEMS
// Easy: 1-20 | Medium: 21-40 | Hard: 41-50
// ============================================================

const javaStarter = (sig: string) =>
  `import java.util.*;\n\nclass Solution {\n    ${sig} {\n        // Write your code here\n    }\n}`;

const pyStarter = (sig: string) =>
  `class Solution:\n    ${sig}:\n        # Write your code here\n        pass`;

export const problems: Problem[] = [
  // ============================================================
  // EASY (1-20)
  // ============================================================
  {
    id: 1,
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    topics: ['Arrays', 'HashMap'],
    acceptanceRate: 49,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.',
    ],
    examples: [
      { id: 'e1', input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
      { id: 'e2', input: 'nums = [3,2,4], target = 6', expected: '[1,2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
      { id: 'e3', input: 'nums = [3,3], target = 6', expected: '[0,1]', explanation: 'nums[0] + nums[1] = 3 + 3 = 6.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1,2,3,4,5]|9', expected: '[3,4]' },
      { id: 'h2', input: '[0,4,3,0]|0', expected: '[0,3]' },
      { id: 'h3', input: '[-1,-2,-3,-4,-5]|-8', expected: '[2,4]' },
      { id: 'h4', input: '[1000000000,999999999]|1999999999', expected: '[0,1]' },
    ],
    starterCode: {
      java: javaStarter('public int[] twoSum(int[] nums, int target)'),
      python: pyStarter('def twoSum(self, nums: List[int], target: int) -> List[int]'),
    },
    concepts: ['HashMap', 'Arrays', 'Two-Pass vs One-Pass'],
  },

  {
    id: 2,
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'Easy',
    topics: ['Arrays', 'Dynamic Programming'],
    acceptanceRate: 50,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      "Given an integer array `nums`, find the **subarray** with the largest sum, and return its sum.\n\nA **subarray** is a contiguous non-empty sequence of elements within an array.",
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    examples: [
      { id: 'e1', input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expected: '6', explanation: 'Subarray [4,-1,2,1] has the largest sum = 6.' },
      { id: 'e2', input: 'nums = [1]', expected: '1', explanation: 'Only one element.' },
      { id: 'e3', input: 'nums = [5,4,-1,7,8]', expected: '23', explanation: 'Entire array is the subarray.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[-1,-2,-3,-4]', expected: '-1' },
      { id: 'h2', input: '[0,0,0]', expected: '0' },
      { id: 'h3', input: '[1,2,3,4,5]', expected: '15' },
      { id: 'h4', input: '[-2,1]', expected: '1' },
    ],
    starterCode: {
      java: javaStarter('public int maxSubArray(int[] nums)'),
      python: pyStarter('def maxSubArray(self, nums: List[int]) -> int'),
    },
    concepts: ["Kadane's Algorithm", 'Dynamic Programming', 'Arrays'],
  },

  {
    id: 3,
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    difficulty: 'Easy',
    topics: ['Arrays', 'HashMap'],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.',
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁹ ≤ nums[i] ≤ 10⁹'],
    examples: [
      { id: 'e1', input: 'nums = [1,2,3,1]', expected: 'true', explanation: '1 appears twice.' },
      { id: 'e2', input: 'nums = [1,2,3,4]', expected: 'false', explanation: 'All elements distinct.' },
      { id: 'e3', input: 'nums = [1,1,1,3,3,4,3,2,4,2]', expected: 'true', explanation: 'Multiple duplicates.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1]', expected: 'false' },
      { id: 'h2', input: '[1,1]', expected: 'true' },
      { id: 'h3', input: '[-1,-1,0]', expected: 'true' },
      { id: 'h4', input: '[0,1,2,3,4,5]', expected: 'false' },
    ],
    starterCode: {
      java: javaStarter('public boolean containsDuplicate(int[] nums)'),
      python: pyStarter('def containsDuplicate(self, nums: List[int]) -> bool'),
    },
    concepts: ['HashSet', 'Arrays', 'Frequency Count'],
  },

  {
    id: 4,
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-sell-stock',
    difficulty: 'Easy',
    topics: ['Arrays'],
    acceptanceRate: 55,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'You are given an array `prices` where `prices[i]` is the price of a given stock on the i-th day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the *maximum profit* you can achieve. If you cannot achieve any profit, return `0`.',
    constraints: ['1 ≤ prices.length ≤ 10⁵', '0 ≤ prices[i] ≤ 10⁴'],
    examples: [
      { id: 'e1', input: 'prices = [7,1,5,3,6,4]', expected: '5', explanation: 'Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 5.' },
      { id: 'e2', input: 'prices = [7,6,4,3,1]', expected: '0', explanation: 'Prices only go down. No profit possible.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1,2]', expected: '1' },
      { id: 'h2', input: '[2,1]', expected: '0' },
      { id: 'h3', input: '[3,2,6,5,0,3]', expected: '4' },
      { id: 'h4', input: '[1,1,1,1]', expected: '0' },
    ],
    starterCode: {
      java: javaStarter('public int maxProfit(int[] prices)'),
      python: pyStarter('def maxProfit(self, prices: List[int]) -> int'),
    },
    concepts: ['Arrays', 'Greedy', 'One Pass'],
  },

  {
    id: 5,
    title: 'Move Zeroes',
    slug: 'move-zeroes',
    difficulty: 'Easy',
    topics: ['Arrays', 'Two Pointers'],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements.\n\n**Note** that you must do this in-place without making a copy of the array.',
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-2³¹ ≤ nums[i] ≤ 2³¹ - 1'],
    examples: [
      { id: 'e1', input: 'nums = [0,1,0,3,12]', expected: '[1,3,12,0,0]', explanation: 'Zeroes moved to end.' },
      { id: 'e2', input: 'nums = [0]', expected: '[0]', explanation: 'Single zero remains.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1,0,1]', expected: '[1,1,0]' },
      { id: 'h2', input: '[0,0,0,1]', expected: '[1,0,0,0]' },
      { id: 'h3', input: '[1,2,3]', expected: '[1,2,3]' },
      { id: 'h4', input: '[0,0,0]', expected: '[0,0,0]' },
    ],
    starterCode: {
      java: javaStarter('public void moveZeroes(int[] nums)'),
      python: pyStarter('def moveZeroes(self, nums: List[int]) -> None'),
    },
    concepts: ['Two Pointers', 'In-place manipulation'],
  },

  {
    id: 6,
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    difficulty: 'Easy',
    topics: ['Strings', 'Two Pointers'],
    acceptanceRate: 45,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a **palindrome**, or `false` otherwise.',
    constraints: ['1 ≤ s.length ≤ 2 × 10⁵', 's consists only of printable ASCII characters.'],
    examples: [
      { id: 'e1', input: 's = "A man, a plan, a canal: Panama"', expected: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { id: 'e2', input: 's = "race a car"', expected: 'false', explanation: '"raceacar" is not a palindrome.' },
      { id: 'e3', input: 's = " "', expected: 'true', explanation: 'Empty after cleaning = palindrome.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '"ab"', expected: 'false' },
      { id: 'h2', input: '"a"', expected: 'true' },
      { id: 'h3', input: '"0P"', expected: 'false' },
      { id: 'h4', input: '"Was it a car or a cat I saw?"', expected: 'true' },
    ],
    starterCode: {
      java: javaStarter('public boolean isPalindrome(String s)'),
      python: pyStarter('def isPalindrome(self, s: str) -> bool'),
    },
    concepts: ['Two Pointers', 'Strings', 'Character Filtering'],
  },

  {
    id: 7,
    title: 'Reverse String',
    slug: 'reverse-string',
    difficulty: 'Easy',
    topics: ['Strings', 'Two Pointers'],
    acceptanceRate: 77,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array **in-place** with O(1) extra memory.",
    constraints: ['1 ≤ s.length ≤ 10⁵', 's[i] is a printable ASCII character.'],
    examples: [
      { id: 'e1', input: 's = ["h","e","l","l","o"]', expected: '["o","l","l","e","h"]', explanation: 'Reversed in place.' },
      { id: 'e2', input: 's = ["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]', explanation: 'Reversed in place.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '["a"]', expected: '["a"]' },
      { id: 'h2', input: '["a","b"]', expected: '["b","a"]' },
      { id: 'h3', input: '["A","B","C","D"]', expected: '["D","C","B","A"]' },
    ],
    starterCode: {
      java: javaStarter('public void reverseString(char[] s)'),
      python: pyStarter('def reverseString(self, s: List[str]) -> None'),
    },
    concepts: ['Two Pointers', 'In-place', 'Strings'],
  },

  {
    id: 8,
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    topics: ['Strings', 'HashMap'],
    acceptanceRate: 63,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given two strings `s` and `t`, return `true` if `t` is an **anagram** of `s`, and `false` otherwise.\n\nAn **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    constraints: ['1 ≤ s.length, t.length ≤ 5 × 10⁴', 's and t consist of lowercase English letters.'],
    examples: [
      { id: 'e1', input: 's = "anagram", t = "nagaram"', expected: 'true', explanation: 'Same characters, different order.' },
      { id: 'e2', input: 's = "rat", t = "car"', expected: 'false', explanation: 'Different character sets.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '"a"|"a"', expected: 'true' },
      { id: 'h2', input: '"ab"|"ba"', expected: 'true' },
      { id: 'h3', input: '"ab"|"abc"', expected: 'false' },
      { id: 'h4', input: '"aacc"|"ccac"', expected: 'false' },
    ],
    starterCode: {
      java: javaStarter('public boolean isAnagram(String s, String t)'),
      python: pyStarter('def isAnagram(self, s: str, t: str) -> bool'),
    },
    concepts: ['HashMap', 'Frequency Count', 'Strings'],
  },

  {
    id: 9,
    title: 'First Unique Character in a String',
    slug: 'first-unique-character',
    difficulty: 'Easy',
    topics: ['Strings', 'HashMap'],
    acceptanceRate: 60,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.',
    constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of only lowercase English letters.'],
    examples: [
      { id: 'e1', input: 's = "leetcode"', expected: '0', explanation: '"l" at index 0 is the first unique character.' },
      { id: 'e2', input: 's = "loveleetcode"', expected: '2', explanation: '"v" at index 2 is the first unique character.' },
      { id: 'e3', input: 's = "aabb"', expected: '-1', explanation: 'No unique character.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '"z"', expected: '0' },
      { id: 'h2', input: '"aa"', expected: '-1' },
      { id: 'h3', input: '"abcabc"', expected: '-1' },
      { id: 'h4', input: '"abcdef"', expected: '0' },
    ],
    starterCode: {
      java: javaStarter('public int firstUniqChar(String s)'),
      python: pyStarter('def firstUniqChar(self, s: str) -> int'),
    },
    concepts: ['HashMap', 'Strings', 'Frequency Count'],
  },

  {
    id: 10,
    title: 'Longest Common Prefix',
    slug: 'longest-common-prefix',
    difficulty: 'Easy',
    topics: ['Strings'],
    acceptanceRate: 42,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string `""`.',
    constraints: ['1 ≤ strs.length ≤ 200', '0 ≤ strs[i].length ≤ 200', 'strs[i] consists of only lowercase English letters.'],
    examples: [
      { id: 'e1', input: 'strs = ["flower","flow","flight"]', expected: '"fl"', explanation: '"fl" is common to all.' },
      { id: 'e2', input: 'strs = ["dog","racecar","car"]', expected: '""', explanation: 'No common prefix.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '["a"]', expected: '"a"' },
      { id: 'h2', input: '["","b"]', expected: '""' },
      { id: 'h3', input: '["abc","abc"]', expected: '"abc"' },
      { id: 'h4', input: '["ab","a"]', expected: '"a"' },
    ],
    starterCode: {
      java: javaStarter('public String longestCommonPrefix(String[] strs)'),
      python: pyStarter('def longestCommonPrefix(self, strs: List[str]) -> str'),
    },
    concepts: ['Strings', 'Vertical Scanning'],
  },

  {
    id: 11,
    title: 'Single Number',
    slug: 'single-number',
    difficulty: 'Easy',
    topics: ['Arrays', 'Math'],
    acceptanceRate: 71,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given a **non-empty** array of integers `nums`, every element appears *twice* except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.',
    constraints: ['1 ≤ nums.length ≤ 3 × 10⁴', '-3 × 10⁴ ≤ nums[i] ≤ 3 × 10⁴', 'Each element in the array appears twice except for one element.'],
    examples: [
      { id: 'e1', input: 'nums = [2,2,1]', expected: '1', explanation: '1 appears once.' },
      { id: 'e2', input: 'nums = [4,1,2,1,2]', expected: '4', explanation: '4 appears once.' },
      { id: 'e3', input: 'nums = [1]', expected: '1', explanation: 'Single element.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[0,0,5]', expected: '5' },
      { id: 'h2', input: '[7,3,7,3,1]', expected: '1' },
      { id: 'h3', input: '[-1,-1,5]', expected: '5' },
    ],
    starterCode: {
      java: javaStarter('public int singleNumber(int[] nums)'),
      python: pyStarter('def singleNumber(self, nums: List[int]) -> int'),
    },
    concepts: ['XOR', 'Bit Manipulation', 'Math'],
  },

  {
    id: 12,
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'Easy',
    topics: ['Dynamic Programming', 'Recursion', 'Math'],
    acceptanceRate: 52,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
    constraints: ['1 ≤ n ≤ 45'],
    examples: [
      { id: 'e1', input: 'n = 2', expected: '2', explanation: '(1+1) or (2).' },
      { id: 'e2', input: 'n = 3', expected: '3', explanation: '(1+1+1), (1+2), (2+1).' },
    ],
    hiddenTests: [
      { id: 'h1', input: '1', expected: '1' },
      { id: 'h2', input: '4', expected: '5' },
      { id: 'h3', input: '10', expected: '89' },
      { id: 'h4', input: '45', expected: '1836311903' },
    ],
    starterCode: {
      java: javaStarter('public int climbStairs(int n)'),
      python: pyStarter('def climbStairs(self, n: int) -> int'),
    },
    concepts: ['Dynamic Programming', 'Fibonacci', 'Memoization'],
  },

  {
    id: 13,
    title: 'Merge Sorted Array',
    slug: 'merge-sorted-array',
    difficulty: 'Easy',
    topics: ['Arrays', 'Two Pointers', 'Sorting'],
    acceptanceRate: 47,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing** order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\n\nMerge `nums1` and `nums2` into a single array sorted in **non-decreasing** order.\n\nThe final sorted array should not be returned by the function, but instead be **stored inside** the array `nums1`. To accommodate this, `nums1` has a length of `m + n`.',
    constraints: ['nums1.length == m + n', 'nums2.length == n', '0 ≤ m, n ≤ 200', '1 ≤ m + n ≤ 200', '-10⁹ ≤ nums1[i], nums2[j] ≤ 10⁹'],
    examples: [
      { id: 'e1', input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', expected: '[1,2,2,3,5,6]', explanation: 'Merged from the end.' },
      { id: 'e2', input: 'nums1 = [1], m = 1, nums2 = [], n = 0', expected: '[1]', explanation: 'Only nums1.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[0]|0|[1]|1', expected: '[1]' },
      { id: 'h2', input: '[2,0]|1|[1]|1', expected: '[1,2]' },
      { id: 'h3', input: '[1,2,4,0,0,0]|3|[3,5,6]|3', expected: '[1,2,3,4,5,6]' },
    ],
    starterCode: {
      java: javaStarter('public void merge(int[] nums1, int m, int[] nums2, int n)'),
      python: pyStarter('def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None'),
    },
    concepts: ['Two Pointers', 'Merge', 'Sorting', 'Arrays'],
  },

  {
    id: 14,
    title: 'Find Missing Number',
    slug: 'find-missing-number',
    difficulty: 'Easy',
    topics: ['Arrays', 'Math'],
    acceptanceRate: 62,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return *the only number in the range that is missing from the array*.',
    constraints: ['n == nums.length', '1 ≤ n ≤ 10⁴', '0 ≤ nums[i] ≤ n', 'All the numbers of nums are unique.'],
    examples: [
      { id: 'e1', input: 'nums = [3,0,1]', expected: '2', explanation: '2 is missing from [0,1,2,3].' },
      { id: 'e2', input: 'nums = [0,1]', expected: '2', explanation: '2 is missing from [0,1,2].' },
      { id: 'e3', input: 'nums = [9,6,4,2,3,5,7,0,1]', expected: '8', explanation: '8 is missing.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[0]', expected: '1' },
      { id: 'h2', input: '[1]', expected: '0' },
      { id: 'h3', input: '[1,2,3]', expected: '0' },
      { id: 'h4', input: '[0,1,2,3]', expected: '4' },
    ],
    starterCode: {
      java: javaStarter('public int missingNumber(int[] nums)'),
      python: pyStarter('def missingNumber(self, nums: List[int]) -> int'),
    },
    concepts: ['Math', 'Sum Formula', 'XOR'],
  },

  {
    id: 15,
    title: 'Count Elements with Equal Divisors',
    slug: 'count-equal-divisors',
    difficulty: 'Easy',
    topics: ['Arrays', 'Math'],
    acceptanceRate: 55,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given a positive integer array `nums` and a positive integer `k`, return the number of pairs `(i, j)` where `i < j`, such that `nums[i] * nums[j]` is divisible by `k`.',
    constraints: ['1 ≤ nums.length ≤ 100', '1 ≤ nums[i], k ≤ 100'],
    examples: [
      { id: 'e1', input: 'nums = [1,2,3,4,5], k = 2', expected: '7', explanation: '7 pairs whose product is divisible by 2.' },
      { id: 'e2', input: 'nums = [1,2,3,4], k = 5', expected: '0', explanation: 'No product divisible by 5.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[2,4,6]|3', expected: '3' },
      { id: 'h2', input: '[1,1,1]|1', expected: '3' },
      { id: 'h3', input: '[5,10,15]|5', expected: '3' },
    ],
    starterCode: {
      java: javaStarter('public int countPairs(int[] nums, int k)'),
      python: pyStarter('def countPairs(self, nums: List[int], k: int) -> int'),
    },
    concepts: ['Arrays', 'Brute Force', 'Math', 'Divisibility'],
  },

  {
    id: 16,
    title: 'Maximum Average Subarray I',
    slug: 'maximum-average-subarray',
    difficulty: 'Easy',
    topics: ['Arrays', 'Sliding Window'],
    acceptanceRate: 44,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'You are given an integer array `nums` consisting of `n` elements, and an integer `k`.\n\nFind a contiguous subarray whose **length is equal to** `k` that has the maximum average value and return *this value*. Any answer with a calculation error less than 10⁻⁵ will be accepted.',
    constraints: ['n == nums.length', '1 ≤ k ≤ n ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    examples: [
      { id: 'e1', input: 'nums = [1,12,-5,-6,50,3], k = 4', expected: '12.75000', explanation: 'Max average is (12-5-6+50)/4 = 12.75.' },
      { id: 'e2', input: 'nums = [5], k = 1', expected: '5.00000', explanation: 'Single element.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1,2,3,4,5]|3', expected: '4.00000' },
      { id: 'h2', input: '[-1,-2,-3]|2', expected: '-1.50000' },
      { id: 'h3', input: '[0,4,0,3,2]|1', expected: '4.00000' },
    ],
    starterCode: {
      java: javaStarter('public double findMaxAverage(int[] nums, int k)'),
      python: pyStarter('def findMaxAverage(self, nums: List[int], k: int) -> float'),
    },
    concepts: ['Sliding Window', 'Arrays', 'Fixed Window'],
  },

  {
    id: 17,
    title: 'Intersection of Two Arrays',
    slug: 'intersection-two-arrays',
    difficulty: 'Easy',
    topics: ['Arrays', 'HashMap'],
    acceptanceRate: 68,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in **any order**.',
    constraints: ['1 ≤ nums1.length, nums2.length ≤ 1000', '0 ≤ nums1[i], nums2[i] ≤ 1000'],
    examples: [
      { id: 'e1', input: 'nums1 = [1,2,2,1], nums2 = [2,2]', expected: '[2,2]', explanation: '2 appears twice in both.' },
      { id: 'e2', input: 'nums1 = [4,9,5], nums2 = [9,4,9,8,4]', expected: '[4,9]', explanation: '4 and 9 are in both.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1]|[1]', expected: '[1]' },
      { id: 'h2', input: '[1]|[2]', expected: '[]' },
      { id: 'h3', input: '[1,2,3]|[4,5,6]', expected: '[]' },
    ],
    starterCode: {
      java: javaStarter('public int[] intersect(int[] nums1, int[] nums2)'),
      python: pyStarter('def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]'),
    },
    concepts: ['HashMap', 'Frequency Count'],
  },

  {
    id: 18,
    title: 'Majority Element',
    slug: 'majority-element',
    difficulty: 'Easy',
    topics: ['Arrays'],
    acceptanceRate: 64,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given an array `nums` of size `n`, return the majority element.\n\nThe majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.',
    constraints: ['n == nums.length', '1 ≤ n ≤ 5 × 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹'],
    examples: [
      { id: 'e1', input: 'nums = [3,2,3]', expected: '3', explanation: '3 appears 2 times out of 3.' },
      { id: 'e2', input: 'nums = [2,2,1,1,1,2,2]', expected: '2', explanation: '2 appears 4 times out of 7.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1]', expected: '1' },
      { id: 'h2', input: '[1,1]', expected: '1' },
      { id: 'h3', input: '[5,5,5,3,3]', expected: '5' },
    ],
    starterCode: {
      java: javaStarter('public int majorityElement(int[] nums)'),
      python: pyStarter('def majorityElement(self, nums: List[int]) -> int'),
    },
    concepts: ["Boyer-Moore Voting", 'HashMap', 'Arrays'],
  },

  {
    id: 19,
    title: 'Roman to Integer',
    slug: 'roman-to-integer',
    difficulty: 'Easy',
    topics: ['Strings', 'HashMap'],
    acceptanceRate: 59,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given a roman numeral, convert it to an integer.\n\nRoman numerals are represented by seven different symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.\n\nFor example, 2 is written as II (two ones). 12 is written as XII (simply X + II). 27 is written as XXVII (XX + V + II).',
    constraints: ['1 ≤ s.length ≤ 15', 's contains only the characters (I, V, X, L, C, D, M).', 'The input is guaranteed to be a valid roman numeral in the range [1, 3999].'],
    examples: [
      { id: 'e1', input: 's = "III"', expected: '3', explanation: 'III = 1+1+1 = 3.' },
      { id: 'e2', input: 's = "LVIII"', expected: '58', explanation: 'L=50, V=5, III=3.' },
      { id: 'e3', input: 's = "MCMXCIV"', expected: '1994', explanation: 'M=1000, CM=900, XC=90, IV=4.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '"IV"', expected: '4' },
      { id: 'h2', input: '"IX"', expected: '9' },
      { id: 'h3', input: '"XL"', expected: '40' },
      { id: 'h4', input: '"MMMCMXCIX"', expected: '3999' },
    ],
    starterCode: {
      java: javaStarter('public int romanToInt(String s)'),
      python: pyStarter('def romanToInt(self, s: str) -> int'),
    },
    concepts: ['HashMap', 'Strings', 'Simulation'],
  },

  {
    id: 20,
    title: 'Pascal\'s Triangle',
    slug: 'pascals-triangle',
    difficulty: 'Easy',
    topics: ['Arrays', 'Dynamic Programming'],
    acceptanceRate: 67,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given an integer `numRows`, return the first `numRows` of **Pascal\'s triangle**.\n\nIn Pascal\'s triangle, each number is the sum of the two numbers directly above it.',
    constraints: ['1 ≤ numRows ≤ 30'],
    examples: [
      { id: 'e1', input: 'numRows = 5', expected: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]', explanation: 'First 5 rows of Pascal\'s triangle.' },
      { id: 'e2', input: 'numRows = 1', expected: '[[1]]', explanation: 'First row only.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '2', expected: '[[1],[1,1]]' },
      { id: 'h2', input: '3', expected: '[[1],[1,1],[1,2,1]]' },
      { id: 'h3', input: '6', expected: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1]]' },
    ],
    starterCode: {
      java: javaStarter('public List<List<Integer>> generate(int numRows)'),
      python: pyStarter('def generate(self, numRows: int) -> List[List[int]]'),
    },
    concepts: ['Dynamic Programming', '2D Arrays', 'Recursion'],
  },

  // ============================================================
  // MEDIUM (21-40)
  // ============================================================
  {
    id: 21,
    title: '3Sum',
    slug: 'three-sum',
    difficulty: 'Medium',
    topics: ['Arrays', 'Two Pointers', 'Sorting'],
    acceptanceRate: 33,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must **not contain duplicate triplets**.',
    constraints: ['3 ≤ nums.length ≤ 3000', '-10⁵ ≤ nums[i] ≤ 10⁵'],
    examples: [
      { id: 'e1', input: 'nums = [-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]', explanation: 'Two unique triplets sum to 0.' },
      { id: 'e2', input: 'nums = [0,1,1]', expected: '[]', explanation: 'No triplet sums to 0.' },
      { id: 'e3', input: 'nums = [0,0,0]', expected: '[[0,0,0]]', explanation: 'Three zeros.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[-2,0,0,2,2]', expected: '[[-2,0,2]]' },
      { id: 'h2', input: '[1,2,-2,-1]', expected: '[]' },
      { id: 'h3', input: '[0,0,0,0]', expected: '[[0,0,0]]' },
    ],
    starterCode: {
      java: javaStarter('public List<List<Integer>> threeSum(int[] nums)'),
      python: pyStarter('def threeSum(self, nums: List[int]) -> List[List[int]]'),
    },
    concepts: ['Two Pointers', 'Sorting', 'Deduplication'],
  },

  {
    id: 22,
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-no-repeat',
    difficulty: 'Medium',
    topics: ['Strings', 'Sliding Window', 'HashMap'],
    acceptanceRate: 33,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given a string `s`, find the length of the **longest substring** without repeating characters.',
    constraints: ['0 ≤ s.length ≤ 5 × 10⁴', 's consists of English letters, digits, symbols, and spaces.'],
    examples: [
      { id: 'e1', input: 's = "abcabcbb"', expected: '3', explanation: '"abc" has length 3.' },
      { id: 'e2', input: 's = "bbbbb"', expected: '1', explanation: '"b" has length 1.' },
      { id: 'e3', input: 's = "pwwkew"', expected: '3', explanation: '"wke" has length 3.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '""', expected: '0' },
      { id: 'h2', input: '" "', expected: '1' },
      { id: 'h3', input: '"dvdf"', expected: '3' },
      { id: 'h4', input: '"abba"', expected: '2' },
    ],
    starterCode: {
      java: javaStarter('public int lengthOfLongestSubstring(String s)'),
      python: pyStarter('def lengthOfLongestSubstring(self, s: str) -> int'),
    },
    concepts: ['Sliding Window', 'HashMap', 'Strings'],
  },

  {
    id: 23,
    title: 'Group Anagrams',
    slug: 'group-anagrams',
    difficulty: 'Medium',
    topics: ['Strings', 'HashMap', 'Sorting'],
    acceptanceRate: 67,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given an array of strings `strs`, group **the anagrams** together. You can return the answer in **any order**.\n\nAn **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.',
    constraints: ['1 ≤ strs.length ≤ 10⁴', '0 ≤ strs[i].length ≤ 100', 'strs[i] consists of lowercase English letters.'],
    examples: [
      { id: 'e1', input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: 'Three groups of anagrams.' },
      { id: 'e2', input: 'strs = [""]', expected: '[[""]]', explanation: 'Single empty string.' },
      { id: 'e3', input: 'strs = ["a"]', expected: '[["a"]]', explanation: 'Single character.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '["ab","ba"]', expected: '[["ab","ba"]]' },
      { id: 'h2', input: '["abc","def"]', expected: '[["abc"],["def"]]' },
      { id: 'h3', input: '["",""]', expected: '[["",""]]' },
    ],
    starterCode: {
      java: javaStarter('public List<List<String>> groupAnagrams(String[] strs)'),
      python: pyStarter('def groupAnagrams(self, strs: List[str]) -> List[List[str]]'),
    },
    concepts: ['HashMap', 'Sorting', 'Strings'],
  },

  {
    id: 24,
    title: 'Container With Most Water',
    slug: 'container-most-water',
    difficulty: 'Medium',
    topics: ['Arrays', 'Two Pointers', 'Greedy'],
    acceptanceRate: 54,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the i-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn *the maximum amount of water a container can store*.',
    constraints: ['n == height.length', '2 ≤ n ≤ 10⁵', '0 ≤ height[i] ≤ 10⁴'],
    examples: [
      { id: 'e1', input: 'height = [1,8,6,2,5,4,8,3,7]', expected: '49', explanation: 'Lines at index 1 and 8: min(8,7)*7=49.' },
      { id: 'e2', input: 'height = [1,1]', expected: '1', explanation: 'min(1,1)*1=1.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[4,3,2,1,4]', expected: '16' },
      { id: 'h2', input: '[1,2,1]', expected: '2' },
      { id: 'h3', input: '[2,3,4,5,18,17,6]', expected: '17' },
    ],
    starterCode: {
      java: javaStarter('public int maxArea(int[] height)'),
      python: pyStarter('def maxArea(self, height: List[int]) -> int'),
    },
    concepts: ['Two Pointers', 'Greedy'],
  },

  {
    id: 25,
    title: 'Add Two Numbers (Linked List)',
    slug: 'add-two-numbers-linked-list',
    difficulty: 'Medium',
    topics: ['Linked List', 'Math'],
    acceptanceRate: 41,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.',
    constraints: ['The number of nodes in each linked list is in the range [1, 100].', '0 ≤ Node.val ≤ 9', 'It is guaranteed that the list represents a number that does not have leading zeros.'],
    examples: [
      { id: 'e1', input: 'l1 = [2,4,3], l2 = [5,6,4]', expected: '[7,0,8]', explanation: '342 + 465 = 807.' },
      { id: 'e2', input: 'l1 = [0], l2 = [0]', expected: '[0]', explanation: '0 + 0 = 0.' },
      { id: 'e3', input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]', expected: '[8,9,9,9,0,0,0,1]', explanation: 'Carry propagates.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1]|[9,9]', expected: '[0,0,1]' },
      { id: 'h2', input: '[5]|[5]', expected: '[0,1]' },
      { id: 'h3', input: '[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]|[5,6,4]', expected: '' },
    ],
    starterCode: {
      java: `class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n\nclass Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        // Write your code here\n    }\n}`,
      python: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:\n        # Write your code here\n        pass`,
    },
    concepts: ['Linked List', 'Carry Propagation', 'Math'],
  },

  {
    id: 26,
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Medium',
    topics: ['Stack', 'Strings'],
    acceptanceRate: 40,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given a string `s` containing just the characters `\'(\'`, `\')\'`, `\'{\'`, `\'}\'`, `\'[\'` and `\']\'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    constraints: ['1 ≤ s.length ≤ 10⁴', 's consists of parentheses only \'()[]{}\'.'],
    examples: [
      { id: 'e1', input: 's = "()"', expected: 'true', explanation: 'Valid pair.' },
      { id: 'e2', input: 's = "()[]{}"', expected: 'true', explanation: 'All pairs match.' },
      { id: 'e3', input: 's = "(]"', expected: 'false', explanation: 'Mismatched brackets.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '"([)]"', expected: 'false' },
      { id: 'h2', input: '"{[]}"', expected: 'true' },
      { id: 'h3', input: '"["', expected: 'false' },
      { id: 'h4', input: '""', expected: 'true' },
    ],
    starterCode: {
      java: javaStarter('public boolean isValid(String s)'),
      python: pyStarter('def isValid(self, s: str) -> bool'),
    },
    concepts: ['Stack', 'Strings', 'Matching'],
  },

  {
    id: 27,
    title: 'Min Stack',
    slug: 'min-stack',
    difficulty: 'Medium',
    topics: ['Stack'],
    acceptanceRate: 55,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class:\n- `MinStack()` initializes the stack object.\n- `void push(int val)` pushes the element `val` onto the stack.\n- `void pop()` removes the element on the top of the stack.\n- `int top()` gets the top element of the stack.\n- `int getMin()` retrieves the minimum element in the stack.',
    constraints: ['-2³¹ ≤ val ≤ 2³¹ - 1', 'Methods push, pop, top, and getMin operations will always be called on non-empty stacks.', 'At most 3 × 10⁴ calls will be made to push, pop, top, and getMin.'],
    examples: [
      { id: 'e1', input: 'MinStack(); push(-2); push(0); push(-3); getMin() → -3; pop(); top() → 0; getMin() → -2', expected: 'null null null null -3 null 0 -2', explanation: 'Tracks minimum correctly after each operation.' },
    ],
    hiddenTests: [
      { id: 'h1', input: 'push(1)|push(2)|getMin()', expected: '1' },
      { id: 'h2', input: 'push(5)|push(3)|pop()|getMin()', expected: '5' },
    ],
    starterCode: {
      java: `class MinStack {\n    public MinStack() {\n        // Initialize\n    }\n    public void push(int val) {\n        // Write code\n    }\n    public void pop() {\n        // Write code\n    }\n    public int top() {\n        // Write code\n        return 0;\n    }\n    public int getMin() {\n        // Write code\n        return 0;\n    }\n}`,
      python: `class MinStack:\n    def __init__(self):\n        pass\n    def push(self, val: int) -> None:\n        pass\n    def pop(self) -> None:\n        pass\n    def top(self) -> int:\n        return 0\n    def getMin(self) -> int:\n        return 0`,
    },
    concepts: ['Stack', 'Auxiliary Stack', 'Design'],
  },

  {
    id: 28,
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Medium',
    topics: ['Arrays', 'Binary Search'],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description:
      'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.',
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁴ < nums[i], target < 10⁴', 'All the integers in nums are unique.', 'nums is sorted in ascending order.'],
    examples: [
      { id: 'e1', input: 'nums = [-1,0,3,5,9,12], target = 9', expected: '4', explanation: '9 is at index 4.' },
      { id: 'e2', input: 'nums = [-1,0,3,5,9,12], target = 2', expected: '-1', explanation: '2 does not exist.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[5]|5', expected: '0' },
      { id: 'h2', input: '[1,3,5]|3', expected: '1' },
      { id: 'h3', input: '[1,3,5]|2', expected: '-1' },
      { id: 'h4', input: '[1]|2', expected: '-1' },
    ],
    starterCode: {
      java: javaStarter('public int search(int[] nums, int target)'),
      python: pyStarter('def search(self, nums: List[int], target: int) -> int'),
    },
    concepts: ['Binary Search', 'Divide and Conquer'],
  },

  {
    id: 29,
    title: 'Search in Rotated Sorted Array',
    slug: 'search-rotated-sorted-array',
    difficulty: 'Medium',
    topics: ['Arrays', 'Binary Search'],
    acceptanceRate: 39,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'There is an integer array `nums` sorted in ascending order (with **distinct** values).\n\nPrior to being passed to your function, `nums` is **possibly rotated** at an unknown pivot index.\n\nGiven the array `nums` after the possible rotation and an integer `target`, return *the index of* `target` *if it is in* `nums`*, or* `-1` *if it is not in* `nums`.',
    constraints: ['1 ≤ nums.length ≤ 5000', '-10⁴ ≤ nums[i] ≤ 10⁴', 'All values of nums are unique.', 'nums is an ascending array that is possibly rotated.', '-10⁴ ≤ target ≤ 10⁴'],
    examples: [
      { id: 'e1', input: 'nums = [4,5,6,7,0,1,2], target = 0', expected: '4', explanation: '0 is at index 4.' },
      { id: 'e2', input: 'nums = [4,5,6,7,0,1,2], target = 3', expected: '-1', explanation: '3 does not exist.' },
      { id: 'e3', input: 'nums = [1], target = 0', expected: '-1', explanation: '0 not in array.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[3,1]|1', expected: '1' },
      { id: 'h2', input: '[5,1,3]|5', expected: '0' },
      { id: 'h3', input: '[1,3,5]|2', expected: '-1' },
    ],
    starterCode: {
      java: javaStarter('public int search(int[] nums, int target)'),
      python: pyStarter('def search(self, nums: List[int], target: int) -> int'),
    },
    concepts: ['Binary Search', 'Rotated Array'],
  },

  {
    id: 30,
    title: 'Kth Largest Element in an Array',
    slug: 'kth-largest-element',
    difficulty: 'Medium',
    topics: ['Arrays', 'Heap', 'Sorting'],
    acceptanceRate: 67,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given an integer array `nums` and an integer `k`, return the `kth` largest element in the array.\n\nNote that it is the `kth` largest element in the sorted order, not the `kth` distinct element.\n\nCan you solve it without sorting?',
    constraints: ['1 ≤ k ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    examples: [
      { id: 'e1', input: 'nums = [3,2,1,5,6,4], k = 2', expected: '5', explanation: 'Sorted descending: [6,5,4,3,2,1], 2nd is 5.' },
      { id: 'e2', input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', expected: '4', explanation: 'Sorted descending: [6,5,5,4,...], 4th is 4.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1]|1', expected: '1' },
      { id: 'h2', input: '[2,1]|1', expected: '2' },
      { id: 'h3', input: '[-1,-2,-3]|2', expected: '-2' },
    ],
    starterCode: {
      java: javaStarter('public int findKthLargest(int[] nums, int k)'),
      python: pyStarter('def findKthLargest(self, nums: List[int], k: int) -> int'),
    },
    concepts: ['Heap', 'QuickSelect', 'Sorting'],
  },

  {
    id: 31,
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'Medium',
    topics: ['Graphs', 'BFS', 'DFS'],
    acceptanceRate: 58,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given an `m x n` 2D binary grid `grid` which represents a map of `\'1\'`s (land) and `\'0\'`s (water), return *the number of islands*.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.',
    constraints: ['m == grid.length', 'n == grid[i].length', '1 ≤ m, n ≤ 300', 'grid[i][j] is \'0\' or \'1\'.'],
    examples: [
      { id: 'e1', input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: '1', explanation: 'One big connected island.' },
      { id: 'e2', input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected: '3', explanation: 'Three separate islands.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[["1"]]', expected: '1' },
      { id: 'h2', input: '[["0"]]', expected: '0' },
      { id: 'h3', input: '[["1","0"],["0","1"]]', expected: '2' },
    ],
    starterCode: {
      java: javaStarter('public int numIslands(char[][] grid)'),
      python: pyStarter('def numIslands(self, grid: List[List[str]]) -> int'),
    },
    concepts: ['DFS', 'BFS', 'Graph Traversal', 'Connected Components'],
  },

  {
    id: 32,
    title: 'Lowest Common Ancestor of a BST',
    slug: 'lca-bst',
    difficulty: 'Medium',
    topics: ['Trees', 'BST'],
    acceptanceRate: 63,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nThe LCA of two nodes `p` and `q` in a BST is the lowest node in the tree that has both `p` and `q` as descendants (where a node can be a descendant of itself).',
    constraints: ['The number of nodes in the tree is in the range [2, 10⁵].', '-10⁹ ≤ Node.val ≤ 10⁹', 'All Node.val are unique.'],
    examples: [
      { id: 'e1', input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', expected: '6', explanation: 'LCA of 2 and 8 is 6.' },
      { id: 'e2', input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', expected: '2', explanation: 'LCA of 2 and 4 is 2 itself.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[2,1]|p=2|q=1', expected: '2' },
      { id: 'h2', input: '[4,2,6,1,3]|p=1|q=3', expected: '2' },
    ],
    starterCode: {
      java: `class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int val) { this.val = val; }\n}\n\nclass Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        // Write your code here\n        return null;\n    }\n}`,
      python: `class TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.left = None\n        self.right = None\n\nclass Solution:\n    def lowestCommonAncestor(self, root, p, q):\n        # Write your code here\n        pass`,
    },
    concepts: ['BST', 'Tree Traversal', 'Recursion'],
  },

  {
    id: 33,
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order',
    difficulty: 'Medium',
    topics: ['Trees', 'BFS'],
    acceptanceRate: 66,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given the `root` of a binary tree, return *the level order traversal of its nodes\' values* (i.e., from left to right, level by level).',
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 ≤ Node.val ≤ 1000'],
    examples: [
      { id: 'e1', input: 'root = [3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]', explanation: 'Three levels of traversal.' },
      { id: 'e2', input: 'root = [1]', expected: '[[1]]', explanation: 'Single node.' },
      { id: 'e3', input: 'root = []', expected: '[]', explanation: 'Empty tree.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1,2,3]', expected: '[[1],[2,3]]' },
      { id: 'h2', input: '[1,null,2,null,3]', expected: '[[1],[2],[3]]' },
    ],
    starterCode: {
      java: `class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int val) { this.val = val; }\n}\n\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}`,
      python: `class TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.left = None\n        self.right = None\n\nclass Solution:\n    def levelOrder(self, root) -> List[List[int]]:\n        # Write your code here\n        pass`,
    },
    concepts: ['BFS', 'Queue', 'Tree Traversal'],
  },

  {
    id: 34,
    title: 'Coin Change',
    slug: 'coin-change',
    difficulty: 'Medium',
    topics: ['Dynamic Programming'],
    acceptanceRate: 43,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.',
    constraints: ['1 ≤ coins.length ≤ 12', '1 ≤ coins[i] ≤ 2³¹ - 1', '0 ≤ amount ≤ 10⁴'],
    examples: [
      { id: 'e1', input: 'coins = [1,2,5], amount = 11', expected: '3', explanation: '5 + 5 + 1 = 11.' },
      { id: 'e2', input: 'coins = [2], amount = 3', expected: '-1', explanation: 'Cannot make 3 with only 2s.' },
      { id: 'e3', input: 'coins = [1], amount = 0', expected: '0', explanation: 'Amount is 0.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1,5,10,25]|36', expected: '3' },
      { id: 'h2', input: '[2]|1', expected: '-1' },
      { id: 'h3', input: '[186,419,83,408]|6249', expected: '20' },
    ],
    starterCode: {
      java: javaStarter('public int coinChange(int[] coins, int amount)'),
      python: pyStarter('def coinChange(self, coins: List[int], amount: int) -> int'),
    },
    concepts: ['Dynamic Programming', 'Bottom-Up DP', 'BFS'],
  },

  {
    id: 35,
    title: 'Product of Array Except Self',
    slug: 'product-except-self',
    difficulty: 'Medium',
    topics: ['Arrays'],
    acceptanceRate: 65,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.',
    constraints: ['2 ≤ nums.length ≤ 10⁵', '-30 ≤ nums[i] ≤ 30', 'The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.'],
    examples: [
      { id: 'e1', input: 'nums = [1,2,3,4]', expected: '[24,12,8,6]', explanation: 'Each element is product of all others.' },
      { id: 'e2', input: 'nums = [-1,1,0,-3,3]', expected: '[0,0,9,0,0]', explanation: 'Zero makes most products zero.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[2,3]', expected: '[3,2]' },
      { id: 'h2', input: '[0,0]', expected: '[0,0]' },
      { id: 'h3', input: '[1,1,1,1]', expected: '[1,1,1,1]' },
    ],
    starterCode: {
      java: javaStarter('public int[] productExceptSelf(int[] nums)'),
      python: pyStarter('def productExceptSelf(self, nums: List[int]) -> List[int]'),
    },
    concepts: ['Prefix Product', 'Suffix Product', 'Arrays'],
  },

  {
    id: 36,
    title: 'Maximum Depth of Binary Tree',
    slug: 'max-depth-binary-tree',
    difficulty: 'Medium',
    topics: ['Trees', 'DFS', 'BFS', 'Recursion'],
    acceptanceRate: 74,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given the `root` of a binary tree, return *its maximum depth*.\n\nA binary tree\'s **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    constraints: ['The number of nodes in the tree is in the range [0, 10⁴].', '-100 ≤ Node.val ≤ 100'],
    examples: [
      { id: 'e1', input: 'root = [3,9,20,null,null,15,7]', expected: '3', explanation: 'Longest path has 3 nodes.' },
      { id: 'e2', input: 'root = [1,null,2]', expected: '2', explanation: 'Depth is 2.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[]', expected: '0' },
      { id: 'h2', input: '[1]', expected: '1' },
      { id: 'h3', input: '[1,2,3,4]', expected: '3' },
    ],
    starterCode: {
      java: `class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int val) { this.val = val; }\n}\n\nclass Solution {\n    public int maxDepth(TreeNode root) {\n        // Write your code here\n        return 0;\n    }\n}`,
      python: `class TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.left = None\n        self.right = None\n\nclass Solution:\n    def maxDepth(self, root) -> int:\n        # Write your code here\n        pass`,
    },
    concepts: ['Recursion', 'DFS', 'Tree Traversal'],
  },

  {
    id: 37,
    title: 'Subarray Sum Equals K',
    slug: 'subarray-sum-k',
    difficulty: 'Medium',
    topics: ['Arrays', 'HashMap'],
    acceptanceRate: 44,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.\n\nA subarray is a contiguous **non-empty** sequence of elements within an array.',
    constraints: ['1 ≤ nums.length ≤ 2 × 10⁴', '-1000 ≤ nums[i] ≤ 1000', '-10⁷ ≤ k ≤ 10⁷'],
    examples: [
      { id: 'e1', input: 'nums = [1,1,1], k = 2', expected: '2', explanation: '[1,1] at positions 0-1 and 1-2.' },
      { id: 'e2', input: 'nums = [1,2,3], k = 3', expected: '2', explanation: '[3] and [1,2].' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1]|1', expected: '1' },
      { id: 'h2', input: '[-1,-1,1]|0', expected: '1' },
      { id: 'h3', input: '[0,0,0]|0', expected: '6' },
    ],
    starterCode: {
      java: javaStarter('public int subarraySum(int[] nums, int k)'),
      python: pyStarter('def subarraySum(self, nums: List[int], k: int) -> int'),
    },
    concepts: ['HashMap', 'Prefix Sum', 'Arrays'],
  },

  {
    id: 38,
    title: 'Top K Frequent Elements',
    slug: 'top-k-frequent-elements',
    difficulty: 'Medium',
    topics: ['Arrays', 'HashMap', 'Heap'],
    acceptanceRate: 66,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in **any order**.\n\nYou must implement a solution with a time complexity better than `O(n log n)`.',
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴', 'k is in the range [1, the number of unique elements in the array].'],
    examples: [
      { id: 'e1', input: 'nums = [1,1,1,2,2,3], k = 2', expected: '[1,2]', explanation: '1 appears 3 times, 2 appears 2 times.' },
      { id: 'e2', input: 'nums = [1], k = 1', expected: '[1]', explanation: 'Single element.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1,2,2,3,3,3]|2', expected: '[3,2]' },
      { id: 'h2', input: '[4,4,4,4,1,1]|1', expected: '[4]' },
    ],
    starterCode: {
      java: javaStarter('public int[] topKFrequent(int[] nums, int k)'),
      python: pyStarter('def topKFrequent(self, nums: List[int], k: int) -> List[int]'),
    },
    concepts: ['Heap', 'Bucket Sort', 'HashMap'],
  },

  {
    id: 39,
    title: 'Spiral Matrix',
    slug: 'spiral-matrix',
    difficulty: 'Medium',
    topics: ['Arrays'],
    acceptanceRate: 47,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      'Given an `m x n` `matrix`, return *all elements of the* `matrix` *in spiral order*.',
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 ≤ m, n ≤ 10', '-100 ≤ matrix[i][j] ≤ 100'],
    examples: [
      { id: 'e1', input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', expected: '[1,2,3,6,9,8,7,4,5]', explanation: 'Traverse in spiral order.' },
      { id: 'e2', input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]', expected: '[1,2,3,4,8,12,11,10,9,5,6,7]', explanation: 'Spiral through non-square matrix.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[[1]]', expected: '[1]' },
      { id: 'h2', input: '[[1,2],[3,4]]', expected: '[1,2,4,3]' },
    ],
    starterCode: {
      java: javaStarter('public List<Integer> spiralOrder(int[][] matrix)'),
      python: pyStarter('def spiralOrder(self, matrix: List[List[int]]) -> List[int]'),
    },
    concepts: ['Matrix', 'Simulation', 'Boundaries'],
  },

  {
    id: 40,
    title: 'Decode Ways',
    slug: 'decode-ways',
    difficulty: 'Medium',
    topics: ['Strings', 'Dynamic Programming'],
    acceptanceRate: 34,
    timeLimit: 2000,
    memoryLimit: 256,
    description:
      "A message containing letters from `A-Z` can be **encoded** into numbers using the mapping: `'A' → \"1\"`, `'B' → \"2\"`, ..., `'Z' → \"26\"`.\n\nGiven a string `s` containing only digits, return the **number of ways** to **decode** it.\n\nThe test cases are generated so that the answer fits in a **32-bit** integer.",
    constraints: ['1 ≤ s.length ≤ 100', 's contains only digits and may contain leading zeros.'],
    examples: [
      { id: 'e1', input: 's = "12"', expected: '2', explanation: '"12" can be "AB" (1+2) or "L" (12).' },
      { id: 'e2', input: 's = "226"', expected: '3', explanation: '"226" → "BZ"(2+26), "VF"(22+6), "BBF"(2+2+6).' },
      { id: 'e3', input: 's = "06"', expected: '0', explanation: '"06" has leading 0, invalid.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '"1"', expected: '1' },
      { id: 'h2', input: '"10"', expected: '1' },
      { id: 'h3', input: '"11106"', expected: '2' },
      { id: 'h4', input: '"0"', expected: '0' },
    ],
    starterCode: {
      java: javaStarter('public int numDecodings(String s)'),
      python: pyStarter('def numDecodings(self, s: str) -> int'),
    },
    concepts: ['Dynamic Programming', '1D DP', 'Strings'],
  },

  // ============================================================
  // HARD (41-50)
  // ============================================================
  {
    id: 41,
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    difficulty: 'Hard',
    topics: ['Arrays', 'Two Pointers', 'Stack', 'Dynamic Programming'],
    acceptanceRate: 60,
    timeLimit: 3000,
    memoryLimit: 256,
    description:
      'Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.',
    constraints: ['n == height.length', '1 ≤ n ≤ 2 × 10⁴', '0 ≤ height[i] ≤ 10⁵'],
    examples: [
      { id: 'e1', input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6', explanation: '6 units of water trapped.' },
      { id: 'e2', input: 'height = [4,2,0,3,2,5]', expected: '9', explanation: '9 units trapped.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1,0,1]', expected: '1' },
      { id: 'h2', input: '[3,0,2,0,4]', expected: '7' },
      { id: 'h3', input: '[0,1,0,2]', expected: '1' },
      { id: 'h4', input: '[1,2,3,4]', expected: '0' },
    ],
    starterCode: {
      java: javaStarter('public int trap(int[] height)'),
      python: pyStarter('def trap(self, height: List[int]) -> int'),
    },
    concepts: ['Two Pointers', 'Dynamic Programming', 'Stack'],
  },

  {
    id: 42,
    title: 'Longest Valid Parentheses',
    slug: 'longest-valid-parentheses',
    difficulty: 'Hard',
    topics: ['Strings', 'Stack', 'Dynamic Programming'],
    acceptanceRate: 33,
    timeLimit: 3000,
    memoryLimit: 256,
    description:
      'Given a string containing just the characters `\'(\'` and `\')\'`, return the length of the longest valid (well-formed) parentheses substring.',
    constraints: ['0 ≤ s.length ≤ 3 × 10⁴', 's[i] is \'(\' or \')\'.'],
    examples: [
      { id: 'e1', input: 's = "(()"', expected: '2', explanation: 'Longest valid is "()".' },
      { id: 'e2', input: 's = ")()())"', expected: '4', explanation: 'Longest valid is "()()".' },
      { id: 'e3', input: 's = ""', expected: '0', explanation: 'Empty string.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '"(())"', expected: '4' },
      { id: 'h2', input: '"())()(("', expected: '2' },
      { id: 'h3', input: '"()()"', expected: '4' },
    ],
    starterCode: {
      java: javaStarter('public int longestValidParentheses(String s)'),
      python: pyStarter('def longestValidParentheses(self, s: str) -> int'),
    },
    concepts: ['Stack', 'Dynamic Programming', 'Strings'],
  },

  {
    id: 43,
    title: 'N-Queens',
    slug: 'n-queens',
    difficulty: 'Hard',
    topics: ['Backtracking'],
    acceptanceRate: 70,
    timeLimit: 5000,
    memoryLimit: 256,
    description:
      'The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return *all distinct solutions to the **n-queens puzzle***.\n\nEach solution contains a distinct board configuration of the n-queens\' placement, where `\'Q\'` and `\'.\'` both indicate a queen and an empty space, respectively.',
    constraints: ['1 ≤ n ≤ 9'],
    examples: [
      { id: 'e1', input: 'n = 4', expected: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', explanation: 'Two valid configurations for n=4.' },
      { id: 'e2', input: 'n = 1', expected: '[["Q"]]', explanation: 'Trivial solution.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '2', expected: '[]' },
      { id: 'h2', input: '3', expected: '[]' },
      { id: 'h3', input: '5', expected: '10 solutions exist' },
    ],
    starterCode: {
      java: javaStarter('public List<List<String>> solveNQueens(int n)'),
      python: pyStarter('def solveNQueens(self, n: int) -> List[List[str]]'),
    },
    concepts: ['Backtracking', 'Constraint Satisfaction'],
  },

  {
    id: 44,
    title: 'Merge K Sorted Lists',
    slug: 'merge-k-sorted-lists',
    difficulty: 'Hard',
    topics: ['Linked List', 'Heap', 'Divide and Conquer'],
    acceptanceRate: 52,
    timeLimit: 3000,
    memoryLimit: 256,
    description:
      'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\n*Merge all the linked-lists into one sorted linked-list and return it.*',
    constraints: ['k == lists.length', '0 ≤ k ≤ 10⁴', '0 ≤ lists[i].length ≤ 500', '-10⁴ ≤ lists[i][j] ≤ 10⁴', 'lists[i] is sorted in ascending order.', 'The sum of lists[i].length will not exceed 10⁴.'],
    examples: [
      { id: 'e1', input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]', explanation: 'All three merged and sorted.' },
      { id: 'e2', input: 'lists = []', expected: '[]', explanation: 'Empty input.' },
      { id: 'e3', input: 'lists = [[]]', expected: '[]', explanation: 'Single empty list.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[[1,2,3],[4,5,6]]', expected: '[1,2,3,4,5,6]' },
      { id: 'h2', input: '[[1],[2],[3]]', expected: '[1,2,3]' },
    ],
    starterCode: {
      java: `class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n\nclass Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Write your code here\n        return null;\n    }\n}`,
      python: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def mergeKLists(self, lists):\n        # Write your code here\n        pass`,
    },
    concepts: ['Heap', 'Divide and Conquer', 'Linked List'],
  },

  {
    id: 45,
    title: 'Word Break',
    slug: 'word-break',
    difficulty: 'Hard',
    topics: ['Strings', 'Dynamic Programming'],
    acceptanceRate: 45,
    timeLimit: 3000,
    memoryLimit: 256,
    description:
      'Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.\n\n**Note** that the same word in the dictionary may be reused multiple times in the segmentation.',
    constraints: ['1 ≤ s.length ≤ 300', '1 ≤ wordDict.length ≤ 1000', '1 ≤ wordDict[i].length ≤ 20', 's and wordDict[i] consist of only lowercase English letters.', 'All the strings of wordDict are unique.'],
    examples: [
      { id: 'e1', input: 's = "leetcode", wordDict = ["leet","code"]', expected: 'true', explanation: '"leetcode" = "leet" + "code".' },
      { id: 'e2', input: 's = "applepenapple", wordDict = ["apple","pen"]', expected: 'true', explanation: '"apple"+"pen"+"apple".' },
      { id: 'e3', input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', expected: 'false', explanation: 'Cannot segment completely.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '"a"|["a"]', expected: 'true' },
      { id: 'h2', input: '"ab"|["a","b"]', expected: 'true' },
      { id: 'h3', input: '"aaaaaaa"|["aaa","aaaa"]', expected: 'false' },
    ],
    starterCode: {
      java: javaStarter('public boolean wordBreak(String s, List<String> wordDict)'),
      python: pyStarter('def wordBreak(self, s: str, wordDict: List[str]) -> bool'),
    },
    concepts: ['Dynamic Programming', 'BFS', 'Memoization'],
  },

  {
    id: 46,
    title: 'Course Schedule',
    slug: 'course-schedule',
    difficulty: 'Hard',
    topics: ['Graphs', 'BFS', 'DFS'],
    acceptanceRate: 46,
    timeLimit: 3000,
    memoryLimit: 256,
    description:
      'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.',
    constraints: ['1 ≤ numCourses ≤ 2000', '0 ≤ prerequisites.length ≤ 5000', 'prerequisites[i].length == 2', '0 ≤ ai, bi < numCourses', 'All the pairs prerequisites[i] are unique.'],
    examples: [
      { id: 'e1', input: 'numCourses = 2, prerequisites = [[1,0]]', expected: 'true', explanation: 'Take 0 then 1.' },
      { id: 'e2', input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', expected: 'false', explanation: 'Cycle: 0→1→0.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '1|[]', expected: 'true' },
      { id: 'h2', input: '3|[[1,0],[2,1],[0,2]]', expected: 'false' },
      { id: 'h3', input: '4|[[1,0],[2,0],[3,1],[3,2]]', expected: 'true' },
    ],
    starterCode: {
      java: javaStarter('public boolean canFinish(int numCourses, int[][] prerequisites)'),
      python: pyStarter('def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool'),
    },
    concepts: ['Topological Sort', 'Cycle Detection', 'DFS', 'BFS'],
  },

  {
    id: 47,
    title: 'Alien Dictionary',
    slug: 'alien-dictionary',
    difficulty: 'Hard',
    topics: ['Graphs', 'BFS', 'Strings'],
    acceptanceRate: 34,
    timeLimit: 3000,
    memoryLimit: 256,
    description:
      'There is a new alien language that uses the English alphabet. However, the order among letters is unknown to you.\n\nYou are given a list of strings `words` from the alien language\'s dictionary. The strings in words are **sorted lexicographically** by the rules of this new language.\n\nReturn *a string of the unique letters in the new alien language sorted in the order they appear in the dictionary*. If there is no solution, return `""`. If there are multiple valid solutions, return any of them.',
    constraints: ['1 ≤ words.length ≤ 100', '1 ≤ words[i].length ≤ 100', 'words[i] consists of only lowercase English letters.'],
    examples: [
      { id: 'e1', input: 'words = ["wrt","wrf","er","ett","rftt"]', expected: '"wertf"', explanation: 'Derived order: w<e<r<t<f.' },
      { id: 'e2', input: 'words = ["z","x"]', expected: '"zx"', explanation: 'z comes before x.' },
      { id: 'e3', input: 'words = ["z","x","z"]', expected: '""', explanation: 'Cycle detected.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '["abc","ab"]', expected: '""' },
      { id: 'h2', input: '["z"]', expected: '"z"' },
    ],
    starterCode: {
      java: javaStarter('public String alienOrder(String[] words)'),
      python: pyStarter('def alienOrder(self, words: List[str]) -> str'),
    },
    concepts: ['Topological Sort', 'Graph Building', 'BFS'],
  },

  {
    id: 48,
    title: 'Longest Increasing Subsequence',
    slug: 'longest-increasing-subsequence',
    difficulty: 'Hard',
    topics: ['Arrays', 'Dynamic Programming', 'Binary Search'],
    acceptanceRate: 55,
    timeLimit: 3000,
    memoryLimit: 256,
    description:
      'Given an integer array `nums`, return the length of the longest **strictly increasing subsequence**.',
    constraints: ['1 ≤ nums.length ≤ 2500', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    examples: [
      { id: 'e1', input: 'nums = [10,9,2,5,3,7,101,18]', expected: '4', explanation: '[2,3,7,101] is the longest.' },
      { id: 'e2', input: 'nums = [0,1,0,3,2,3]', expected: '4', explanation: '[0,1,2,3] length 4.' },
      { id: 'e3', input: 'nums = [7,7,7,7,7,7,7]', expected: '1', explanation: 'All same, length 1.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1,3,6,7,9,4,10,5,6]', expected: '6' },
      { id: 'h2', input: '[3,2,1]', expected: '1' },
      { id: 'h3', input: '[1,2,3,4,5]', expected: '5' },
    ],
    starterCode: {
      java: javaStarter('public int lengthOfLIS(int[] nums)'),
      python: pyStarter('def lengthOfLIS(self, nums: List[int]) -> int'),
    },
    concepts: ['Dynamic Programming', 'Binary Search', 'Patience Sorting'],
  },

  {
    id: 49,
    title: 'Serialize and Deserialize Binary Tree',
    slug: 'serialize-deserialize-binary-tree',
    difficulty: 'Hard',
    topics: ['Trees', 'BFS', 'DFS', 'Strings'],
    acceptanceRate: 56,
    timeLimit: 5000,
    memoryLimit: 256,
    description:
      'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. Just make sure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.',
    constraints: ['The number of nodes in the tree is in the range [0, 10⁴].', '-1000 ≤ Node.val ≤ 1000'],
    examples: [
      { id: 'e1', input: 'root = [1,2,3,null,null,4,5]', expected: '[1,2,3,null,null,4,5]', explanation: 'Serialize then deserialize returns same tree.' },
      { id: 'e2', input: 'root = []', expected: '[]', explanation: 'Empty tree.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '[1]', expected: '[1]' },
      { id: 'h2', input: '[1,2]', expected: '[1,2]' },
    ],
    starterCode: {
      java: `class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int val) { this.val = val; }\n}\n\nclass Codec {\n    public String serialize(TreeNode root) {\n        // Write your code here\n        return "";\n    }\n    public TreeNode deserialize(String data) {\n        // Write your code here\n        return null;\n    }\n}`,
      python: `class TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.left = None\n        self.right = None\n\nclass Codec:\n    def serialize(self, root) -> str:\n        # Write your code here\n        pass\n    def deserialize(self, data: str):\n        # Write your code here\n        pass`,
    },
    concepts: ['Tree Serialization', 'BFS', 'DFS', 'Design'],
  },

  {
    id: 50,
    title: 'Regular Expression Matching',
    slug: 'regular-expression-matching',
    difficulty: 'Hard',
    topics: ['Strings', 'Dynamic Programming', 'Recursion'],
    acceptanceRate: 28,
    timeLimit: 5000,
    memoryLimit: 256,
    description:
      'Given an input string `s` and a pattern `p`, implement regular expression matching with support for `\'.\'` and `\'*\'` where:\n- `\'.\'` Matches any single character.\n- `\'*\'` Matches zero or more of the preceding element.\n\nThe matching should cover the **entire** input string (not partial).',
    constraints: ['1 ≤ s.length ≤ 20', '1 ≤ p.length ≤ 30', 's contains only lowercase English letters.', 'p contains only lowercase English letters, \'.\', and \'*\'.', 'It is guaranteed for each occurrence of \'*\', there will be a previous valid character to match.'],
    examples: [
      { id: 'e1', input: 's = "aa", p = "a"', expected: 'false', explanation: '"a" does not match the entire string "aa".' },
      { id: 'e2', input: 's = "aa", p = "a*"', expected: 'true', explanation: '"a*" means zero or more "a"s, matches "aa".' },
      { id: 'e3', input: 's = "ab", p = ".*"', expected: 'true', explanation: '".*" matches any sequence.' },
    ],
    hiddenTests: [
      { id: 'h1', input: '"aab"|"c*a*b"', expected: 'true' },
      { id: 'h2', input: '"mississippi"|"mis*is*p*."', expected: 'false' },
      { id: 'h3', input: '"a"|"."', expected: 'true' },
    ],
    starterCode: {
      java: javaStarter('public boolean isMatch(String s, String p)'),
      python: pyStarter('def isMatch(self, s: str, p: str) -> bool'),
    },
    concepts: ['Dynamic Programming', '2D DP', 'Recursion with Memoization'],
  },
];

export const getProblemById = (id: number): Problem | undefined =>
  problems.find((p) => p.id === id);

export const getProblemsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Problem[] =>
  problems.filter((p) => p.difficulty === difficulty);

export const getProblemsByTopic = (topic: string): Problem[] =>
  problems.filter((p) => p.topics.includes(topic as any));

export const getLanguage = (lang: Language): Language => lang;
