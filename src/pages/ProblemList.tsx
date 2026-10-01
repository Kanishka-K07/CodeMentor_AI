import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, CheckCircle, Circle, Clock, ChevronRight } from 'lucide-react';
import { problems } from '../data/problems';
import { useAppContext } from '../store/AppContext';
import type { Difficulty, Topic } from '../types';

const TOPICS: Topic[] = [
  'Arrays', 'Strings', 'HashMap', 'Two Pointers', 'Sliding Window', 'Stack',
  'Queue', 'Linked List', 'Binary Search', 'Recursion', 'Sorting', 'Trees',
  'BST', 'Heap', 'Graphs', 'BFS', 'DFS', 'Greedy', 'Backtracking',
  'Dynamic Programming', 'Math',
];

function DifficultyBadge({ d }: { d: Difficulty }) {
  return <span className={`badge-${d.toLowerCase()}`}>{d}</span>;
}

function StatusIcon({ status }: { status: 'solved' | 'attempted' | 'unsolved' }) {
  if (status === 'solved') return <CheckCircle size={15} style={{ color: '#3fb950' }} />;
  if (status === 'attempted') return <Clock size={15} style={{ color: '#d29922' }} />;
  return <Circle size={15} style={{ color: 'var(--color-text-muted)' }} />;
}

export default function ProblemList() {
  const { state } = useAppContext();
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'All'>('All');
  const [topicFilter, setTopicFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Solved' | 'Attempted' | 'Unsolved'>('All');

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (diffFilter !== 'All' && p.difficulty !== diffFilter) return false;
      if (topicFilter !== 'All' && !p.topics.includes(topicFilter as Topic)) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
          !p.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()))) return false;
      const prog = state.problemProgress[p.id]?.status ?? 'unsolved';
      if (statusFilter === 'Solved' && prog !== 'solved') return false;
      if (statusFilter === 'Attempted' && prog !== 'attempted') return false;
      if (statusFilter === 'Unsolved' && prog !== 'unsolved') return false;
      return true;
    });
  }, [search, diffFilter, topicFilter, statusFilter, state.problemProgress]);

  const counts = useMemo(() => ({
    easy: problems.filter((p) => p.difficulty === 'Easy').length,
    medium: problems.filter((p) => p.difficulty === 'Medium').length,
    hard: problems.filter((p) => p.difficulty === 'Hard').length,
    solved: Object.values(state.problemProgress).filter((v: any) => v.status === 'solved').length,
  }), [state.problemProgress]);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Problem Library</h1>
          <p className="text-secondary text-sm mt-1">
            {counts.solved}/{problems.length} solved · {counts.easy} Easy · {counts.medium} Medium · {counts.hard} Hard
          </p>
        </div>

        {/* Summary pill */}
        <div
          className="flex items-center gap-4 px-4 py-2 rounded-xl"
          style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
        >
          <span className="text-xs text-muted">Progress</span>
          <div className="flex gap-3 text-xs font-semibold">
            <span style={{ color: '#3fb950' }}>{state.userStats.easySolved} E</span>
            <span style={{ color: '#d29922' }}>{state.userStats.mediumSolved} M</span>
            <span style={{ color: '#f85149' }}>{state.userStats.hardSolved} H</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search problems or topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm"
            style={{
              background: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              outline: 'none',
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Difficulty filter */}
          <div className="flex gap-1">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                style={{
                  background: diffFilter === d
                    ? d === 'Easy' ? '#3fb950'
                      : d === 'Medium' ? '#d29922'
                      : d === 'Hard' ? '#f85149'
                      : '#58a6ff'
                    : 'var(--color-bg-primary)',
                  color: diffFilter === d ? '#0d1117' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex gap-1 ml-auto">
            {(['All', 'Solved', 'Attempted', 'Unsolved'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                style={{
                  background: statusFilter === s ? 'var(--color-accent)' : 'var(--color-bg-primary)',
                  color: statusFilter === s ? '#0d1117' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Topic filter */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setTopicFilter('All')}
            className="text-xs px-2.5 py-1 rounded-md font-medium transition-all"
            style={{
              background: topicFilter === 'All' ? 'rgba(88,166,255,0.15)' : 'transparent',
              color: topicFilter === 'All' ? '#58a6ff' : 'var(--color-text-muted)',
              border: `1px solid ${topicFilter === 'All' ? 'rgba(88,166,255,0.3)' : 'var(--color-border)'}`,
            }}
          >
            All Topics
          </button>
          {TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => setTopicFilter(t === topicFilter ? 'All' : t)}
              className="text-xs px-2.5 py-1 rounded-md font-medium transition-all"
              style={{
                background: topicFilter === t ? 'rgba(88,166,255,0.15)' : 'transparent',
                color: topicFilter === t ? '#58a6ff' : 'var(--color-text-muted)',
                border: `1px solid ${topicFilter === t ? 'rgba(88,166,255,0.3)' : 'var(--color-border)'}`,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2">
        <Filter size={13} className="text-muted" />
        <span className="text-xs text-muted">
          Showing {filtered.length} of {problems.length} problems
        </span>
      </div>

      {/* Problem table */}
      <div className="glass-card overflow-hidden">
        {/* Table header */}
        <div
          className="grid grid-cols-12 gap-4 px-5 py-3 text-xs font-semibold text-muted"
          style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}
        >
          <div className="col-span-1">#</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Topics</div>
          <div className="col-span-1 text-center">Difficulty</div>
          <div className="col-span-1 text-center">Accept %</div>
          <div className="col-span-1 text-center">Attempts</div>
        </div>

        {/* Table rows */}
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-muted text-sm">
            No problems match your filters.
          </div>
        ) : (
          filtered.map((p, idx) => {
            const prog = state.problemProgress[p.id];
            const status = prog?.status ?? 'unsolved';
            return (
              <Link
                key={p.id}
                to={`/problems/${p.id}`}
                className="grid grid-cols-12 gap-4 px-5 py-3.5 items-center transition-all hover:bg-opacity-50"
                style={{
                  borderBottom: idx < filtered.length - 1 ? '1px solid var(--color-border)' : 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                  background: status === 'solved' ? 'rgba(63,185,80,0.03)' : undefined,
                }}
              >
                <div className="col-span-1 text-xs text-muted">{p.id}</div>
                <div className="col-span-1 flex justify-center">
                  <StatusIcon status={status} />
                </div>
                <div className="col-span-5">
                  <span
                    className="text-sm font-medium hover:text-accent transition-colors"
                    style={{ color: status === 'solved' ? 'var(--color-success)' : 'var(--color-text-primary)' }}
                  >
                    {p.title}
                  </span>
                </div>
                <div className="col-span-2 flex flex-wrap gap-1">
                  {p.topics.slice(0, 2).map((t) => (
                    <span key={t} className="topic-tag">{t}</span>
                  ))}
                </div>
                <div className="col-span-1 flex justify-center">
                  <DifficultyBadge d={p.difficulty} />
                </div>
                <div className="col-span-1 text-center text-xs text-muted">
                  {p.acceptanceRate}%
                </div>
                <div className="col-span-1 text-center text-xs text-muted">
                  {prog?.attempts ?? 0}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
