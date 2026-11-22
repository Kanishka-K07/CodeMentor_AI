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

  // ============================================================
  // EXTENDED DSA PROBLEM LIBRARY (51-305)
  // Comprehensive coverage across all 15 DSA categories
  // ============================================================
  {
    id: 51,
    title: "Pair Difference Check",
    slug: "pair-difference-check",
    difficulty: "Easy",
    topics: ["Arrays"],
    acceptanceRate: 48,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine if there exist two elements in the array whose difference equals k.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 5, 3, 4, 2], target = 2",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 5, 3, 4, 2], target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 5, 3, 4, 2]|2",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[1, 5, 3, 4, 2]|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[1, 5, 3, 4, 2]|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean pairDifferenceCheck(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def pairDifferenceCheck(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 52,
    title: "Running Product Exclusion",
    slug: "running-product-exclusion",
    difficulty: "Medium",
    topics: ["Arrays"],
    acceptanceRate: 74,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Given an array of numbers, construct an array where each index contains the product of all elements except itself without using division.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4]",
            "expected": "[24, 12, 8, 6]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4]",
            "expected": "[24, 12, 8, 6]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4]",
            "expected": "[24, 12, 8, 6]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4]",
            "expected": "[24, 12, 8, 6]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4]",
            "expected": "[24, 12, 8, 6]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] runningProductExclusion(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def runningProductExclusion(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 53,
    title: "Circular Maximum Subarray",
    slug: "circular-maximum-subarray",
    difficulty: "Medium",
    topics: ["Arrays"],
    acceptanceRate: 76,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the maximum possible sum of a non-empty subarray of a circular array.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, -2, 3, -2]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, -2, 3, -2]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, -2, 3, -2]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[1, -2, 3, -2]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[1, -2, 3, -2]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int circularMaximumSubarray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def circularMaximumSubarray(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 54,
    title: "Missing Positive Integer",
    slug: "missing-positive-integer",
    difficulty: "Hard",
    topics: ["Arrays"],
    acceptanceRate: 52,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the smallest positive integer missing from an unsorted integer array in O(n) time and O(1) space.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 4, -1, 1]",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 4, -1, 1]",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 4, -1, 1]",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[3, 4, -1, 1]",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[3, 4, -1, 1]",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int missingPositiveInteger(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def missingPositiveInteger(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 55,
    title: "Subarray Count With Exact Sum",
    slug: "subarray-count-with-exact-sum",
    difficulty: "Medium",
    topics: ["Arrays"],
    acceptanceRate: 72,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Count the total number of continuous subarrays whose elements sum up to target k.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 1], target = 2",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 1], target = 0",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 1]|2",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[1, 1, 1]|0",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[1, 1, 1]|1",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int subarrayCountWithExactSum(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def subarrayCountWithExactSum(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 56,
    title: "Even Odd Separation",
    slug: "even-odd-separation",
    difficulty: "Easy",
    topics: ["Arrays"],
    acceptanceRate: 53,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Rearrange elements in an array so that all even integers precede all odd integers in place.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 1, 2, 4]",
            "expected": "[2, 4, 3, 1]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 1, 2, 4]",
            "expected": "[2, 4, 3, 1]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 1, 2, 4]",
            "expected": "[2, 4, 3, 1]"
      },
      {
            "id": "h2",
            "input": "[3, 1, 2, 4]",
            "expected": "[2, 4, 3, 1]"
      },
      {
            "id": "h3",
            "input": "[3, 1, 2, 4]",
            "expected": "[2, 4, 3, 1]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] evenOddSeparation(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def evenOddSeparation(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 57,
    title: "Majority Element Candidate",
    slug: "majority-element-candidate",
    difficulty: "Easy",
    topics: ["Arrays"],
    acceptanceRate: 70,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Identify the element that appears more than floor(n / 2) times in the sequence.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 2, 3]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 2, 3]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 2, 3]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[3, 2, 3]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[3, 2, 3]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int majorityElementCandidate(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def majorityElementCandidate(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 58,
    title: "Sorted Array Median Merged",
    slug: "sorted-array-median-merged",
    difficulty: "Hard",
    topics: ["Arrays"],
    acceptanceRate: 75,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the median of two sorted arrays of different sizes in O(log(m + n)) logarithmic time.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 3], target = [2]",
            "expected": "2.0",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 3], target = 0",
            "expected": "2.0",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 3]|[2]",
            "expected": "2.0"
      },
      {
            "id": "h2",
            "input": "[1, 3]|0",
            "expected": "2.0"
      },
      {
            "id": "h3",
            "input": "[1, 3]|1",
            "expected": "2.0"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public double sortedArrayMedianMerged(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def sortedArrayMedianMerged(self, nums: List[int]) -> float:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 59,
    title: "Peak Elevation Index",
    slug: "peak-elevation-index",
    difficulty: "Medium",
    topics: ["Arrays"],
    acceptanceRate: 78,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find an index of an element that is strictly greater than both its left and right neighbors.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 1]",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 1]",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 1]",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 1]",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 1]",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int peakElevationIndex(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def peakElevationIndex(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 60,
    title: "Shortest Unsorted Subarray",
    slug: "shortest-unsorted-subarray",
    difficulty: "Medium",
    topics: ["Arrays"],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the length of the shortest continuous subarray that if sorted in ascending order makes the whole array sorted.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 6, 4, 8, 10, 9, 15]",
            "expected": "5",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 6, 4, 8, 10, 9, 15]",
            "expected": "5",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 6, 4, 8, 10, 9, 15]",
            "expected": "5"
      },
      {
            "id": "h2",
            "input": "[2, 6, 4, 8, 10, 9, 15]",
            "expected": "5"
      },
      {
            "id": "h3",
            "input": "[2, 6, 4, 8, 10, 9, 15]",
            "expected": "5"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int shortestUnsortedSubarray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def shortestUnsortedSubarray(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 61,
    title: "Cumulative Frequency Rank",
    slug: "cumulative-frequency-rank",
    difficulty: "Easy",
    topics: ["Arrays"],
    acceptanceRate: 70,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Transform array elements to their rank from 1 to n based on ascending order of values.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [40, 10, 20, 30]",
            "expected": "[4, 1, 2, 3]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [40, 10, 20, 30]",
            "expected": "[4, 1, 2, 3]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[40, 10, 20, 30]",
            "expected": "[4, 1, 2, 3]"
      },
      {
            "id": "h2",
            "input": "[40, 10, 20, 30]",
            "expected": "[4, 1, 2, 3]"
      },
      {
            "id": "h3",
            "input": "[40, 10, 20, 30]",
            "expected": "[4, 1, 2, 3]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] cumulativeFrequencyRank(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def cumulativeFrequencyRank(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 62,
    title: "Maximum Chunks To Make Sorted",
    slug: "maximum-chunks-to-make-sorted",
    difficulty: "Medium",
    topics: ["Arrays"],
    acceptanceRate: 74,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Split array into maximum number of chunks that can be individually sorted to make the entire array sorted.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 3, 2, 1, 0]",
            "expected": "1",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 3, 2, 1, 0]",
            "expected": "1",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 3, 2, 1, 0]",
            "expected": "1"
      },
      {
            "id": "h2",
            "input": "[4, 3, 2, 1, 0]",
            "expected": "1"
      },
      {
            "id": "h3",
            "input": "[4, 3, 2, 1, 0]",
            "expected": "1"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maximumChunksToMakeSorted(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maximumChunksToMakeSorted(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 63,
    title: "Trapping Rain Water Height Map",
    slug: "trapping-rain-water-height-map",
    difficulty: "Hard",
    topics: ["Arrays"],
    acceptanceRate: 46,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Compute total units of rainwater retained between vertical bars given non-negative elevations.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
            "expected": "6",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
            "expected": "6",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
            "expected": "6"
      },
      {
            "id": "h2",
            "input": "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
            "expected": "6"
      },
      {
            "id": "h3",
            "input": "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
            "expected": "6"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int trappingRainWaterHeightMap(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def trappingRainWaterHeightMap(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 64,
    title: "Replace Elements With Right Max",
    slug: "replace-elements-with-right-max",
    difficulty: "Easy",
    topics: ["Arrays"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Replace each element with the greatest element strictly to its right, and set the last element to -1.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [17, 18, 5, 4, 6, 1]",
            "expected": "[18, 6, 6, 6, 1, -1]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [17, 18, 5, 4, 6, 1]",
            "expected": "[18, 6, 6, 6, 1, -1]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[17, 18, 5, 4, 6, 1]",
            "expected": "[18, 6, 6, 6, 1, -1]"
      },
      {
            "id": "h2",
            "input": "[17, 18, 5, 4, 6, 1]",
            "expected": "[18, 6, 6, 6, 1, -1]"
      },
      {
            "id": "h3",
            "input": "[17, 18, 5, 4, 6, 1]",
            "expected": "[18, 6, 6, 6, 1, -1]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] replaceElementsWithRightMax(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def replaceElementsWithRightMax(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 65,
    title: "Three Element Sum Closest",
    slug: "three-element-sum-closest",
    difficulty: "Medium",
    topics: ["Arrays"],
    acceptanceRate: 50,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find three integers in array whose sum is closest to the given target value.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [-1, 2, 1, -4], target = 1",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [-1, 2, 1, -4], target = 0",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[-1, 2, 1, -4]|1",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[-1, 2, 1, -4]|0",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[-1, 2, 1, -4]|1",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int threeElementSumClosest(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def threeElementSumClosest(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 66,
    title: "Maximum Score After Split",
    slug: "maximum-score-after-split",
    difficulty: "Easy",
    topics: ["Arrays"],
    acceptanceRate: 69,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Split binary string into two non-empty parts and maximize zeros on left plus ones on right.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"011101\"",
            "expected": "5",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"011101\"",
            "expected": "5",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"011101\"",
            "expected": "5"
      },
      {
            "id": "h2",
            "input": "\"011101\"",
            "expected": "5"
      },
      {
            "id": "h3",
            "input": "\"011101\"",
            "expected": "5"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maximumScoreAfterSplit(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maximumScoreAfterSplit(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 67,
    title: "Continuous Subarray Remainder",
    slug: "continuous-subarray-remainder",
    difficulty: "Medium",
    topics: ["Arrays"],
    acceptanceRate: 75,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine if array has a continuous subarray of size at least two whose sum is a multiple of k.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [23, 2, 4, 6, 7], target = 6",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [23, 2, 4, 6, 7], target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[23, 2, 4, 6, 7]|6",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[23, 2, 4, 6, 7]|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[23, 2, 4, 6, 7]|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean continuousSubarrayRemainder(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def continuousSubarrayRemainder(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Array Traversal","Prefix Sum","Two Pointers"],
  },

  {
    id: 68,
    title: "Longest Word Without Duplicate Chars",
    slug: "longest-word-without-duplicate-chars",
    difficulty: "Medium",
    topics: ["Strings"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the length of the longest contiguous sequence of characters in a string with no repeated characters.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"abcabcbb\"",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"abcabcbb\"",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"abcabcbb\"",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "\"abcabcbb\"",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "\"abcabcbb\"",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int longestWordWithoutDuplicateChars(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def longestWordWithoutDuplicateChars(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 69,
    title: "String Isomorphism Verification",
    slug: "string-isomorphism-verification",
    difficulty: "Easy",
    topics: ["Strings"],
    acceptanceRate: 68,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check if two strings can be mapped to one another with a one-to-one character correspondence.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"egg\", target = \"add\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"egg\", target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"egg\"|\"add\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "\"egg\"|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "\"egg\"|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean stringIsomorphismVerification(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def stringIsomorphismVerification(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 70,
    title: "Reverse Vowels Sequence",
    slug: "reverse-vowels-sequence",
    difficulty: "Easy",
    topics: ["Strings"],
    acceptanceRate: 57,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Reverse exclusively the vowels in a given string while retaining consonant positions.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"hello\"",
            "expected": "\"holle\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"hello\"",
            "expected": "\"holle\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"hello\"",
            "expected": "\"holle\""
      },
      {
            "id": "h2",
            "input": "\"hello\"",
            "expected": "\"holle\""
      },
      {
            "id": "h3",
            "input": "\"hello\"",
            "expected": "\"holle\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String reverseVowelsSequence(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def reverseVowelsSequence(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 71,
    title: "Word Compression Count",
    slug: "word-compression-count",
    difficulty: "Medium",
    topics: ["Strings"],
    acceptanceRate: 76,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compress repeating sequences of characters in place into character plus frequency count.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
            "expected": "6",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
            "expected": "6",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
            "expected": "6"
      },
      {
            "id": "h2",
            "input": "[\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
            "expected": "6"
      },
      {
            "id": "h3",
            "input": "[\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
            "expected": "6"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int wordCompressionCount(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def wordCompressionCount(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 72,
    title: "Longest Palindrome Construction",
    slug: "longest-palindrome-construction",
    difficulty: "Easy",
    topics: ["Strings"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the length of the longest palindrome that can be formed using letters of the given string.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"abccccdd\"",
            "expected": "7",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"abccccdd\"",
            "expected": "7",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"abccccdd\"",
            "expected": "7"
      },
      {
            "id": "h2",
            "input": "\"abccccdd\"",
            "expected": "7"
      },
      {
            "id": "h3",
            "input": "\"abccccdd\"",
            "expected": "7"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int longestPalindromeConstruction(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def longestPalindromeConstruction(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 73,
    title: "Decode Nested Multiplier String",
    slug: "decode-nested-multiplier-string",
    difficulty: "Medium",
    topics: ["Strings"],
    acceptanceRate: 70,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Expand nested encoded patterns of format k[string] where the inner text repeats k times.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"3[a2[c]]\"",
            "expected": "\"accaccacc\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"3[a2[c]]\"",
            "expected": "\"accaccacc\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"3[a2[c]]\"",
            "expected": "\"accaccacc\""
      },
      {
            "id": "h2",
            "input": "\"3[a2[c]]\"",
            "expected": "\"accaccacc\""
      },
      {
            "id": "h3",
            "input": "\"3[a2[c]]\"",
            "expected": "\"accaccacc\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String decodeNestedMultiplierString(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def decodeNestedMultiplierString(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 74,
    title: "Minimum Window Substring Match",
    slug: "minimum-window-substring-match",
    difficulty: "Hard",
    topics: ["Strings"],
    acceptanceRate: 58,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the shortest substring in s that contains all characters of pattern t in any order.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"ADOBECODEBANC\", target = \"ABC\"",
            "expected": "\"BANC\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"ADOBECODEBANC\", target = 0",
            "expected": "\"BANC\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"ADOBECODEBANC\"|\"ABC\"",
            "expected": "\"BANC\""
      },
      {
            "id": "h2",
            "input": "\"ADOBECODEBANC\"|0",
            "expected": "\"BANC\""
      },
      {
            "id": "h3",
            "input": "\"ADOBECODEBANC\"|1",
            "expected": "\"BANC\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String minimumWindowSubstringMatch(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def minimumWindowSubstringMatch(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 75,
    title: "Repeated Substring Validation",
    slug: "repeated-substring-validation",
    difficulty: "Easy",
    topics: ["Strings"],
    acceptanceRate: 76,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Verify if a string can be constructed by taking a substring and appending multiple copies.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"abab\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"abab\"",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"abab\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "\"abab\"",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "\"abab\"",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean repeatedSubstringValidation(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def repeatedSubstringValidation(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 76,
    title: "Valid Palindrome Skip One",
    slug: "valid-palindrome-skip-one",
    difficulty: "Easy",
    topics: ["Strings"],
    acceptanceRate: 73,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine whether a string is a palindrome or can become one by removing at most one character.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"abca\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"abca\"",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"abca\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "\"abca\"",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "\"abca\"",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean validPalindromeSkipOne(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def validPalindromeSkipOne(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 77,
    title: "Compare Semantic Version Strings",
    slug: "compare-semantic-version-strings",
    difficulty: "Medium",
    topics: ["Strings"],
    acceptanceRate: 77,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compare two version revision strings separated by dots and return -1, 1, or 0.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"1.01\", target = \"1.001\"",
            "expected": "0",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"1.01\", target = 0",
            "expected": "0",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"1.01\"|\"1.001\"",
            "expected": "0"
      },
      {
            "id": "h2",
            "input": "\"1.01\"|0",
            "expected": "0"
      },
      {
            "id": "h3",
            "input": "\"1.01\"|1",
            "expected": "0"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int compareSemanticVersionStrings(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def compareSemanticVersionStrings(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 78,
    title: "Count Homogenous Substrings",
    slug: "count-homogenous-substrings",
    difficulty: "Medium",
    topics: ["Strings"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Return the number of substrings where all characters in the substring are identical modulo 10^9 + 7.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"abbcccaa\"",
            "expected": "13",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"abbcccaa\"",
            "expected": "13",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"abbcccaa\"",
            "expected": "13"
      },
      {
            "id": "h2",
            "input": "\"abbcccaa\"",
            "expected": "13"
      },
      {
            "id": "h3",
            "input": "\"abbcccaa\"",
            "expected": "13"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int countHomogenousSubstrings(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def countHomogenousSubstrings(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 79,
    title: "Wildcard Pattern Parser",
    slug: "wildcard-pattern-parser",
    difficulty: "Hard",
    topics: ["Strings"],
    acceptanceRate: 76,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Match a target string against a wildcard pattern containing ? (single) and * (sequence).\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aa\", target = \"*\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aa\", target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aa\"|\"*\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "\"aa\"|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "\"aa\"|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean wildcardPatternParser(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def wildcardPatternParser(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 80,
    title: "Count Anagram Substring Windows",
    slug: "count-anagram-substring-windows",
    difficulty: "Medium",
    topics: ["Strings"],
    acceptanceRate: 55,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find all start indices where a contiguous substring is an exact anagram of target pattern.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"cbaebabacd\", target = \"abc\"",
            "expected": "[0, 6]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"cbaebabacd\", target = 0",
            "expected": "[0, 6]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"cbaebabacd\"|\"abc\"",
            "expected": "[0, 6]"
      },
      {
            "id": "h2",
            "input": "\"cbaebabacd\"|0",
            "expected": "[0, 6]"
      },
      {
            "id": "h3",
            "input": "\"cbaebabacd\"|1",
            "expected": "[0, 6]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] countAnagramSubstringWindows(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def countAnagramSubstringWindows(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 81,
    title: "Longest Chunked Palindrome",
    slug: "longest-chunked-palindrome",
    difficulty: "Hard",
    topics: ["Strings"],
    acceptanceRate: 47,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the largest number of non-overlapping chunks such that the chunk sequence is a palindrome.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"ghiabcdefhelloadamhelloabcdefghi\"",
            "expected": "7",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"ghiabcdefhelloadamhelloabcdefghi\"",
            "expected": "7",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"ghiabcdefhelloadamhelloabcdefghi\"",
            "expected": "7"
      },
      {
            "id": "h2",
            "input": "\"ghiabcdefhelloadamhelloabcdefghi\"",
            "expected": "7"
      },
      {
            "id": "h3",
            "input": "\"ghiabcdefhelloadamhelloabcdefghi\"",
            "expected": "7"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int longestChunkedPalindrome(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def longestChunkedPalindrome(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 82,
    title: "Rearrange Characters Distinct Adjacent",
    slug: "rearrange-characters-distinct-adjacent",
    difficulty: "Medium",
    topics: ["Strings"],
    acceptanceRate: 74,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Rearrange characters in a string so that no two adjacent characters are identical.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aab\"",
            "expected": "\"aba\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aab\"",
            "expected": "\"aba\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aab\"",
            "expected": "\"aba\""
      },
      {
            "id": "h2",
            "input": "\"aab\"",
            "expected": "\"aba\""
      },
      {
            "id": "h3",
            "input": "\"aab\"",
            "expected": "\"aba\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String rearrangeCharactersDistinctAdjacent(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def rearrangeCharactersDistinctAdjacent(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 83,
    title: "Detect Proper Capitalization",
    slug: "detect-proper-capitalization",
    difficulty: "Easy",
    topics: ["Strings"],
    acceptanceRate: 71,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Verify if a word conforms to standard capitalization (all caps, all lower, or initial cap).\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"USA\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"USA\"",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"USA\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "\"USA\"",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "\"USA\"",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean detectProperCapitalization(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def detectProperCapitalization(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 84,
    title: "Shortest Palindrome Prefix Append",
    slug: "shortest-palindrome-prefix-append",
    difficulty: "Hard",
    topics: ["Strings"],
    acceptanceRate: 68,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the shortest palindrome by prepending minimum characters in front of a string.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aacecaaa\"",
            "expected": "\"aaacecaaa\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aacecaaa\"",
            "expected": "\"aaacecaaa\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aacecaaa\"",
            "expected": "\"aaacecaaa\""
      },
      {
            "id": "h2",
            "input": "\"aacecaaa\"",
            "expected": "\"aaacecaaa\""
      },
      {
            "id": "h3",
            "input": "\"aacecaaa\"",
            "expected": "\"aaacecaaa\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String shortestPalindromePrefixAppend(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def shortestPalindromePrefixAppend(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Character Frequency","Two Pointers","Sliding Window"],
  },

  {
    id: 85,
    title: "Singly Linked List Midpoint",
    slug: "singly-linked-list-midpoint",
    difficulty: "Easy",
    topics: ["Linked List"],
    acceptanceRate: 78,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the value stored in the middle node of a singly linked list in a single pass.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int singlyLinkedListMidpoint(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def singlyLinkedListMidpoint(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 86,
    title: "Detect Cycle Start Node",
    slug: "detect-cycle-start-node",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 45,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine the starting node index where a cycle loops back in a linked list.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 2, 0, -4], target = 1",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 2, 0, -4], target = 0",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 2, 0, -4]|1",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[3, 2, 0, -4]|0",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[3, 2, 0, -4]|1",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int detectCycleStartNode(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def detectCycleStartNode(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 87,
    title: "Remove Nth Node From List End",
    slug: "remove-nth-node-from-list-end",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 58,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Remove the nth node from the end of the linked list and return the modified list.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5], target = 2",
            "expected": "[1, 2, 3, 5]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5], target = 0",
            "expected": "[1, 2, 3, 5]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5]|2",
            "expected": "[1, 2, 3, 5]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5]|0",
            "expected": "[1, 2, 3, 5]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5]|1",
            "expected": "[1, 2, 3, 5]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] removeNthNodeFromListEnd(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def removeNthNodeFromListEnd(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 88,
    title: "Reverse Nodes In K-Group Block",
    slug: "reverse-nodes-in-k-group-block",
    difficulty: "Hard",
    topics: ["Linked List"],
    acceptanceRate: 55,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Reverse the nodes of a linked list k at a time and leave remaining trailing nodes unchanged.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5], target = 2",
            "expected": "[2, 1, 4, 3, 5]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5], target = 0",
            "expected": "[2, 1, 4, 3, 5]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5]|2",
            "expected": "[2, 1, 4, 3, 5]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5]|0",
            "expected": "[2, 1, 4, 3, 5]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5]|1",
            "expected": "[2, 1, 4, 3, 5]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] reverseNodesInKGroupBlock(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def reverseNodesInKGroupBlock(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 89,
    title: "Interleave Odd Even Node Indices",
    slug: "interleave-odd-even-node-indices",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 57,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Group all nodes at odd indices together followed by all nodes at even indices.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5]",
            "expected": "[1, 3, 5, 2, 4]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5]",
            "expected": "[1, 3, 5, 2, 4]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5]",
            "expected": "[1, 3, 5, 2, 4]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5]",
            "expected": "[1, 3, 5, 2, 4]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5]",
            "expected": "[1, 3, 5, 2, 4]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] interleaveOddEvenNodeIndices(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def interleaveOddEvenNodeIndices(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 90,
    title: "Merge K Sorted Linked Streams",
    slug: "merge-k-sorted-linked-streams",
    difficulty: "Hard",
    topics: ["Linked List"],
    acceptanceRate: 70,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Merge k sorted linked lists into one single sorted linked list in O(N log k) time.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 4, 5], [1, 3, 4], [2, 6]]",
            "expected": "[1, 1, 2, 3, 4, 4, 5, 6]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 4, 5], [1, 3, 4], [2, 6]]",
            "expected": "[1, 1, 2, 3, 4, 4, 5, 6]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 4, 5], [1, 3, 4], [2, 6]]",
            "expected": "[1, 1, 2, 3, 4, 4, 5, 6]"
      },
      {
            "id": "h2",
            "input": "[[1, 4, 5], [1, 3, 4], [2, 6]]",
            "expected": "[1, 1, 2, 3, 4, 4, 5, 6]"
      },
      {
            "id": "h3",
            "input": "[[1, 4, 5], [1, 3, 4], [2, 6]]",
            "expected": "[1, 1, 2, 3, 4, 4, 5, 6]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] mergeKSortedLinkedStreams(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def mergeKSortedLinkedStreams(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 91,
    title: "Delete Node Without Head Reference",
    slug: "delete-node-without-head-reference",
    difficulty: "Easy",
    topics: ["Linked List"],
    acceptanceRate: 67,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Delete an internal node from a singly linked list given only a reference to that node.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 5, 1, 9], target = 5",
            "expected": "[4, 1, 9]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 5, 1, 9], target = 0",
            "expected": "[4, 1, 9]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 5, 1, 9]|5",
            "expected": "[4, 1, 9]"
      },
      {
            "id": "h2",
            "input": "[4, 5, 1, 9]|0",
            "expected": "[4, 1, 9]"
      },
      {
            "id": "h3",
            "input": "[4, 5, 1, 9]|1",
            "expected": "[4, 1, 9]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] deleteNodeWithoutHeadReference(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def deleteNodeWithoutHeadReference(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 92,
    title: "Rotate List Right By K",
    slug: "rotate-list-right-by-k",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 58,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Shift all nodes in a linked list to the right by k places and wrap overflow around to the head.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5], target = 2",
            "expected": "[4, 5, 1, 2, 3]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5], target = 0",
            "expected": "[4, 5, 1, 2, 3]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5]|2",
            "expected": "[4, 5, 1, 2, 3]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5]|0",
            "expected": "[4, 5, 1, 2, 3]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5]|1",
            "expected": "[4, 5, 1, 2, 3]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] rotateListRightByK(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def rotateListRightByK(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 93,
    title: "Partition List Around Pivot",
    slug: "partition-list-around-pivot",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 70,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Partition a list such that nodes with values less than x appear before nodes greater or equal.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 4, 3, 2, 5, 2], target = 3",
            "expected": "[1, 2, 2, 4, 3, 5]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 4, 3, 2, 5, 2], target = 0",
            "expected": "[1, 2, 2, 4, 3, 5]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 4, 3, 2, 5, 2]|3",
            "expected": "[1, 2, 2, 4, 3, 5]"
      },
      {
            "id": "h2",
            "input": "[1, 4, 3, 2, 5, 2]|0",
            "expected": "[1, 2, 2, 4, 3, 5]"
      },
      {
            "id": "h3",
            "input": "[1, 4, 3, 2, 5, 2]|1",
            "expected": "[1, 2, 2, 4, 3, 5]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] partitionListAroundPivot(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def partitionListAroundPivot(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 94,
    title: "Intersection Point Of Two Lists",
    slug: "intersection-point-of-two-lists",
    difficulty: "Easy",
    topics: ["Linked List"],
    acceptanceRate: 79,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Identify the node value at which two singly linked lists merge into a common tail.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 1, 8, 4, 5], target = [5, 6, 1, 8, 4, 5]",
            "expected": "8",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 1, 8, 4, 5], target = 0",
            "expected": "8",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 1, 8, 4, 5]|[5, 6, 1, 8, 4, 5]",
            "expected": "8"
      },
      {
            "id": "h2",
            "input": "[4, 1, 8, 4, 5]|0",
            "expected": "8"
      },
      {
            "id": "h3",
            "input": "[4, 1, 8, 4, 5]|1",
            "expected": "8"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int intersectionPointOfTwoLists(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def intersectionPointOfTwoLists(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 95,
    title: "Swap Adjacent Node Pairs",
    slug: "swap-adjacent-node-pairs",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 55,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Swap every two adjacent nodes in a linked list without modifying node data values.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4]",
            "expected": "[2, 1, 4, 3]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4]",
            "expected": "[2, 1, 4, 3]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4]",
            "expected": "[2, 1, 4, 3]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4]",
            "expected": "[2, 1, 4, 3]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4]",
            "expected": "[2, 1, 4, 3]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] swapAdjacentNodePairs(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def swapAdjacentNodePairs(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 96,
    title: "Copy List With Random Pointer Map",
    slug: "copy-list-with-random-pointer-map",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 48,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Construct a deep copy of a linked list where each node has an auxiliary arbitrary pointer.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[7, null], [13, 0], [11, 4]]",
            "expected": "[[7, null], [13, 0], [11, 4]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[7, null], [13, 0], [11, 4]]",
            "expected": "[[7, null], [13, 0], [11, 4]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[7, null], [13, 0], [11, 4]]",
            "expected": "[[7, null], [13, 0], [11, 4]]"
      },
      {
            "id": "h2",
            "input": "[[7, null], [13, 0], [11, 4]]",
            "expected": "[[7, null], [13, 0], [11, 4]]"
      },
      {
            "id": "h3",
            "input": "[[7, null], [13, 0], [11, 4]]",
            "expected": "[[7, null], [13, 0], [11, 4]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] copyListWithRandomPointerMap(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def copyListWithRandomPointerMap(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 97,
    title: "Sort Linked List In Logarithmic Time",
    slug: "sort-linked-list-in-logarithmic-time",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 64,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Sort a singly linked list in O(n log n) time and O(1) auxiliary stack space.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 2, 1, 3]",
            "expected": "[1, 2, 3, 4]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 2, 1, 3]",
            "expected": "[1, 2, 3, 4]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 2, 1, 3]",
            "expected": "[1, 2, 3, 4]"
      },
      {
            "id": "h2",
            "input": "[4, 2, 1, 3]",
            "expected": "[1, 2, 3, 4]"
      },
      {
            "id": "h3",
            "input": "[4, 2, 1, 3]",
            "expected": "[1, 2, 3, 4]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] sortLinkedListInLogarithmicTime(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def sortLinkedListInLogarithmicTime(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 98,
    title: "Split Linked List Into Parts",
    slug: "split-linked-list-into-parts",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 49,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Split a linked list into k consecutive parts as equal in length as possible.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3], target = 5",
            "expected": "[[1], [2], [3], [], []]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3], target = 0",
            "expected": "[[1], [2], [3], [], []]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3]|5",
            "expected": "[[1], [2], [3], [], []]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3]|0",
            "expected": "[[1], [2], [3], [], []]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3]|1",
            "expected": "[[1], [2], [3], [], []]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int splitLinkedListIntoParts(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def splitLinkedListIntoParts(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 99,
    title: "Flatten Multilevel Doubly List",
    slug: "flatten-multilevel-doubly-list",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 52,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Flatten a doubly linked list containing child nodes into a single-level doubly linked list.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5, 6]",
            "expected": "[1, 2, 3, 4, 5, 6]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5, 6]",
            "expected": "[1, 2, 3, 4, 5, 6]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5, 6]",
            "expected": "[1, 2, 3, 4, 5, 6]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5, 6]",
            "expected": "[1, 2, 3, 4, 5, 6]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5, 6]",
            "expected": "[1, 2, 3, 4, 5, 6]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] flattenMultilevelDoublyList(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def flattenMultilevelDoublyList(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 100,
    title: "Remove Duplicates From Sorted List",
    slug: "remove-duplicates-from-sorted-list",
    difficulty: "Easy",
    topics: ["Linked List"],
    acceptanceRate: 48,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Delete all duplicate nodes in a sorted linked list so that each element appears once.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 2, 3, 3]",
            "expected": "[1, 2, 3]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 2, 3, 3]",
            "expected": "[1, 2, 3]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 2, 3, 3]",
            "expected": "[1, 2, 3]"
      },
      {
            "id": "h2",
            "input": "[1, 1, 2, 3, 3]",
            "expected": "[1, 2, 3]"
      },
      {
            "id": "h3",
            "input": "[1, 1, 2, 3, 3]",
            "expected": "[1, 2, 3]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] removeDuplicatesFromSortedList(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def removeDuplicatesFromSortedList(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 101,
    title: "Add Numbers Linked List Order",
    slug: "add-numbers-linked-list-order",
    difficulty: "Medium",
    topics: ["Linked List"],
    acceptanceRate: 49,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Add two numbers represented as linked lists where the most significant digit appears first.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [7, 2, 4, 3], target = [5, 6, 4]",
            "expected": "[7, 8, 0, 7]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [7, 2, 4, 3], target = 0",
            "expected": "[7, 8, 0, 7]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[7, 2, 4, 3]|[5, 6, 4]",
            "expected": "[7, 8, 0, 7]"
      },
      {
            "id": "h2",
            "input": "[7, 2, 4, 3]|0",
            "expected": "[7, 8, 0, 7]"
      },
      {
            "id": "h3",
            "input": "[7, 2, 4, 3]|1",
            "expected": "[7, 8, 0, 7]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] addNumbersLinkedListOrder(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def addNumbersLinkedListOrder(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Pointers","Fast & Slow","Reversal"],
  },

  {
    id: 102,
    title: "Next Greater Element Indices",
    slug: "next-greater-element-indices",
    difficulty: "Medium",
    topics: ["Stack"],
    acceptanceRate: 59,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "For each index in array, find the next strictly greater element to its right, or -1 if none.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 5, 2, 25]",
            "expected": "[5, 25, 25, -1]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 5, 2, 25]",
            "expected": "[5, 25, 25, -1]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 5, 2, 25]",
            "expected": "[5, 25, 25, -1]"
      },
      {
            "id": "h2",
            "input": "[4, 5, 2, 25]",
            "expected": "[5, 25, 25, -1]"
      },
      {
            "id": "h3",
            "input": "[4, 5, 2, 25]",
            "expected": "[5, 25, 25, -1]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] nextGreaterElementIndices(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def nextGreaterElementIndices(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 103,
    title: "Largest Histogram Area Calculation",
    slug: "largest-histogram-area-calculation",
    difficulty: "Hard",
    topics: ["Stack"],
    acceptanceRate: 55,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the area of the largest rectangle that can be formed within heights of histogram bars.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 1, 5, 6, 2, 3]",
            "expected": "10",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 1, 5, 6, 2, 3]",
            "expected": "10",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 1, 5, 6, 2, 3]",
            "expected": "10"
      },
      {
            "id": "h2",
            "input": "[2, 1, 5, 6, 2, 3]",
            "expected": "10"
      },
      {
            "id": "h3",
            "input": "[2, 1, 5, 6, 2, 3]",
            "expected": "10"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int largestHistogramAreaCalculation(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def largestHistogramAreaCalculation(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 104,
    title: "Evaluate Reverse Polish Expression",
    slug: "evaluate-reverse-polish-expression",
    difficulty: "Medium",
    topics: ["Stack"],
    acceptanceRate: 75,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Evaluate the numeric result of an arithmetic expression written in postfix notation.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [\"2\", \"1\", \"+\", \"3\", \"*\"]",
            "expected": "9",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [\"2\", \"1\", \"+\", \"3\", \"*\"]",
            "expected": "9",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[\"2\", \"1\", \"+\", \"3\", \"*\"]",
            "expected": "9"
      },
      {
            "id": "h2",
            "input": "[\"2\", \"1\", \"+\", \"3\", \"*\"]",
            "expected": "9"
      },
      {
            "id": "h3",
            "input": "[\"2\", \"1\", \"+\", \"3\", \"*\"]",
            "expected": "9"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int evaluateReversePolishExpression(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def evaluateReversePolishExpression(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 105,
    title: "Remove Adjacent Duplicate Pairs",
    slug: "remove-adjacent-duplicate-pairs",
    difficulty: "Easy",
    topics: ["Stack"],
    acceptanceRate: 75,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Repeatedly remove adjacent matching pairs of characters until no adjacent duplicates remain.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"abbaca\"",
            "expected": "\"ca\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"abbaca\"",
            "expected": "\"ca\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"abbaca\"",
            "expected": "\"ca\""
      },
      {
            "id": "h2",
            "input": "\"abbaca\"",
            "expected": "\"ca\""
      },
      {
            "id": "h3",
            "input": "\"abbaca\"",
            "expected": "\"ca\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String removeAdjacentDuplicatePairs(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def removeAdjacentDuplicatePairs(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 106,
    title: "Simulate Asteroid Trajectory Collisions",
    slug: "simulate-asteroid-trajectory-collisions",
    difficulty: "Medium",
    topics: ["Stack"],
    acceptanceRate: 52,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Simulate moving asteroids where positive moves right and negative moves left, larger destroys smaller.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [5, 10, -5]",
            "expected": "[5, 10]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [5, 10, -5]",
            "expected": "[5, 10]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[5, 10, -5]",
            "expected": "[5, 10]"
      },
      {
            "id": "h2",
            "input": "[5, 10, -5]",
            "expected": "[5, 10]"
      },
      {
            "id": "h3",
            "input": "[5, 10, -5]",
            "expected": "[5, 10]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] simulateAsteroidTrajectoryCollisions(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def simulateAsteroidTrajectoryCollisions(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 107,
    title: "Daily Temperature Days Wait",
    slug: "daily-temperature-days-wait",
    difficulty: "Medium",
    topics: ["Stack"],
    acceptanceRate: 59,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "For each day, compute the number of days until a strictly warmer temperature arrives.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [73, 74, 75, 71, 69, 72, 76, 73]",
            "expected": "[1, 1, 4, 2, 1, 1, 0, 0]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [73, 74, 75, 71, 69, 72, 76, 73]",
            "expected": "[1, 1, 4, 2, 1, 1, 0, 0]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[73, 74, 75, 71, 69, 72, 76, 73]",
            "expected": "[1, 1, 4, 2, 1, 1, 0, 0]"
      },
      {
            "id": "h2",
            "input": "[73, 74, 75, 71, 69, 72, 76, 73]",
            "expected": "[1, 1, 4, 2, 1, 1, 0, 0]"
      },
      {
            "id": "h3",
            "input": "[73, 74, 75, 71, 69, 72, 76, 73]",
            "expected": "[1, 1, 4, 2, 1, 1, 0, 0]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] dailyTemperatureDaysWait(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def dailyTemperatureDaysWait(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 108,
    title: "Simplify Unix Directory Path",
    slug: "simplify-unix-directory-path",
    difficulty: "Medium",
    topics: ["Stack"],
    acceptanceRate: 67,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Transform an absolute Unix directory path with . and .. into canonical minimal path.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"/a/./b/../../c/\"",
            "expected": "\"/c\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"/a/./b/../../c/\"",
            "expected": "\"/c\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"/a/./b/../../c/\"",
            "expected": "\"/c\""
      },
      {
            "id": "h2",
            "input": "\"/a/./b/../../c/\"",
            "expected": "\"/c\""
      },
      {
            "id": "h3",
            "input": "\"/a/./b/../../c/\"",
            "expected": "\"/c\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String simplifyUnixDirectoryPath(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def simplifyUnixDirectoryPath(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 109,
    title: "Baseball Game Score Tracker",
    slug: "baseball-game-score-tracker",
    difficulty: "Easy",
    topics: ["Stack"],
    acceptanceRate: 77,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Maintain running score tally supporting cancel (C), double (D), and sum-two (+) commands.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [\"5\", \"2\", \"C\", \"D\", \"+\"]",
            "expected": "30",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [\"5\", \"2\", \"C\", \"D\", \"+\"]",
            "expected": "30",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[\"5\", \"2\", \"C\", \"D\", \"+\"]",
            "expected": "30"
      },
      {
            "id": "h2",
            "input": "[\"5\", \"2\", \"C\", \"D\", \"+\"]",
            "expected": "30"
      },
      {
            "id": "h3",
            "input": "[\"5\", \"2\", \"C\", \"D\", \"+\"]",
            "expected": "30"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int baseballGameScoreTracker(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def baseballGameScoreTracker(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 110,
    title: "Validate Parentheses Depth Count",
    slug: "validate-parentheses-depth-count",
    difficulty: "Easy",
    topics: ["Stack"],
    acceptanceRate: 67,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate the maximum nesting depth of parentheses in a valid parentheses string.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"(1+(2*3)+((8)/4))+1\"",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"(1+(2*3)+((8)/4))+1\"",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"(1+(2*3)+((8)/4))+1\"",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "\"(1+(2*3)+((8)/4))+1\"",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "\"(1+(2*3)+((8)/4))+1\"",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int validateParenthesesDepthCount(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def validateParenthesesDepthCount(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 111,
    title: "Stock Span Consecutive Days Count",
    slug: "stock-span-consecutive-days-count",
    difficulty: "Medium",
    topics: ["Stack"],
    acceptanceRate: 54,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compute span of stock price on each day defined as maximum consecutive days prior with price <= today.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [100, 80, 60, 70, 60, 75, 85]",
            "expected": "[1, 1, 1, 2, 1, 4, 6]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [100, 80, 60, 70, 60, 75, 85]",
            "expected": "[1, 1, 1, 2, 1, 4, 6]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[100, 80, 60, 70, 60, 75, 85]",
            "expected": "[1, 1, 1, 2, 1, 4, 6]"
      },
      {
            "id": "h2",
            "input": "[100, 80, 60, 70, 60, 75, 85]",
            "expected": "[1, 1, 1, 2, 1, 4, 6]"
      },
      {
            "id": "h3",
            "input": "[100, 80, 60, 70, 60, 75, 85]",
            "expected": "[1, 1, 1, 2, 1, 4, 6]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] stockSpanConsecutiveDaysCount(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def stockSpanConsecutiveDaysCount(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 112,
    title: "Validate Subsequence 132 Pattern",
    slug: "validate-subsequence-132-pattern",
    difficulty: "Medium",
    topics: ["Stack"],
    acceptanceRate: 72,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check if there exist indices i < j < k such that nums[i] < nums[k] < nums[j].\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 1, 4, 2]",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 1, 4, 2]",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 1, 4, 2]",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[3, 1, 4, 2]",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[3, 1, 4, 2]",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean validateSubsequence132Pattern(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def validateSubsequence132Pattern(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 113,
    title: "Maximal Rectangle In Binary Matrix",
    slug: "maximal-rectangle-in-binary-matrix",
    difficulty: "Hard",
    topics: ["Stack"],
    acceptanceRate: 55,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the area of the largest rectangle composed solely of 1s in a 2D binary matrix.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
            "expected": "6",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
            "expected": "6",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
            "expected": "6"
      },
      {
            "id": "h2",
            "input": "[[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
            "expected": "6"
      },
      {
            "id": "h3",
            "input": "[[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
            "expected": "6"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maximalRectangleInBinaryMatrix(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maximalRectangleInBinaryMatrix(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 114,
    title: "Backspace String Key Comparison",
    slug: "backspace-string-key-comparison",
    difficulty: "Easy",
    topics: ["Stack"],
    acceptanceRate: 65,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check if two typed strings match when # acts as a backspace deleting the preceding char.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"ab#c\", target = \"ad#c\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"ab#c\", target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"ab#c\"|\"ad#c\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "\"ab#c\"|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "\"ab#c\"|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean backspaceStringKeyComparison(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def backspaceStringKeyComparison(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 115,
    title: "Minimum Remove Valid Parentheses",
    slug: "minimum-remove-valid-parentheses",
    difficulty: "Medium",
    topics: ["Stack"],
    acceptanceRate: 49,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Remove the minimal number of parentheses so that the remaining string is valid.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"lee(t(c)o)de)\"",
            "expected": "\"lee(t(c)o)de\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"lee(t(c)o)de)\"",
            "expected": "\"lee(t(c)o)de\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"lee(t(c)o)de)\"",
            "expected": "\"lee(t(c)o)de\""
      },
      {
            "id": "h2",
            "input": "\"lee(t(c)o)de)\"",
            "expected": "\"lee(t(c)o)de\""
      },
      {
            "id": "h3",
            "input": "\"lee(t(c)o)de)\"",
            "expected": "\"lee(t(c)o)de\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String minimumRemoveValidParentheses(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def minimumRemoveValidParentheses(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 116,
    title: "Basic Calculator Plus Minus Parentheses",
    slug: "basic-calculator-plus-minus-parentheses",
    difficulty: "Hard",
    topics: ["Stack"],
    acceptanceRate: 78,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Evaluate mathematical expression containing +, -, (, ) and spaces without using eval.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"(1+(4+5+2)-3)+(6+8)\"",
            "expected": "23",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"(1+(4+5+2)-3)+(6+8)\"",
            "expected": "23",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"(1+(4+5+2)-3)+(6+8)\"",
            "expected": "23"
      },
      {
            "id": "h2",
            "input": "\"(1+(4+5+2)-3)+(6+8)\"",
            "expected": "23"
      },
      {
            "id": "h3",
            "input": "\"(1+(4+5+2)-3)+(6+8)\"",
            "expected": "23"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int basicCalculatorPlusMinusParentheses(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def basicCalculatorPlusMinusParentheses(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 117,
    title: "Build Array With Stack Operations",
    slug: "build-array-with-stack-operations",
    difficulty: "Easy",
    topics: ["Stack"],
    acceptanceRate: 50,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Generate stream of Push and Pop commands that constructs target list from stream 1 to n.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 3], target = 3",
            "expected": "[\"Push\",\"Push\",\"Pop\",\"Push\"]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 3], target = 0",
            "expected": "[\"Push\",\"Push\",\"Pop\",\"Push\"]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 3]|3",
            "expected": "[\"Push\",\"Push\",\"Pop\",\"Push\"]"
      },
      {
            "id": "h2",
            "input": "[1, 3]|0",
            "expected": "[\"Push\",\"Push\",\"Pop\",\"Push\"]"
      },
      {
            "id": "h3",
            "input": "[1, 3]|1",
            "expected": "[\"Push\",\"Push\",\"Pop\",\"Push\"]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int buildArrayWithStackOperations(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def buildArrayWithStackOperations(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 118,
    title: "Max Frequency Stack Push Pop",
    slug: "max-frequency-stack-push-pop",
    difficulty: "Hard",
    topics: ["Stack"],
    acceptanceRate: 72,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Implement stack that removes and returns the most frequent element, breaking ties by recency.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [5, 7, 5, 7, 4, 5]",
            "expected": "[5, 7, 5, 4]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [5, 7, 5, 7, 4, 5]",
            "expected": "[5, 7, 5, 4]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[5, 7, 5, 7, 4, 5]",
            "expected": "[5, 7, 5, 4]"
      },
      {
            "id": "h2",
            "input": "[5, 7, 5, 7, 4, 5]",
            "expected": "[5, 7, 5, 4]"
      },
      {
            "id": "h3",
            "input": "[5, 7, 5, 7, 4, 5]",
            "expected": "[5, 7, 5, 4]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] maxFrequencyStackPushPop(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def maxFrequencyStackPushPop(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["LIFO","Monotonic Stack","Parentheses Validation"],
  },

  {
    id: 119,
    title: "Sliding Window Maximum Deque",
    slug: "sliding-window-maximum-deque",
    difficulty: "Hard",
    topics: ["Queue"],
    acceptanceRate: 69,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the maximum value inside each sliding window of size k moving across an array.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 3, -1, -3, 5, 3, 6, 7], target = 3",
            "expected": "[3, 3, 5, 5, 6, 7]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 3, -1, -3, 5, 3, 6, 7], target = 0",
            "expected": "[3, 3, 5, 5, 6, 7]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 3, -1, -3, 5, 3, 6, 7]|3",
            "expected": "[3, 3, 5, 5, 6, 7]"
      },
      {
            "id": "h2",
            "input": "[1, 3, -1, -3, 5, 3, 6, 7]|0",
            "expected": "[3, 3, 5, 5, 6, 7]"
      },
      {
            "id": "h3",
            "input": "[1, 3, -1, -3, 5, 3, 6, 7]|1",
            "expected": "[3, 3, 5, 5, 6, 7]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] slidingWindowMaximumDeque(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def slidingWindowMaximumDeque(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 120,
    title: "Circular Queue Buffer Engine",
    slug: "circular-queue-buffer-engine",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 75,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Implement circular FIFO buffer with fixed capacity supporting enQueue and deQueue in O(1).\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 3, target = [1, 2, 3]",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 3, target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "3|[1, 2, 3]",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "3|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "3|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean circularQueueBufferEngine(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def circularQueueBufferEngine(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 121,
    title: "Recent Ping Call Counter",
    slug: "recent-ping-call-counter",
    difficulty: "Easy",
    topics: ["Queue"],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Count total request timestamps received within the preceding 3000 millisecond window.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 100, 3001, 3002]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 100, 3001, 3002]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 100, 3001, 3002]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[1, 100, 3001, 3002]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[1, 100, 3001, 3002]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int recentPingCallCounter(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def recentPingCallCounter(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 122,
    title: "First Unique Character In Stream",
    slug: "first-unique-character-in-stream",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 54,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the first non-repeating character observed in a dynamic stream of characters.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aabcc\"",
            "expected": "'b'",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aabcc\"",
            "expected": "'b'",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aabcc\"",
            "expected": "'b'"
      },
      {
            "id": "h2",
            "input": "\"aabcc\"",
            "expected": "'b'"
      },
      {
            "id": "h3",
            "input": "\"aabcc\"",
            "expected": "'b'"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int firstUniqueCharacterInStream(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def firstUniqueCharacterInStream(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 123,
    title: "Ticket Buying Time Tally",
    slug: "ticket-buying-time-tally",
    difficulty: "Easy",
    topics: ["Queue"],
    acceptanceRate: 45,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate seconds needed for person at index k to finish purchasing all their tickets in FIFO queue.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 3, 2], target = 2",
            "expected": "6",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 3, 2], target = 0",
            "expected": "6",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 3, 2]|2",
            "expected": "6"
      },
      {
            "id": "h2",
            "input": "[2, 3, 2]|0",
            "expected": "6"
      },
      {
            "id": "h3",
            "input": "[2, 3, 2]|1",
            "expected": "6"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int ticketBuyingTimeTally(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def ticketBuyingTimeTally(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 124,
    title: "CPU Task Scheduler Cooling Delay",
    slug: "cpu-task-scheduler-cooling-delay",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 78,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine the least number of intervals CPU takes to finish all tasks with cooldown n between identical tasks.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], target = 2",
            "expected": "8",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], target = 0",
            "expected": "8",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]|2",
            "expected": "8"
      },
      {
            "id": "h2",
            "input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]|0",
            "expected": "8"
      },
      {
            "id": "h3",
            "input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]|1",
            "expected": "8"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int cpuTaskSchedulerCoolingDelay(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def cpuTaskSchedulerCoolingDelay(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 125,
    title: "Shortest Subarray Sum At Least K",
    slug: "shortest-subarray-sum-at-least-k",
    difficulty: "Hard",
    topics: ["Queue"],
    acceptanceRate: 63,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the length of the shortest non-empty contiguous subarray whose sum is at least k.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, -1, 2], target = 3",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, -1, 2], target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, -1, 2]|3",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[2, -1, 2]|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[2, -1, 2]|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int shortestSubarraySumAtLeastK(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def shortestSubarraySumAtLeastK(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 126,
    title: "Gas Station Circuit Verification",
    slug: "gas-station-circuit-verification",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 57,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine starting station to travel full circle along gas route without running out of fuel.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5], target = [3, 4, 5, 1, 2]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5], target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5]|[3, 4, 5, 1, 2]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5]|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5]|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int gasStationCircuitVerification(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def gasStationCircuitVerification(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 127,
    title: "Reorder Queue By Height Attributes",
    slug: "reorder-queue-by-height-attributes",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 55,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Reconstruct queue based on height h and count k of taller people in front.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
            "expected": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
            "expected": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
            "expected": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]"
      },
      {
            "id": "h2",
            "input": "[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
            "expected": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]"
      },
      {
            "id": "h3",
            "input": "[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
            "expected": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int reorderQueueByHeightAttributes(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def reorderQueueByHeightAttributes(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 128,
    title: "Dota2 Senate Radiant Dire Ban",
    slug: "dota2-senate-radiant-dire-ban",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 70,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Predict victorious faction in Dota2 Senate voting where senators ban next opposing vote.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"RD\"",
            "expected": "\"Radiant\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"RD\"",
            "expected": "\"Radiant\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"RD\"",
            "expected": "\"Radiant\""
      },
      {
            "id": "h2",
            "input": "\"RD\"",
            "expected": "\"Radiant\""
      },
      {
            "id": "h3",
            "input": "\"RD\"",
            "expected": "\"Radiant\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String dota2SenateRadiantDireBan(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def dota2SenateRadiantDireBan(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 129,
    title: "Design Double Ended Circular Deque",
    slug: "design-double-ended-circular-deque",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 71,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Implement double-ended queue supporting insertion and deletion from both ends in O(1).\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 3",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 3",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "3",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "3",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "3",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean designDoubleEndedCircularDeque(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def designDoubleEndedCircularDeque(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 130,
    title: "Moving Average From Data Stream",
    slug: "moving-average-from-data-stream",
    difficulty: "Easy",
    topics: ["Queue"],
    acceptanceRate: 78,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate the moving average of all integers in the sliding window of size size.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 10, 3, 5], target = 3",
            "expected": "6.0",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 10, 3, 5], target = 0",
            "expected": "6.0",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 10, 3, 5]|3",
            "expected": "6.0"
      },
      {
            "id": "h2",
            "input": "[1, 10, 3, 5]|0",
            "expected": "6.0"
      },
      {
            "id": "h3",
            "input": "[1, 10, 3, 5]|1",
            "expected": "6.0"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public double movingAverageFromDataStream(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def movingAverageFromDataStream(self, nums: List[int]) -> float:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 131,
    title: "Continuous Subarray Max Min Diff",
    slug: "continuous-subarray-max-min-diff",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 62,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the longest continuous subarray where absolute difference between any two elements is <= limit.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [8, 2, 4, 7], target = 4",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [8, 2, 4, 7], target = 0",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[8, 2, 4, 7]|4",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[8, 2, 4, 7]|0",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[8, 2, 4, 7]|1",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int continuousSubarrayMaxMinDiff(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def continuousSubarrayMaxMinDiff(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 132,
    title: "Constrained Subsequence Sum Deque",
    slug: "constrained-subsequence-sum-deque",
    difficulty: "Hard",
    topics: ["Queue"],
    acceptanceRate: 66,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Maximize sum of non-empty subsequence such that adjacent indices differ by at most k.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [10, 2, -10, 5, 20], target = 2",
            "expected": "37",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [10, 2, -10, 5, 20], target = 0",
            "expected": "37",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[10, 2, -10, 5, 20]|2",
            "expected": "37"
      },
      {
            "id": "h2",
            "input": "[10, 2, -10, 5, 20]|0",
            "expected": "37"
      },
      {
            "id": "h3",
            "input": "[10, 2, -10, 5, 20]|1",
            "expected": "37"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int constrainedSubsequenceSumDeque(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def constrainedSubsequenceSumDeque(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 133,
    title: "Sliding Subarray Beauty Count",
    slug: "sliding-subarray-beauty-count",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 48,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "For each subarray of size k, find the x-th smallest integer if negative, otherwise 0.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, -1, -3, -2, 3], target = 3",
            "expected": "[-1, -2, -2]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, -1, -3, -2, 3], target = 0",
            "expected": "[-1, -2, -2]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, -1, -3, -2, 3]|3",
            "expected": "[-1, -2, -2]"
      },
      {
            "id": "h2",
            "input": "[1, -1, -3, -2, 3]|0",
            "expected": "[-1, -2, -2]"
      },
      {
            "id": "h3",
            "input": "[1, -1, -3, -2, 3]|1",
            "expected": "[-1, -2, -2]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] slidingSubarrayBeautyCount(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def slidingSubarrayBeautyCount(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 134,
    title: "Cards Reveal Increasing Order Queue",
    slug: "cards-reveal-increasing-order-queue",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 69,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Order deck of cards so that drawing top card and putting next to bottom reveals cards in sorted order.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [17, 13, 11, 2, 3, 5, 7]",
            "expected": "[2, 13, 3, 11, 5, 17, 7]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [17, 13, 11, 2, 3, 5, 7]",
            "expected": "[2, 13, 3, 11, 5, 17, 7]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[17, 13, 11, 2, 3, 5, 7]",
            "expected": "[2, 13, 3, 11, 5, 17, 7]"
      },
      {
            "id": "h2",
            "input": "[17, 13, 11, 2, 3, 5, 7]",
            "expected": "[2, 13, 3, 11, 5, 17, 7]"
      },
      {
            "id": "h3",
            "input": "[17, 13, 11, 2, 3, 5, 7]",
            "expected": "[2, 13, 3, 11, 5, 17, 7]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] cardsRevealIncreasingOrderQueue(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def cardsRevealIncreasingOrderQueue(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 135,
    title: "Jump Game VI Maximum Points",
    slug: "jump-game-vi-maximum-points",
    difficulty: "Medium",
    topics: ["Queue"],
    acceptanceRate: 72,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Reach the last index of array taking jumps up to size k, maximizing sum of visited indices.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, -1, -2, 4, -7, 3], target = 2",
            "expected": "7",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, -1, -2, 4, -7, 3], target = 0",
            "expected": "7",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, -1, -2, 4, -7, 3]|2",
            "expected": "7"
      },
      {
            "id": "h2",
            "input": "[1, -1, -2, 4, -7, 3]|0",
            "expected": "7"
      },
      {
            "id": "h3",
            "input": "[1, -1, -2, 4, -7, 3]|1",
            "expected": "7"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int jumpGameViMaximumPoints(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def jumpGameViMaximumPoints(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["FIFO","Sliding Window Deque","Circular Buffer"],
  },

  {
    id: 136,
    title: "Invert Binary Tree Structure",
    slug: "invert-binary-tree-structure",
    difficulty: "Easy",
    topics: ["Trees"],
    acceptanceRate: 71,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Invert a binary tree so that each node has its left and right children swapped recursively.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 2, 7, 1, 3, 6, 9]",
            "expected": "[4, 7, 2, 9, 6, 3, 1]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 2, 7, 1, 3, 6, 9]",
            "expected": "[4, 7, 2, 9, 6, 3, 1]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 2, 7, 1, 3, 6, 9]",
            "expected": "[4, 7, 2, 9, 6, 3, 1]"
      },
      {
            "id": "h2",
            "input": "[4, 2, 7, 1, 3, 6, 9]",
            "expected": "[4, 7, 2, 9, 6, 3, 1]"
      },
      {
            "id": "h3",
            "input": "[4, 2, 7, 1, 3, 6, 9]",
            "expected": "[4, 7, 2, 9, 6, 3, 1]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] invertBinaryTreeStructure(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def invertBinaryTreeStructure(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 137,
    title: "Binary Tree Right Lateral View",
    slug: "binary-tree-right-lateral-view",
    difficulty: "Medium",
    topics: ["Trees"],
    acceptanceRate: 52,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Collect the node values that are visible when viewing a binary tree from the right side.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, null, 5, null, 4]",
            "expected": "[1, 3, 4]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, null, 5, null, 4]",
            "expected": "[1, 3, 4]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, null, 5, null, 4]",
            "expected": "[1, 3, 4]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, null, 5, null, 4]",
            "expected": "[1, 3, 4]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, null, 5, null, 4]",
            "expected": "[1, 3, 4]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] binaryTreeRightLateralView(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def binaryTreeRightLateralView(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 138,
    title: "Validate Binary Search Tree Inorder",
    slug: "validate-binary-search-tree-inorder",
    difficulty: "Medium",
    topics: ["Trees"],
    acceptanceRate: 64,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine whether a given binary tree satisfies strict binary search tree ordering constraints.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 1, 3]",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 1, 3]",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 1, 3]",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[2, 1, 3]",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[2, 1, 3]",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean validateBinarySearchTreeInorder(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def validateBinarySearchTreeInorder(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 139,
    title: "Diameter Of Binary Tree Spanning",
    slug: "diameter-of-binary-tree-spanning",
    difficulty: "Easy",
    topics: ["Trees"],
    acceptanceRate: 62,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compute the length of the longest path between any two nodes in a tree, measured by edge count.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int diameterOfBinaryTreeSpanning(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def diameterOfBinaryTreeSpanning(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 140,
    title: "Kth Smallest Element In BST Order",
    slug: "kth-smallest-element-in-bst-order",
    difficulty: "Medium",
    topics: ["Trees"],
    acceptanceRate: 68,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the kth smallest value among all nodes in a binary search tree using inorder traversal.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 1, 4, null, 2], target = 1",
            "expected": "1",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 1, 4, null, 2], target = 0",
            "expected": "1",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 1, 4, null, 2]|1",
            "expected": "1"
      },
      {
            "id": "h2",
            "input": "[3, 1, 4, null, 2]|0",
            "expected": "1"
      },
      {
            "id": "h3",
            "input": "[3, 1, 4, null, 2]|1",
            "expected": "1"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int kthSmallestElementInBstOrder(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def kthSmallestElementInBstOrder(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 141,
    title: "Construct Tree From Preorder Inorder",
    slug: "construct-tree-from-preorder-inorder",
    difficulty: "Medium",
    topics: ["Trees"],
    acceptanceRate: 64,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Reconstruct a complete binary tree given its preorder and inorder traversal arrays.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 9, 20, 15, 7], target = [9, 3, 15, 20, 7]",
            "expected": "[3, 9, 20, 15, 7]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 9, 20, 15, 7], target = 0",
            "expected": "[3, 9, 20, 15, 7]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 9, 20, 15, 7]|[9, 3, 15, 20, 7]",
            "expected": "[3, 9, 20, 15, 7]"
      },
      {
            "id": "h2",
            "input": "[3, 9, 20, 15, 7]|0",
            "expected": "[3, 9, 20, 15, 7]"
      },
      {
            "id": "h3",
            "input": "[3, 9, 20, 15, 7]|1",
            "expected": "[3, 9, 20, 15, 7]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] constructTreeFromPreorderInorder(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def constructTreeFromPreorderInorder(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 142,
    title: "Binary Tree Maximum Path Sum Ever",
    slug: "binary-tree-maximum-path-sum-ever",
    difficulty: "Hard",
    topics: ["Trees"],
    acceptanceRate: 55,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the maximum path sum of any non-empty path connecting nodes in a binary tree.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [-10, 9, 20, null, null, 15, 7]",
            "expected": "42",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [-10, 9, 20, null, null, 15, 7]",
            "expected": "42",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[-10, 9, 20, null, null, 15, 7]",
            "expected": "42"
      },
      {
            "id": "h2",
            "input": "[-10, 9, 20, null, null, 15, 7]",
            "expected": "42"
      },
      {
            "id": "h3",
            "input": "[-10, 9, 20, null, null, 15, 7]",
            "expected": "42"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int binaryTreeMaximumPathSumEver(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def binaryTreeMaximumPathSumEver(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 143,
    title: "Subtree Identification Check",
    slug: "subtree-identification-check",
    difficulty: "Easy",
    topics: ["Trees"],
    acceptanceRate: 79,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Verify if a tree contains a subtree with identical structure and node values as a given pattern tree.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 4, 5, 1, 2], target = [4, 1, 2]",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 4, 5, 1, 2], target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 4, 5, 1, 2]|[4, 1, 2]",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[3, 4, 5, 1, 2]|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[3, 4, 5, 1, 2]|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean subtreeIdentificationCheck(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def subtreeIdentificationCheck(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 144,
    title: "Count Good Nodes Ancestor Bound",
    slug: "count-good-nodes-ancestor-bound",
    difficulty: "Medium",
    topics: ["Trees"],
    acceptanceRate: 50,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Count nodes where no node on the path from root has a greater value than the node itself.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 1, 4, 3, null, 1, 5]",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 1, 4, 3, null, 1, 5]",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 1, 4, 3, null, 1, 5]",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[3, 1, 4, 3, null, 1, 5]",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[3, 1, 4, 3, null, 1, 5]",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int countGoodNodesAncestorBound(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def countGoodNodesAncestorBound(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 145,
    title: "All Root To Leaf Sum Paths",
    slug: "all-root-to-leaf-sum-paths",
    difficulty: "Medium",
    topics: ["Trees"],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find all distinct paths from root to leaf where the sum of node values matches target sum.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], target = 22",
            "expected": "[[5, 4, 11, 2], [5, 8, 4, 5]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], target = 0",
            "expected": "[[5, 4, 11, 2], [5, 8, 4, 5]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]|22",
            "expected": "[[5, 4, 11, 2], [5, 8, 4, 5]]"
      },
      {
            "id": "h2",
            "input": "[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]|0",
            "expected": "[[5, 4, 11, 2], [5, 8, 4, 5]]"
      },
      {
            "id": "h3",
            "input": "[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]|1",
            "expected": "[[5, 4, 11, 2], [5, 8, 4, 5]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int allRootToLeafSumPaths(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def allRootToLeafSumPaths(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 146,
    title: "Flatten Tree To Right Skewed List",
    slug: "flatten-tree-to-right-skewed-list",
    difficulty: "Medium",
    topics: ["Trees"],
    acceptanceRate: 67,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Flatten a binary tree into a right-linked list following the preorder traversal order.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 5, 3, 4, null, 6]",
            "expected": "[1, 2, 3, 4, 5, 6]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 5, 3, 4, null, 6]",
            "expected": "[1, 2, 3, 4, 5, 6]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 5, 3, 4, null, 6]",
            "expected": "[1, 2, 3, 4, 5, 6]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 5, 3, 4, null, 6]",
            "expected": "[1, 2, 3, 4, 5, 6]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 5, 3, 4, null, 6]",
            "expected": "[1, 2, 3, 4, 5, 6]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] flattenTreeToRightSkewedList(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def flattenTreeToRightSkewedList(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 147,
    title: "Vertical Order Traversal Ordering",
    slug: "vertical-order-traversal-ordering",
    difficulty: "Hard",
    topics: ["Trees"],
    acceptanceRate: 46,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Traverse binary tree vertically column-by-column, ordered top-to-bottom and by value on ties.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 9, 20, null, null, 15, 7]",
            "expected": "[[9], [3, 15], [20], [7]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 9, 20, null, null, 15, 7]",
            "expected": "[[9], [3, 15], [20], [7]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 9, 20, null, null, 15, 7]",
            "expected": "[[9], [3, 15], [20], [7]]"
      },
      {
            "id": "h2",
            "input": "[3, 9, 20, null, null, 15, 7]",
            "expected": "[[9], [3, 15], [20], [7]]"
      },
      {
            "id": "h3",
            "input": "[3, 9, 20, null, null, 15, 7]",
            "expected": "[[9], [3, 15], [20], [7]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int verticalOrderTraversalOrdering(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def verticalOrderTraversalOrdering(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 148,
    title: "Lowest Common Ancestor Binary Tree",
    slug: "lowest-common-ancestor-binary-tree",
    difficulty: "Medium",
    topics: ["Trees"],
    acceptanceRate: 68,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the deepest node that has both node p and node q as descendants in a general binary tree.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 5, 1, 6, 2, 0, 8], target = 5, 1",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 5, 1, 6, 2, 0, 8], target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 5, 1, 6, 2, 0, 8]|5, 1",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[3, 5, 1, 6, 2, 0, 8]|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[3, 5, 1, 6, 2, 0, 8]|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int lowestCommonAncestorBinaryTree(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def lowestCommonAncestorBinaryTree(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 149,
    title: "Maximum Width Of Binary Tree Level",
    slug: "maximum-width-of-binary-tree-level",
    difficulty: "Medium",
    topics: ["Trees"],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compute the maximum width of the tree, defined as max distance between leftmost and rightmost nodes.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 3, 2, 5, 3, null, 9]",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 3, 2, 5, 3, null, 9]",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 3, 2, 5, 3, null, 9]",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[1, 3, 2, 5, 3, null, 9]",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[1, 3, 2, 5, 3, null, 9]",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maximumWidthOfBinaryTreeLevel(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maximumWidthOfBinaryTreeLevel(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 150,
    title: "Binary Tree Camera Minimum Placement",
    slug: "binary-tree-camera-minimum-placement",
    difficulty: "Hard",
    topics: ["Trees"],
    acceptanceRate: 48,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Determine minimum cameras required to monitor all nodes where each camera covers parent and children.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [0, 0, null, 0, 0]",
            "expected": "1",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [0, 0, null, 0, 0]",
            "expected": "1",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[0, 0, null, 0, 0]",
            "expected": "1"
      },
      {
            "id": "h2",
            "input": "[0, 0, null, 0, 0]",
            "expected": "1"
      },
      {
            "id": "h3",
            "input": "[0, 0, null, 0, 0]",
            "expected": "1"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int binaryTreeCameraMinimumPlacement(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def binaryTreeCameraMinimumPlacement(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 151,
    title: "Sum Root To Leaf Binary Numbers",
    slug: "sum-root-to-leaf-binary-numbers",
    difficulty: "Easy",
    topics: ["Trees"],
    acceptanceRate: 58,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Sum all numbers formed by root-to-leaf paths where each step represents a binary bit.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 0, 1, 0, 1, 0, 1]",
            "expected": "22",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 0, 1, 0, 1, 0, 1]",
            "expected": "22",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 0, 1, 0, 1, 0, 1]",
            "expected": "22"
      },
      {
            "id": "h2",
            "input": "[1, 0, 1, 0, 1, 0, 1]",
            "expected": "22"
      },
      {
            "id": "h3",
            "input": "[1, 0, 1, 0, 1, 0, 1]",
            "expected": "22"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int sumRootToLeafBinaryNumbers(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def sumRootToLeafBinaryNumbers(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 152,
    title: "Recover Swapped Nodes In BST",
    slug: "recover-swapped-nodes-in-bst",
    difficulty: "Medium",
    topics: ["Trees"],
    acceptanceRate: 69,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Identify and fix two nodes of a BST that were mistakenly swapped without changing tree structure.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 3, null, null, 2]",
            "expected": "[3, 1, null, null, 2]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 3, null, null, 2]",
            "expected": "[3, 1, null, null, 2]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 3, null, null, 2]",
            "expected": "[3, 1, null, null, 2]"
      },
      {
            "id": "h2",
            "input": "[1, 3, null, null, 2]",
            "expected": "[3, 1, null, null, 2]"
      },
      {
            "id": "h3",
            "input": "[1, 3, null, null, 2]",
            "expected": "[3, 1, null, null, 2]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] recoverSwappedNodesInBst(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def recoverSwappedNodesInBst(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Recursion","Inorder","Preorder"],
  },

  {
    id: 153,
    title: "Rotting Oranges Minute Tally",
    slug: "rotting-oranges-minute-tally",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 58,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate minutes until all fresh oranges rot given multi-source spreading in a 2D grid.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[2, 1, 1], [1, 1, 0], [0, 1, 1]]",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[2, 1, 1], [1, 1, 0], [0, 1, 1]]",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[2, 1, 1], [1, 1, 0], [0, 1, 1]]",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[[2, 1, 1], [1, 1, 0], [0, 1, 1]]",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[[2, 1, 1], [1, 1, 0], [0, 1, 1]]",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int rottingOrangesMinuteTally(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def rottingOrangesMinuteTally(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 154,
    title: "Connected Province Components Count",
    slug: "connected-province-components-count",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 71,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find total number of disconnected provinces in an adjacency connectivity matrix.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 1, 0], [1, 1, 0], [0, 0, 1]]",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[[1, 1, 0], [1, 1, 0], [0, 0, 1]]",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[[1, 1, 0], [1, 1, 0], [0, 0, 1]]",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int connectedProvinceComponentsCount(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def connectedProvinceComponentsCount(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 155,
    title: "Course Prerequisite Schedule Order",
    slug: "course-prerequisite-schedule-order",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 70,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find a topological order in which courses must be taken to satisfy all prerequisites, or empty if impossible.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 4, target = [[1, 0], [2, 0], [3, 1], [3, 2]]",
            "expected": "[0, 2, 1, 3]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 4, target = 0",
            "expected": "[0, 2, 1, 3]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "4|[[1, 0], [2, 0], [3, 1], [3, 2]]",
            "expected": "[0, 2, 1, 3]"
      },
      {
            "id": "h2",
            "input": "4|0",
            "expected": "[0, 2, 1, 3]"
      },
      {
            "id": "h3",
            "input": "4|1",
            "expected": "[0, 2, 1, 3]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] coursePrerequisiteScheduleOrder(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def coursePrerequisiteScheduleOrder(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 156,
    title: "Network Delay Time Dijkstra Spread",
    slug: "network-delay-time-dijkstra-spread",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 57,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate the time for a network signal to reach all nodes from source k using shortest paths.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[2, 1, 1], [2, 3, 1], [3, 4, 1]], target = 4, 2",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[2, 1, 1], [2, 3, 1], [3, 4, 1]], target = 0",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[2, 1, 1], [2, 3, 1], [3, 4, 1]]|4, 2",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[[2, 1, 1], [2, 3, 1], [3, 4, 1]]|0",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[[2, 1, 1], [2, 3, 1], [3, 4, 1]]|1",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int networkDelayTimeDijkstraSpread(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def networkDelayTimeDijkstraSpread(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 157,
    title: "Clone Undirected Graph Node Map",
    slug: "clone-undirected-graph-node-map",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 66,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Create an exact deep copy clone of an undirected graph preserving all adjacency edges.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[2, 4], [1, 3], [2, 4], [1, 3]]",
            "expected": "[[2, 4], [1, 3], [2, 4], [1, 3]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[2, 4], [1, 3], [2, 4], [1, 3]]",
            "expected": "[[2, 4], [1, 3], [2, 4], [1, 3]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[2, 4], [1, 3], [2, 4], [1, 3]]",
            "expected": "[[2, 4], [1, 3], [2, 4], [1, 3]]"
      },
      {
            "id": "h2",
            "input": "[[2, 4], [1, 3], [2, 4], [1, 3]]",
            "expected": "[[2, 4], [1, 3], [2, 4], [1, 3]]"
      },
      {
            "id": "h3",
            "input": "[[2, 4], [1, 3], [2, 4], [1, 3]]",
            "expected": "[[2, 4], [1, 3], [2, 4], [1, 3]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int cloneUndirectedGraphNodeMap(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def cloneUndirectedGraphNodeMap(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 158,
    title: "Word Ladder Transformation Length",
    slug: "word-ladder-transformation-length",
    difficulty: "Hard",
    topics: ["Graphs"],
    acceptanceRate: 60,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find shortest length of transformation sequence from beginWord to endWord changing one char per step.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"hit\", target = \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
            "expected": "5",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"hit\", target = 0",
            "expected": "5",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"hit\"|\"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
            "expected": "5"
      },
      {
            "id": "h2",
            "input": "\"hit\"|0",
            "expected": "5"
      },
      {
            "id": "h3",
            "input": "\"hit\"|1",
            "expected": "5"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int wordLadderTransformationLength(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def wordLadderTransformationLength(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 159,
    title: "Pacific Atlantic Ocean Water Flow",
    slug: "pacific-atlantic-ocean-water-flow",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 53,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find all coordinate cells from which water can flow downhill to both the Pacific and Atlantic oceans.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1]]",
            "expected": "[[0, 4], [1, 3], [1, 4], [2, 2]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1]]",
            "expected": "[[0, 4], [1, 3], [1, 4], [2, 2]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1]]",
            "expected": "[[0, 4], [1, 3], [1, 4], [2, 2]]"
      },
      {
            "id": "h2",
            "input": "[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1]]",
            "expected": "[[0, 4], [1, 3], [1, 4], [2, 2]]"
      },
      {
            "id": "h3",
            "input": "[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1]]",
            "expected": "[[0, 4], [1, 3], [1, 4], [2, 2]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int pacificAtlanticOceanWaterFlow(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def pacificAtlanticOceanWaterFlow(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 160,
    title: "Town Judge Identification Query",
    slug: "town-judge-identification-query",
    difficulty: "Easy",
    topics: ["Graphs"],
    acceptanceRate: 77,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find town resident trusted by all other residents who trusts nobody in return.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 3, target = [[1, 3], [2, 3]]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 3, target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "3|[[1, 3], [2, 3]]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "3|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "3|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int townJudgeIdentificationQuery(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def townJudgeIdentificationQuery(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 161,
    title: "All Paths From Source To Destination",
    slug: "all-paths-from-source-to-destination",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 66,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Enumerate all unique acyclic paths leading from vertex 0 to vertex n - 1 in a DAG.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 2], [3], [3], []]",
            "expected": "[[0, 1, 3], [0, 2, 3]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 2], [3], [3], []]",
            "expected": "[[0, 1, 3], [0, 2, 3]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 2], [3], [3], []]",
            "expected": "[[0, 1, 3], [0, 2, 3]]"
      },
      {
            "id": "h2",
            "input": "[[1, 2], [3], [3], []]",
            "expected": "[[0, 1, 3], [0, 2, 3]]"
      },
      {
            "id": "h3",
            "input": "[[1, 2], [3], [3], []]",
            "expected": "[[0, 1, 3], [0, 2, 3]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int allPathsFromSourceToDestination(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def allPathsFromSourceToDestination(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 162,
    title: "Is Graph Bipartite 2-Color",
    slug: "is-graph-bipartite-2-color",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 54,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check if an undirected graph can be partitioned into two independent sets with no intra-set edges.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 3], [0, 2], [1, 3], [0, 2]]",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 3], [0, 2], [1, 3], [0, 2]]",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 3], [0, 2], [1, 3], [0, 2]]",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[[1, 3], [0, 2], [1, 3], [0, 2]]",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[[1, 3], [0, 2], [1, 3], [0, 2]]",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean isGraphBipartite2Color(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def isGraphBipartite2Color(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 163,
    title: "Critical Connections Tarjan Bridges",
    slug: "critical-connections-tarjan-bridges",
    difficulty: "Hard",
    topics: ["Graphs"],
    acceptanceRate: 49,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find all critical communication links whose removal increases the number of connected components.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 4, target = [[0, 1], [1, 2], [2, 0], [1, 3]]",
            "expected": "[[1, 3]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 4, target = 0",
            "expected": "[[1, 3]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "4|[[0, 1], [1, 2], [2, 0], [1, 3]]",
            "expected": "[[1, 3]]"
      },
      {
            "id": "h2",
            "input": "4|0",
            "expected": "[[1, 3]]"
      },
      {
            "id": "h3",
            "input": "4|1",
            "expected": "[[1, 3]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int criticalConnectionsTarjanBridges(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def criticalConnectionsTarjanBridges(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 164,
    title: "Minimum Vertices To Reach Entire Graph",
    slug: "minimum-vertices-to-reach-entire-graph",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 66,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the smallest subset of vertices from which every node in the directed graph is reachable.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 6, target = [[0, 1], [0, 2], [2, 5], [3, 4], [4, 2]]",
            "expected": "[0, 3]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 6, target = 0",
            "expected": "[0, 3]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "6|[[0, 1], [0, 2], [2, 5], [3, 4], [4, 2]]",
            "expected": "[0, 3]"
      },
      {
            "id": "h2",
            "input": "6|0",
            "expected": "[0, 3]"
      },
      {
            "id": "h3",
            "input": "6|1",
            "expected": "[0, 3]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] minimumVerticesToReachEntireGraph(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def minimumVerticesToReachEntireGraph(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 165,
    title: "Shortest Clear Path In Binary Grid",
    slug: "shortest-clear-path-in-binary-grid",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 76,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the length of the shortest 8-directional path through 0-cells from top-left to bottom-right.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[0, 0, 0], [1, 1, 0], [1, 1, 0]]",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[[0, 0, 0], [1, 1, 0], [1, 1, 0]]",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[[0, 0, 0], [1, 1, 0], [1, 1, 0]]",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int shortestClearPathInBinaryGrid(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def shortestClearPathInBinaryGrid(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 166,
    title: "Surrounded O Regions Inversion",
    slug: "surrounded-o-regions-inversion",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 47,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Capture all regions of O surrounded on 4 sides by X by flipping them into X.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
            "expected": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
            "expected": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
            "expected": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]"
      },
      {
            "id": "h2",
            "input": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
            "expected": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]"
      },
      {
            "id": "h3",
            "input": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
            "expected": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int surroundedORegionsInversion(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def surroundedORegionsInversion(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 167,
    title: "Cheapest Flights Within K Stops",
    slug: "cheapest-flights-within-k-stops",
    difficulty: "Medium",
    topics: ["Graphs"],
    acceptanceRate: 64,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the cheapest flight route from source to destination with at most k intermediate layovers.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 4, target = [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]]",
            "expected": "700",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 4, target = 0",
            "expected": "700",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "4|[[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]]",
            "expected": "700"
      },
      {
            "id": "h2",
            "input": "4|0",
            "expected": "700"
      },
      {
            "id": "h3",
            "input": "4|1",
            "expected": "700"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int cheapestFlightsWithinKStops(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def cheapestFlightsWithinKStops(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 168,
    title: "Flood Fill Connected Color Mask",
    slug: "flood-fill-connected-color-mask",
    difficulty: "Easy",
    topics: ["Graphs"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Recolor target pixel and all adjacent same-color pixels with a replacement color.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 1, 1], [1, 1, 0], [1, 0, 1]], target = 1, 1, 2",
            "expected": "[[2, 2, 2], [2, 2, 0], [2, 0, 1]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 1, 1], [1, 1, 0], [1, 0, 1]], target = 0",
            "expected": "[[2, 2, 2], [2, 2, 0], [2, 0, 1]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 1, 1], [1, 1, 0], [1, 0, 1]]|1, 1, 2",
            "expected": "[[2, 2, 2], [2, 2, 0], [2, 0, 1]]"
      },
      {
            "id": "h2",
            "input": "[[1, 1, 1], [1, 1, 0], [1, 0, 1]]|0",
            "expected": "[[2, 2, 2], [2, 2, 0], [2, 0, 1]]"
      },
      {
            "id": "h3",
            "input": "[[1, 1, 1], [1, 1, 0], [1, 0, 1]]|1",
            "expected": "[[2, 2, 2], [2, 2, 0], [2, 0, 1]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int floodFillConnectedColorMask(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def floodFillConnectedColorMask(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 169,
    title: "Swim In Rising Water Dijkstra Level",
    slug: "swim-in-rising-water-dijkstra-level",
    difficulty: "Hard",
    topics: ["Graphs"],
    acceptanceRate: 47,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the minimum time needed to swim from (0,0) to (n-1, n-1) as elevation levels rise with time.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[0, 2], [1, 3]]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[0, 2], [1, 3]]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[0, 2], [1, 3]]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[[0, 2], [1, 3]]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[[0, 2], [1, 3]]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int swimInRisingWaterDijkstraLevel(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def swimInRisingWaterDijkstraLevel(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["BFS","DFS","Dijkstra"],
  },

  {
    id: 170,
    title: "House Robber Street Optimization",
    slug: "house-robber-street-optimization",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Maximize loot stolen from houses along a street without looting any two adjacent houses.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 7, 9, 3, 1]",
            "expected": "12",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 7, 9, 3, 1]",
            "expected": "12",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 7, 9, 3, 1]",
            "expected": "12"
      },
      {
            "id": "h2",
            "input": "[2, 7, 9, 3, 1]",
            "expected": "12"
      },
      {
            "id": "h3",
            "input": "[2, 7, 9, 3, 1]",
            "expected": "12"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int houseRobberStreetOptimization(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def houseRobberStreetOptimization(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 171,
    title: "Coin Change Minimum Count",
    slug: "coin-change-minimum-count",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 62,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the fewest number of coins required to make up a given amount, or -1 if impossible.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 5], target = 11",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 5], target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 5]|11",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[1, 2, 5]|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[1, 2, 5]|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int coinChangeMinimumCount(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def coinChangeMinimumCount(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 172,
    title: "Longest Increasing Subsequence Length",
    slug: "longest-increasing-subsequence-length",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 69,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the length of the longest strictly increasing subsequence in an integer array in O(n log n).\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [10, 9, 2, 5, 3, 7, 101, 18]",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [10, 9, 2, 5, 3, 7, 101, 18]",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[10, 9, 2, 5, 3, 7, 101, 18]",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[10, 9, 2, 5, 3, 7, 101, 18]",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[10, 9, 2, 5, 3, 7, 101, 18]",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int longestIncreasingSubsequenceLength(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def longestIncreasingSubsequenceLength(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 173,
    title: "Partition Equal Subset Sum Check",
    slug: "partition-equal-subset-sum-check",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine whether array can be partitioned into two disjoint subsets with identical sums.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 5, 11, 5]",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 5, 11, 5]",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 5, 11, 5]",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[1, 5, 11, 5]",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[1, 5, 11, 5]",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean partitionEqualSubsetSumCheck(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def partitionEqualSubsetSumCheck(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 174,
    title: "Unique Paths Grid Traversals",
    slug: "unique-paths-grid-traversals",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 58,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate the total number of paths a robot can take moving only down and right in an m x n grid.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 3, target = 7",
            "expected": "28",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 3, target = 0",
            "expected": "28",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "3|7",
            "expected": "28"
      },
      {
            "id": "h2",
            "input": "3|0",
            "expected": "28"
      },
      {
            "id": "h3",
            "input": "3|1",
            "expected": "28"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int uniquePathsGridTraversals(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def uniquePathsGridTraversals(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 175,
    title: "Minimum Path Cost Grid Flow",
    slug: "minimum-path-cost-grid-flow",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 46,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the path from top-left to bottom-right of a matrix that minimizes total sum of cell values.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
            "expected": "7",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
            "expected": "7",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
            "expected": "7"
      },
      {
            "id": "h2",
            "input": "[[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
            "expected": "7"
      },
      {
            "id": "h3",
            "input": "[[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
            "expected": "7"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int minimumPathCostGridFlow(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def minimumPathCostGridFlow(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 176,
    title: "Edit Distance Minimum Operations",
    slug: "edit-distance-minimum-operations",
    difficulty: "Hard",
    topics: ["Dynamic Programming"],
    acceptanceRate: 73,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Compute the minimum number of insertions, deletions, and substitutions to convert word1 to word2.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"horse\", target = \"ros\"",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"horse\", target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"horse\"|\"ros\"",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "\"horse\"|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "\"horse\"|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int editDistanceMinimumOperations(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def editDistanceMinimumOperations(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 177,
    title: "Palindromic Substrings Total Count",
    slug: "palindromic-substrings-total-count",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Count the number of contiguous palindromic substrings within a string.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aaa\"",
            "expected": "6",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aaa\"",
            "expected": "6",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aaa\"",
            "expected": "6"
      },
      {
            "id": "h2",
            "input": "\"aaa\"",
            "expected": "6"
      },
      {
            "id": "h3",
            "input": "\"aaa\"",
            "expected": "6"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int palindromicSubstringsTotalCount(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def palindromicSubstringsTotalCount(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 178,
    title: "Maximal Square Binary Area",
    slug: "maximal-square-binary-area",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 46,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the area of the largest square containing only 1s in an m x n binary matrix.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maximalSquareBinaryArea(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maximalSquareBinaryArea(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 179,
    title: "Target Sum Expression Count",
    slug: "target-sum-expression-count",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 47,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Count the number of ways to assign + and - signs to integers so their evaluated sum equals target.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 1, 1, 1], target = 3",
            "expected": "5",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 1, 1, 1], target = 0",
            "expected": "5",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 1, 1, 1]|3",
            "expected": "5"
      },
      {
            "id": "h2",
            "input": "[1, 1, 1, 1, 1]|0",
            "expected": "5"
      },
      {
            "id": "h3",
            "input": "[1, 1, 1, 1, 1]|1",
            "expected": "5"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int targetSumExpressionCount(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def targetSumExpressionCount(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 180,
    title: "Burst Balloons Optimal Points",
    slug: "burst-balloons-optimal-points",
    difficulty: "Hard",
    topics: ["Dynamic Programming"],
    acceptanceRate: 54,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Maximize coins gained by strategically choosing the order in which to burst balloons.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 1, 5, 8]",
            "expected": "167",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 1, 5, 8]",
            "expected": "167",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 1, 5, 8]",
            "expected": "167"
      },
      {
            "id": "h2",
            "input": "[3, 1, 5, 8]",
            "expected": "167"
      },
      {
            "id": "h3",
            "input": "[3, 1, 5, 8]",
            "expected": "167"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int burstBalloonsOptimalPoints(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def burstBalloonsOptimalPoints(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 181,
    title: "Climbing Stairs Minimum Step Cost",
    slug: "climbing-stairs-minimum-step-cost",
    difficulty: "Easy",
    topics: ["Dynamic Programming"],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the minimum cost to climb to the top of a staircase where each step has a specified cost.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [10, 15, 20]",
            "expected": "15",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [10, 15, 20]",
            "expected": "15",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[10, 15, 20]",
            "expected": "15"
      },
      {
            "id": "h2",
            "input": "[10, 15, 20]",
            "expected": "15"
      },
      {
            "id": "h3",
            "input": "[10, 15, 20]",
            "expected": "15"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int climbingStairsMinimumStepCost(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def climbingStairsMinimumStepCost(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 182,
    title: "Interleaving String Composition Check",
    slug: "interleaving-string-composition-check",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 65,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check whether string s3 can be formed by interleaving the characters of s1 and s2.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aabcc\", target = \"dbbca\", \"aadbbcbcac\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aabcc\", target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aabcc\"|\"dbbca\", \"aadbbcbcac\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "\"aabcc\"|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "\"aabcc\"|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean interleavingStringCompositionCheck(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def interleavingStringCompositionCheck(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 183,
    title: "Stock With Cooldown Transactions",
    slug: "stock-with-cooldown-transactions",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    acceptanceRate: 51,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Maximize profit buying and selling stock with unlimited transactions with a 1-day cooldown after selling.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 0, 2]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 0, 2]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 0, 2]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 0, 2]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 0, 2]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int stockWithCooldownTransactions(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def stockWithCooldownTransactions(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 184,
    title: "Russian Doll Envelopes Chain",
    slug: "russian-doll-envelopes-chain",
    difficulty: "Hard",
    topics: ["Dynamic Programming"],
    acceptanceRate: 71,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the maximum number of envelopes you can nest inside one another based on width and height.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[5, 4], [6, 4], [6, 7], [2, 3]]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[5, 4], [6, 4], [6, 7], [2, 3]]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[5, 4], [6, 4], [6, 7], [2, 3]]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[[5, 4], [6, 4], [6, 7], [2, 3]]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[[5, 4], [6, 4], [6, 7], [2, 3]]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int russianDollEnvelopesChain(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def russianDollEnvelopesChain(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 185,
    title: "Tribonacci Sequence Nth Value",
    slug: "tribonacci-sequence-nth-value",
    difficulty: "Easy",
    topics: ["Dynamic Programming"],
    acceptanceRate: 45,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compute the nth term in the Tribonacci sequence where each term is the sum of the preceding three.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 4",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 4",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "4",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "4",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "4",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int tribonacciSequenceNthValue(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def tribonacciSequenceNthValue(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 186,
    title: "Regular Expression Match DP Engine",
    slug: "regular-expression-match-dp-engine",
    difficulty: "Hard",
    topics: ["Dynamic Programming"],
    acceptanceRate: 72,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Determine whether string matches regex pattern supporting . (any) and * (zero or more) wildcards.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aa\", target = \"a*\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aa\", target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aa\"|\"a*\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "\"aa\"|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "\"aa\"|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean regularExpressionMatchDpEngine(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def regularExpressionMatchDpEngine(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Subproblems","Memoization","Tabulation"],
  },

  {
    id: 187,
    title: "Tower Of Hanoi Move Sequences",
    slug: "tower-of-hanoi-move-sequences",
    difficulty: "Medium",
    topics: ["Recursion"],
    acceptanceRate: 48,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate the minimum number of moves to transfer n disks between pegs without placing larger over smaller.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 3",
            "expected": "7",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 3",
            "expected": "7",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "3",
            "expected": "7"
      },
      {
            "id": "h2",
            "input": "3",
            "expected": "7"
      },
      {
            "id": "h3",
            "input": "3",
            "expected": "7"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int towerOfHanoiMoveSequences(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def towerOfHanoiMoveSequences(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 188,
    title: "Recursive Integer Exponentiation",
    slug: "recursive-integer-exponentiation",
    difficulty: "Medium",
    topics: ["Recursion"],
    acceptanceRate: 54,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compute x raised to the power n in logarithmic time using recursive binary exponentiation.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 2.0, target = 10",
            "expected": "1024.0",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 2.0, target = 0",
            "expected": "1024.0",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "2.0|10",
            "expected": "1024.0"
      },
      {
            "id": "h2",
            "input": "2.0|0",
            "expected": "1024.0"
      },
      {
            "id": "h3",
            "input": "2.0|1",
            "expected": "1024.0"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public double recursiveIntegerExponentiation(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def recursiveIntegerExponentiation(self, nums: List[int]) -> float:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 189,
    title: "Kth Symbol In Grammar Sequence",
    slug: "kth-symbol-in-grammar-sequence",
    difficulty: "Medium",
    topics: ["Recursion"],
    acceptanceRate: 75,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the kth symbol on row n of grammar table where 0 becomes 01 and 1 becomes 10.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 2, target = 2",
            "expected": "1",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 2, target = 0",
            "expected": "1",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "2|2",
            "expected": "1"
      },
      {
            "id": "h2",
            "input": "2|0",
            "expected": "1"
      },
      {
            "id": "h3",
            "input": "2|1",
            "expected": "1"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int kthSymbolInGrammarSequence(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def kthSymbolInGrammarSequence(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 190,
    title: "Power Of Three Recognition",
    slug: "power-of-three-recognition",
    difficulty: "Easy",
    topics: ["Recursion"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine recursively if an integer is a non-negative power of three.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 27",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 27",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "27",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "27",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "27",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean powerOfThreeRecognition(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def powerOfThreeRecognition(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 191,
    title: "Sum Of Digits Digital Root",
    slug: "sum-of-digits-digital-root",
    difficulty: "Easy",
    topics: ["Recursion"],
    acceptanceRate: 74,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Recursively sum the digits of a number until only a single digit remains.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 38",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 38",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "38",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "38",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "38",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int sumOfDigitsDigitalRoot(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def sumOfDigitsDigitalRoot(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 192,
    title: "Recursive Tree Traversal Inorder",
    slug: "recursive-tree-traversal-inorder",
    difficulty: "Easy",
    topics: ["Recursion"],
    acceptanceRate: 46,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Return the list of node values produced by an inorder depth-first recursive walk.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, null, 2, 3]",
            "expected": "[1, 3, 2]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, null, 2, 3]",
            "expected": "[1, 3, 2]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, null, 2, 3]",
            "expected": "[1, 3, 2]"
      },
      {
            "id": "h2",
            "input": "[1, null, 2, 3]",
            "expected": "[1, 3, 2]"
      },
      {
            "id": "h3",
            "input": "[1, null, 2, 3]",
            "expected": "[1, 3, 2]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] recursiveTreeTraversalInorder(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def recursiveTreeTraversalInorder(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 193,
    title: "Merge Two Sorted Recursive Lists",
    slug: "merge-two-sorted-recursive-lists",
    difficulty: "Easy",
    topics: ["Recursion"],
    acceptanceRate: 53,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Recursively combine two sorted singly linked lists into a unified sorted linked list.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 4], target = [1, 3, 4]",
            "expected": "[1, 1, 2, 3, 4, 4]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 4], target = 0",
            "expected": "[1, 1, 2, 3, 4, 4]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 4]|[1, 3, 4]",
            "expected": "[1, 1, 2, 3, 4, 4]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 4]|0",
            "expected": "[1, 1, 2, 3, 4, 4]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 4]|1",
            "expected": "[1, 1, 2, 3, 4, 4]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] mergeTwoSortedRecursiveLists(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def mergeTwoSortedRecursiveLists(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 194,
    title: "Predict The Game Winner Minimax",
    slug: "predict-the-game-winner-minimax",
    difficulty: "Medium",
    topics: ["Recursion"],
    acceptanceRate: 60,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine if player 1 can win picking numbers from ends of array under optimal play.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 5, 2]",
            "expected": "false",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 5, 2]",
            "expected": "false",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 5, 2]",
            "expected": "false"
      },
      {
            "id": "h2",
            "input": "[1, 5, 2]",
            "expected": "false"
      },
      {
            "id": "h3",
            "input": "[1, 5, 2]",
            "expected": "false"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean predictTheGameWinnerMinimax(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def predictTheGameWinnerMinimax(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 195,
    title: "Flatten Nested Integer List",
    slug: "flatten-nested-integer-list",
    difficulty: "Medium",
    topics: ["Recursion"],
    acceptanceRate: 58,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Flatten an arbitrarily deeply nested list of integers into a single flat array.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 1], 2, [1, 1]]",
            "expected": "[1, 1, 2, 1, 1]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 1], 2, [1, 1]]",
            "expected": "[1, 1, 2, 1, 1]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 1], 2, [1, 1]]",
            "expected": "[1, 1, 2, 1, 1]"
      },
      {
            "id": "h2",
            "input": "[[1, 1], 2, [1, 1]]",
            "expected": "[1, 1, 2, 1, 1]"
      },
      {
            "id": "h3",
            "input": "[[1, 1], 2, [1, 1]]",
            "expected": "[1, 1, 2, 1, 1]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] flattenNestedIntegerList(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def flattenNestedIntegerList(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 196,
    title: "Elimination Game Josephus Variant",
    slug: "elimination-game-josephus-variant",
    difficulty: "Medium",
    topics: ["Recursion"],
    acceptanceRate: 50,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the last remaining number when numbers 1 to n are alternately eliminated left-to-right and right-to-left.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 9",
            "expected": "6",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 9",
            "expected": "6",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "9",
            "expected": "6"
      },
      {
            "id": "h2",
            "input": "9",
            "expected": "6"
      },
      {
            "id": "h3",
            "input": "9",
            "expected": "6"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int eliminationGameJosephusVariant(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def eliminationGameJosephusVariant(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 197,
    title: "Fibonacci Number Calculation",
    slug: "fibonacci-number-calculation",
    difficulty: "Easy",
    topics: ["Recursion"],
    acceptanceRate: 47,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate the nth Fibonacci number using recursion with memoization.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 4",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 4",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "4",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "4",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "4",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int fibonacciNumberCalculation(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def fibonacciNumberCalculation(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 198,
    title: "Different Ways Add Parentheses",
    slug: "different-ways-add-parentheses",
    difficulty: "Medium",
    topics: ["Recursion"],
    acceptanceRate: 59,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compute all possible results from computing mathematical expression with all parenthesizations.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"2-1-1\"",
            "expected": "[0, 2]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"2-1-1\"",
            "expected": "[0, 2]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"2-1-1\"",
            "expected": "[0, 2]"
      },
      {
            "id": "h2",
            "input": "\"2-1-1\"",
            "expected": "[0, 2]"
      },
      {
            "id": "h3",
            "input": "\"2-1-1\"",
            "expected": "[0, 2]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] differentWaysAddParentheses(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def differentWaysAddParentheses(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 199,
    title: "Special Binary String Reversal",
    slug: "special-binary-string-reversal",
    difficulty: "Hard",
    topics: ["Recursion"],
    acceptanceRate: 75,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Recursively reorder adjacent balanced special binary strings to obtain lexicographically largest string.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"11011000\"",
            "expected": "\"11100100\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"11011000\"",
            "expected": "\"11100100\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"11011000\"",
            "expected": "\"11100100\""
      },
      {
            "id": "h2",
            "input": "\"11011000\"",
            "expected": "\"11100100\""
      },
      {
            "id": "h3",
            "input": "\"11011000\"",
            "expected": "\"11100100\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String specialBinaryStringReversal(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def specialBinaryStringReversal(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 200,
    title: "Decode String Bracket Repeats",
    slug: "decode-string-bracket-repeats",
    difficulty: "Medium",
    topics: ["Recursion"],
    acceptanceRate: 54,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Recursively expand encoded string formats containing bracket multipliers.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"3[a]2[bc]\"",
            "expected": "\"aaabcbc\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"3[a]2[bc]\"",
            "expected": "\"aaabcbc\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"3[a]2[bc]\"",
            "expected": "\"aaabcbc\""
      },
      {
            "id": "h2",
            "input": "\"3[a]2[bc]\"",
            "expected": "\"aaabcbc\""
      },
      {
            "id": "h3",
            "input": "\"3[a]2[bc]\"",
            "expected": "\"aaabcbc\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String decodeStringBracketRepeats(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def decodeStringBracketRepeats(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 201,
    title: "Parse Lisp Expression Evaluator",
    slug: "parse-lisp-expression-evaluator",
    difficulty: "Hard",
    topics: ["Recursion"],
    acceptanceRate: 52,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Evaluate a valid Lisp-formatted arithmetic and variable assignment expression.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"(let x 2 (mult x (let x 3 y 4 (add x y))))\"",
            "expected": "14",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"(let x 2 (mult x (let x 3 y 4 (add x y))))\"",
            "expected": "14",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"(let x 2 (mult x (let x 3 y 4 (add x y))))\"",
            "expected": "14"
      },
      {
            "id": "h2",
            "input": "\"(let x 2 (mult x (let x 3 y 4 (add x y))))\"",
            "expected": "14"
      },
      {
            "id": "h3",
            "input": "\"(let x 2 (mult x (let x 3 y 4 (add x y))))\"",
            "expected": "14"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int parseLispExpressionEvaluator(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def parseLispExpressionEvaluator(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 202,
    title: "Count Nodes Complete Binary Tree",
    slug: "count-nodes-complete-binary-tree",
    difficulty: "Easy",
    topics: ["Recursion"],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Count all nodes in a complete binary tree in faster than O(n) using recursive height checks.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5, 6]",
            "expected": "6",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5, 6]",
            "expected": "6",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5, 6]",
            "expected": "6"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5, 6]",
            "expected": "6"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5, 6]",
            "expected": "6"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int countNodesCompleteBinaryTree(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def countNodesCompleteBinaryTree(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 203,
    title: "Stickers To Spell Target Word",
    slug: "stickers-to-spell-target-word",
    difficulty: "Hard",
    topics: ["Recursion"],
    acceptanceRate: 55,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find minimum number of word sticker cutouts required to assemble the letters of target string.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [\"with\",\"example\",\"science\"], target = \"thehat\"",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [\"with\",\"example\",\"science\"], target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[\"with\",\"example\",\"science\"]|\"thehat\"",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[\"with\",\"example\",\"science\"]|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[\"with\",\"example\",\"science\"]|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int stickersToSpellTargetWord(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def stickersToSpellTargetWord(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Base Cases","Divide and Conquer","Call Stack"],
  },

  {
    id: 204,
    title: "Letter Combinations Phone Digits",
    slug: "letter-combinations-phone-digits",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 79,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Return all possible letter combinations on a phone keypad corresponding to given digits.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"23\"",
            "expected": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"23\"",
            "expected": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"23\"",
            "expected": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
      },
      {
            "id": "h2",
            "input": "\"23\"",
            "expected": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
      },
      {
            "id": "h3",
            "input": "\"23\"",
            "expected": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int letterCombinationsPhoneDigits(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def letterCombinationsPhoneDigits(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 205,
    title: "Generate Balanced Parentheses",
    slug: "generate-balanced-parentheses",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 72,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Generate all combinations of n pairs of balanced valid parentheses.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 3",
            "expected": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 3",
            "expected": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "3",
            "expected": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
            "id": "h2",
            "input": "3",
            "expected": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
            "id": "h3",
            "input": "3",
            "expected": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int generateBalancedParentheses(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def generateBalancedParentheses(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 206,
    title: "All Unique Integer Subsets",
    slug: "all-unique-integer-subsets",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 54,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Generate the complete power set of all unique subsets from an array of distinct integers.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3]",
            "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3]",
            "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3]",
            "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3]",
            "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3]",
            "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int allUniqueIntegerSubsets(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def allUniqueIntegerSubsets(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 207,
    title: "Combination Sum Unlimited Candidates",
    slug: "combination-sum-unlimited-candidates",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 65,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find all unique combinations summing to target where each candidate can be reused infinitely.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 3, 6, 7], target = 7",
            "expected": "[[2, 2, 3], [7]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 3, 6, 7], target = 0",
            "expected": "[[2, 2, 3], [7]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 3, 6, 7]|7",
            "expected": "[[2, 2, 3], [7]]"
      },
      {
            "id": "h2",
            "input": "[2, 3, 6, 7]|0",
            "expected": "[[2, 2, 3], [7]]"
      },
      {
            "id": "h3",
            "input": "[2, 3, 6, 7]|1",
            "expected": "[[2, 2, 3], [7]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int combinationSumUnlimitedCandidates(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def combinationSumUnlimitedCandidates(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 208,
    title: "N-Queens Non-Attacking Board",
    slug: "n-queens-non-attacking-board",
    difficulty: "Hard",
    topics: ["Backtracking"],
    acceptanceRate: 48,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Place n queens on an n x n chessboard such that no two queens share row, column, or diagonal.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 4",
            "expected": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 4",
            "expected": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "4",
            "expected": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]"
      },
      {
            "id": "h2",
            "input": "4",
            "expected": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]"
      },
      {
            "id": "h3",
            "input": "4",
            "expected": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int nQueensNonAttackingBoard(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def nQueensNonAttackingBoard(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 209,
    title: "Word Search In Matrix Grid",
    slug: "word-search-in-matrix-grid",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 57,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine whether a word exists along a contiguous horizontal/vertical path in a letter grid.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], target = \"ABCCED\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]|\"ABCCED\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean wordSearchInMatrixGrid(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def wordSearchInMatrixGrid(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 210,
    title: "Sudoku Board Grid Solver",
    slug: "sudoku-board-grid-solver",
    difficulty: "Hard",
    topics: ["Backtracking"],
    acceptanceRate: 75,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Complete the numbers on a 9 x 9 Sudoku board satisfying all row, col, and box constraints.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 5",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 5",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "5",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "5",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "5",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean sudokuBoardGridSolver(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def sudokuBoardGridSolver(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 211,
    title: "Permutations With Duplicate Entries",
    slug: "permutations-with-duplicate-entries",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 53,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Generate all distinct permutations from an array that contains duplicate numbers.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 2]",
            "expected": "[[1, 1, 2], [1, 2, 1], [2, 1, 1]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 2]",
            "expected": "[[1, 1, 2], [1, 2, 1], [2, 1, 1]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 2]",
            "expected": "[[1, 1, 2], [1, 2, 1], [2, 1, 1]]"
      },
      {
            "id": "h2",
            "input": "[1, 1, 2]",
            "expected": "[[1, 1, 2], [1, 2, 1], [2, 1, 1]]"
      },
      {
            "id": "h3",
            "input": "[1, 1, 2]",
            "expected": "[[1, 1, 2], [1, 2, 1], [2, 1, 1]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int permutationsWithDuplicateEntries(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def permutationsWithDuplicateEntries(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 212,
    title: "Palindrome Substring Partitions",
    slug: "palindrome-substring-partitions",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 67,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Partition a string into substrings where every individual substring is a palindrome.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aab\"",
            "expected": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aab\"",
            "expected": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aab\"",
            "expected": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]"
      },
      {
            "id": "h2",
            "input": "\"aab\"",
            "expected": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]"
      },
      {
            "id": "h3",
            "input": "\"aab\"",
            "expected": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int palindromeSubstringPartitions(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def palindromeSubstringPartitions(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 213,
    title: "Restore IP Addresses From String",
    slug: "restore-ip-addresses-from-string",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Generate all possible valid IPv4 addresses formed by placing dots within a numeric string.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"25525511135\"",
            "expected": "[\"255.255.11.135\",\"255.255.111.35\"]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"25525511135\"",
            "expected": "[\"255.255.11.135\",\"255.255.111.35\"]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"25525511135\"",
            "expected": "[\"255.255.11.135\",\"255.255.111.35\"]"
      },
      {
            "id": "h2",
            "input": "\"25525511135\"",
            "expected": "[\"255.255.11.135\",\"255.255.111.35\"]"
      },
      {
            "id": "h3",
            "input": "\"25525511135\"",
            "expected": "[\"255.255.11.135\",\"255.255.111.35\"]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int restoreIpAddressesFromString(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def restoreIpAddressesFromString(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 214,
    title: "Word Break II Reconstructed Sentences",
    slug: "word-break-ii-reconstructed-sentences",
    difficulty: "Hard",
    topics: ["Backtracking"],
    acceptanceRate: 77,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Construct all valid sentences from string s by inserting spaces using dictionary words.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"catsanddog\", target = [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
            "expected": "[\"cats and dog\",\"cat sand dog\"]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"catsanddog\", target = 0",
            "expected": "[\"cats and dog\",\"cat sand dog\"]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"catsanddog\"|[\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
            "expected": "[\"cats and dog\",\"cat sand dog\"]"
      },
      {
            "id": "h2",
            "input": "\"catsanddog\"|0",
            "expected": "[\"cats and dog\",\"cat sand dog\"]"
      },
      {
            "id": "h3",
            "input": "\"catsanddog\"|1",
            "expected": "[\"cats and dog\",\"cat sand dog\"]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int wordBreakIiReconstructedSentences(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def wordBreakIiReconstructedSentences(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 215,
    title: "Combinations K Of Numbers Range N",
    slug: "combinations-k-of-numbers-range-n",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 71,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Return all unique combinations of k numbers chosen from range 1 through n.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 4, target = 2",
            "expected": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 4, target = 0",
            "expected": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "4|2",
            "expected": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]"
      },
      {
            "id": "h2",
            "input": "4|0",
            "expected": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]"
      },
      {
            "id": "h3",
            "input": "4|1",
            "expected": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int combinationsKOfNumbersRangeN(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def combinationsKOfNumbersRangeN(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 216,
    title: "Matchsticks To Square Formation",
    slug: "matchsticks-to-square-formation",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 46,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine if matchsticks can be arranged into 4 equal sides forming a square without breaking.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 2, 2, 2]",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 2, 2, 2]",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 2, 2, 2]",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[1, 1, 2, 2, 2]",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[1, 1, 2, 2, 2]",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean matchsticksToSquareFormation(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def matchsticksToSquareFormation(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 217,
    title: "Unique Paths III Full Visit",
    slug: "unique-paths-iii-full-visit",
    difficulty: "Hard",
    topics: ["Backtracking"],
    acceptanceRate: 59,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find total paths from start to finish that step on every non-obstacle square exactly once.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, -1]]",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, -1]]",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, -1]]",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, -1]]",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, -1]]",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int uniquePathsIiiFullVisit(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def uniquePathsIiiFullVisit(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 218,
    title: "Split String Maximum Unique Substrings",
    slug: "split-string-maximum-unique-substrings",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Split string into the maximum number of unique non-empty substrings.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"ababccc\"",
            "expected": "5",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"ababccc\"",
            "expected": "5",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"ababccc\"",
            "expected": "5"
      },
      {
            "id": "h2",
            "input": "\"ababccc\"",
            "expected": "5"
      },
      {
            "id": "h3",
            "input": "\"ababccc\"",
            "expected": "5"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int splitStringMaximumUniqueSubstrings(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def splitStringMaximumUniqueSubstrings(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 219,
    title: "Subset Sum Target Verification",
    slug: "subset-sum-target-verification",
    difficulty: "Medium",
    topics: ["Backtracking"],
    acceptanceRate: 71,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check if any subset of integers sums exactly to target value.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 34, 4, 12, 5, 2], target = 9",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 34, 4, 12, 5, 2], target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 34, 4, 12, 5, 2]|9",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[3, 34, 4, 12, 5, 2]|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[3, 34, 4, 12, 5, 2]|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean subsetSumTargetVerification(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def subsetSumTargetVerification(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 220,
    title: "Permutation Sequence Kth Ranking",
    slug: "permutation-sequence-kth-ranking",
    difficulty: "Hard",
    topics: ["Backtracking"],
    acceptanceRate: 75,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the kth permutation in lexicographical order for numbers 1 to n.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 3, target = 3",
            "expected": "\"213\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 3, target = 0",
            "expected": "\"213\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "3|3",
            "expected": "\"213\""
      },
      {
            "id": "h2",
            "input": "3|0",
            "expected": "\"213\""
      },
      {
            "id": "h3",
            "input": "3|1",
            "expected": "\"213\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String permutationSequenceKthRanking(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def permutationSequenceKthRanking(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["State Tree","Pruning","Subsets"],
  },

  {
    id: 221,
    title: "Jump Game Reachability Check",
    slug: "jump-game-reachability-check",
    difficulty: "Medium",
    topics: ["Greedy"],
    acceptanceRate: 67,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine if you can reach the last index given maximum forward jump lengths at each position.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 3, 1, 1, 4]",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 3, 1, 1, 4]",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 3, 1, 1, 4]",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[2, 3, 1, 1, 4]",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[2, 3, 1, 1, 4]",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean jumpGameReachabilityCheck(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def jumpGameReachabilityCheck(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 222,
    title: "Minimum Jumps To Reach Array End",
    slug: "minimum-jumps-to-reach-array-end",
    difficulty: "Medium",
    topics: ["Greedy"],
    acceptanceRate: 77,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the minimum number of jumps needed to reach the last index of array.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 3, 1, 1, 4]",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 3, 1, 1, 4]",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 3, 1, 1, 4]",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[2, 3, 1, 1, 4]",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[2, 3, 1, 1, 4]",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int minimumJumpsToReachArrayEnd(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def minimumJumpsToReachArrayEnd(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 223,
    title: "Assign Cookies Content Children",
    slug: "assign-cookies-content-children",
    difficulty: "Easy",
    topics: ["Greedy"],
    acceptanceRate: 70,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Maximize the number of satisfied children given greed factors and cookie sizes.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3], target = [1, 1]",
            "expected": "1",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3], target = 0",
            "expected": "1",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3]|[1, 1]",
            "expected": "1"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3]|0",
            "expected": "1"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3]|1",
            "expected": "1"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int assignCookiesContentChildren(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def assignCookiesContentChildren(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 224,
    title: "Gas Station Full Circuit Starting Point",
    slug: "gas-station-full-circuit-starting-point",
    difficulty: "Medium",
    topics: ["Greedy"],
    acceptanceRate: 75,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the index of the gas station to start from to complete a circular route, or -1.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5], target = [3, 4, 5, 1, 2]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5], target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5]|[3, 4, 5, 1, 2]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5]|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5]|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int gasStationFullCircuitStartingPoint(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def gasStationFullCircuitStartingPoint(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 225,
    title: "Partition Labels Last Seen Index",
    slug: "partition-labels-last-seen-index",
    difficulty: "Medium",
    topics: ["Greedy"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Partition string so that every letter appears in at most one part, maximizing part count.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"ababcbacadefegdehijhklij\"",
            "expected": "[9, 7, 8]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"ababcbacadefegdehijhklij\"",
            "expected": "[9, 7, 8]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"ababcbacadefegdehijhklij\"",
            "expected": "[9, 7, 8]"
      },
      {
            "id": "h2",
            "input": "\"ababcbacadefegdehijhklij\"",
            "expected": "[9, 7, 8]"
      },
      {
            "id": "h3",
            "input": "\"ababcbacadefegdehijhklij\"",
            "expected": "[9, 7, 8]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] partitionLabelsLastSeenIndex(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def partitionLabelsLastSeenIndex(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 226,
    title: "Maximum Units Loaded On Truck",
    slug: "maximum-units-loaded-on-truck",
    difficulty: "Easy",
    topics: ["Greedy"],
    acceptanceRate: 50,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Maximize total units packed on a truck of capacity truckSize by prioritizing dense boxes.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 3], [2, 2], [3, 1]], target = 4",
            "expected": "8",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 3], [2, 2], [3, 1]], target = 0",
            "expected": "8",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 3], [2, 2], [3, 1]]|4",
            "expected": "8"
      },
      {
            "id": "h2",
            "input": "[[1, 3], [2, 2], [3, 1]]|0",
            "expected": "8"
      },
      {
            "id": "h3",
            "input": "[[1, 3], [2, 2], [3, 1]]|1",
            "expected": "8"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maximumUnitsLoadedOnTruck(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maximumUnitsLoadedOnTruck(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 227,
    title: "Non-Overlapping Intervals Removal",
    slug: "non-overlapping-intervals-removal",
    difficulty: "Medium",
    topics: ["Greedy"],
    acceptanceRate: 49,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find minimum intervals to remove so that the remaining intervals do not overlap.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 2], [2, 3], [3, 4], [1, 3]]",
            "expected": "1",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 2], [2, 3], [3, 4], [1, 3]]",
            "expected": "1",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 2], [2, 3], [3, 4], [1, 3]]",
            "expected": "1"
      },
      {
            "id": "h2",
            "input": "[[1, 2], [2, 3], [3, 4], [1, 3]]",
            "expected": "1"
      },
      {
            "id": "h3",
            "input": "[[1, 2], [2, 3], [3, 4], [1, 3]]",
            "expected": "1"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int nonOverlappingIntervalsRemoval(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def nonOverlappingIntervalsRemoval(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 228,
    title: "Candy Distribution Children Rating",
    slug: "candy-distribution-children-rating",
    difficulty: "Hard",
    topics: ["Greedy"],
    acceptanceRate: 52,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Distribute minimum total candies so children with higher ratings than neighbors receive more.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 0, 2]",
            "expected": "5",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 0, 2]",
            "expected": "5",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 0, 2]",
            "expected": "5"
      },
      {
            "id": "h2",
            "input": "[1, 0, 2]",
            "expected": "5"
      },
      {
            "id": "h3",
            "input": "[1, 0, 2]",
            "expected": "5"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int candyDistributionChildrenRating(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def candyDistributionChildrenRating(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 229,
    title: "Hand Of Straights Consecutive Groups",
    slug: "hand-of-straights-consecutive-groups",
    difficulty: "Medium",
    topics: ["Greedy"],
    acceptanceRate: 55,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check if cards can be grouped into hands of size groupSize composed of consecutive numbers.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 6, 2, 3, 4, 7, 8], target = 3",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 6, 2, 3, 4, 7, 8], target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 6, 2, 3, 4, 7, 8]|3",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 6, 2, 3, 4, 7, 8]|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 6, 2, 3, 4, 7, 8]|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean handOfStraightsConsecutiveGroups(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def handOfStraightsConsecutiveGroups(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 230,
    title: "Lemonade Stand Change Giving",
    slug: "lemonade-stand-change-giving",
    difficulty: "Easy",
    topics: ["Greedy"],
    acceptanceRate: 48,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine if you can provide accurate change to all customers in order paying with $5, $10, $20.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [5, 5, 5, 10, 20]",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [5, 5, 5, 10, 20]",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[5, 5, 5, 10, 20]",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[5, 5, 5, 10, 20]",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[5, 5, 5, 10, 20]",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean lemonadeStandChangeGiving(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def lemonadeStandChangeGiving(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 231,
    title: "Minimum Deletions Unique Frequency",
    slug: "minimum-deletions-unique-frequency",
    difficulty: "Medium",
    topics: ["Greedy"],
    acceptanceRate: 70,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Delete the fewest characters so that no two distinct characters have identical frequencies.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aab\"",
            "expected": "0",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aab\"",
            "expected": "0",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aab\"",
            "expected": "0"
      },
      {
            "id": "h2",
            "input": "\"aab\"",
            "expected": "0"
      },
      {
            "id": "h3",
            "input": "\"aab\"",
            "expected": "0"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int minimumDeletionsUniqueFrequency(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def minimumDeletionsUniqueFrequency(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 232,
    title: "Minimum Arrows To Burst Balloons",
    slug: "minimum-arrows-to-burst-balloons",
    difficulty: "Medium",
    topics: ["Greedy"],
    acceptanceRate: 55,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the minimum number of vertical arrows shot to burst all horizontal balloon intervals.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[10, 16], [2, 8], [1, 6], [7, 12]]",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[10, 16], [2, 8], [1, 6], [7, 12]]",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[10, 16], [2, 8], [1, 6], [7, 12]]",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[[10, 16], [2, 8], [1, 6], [7, 12]]",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[[10, 16], [2, 8], [1, 6], [7, 12]]",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int minimumArrowsToBurstBalloons(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def minimumArrowsToBurstBalloons(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 233,
    title: "Queue Reorder By Height In Front",
    slug: "queue-reorder-by-height-in-front",
    difficulty: "Medium",
    topics: ["Greedy"],
    acceptanceRate: 69,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Reconstruct queue where each entry represents height and count of taller people in front.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]",
            "expected": "[[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]",
            "expected": "[[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]",
            "expected": "[[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]]"
      },
      {
            "id": "h2",
            "input": "[[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]",
            "expected": "[[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]]"
      },
      {
            "id": "h3",
            "input": "[[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]",
            "expected": "[[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int queueReorderByHeightInFront(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def queueReorderByHeightInFront(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 234,
    title: "Patching Array Missing Range Sums",
    slug: "patching-array-missing-range-sums",
    difficulty: "Hard",
    topics: ["Greedy"],
    acceptanceRate: 55,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find minimum number of elements to insert so that any number from 1 to n can be formed.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 3], target = 6",
            "expected": "1",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 3], target = 0",
            "expected": "1",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 3]|6",
            "expected": "1"
      },
      {
            "id": "h2",
            "input": "[1, 3]|0",
            "expected": "1"
      },
      {
            "id": "h3",
            "input": "[1, 3]|1",
            "expected": "1"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int patchingArrayMissingRangeSums(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def patchingArrayMissingRangeSums(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 235,
    title: "Array Increasing Increments Minimum",
    slug: "array-increasing-increments-minimum",
    difficulty: "Easy",
    topics: ["Greedy"],
    acceptanceRate: 76,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find minimum increments needed so that each element is strictly greater than the previous.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 1]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 1]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 1]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[1, 1, 1]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[1, 1, 1]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int arrayIncreasingIncrementsMinimum(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def arrayIncreasingIncrementsMinimum(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 236,
    title: "Maximum Number Of Events Attended",
    slug: "maximum-number-of-events-attended",
    difficulty: "Medium",
    topics: ["Greedy"],
    acceptanceRate: 63,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find maximum events you can attend where each event spans [startDay, endDay] taking 1 day.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 2], [2, 3], [3, 4]]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 2], [2, 3], [3, 4]]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 2], [2, 3], [3, 4]]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[[1, 2], [2, 3], [3, 4]]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[[1, 2], [2, 3], [3, 4]]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maximumNumberOfEventsAttended(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maximumNumberOfEventsAttended(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 237,
    title: "Course Schedule III Greedy Deadline",
    slug: "course-schedule-iii-greedy-deadline",
    difficulty: "Hard",
    topics: ["Greedy"],
    acceptanceRate: 61,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Maximize courses taken where each course requires duration and must complete before lastDay.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int courseScheduleIiiGreedyDeadline(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def courseScheduleIiiGreedyDeadline(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Local Optimality","Activity Selection","Interval Scheduling"],
  },

  {
    id: 238,
    title: "Merge Overlapping Interval Pairs",
    slug: "merge-overlapping-interval-pairs",
    difficulty: "Medium",
    topics: ["Sorting"],
    acceptanceRate: 69,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Merge all contiguous or overlapping intervals into disjoint merged spans.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 3], [2, 6], [8, 10], [15, 18]]",
            "expected": "[[1, 6], [8, 10], [15, 18]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 3], [2, 6], [8, 10], [15, 18]]",
            "expected": "[[1, 6], [8, 10], [15, 18]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 3], [2, 6], [8, 10], [15, 18]]",
            "expected": "[[1, 6], [8, 10], [15, 18]]"
      },
      {
            "id": "h2",
            "input": "[[1, 3], [2, 6], [8, 10], [15, 18]]",
            "expected": "[[1, 6], [8, 10], [15, 18]]"
      },
      {
            "id": "h3",
            "input": "[[1, 3], [2, 6], [8, 10], [15, 18]]",
            "expected": "[[1, 6], [8, 10], [15, 18]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int mergeOverlappingIntervalPairs(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def mergeOverlappingIntervalPairs(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 239,
    title: "Sort Array Colors By Flag Parity",
    slug: "sort-array-colors-by-flag-parity",
    difficulty: "Medium",
    topics: ["Sorting"],
    acceptanceRate: 58,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Sort an array of 0s, 1s, and 2s in-place in a single pass using Dutch National Flag partitioning.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 0, 2, 1, 1, 0]",
            "expected": "[0, 0, 1, 1, 2, 2]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 0, 2, 1, 1, 0]",
            "expected": "[0, 0, 1, 1, 2, 2]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 0, 2, 1, 1, 0]",
            "expected": "[0, 0, 1, 1, 2, 2]"
      },
      {
            "id": "h2",
            "input": "[2, 0, 2, 1, 1, 0]",
            "expected": "[0, 0, 1, 1, 2, 2]"
      },
      {
            "id": "h3",
            "input": "[2, 0, 2, 1, 1, 0]",
            "expected": "[0, 0, 1, 1, 2, 2]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] sortArrayColorsByFlagParity(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def sortArrayColorsByFlagParity(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 240,
    title: "Height Checker Photo Mismatches",
    slug: "height-checker-photo-mismatches",
    difficulty: "Easy",
    topics: ["Sorting"],
    acceptanceRate: 78,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Count indices where actual heights differ from the expected non-decreasing sorted heights.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 4, 2, 1, 3]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 4, 2, 1, 3]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 4, 2, 1, 3]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[1, 1, 4, 2, 1, 3]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[1, 1, 4, 2, 1, 3]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int heightCheckerPhotoMismatches(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def heightCheckerPhotoMismatches(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 241,
    title: "Largest Number From Digits Formation",
    slug: "largest-number-from-digits-formation",
    difficulty: "Medium",
    topics: ["Sorting"],
    acceptanceRate: 60,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Arrange a list of non-negative integers so that they form the largest concatenated number.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [10, 2]",
            "expected": "\"210\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [10, 2]",
            "expected": "\"210\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[10, 2]",
            "expected": "\"210\""
      },
      {
            "id": "h2",
            "input": "[10, 2]",
            "expected": "\"210\""
      },
      {
            "id": "h3",
            "input": "[10, 2]",
            "expected": "\"210\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String largestNumberFromDigitsFormation(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def largestNumberFromDigitsFormation(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 242,
    title: "Sort Characters By Occurrence Count",
    slug: "sort-characters-by-occurrence-count",
    difficulty: "Medium",
    topics: ["Sorting"],
    acceptanceRate: 49,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Sort string characters in descending order based on their appearance frequency.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"tree\"",
            "expected": "\"eert\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"tree\"",
            "expected": "\"eert\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"tree\"",
            "expected": "\"eert\""
      },
      {
            "id": "h2",
            "input": "\"tree\"",
            "expected": "\"eert\""
      },
      {
            "id": "h3",
            "input": "\"tree\"",
            "expected": "\"eert\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String sortCharactersByOccurrenceCount(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def sortCharactersByOccurrenceCount(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 243,
    title: "Minimum Absolute Value Difference",
    slug: "minimum-absolute-value-difference",
    difficulty: "Easy",
    topics: ["Sorting"],
    acceptanceRate: 69,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find all pairs of numbers in sorted order that achieve the minimum absolute difference.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 2, 1, 3]",
            "expected": "[[1, 2], [2, 3], [3, 4]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 2, 1, 3]",
            "expected": "[[1, 2], [2, 3], [3, 4]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 2, 1, 3]",
            "expected": "[[1, 2], [2, 3], [3, 4]]"
      },
      {
            "id": "h2",
            "input": "[4, 2, 1, 3]",
            "expected": "[[1, 2], [2, 3], [3, 4]]"
      },
      {
            "id": "h3",
            "input": "[4, 2, 1, 3]",
            "expected": "[[1, 2], [2, 3], [3, 4]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int minimumAbsoluteValueDifference(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def minimumAbsoluteValueDifference(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 244,
    title: "Top K Frequent Elements Bucket Sort",
    slug: "top-k-frequent-elements-bucket-sort",
    difficulty: "Medium",
    topics: ["Sorting"],
    acceptanceRate: 64,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Return the k most frequent elements in array in better than O(n log n) time.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 1, 2, 2, 3], target = 2",
            "expected": "[1, 2]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 1, 2, 2, 3], target = 0",
            "expected": "[1, 2]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 1, 2, 2, 3]|2",
            "expected": "[1, 2]"
      },
      {
            "id": "h2",
            "input": "[1, 1, 1, 2, 2, 3]|0",
            "expected": "[1, 2]"
      },
      {
            "id": "h3",
            "input": "[1, 1, 1, 2, 2, 3]|1",
            "expected": "[1, 2]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] topKFrequentElementsBucketSort(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def topKFrequentElementsBucketSort(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 245,
    title: "Sort Array By Increasing Frequency",
    slug: "sort-array-by-increasing-frequency",
    difficulty: "Easy",
    topics: ["Sorting"],
    acceptanceRate: 49,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Sort array elements by frequency ascending, breaking ties by value descending.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 2, 2, 2, 3]",
            "expected": "[3, 1, 1, 2, 2, 2]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 2, 2, 2, 3]",
            "expected": "[3, 1, 1, 2, 2, 2]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 2, 2, 2, 3]",
            "expected": "[3, 1, 1, 2, 2, 2]"
      },
      {
            "id": "h2",
            "input": "[1, 1, 2, 2, 2, 3]",
            "expected": "[3, 1, 1, 2, 2, 2]"
      },
      {
            "id": "h3",
            "input": "[1, 1, 2, 2, 2, 3]",
            "expected": "[3, 1, 1, 2, 2, 2]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] sortArrayByIncreasingFrequency(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def sortArrayByIncreasingFrequency(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 246,
    title: "Insert Interval In Sorted Schedule",
    slug: "insert-interval-in-sorted-schedule",
    difficulty: "Medium",
    topics: ["Sorting"],
    acceptanceRate: 54,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Insert a new interval into an already sorted list of non-overlapping intervals and merge.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 3], [6, 9]], target = [2, 5]",
            "expected": "[[1, 5], [6, 9]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 3], [6, 9]], target = 0",
            "expected": "[[1, 5], [6, 9]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 3], [6, 9]]|[2, 5]",
            "expected": "[[1, 5], [6, 9]]"
      },
      {
            "id": "h2",
            "input": "[[1, 3], [6, 9]]|0",
            "expected": "[[1, 5], [6, 9]]"
      },
      {
            "id": "h3",
            "input": "[[1, 3], [6, 9]]|1",
            "expected": "[[1, 5], [6, 9]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int insertIntervalInSortedSchedule(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def insertIntervalInSortedSchedule(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 247,
    title: "Squares Of Sorted Array Merge",
    slug: "squares-of-sorted-array-merge",
    difficulty: "Easy",
    topics: ["Sorting"],
    acceptanceRate: 55,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compute and sort squares of numbers from a non-decreasing array in O(n) two-pointer time.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [-4, -1, 0, 3, 10]",
            "expected": "[0, 1, 9, 16, 100]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [-4, -1, 0, 3, 10]",
            "expected": "[0, 1, 9, 16, 100]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[-4, -1, 0, 3, 10]",
            "expected": "[0, 1, 9, 16, 100]"
      },
      {
            "id": "h2",
            "input": "[-4, -1, 0, 3, 10]",
            "expected": "[0, 1, 9, 16, 100]"
      },
      {
            "id": "h3",
            "input": "[-4, -1, 0, 3, 10]",
            "expected": "[0, 1, 9, 16, 100]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] squaresOfSortedArrayMerge(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def squaresOfSortedArrayMerge(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 248,
    title: "Maximum Gap In Sorted Sequence",
    slug: "maximum-gap-in-sorted-sequence",
    difficulty: "Hard",
    topics: ["Sorting"],
    acceptanceRate: 63,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the maximum difference between successive elements in array's sorted form in O(n) time.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 6, 9, 1]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 6, 9, 1]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 6, 9, 1]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[3, 6, 9, 1]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[3, 6, 9, 1]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maximumGapInSortedSequence(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maximumGapInSortedSequence(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 249,
    title: "Sort List Using Linked Merge Sort",
    slug: "sort-list-using-linked-merge-sort",
    difficulty: "Medium",
    topics: ["Sorting"],
    acceptanceRate: 72,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Sort a singly linked list in ascending order in O(n log n) time and O(1) space.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 2, 1, 3]",
            "expected": "[1, 2, 3, 4]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 2, 1, 3]",
            "expected": "[1, 2, 3, 4]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 2, 1, 3]",
            "expected": "[1, 2, 3, 4]"
      },
      {
            "id": "h2",
            "input": "[4, 2, 1, 3]",
            "expected": "[1, 2, 3, 4]"
      },
      {
            "id": "h3",
            "input": "[4, 2, 1, 3]",
            "expected": "[1, 2, 3, 4]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] sortListUsingLinkedMergeSort(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def sortListUsingLinkedMergeSort(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 250,
    title: "Car Pooling Capacity Simulation",
    slug: "car-pooling-capacity-simulation",
    difficulty: "Medium",
    topics: ["Sorting"],
    acceptanceRate: 68,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine whether passengers can be picked up and dropped off along a route without exceeding vehicle capacity.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[2, 1, 5], [3, 3, 7]], target = 4",
            "expected": "false",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[2, 1, 5], [3, 3, 7]], target = 0",
            "expected": "false",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[2, 1, 5], [3, 3, 7]]|4",
            "expected": "false"
      },
      {
            "id": "h2",
            "input": "[[2, 1, 5], [3, 3, 7]]|0",
            "expected": "false"
      },
      {
            "id": "h3",
            "input": "[[2, 1, 5], [3, 3, 7]]|1",
            "expected": "false"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean carPoolingCapacitySimulation(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def carPoolingCapacitySimulation(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 251,
    title: "Meeting Rooms II Overlap Concurrency",
    slug: "meeting-rooms-ii-overlap-concurrency",
    difficulty: "Medium",
    topics: ["Sorting"],
    acceptanceRate: 62,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the minimum conference rooms required to hold all scheduled meeting intervals.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[0, 30], [5, 10], [15, 20]]",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[0, 30], [5, 10], [15, 20]]",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[0, 30], [5, 10], [15, 20]]",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[[0, 30], [5, 10], [15, 20]]",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[[0, 30], [5, 10], [15, 20]]",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int meetingRoomsIiOverlapConcurrency(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def meetingRoomsIiOverlapConcurrency(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 252,
    title: "Sort The Matrix Diagonally",
    slug: "sort-the-matrix-diagonally",
    difficulty: "Medium",
    topics: ["Sorting"],
    acceptanceRate: 69,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Sort each diagonal originating from the top or left boundary in ascending order.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[3, 3, 1, 1], [2, 2, 1, 2], [1, 1, 1, 2]]",
            "expected": "[[1, 1, 1, 1], [1, 2, 2, 2], [1, 2, 3, 3]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[3, 3, 1, 1], [2, 2, 1, 2], [1, 1, 1, 2]]",
            "expected": "[[1, 1, 1, 1], [1, 2, 2, 2], [1, 2, 3, 3]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[3, 3, 1, 1], [2, 2, 1, 2], [1, 1, 1, 2]]",
            "expected": "[[1, 1, 1, 1], [1, 2, 2, 2], [1, 2, 3, 3]]"
      },
      {
            "id": "h2",
            "input": "[[3, 3, 1, 1], [2, 2, 1, 2], [1, 1, 1, 2]]",
            "expected": "[[1, 1, 1, 1], [1, 2, 2, 2], [1, 2, 3, 3]]"
      },
      {
            "id": "h3",
            "input": "[[3, 3, 1, 1], [2, 2, 1, 2], [1, 1, 1, 2]]",
            "expected": "[[1, 1, 1, 1], [1, 2, 2, 2], [1, 2, 3, 3]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int sortTheMatrixDiagonally(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def sortTheMatrixDiagonally(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 253,
    title: "Find Target Indices In Sorted Array",
    slug: "find-target-indices-in-sorted-array",
    difficulty: "Easy",
    topics: ["Sorting"],
    acceptanceRate: 59,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Return list of indices where target value resides after sorting the array.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 5, 2, 3], target = 2",
            "expected": "[1, 2]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 5, 2, 3], target = 0",
            "expected": "[1, 2]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 5, 2, 3]|2",
            "expected": "[1, 2]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 5, 2, 3]|0",
            "expected": "[1, 2]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 5, 2, 3]|1",
            "expected": "[1, 2]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] findTargetIndicesInSortedArray(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def findTargetIndicesInSortedArray(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 254,
    title: "Count Smaller Numbers After Self BIT",
    slug: "count-smaller-numbers-after-self-bit",
    difficulty: "Hard",
    topics: ["Sorting"],
    acceptanceRate: 76,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "For each element, count how many elements to its right are strictly smaller using merge sort / BIT.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [5, 2, 6, 1]",
            "expected": "[2, 1, 1, 0]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [5, 2, 6, 1]",
            "expected": "[2, 1, 1, 0]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[5, 2, 6, 1]",
            "expected": "[2, 1, 1, 0]"
      },
      {
            "id": "h2",
            "input": "[5, 2, 6, 1]",
            "expected": "[2, 1, 1, 0]"
      },
      {
            "id": "h3",
            "input": "[5, 2, 6, 1]",
            "expected": "[2, 1, 1, 0]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] countSmallerNumbersAfterSelfBit(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def countSmallerNumbersAfterSelfBit(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Merge Sort","Quick Sort","Custom Comparator"],
  },

  {
    id: 255,
    title: "Binary Search Sorted Array Index",
    slug: "binary-search-sorted-array-index",
    difficulty: "Easy",
    topics: ["Searching"],
    acceptanceRate: 60,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the index of target in sorted array in O(log n) time, or -1 if not found.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [-1, 0, 3, 5, 9, 12], target = 9",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [-1, 0, 3, 5, 9, 12], target = 0",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[-1, 0, 3, 5, 9, 12]|9",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[-1, 0, 3, 5, 9, 12]|0",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[-1, 0, 3, 5, 9, 12]|1",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int binarySearchSortedArrayIndex(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def binarySearchSortedArrayIndex(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 256,
    title: "Rotated Sorted Array Search Index",
    slug: "rotated-sorted-array-search-index",
    difficulty: "Medium",
    topics: ["Searching"],
    acceptanceRate: 60,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Locate index of target in an array sorted then rotated around an unknown pivot.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 5, 6, 7, 0, 1, 2], target = 0",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 5, 6, 7, 0, 1, 2], target = 0",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 5, 6, 7, 0, 1, 2]|0",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[4, 5, 6, 7, 0, 1, 2]|0",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[4, 5, 6, 7, 0, 1, 2]|1",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int rotatedSortedArraySearchIndex(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def rotatedSortedArraySearchIndex(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 257,
    title: "Find Minimum In Rotated Array",
    slug: "find-minimum-in-rotated-array",
    difficulty: "Medium",
    topics: ["Searching"],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Identify the minimum element in an ascending array rotated at an unknown pivot in O(log n).\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 4, 5, 1, 2]",
            "expected": "1",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 4, 5, 1, 2]",
            "expected": "1",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 4, 5, 1, 2]",
            "expected": "1"
      },
      {
            "id": "h2",
            "input": "[3, 4, 5, 1, 2]",
            "expected": "1"
      },
      {
            "id": "h3",
            "input": "[3, 4, 5, 1, 2]",
            "expected": "1"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int findMinimumInRotatedArray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def findMinimumInRotatedArray(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 258,
    title: "Search In Row Column Sorted 2D Matrix",
    slug: "search-in-row-column-sorted-2d-matrix",
    difficulty: "Medium",
    topics: ["Searching"],
    acceptanceRate: 49,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine if target exists in matrix where each row and column is sorted in ascending order.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16]], target = 5",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16]], target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16]]|5",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16]]|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16]]|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean searchInRowColumnSorted2dMatrix(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def searchInRowColumnSorted2dMatrix(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 259,
    title: "First Bad Version Bisection Check",
    slug: "first-bad-version-bisection-check",
    difficulty: "Easy",
    topics: ["Searching"],
    acceptanceRate: 66,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the first revision that introduced a defect using the minimal calls to isBadVersion.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 5, target = 4",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 5, target = 0",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "5|4",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "5|0",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "5|1",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int firstBadVersionBisectionCheck(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def firstBadVersionBisectionCheck(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 260,
    title: "Square Root Floor Calculation",
    slug: "square-root-floor-calculation",
    difficulty: "Easy",
    topics: ["Searching"],
    acceptanceRate: 75,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate the integer square root of x rounded down without using built-in sqrt.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 8",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 8",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "8",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "8",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "8",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int squareRootFloorCalculation(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def squareRootFloorCalculation(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 261,
    title: "Find Peak Mountain Array Index",
    slug: "find-peak-mountain-array-index",
    difficulty: "Medium",
    topics: ["Searching"],
    acceptanceRate: 58,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find index of peak in mountain array that increases then decreases.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [0, 2, 1, 0]",
            "expected": "1",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [0, 2, 1, 0]",
            "expected": "1",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[0, 2, 1, 0]",
            "expected": "1"
      },
      {
            "id": "h2",
            "input": "[0, 2, 1, 0]",
            "expected": "1"
      },
      {
            "id": "h3",
            "input": "[0, 2, 1, 0]",
            "expected": "1"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int findPeakMountainArrayIndex(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def findPeakMountainArrayIndex(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 262,
    title: "Capacity To Ship Packages Within Days",
    slug: "capacity-to-ship-packages-within-days",
    difficulty: "Medium",
    topics: ["Searching"],
    acceptanceRate: 72,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find minimal weight capacity of cargo ship required to deliver all packages within d days.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 5",
            "expected": "15",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 0",
            "expected": "15",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]|5",
            "expected": "15"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]|0",
            "expected": "15"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]|1",
            "expected": "15"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int capacityToShipPackagesWithinDays(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def capacityToShipPackagesWithinDays(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 263,
    title: "Koko Eating Bananas Speed Bound",
    slug: "koko-eating-bananas-speed-bound",
    difficulty: "Medium",
    topics: ["Searching"],
    acceptanceRate: 75,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the minimum eating speed k allowing Koko to eat all piles within h hours.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 6, 7, 11], target = 8",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 6, 7, 11], target = 0",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 6, 7, 11]|8",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[3, 6, 7, 11]|0",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[3, 6, 7, 11]|1",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int kokoEatingBananasSpeedBound(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def kokoEatingBananasSpeedBound(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 264,
    title: "Median Of Two Sorted Input Streams",
    slug: "median-of-two-sorted-input-streams",
    difficulty: "Hard",
    topics: ["Searching"],
    acceptanceRate: 74,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Compute median of two sorted arrays of lengths m and n in O(log(min(m, n))) time.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 3], target = [2]",
            "expected": "2.0",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 3], target = 0",
            "expected": "2.0",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 3]|[2]",
            "expected": "2.0"
      },
      {
            "id": "h2",
            "input": "[1, 3]|0",
            "expected": "2.0"
      },
      {
            "id": "h3",
            "input": "[1, 3]|1",
            "expected": "2.0"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public double medianOfTwoSortedInputStreams(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def medianOfTwoSortedInputStreams(self, nums: List[int]) -> float:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 265,
    title: "Search Insertion Target Position",
    slug: "search-insertion-target-position",
    difficulty: "Easy",
    topics: ["Searching"],
    acceptanceRate: 74,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find index of target if present, or index where it belongs to maintain sorted order.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 3, 5, 6], target = 5",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 3, 5, 6], target = 0",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 3, 5, 6]|5",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[1, 3, 5, 6]|0",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[1, 3, 5, 6]|1",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int searchInsertionTargetPosition(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def searchInsertionTargetPosition(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 266,
    title: "Single Non Duplicate In Sorted Array",
    slug: "single-non-duplicate-in-sorted-array",
    difficulty: "Medium",
    topics: ["Searching"],
    acceptanceRate: 46,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the single unique element in an array where every other element appears twice in O(log n).\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 2, 3, 3, 4, 4, 8, 8]",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 2, 3, 3, 4, 4, 8, 8]",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 2, 3, 3, 4, 4, 8, 8]",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[1, 1, 2, 3, 3, 4, 4, 8, 8]",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[1, 1, 2, 3, 3, 4, 4, 8, 8]",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int singleNonDuplicateInSortedArray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def singleNonDuplicateInSortedArray(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 267,
    title: "Split Array Largest Sum Minimization",
    slug: "split-array-largest-sum-minimization",
    difficulty: "Hard",
    topics: ["Searching"],
    acceptanceRate: 64,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Split array into k non-empty subarrays minimizing the maximum sum among subarrays.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [7, 2, 5, 10, 8], target = 2",
            "expected": "18",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [7, 2, 5, 10, 8], target = 0",
            "expected": "18",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[7, 2, 5, 10, 8]|2",
            "expected": "18"
      },
      {
            "id": "h2",
            "input": "[7, 2, 5, 10, 8]|0",
            "expected": "18"
      },
      {
            "id": "h3",
            "input": "[7, 2, 5, 10, 8]|1",
            "expected": "18"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int splitArrayLargestSumMinimization(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def splitArrayLargestSumMinimization(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 268,
    title: "First And Last Position Of Target",
    slug: "first-and-last-position-of-target",
    difficulty: "Medium",
    topics: ["Searching"],
    acceptanceRate: 76,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the starting and ending index position of a target value in a sorted array.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [5, 7, 7, 8, 8, 10], target = 8",
            "expected": "[3, 4]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [5, 7, 7, 8, 8, 10], target = 0",
            "expected": "[3, 4]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[5, 7, 7, 8, 8, 10]|8",
            "expected": "[3, 4]"
      },
      {
            "id": "h2",
            "input": "[5, 7, 7, 8, 8, 10]|0",
            "expected": "[3, 4]"
      },
      {
            "id": "h3",
            "input": "[5, 7, 7, 8, 8, 10]|1",
            "expected": "[3, 4]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] firstAndLastPositionOfTarget(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def firstAndLastPositionOfTarget(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 269,
    title: "Find Minimum In Rotated Array With Dupes",
    slug: "find-minimum-in-rotated-array-with-dupes",
    difficulty: "Hard",
    topics: ["Searching"],
    acceptanceRate: 55,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find minimum element in rotated sorted array that may contain duplicate values.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 2, 2, 0, 1]",
            "expected": "0",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 2, 2, 0, 1]",
            "expected": "0",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 2, 2, 0, 1]",
            "expected": "0"
      },
      {
            "id": "h2",
            "input": "[2, 2, 2, 0, 1]",
            "expected": "0"
      },
      {
            "id": "h3",
            "input": "[2, 2, 2, 0, 1]",
            "expected": "0"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int findMinimumInRotatedArrayWithDupes(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def findMinimumInRotatedArrayWithDupes(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 270,
    title: "Valid Perfect Square Bisection Check",
    slug: "valid-perfect-square-bisection-check",
    difficulty: "Easy",
    topics: ["Searching"],
    acceptanceRate: 57,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine whether a positive integer is a perfect square without using library functions.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 16",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 16",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "16",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "16",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "16",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean validPerfectSquareBisectionCheck(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def validPerfectSquareBisectionCheck(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 271,
    title: "Find In Mountain Array Minimum Queries",
    slug: "find-in-mountain-array-minimum-queries",
    difficulty: "Hard",
    topics: ["Searching"],
    acceptanceRate: 57,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Locate target in mountain array using the minimum number of API value probes.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, 5, 3, 1], target = 3",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, 5, 3, 1], target = 0",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, 5, 3, 1]|3",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, 5, 3, 1]|0",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, 5, 3, 1]|1",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int findInMountainArrayMinimumQueries(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def findInMountainArrayMinimumQueries(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Binary Search","Rotated Search","Search Space Monotonicity"],
  },

  {
    id: 272,
    title: "Count Jewels In Stones Inventory",
    slug: "count-jewels-in-stones-inventory",
    difficulty: "Easy",
    topics: ["Hashing"],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Count how many stones in your possession are also recognized as precious jewels.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aA\", target = \"aAAbbbb\"",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aA\", target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aA\"|\"aAAbbbb\"",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "\"aA\"|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "\"aA\"|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int countJewelsInStonesInventory(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def countJewelsInStonesInventory(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 273,
    title: "Ransom Note Character Verification",
    slug: "ransom-note-character-verification",
    difficulty: "Easy",
    topics: ["Hashing"],
    acceptanceRate: 58,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check if ransom note can be formed using letter clippings from magazine without reuse.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"aa\", target = \"aab\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"aa\", target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"aa\"|\"aab\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "\"aa\"|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "\"aa\"|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean ransomNoteCharacterVerification(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def ransomNoteCharacterVerification(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 274,
    title: "Longest Consecutive Element Run",
    slug: "longest-consecutive-element-run",
    difficulty: "Medium",
    topics: ["Hashing"],
    acceptanceRate: 45,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the length of the longest consecutive elements sequence in an unsorted array in O(n).\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [100, 4, 200, 1, 3, 2]",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [100, 4, 200, 1, 3, 2]",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[100, 4, 200, 1, 3, 2]",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[100, 4, 200, 1, 3, 2]",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[100, 4, 200, 1, 3, 2]",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int longestConsecutiveElementRun(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def longestConsecutiveElementRun(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 275,
    title: "Group Strings By Anagram Signatures",
    slug: "group-strings-by-anagram-signatures",
    difficulty: "Medium",
    topics: ["Hashing"],
    acceptanceRate: 73,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Group an array of strings together into sublists of mutually identical anagrams.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
            "expected": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
            "expected": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
            "expected": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]"
      },
      {
            "id": "h2",
            "input": "[\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
            "expected": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]"
      },
      {
            "id": "h3",
            "input": "[\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
            "expected": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int groupStringsByAnagramSignatures(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def groupStringsByAnagramSignatures(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 276,
    title: "Four Sum Quadruplet Hash Tally",
    slug: "four-sum-quadruplet-hash-tally",
    difficulty: "Medium",
    topics: ["Hashing"],
    acceptanceRate: 79,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Count tuples (i, j, k, l) across four arrays whose values sum to 0 using meet-in-the-middle.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2], target = [-2, -1], [-1, 2], [0, 2]",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2], target = 0",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2]|[-2, -1], [-1, 2], [0, 2]",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[1, 2]|0",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[1, 2]|1",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int fourSumQuadrupletHashTally(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def fourSumQuadrupletHashTally(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 277,
    title: "Unique Number Occurrences Verification",
    slug: "unique-number-occurrences-verification",
    difficulty: "Easy",
    topics: ["Hashing"],
    acceptanceRate: 49,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check if each value in array appears a unique number of times with no frequency clashes.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 2, 1, 1, 3]",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 2, 1, 1, 3]",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 2, 1, 1, 3]",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[1, 2, 2, 1, 1, 3]",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[1, 2, 2, 1, 1, 3]",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean uniqueNumberOccurrencesVerification(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def uniqueNumberOccurrencesVerification(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 278,
    title: "Subarray Sum Equals K Prefix Map",
    slug: "subarray-sum-equals-k-prefix-map",
    difficulty: "Medium",
    topics: ["Hashing"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find total number of contiguous subarrays whose elements sum up exactly to k.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 1, 1], target = 2",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 1, 1], target = 0",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 1, 1]|2",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "[1, 1, 1]|0",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "[1, 1, 1]|1",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int subarraySumEqualsKPrefixMap(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def subarraySumEqualsKPrefixMap(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 279,
    title: "Continuous Subarray Sum Modulo Multiple",
    slug: "continuous-subarray-sum-modulo-multiple",
    difficulty: "Medium",
    topics: ["Hashing"],
    acceptanceRate: 73,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check if array contains a subarray of length >= 2 whose sum is a multiple of k.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [23, 2, 4, 6, 7], target = 6",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [23, 2, 4, 6, 7], target = 0",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[23, 2, 4, 6, 7]|6",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "[23, 2, 4, 6, 7]|0",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "[23, 2, 4, 6, 7]|1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean continuousSubarraySumModuloMultiple(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def continuousSubarraySumModuloMultiple(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 280,
    title: "Destination City Terminal Search",
    slug: "destination-city-terminal-search",
    difficulty: "Easy",
    topics: ["Hashing"],
    acceptanceRate: 51,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the destination city with no outgoing paths connecting it to another city.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[\"London\", \"New York\"], [\"New York\", \"Lima\"], [\"Lima\", \"Sao Paulo\"]]",
            "expected": "\"Sao Paulo\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[\"London\", \"New York\"], [\"New York\", \"Lima\"], [\"Lima\", \"Sao Paulo\"]]",
            "expected": "\"Sao Paulo\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[\"London\", \"New York\"], [\"New York\", \"Lima\"], [\"Lima\", \"Sao Paulo\"]]",
            "expected": "\"Sao Paulo\""
      },
      {
            "id": "h2",
            "input": "[[\"London\", \"New York\"], [\"New York\", \"Lima\"], [\"Lima\", \"Sao Paulo\"]]",
            "expected": "\"Sao Paulo\""
      },
      {
            "id": "h3",
            "input": "[[\"London\", \"New York\"], [\"New York\", \"Lima\"], [\"Lima\", \"Sao Paulo\"]]",
            "expected": "\"Sao Paulo\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String destinationCityTerminalSearch(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def destinationCityTerminalSearch(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 281,
    title: "Check Sentence Pangram Complete",
    slug: "check-sentence-pangram-complete",
    difficulty: "Easy",
    topics: ["Hashing"],
    acceptanceRate: 76,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Verify if a sentence contains every letter of the English alphabet at least once.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"thequickbrownfoxjumpsoverthelazydog\"",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"thequickbrownfoxjumpsoverthelazydog\"",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"thequickbrownfoxjumpsoverthelazydog\"",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "\"thequickbrownfoxjumpsoverthelazydog\"",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "\"thequickbrownfoxjumpsoverthelazydog\"",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean checkSentencePangramComplete(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def checkSentencePangramComplete(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 282,
    title: "Insert Delete GetRandom In O(1)",
    slug: "insert-delete-getrandom-in-o-1",
    difficulty: "Medium",
    topics: ["Hashing"],
    acceptanceRate: 56,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Design randomized set supporting insert, delete, and getRandom all in O(1) average time.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 1",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 1",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "1",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "1",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "1",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean insertDeleteGetrandomInO1(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def insertDeleteGetrandomInO1(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 283,
    title: "Find Common Characters In All Words",
    slug: "find-common-characters-in-all-words",
    difficulty: "Easy",
    topics: ["Hashing"],
    acceptanceRate: 66,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find all characters that appear in every string of the array including duplicates.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [\"bella\", \"label\", \"roller\"]",
            "expected": "[\"e\", \"l\", \"l\"]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [\"bella\", \"label\", \"roller\"]",
            "expected": "[\"e\", \"l\", \"l\"]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[\"bella\", \"label\", \"roller\"]",
            "expected": "[\"e\", \"l\", \"l\"]"
      },
      {
            "id": "h2",
            "input": "[\"bella\", \"label\", \"roller\"]",
            "expected": "[\"e\", \"l\", \"l\"]"
      },
      {
            "id": "h3",
            "input": "[\"bella\", \"label\", \"roller\"]",
            "expected": "[\"e\", \"l\", \"l\"]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int findCommonCharactersInAllWords(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def findCommonCharactersInAllWords(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 284,
    title: "Subarray Sums Divisible By K Mod",
    slug: "subarray-sums-divisible-by-k-mod",
    difficulty: "Medium",
    topics: ["Hashing"],
    acceptanceRate: 67,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Count continuous non-empty subarrays with sum divisible by k using modulo tracking.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 5, 0, -2, -3, 1], target = 5",
            "expected": "7",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 5, 0, -2, -3, 1], target = 0",
            "expected": "7",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 5, 0, -2, -3, 1]|5",
            "expected": "7"
      },
      {
            "id": "h2",
            "input": "[4, 5, 0, -2, -3, 1]|0",
            "expected": "7"
      },
      {
            "id": "h3",
            "input": "[4, 5, 0, -2, -3, 1]|1",
            "expected": "7"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int subarraySumsDivisibleByKMod(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def subarraySumsDivisibleByKMod(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 285,
    title: "Longest Substring Two Distinct Chars",
    slug: "longest-substring-two-distinct-chars",
    difficulty: "Medium",
    topics: ["Hashing"],
    acceptanceRate: 61,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find length of the longest substring that contains at most two distinct characters.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"eceba\"",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"eceba\"",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"eceba\"",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "\"eceba\"",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "\"eceba\"",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int longestSubstringTwoDistinctChars(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def longestSubstringTwoDistinctChars(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 286,
    title: "Max Points On A Single Line Slope",
    slug: "max-points-on-a-single-line-slope",
    difficulty: "Hard",
    topics: ["Hashing"],
    acceptanceRate: 62,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the maximum number of 2D points that lie on the same straight line.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [[1, 1], [2, 2], [3, 3]]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [[1, 1], [2, 2], [3, 3]]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[[1, 1], [2, 2], [3, 3]]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[[1, 1], [2, 2], [3, 3]]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[[1, 1], [2, 2], [3, 3]]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maxPointsOnASingleLineSlope(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maxPointsOnASingleLineSlope(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 287,
    title: "Find Duplicate Subtrees In Binary Tree",
    slug: "find-duplicate-subtrees-in-binary-tree",
    difficulty: "Medium",
    topics: ["Hashing"],
    acceptanceRate: 48,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find all duplicate subtrees in a binary tree by serializing subtree structures into hash map.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3, 4, null, 2, 4, null, null, 4]",
            "expected": "[2, 4]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3, 4, null, 2, 4, null, null, 4]",
            "expected": "[2, 4]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3, 4, null, 2, 4, null, null, 4]",
            "expected": "[2, 4]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3, 4, null, 2, 4, null, null, 4]",
            "expected": "[2, 4]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3, 4, null, 2, 4, null, null, 4]",
            "expected": "[2, 4]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] findDuplicateSubtreesInBinaryTree(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def findDuplicateSubtreesInBinaryTree(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 288,
    title: "All O(1) Data Structure Key Ranks",
    slug: "all-o-1-data-structure-key-ranks",
    difficulty: "Hard",
    topics: ["Hashing"],
    acceptanceRate: 50,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Design data structure storing string keys supporting inc, dec, getMaxKey, getMinKey in O(1).\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = \"hello\"",
            "expected": "\"hello\"",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = \"hello\"",
            "expected": "\"hello\"",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "\"hello\"",
            "expected": "\"hello\""
      },
      {
            "id": "h2",
            "input": "\"hello\"",
            "expected": "\"hello\""
      },
      {
            "id": "h3",
            "input": "\"hello\"",
            "expected": "\"hello\""
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public String allO1DataStructureKeyRanks(String s) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def allO1DataStructureKeyRanks(self, s: str) -> str:\n        # Write your code here\n        pass",
    },
    concepts: ["Hash Table","Frequency Counting","Hash Set"],
  },

  {
    id: 289,
    title: "Single Number Unique Element XOR",
    slug: "single-number-unique-element-xor",
    difficulty: "Easy",
    topics: ["Bit Manipulation"],
    acceptanceRate: 66,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find the single element appearing once in array where all other elements appear twice.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 1, 2, 1, 2]",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 1, 2, 1, 2]",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 1, 2, 1, 2]",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "[4, 1, 2, 1, 2]",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "[4, 1, 2, 1, 2]",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int singleNumberUniqueElementXor(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def singleNumberUniqueElementXor(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 290,
    title: "Counting Bits Popcount Table",
    slug: "counting-bits-popcount-table",
    difficulty: "Easy",
    topics: ["Bit Manipulation"],
    acceptanceRate: 55,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "For each number from 0 to n, compute the count of set 1 bits in its binary representation.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 5",
            "expected": "[0, 1, 1, 2, 1, 2]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 5",
            "expected": "[0, 1, 1, 2, 1, 2]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "5",
            "expected": "[0, 1, 1, 2, 1, 2]"
      },
      {
            "id": "h2",
            "input": "5",
            "expected": "[0, 1, 1, 2, 1, 2]"
      },
      {
            "id": "h3",
            "input": "5",
            "expected": "[0, 1, 1, 2, 1, 2]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] countingBitsPopcountTable(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def countingBitsPopcountTable(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 291,
    title: "Hamming Distance Differing Bits",
    slug: "hamming-distance-differing-bits",
    difficulty: "Easy",
    topics: ["Bit Manipulation"],
    acceptanceRate: 69,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate the number of positions where corresponding bits of two integers differ.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 1, target = 4",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 1, target = 0",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "1|4",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "1|0",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "1|1",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int hammingDistanceDifferingBits(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def hammingDistanceDifferingBits(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 292,
    title: "Single Number Triple Duplicate Array",
    slug: "single-number-triple-duplicate-array",
    difficulty: "Medium",
    topics: ["Bit Manipulation"],
    acceptanceRate: 59,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find element appearing once where all other elements appear three times in array.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [2, 2, 3, 2]",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [2, 2, 3, 2]",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[2, 2, 3, 2]",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "[2, 2, 3, 2]",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "[2, 2, 3, 2]",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int singleNumberTripleDuplicateArray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def singleNumberTripleDuplicateArray(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 293,
    title: "Bitwise AND Of Number Sequence Range",
    slug: "bitwise-and-of-number-sequence-range",
    difficulty: "Medium",
    topics: ["Bit Manipulation"],
    acceptanceRate: 79,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compute bitwise AND of all integers in the inclusive range [left, right].\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 5, target = 7",
            "expected": "4",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 5, target = 0",
            "expected": "4",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "5|7",
            "expected": "4"
      },
      {
            "id": "h2",
            "input": "5|0",
            "expected": "4"
      },
      {
            "id": "h3",
            "input": "5|1",
            "expected": "4"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int bitwiseAndOfNumberSequenceRange(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def bitwiseAndOfNumberSequenceRange(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 294,
    title: "Power Of Two Bitwise Validation",
    slug: "power-of-two-bitwise-validation",
    difficulty: "Easy",
    topics: ["Bit Manipulation"],
    acceptanceRate: 64,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Determine if an integer is a power of two using bitwise trick n & (n - 1) == 0.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 16",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 16",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "16",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "16",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "16",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean powerOfTwoBitwiseValidation(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def powerOfTwoBitwiseValidation(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 295,
    title: "Single Number Pair Distinct Elements",
    slug: "single-number-pair-distinct-elements",
    difficulty: "Medium",
    topics: ["Bit Manipulation"],
    acceptanceRate: 74,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Find two numbers appearing once in array where all other elements appear twice.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 1, 3, 2, 5]",
            "expected": "[3, 5]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 1, 3, 2, 5]",
            "expected": "[3, 5]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 1, 3, 2, 5]",
            "expected": "[3, 5]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 1, 3, 2, 5]",
            "expected": "[3, 5]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 1, 3, 2, 5]",
            "expected": "[3, 5]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int[] singleNumberPairDistinctElements(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def singleNumberPairDistinctElements(self, nums: List[int]) -> List[int]:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 296,
    title: "Reverse Bits Of Unsigned Integer",
    slug: "reverse-bits-of-unsigned-integer",
    difficulty: "Easy",
    topics: ["Bit Manipulation"],
    acceptanceRate: 63,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Reverse the 32 bits of a given unsigned integer.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 43261596",
            "expected": "964176192",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 43261596",
            "expected": "964176192",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "43261596",
            "expected": "964176192"
      },
      {
            "id": "h2",
            "input": "43261596",
            "expected": "964176192"
      },
      {
            "id": "h3",
            "input": "43261596",
            "expected": "964176192"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int reverseBitsOfUnsignedInteger(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def reverseBitsOfUnsignedInteger(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 297,
    title: "Sum Of Two Integers Without Operators",
    slug: "sum-of-two-integers-without-operators",
    difficulty: "Medium",
    topics: ["Bit Manipulation"],
    acceptanceRate: 77,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Calculate the sum of two integers without using + or - operators.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 1, target = 2",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 1, target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "1|2",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "1|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "1|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int sumOfTwoIntegersWithoutOperators(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def sumOfTwoIntegersWithoutOperators(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 298,
    title: "Complement Of Base 10 Integer Value",
    slug: "complement-of-base-10-integer-value",
    difficulty: "Easy",
    topics: ["Bit Manipulation"],
    acceptanceRate: 46,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Invert every bit in binary representation of n and return its integer value.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 5",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 5",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "5",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "5",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "5",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int complementOfBase10IntegerValue(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def complementOfBase10IntegerValue(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 299,
    title: "Maximum Product Word Lengths Disjoint",
    slug: "maximum-product-word-lengths-disjoint",
    difficulty: "Medium",
    topics: ["Bit Manipulation"],
    acceptanceRate: 66,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Maximize product of lengths of two words that share zero common letters using bitmask.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [\"abcw\", \"baz\", \"foo\", \"bar\", \"xtfn\", \"abcdef\"]",
            "expected": "16",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [\"abcw\", \"baz\", \"foo\", \"bar\", \"xtfn\", \"abcdef\"]",
            "expected": "16",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[\"abcw\", \"baz\", \"foo\", \"bar\", \"xtfn\", \"abcdef\"]",
            "expected": "16"
      },
      {
            "id": "h2",
            "input": "[\"abcw\", \"baz\", \"foo\", \"bar\", \"xtfn\", \"abcdef\"]",
            "expected": "16"
      },
      {
            "id": "h3",
            "input": "[\"abcw\", \"baz\", \"foo\", \"bar\", \"xtfn\", \"abcdef\"]",
            "expected": "16"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maximumProductWordLengthsDisjoint(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maximumProductWordLengthsDisjoint(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 300,
    title: "Total Hamming Distance All Pairs",
    slug: "total-hamming-distance-all-pairs",
    difficulty: "Medium",
    topics: ["Bit Manipulation"],
    acceptanceRate: 70,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Compute sum of Hamming distances between all possible pairs of integers in array.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [4, 14, 2]",
            "expected": "6",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [4, 14, 2]",
            "expected": "6",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[4, 14, 2]",
            "expected": "6"
      },
      {
            "id": "h2",
            "input": "[4, 14, 2]",
            "expected": "6"
      },
      {
            "id": "h3",
            "input": "[4, 14, 2]",
            "expected": "6"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int totalHammingDistanceAllPairs(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def totalHammingDistanceAllPairs(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 301,
    title: "Subsets Generation Via Binary Bitmasks",
    slug: "subsets-generation-via-binary-bitmasks",
    difficulty: "Medium",
    topics: ["Bit Manipulation"],
    acceptanceRate: 65,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Generate all 2^n subsets using bitmask representation from 0 to 2^n - 1.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [1, 2, 3]",
            "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [1, 2, 3]",
            "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[1, 2, 3]",
            "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]"
      },
      {
            "id": "h2",
            "input": "[1, 2, 3]",
            "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]"
      },
      {
            "id": "h3",
            "input": "[1, 2, 3]",
            "expected": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int subsetsGenerationViaBinaryBitmasks(int[] nums) {\n        // Write your code here\n        return null;\n    }\n}",
      python: "class Solution:\n    def subsetsGenerationViaBinaryBitmasks(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 302,
    title: "Maximum XOR Of Two Numbers In Array",
    slug: "maximum-xor-of-two-numbers-in-array",
    difficulty: "Hard",
    topics: ["Bit Manipulation"],
    acceptanceRate: 67,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Find the maximum result of nums[i] XOR nums[j] using bitwise Trie or prefix sets.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = [3, 10, 5, 25, 2, 8]",
            "expected": "28",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = [3, 10, 5, 25, 2, 8]",
            "expected": "28",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "[3, 10, 5, 25, 2, 8]",
            "expected": "28"
      },
      {
            "id": "h2",
            "input": "[3, 10, 5, 25, 2, 8]",
            "expected": "28"
      },
      {
            "id": "h3",
            "input": "[3, 10, 5, 25, 2, 8]",
            "expected": "28"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int maximumXorOfTwoNumbersInArray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def maximumXorOfTwoNumbersInArray(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 303,
    title: "Alternating Bits Binary Representation",
    slug: "alternating-bits-binary-representation",
    difficulty: "Easy",
    topics: ["Bit Manipulation"],
    acceptanceRate: 55,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Check if positive integer has alternating adjacent 0s and 1s in its binary form.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 5",
            "expected": "true",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 5",
            "expected": "true",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "5",
            "expected": "true"
      },
      {
            "id": "h2",
            "input": "5",
            "expected": "true"
      },
      {
            "id": "h3",
            "input": "5",
            "expected": "true"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public boolean alternatingBitsBinaryRepresentation(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}",
      python: "class Solution:\n    def alternatingBitsBinaryRepresentation(self, nums: List[int]) -> bool:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 304,
    title: "Divide Two Integers Without Multiply",
    slug: "divide-two-integers-without-multiply",
    difficulty: "Medium",
    topics: ["Bit Manipulation"],
    acceptanceRate: 71,
    timeLimit: 1000,
    memoryLimit: 256,
    description: "Divide two integers without using multiplication, division, or modulo operators.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 10, target = 3",
            "expected": "3",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 10, target = 0",
            "expected": "3",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "10|3",
            "expected": "3"
      },
      {
            "id": "h2",
            "input": "10|0",
            "expected": "3"
      },
      {
            "id": "h3",
            "input": "10|1",
            "expected": "3"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int divideTwoIntegersWithoutMultiply(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def divideTwoIntegersWithoutMultiply(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },

  {
    id: 305,
    title: "Minimum One Bit Operations To Zero",
    slug: "minimum-one-bit-operations-to-zero",
    difficulty: "Hard",
    topics: ["Bit Manipulation"],
    acceptanceRate: 65,
    timeLimit: 3000,
    memoryLimit: 256,
    description: "Calculate minimum operations to transform binary integer to 0 using Gray code properties.\\n\\nImplement an optimal algorithm achieving the required runtime complexity.",
    constraints: ["1 <= input.length <= 10^4","-10^9 <= input[i] <= 10^9","Input is guaranteed to be valid."],
    examples: [
      {
            "id": "e1",
            "input": "input = 3",
            "expected": "2",
            "explanation": "Result for sample input."
      },
      {
            "id": "e2",
            "input": "input = 3",
            "expected": "2",
            "explanation": "Second test case."
      }
],
    hiddenTests: [
      {
            "id": "h1",
            "input": "3",
            "expected": "2"
      },
      {
            "id": "h2",
            "input": "3",
            "expected": "2"
      },
      {
            "id": "h3",
            "input": "3",
            "expected": "2"
      }
],
    starterCode: {
      java: "import java.util.*;\n\nclass Solution {\n    public int minimumOneBitOperationsToZero(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}",
      python: "class Solution:\n    def minimumOneBitOperationsToZero(self, nums: List[int]) -> int:\n        # Write your code here\n        pass",
    },
    concepts: ["XOR","Bitmask","Hamming Weight"],
  },
];

export const getProblemById = (id: number): Problem | undefined =>
  problems.find((p) => p.id === id);

export const getProblemsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Problem[] =>
  problems.filter((p) => p.difficulty === difficulty);

export const getProblemsByTopic = (topic: string): Problem[] =>
  problems.filter((p) => p.topics.includes(topic as any));

export const getLanguage = (lang: Language): Language => lang;
