import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

function testJava(studentCode, input) {
  return new Promise((resolve) => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cm-test-'));
    const cleanInput = input.trim();
    const harness = `import java.util.*;
import java.io.*;

${studentCode}

class Main {
    public static void main(String[] args) throws Exception {
        String raw = "${cleanInput.replace(/"/g, '\\"').replace(/\n/g, '\\n')}";
        Solution sol = new Solution();
        try {
            if (raw.contains("=")) {
                String[] segments = raw.split(",\\\\s*(?=[a-zA-Z]+\\\\s*=)");
                List<Object> parsedArgs = new ArrayList<>();
                for (String seg : segments) {
                    String val = seg.contains("=") ? seg.split("=", 2)[1].trim() : seg.trim();
                    parsedArgs.add(parseValue(val));
                }
                System.out.println(callSolution(sol, parsedArgs));
            } else if (raw.contains("|")) {
                String[] parts = raw.split("\\\\|");
                List<Object> parsedArgs = new ArrayList<>();
                for (String p : parts) parsedArgs.add(parseValue(p.trim()));
                System.out.println(callSolution(sol, parsedArgs));
            } else {
                System.out.println(callSolution(sol, List.of(parseValue(raw))));
            }
        } catch (java.lang.reflect.InvocationTargetException e) {
            Throwable target = e.getTargetException();
            System.err.println("RuntimeError: " + (target != null ? target.toString() : e.getMessage()));
            System.exit(1);
        } catch (Exception e) {
            System.err.println("RuntimeError: " + e.getMessage());
            System.exit(1);
        }
    }
    static Object parseValue(String s) {
        s = s.trim();
        if (s.startsWith("[")) {
            s = s.replaceAll("[\\\\[\\\\]]", "");
            if (s.isEmpty()) return new int[0];
            String[] parts = s.split(",");
            try {
                int[] arr = new int[parts.length];
                for (int i = 0; i < parts.length; i++) arr[i] = Integer.parseInt(parts[i].trim());
                return arr;
            } catch (Exception ignored) {}
            return Arrays.stream(parts).map(String::trim).toArray(String[]::new);
        }
        if (s.equalsIgnoreCase("true"))  return true;
        if (s.equalsIgnoreCase("false")) return false;
        if (s.startsWith("\\\"") && s.endsWith("\\\"") && s.length() >= 2) s = s.substring(1, s.length() - 1);
        if (s.startsWith("'") && s.endsWith("'") && s.length() >= 2) s = s.substring(1, s.length() - 1);
        try { return Integer.parseInt(s); }  catch (Exception ignored) {}
        try { return Long.parseLong(s); }    catch (Exception ignored) {}
        return s;
    }
    static String callSolution(Solution sol, List<Object> args) throws Exception {
        for (var method : Solution.class.getDeclaredMethods()) {
            if (java.lang.reflect.Modifier.isPublic(method.getModifiers()) && !method.getName().equals("main")) {
                Class<?>[] types = method.getParameterTypes();
                if (types.length == args.size()) {
                    Object[] converted = new Object[args.size()];
                    for (int i = 0; i < args.size(); i++) converted[i] = coerce(args.get(i), types[i]);
                    Object result = method.invoke(sol, converted);
                    return formatResult(result, converted.length > 0 ? converted[0] : null);
                }
            }
        }
        throw new RuntimeException("No matching method found for " + args.size() + " args");
    }
    static Object coerce(Object val, Class<?> type) {
        if (type == int[].class && val instanceof int[]) return val;
        if (type == int.class   || type == Integer.class) return ((Number)val).intValue();
        if (type == boolean.class || type == Boolean.class) return val;
        if (type == String.class) return val.toString();
        return val;
    }
    static String formatResult(Object result, Object firstArg) {
        if (result == null) {
            if (firstArg instanceof int[]) return Arrays.toString((int[])firstArg).replace(", ", ",");
            return String.valueOf(firstArg);
        }
        if (result instanceof int[])   return Arrays.toString((int[])result).replace(", ", ",");
        if (result instanceof Boolean) return result.toString().toLowerCase();
        return result.toString();
    }
}
`;
    fs.writeFileSync(path.join(tmp, 'Main.java'), harness);
    execFile('javac', ['-encoding', 'UTF-8', 'Main.java'], { cwd: tmp, timeout: 8000 }, (compileErr, compileStdout, compileStderr) => {
      if (compileErr || (compileStderr && compileStderr.includes('error:'))) {
        fs.rmSync(tmp, { recursive: true, force: true });
        resolve({ type: 'COMPILE_ERROR', error: compileStderr });
        return;
      }
      execFile('java', ['Main'], { cwd: tmp, timeout: 4000 }, (runErr, runStdout, runStderr) => {
        fs.rmSync(tmp, { recursive: true, force: true });
        if (runErr || (runStderr && runStderr.includes('RuntimeError:'))) {
          resolve({ type: 'RUNTIME_ERROR', error: runStderr });
        } else {
          resolve({ type: 'SUCCESS', output: runStdout.trim() });
        }
      });
    });
  });
}

async function run() {
  const correctCode = `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) {
                return new int[] { map.get(comp), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`;

  const wrongCode = `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{0, 0}; // WRONG!
    }
}`;

  const badSyntaxCode = `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{0, 0} // Missing semicolon!
    }
}`;

  console.log('1. Testing correct code:', await testJava(correctCode, 'nums = [2,7,11,15], target = 9'));
  console.log('2. Testing wrong code:', await testJava(wrongCode, 'nums = [2,7,11,15], target = 9'));
  console.log('3. Testing bad syntax code:', await testJava(badSyntaxCode, 'nums = [2,7,11,15], target = 9'));
}

run();
