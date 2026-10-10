import React, { useState, useMemo, useEffect } from 'react';
import {
  Brain, Lightbulb, AlertCircle, CheckCircle,
  ChevronDown, ChevronUp, Sparkles, Code2, Target, ArrowRight,
  Lock, Play, Send, RefreshCw, Copy, Search, X,
  Terminal, Layers, BookOpen
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';
import { useAppContext } from '../store/AppContext';
import { useJudge } from '../hooks/useJudge';
import { useAI } from '../hooks/useAI';
import { problems, getProblemById } from '../data/problems';
import { generateCustomProblemWithAI } from '../services/customProblemService';
import { storageService } from '../services/storageService';
import type { Problem, AIHintResponse, JudgeResult, Submission, Difficulty, Topic } from '../types';

// ============================================================
// HINT CARD (Progressive Socratic Unlock)
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
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
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
// AI RESPONSE PANEL
// ============================================================
function AIResponsePanel({ response }: { response: AIHintResponse }) {
  const [unlockedHints, setUnlockedHints] = useState<number[]>([1]);

  const unlockHint = (n: number) => {
    if (!unlockedHints.includes(n)) {
      setUnlockedHints((prev) => [...prev, n]);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Error Explanation */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(248,81,73,0.06)', border: '1px solid rgba(248,81,73,0.2)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle size={16} style={{ color: '#f85149' }} />
          <h3 className="font-semibold text-sm text-primary">Why Your Code Failed</h3>
        </div>
        <p className="text-sm text-secondary leading-relaxed">
          {response.errorExplanation}
        </p>
      </div>

      {/* Concept Detected */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ background: 'rgba(188,140,255,0.12)', color: '#bc8cff', border: '1px solid rgba(188,140,255,0.3)' }}
        >
          <Target size={13} />
          Core Concept: {response.conceptDetected}
        </div>
      </div>

      {/* Progressive Hints */}
      <div>
        <h3 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
          <Lightbulb size={14} style={{ color: '#d29922' }} />
          Progressive Socratic Hints
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
      </div>

      {/* Learning Takeaway */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(63,185,80,0.06)', border: '1px solid rgba(63,185,80,0.2)' }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <CheckCircle size={14} style={{ color: '#3fb950' }} />
          <h3 className="font-semibold text-sm text-primary">Learning Takeaway</h3>
        </div>
        <p className="text-sm text-secondary leading-relaxed">{response.learningTakeaway}</p>
      </div>

      {/* Follow-up Practice Question */}
      {response.followUpQuestion && (
        <div
          className="rounded-xl p-4"
          style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} style={{ color: '#bc8cff' }} />
            <h4 className="font-semibold text-sm text-primary">Follow-up Practice Question</h4>
          </div>
          <h5 className="text-xs font-semibold text-accent mb-1">{response.followUpQuestion.title}</h5>
          <p className="text-xs text-secondary leading-relaxed">{response.followUpQuestion.description}</p>
          <div className="mt-2">
            <span className="topic-tag">{response.followUpQuestion.concept}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// BROWSE PROBLEMS & CUSTOM QUESTION MODAL
// ============================================================
function BrowseProblemsModal({
  isOpen,
  onClose,
  onSelectProblem,
  onSelectCustomProblem,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectProblem: (problem: Problem) => void;
  onSelectCustomProblem: (customProblem: Problem) => void;
}) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'custom'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const filteredProblems = problems.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty =
      selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleGenerateCustom = async () => {
    if (!customPrompt.trim()) {
      toast.error('Please enter a question or problem description');
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading('AI is analyzing requirements & generating test cases...');

    try {
      const generated = await generateCustomProblemWithAI(customPrompt);
      toast.success('Custom challenge created with verified test cases!', { id: toastId });
      onSelectCustomProblem(generated);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate problem. Using standard format.', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="glass-card w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ background: 'rgba(88,166,255,0.1)', color: '#58a6ff' }}
            >
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-primary">Browse Questions</h2>
              <p className="text-xs text-muted">Choose an existing DSA problem or enter your own custom question</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-primary transition-colors hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex px-6 pt-3 gap-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'catalog'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-muted hover:text-secondary'
            }`}
          >
            <Layers size={14} />
            Problem Catalog ({problems.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'custom'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-muted hover:text-secondary'
            }`}
          >
            <Sparkles size={14} />
            Enter Custom Question (AI Auto-Test)
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'catalog' ? (
            <div className="space-y-4">
              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div
                  className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
                  style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
                >
                  <Search size={14} className="text-muted" />
                  <input
                    type="text"
                    placeholder="Search by title or topic (e.g. Tree, Two Sum)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-xs text-primary placeholder:text-muted"
                  />
                </div>
                <div className="flex gap-1">
                  {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedDifficulty === diff
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          : 'text-muted hover:text-secondary border border-transparent'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Problems List */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1 heatmap-scrollbar">
                {filteredProblems.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProblem(p);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all hover:border-blue-500/50 hover:bg-blue-500/5 group"
                    style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted w-6">{p.id}.</span>
                      <div>
                        <h4 className="text-sm font-semibold text-primary group-hover:text-blue-400 transition-colors">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                          <span className="text-xs text-muted">{p.topics.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={15} className="text-muted group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
                {filteredProblems.length === 0 && (
                  <p className="text-center py-8 text-xs text-muted">No problems found matching your query.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div
                className="p-4 rounded-xl text-xs space-y-1"
                style={{ background: 'rgba(188,140,255,0.08)', border: '1px solid rgba(188,140,255,0.2)' }}
              >
                <p className="font-semibold text-primary flex items-center gap-1.5">
                  <Sparkles size={14} style={{ color: '#bc8cff' }} />
                  AI Automatic Test Case Synthesis
                </p>
                <p className="text-secondary leading-relaxed">
                  Simply enter your question or problem statement below. The AI will analyze requirements, build the Java Solution boilerplate, generate comprehensive test cases (including edge cases), and calculate expected outputs automatically!
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-primary mb-1.5 block">
                  Problem Statement / Question:
                </label>
                <textarea
                  rows={6}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Given a string s, find the longest palindromic substring in s. Or paste any coding interview question here..."
                  className="w-full text-xs p-3 rounded-xl resize-y outline-none"
                  style={{
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'inherit',
                    lineHeight: 1.6,
                  }}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-xs text-muted hover:text-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateCustom}
                  disabled={isGenerating || !customPrompt.trim()}
                  className="btn-primary px-5 py-2 text-xs flex items-center gap-2"
                  style={{
                    background: isGenerating ? 'rgba(188,140,255,0.3)' : 'linear-gradient(135deg, #bc8cff, #58a6ff)',
                    color: '#0d1117',
                  }}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing & Synthesizing Tests...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      Setup Challenge with AI
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN AI CODEMENTOR PAGE
// ============================================================
export default function AICodeMentor() {
  const { state, dispatch } = useAppContext();
  const isLight = state.theme === 'light';

  const { runCode, submitCode, isRunning, isSubmitting } = useJudge();
  const { analyze, response: aiResponse, isLoading: isAiLoading, reset: resetAI } = useAI();

  // Problem Selection State - Start null so user can Browse Questions
  const [isBrowseModalOpen, setIsBrowseModalOpen] = useState(false);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);

  // Java Code Editor State
  const [code, setCode] = useState<string>('');

  // Results & Tabs
  const [activeTab, setActiveTab] = useState<'editor' | 'results' | 'hints'>('editor');
  const [lastResult, setLastResult] = useState<JudgeResult | null>(null);
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState<number>(0);

  // Initialize Code when problem changes
  useEffect(() => {
    if (!currentProblem) return;
    const saved = storageService.getCode(currentProblem.id, 'java', currentProblem.starterCode?.java || '');
    setCode(saved || currentProblem.starterCode?.java || 'class Solution {\n    \n}');
    setLastResult(null);
    resetAI();
    setSelectedTestCaseIdx(0);
    setActiveTab('editor');
  }, [currentProblem?.id]);

  // Code persistence on change
  const handleCodeChange = (newCode: string | undefined) => {
    const val = newCode || '';
    setCode(val);
    if (currentProblem) {
      storageService.saveCode(currentProblem.id, 'java', val);
    }
  };

  const handleResetCode = () => {
    if (!currentProblem) return;
    const initial = currentProblem.starterCode?.java || '';
    setCode(initial);
    storageService.resetCode(currentProblem.id, 'java');
    toast.success('Reset Java code to initial starter template');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  // Compile & Run against example test cases
  const handleRun = async () => {
    if (!currentProblem) return;
    setLastResult(null);
    setActiveTab('results');
    const toastId = toast.loading('Compiling and running against example test cases...');

    try {
      const result = await runCode(currentProblem, code, 'java');
      setLastResult(result);

      if (result.status === 'Accepted') {
        toast.success('All example test cases passed!', { id: toastId });
      } else if (result.status === 'Compilation Error') {
        toast.error('Compilation Error in Java code', { id: toastId });
        analyze(currentProblem.title, code, result, currentProblem.topics);
      } else {
        toast.error(`Run finished: ${result.status}`, { id: toastId });
        analyze(currentProblem.title, code, result, currentProblem.topics);
      }
    } catch (e: any) {
      toast.error('Execution encountered an issue: ' + e.message, { id: toastId });
    }
  };

  // Submit against full test suite and record submission
  const handleSubmit = async () => {
    if (!currentProblem) return;
    setLastResult(null);
    setActiveTab('results');
    const toastId = toast.loading('Evaluating solution against full test suite & edge cases...');

    try {
      const result = await submitCode(currentProblem, code, 'java');
      setLastResult(result);

      // Create and dispatch submission to AppContext
      const submission: Submission = {
        id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        problemId: currentProblem.id,
        problemTitle: currentProblem.title,
        language: 'java',
        code,
        result,
        timestamp: Date.now(),
        aiAnalyzed: result.status !== 'Accepted',
      };

      dispatch({ type: 'ADD_SUBMISSION', payload: submission });

      if (result.status === 'Accepted') {
        toast.success('🎉 Solution Accepted! Great work!', { id: toastId });
      } else {
        toast.error(`Submission: ${result.status}. Generating AI analysis...`, { id: toastId });
        analyze(currentProblem.title, code, result, currentProblem.topics);
      }
    } catch (e: any) {
      toast.error('Evaluation failed: ' + e.message, { id: toastId });
    }
  };

  // Recent attempted problems list
  const recentProblems = useMemo(() => {
    return state.submissions
      .slice(0, 8)
      .map((s) => problems.find((p) => p.id === s.problemId) || (s.problemId >= 9000 ? { id: s.problemId, title: s.problemTitle, difficulty: 'Medium' as Difficulty, topics: ['Arrays'] as Topic[] } : null))
      .filter(Boolean)
      .filter((p, i, arr) => arr.findIndex((x) => x?.id === p?.id) === i);
  }, [state.submissions]);

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(188,140,255,0.12), rgba(88,166,255,0.08))',
          border: '1px solid rgba(188,140,255,0.25)',
        }}
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
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
                I'll analyze your Java mistakes, synthesize test cases for custom questions, and guide you with progressive Socratic hints.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBrowseModalOpen(true)}
            className="btn-primary px-4 py-2 text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            style={{ background: 'linear-gradient(135deg, #58a6ff, #bc8cff)', color: '#0d1117' }}
          >
            <BookOpen size={15} />
            Browse Questions
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {!currentProblem ? (
        /* Initial State: Select Problem or Browse Questions */
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Problem Selection */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-6 space-y-4">
              <h2 className="text-base font-semibold text-primary flex items-center gap-2">
                <Code2 size={16} style={{ color: '#58a6ff' }} />
                Select Problem
              </h2>
              <p className="text-xs text-secondary leading-relaxed">
                Select a problem you're struggling with, or enter your own custom question:
              </p>

              {recentProblems.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                    Recent Questions
                  </h3>
                  <div className="space-y-1.5">
                    {recentProblems.map((p) => {
                      if (!p) return null;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            const full = getProblemById(p.id) || p;
                            setCurrentProblem(full as Problem);
                          }}
                          className="w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-all hover:border-blue-500/50 hover:bg-blue-500/5 group"
                          style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
                        >
                          <span className="font-semibold text-primary group-hover:text-blue-400 truncate max-w-[170px]">
                            {p.title}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                            <ArrowRight size={13} className="text-muted group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div
                className="rounded-xl p-5 text-center space-y-3"
                style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
              >
                <Brain size={32} className="mx-auto opacity-30 text-purple-400" />
                <p className="text-xs text-muted">
                  Choose from our 50 curated DSA problems or create a custom question with AI auto-testing.
                </p>
                <button
                  onClick={() => setIsBrowseModalOpen(true)}
                  className="btn-primary w-full justify-center text-xs py-2.5 flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #bc8cff, #58a6ff)', color: '#0d1117' }}
                >
                  <BookOpen size={14} />
                  Browse Questions
                </button>
              </div>
            </div>
          </div>

          {/* Right: Ready to Help You Learn Info Box */}
          <div className="lg:col-span-3">
            <div
              className="glass-card p-8 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(28,33,40,0.8), rgba(22,27,34,0.8))' }}
            >
              <Brain size={48} className="mx-auto mb-4" style={{ color: '#bc8cff', opacity: 0.4 }} />
              <h3 className="font-semibold text-primary text-base mb-2">Ready to Help You Learn</h3>
              <p className="text-secondary text-xs max-w-sm mx-auto leading-relaxed mb-6">
                Click <strong>Browse Questions</strong> to select a problem or enter your own question. I'll provide starter Java code, synthesize test cases, and guide you with Socratic hints.
              </p>

              <div
                className="p-5 rounded-xl text-left"
                style={{ background: 'rgba(88,166,255,0.06)', border: '1px solid rgba(88,166,255,0.15)' }}
              >
                <p className="text-xs text-muted mb-3 font-semibold uppercase tracking-wider">How it works</p>
                <div className="space-y-2.5 text-xs text-secondary">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-accent">1.</span>
                    <span>I detect which programming concept or algorithm your solution missed</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-accent">2.</span>
                    <span>I explain <strong>WHY</strong> your code fails in plain English without giving away the answer</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-accent">3.</span>
                    <span>Progressive Socratic hints guide you step by step to the optimal solution</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-accent">4.</span>
                    <span>For custom questions, test cases and edge cases are generated automatically</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Active Problem Workspace: Editor + Tests + AI Hints */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Problem Information (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Code2 size={14} style={{ color: '#58a6ff' }} />
                  Active Question
                </span>
                <button
                  onClick={() => setIsBrowseModalOpen(true)}
                  className="text-xs text-accent hover:underline flex items-center gap-1 font-medium"
                >
                  Change Question →
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h2 className="text-lg font-bold text-primary">{currentProblem.title}</h2>
                  <span className={`badge-${currentProblem.difficulty.toLowerCase()}`}>
                    {currentProblem.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentProblem.topics.map((t) => (
                    <span key={t} className="topic-tag text-[11px]">{t}</span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div
                className="p-3.5 rounded-xl text-xs text-secondary leading-relaxed max-h-60 overflow-y-auto space-y-2 heatmap-scrollbar"
                style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
              >
                <p className="whitespace-pre-line">{currentProblem.description}</p>

                {currentProblem.examples && currentProblem.examples.length > 0 && (
                  <div className="pt-2 space-y-2 border-t border-white/5">
                    <p className="font-semibold text-primary">Example Test Cases:</p>
                    {currentProblem.examples.slice(0, 2).map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg font-mono text-[11px]"
                        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                      >
                        <div><span className="text-muted">Input: </span><span className="text-primary">{ex.input}</span></div>
                        <div><span className="text-muted">Output: </span><span className="text-green-400">{ex.expected}</span></div>
                        {ex.explanation && <div><span className="text-muted">Note: </span><span className="text-secondary">{ex.explanation}</span></div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Switch Question / Browse Shortcut */}
            <div className="glass-card p-4 flex items-center justify-between">
              <span className="text-xs text-muted">Want to try a different question?</span>
              <button
                onClick={() => setIsBrowseModalOpen(true)}
                className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5"
              >
                <BookOpen size={13} />
                Browse Questions
              </button>
            </div>
          </div>

          {/* Right Column: Java Code Editor & Test/Hint Results (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Editor Container */}
            <div className="glass-card overflow-hidden flex flex-col rounded-2xl">
              {/* Editor Toolbar */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1.5">
                    <Terminal size={12} />
                    Java (OpenJDK 15)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetCode}
                    title="Reset to starter code"
                    className="p-1.5 rounded-lg text-muted hover:text-primary transition-colors hover:bg-white/5"
                  >
                    <RefreshCw size={13} />
                  </button>
                  <button
                    onClick={handleCopyCode}
                    title="Copy code"
                    className="p-1.5 rounded-lg text-muted hover:text-primary transition-colors hover:bg-white/5"
                  >
                    <Copy size={13} />
                  </button>
                  <button
                    onClick={handleRun}
                    disabled={isRunning || isSubmitting}
                    className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5"
                  >
                    {isRunning ? (
                      <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Play size={13} style={{ color: '#3fb950' }} />
                    )}
                    Run
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isRunning || isSubmitting}
                    className="btn-primary px-3.5 py-1.5 text-xs flex items-center gap-1.5 font-semibold"
                    style={{ background: 'linear-gradient(135deg, #3fb950, #2ea043)', color: '#fff' }}
                  >
                    {isSubmitting ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send size={13} />
                    )}
                    Submit
                  </button>
                </div>
              </div>

              {/* Monaco Java Editor */}
              <div className="relative min-h-[340px]">
                <Editor
                  height="340px"
                  language="java"
                  theme={isLight ? 'vs' : 'vs-dark'}
                  value={code}
                  onChange={handleCodeChange}
                  options={{
                    fontSize: 13,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    automaticLayout: true,
                    tabSize: 4,
                    wordWrap: 'on',
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  }}
                />
              </div>
            </div>

            {/* Bottom Results & AI Hints Card */}
            <div className="glass-card p-5 space-y-4">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                <button
                  onClick={() => setActiveTab('results')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'results'
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      : 'text-muted hover:text-secondary'
                  }`}
                >
                  <CheckCircle size={13} />
                  Test Results
                  {lastResult && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 rounded text-[10px] ${
                        lastResult.status === 'Accepted'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {lastResult.status}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('hints')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'hints'
                      ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                      : 'text-muted hover:text-secondary'
                  }`}
                >
                  <Brain size={13} />
                  AI Socratic Hints
                  {isAiLoading && <div className="w-2.5 h-2.5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />}
                </button>
              </div>

              {/* Tab 1: Execution & Test Results */}
              {activeTab === 'results' && (
                <div className="space-y-4 animate-fade-in">
                  {lastResult ? (
                    <div className="space-y-3">
                      {/* Status Banner */}
                      <div
                        className="p-3.5 rounded-xl flex items-center justify-between"
                        style={{
                          background:
                            lastResult.status === 'Accepted'
                              ? 'rgba(63,185,80,0.1)'
                              : 'rgba(248,81,73,0.1)',
                          border: `1px solid ${
                            lastResult.status === 'Accepted'
                              ? 'rgba(63,185,80,0.3)'
                              : 'rgba(248,81,73,0.3)'
                          }`,
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          {lastResult.status === 'Accepted' ? (
                            <CheckCircle size={18} style={{ color: '#3fb950' }} />
                          ) : (
                            <AlertCircle size={18} style={{ color: '#f85149' }} />
                          )}
                          <div>
                            <h4 className="text-sm font-bold text-primary">{lastResult.status}</h4>
                            <p className="text-xs text-muted">
                              Passed {lastResult.passedCount} / {lastResult.totalCount} Test Cases
                            </p>
                          </div>
                        </div>

                        <div className="text-right text-xs text-muted">
                          <div>Runtime: <span className="text-primary font-mono">{lastResult.executionTime}ms</span></div>
                          <div>Memory: <span className="text-primary font-mono">{Math.round(lastResult.memoryUsed / 1024)}MB</span></div>
                        </div>
                      </div>

                      {/* Compilation or Runtime Error Display */}
                      {(lastResult.compilationError || lastResult.runtimeError) && (
                        <div
                          className="p-3.5 rounded-xl font-mono text-xs overflow-x-auto space-y-1.5"
                          style={{ background: 'rgba(248,81,73,0.06)', border: '1px solid rgba(248,81,73,0.25)', color: '#f85149' }}
                        >
                          <p className="font-bold flex items-center gap-1.5">
                            <AlertCircle size={13} />
                            {lastResult.compilationError ? 'Compilation Error' : 'Runtime Exception'}:
                          </p>
                          <pre className="text-[11px] leading-relaxed whitespace-pre-wrap">
                            {lastResult.compilationError || lastResult.runtimeError}
                          </pre>
                        </div>
                      )}

                      {/* Test Cases Results Breakdown */}
                      {lastResult.testCaseDetails && lastResult.testCaseDetails.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex gap-1.5 overflow-x-auto pb-1 heatmap-scrollbar">
                            {lastResult.testCaseDetails.map((td, idx) => (
                              <button
                                key={td.id}
                                onClick={() => setSelectedTestCaseIdx(idx)}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                                  selectedTestCaseIdx === idx
                                    ? 'bg-white/10 text-primary border border-white/20'
                                    : 'text-muted hover:text-secondary'
                                }`}
                              >
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ background: td.passed ? '#3fb950' : '#f85149' }}
                                />
                                Case {idx + 1}
                              </button>
                            ))}
                          </div>

                          {lastResult.testCaseDetails[selectedTestCaseIdx] && (
                            <div
                              className="p-3.5 rounded-xl font-mono text-xs space-y-2"
                              style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
                            >
                              <div>
                                <span className="text-muted block text-[10px] uppercase font-bold mb-0.5">Input</span>
                                <div className="p-2 rounded bg-black/20 text-primary">{lastResult.testCaseDetails[selectedTestCaseIdx].input}</div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <span className="text-muted block text-[10px] uppercase font-bold mb-0.5">Expected Output</span>
                                  <div className="p-2 rounded bg-green-500/10 text-green-400 font-bold">{lastResult.testCaseDetails[selectedTestCaseIdx].expected}</div>
                                </div>
                                <div>
                                  <span className="text-muted block text-[10px] uppercase font-bold mb-0.5">Your Output</span>
                                  <div
                                    className={`p-2 rounded font-bold ${
                                      lastResult.testCaseDetails[selectedTestCaseIdx].passed
                                        ? 'bg-green-500/10 text-green-400'
                                        : 'bg-red-500/10 text-red-400'
                                    }`}
                                  >
                                    {lastResult.testCaseDetails[selectedTestCaseIdx].got || 'No output'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs text-muted space-y-2">
                      <Terminal size={28} className="mx-auto opacity-30" />
                      <p>Click <strong>Run</strong> or <strong>Submit</strong> to compile and test your Java solution.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: AI Socratic Hints */}
              {activeTab === 'hints' && (
                <div className="space-y-3 animate-fade-in">
                  {isAiLoading ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-8 h-8 border-3 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs text-secondary font-medium">AI is analyzing your code and synthesizing Socratic hints...</p>
                    </div>
                  ) : aiResponse ? (
                    <AIResponsePanel response={aiResponse} />
                  ) : (
                    <div className="py-8 text-center text-xs text-muted space-y-2">
                      <Brain size={28} className="mx-auto opacity-30" />
                      <p>Whenever your code encounters a compilation error or test case failure, the AI automatically analyzes the root cause and generates progressive hints here.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      <BrowseProblemsModal
        isOpen={isBrowseModalOpen}
        onClose={() => setIsBrowseModalOpen(false)}
        onSelectProblem={(prob) => setCurrentProblem(prob)}
        onSelectCustomProblem={(customProb) => setCurrentProblem(customProb)}
      />
    </div>
  );
}
