import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Flame, Target, TrendingUp, Clock, CheckCircle, XCircle,
  Star, Award, Zap, Code2, Brain, BookOpen,
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip,
} from 'recharts';
import { useAppContext } from '../store/AppContext';
import { problems } from '../data/problems';

// ============================================================
// ACHIEVEMENT BADGES
// ============================================================
const ACHIEVEMENTS = [
  { id: 'first-solve', label: 'First Solve', desc: 'Solved your first problem', icon: '🏆', condition: (s: any) => s.totalSolved >= 1 },
  { id: 'five-solve', label: '5 Problems', desc: 'Solved 5 problems', icon: '⭐', condition: (s: any) => s.totalSolved >= 5 },
  { id: 'ten-solve', label: 'Problem Solver', desc: 'Solved 10 problems', icon: '💎', condition: (s: any) => s.totalSolved >= 10 },
  { id: 'streak-3', label: '3-Day Streak', desc: 'Coded 3 days in a row', icon: '🔥', condition: (s: any) => s.bestStreak >= 3 },
  { id: 'streak-7', label: 'Weekly Warrior', desc: '7-day streak', icon: '⚡', condition: (s: any) => s.bestStreak >= 7 },
  { id: 'first-medium', label: 'Rising Up', desc: 'Solved a Medium problem', icon: '📈', condition: (s: any) => s.mediumSolved >= 1 },
  { id: 'first-hard', label: 'Hard Mode', desc: 'Solved a Hard problem', icon: '💪', condition: (s: any) => s.hardSolved >= 1 },
  { id: 'accuracy', label: 'Sharpshooter', desc: '80%+ accuracy', icon: '🎯', condition: (s: any) => s.totalSubmissions >= 5 && (s.acceptedSubmissions / s.totalSubmissions) >= 0.8 },
  { id: 'centurion', label: 'Centurion', desc: '100+ points earned', icon: '🏅', condition: (s: any) => s.points >= 100 },
];

function AchievementBadge({ achievement, unlocked }: { achievement: typeof ACHIEVEMENTS[0]; unlocked: boolean }) {
  return (
    <div
      className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all"
      style={{
        background: unlocked ? 'rgba(88,166,255,0.08)' : 'var(--color-bg-card)',
        border: `1px solid ${unlocked ? 'rgba(88,166,255,0.25)' : 'var(--color-border)'}`,
        opacity: unlocked ? 1 : 0.4,
        filter: unlocked ? 'none' : 'grayscale(1)',
      }}
    >
      <span className="text-3xl">{achievement.icon}</span>
      <div>
        <p className="text-xs font-semibold text-primary">{achievement.label}</p>
        <p className="text-xs text-muted mt-0.5">{achievement.desc}</p>
      </div>
    </div>
  );
}

