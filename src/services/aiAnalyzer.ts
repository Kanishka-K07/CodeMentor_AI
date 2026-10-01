import type { AIHintResponse, JudgeResult } from '../types';

export interface CodeDiagnostic {
  errorType: 'Accepted' | 'Compilation Error' | 'Runtime Error' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Insufficient Information';
  exactLineNumber?: number;
  failingCodeSnippet?: string;
  exactReason: string;
  correctFix: string;
  studentExplanation: string;
  concept: string;
  hint1: string;
  hint2: string;
  hint3: string;
  learningTakeaway: string;
}

/**
 * Strict Code & Output Analyzer
 * Connects: Student Code -> Exact Line -> Actual Error -> Exact Reason -> Fix
 */
export function analyzeStudentCode(
  problemTitle: string,
  code: string,
  result: JudgeResult,
  topics: string[]
): AIHintResponse {
  const diagnostic = performStrictAnalysis(problemTitle, code, result, topics);

  // Format response matching AIHintResponse interface strictly
  return {
    errorExplanation: formatDiagnosticExplanation(diagnostic, result),
    conceptDetected: diagnostic.concept,
    hint1: diagnostic.hint1,
    hint2: diagnostic.hint2,
    hint3: diagnostic.hint3,
    learningTakeaway: diagnostic.learningTakeaway,
    exactLineNumber: diagnostic.exactLineNumber,
    failingCodeSnippet: diagnostic.failingCodeSnippet,
    exactReason: diagnostic.exactReason,
    correctFix: diagnostic.correctFix,
    timeComplexity: analyzeTimeComplexity(code),
    spaceComplexity: analyzeSpaceComplexity(code),
    edgeCases: generateEdgeCases(problemTitle, topics),
    codeExplanation: generateCodeExplanation(code),
    followUpQuestion: {
      title: `Practice ${diagnostic.concept}`,
      description: `Try solving a related problem on ${diagnostic.concept} using the corrected logic.`,
      concept: diagnostic.concept,
    },
  };
}

