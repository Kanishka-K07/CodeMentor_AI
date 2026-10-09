import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame, Trophy, Target, TrendingUp, CheckCircle, Clock,
  AlertCircle, BookOpen, Star, ChevronRight, ChevronLeft,
} from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { problems } from '../data/problems';

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
// MONTH-WISE ACTIVITY CALENDAR
// ============================================================
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function MonthCalendar({
  year,
  month,
  calendar,
}: {
  year: number;
  month: number; // 0-indexed
  calendar: Record<string, number>;
}) {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const todayStr = (() => {
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
  })();

  const cells: Array<{ day: number | null; dateKey: string | null }> = [];
  for (let b = 0; b < firstDow; b++) cells.push({ day: null, dateKey: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, dateKey });
  }

  // Cell size: fixed 26px wide × 22px tall — compact but readable
  const CELL: React.CSSProperties = {
    width: '100%',
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    fontSize: 10,
    transition: 'all 0.12s ease',
  };

  return (
    <div>
      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 2 }}>
        {DAY_LABELS.map((l) => (
          <div key={l} style={{ textAlign: 'center', fontSize: 9, color: 'var(--color-text-muted)', fontWeight: 600, padding: '1px 0' }}>
            {l}
          </div>
        ))}
      </div>
      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((cell, idx) => {
          if (!cell.day || !cell.dateKey) {
            return <div key={`blank-${idx}`} style={{ height: 22 }} />;
          }
          const count = calendar[cell.dateKey] || 0;
          const isActive = count > 0;
          const isToday = cell.dateKey === todayStr;

          let bg = 'transparent';
          let borderColor = 'transparent';
          let color = 'var(--color-text-muted)';

          if (isActive) {
            if (count >= 7)      { bg = 'rgba(63,185,80,0.90)'; borderColor = 'rgba(63,185,80,1)';    color = '#fff'; }
            else if (count >= 4) { bg = 'rgba(63,185,80,0.60)'; borderColor = 'rgba(63,185,80,0.8)'; color = '#fff'; }
            else if (count >= 2) { bg = 'rgba(63,185,80,0.35)'; borderColor = 'rgba(63,185,80,0.5)'; color = '#3fb950'; }
            else                 { bg = 'rgba(63,185,80,0.16)'; borderColor = 'rgba(63,185,80,0.3)'; color = '#3fb950'; }
          }

          return (
            <div
              key={cell.dateKey}
              title={`${cell.dateKey}: ${count} submission${count !== 1 ? 's' : ''}`}
              style={{
                ...CELL,
                background: bg,
                border: `1px solid ${isToday ? '#58a6ff' : borderColor}`,
                color: isToday && !isActive ? '#58a6ff' : color,
                fontWeight: isToday || isActive ? 700 : 400,
                cursor: isActive ? 'pointer' : 'default',
                boxShadow: isToday ? '0 0 0 1px rgba(88,166,255,0.35)' : undefined,
              }}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityCalendar({ calendar }: { calendar: Record<string, number> }) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const totalThisMonth = useMemo(() => {
    const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    return Object.entries(calendar)
      .filter(([k]) => k.startsWith(prefix))
      .reduce((s, [, v]) => s + v, 0);
  }, [calendar, viewYear, viewMonth]);

  const activeDaysThisMonth = useMemo(() => {
    const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    return Object.entries(calendar).filter(([k, v]) => k.startsWith(prefix) && v > 0).length;
  }, [calendar, viewYear, viewMonth]);

  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();

  const goToPrev = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };

  const goToNext = () => {
    if (isCurrentMonth) return;
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  return (
    <div>
      {/* Compact single-line header: ‹  Month Year  active·subs  › */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <button
          onClick={goToPrev}
          title="Previous month"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}
        >
          <ChevronLeft size={13} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {MONTH_NAMES[viewMonth].slice(0, 3)} {viewYear}
          </span>
          <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>
            {activeDaysThisMonth}d
          </span>
          <span style={{ fontSize: 10, color: '#3fb950', fontWeight: 600 }}>
            {totalThisMonth} sub{totalThisMonth !== 1 ? 's' : ''}
          </span>
        </div>

        <button
          onClick={goToNext}
          disabled={isCurrentMonth}
          title={isCurrentMonth ? '' : 'Next month'}
          style={{
            background: 'none', border: 'none', padding: '2px 4px', display: 'flex', alignItems: 'center',
            color: isCurrentMonth ? 'var(--color-border)' : 'var(--color-text-muted)',
            cursor: isCurrentMonth ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Month grid */}
      <MonthCalendar year={viewYear} month={viewMonth} calendar={calendar} />

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 6 }}>
        <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            style={{
              width: 10, height: 10, borderRadius: 2,
              background: l === 0 ? 'var(--color-bg-secondary)' :
                l === 1 ? 'rgba(63,185,80,0.16)' :
                l === 2 ? 'rgba(63,185,80,0.35)' :
                l === 3 ? 'rgba(63,185,80,0.60)' : 'rgba(63,185,80,0.90)',
              border: '1px solid rgba(63,185,80,0.2)',
            }}
          />
        ))}
        <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>More</span>
      </div>
    </div>
  );
}

