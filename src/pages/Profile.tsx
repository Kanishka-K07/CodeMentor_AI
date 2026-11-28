import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Flame, Target, TrendingUp, Clock, CheckCircle, XCircle,
  Star, Award, Zap, Code2, Brain,
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip,
} from 'recharts';
import { useAppContext } from '../store/AppContext';
import { useAuth } from '../store/AuthContext';
import { problems } from '../data/problems';

// ============================================================
// ACHIEVEMENT BADGES
// ============================================================
const ACHIEVEMENTS = [
  { id: 'first-solve', label: 'First Blood', desc: 'Solved your first problem', icon: '🏆', condition: (s: any) => s.totalSolved >= 1 },
  { id: 'five-solve', label: 'Rising Star', desc: 'Solved 5 problems', icon: '⭐', condition: (s: any) => s.totalSolved >= 5 },
  { id: 'ten-solve', label: 'Problem Solver', desc: 'Solved 10 problems', icon: '💎', condition: (s: any) => s.totalSolved >= 10 },
  { id: 'twenty-five-solve', label: 'Quarter Century', desc: 'Solved 25 problems', icon: '🥈', condition: (s: any) => s.totalSolved >= 25 },
  { id: 'fifty-solve', label: 'Half Century', desc: 'Solved 50 problems', icon: '🥇', condition: (s: any) => s.totalSolved >= 50 },
  { id: 'hundred-solve', label: 'Centurion', desc: 'Solved 100 problems', icon: '💯', condition: (s: any) => s.totalSolved >= 100 },
  { id: 'two-hundred-solve', label: 'Double Century', desc: 'Solved 200 problems', icon: '🚀', condition: (s: any) => s.totalSolved >= 200 },
  { id: 'three-hundred-solve', label: 'Master Coder', desc: 'Solved 300 problems', icon: '👑', condition: (s: any) => s.totalSolved >= 300 },
  { id: 'streak-3', label: '3-Day Streak', desc: 'Coded 3 days in a row', icon: '🔥', condition: (s: any) => s.bestStreak >= 3 },
  { id: 'streak-7', label: 'Weekly Warrior', desc: '7-day streak', icon: '⚡', condition: (s: any) => s.bestStreak >= 7 },
  { id: 'streak-30', label: 'Monthly Hero', desc: '30-day streak', icon: '🌟', condition: (s: any) => s.bestStreak >= 30 },
  { id: 'first-medium', label: 'Rising Up', desc: 'Solved a Medium problem', icon: '📈', condition: (s: any) => s.mediumSolved >= 1 },
  { id: 'first-hard', label: 'Hard Mode', desc: 'Solved a Hard problem', icon: '💪', condition: (s: any) => s.hardSolved >= 1 },
  { id: 'accuracy', label: 'Sharpshooter', desc: '80%+ accuracy (5+ subs)', icon: '🎯', condition: (s: any) => s.totalSubmissions >= 5 && (s.acceptedSubmissions / s.totalSubmissions) >= 0.8 },
  { id: 'points-100', label: 'Point Scorer', desc: 'Earned 100+ points', icon: '🏅', condition: (s: any) => s.points >= 100 },
  { id: 'points-500', label: 'Point Hunter', desc: 'Earned 500+ points', icon: '💰', condition: (s: any) => s.points >= 500 },
];

