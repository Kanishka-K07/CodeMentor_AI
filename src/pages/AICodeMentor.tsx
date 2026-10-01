import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, Lightbulb, BookOpen, AlertCircle, CheckCircle,
  ChevronDown, ChevronUp, Sparkles, Code2, Target, ArrowRight,
  Lock,
} from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { useAI } from '../hooks/useAI';
import { problems } from '../data/problems';
import type { AIHintResponse } from '../types';

// ============================================================
// HINT CARD (progressive unlock)
// ============================================================
function HintCard({
  hint,
  number,
  unlocked,
  onUnlock,
}: {
  hint: string;
  number: number;
  unlocked: boolean;
  onUnlock: () => void;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        border: unlocked ? '1px solid rgba(88,166,255,0.3)' : '1px solid var(--color-border)',
        background: unlocked ? 'rgba(88,166,255,0.04)' : 'var(--color-bg-card)',
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => !unlocked && onUnlock()}
        style={{ borderBottom: unlocked ? '1px solid rgba(88,166,255,0.15)' : 'none' }}
      >
        <div className="flex items-center gap-2">
          {unlocked ? (
            <Lightbulb size={15} style={{ color: '#58a6ff' }} />
          ) : (
            <Lock size={15} className="text-muted" />
          )}
          <span className="text-sm font-semibold" style={{ color: unlocked ? '#58a6ff' : 'var(--color-text-muted)' }}>
            Hint {number} of 3
          </span>
          {!unlocked && (
            <span className="text-xs text-muted">(Click to reveal)</span>
          )}
        </div>
        {unlocked ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
      </div>

      {unlocked && (
        <div className="px-4 py-3 text-sm text-secondary leading-relaxed animate-fade-in">
          {hint}
        </div>
      )}
    </div>
  );
}