// ============================================================
// RECOMMENDED PROBLEMS
// ============================================================
function RecommendedProblems({ progress }: { progress: Record<number, any> }) {
  const recommended = useMemo(() => {
    const unsolvedEasy = problems.filter(
      (p) => p.difficulty === 'Easy' && (!progress[p.id] || progress[p.id].status !== 'solved')
    ).slice(0, 2);
    const unsolvedMedium = problems.filter(
      (p) => p.difficulty === 'Medium' && (!progress[p.id] || progress[p.id].status !== 'solved')
    ).slice(0, 1);
    return [...unsolvedEasy, ...unsolvedMedium];
  }, [progress]);

  return (
    <div className="flex flex-col gap-2">
      {recommended.map((p) => (
        <Link
          key={p.id}
          to={`/problems/${p.id}`}
          className="flex items-center justify-between p-3 rounded-lg transition-all hover:border-blue-500"
          style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted w-6 text-right">{p.id}.</span>
            <span className="text-sm font-medium text-primary">{p.title}</span>
            <span className={`badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
          </div>
          <ChevronRight size={14} className="text-muted" />
        </Link>
      ))}
    </div>
  );
}

// ============================================================
// RECENT SUBMISSIONS
// ============================================================
function RecentSubmissions({ submissions }: { submissions: any[] }) {
  const recent = submissions.slice(0, 5);
  if (recent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted text-sm">
        <BookOpen size={32} className="mb-2 opacity-30" />
        <p>No submissions yet. Start solving!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {recent.map((sub) => (
        <div
          key={sub.id}
          className="flex items-center justify-between p-3 rounded-lg"
          style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {sub.result.status === 'Accepted' ? (
              <CheckCircle size={14} style={{ color: '#3fb950' }} className="shrink-0" />
            ) : (
              <AlertCircle size={14} style={{ color: '#f85149' }} className="shrink-0" />
            )}
            <Link to={`/problems/${sub.problemId}`} className="text-sm font-medium text-primary hover:text-accent truncate">
              {sub.problemTitle}
            </Link>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className={sub.result.status === 'Accepted' ? 'badge-accepted' : 'badge-wrong'}
            >
              {sub.result.status === 'Accepted' ? '✓' : '✗'} {sub.result.status}
            </span>
            <span className="text-xs text-muted">
              {new Date(sub.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
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
  const { userStats, problemProgress, submissions } = state;

  const accuracy = userStats.totalSubmissions > 0
    ? Math.round((userStats.acceptedSubmissions / userStats.totalSubmissions) * 100)
    : 0;

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
            Welcome back, <span className="text-gradient">Student</span> 👋
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

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Calendar */}
        <div className="glass-card p-5">
          <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
            <TrendingUp size={16} style={{ color: '#58a6ff' }} />
            Submission Activity
          </h2>
          <ActivityCalendar calendar={userStats.activityCalendar} />
        </div>

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

        {/* Recent Submissions */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-primary flex items-center gap-2">
              <Clock size={16} style={{ color: '#58a6ff' }} />
              Recent Submissions
            </h2>
            <Link to="/profile" className="text-xs text-accent hover:underline">
              View all →
            </Link>
          </div>
          <RecentSubmissions submissions={submissions} />
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
    </div>
  );
}