function AchievementBadge({ achievement, unlocked }: { achievement: typeof ACHIEVEMENTS[0]; unlocked: boolean }) {
  return (
    <div
      title={`${achievement.label} — ${achievement.desc}`}
      className="flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all group"
      style={{
        background: unlocked ? 'rgba(88,166,255,0.08)' : 'var(--color-bg-secondary)',
        border: `1px solid ${unlocked ? 'rgba(88,166,255,0.3)' : 'var(--color-border)'}`,
        opacity: unlocked ? 1 : 0.45,
        filter: unlocked ? 'none' : 'grayscale(1)',
      }}
    >
      <span className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform">{achievement.icon}</span>
      <p className="text-[11px] font-semibold text-primary truncate w-full">{achievement.label}</p>
      <p className="text-[9px] text-muted truncate w-full mt-0.5">{achievement.desc}</p>
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
    <ResponsiveContainer width="100%" height={190}>
      <RadarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
        <PolarGrid stroke="var(--color-border)" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: 'var(--color-text-secondary)' }} />
        <Radar
          name="Mastery"
          dataKey="value"
          stroke="#58a6ff"
          fill="#58a6ff"
          fillOpacity={0.18}
          strokeWidth={1.5}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            color: 'var(--color-text-primary)',
            fontSize: 11,
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
  const { authState } = useAuth();
  const { userStats, submissions, problemProgress } = state;

  const userName = authState.user?.name || 'Student';
  const userInitial = userName[0]?.toUpperCase() || 'S';

  const easyTotal = problems.filter(p => p.difficulty === 'Easy').length;
  const mediumTotal = problems.filter(p => p.difficulty === 'Medium').length;
  const hardTotal = problems.filter(p => p.difficulty === 'Hard').length;

  const accuracy = userStats.totalSubmissions > 0
    ? Math.round((userStats.acceptedSubmissions / userStats.totalSubmissions) * 100)
    : 0;

  const unlockedAchievements = useMemo(
    () => ACHIEVEMENTS.filter((a) => a.condition(userStats)).map((a) => a.id),
    [userStats]
  );

  const recentSubmissions = submissions.slice(0, 20);

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in pb-4">
      {/* Profile header */}
      <div
        className="rounded-2xl p-4 sm:p-5"
        style={{
          background: 'linear-gradient(135deg, rgba(88,166,255,0.1), rgba(188,140,255,0.06))',
          border: '1px solid rgba(88,166,255,0.2)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0 shadow-md"
              style={{ background: 'linear-gradient(135deg, #58a6ff, #bc8cff)', color: '#0d1117' }}
            >
              {authState.user?.avatar ? (
                <img src={authState.user.avatar} alt={userName} className="w-14 h-14 rounded-xl object-cover" />
              ) : userInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-primary">{userName}</h1>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(88,166,255,0.12)', color: '#58a6ff', border: '1px solid rgba(88,166,255,0.25)' }}>
                  Learner
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                <span className="flex items-center gap-1 font-semibold" style={{ color: '#58a6ff' }}>
                  <Star size={12} /> {userStats.rank}
                </span>
                <span className="text-muted">·</span>
                <span className="flex items-center gap-1 font-semibold" style={{ color: '#fd8c73' }}>
                  <Flame size={12} /> {userStats.currentStreak}d streak
                </span>
                <span className="text-muted">·</span>
                <span className="flex items-center gap-1 font-semibold" style={{ color: '#bc8cff' }}>
                  <Zap size={12} /> {userStats.points} pts
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats pill */}
          <div className="flex items-center justify-around sm:justify-end gap-4 sm:gap-6 px-4 py-2 rounded-xl shrink-0" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="text-center">
              <div className="text-base font-bold text-primary">{userStats.totalSolved}</div>
              <div className="text-[10px] text-muted uppercase font-semibold">Solved</div>
            </div>
            <div className="w-px h-6 bg-[var(--color-border)]" />
            <div className="text-center">
              <div className="text-base font-bold text-primary">{accuracy}%</div>
              <div className="text-[10px] text-muted uppercase font-semibold">Accuracy</div>
            </div>
            <div className="w-px h-6 bg-[var(--color-border)]" />
            <div className="text-center">
              <div className="text-base font-bold text-primary">{userStats.bestStreak}d</div>
              <div className="text-[10px] text-muted uppercase font-semibold">Best Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {[
          { label: 'Easy', value: userStats.easySolved, total: easyTotal, color: '#3fb950' },
          { label: 'Medium', value: userStats.mediumSolved, total: mediumTotal, color: '#d29922' },
          { label: 'Hard', value: userStats.hardSolved, total: hardTotal, color: '#f85149' },
          { label: 'Total', value: userStats.totalSolved, total: problems.length, color: '#58a6ff' },
        ].map(({ label, value, total, color }) => (
          <div key={label} className="glass-card p-3.5">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-semibold text-secondary">{label}</span>
              <span className="text-[11px] text-muted">{value} / {total}</span>
            </div>
            <div className="text-xl font-bold text-left mb-2" style={{ color }}>{value}</div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${total > 0 ? (value / total) * 100 : 0}%`,
                  background: color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main 2-column balanced grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left column: Submission History + Coding Stats */}
        <div className="space-y-5 flex flex-col">
          {/* Submission history */}
          <div className="glass-card p-4 sm:p-5 flex flex-col h-[290px]">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h2 className="text-sm font-semibold text-primary flex items-center gap-2">
                <Clock size={15} style={{ color: '#58a6ff' }} />
                Submission History
              </h2>
              <span className="text-xs text-muted">{recentSubmissions.length} logged</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0">
              {recentSubmissions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <Clock size={28} className="opacity-20 mb-2 text-muted" />
                  <p className="text-xs text-muted">No submissions yet.</p>
                  <p className="text-[11px] text-secondary mt-0.5">Solve problems in the workspace to see your history!</p>
                </div>
              ) : (
                recentSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-2.5 rounded-lg text-xs"
                    style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {sub.result.status === 'Accepted' ? (
                        <CheckCircle size={13} style={{ color: '#3fb950' }} className="shrink-0" />
                      ) : (
                        <XCircle size={13} style={{ color: '#f85149' }} className="shrink-0" />
                      )}
                      <Link
                        to={`/problems/${sub.problemId}`}
                        className="font-medium hover:text-accent transition-colors truncate max-w-[150px] sm:max-w-[200px]"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {sub.problemTitle}
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-[11px]">
                      <span
                        className={sub.result.status === 'Accepted' ? 'badge-accepted' : 'badge-wrong'}
                        style={{ fontSize: '10px', padding: '1px 6px' }}
                      >
                        {sub.result.status === 'Accepted' ? 'AC' : sub.result.status.slice(0, 2)}
                      </span>
                      <span className="text-muted capitalize">{sub.language}</span>
                      <span className="text-muted hidden sm:inline">{sub.result.executionTime}ms</span>
                      <span className="text-muted">
                        {new Date(sub.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Coding Stats */}
          <div className="glass-card p-4 sm:p-5 flex flex-col h-[320px] justify-between">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h2 className="text-sm font-semibold text-primary flex items-center gap-2">
                <Code2 size={15} style={{ color: '#58a6ff' }} />
                Coding Stats
              </h2>
              <span className="text-xs text-muted">All Time</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 flex-1">
              {[
                { label: 'Submissions', value: userStats.totalSubmissions, sub: `${userStats.acceptedSubmissions} AC`, icon: Target, color: '#58a6ff' },
                { label: 'Accepted', value: userStats.acceptedSubmissions, sub: 'Solved', icon: CheckCircle, color: '#3fb950' },
                { label: 'Accuracy', value: `${accuracy}%`, sub: 'Hit Rate', icon: TrendingUp, color: '#58a6ff' },
                { label: 'Current Streak', value: `${userStats.currentStreak}d`, sub: 'Active', icon: Flame, color: '#fd8c73' },
                { label: 'Best Streak', value: `${userStats.bestStreak}d`, sub: 'Record', icon: Zap, color: '#d29922' },
                { label: 'Total Points', value: userStats.points, sub: userStats.rank, icon: Trophy, color: '#bc8cff' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl flex flex-col justify-between"
                    style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted font-medium">{item.label}</span>
                      <Icon size={13} style={{ color: item.color }} />
                    </div>
                    <div className="mt-1.5">
                      <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}</div>
                      <div className="text-[10px] text-secondary truncate">{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Topic Mastery + Achievements */}
        <div className="space-y-5 flex flex-col">
          {/* Topic Mastery Radar */}
          <div className="glass-card p-4 sm:p-5 flex flex-col h-[290px] justify-between">
            <div className="flex items-center justify-between mb-1 shrink-0">
              <h2 className="text-sm font-semibold text-primary flex items-center gap-2">
                <TrendingUp size={15} style={{ color: '#58a6ff' }} />
                Topic Mastery
              </h2>
              <span className="text-xs text-muted">Skill Radar</span>
            </div>

            <div className="flex-1 flex items-center justify-center min-h-0">
              <TopicRadar topicMastery={userStats.topicMastery} />
            </div>

            {/* Top topics mini-row */}
            <div className="pt-2 border-t border-[var(--color-border)] mt-1 shrink-0">
              {Object.entries(userStats.topicMastery).some(([, v]) => v > 0) ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(userStats.topicMastery)
                    .filter(([, v]) => v > 0)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 4)
                    .map(([topic, score]) => (
                      <div key={topic} className="flex items-center justify-between text-[11px] p-1.5 rounded bg-[var(--color-bg-secondary)]">
                        <span className="text-secondary truncate mr-1">{topic}</span>
                        <span className="font-bold text-accent">{score}%</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-[11px] text-muted text-center py-0.5">
                  Radar dynamically updates as you solve problems across topics.
                </p>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-card p-4 sm:p-5 flex flex-col h-[320px] justify-between">
            <div className="flex items-center justify-between mb-2.5 shrink-0">
              <h2 className="text-sm font-semibold text-primary flex items-center gap-2">
                <Award size={15} style={{ color: '#bc8cff' }} />
                Achievements ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
              </h2>
              <span className="text-xs text-muted">
                {Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100)}% Unlocked
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 flex-1 overflow-y-auto max-h-[250px] pr-0.5">
              {ACHIEVEMENTS.map((a) => (
                <AchievementBadge
                  key={a.id}
                  achievement={a}
                  unlocked={unlockedAchievements.includes(a.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
