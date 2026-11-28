import React, { useMemo } from 'react';
import {
  Flame, Trophy, Target, TrendingUp, AlertCircle, BookOpen, Star,
} from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { useAuth } from '../store/AuthContext';
import { problems } from '../data/problems';
import ContributionHeatmap from '../components/ContributionHeatmap';

// Shared achievements definition (also used by Profile.tsx)
const ACHIEVEMENTS = [
  { id: 'first-solve', label: 'First Blood', icon: '🏆', condition: (s: any) => s.totalSolved >= 1 },
  { id: 'five-solve', label: 'Rising Star', icon: '⭐', condition: (s: any) => s.totalSolved >= 5 },
  { id: 'ten-solve', label: 'Problem Solver', icon: '💎', condition: (s: any) => s.totalSolved >= 10 },
  { id: 'twenty-five-solve', label: 'Quarter Century', icon: '🥈', condition: (s: any) => s.totalSolved >= 25 },
  { id: 'fifty-solve', label: 'Half Century', icon: '🥇', condition: (s: any) => s.totalSolved >= 50 },
  { id: 'hundred-solve', label: 'Centurion', icon: '💯', condition: (s: any) => s.totalSolved >= 100 },
  { id: 'streak-3', label: '3-Day Streak', icon: '🔥', condition: (s: any) => s.bestStreak >= 3 },
  { id: 'streak-7', label: 'Weekly Warrior', icon: '⚡', condition: (s: any) => s.bestStreak >= 7 },
  { id: 'first-medium', label: 'Rising Up', icon: '📈', condition: (s: any) => s.mediumSolved >= 1 },
  { id: 'first-hard', label: 'Hard Mode', icon: '💪', condition: (s: any) => s.hardSolved >= 1 },
  { id: 'points-100', label: 'Point Scorer', icon: '🏅', condition: (s: any) => s.points >= 100 },
  { id: 'points-500', label: 'Point Hunter', icon: '💰', condition: (s: any) => s.points >= 500 },
];