// ============================================================
// AI RESPONSE DISPLAY
// ============================================================
function AIResponsePanel({ response }: { response: AIHintResponse }) {
  const [unlockedHints, setUnlockedHints] = useState<number[]>([]);

  const unlockHint = (n: number) => {
    if (!unlockedHints.includes(n)) {
      setUnlockedHints((prev) => [...prev, n]);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Error Explanation */}
      <div className="rounded-xl p-5" style={{ background: 'rgba(248,81,73,0.06)', border: '1px solid rgba(248,81,73,0.2)' }}>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={16} style={{ color: '#f85149' }} />
          <h3 className="font-semibold text-sm text-primary">Why Your Code Failed</h3>
        </div>
        <p className="text-sm text-secondary leading-relaxed">
          {response.errorExplanation}
        </p>
      </div>

      {/* Concept Detected */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold"
          style={{ background: 'rgba(188,140,255,0.12)', color: '#bc8cff', border: '1px solid rgba(188,140,255,0.3)' }}
        >
          <Target size={14} />
          Core Concept: {response.conceptDetected}
        </div>
      </div>

      {/* Progressive Hints */}
      <div>
        <h3 className="font-semibold text-sm text-primary mb-3 flex items-center gap-2">
          <Lightbulb size={15} style={{ color: '#d29922' }} />
          Progressive Hints
          <span className="text-xs text-muted font-normal">(Reveal one at a time)</span>
        </h3>
        <div className="space-y-2">
          <HintCard
            hint={response.hint1}
            number={1}
            unlocked={unlockedHints.includes(1)}
            onUnlock={() => unlockHint(1)}
          />
          <HintCard
            hint={response.hint2}
            number={2}
            unlocked={unlockedHints.includes(2)}
            onUnlock={() => (unlockedHints.includes(1) ? unlockHint(2) : null)}
          />
          <HintCard
            hint={response.hint3}
            number={3}
            unlocked={unlockedHints.includes(3)}
            onUnlock={() => (unlockedHints.includes(2) ? unlockHint(3) : null)}
          />
        </div>
        {!unlockedHints.includes(1) && (
          <p className="text-xs text-muted mt-2 text-center">
            Reveal Hint 1 first to unlock the sequence
          </p>
        )}
      </div>

      {/* Learning Takeaway */}
      <div className="rounded-xl p-4" style={{ background: 'rgba(63,185,80,0.06)', border: '1px solid rgba(63,185,80,0.2)' }}>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle size={14} style={{ color: '#3fb950' }} />
          <h3 className="font-semibold text-sm text-primary">Learning Takeaway</h3>
        </div>
        <p className="text-sm text-secondary leading-relaxed">{response.learningTakeaway}</p>
      </div>

      {/* Follow-up Question */}
      <div className="ai-panel p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={15} style={{ color: '#bc8cff' }} />
          <h3 className="font-semibold text-sm text-primary">Personalized Practice Question</h3>
        </div>
        <div
          className="rounded-lg p-4 mb-3"
          style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
        >
          <h4 className="font-semibold text-sm text-primary mb-2">
            {response.followUpQuestion.title}
          </h4>
          <p className="text-xs text-secondary leading-relaxed">
            {response.followUpQuestion.description}
          </p>
          <div className="mt-2">
            <span className="topic-tag">{response.followUpQuestion.concept}</span>
          </div>
        </div>
        <p className="text-xs text-muted">
          This question was generated based on the concept you struggled with: <strong style={{ color: '#bc8cff' }}>{response.conceptDetected}</strong>
        </p>
      </div>
    </div>
  );
}

// ============================================================
// PROBLEM SELECTOR
// ============================================================
function ProblemSelector({
  onSelect,
}: {
  onSelect: (problemId: number) => void;
}) {
  const { state } = useAppContext();
  const recentProblems = useMemo(() => {
    return state.submissions
      .filter((s) => s.result.status !== 'Accepted')
      .slice(0, 10)
      .map((s) => problems.find((p) => p.id === s.problemId))
      .filter(Boolean)
      .filter((p, i, arr) => arr.findIndex((x) => x?.id === p?.id) === i);
  }, [state.submissions]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-secondary">
        Select a problem you're struggling with, or paste your code and error below:
      </p>

      {recentProblems.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
            Recent Failed Problems
          </h3>
          <div className="space-y-2">
            {recentProblems.map((p) => (
              <button
                key={p!.id}
                onClick={() => onSelect(p!.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg text-left transition-all"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted">{p!.id}.</span>
                  <span className="text-sm font-medium text-primary">{p!.title}</span>
                  <span className={`badge-${p!.difficulty.toLowerCase()}`}>{p!.difficulty}</span>
                </div>
                <ArrowRight size={14} className="text-muted" />
              </button>
            ))}
          </div>
        </div>
      )}

      {recentProblems.length === 0 && (
        <div
          className="rounded-xl p-6 text-center"
          style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
        >
          <Brain size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm text-muted">
            No failed submissions yet. Solve some problems first, then come back for hints!
          </p>
          <Link to="/problems" className="btn-primary mt-4 inline-flex">
            Browse Problems
          </Link>
        </div>
      )}
    </div>
  );
}

// ============================================================
// AI CODEMENTOR PAGE
// ============================================================
export default function AICodeMentor() {
  const { state } = useAppContext();
  const { analyze, response, isLoading, reset } = useAI();
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);
  const [customCode, setCustomCode] = useState('');

  const selectedProblem = selectedProblemId ? problems.find((p) => p.id === selectedProblemId) : null;

  // Use last AI response from global state if available
  const displayResponse = response ?? state.lastAIResponse;

  const handleAnalyze = async () => {
    if (!selectedProblem) return;

    const lastSubmission = state.submissions.find((s) => s.problemId === selectedProblem.id);
    const codeToAnalyze = customCode || lastSubmission?.code || '';
    const resultToAnalyze = lastSubmission?.result ?? {
      status: 'Wrong Answer',
      passedCount: 0,
      totalCount: selectedProblem.hiddenTests.length,
      executionTime: 0,
      memoryUsed: 0,
    };

    await analyze(
      selectedProblem.title,
      codeToAnalyze,
      resultToAnalyze as any,
      selectedProblem.topics
    );
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(188,140,255,0.12), rgba(88,166,255,0.08))',
          border: '1px solid rgba(188,140,255,0.25)',
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-xl shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(188,140,255,0.2), rgba(88,166,255,0.15))' }}
          >
            <Brain size={28} style={{ color: '#bc8cff' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary mb-1">
              AI <span className="text-gradient">CodeMentor</span>
            </h1>
            <p className="text-secondary text-sm leading-relaxed">
              Don't just fix your code. <strong style={{ color: '#58a6ff' }}>Understand why it failed.</strong>
              <br />
              I'll analyze your mistakes, identify the core concept, and guide you with progressive Socratic hints.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Problem selection */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
              <Code2 size={15} style={{ color: '#58a6ff' }} />
              Select Problem
            </h2>
            <ProblemSelector onSelect={(id) => { setSelectedProblemId(id); reset(); }} />
          </div>

          {selectedProblem && (
            <div className="glass-card p-5 animate-fade-in space-y-3">
              <h3 className="text-sm font-semibold text-primary mb-2">{selectedProblem.title}</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className={`badge-${selectedProblem.difficulty.toLowerCase()}`}>{selectedProblem.difficulty}</span>
                {selectedProblem.topics.slice(0, 3).map((t) => (
                  <span key={t} className="topic-tag">{t}</span>
                ))}
              </div>

              {/* Optional custom code override */}
              <div className="space-y-1">
                <label className="text-xs text-muted font-medium">
                  Paste your code (optional — uses your last submission by default):
                </label>
                <textarea
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder={`// Paste your ${selectedProblem.title} code here...`}
                  rows={6}
                  spellCheck={false}
                  className="w-full text-xs rounded-lg resize-y"
                  style={{
                    background: 'var(--color-bg-primary)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                    fontFamily: '"JetBrains Mono", monospace',
                    padding: '10px 12px',
                    outline: 'none',
                    lineHeight: 1.6,
                    minHeight: '100px',
                  }}
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="btn-primary w-full justify-center"
                style={{
                  background: isLoading ? 'rgba(188,140,255,0.3)' : 'linear-gradient(135deg, #bc8cff, #58a6ff)',
                  color: '#0d1117',
                }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  <>
                    <Brain size={14} />
                    Analyze & Get Hints
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right: AI Response */}
        <div className="lg:col-span-3">
          {isLoading && (
            <div className="glass-card p-8 text-center animate-fade-in">
              <div className="w-12 h-12 border-3 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderWidth: 3, borderColor: '#bc8cff', borderTopColor: 'transparent' }} />
              <p className="text-secondary text-sm font-medium">AI is analyzing your code...</p>
              <p className="text-muted text-xs mt-1">Identifying root cause and preparing Socratic hints</p>
            </div>
          )}

          {!isLoading && displayResponse && (
            <div className="glass-card p-5">
              <AIResponsePanel response={displayResponse} />
            </div>
          )}

          {!isLoading && !displayResponse && !selectedProblemId && (
            <div
              className="glass-card p-8 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(28,33,40,0.8), rgba(22,27,34,0.8))' }}
            >
              <Brain size={48} className="mx-auto mb-4" style={{ color: '#bc8cff', opacity: 0.4 }} />
              <h3 className="font-semibold text-primary mb-2">Ready to Help You Learn</h3>
              <p className="text-secondary text-sm max-w-xs mx-auto leading-relaxed">
                Select a problem from the left panel. I'll explain what went wrong and guide you to the solution step by step.
              </p>
              <div
                className="mt-5 p-4 rounded-xl text-left"
                style={{ background: 'rgba(88,166,255,0.06)', border: '1px solid rgba(88,166,255,0.15)' }}
              >
                <p className="text-xs text-muted mb-2 font-semibold uppercase tracking-wide">How it works</p>
                <div className="space-y-2 text-xs text-secondary">
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#58a6ff' }}>1.</span>
                    <span>I detect which programming concept your solution missed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#58a6ff' }}>2.</span>
                    <span>I explain WHY your code fails in plain English</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#58a6ff' }}>3.</span>
                    <span>Progressive hints guide you without giving the answer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#58a6ff' }}>4.</span>
                    <span>A personalized follow-up question reinforces the concept</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