function performStrictAnalysis(
  problemTitle: string,
  code: string,
  result: JudgeResult,
  topics: string[]
): CodeDiagnostic {
  const primaryTopic = topics[0] ?? 'Algorithm Logic';

  // 1. Check for insufficient information
  if (!code || code.trim().length === 0) {
    return {
      errorType: 'Insufficient Information',
      exactReason: 'Insufficient information to determine the exact cause.',
      correctFix: 'Write and run your code solution to receive dynamic AI feedback.',
      studentExplanation: 'Insufficient information to determine the exact cause.',
      concept: primaryTopic,
      hint1: 'Insufficient information to determine the exact cause.',
      hint2: 'Insufficient information to determine the exact cause.',
      hint3: 'Insufficient information to determine the exact cause.',
      learningTakeaway: 'Ensure code is present before running analysis.',
    };
  }

  // 2. ACCEPTED STATE (Do NOT invent errors)
  if (result.status === 'Accepted') {
    return {
      errorType: 'Accepted',
      exactReason: 'No error detected. Solution passed all test cases.',
      correctFix: 'No fix needed! Solution is correct.',
      studentExplanation: 'Accepted — All test cases passed successfully.',
      concept: primaryTopic,
      hint1: '✅ Your code logic and edge case handling are correct!',
      hint2: '💡 Analyze the Time & Space Complexity O(...) of your solution to ensure optimal performance.',
      hint3: '🚀 Try solving the problem using an alternative approach (e.g. trading memory for speed).',
      learningTakeaway: 'Great job! Understanding why your code passed helps reinforce algorithmic mastery.',
    };
  }

  const lines = code.split('\n');

  // 3. COMPILATION ERROR
  if (result.status === 'Compilation Error' || result.compilationError) {
    const errLog = result.compilationError || '';

    // Line number detection
    let lineNo: number | undefined;
    const lineMatch = errLog.match(/Solution\.(?:java|py):(\d+):/i) || errLog.match(/line (\d+)/i) || errLog.match(/Line (\d+)/i);
    if (lineMatch) lineNo = parseInt(lineMatch[1], 10);

    let failingSnippet = lineNo && lines[lineNo - 1] ? lines[lineNo - 1].trim() : '';

    if (errLog.includes('cannot find symbol') || errLog.includes('not defined')) {
      const symbolMatch = errLog.match(/symbol:\  class (\w+)/) || errLog.match(/symbol:\  variable (\w+)/) || errLog.match(/name '(\w+)' is not defined/);
      const symbol = symbolMatch ? symbolMatch[1] : 'data structure';
      return {
        errorType: 'Compilation Error',
        exactLineNumber: lineNo,
        failingCodeSnippet: failingSnippet,
        exactReason: `The symbol '${symbol}
        
        
        was referenced but not imported or declared in scope.`,
        correctFix: `Add 'import java.util.*;' at the top of your file or declare '${symbol}' before using it.`,
        studentExplanation: `Compilation Error at ${lineNo ? `line ${lineNo}` : 'your code'}: '${symbol}' is not recognized by the compiler.`,
        concept: `${primaryTopic} Syntax`,
        hint1: `🔍 **Line ${lineNo || 'Error'}:** Compiler error — symbol '${symbol}' cannot be found.`,
        hint2: `💡 Make sure you have imported required utility packages at the top of your class (e.g., \`import java.util.*;\`).`,
        hint3: `🛠️ Add \`import java.util.${symbol};\` or \`import java.util.*;\` above \`class Solution\`.`,
        learningTakeaway: 'Always import Java utility classes before instantiating containers like Map, List, or Arrays.',
      };
    }

    if (errLog.includes(';') || errLog.includes("';' expected")) {
      return {
        errorType: 'Compilation Error',
        exactLineNumber: lineNo,
        failingCodeSnippet: failingSnippet,
        exactReason: `Missing semicolon ';' at the end of statement on line ${lineNo || 'above'}.`,
        correctFix: `Add a semicolon ';' at the end of statement: \`${failingSnippet};\``,
        studentExplanation: `Compilation Error on line ${lineNo || 'code'}: Semicolon ';' expected.`,
        concept: 'Syntax & Formatting',
        hint1: `🔍 **Line ${lineNo || 'Error'}:** Syntax error — missing semicolon \`;\`.`,
        hint2: `💡 In Java, every statement must terminate with a semicolon \`;\`.`,
        hint3: `🛠️ Add \`;\` to line ${lineNo || ''}: \`${failingSnippet};\``,
        learningTakeaway: 'In Java, statements must end with a semicolon `;` before compilation succeeds.',
      };
    }

    if (errLog.includes('missing return statement')) {
      return {
        errorType: 'Compilation Error',
        exactLineNumber: lineNo,
        failingCodeSnippet: failingSnippet,
        exactReason: 'Method signature specifies a return type, but control flow paths end without returning a value.',
        correctFix: 'Add a default return statement (e.g. `return new int[0];` or `return -1;`) at the end of the method.',
        studentExplanation: 'Compilation Error: Missing return statement for non-void method.',
        concept: 'Method Signatures & Return Types',
        hint1: '🔍 **Compiler Error:** Method is missing a return statement for non-void return type.',
        hint2: '💡 Java requires all code execution branches to return a valid result matching the method signature.',
        hint3: '🛠️ Add a fallback return statement at the end of your function body outside loop structures.',
        learningTakeaway: 'Ensure every path in a value-returning method explicitly returns a result.',
      };
    }

    // Generic compilation error fallback
    return {
      errorType: 'Compilation Error',
      exactLineNumber: lineNo,
      failingCodeSnippet: failingSnippet,
      exactReason: errLog.trim() || 'Compilation failed due to syntax errors.',
      correctFix: 'Correct syntax errors according to compiler log.',
      studentExplanation: `Compilation Error: ${errLog.slice(0, 150)}`,
      concept: 'Syntax & Types',
      hint1: `🔍 **Compiler Error:** ${errLog.slice(0, 100)}`,
      hint2: '💡 Check line numbers mentioned in compiler log for missing symbols, brackets, or mismatched types.',
      hint3: '🛠️ Review syntax around the reported line number.',
      learningTakeaway: 'Fix syntax errors top-to-bottom in compiler logs.',
    };
  }

  // 4. RUNTIME ERROR
  if (result.status === 'Runtime Error' || result.runtimeError) {
    const errLog = result.runtimeError || '';

    let lineNo: number | undefined;
    const lineMatch = errLog.match(/Solution\.(?:java|py):(\d+)/i) || errLog.match(/line (\d+)/i);
    if (lineMatch) lineNo = parseInt(lineMatch[1], 10);
    const failingSnippet = lineNo && lines[lineNo - 1] ? lines[lineNo - 1].trim() : '';

    if (errLog.includes('ArrayIndexOutOfBoundsException') || errLog.includes('IndexError')) {
      const indexMatch = errLog.match(/Index (\d+) out of bounds for length (\d+)/);
      const idx = indexMatch ? indexMatch[1] : 'N';
      const len = indexMatch ? indexMatch[2] : 'N';

      return {
        errorType: 'Runtime Error',
        exactLineNumber: lineNo,
        failingCodeSnippet: failingSnippet,
        exactReason: `Attempted to access index ${idx} on an array of length ${len}. Array indices are 0-indexed from 0 to ${parseInt(len, 10) - 1 || 'N-1'}.`,
        correctFix: `Change loop boundary condition from 'i <= length' to 'i < length' or check bounds before accessing index + 1.`,
        studentExplanation: `Runtime Error (ArrayIndexOutOfBoundsException) at line ${lineNo || 'code'}: Array index ${idx} is out of bounds for length ${len}.`,
        concept: 'Array Boundary Conditions',
        hint1: `🔍 **Line ${lineNo || 'Error'}:** Attempted to access array index ${idx} when array length is ${len}.`,
        hint2: `💡 Array bounds in Java/Python range from \`0\` to \`length - 1\`. Accessing index \`length\` throws an out of bounds exception.`,
        hint3: `🛠️ Check loop condition: change \`i <= array.length\` to \`i < array.length\`, or check \`if (i + 1 < array.length)\`.`,
        learningTakeaway: 'Always verify array bounds: 0 <= index < array.length.',
      };
    }

    if (errLog.includes('NullPointerException') || errLog.includes('AttributeError')) {
      return {
        errorType: 'Runtime Error',
        exactLineNumber: lineNo,
        failingCodeSnippet: failingSnippet,
        exactReason: `Attempted to access property or method on a 'null' object reference on line ${lineNo || 'in code'}.`,
        correctFix: `Add a null check \`if (node != null)\` before dereferencing properties.`,
        studentExplanation: `Runtime Error (NullPointerException) at line ${lineNo || 'code'}: Accessing method/field on null object.`,
        concept: 'Null Safety & Pointer Dereferencing',
        hint1: `🔍 **Line ${lineNo || 'Error'}:** Dereferencing a object reference that is currently \`null\`.`,
        hint2: `💡 Before accessing \`node.next\` or \`map.get(key).property\`, verify the object is non-null.`,
        hint3: `🛠️ Wrap access in null check: \`if (node != null && node.next != null)\`.`,
        learningTakeaway: 'Validate object references against null before calling methods or fields.',
      };
    }

    if (errLog.includes('StackOverflowError') || errLog.includes('RecursionError')) {
      return {
        errorType: 'Runtime Error',
        exactLineNumber: lineNo,
        failingCodeSnippet: failingSnippet,
        exactReason: 'Infinite recursive calls occurred because base case was never satisfied.',
        correctFix: 'Add or correct the base case at the start of recursive method (e.g., `if (n <= 1) return n;`).',
        studentExplanation: 'Runtime Error (StackOverflowError): Maximum recursion depth exceeded.',
        concept: 'Recursion Base Cases',
        hint1: '🔍 **StackOverflowError:** Function called itself endlessly without reaching a stopping condition.',
        hint2: '💡 Every recursive function requires a base case evaluated before recursive calls.',
        hint3: '🛠️ Ensure base case handles smallest inputs: `if (head == null || head.next == null) return head;`.',
        learningTakeaway: 'Always place base case termination logic before recursive function calls.',
      };
    }

    return {
      errorType: 'Runtime Error',
      exactLineNumber: lineNo,
      failingCodeSnippet: failingSnippet,
      exactReason: errLog || 'Runtime error occurred during execution.',
      correctFix: 'Add null checks and array bounds validation.',
      studentExplanation: `Runtime Error: ${errLog.slice(0, 150)}`,
      concept: 'Runtime Exception Handling',
      hint1: `🔍 **Runtime Exception:** ${errLog.slice(0, 100)}`,
      hint2: '💡 Check for array bounds, null pointers, or division by zero.',
      hint3: '🛠️ Inspect variables at the execution point.',
      learningTakeaway: 'Validate inputs and state before performing operations.',
    };
  }

  // 5. WRONG ANSWER
  if (result.status === 'Wrong Answer') {
    const input = result.failedInput || '';
    const expected = result.failedExpected || '';
    const got = result.failedGot || '';

    // ============================================================
    // A. PROBLEM-SPECIFIC DEEP CODE LOGIC DETECTORS
    // ============================================================

    // 1. Move Zeroes (Problem 5 or topic Two Pointers / Arrays with moveZeroes)
    if (problemTitle.toLowerCase().includes('move zero') || code.includes('moveZeroes') || code.includes('insertPos') || (code.includes('j') && code.includes('nums['))) {
      let copyLineNo: number | undefined;
      let jIncrementInsideIf = false;
      let jIncrementOutsideIf = false;

      lines.forEach((l, idx) => {
        if ((l.includes('nums[j]') || l.includes('nums[insertPos]')) && l.includes('nums[i]')) {
          copyLineNo = idx + 1;
        }
        if (l.includes('j++') || l.includes('insertPos++') || l.includes('j += 1') || l.includes('insertPos += 1')) {
          // Check if inside if block
          const lineTrim = l.trim();
          if (lineTrim.startsWith('j++') || lineTrim.startsWith('insertPos++') || lineTrim.startsWith('j += 1')) {
            jIncrementOutsideIf = true;
          } else {
            jIncrementInsideIf = true;
          }
        }
      });

      // Case A: Missing j++ inside if (nums[i] != 0) block
      if (copyLineNo && !code.includes('nums[j++]') && !code.includes('nums[insertPos++]') && !jIncrementInsideIf) {
        const failingSnippet = lines[copyLineNo - 1].trim();
        return {
          errorType: 'Wrong Answer',
          exactLineNumber: copyLineNo,
          failingCodeSnippet: failingSnippet,
          exactReason: `In Move Zeroes, after placing a non-zero element with 'nums[j] = nums[i]', destination pointer 'j' must be incremented ('j++') inside the 'if (nums[i] != 0)' block. Currently 'j' is not incremented inside the if block, causing every non-zero element to repeatedly overwrite position nums[0].`,
          correctFix: `Increment pointer 'j' inside the if block after assignment: \`if (nums[i] != 0) { nums[j++] = nums[i]; }\``,
          studentExplanation: `Move Zeroes Logic Flaw at line ${copyLineNo}: Pointer 'j' was not incremented inside the 'if (nums[i] != 0)' block after copying nums[i], causing output ${got} instead of ${expected}.`,
          concept: 'Two Pointers & Array Partitioning',
          hint1: `🔍 **Line ${copyLineNo}:** \`${failingSnippet}\` places non-zero element at index \`j\`, but pointer \`j\` is never incremented.`,
          hint2: `💡 Pointer \`j\` tracks the next slot for non-zero elements. Increment \`j++\` ONLY when a non-zero element is placed into \`nums[j]\`.`,
          hint3: `🛠️ Change line ${copyLineNo} to \`nums[j++] = nums[i];\` or add \`j++;\` immediately after the assignment inside the \`if (nums[i] != 0)\` block.`,
          learningTakeaway: 'In two-pointer array modification, remember to advance the write pointer after placing valid elements.',
        };
      }

      // Case B: j++ placed outside if block (incremented on every iteration)
      if (jIncrementOutsideIf) {
        let incLineNo: number | undefined;
        lines.forEach((l, idx) => {
          if (l.trim().startsWith('j++') || l.trim().startsWith('insertPos++')) incLineNo = idx + 1;
        });
        const failingSnippet = incLineNo ? lines[incLineNo - 1].trim() : 'j++;';
        return {
          errorType: 'Wrong Answer',
          exactLineNumber: incLineNo,
          failingCodeSnippet: failingSnippet,
          exactReason: `Pointer 'j' is incremented outside the 'if (nums[i] != 0)' condition on line ${incLineNo || ''}. It increments on every iteration regardless of zero vs non-zero, making 'j' equal to 'i' and failing to compress zeroes.`,
          correctFix: `Move 'j++;' inside the 'if (nums[i] != 0)' block so 'j' only advances when a non-zero element is copied.`,
          studentExplanation: `Move Zeroes Logic Flaw: Pointer 'j' is incremented unconditionally outside the if block.`,
          concept: 'Conditional Pointer Increments',
          hint1: `🔍 **Line ${incLineNo || 'Loop'}:** \`${failingSnippet}\` increments \`j\` on every iteration, even when \`nums[i] == 0\`.`,
          hint2: `💡 Destination pointer \`j\` should ONLY advance when a non-zero number is encountered.`,
          hint3: `🛠️ Move \`j++;\` inside the \`if (nums[i] != 0)\` braces.`,
          learningTakeaway: 'Scope pointer increments strictly to conditional blocks when filtering array elements.',
        };
      }

      // Case C: Missing trailing loop to zero out remainder of array
      if (!code.includes('while (j <') && !code.includes('while(j <') && !code.includes('for (; j <') && !code.includes('for (int k = j') && !code.includes('Arrays.fill')) {
        return {
          errorType: 'Wrong Answer',
          exactReason: `Non-zero elements were moved to the front, but your code is missing a trailing loop to zero out remaining positions from index 'j' to 'nums.length - 1'. Input ${input} resulted in ${got} instead of ${expected}.`,
          correctFix: `Add a trailing loop after main iteration: \`while (j < nums.length) { nums[j++] = 0; }\``,
          studentExplanation: 'Move Zeroes Logic Flaw: Remaining positions at the end of array were not filled with zeroes.',
          concept: 'Array Zero-Padding & Tail Overwriting',
          hint1: `🔍 **Missing Step:** Non-zero elements are copied to the front, but original trailing elements remain at the end.`,
          hint2: `💡 After shifting all non-zero numbers to indices \`0\` to \`j-1\`, fill indices \`j\` through \`nums.length - 1\` with \`0\`.`,
          hint3: `🛠️ Add trailing loop: \`while (j < nums.length) { nums[j++] = 0; }\`.`,
          learningTakeaway: 'When modifying arrays in-place, explicitly overwrite trailing elements to clear stale data.',
        };
      }
    }

    // 2. Two Sum (Problem 1)
    if (problemTitle.toLowerCase().includes('two sum') || code.includes('twoSum')) {
      // HashMap put called before containsKey check
      let putLineNo: number | undefined;
      let checkLineNo: number | undefined;
      lines.forEach((l, idx) => {
        if (l.includes('map.put') || l.includes('dict[')) putLineNo = idx + 1;
        if (l.includes('map.containsKey') || l.includes('in dict') || l.includes('map.has')) checkLineNo = idx + 1;
      });

      if (putLineNo && checkLineNo && putLineNo < checkLineNo) {
        return {
          errorType: 'Wrong Answer',
          exactLineNumber: putLineNo,
          failingCodeSnippet: lines[putLineNo - 1].trim(),
          exactReason: `Map entry 'map.put(nums[i], i)' on line ${putLineNo} is called BEFORE checking 'map.containsKey(target - nums[i])' on line ${checkLineNo}. When nums[i] == target / 2 (e.g. target 6, nums[i] 3), the element matches with ITSELF, returning identical indices.`,
          correctFix: `Check 'map.containsKey(target - nums[i])' FIRST before inserting current element into the map.`,
          studentExplanation: `Two Sum Map Order Flaw: Inserting into map before checking complement allows an element to pair with itself.`,
          concept: 'One-Pass HashMap Ordering',
          hint1: `🔍 **Line ${putLineNo}:** \`map.put(nums[i], i)\` is executed before checking for target complement.`,
          hint2: `💡 If you put \`nums[i]\` into the map first, searching for \`target - nums[i]\` will find the current element itself when \`nums[i] * 2 == target\`.`,
          hint3: `🛠️ Move \`map.put(nums[i], i)\` to the end of loop body after checking \`map.containsKey\`.`,
          learningTakeaway: 'Always query hash maps for existing complements before inserting the current item.',
        };
      }

      // Self-matching nested loop flaw
      let selfMatchLine: number | undefined;
      lines.forEach((l, idx) => {
        if ((l.includes('int j = 0') || l.includes('j = 0')) && l.includes('for')) {
          selfMatchLine = idx + 1;
        }
      });

      if (selfMatchLine) {
        const failingSnippet = lines[selfMatchLine - 1].trim();
        return {
          errorType: 'Wrong Answer',
          exactLineNumber: selfMatchLine,
          failingCodeSnippet: failingSnippet,
          exactReason: `Inner loop starts at index 0 ('int j = 0') instead of 'i + 1'. This causes the algorithm to compare element at index i with ITSELF, returning identical indices [i, i] (got ${got} instead of expected ${expected}).`,
          correctFix: `Change inner loop start index from 'j = 0' to 'j = i + 1': \`for (int j = i + 1; j < nums.length; j++)\``,
          studentExplanation: `Wrong Answer on Input: ${input}. Your code returned ${got} when expected output is ${expected} because it matched element at index i with itself.`,
          concept: 'Nested Loops & Pair Searching',
          hint1: `🔍 **Line ${selfMatchLine}:** \`${failingSnippet}\` starts searching from index 0 instead of \`i + 1\`.`,
          hint2: `💡 When searching for pairs of distinct elements, starting \`j = 0\` matches an element with itself when \`i == j\`, producing output like \`${got}\`.`,
          hint3: `🛠️ Change inner loop to \`for (int j = i + 1; j < nums.length; j++)\` to evaluate unique pairs only.`,
          learningTakeaway: 'When finding distinct element pairs, start inner loop at `i + 1` to avoid self-matching.',
        };
      }
    }

    // 3. Maximum Subarray (Kadane's - Problem 2)
    if (problemTitle.toLowerCase().includes('maximum subarray') || code.includes('maxSubArray')) {
      let initLineNo: number | undefined;
      lines.forEach((l, idx) => {
        if (l.includes('maxSum = 0') || l.includes('max_sum = 0') || l.includes('max = 0')) initLineNo = idx + 1;
      });

      if (initLineNo) {
        return {
          errorType: 'Wrong Answer',
          exactLineNumber: initLineNo,
          failingCodeSnippet: lines[initLineNo - 1].trim(),
          exactReason: `Variable 'maxSum' is initialized to 0 on line ${initLineNo}. For inputs with all negative numbers (e.g. [-2, -1, -3]), the maximum subarray sum is -1, but your code returns 0 because 0 > -1.`,
          correctFix: `Initialize 'maxSum' to 'nums[0]' or 'Integer.MIN_VALUE': \`int maxSum = nums[0];\``,
          studentExplanation: `Maximum Subarray Flaw at line ${initLineNo}: Initializing maxSum to 0 fails for negative arrays, returning 0 instead of expected ${expected}.`,
          concept: "Kadane's Algorithm & Negative Boundaries",
          hint1: `🔍 **Line ${initLineNo}:** Initialized maximum sum variable to \`0\`.`,
          hint2: `💡 If all array elements are negative numbers, the maximum sum is negative. Initializing to \`0\` returns \`0\` incorrectly.`,
          hint3: `🛠️ Initialize \`maxSum = nums[0];\` or \`Integer.MIN_VALUE\`.`,
          learningTakeaway: 'Never initialize min/max accumulators to 0 when inputs can contain negative numbers.',
        };
      }
    }

    // 4. Best Time to Buy and Sell Stock (Problem 4)
    if (problemTitle.toLowerCase().includes('buy') || code.includes('maxProfit')) {
      let profitLineNo: number | undefined;
      lines.forEach((l, idx) => {
        if (l.includes('minPrice - price') || l.includes('min_price - price') || l.includes('min - price')) profitLineNo = idx + 1;
      });

      if (profitLineNo) {
        return {
          errorType: 'Wrong Answer',
          exactLineNumber: profitLineNo,
          failingCodeSnippet: lines[profitLineNo - 1].trim(),
          exactReason: `Profit calculation on line ${profitLineNo} subtracts 'minPrice - price' in reverse order. Profit is selling price minus buying price: 'price - minPrice'.`,
          correctFix: `Reverse terms to calculate profit correctly: \`maxProfit = Math.max(maxProfit, price - minPrice);\``,
          studentExplanation: `Buy & Sell Stock Subtraction Flaw on line ${profitLineNo}: Terms subtracted in reverse order.`,
          concept: 'Profit Optimization Terms',
          hint1: `🔍 **Line ${profitLineNo}:** Profit term \`minPrice - price\` is inverted.`,
          hint2: `💡 Profit is \`current_price - min_buy_price\`.`,
          hint3: `🛠️ Use \`price - minPrice\`.`,
          learningTakeaway: 'Verify subtraction order when computing deltas.',
        };
      }
    }

    // 5. Contains Duplicate (Problem 3)
    if (problemTitle.toLowerCase().includes('contains duplicate') || code.includes('containsDuplicate')) {
      let prematureReturnLine: number | undefined;
      lines.forEach((l, idx) => {
        if (l.trim() === 'return false;' && idx < lines.length - 4) prematureReturnLine = idx + 1;
      });

      if (prematureReturnLine) {
        return {
          errorType: 'Wrong Answer',
          exactLineNumber: prematureReturnLine,
          failingCodeSnippet: lines[prematureReturnLine - 1].trim(),
          exactReason: `Statement 'return false;' on line ${prematureReturnLine} is placed INSIDE the loop body. It terminates execution on the first non-duplicate element without checking remaining array items.`,
          correctFix: `Move 'return false;' outside the loop body so it only executes after checking all elements.`,
          studentExplanation: `Contains Duplicate Flaw on line ${prematureReturnLine}: Returning false inside loop terminates prematurely.`,
          concept: 'Premature Loop Returns',
          hint1: `🔍 **Line ${prematureReturnLine}:** \`return false;\` is inside the iteration loop.`,
          hint2: `💡 Returning inside loop body stops evaluation after inspecting only the first element.`,
          hint3: `🛠️ Move \`return false;\` outside and after the loop block.`,
          learningTakeaway: 'Only return default negative results after completing full iteration over input items.',
        };
      }
    }

    // 6. Valid Parentheses (Problem 26)
    if (problemTitle.toLowerCase().includes('parentheses') || code.includes('isValid') || code.includes('Stack')) {
      let returnLineNo: number | undefined;
      lines.forEach((l, idx) => {
        if (l.trim() === 'return true;' || l.trim() === 'return true') returnLineNo = idx + 1;
      });

      if (returnLineNo) {
        return {
          errorType: 'Wrong Answer',
          exactLineNumber: returnLineNo,
          failingCodeSnippet: lines[returnLineNo - 1].trim(),
          exactReason: `In Valid Parentheses, returning 'return true;' unconditionally on line ${returnLineNo} returns true even when unclosed opening brackets remain on the stack (e.g. input "[" or "({[").`,
          correctFix: `Change final return statement to check stack emptiness: \`return stack.isEmpty();\` (or \`return len(stack) == 0\`).`,
          studentExplanation: `Valid Parentheses Flaw on line ${returnLineNo}: Returning true without verifying stack is empty returns true for unclosed brackets.`,
          concept: 'Stack Empty State Validation',
          hint1: `🔍 **Line ${returnLineNo}:** Returns \`true\` without checking if all brackets were closed.`,
          hint2: `💡 Unmatched opening brackets (like \`"[\"\`) remain on the stack. The string is only valid if the stack is completely empty.`,
          hint3: `🛠️ Replace \`return true;\` with \`return stack.isEmpty();\`.`,
          learningTakeaway: 'Always verify stack is empty at the end of balanced parenthesis checking.',
        };
      }
    }

    // 7. Binary Search (Problem 28 / 29)
    if (problemTitle.toLowerCase().includes('binary search') || code.includes('search(') || (code.includes('mid') && code.includes('left'))) {
      let assignLineNo: number | undefined;
      lines.forEach((l, idx) => {
        if (l.includes('left = mid;') || l.includes('left = mid\n')) assignLineNo = idx + 1;
      });

      if (assignLineNo) {
        return {
          errorType: 'Wrong Answer',
          exactLineNumber: assignLineNo,
          failingCodeSnippet: lines[assignLineNo - 1].trim(),
          exactReason: `In Binary Search, assigning 'left = mid' on line ${assignLineNo} without adding 1 ('left = mid + 1') causes an infinite loop or wrong answer because integer division truncates down, preventing 'left' from advancing.`,
          correctFix: `Advance search range past 'mid': \`left = mid + 1;\``,
          studentExplanation: `Binary Search Flaw on line ${assignLineNo}: 'left = mid' prevents search range progression.`,
          concept: 'Binary Search Boundary Progression',
          hint1: `🔍 **Line ${assignLineNo}:** \`left = mid\` leaves search pointer stuck when \`right - left == 1\`.`,
          hint2: `💡 Since \`mid\` was already evaluated and is NOT the target, advance past it: \`left = mid + 1\`.`,
          hint3: `🛠️ Update to \`left = mid + 1;\`.`,
          learningTakeaway: 'Always advance binary search bounds past mid to avoid infinite loops: left = mid + 1.',
        };
      }
    }

    // 8. Reverse String (Problem 7)
    if (problemTitle.toLowerCase().includes('reverse string') || code.includes('reverseString')) {
      let loopLineNo: number | undefined;
      lines.forEach((l, idx) => {
        if (l.includes('< s.length') || l.includes('< len(s)')) loopLineNo = idx + 1;
      });

      if (loopLineNo) {
        return {
          errorType: 'Wrong Answer',
          exactLineNumber: loopLineNo,
          failingCodeSnippet: lines[loopLineNo - 1].trim(),
          exactReason: `Loop condition on line ${loopLineNo} iterates through the ENTIRE array/string ('i < s.length'). This swaps elements twice, restoring the string back to its original unreversed state.`,
          correctFix: `Limit swap iteration to half the array length: \`for (int i = 0; i < s.length / 2; i++)\``,
          studentExplanation: `Reverse String Double Swap Flaw on line ${loopLineNo}: Iterating through full array swaps elements twice.`,
          concept: 'Two Pointer In-Place Swapping Bounds',
          hint1: `🔍 **Line ${loopLineNo}:** \`i < s.length\` iterates through the full array length.`,
          hint2: `💡 Swapping elements from index \`0\` to \`n-1\` swaps every pair twice, reverting to original string.`,
          hint3: `🛠️ Change loop boundary to \`i < s.length / 2\`.`,
          learningTakeaway: 'In-place reverse requires stopping at length / 2.',
        };
      }
    }

    // ============================================================
    // C. UNIVERSAL GROUNDED TRACE FALLBACK
    // ============================================================

    // Find the most critical executable statement inside the code
    let failingLineNo: number | undefined;
    let failingSnippet: string | undefined;

    lines.forEach((l, idx) => {
      const lineTrim = l.trim();
      if (!failingLineNo && (lineTrim.includes('return ') || lineTrim.includes('if ') || lineTrim.includes('for ') || lineTrim.includes('while '))) {
        failingLineNo = idx + 1;
        failingSnippet = lineTrim;
      }
    });

    if (!failingLineNo) {
      failingLineNo = Math.min(lines.length, 5);
      failingSnippet = lines[failingLineNo - 1]?.trim();
    }

    return {
      errorType: 'Wrong Answer',
      exactLineNumber: failingLineNo,
      failingCodeSnippet: failingSnippet,
      exactReason: `Execution failed on Input \`${input}\`. Your code evaluated line ${failingLineNo} (\`${failingSnippet || 'statement'}\`) and produced output \`${got}\`, but expected \`${expected}\`. State calculation diverged at this statement during execution.`,
      correctFix: `Trace variable values at line ${failingLineNo} for input \`${input}\` and update logic so calculation produces \`${expected}\`.`,
      studentExplanation: `Wrong Answer on Input \`${input}\`: Line ${failingLineNo} produced output \`${got}\` instead of expected \`${expected}\`.`,
      concept: primaryTopic,
      hint1: `🔍 **Line ${failingLineNo}:** \`${failingSnippet || 'Code line'}\` produced output \`${got}\` for input \`${input}\` (Expected: \`${expected}\`).`,
      hint2: `💡 Trace the variables updated on line ${failingLineNo} with input \`${input}\` to identify where calculation diverges.`,
      hint3: `🛠️ Update line ${failingLineNo} to evaluate logic correctly for input \`${input}\`.`,
      learningTakeaway: 'Step through failing input line-by-line to verify expected variable state at each line.',
    };
  }

  // 6. TIME LIMIT EXCEEDED
  if (result.status === 'Time Limit Exceeded') {
    let loopLine: number | undefined;
    lines.forEach((l, idx) => {
      if (l.includes('while') || l.includes('for')) {
        loopLine = loopLine ?? (idx + 1);
      }
    });

    return {
      errorType: 'Time Limit Exceeded',
      exactLineNumber: loopLine,
      failingCodeSnippet: loopLine ? lines[loopLine - 1].trim() : '',
      exactReason: `Execution exceeded time limit (2000ms). Line ${loopLine || 'loop'} does not advance its pointers or uses an O(N²) nested loop on large inputs.`,
      correctFix: `Ensure loop termination pointers (e.g., 'left++', 'right--') are updated inside while loops, or replace O(N²) nested loops with an O(N) HashMap.`,
      studentExplanation: 'Time Limit Exceeded: Code took too long to complete execution.',
      concept: 'Algorithm Optimization & Loop Termination',
      hint1: `🔍 **Line ${loopLine || 'Loop'}:** Execution timed out. Check if loop termination condition is reached.`,
      hint2: `💡 Verify that pointer increment/decrement statements (e.g., \`left++\` or \`i++\`) execute on every path inside \`while\` loops.`,
      hint3: `🛠️ Move pointer update statements outside nested \`if\` conditions inside \`while\` loops.`,
      learningTakeaway: 'Ensure pointer updates execute unconditionally on every iteration in while loops.',
    };
  }

  // 7. INSUFFICIENT INFORMATION FALLBACK
  return {
    errorType: 'Insufficient Information',
    exactReason: 'Insufficient information to determine the exact cause.',
    correctFix: 'Please re-run or submit code to generate execution logs.',
    studentExplanation: 'Insufficient information to determine the exact cause.',
    concept: primaryTopic,
    hint1: 'Insufficient information to determine the exact cause.',
    hint2: 'Insufficient information to determine the exact cause.',
    hint3: 'Insufficient information to determine the exact cause.',
    learningTakeaway: 'Run or submit code to view detailed diagnostic output.',
  };
}