// ============================================================
// STAT CARD
// ============================================================
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  gradient,
  iconColor,
}: {
  icon: any;
  label: string;
  value: string | number;
  sub?: string;
  gradient: string;
  iconColor: string;
}) {
  return (
    <div className={`stat-card ${gradient} animate-fade-in`} style={{ borderColor: 'var(--color-border)' }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-secondary mb-1">{label}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
          {sub && <p className="text-xs text-muted mt-1">{sub}</p>}
        </div>
        <div
          className="p-2 rounded-lg"
          style={{ background: `${iconColor}20`, border: `1px solid ${iconColor}30` }}
        >
          <Icon size={18} style={{ color: iconColor }} />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DIFFICULTY PROGRESS
// ============================================================
function DifficultyProgress({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-secondary w-14">{label}</span>
      <div className="flex-1 progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>
        {solved}/{total}
      </span>
    </div>
  );
}

// ============================================================
// WEAK CONCEPTS
// ============================================================
function WeakConcepts({ weakConcepts, topicMastery }: { weakConcepts: string[]; topicMastery: Record<string, number> }) {
  if (weakConcepts.length === 0) {
    return (
      <div className="text-sm text-muted text-center py-4">
        Keep solving problems to reveal weak areas!
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {weakConcepts.map((concept) => (
        <div key={concept} className="flex items-center gap-3">
          <span className="text-sm text-primary w-36 truncate">{concept}</span>
          <div className="flex-1 progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${topicMastery[concept] || 0}%`,
                background: 'linear-gradient(90deg, #f85149, #d29922)',
              }}
            />
          </div>
          <span className="text-xs font-semibold text-danger w-8 text-right">
            {topicMastery[concept] || 0}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// DASHBOARD PAGE
// ============================================================
export default function Dashboard() {
  const { state } = useAppContext();
  const { authState } = useAuth();
  const { userStats, problemProgress, submissions } = state;

  const firstName = authState.user?.name?.split(' ')[0] || 'Student';

  const accuracy = userStats.totalSubmissions > 0
    ? Math.round((userStats.acceptedSubmissions / userStats.totalSubmissions) * 100)
    : 0;

  const unlockedBadges = useMemo(
    () => ACHIEVEMENTS.filter(a => a.condition(userStats)).slice(0, 3),
    [userStats]
  );

  const solvedByDifficulty = useMemo(() => ({
    easy: problems.filter((p) => p.difficulty === 'Easy' && problemProgress[p.id]?.status === 'solved').length,
    medium: problems.filter((p) => p.difficulty === 'Medium' && problemProgress[p.id]?.status === 'solved').length,
    hard: problems.filter((p) => p.difficulty === 'Hard' && problemProgress[p.id]?.status === 'solved').length,
  }), [problemProgress]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(88,166,255,0.12), rgba(188,140,255,0.08))',
          border: '1px solid rgba(88,166,255,0.2)',
        }}
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-primary mb-1">
            Welcome back, <span className="text-gradient">{firstName}</span> 👋
          </h1>
          <p className="text-secondary text-sm">
            Don't just fix your code.{' '}
            <span className="font-semibold" style={{ color: '#58a6ff' }}>
              Understand why it failed.
            </span>
          </p>
        </div>
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 text-8xl opacity-10 select-none"
          aria-hidden
        >
          {'</>'}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Flame}
          label="Current Streak"
          value={`${userStats.currentStreak}d`}
          sub={`Best: ${userStats.bestStreak}d`}
          gradient="gradient-orange"
          iconColor="#fd8c73"
        />
        <StatCard
          icon={Trophy}
          label="Problems Solved"
          value={userStats.totalSolved}
          sub={`of ${problems.length} total`}
          gradient="gradient-green"
          iconColor="#3fb950"
        />
        <StatCard
          icon={Target}
          label="Accuracy"
          value={`${accuracy}%`}
          sub={`${userStats.acceptedSubmissions}/${userStats.totalSubmissions} AC`}
          gradient="gradient-blue"
          iconColor="#58a6ff"
        />
        <StatCard
          icon={Star}
          label="Points"
          value={userStats.points}
          sub={userStats.rank}
          gradient="gradient-purple"
          iconColor="#bc8cff"
        />
      </div>

      {/* Recent Badges row */}
      {unlockedBadges.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-muted">Recent Badges:</span>
          {unlockedBadges.map(badge => (
            <span
              key={badge.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(188,140,255,0.1)', color: '#bc8cff', border: '1px solid rgba(188,140,255,0.2)' }}
            >
              {badge.icon} {badge.label}
            </span>
          ))}
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission Activity Heatmap - Full width across 2 columns */}
        <div className="glass-card p-5 lg:col-span-2">
          <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
            <TrendingUp size={16} style={{ color: '#58a6ff' }} />
            Submission Activity
          </h2>
          <ContributionHeatmap
            calendar={userStats.activityCalendar}
            submissions={submissions}
            totalSubmissions={userStats.totalSubmissions}
            bestStreak={userStats.bestStreak}
            currentStreak={userStats.currentStreak}
          />
        </div>

        {/* Left Column: Difficulty Breakdown + Weak Concepts */}
        <div className="space-y-6">
          {/* Difficulty Breakdown */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-primary flex items-center gap-2">
                <BookOpen size={16} style={{ color: '#58a6ff' }} />
                Difficulty Breakdown
              </h2>
              <span className="text-xs text-muted">{userStats.totalSolved} solved</span>
            </div>
            <div className="space-y-3">
              <DifficultyProgress label="Easy" solved={solvedByDifficulty.easy} total={problems.filter(p => p.difficulty === 'Easy').length} color="#3fb950" />
              <DifficultyProgress label="Medium" solved={solvedByDifficulty.medium} total={problems.filter(p => p.difficulty === 'Medium').length} color="#d29922" />
              <DifficultyProgress label="Hard" solved={solvedByDifficulty.hard} total={problems.filter(p => p.difficulty === 'Hard').length} color="#f85149" />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div className="text-center">
                <div className="text-xl font-bold" style={{ color: '#3fb950' }}>{solvedByDifficulty.easy}</div>
                <div className="text-xs text-muted">Easy</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold" style={{ color: '#d29922' }}>{solvedByDifficulty.medium}</div>
                <div className="text-xs text-muted">Medium</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold" style={{ color: '#f85149' }}>{solvedByDifficulty.hard}</div>
                <div className="text-xs text-muted">Hard</div>
              </div>
            </div>
          </div>

          {/* Weak Concepts */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
              <AlertCircle size={16} style={{ color: '#f85149' }} />
              Weak Concepts
            </h2>
            <WeakConcepts
              weakConcepts={userStats.weakConcepts}
              topicMastery={userStats.topicMastery}
            />
          </div>
        </div>

        {/* Right Column: Topic Progress */}
        <div className="glass-card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-primary flex items-center gap-2">
              <TrendingUp size={16} style={{ color: '#bc8cff' }} />
              Topic Progress
            </h2>
            <span className="text-xs text-muted">15 Topics</span>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto pr-1 max-h-[380px]">
            {Object.entries(userStats.topicMastery)
              .sort(([, a], [, b]) => b - a)
              .map(([topic, score]) => (
                <div key={topic} className="flex items-center gap-2">
                  <span className="text-xs text-secondary w-32 truncate shrink-0">{topic}</span>
                  <div className="flex-1 progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${score}%`,
                        background: score >= 70 ? '#3fb950' : score >= 40 ? '#d29922' : '#58a6ff',
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-muted w-8 text-right">{score}%</span>
                </div>
              ))}
            {Object.values(userStats.topicMastery).every(v => v === 0) && (
              <p className="text-xs text-muted text-center py-4">Solve problems to build topic mastery!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