// ============================================================
// TOPIC RADAR
// ============================================================
function TopicRadar({ topicMastery }: { topicMastery: Record<string, number> }) {
  const TOP_TOPICS = ['Arrays', 'Strings', 'HashMap', 'Two Pointers', 'Dynamic Programming', 'Trees', 'Graphs', 'Stack'];
  const data = TOP_TOPICS.map((t) => ({
    subject: t,
    value: topicMastery[t] || 0,
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={data}>
        <PolarGrid stroke="var(--color-border)" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }} />
        <Radar
          name="Mastery"
          dataKey="value"
          stroke="#58a6ff"
          fill="#58a6ff"
          fillOpacity={0.15}
          strokeWidth={1.5}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            color: 'var(--color-text-primary)',
            fontSize: 12,
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// ============================================================
// PROFILE PAGE
// ============================================================
export default function Profile() {
  const { state } = useAppContext();
  const { userStats, submissions, problemProgress } = state;

  const accuracy = userStats.totalSubmissions > 0
    ? Math.round((userStats.acceptedSubmissions / userStats.totalSubmissions) * 100)
    : 0;

  const unlockedAchievements = useMemo(
    () => ACHIEVEMENTS.filter((a) => a.condition(userStats)).map((a) => a.id),
    [userStats]
  );

  const solvedProblems = useMemo(
    () => problems.filter((p) => problemProgress[p.id]?.status === 'solved'),
    [problemProgress]
  );

  const recentSubmissions = submissions.slice(0, 20);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile header */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(88,166,255,0.1), rgba(188,140,255,0.06))',
          border: '1px solid rgba(88,166,255,0.2)',
        }}
      >
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold shrink-0"
            style={{ background: 'linear-gradient(135deg, #58a6ff, #bc8cff)', color: '#0d1117' }}
          >
            S
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary">Student</h1>
            <p className="text-muted text-sm mt-0.5">AI CodeMentor Learner</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold"
                style={{ background: 'rgba(88,166,255,0.1)', color: '#58a6ff', border: '1px solid rgba(88,166,255,0.2)' }}
              >
                <Star size={13} />
                {userStats.rank}
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold"
                style={{ background: 'rgba(210,153,34,0.1)', color: '#d29922', border: '1px solid rgba(210,153,34,0.2)' }}
              >
                <Flame size={13} />
                {userStats.currentStreak}d streak
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold"
                style={{ background: 'rgba(188,140,255,0.1)', color: '#bc8cff', border: '1px solid rgba(188,140,255,0.2)' }}
              >
                <Zap size={13} />
                {userStats.points} pts
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="hidden md:grid grid-cols-3 gap-5 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{userStats.totalSolved}</div>
              <div className="text-xs text-muted">Solved</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{accuracy}%</div>
              <div className="text-xs text-muted">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{userStats.bestStreak}d</div>
              <div className="text-xs text-muted">Best Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Easy', value: userStats.easySolved, total: 20, color: '#3fb950' },
              { label: 'Medium', value: userStats.mediumSolved, total: 20, color: '#d29922' },
              { label: 'Hard', value: userStats.hardSolved, total: 10, color: '#f85149' },
              { label: 'Total', value: userStats.totalSolved, total: 50, color: '#58a6ff' },
            ].map(({ label, value, total, color }) => (
              <div key={label} className="glass-card p-4 text-center">
                <div className="text-2xl font-bold" style={{ color }}>{value}</div>
                <div className="text-xs text-muted">{label}</div>
                <div className="progress-bar mt-2">
                  <div className="progress-fill" style={{ width: `${(value / total) * 100}%`, background: color }} />
                </div>
                <div className="text-xs text-muted mt-1">{total} total</div>
              </div>
            ))}
          </div>

          {/* Submission history */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
              <Clock size={15} style={{ color: '#58a6ff' }} />
              Submission History
            </h2>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {recentSubmissions.length === 0 ? (
                <p className="text-sm text-muted text-center py-8">No submissions yet. Start solving!</p>
              ) : (
                recentSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-3 rounded-lg text-sm"
                    style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {sub.result.status === 'Accepted' ? (
                        <CheckCircle size={13} style={{ color: '#3fb950' }} className="shrink-0" />
                      ) : (
                        <XCircle size={13} style={{ color: '#f85149' }} className="shrink-0" />
                      )}
                      <Link
                        to={`/problems/${sub.problemId}`}
                        className="font-medium hover:text-accent transition-colors truncate"
                        style={{ color: 'var(--color-text-primary)', maxWidth: 200 }}
                      >
                        {sub.problemTitle}
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 text-xs">
                      <span
                        className={sub.result.status === 'Accepted' ? 'badge-accepted' : 'badge-wrong'}
                      >
                        {sub.result.status === 'Accepted' ? 'AC' : sub.result.status.slice(0, 2)}
                      </span>
                      <span className="text-muted capitalize">{sub.language}</span>
                      <span className="text-muted">{sub.result.executionTime}ms</span>
                      <span className="text-muted">
                        {new Date(sub.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Solved problems list */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
              <CheckCircle size={15} style={{ color: '#3fb950' }} />
              Solved Problems ({solvedProblems.length})
            </h2>
            {solvedProblems.length === 0 ? (
              <div className="text-center py-6">
                <BookOpen size={24} className="mx-auto mb-2 opacity-20" />
                <p className="text-sm text-muted">No problems solved yet.</p>
                <Link to="/problems" className="btn-primary mt-3 inline-flex">Browse Problems</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {solvedProblems.map((p) => (
                  <Link
                    key={p.id}
                    to={`/problems/${p.id}`}
                    className="flex items-center gap-2 p-2 rounded-lg text-xs transition-all hover:bg-opacity-80"
                    style={{ background: 'rgba(63,185,80,0.06)', border: '1px solid rgba(63,185,80,0.15)', color: 'inherit', textDecoration: 'none' }}
                  >
                    <CheckCircle size={11} style={{ color: '#3fb950' }} />
                    <span className="text-primary truncate">{p.title}</span>
                    <span className={`badge-${p.difficulty.toLowerCase()} ml-auto`}>{p.difficulty[0]}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Topic Mastery Radar */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
              <TrendingUp size={15} style={{ color: '#58a6ff' }} />
              Topic Mastery
            </h2>
            <TopicRadar topicMastery={userStats.topicMastery} />

            {/* Top topics */}
            <div className="space-y-2 mt-3">
              {Object.entries(userStats.topicMastery)
                .filter(([, v]) => v > 0)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([topic, score]) => (
                  <div key={topic} className="flex items-center gap-2">
                    <span className="text-xs text-secondary w-28 truncate">{topic}</span>
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
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
              <Award size={15} style={{ color: '#bc8cff' }} />
              Achievements ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {ACHIEVEMENTS.map((a) => (
                <AchievementBadge
                  key={a.id}
                  achievement={a}
                  unlocked={unlockedAchievements.includes(a.id)}
                />
              ))}
            </div>
          </div>

          {/* Coding Stats */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
              <Code2 size={15} style={{ color: '#58a6ff' }} />
              Coding Stats
            </h2>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Total Submissions', value: userStats.totalSubmissions },
                { label: 'Accepted', value: userStats.acceptedSubmissions, color: '#3fb950' },
                { label: 'Accuracy', value: `${accuracy}%`, color: '#58a6ff' },
                { label: 'Best Streak', value: `${userStats.bestStreak} days`, color: '#d29922' },
                { label: 'Current Streak', value: `${userStats.currentStreak} days`, color: '#fd8c73' },
                { label: 'Total Points', value: userStats.points, color: '#bc8cff' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-muted text-xs">{label}</span>
                  <span className="font-semibold text-xs" style={{ color: color ?? 'var(--color-text-primary)' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
