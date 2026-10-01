import { useState, useCallback } from 'react';
import type { AIHintResponse, JudgeResult } from '../types';
import { analyzeWithGemini } from '../services/geminiService';

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIHintResponse | null>(null);

  const analyze = useCallback(
    async (
      problemTitle: string,
      code: string,
      result: JudgeResult,
      topics: string[]
    ): Promise<AIHintResponse> => {
      setIsLoading(true);
      setResponse(null);

      const aiResp = await analyzeWithGemini(problemTitle, code, result, topics);

      setResponse(aiResp);
      setIsLoading(false);
      return aiResp;
    },
    []
  );

  const reset = useCallback(() => {
    setResponse(null);
    setIsLoading(false);
  }, []);

  return { analyze, response, isLoading, reset };
}