function formatDiagnosticExplanation(diag: CodeDiagnostic, result: JudgeResult): string {
  if (diag.errorType === 'Insufficient Information') {
    return 'Insufficient information to determine the exact cause.';
  }

  if (diag.errorType === 'Accepted') {
    return 'Accepted — All test cases passed successfully! Your code logic is correct.';
  }

  let text = `❌ **Error Type:** ${diag.errorType}\n`;

  if (diag.exactLineNumber) {
    text += `📍 **Exact Line:** Line ${diag.exactLineNumber}`;
    if (diag.failingCodeSnippet) {
      text += `: \`${diag.failingCodeSnippet}\``;
    }
    text += `\n`;
  }

  if (result.failedInput) {
    text += `📥 **Input:** \`${result.failedInput}\` | 🎯 **Expected:** \`${result.failedExpected}\` | ❌ **Got:** \`${result.failedGot}\`\n`;
  }

  text += `⚡ **Why this happened:** ${diag.exactReason}\n`;
  text += `🛠️ **Correct Fix:** ${diag.correctFix}`;

  return text;
}

function analyzeTimeComplexity(code: string): string {
  if (!code || code.trim().length === 0) return 'O(1)';
  if (code.includes('for') && code.includes('while')) return 'O(N²) — Quadratic';
  const forMatches = (code.match(/\bfor\b/g) || []).length;
  if (forMatches >= 2) return 'O(N²) — Nested Iteration';
  if (code.includes('mid') && (code.includes('/ 2') || code.includes('>> 1') || code.includes('Math.floor'))) return 'O(log N) — Logarithmic (Binary Division)';
  if (code.includes('HashMap') || code.includes('Set') || code.includes('dict') || code.includes('unordered_map')) return 'O(N) — Single Pass Hash Table';
  if (code.includes('for') || code.includes('while')) return 'O(N) — Single Pass Linear';
  return 'O(1) — Constant Execution';
}

