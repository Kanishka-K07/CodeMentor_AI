import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame, Trophy, Target, TrendingUp, CheckCircle, Clock,
  AlertCircle, BookOpen, Star,
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
// ACTIVITY CALENDAR (last 15 weeks)
// ============================================================
function ActivityCalendar({ calendar }: { calendar: Record<string, number> }) {
  const weeks = useMemo(() => {
    const today = new Date();
    const cells: { date: string; level: number }[] = [];
    for (let i = 104; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const count = calendar[key] || 0;
      const level = count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 6 ? 3 : 4;
      cells.push({ date: key, level });
    }
    // Group into weeks
    const grouped: typeof cells[] = [];
    for (let w = 0; w < cells.length; w += 7) {
      grouped.push(cells.slice(w, w + 7));
    }
    return grouped;
  }, [calendar]);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((cell) => (
              <div
                key={cell.date}
                className="cal-cell"
                data-level={cell.level}
                title={`${cell.date}: ${cell.level === 0 ? 'No' : calendar[cell.date] ?? 0} submission${calendar[cell.date] === 1 ? '' : 's'}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 justify-end">
        <span className="text-xs text-muted">Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div key={l} className="cal-cell" data-level={l} />
        ))}
        <span className="text-xs text-muted">More</span>
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