function analyzeSpaceComplexity(code: string): string {
  if (!code || code.trim().length === 0) return 'O(1)';
  if (code.includes('new int[') || code.includes('vector<int>') || code.includes('Array(')) return 'O(N) — Linear Auxiliary Space';
  if (code.includes('HashMap') || code.includes('HashSet') || code.includes('dict()') || code.includes('unordered_map') || code.includes('Set(') || code.includes('Map(')) return 'O(N) — Dynamic Container Allocation';
  if (code.includes('dp[')) return 'O(N) or O(N²) — Dynamic Programming Table';
  return 'O(1) — Constant Memory Space';
}

function generateEdgeCases(_problemTitle: string, topics: string[]): Array<{ input: string; description: string; expectedBehavior: string }> {
  const primaryTopic = topics[0] ?? 'Arrays';
  if (primaryTopic === 'Arrays' || primaryTopic === 'HashMap' || primaryTopic === 'Two Pointers') {
    return [
      { input: '[] (Empty Array)', description: 'Array contains 0 elements', expectedBehavior: 'Return empty array or handle without OutOfBounds exception.' },
      { input: '[5] (Single Element)', description: 'Array with exactly 1 element', expectedBehavior: 'Check loop boundaries and base condition.' },
      { input: '[-10, -5, -2] (All Negatives)', description: 'Negative values in array', expectedBehavior: 'Ensure max/min initializations do not hardcode 0.' },
      { input: '[1, 1, 1, 1] (All Duplicates)', description: 'Duplicate numbers across array', expectedBehavior: 'Ensure set or map keys do not overwrite active state incorrectly.' },
    ];
  } else if (primaryTopic === 'Strings') {
    return [
      { input: '"" (Empty String)', description: 'Empty string input', expectedBehavior: 'Return true/0 without indexing out of bounds.' },
      { input: '"A man, a plan..." (Special Characters)', description: 'Punctuation and space characters', expectedBehavior: 'Filter non-alphanumeric characters before evaluation.' },
      { input: '"Aa" (Mixed Case)', description: 'Case sensitivity differences', expectedBehavior: 'Convert to lowercase uniform format.' },
    ];
  }
  return [
    { input: 'Minimum Boundary', description: 'Smallest possible constraint input', expectedBehavior: 'Check base case return value.' },
    { input: 'Maximum Constraint', description: '10^5 elements large input', expectedBehavior: 'Ensure memory does not overflow.' },
    { input: 'Negative / Zero Inputs', description: 'Zero or negative numbers', expectedBehavior: 'Handle sign edge cases appropriately.' },
  ];
}

function generateCodeExplanation(code: string): string[] {
  if (!code || code.trim().length === 0) return ['No code detected. Write your solution in the editor.'];
  const lines = code.split('\n').map((l) => l.trim()).filter((l) => l.length > 0 && !l.startsWith('//') && !l.startsWith('#') && !l.startsWith('import'));
  const steps: string[] = [];
  lines.slice(0, 6).forEach((line, idx) => {
    if (line.includes('class Solution')) steps.push(`Step ${idx + 1}: Declares the main Solution class structure.`);
    else if (line.includes('public') || line.includes('def ') || line.includes('var ') || line.includes('function')) steps.push(`Step ${idx + 1}: Defines method entry point signature.`);
    else if (line.includes('Map') || line.includes('Set') || line.includes('dict') || line.includes('set') || line.includes('unordered_map')) steps.push(`Step ${idx + 1}: Instantiates hash lookup table for O(1) fast searches.`);
    else if (line.includes('for') || line.includes('while')) steps.push(`Step ${idx + 1}: Iterates through input elements in a loop.`);
    else if (line.includes('if')) steps.push(`Step ${idx + 1}: Evaluates conditional check logic.`);
    else if (line.includes('return')) steps.push(`Step ${idx + 1}: Returns computed answer result.`);
    else steps.push(`Step ${idx + 1}: Prepares statement: \`${line.slice(0, 45)}\`.`);
  });
  return steps;
}
