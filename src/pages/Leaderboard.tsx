import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Star, Crown, Medal, TrendingUp } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  points: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  currentStreak: number;
  bestStreak: number;
  rank: string;
}

function RankIcon({ position }: { position: number }) {
  if (position === 1) return <Crown size={18} style={{ color: '#ffd700' }} />;
  if (position === 2) return <Medal size={18} style={{ color: '#c0c0c0' }} />;
  if (position === 3) return <Medal size={18} style={{ color: '#cd7f32' }} />;
  return <span className="text-sm font-bold text-muted w-5 text-center">{position}</span>;
}

export default function Leaderboard() {
  const { authState } = useAuth();
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'alltime'>('alltime');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/leaderboard?period=${period}&limit=50`)
      .then(r => r.json())
      .then(data => {
        setEntries(data.leaderboard || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load leaderboard. Make sure the server is running.');
        setLoading(false);
      });
  }, [period]);

  const currentUserId = authState.user?.id;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Trophy size={22} style={{ color: '#ffd700' }} /> Leaderboard
          </h1>
          <p className="text-secondary text-sm mt-1">Top coders ranked by XP points earned</p>
        </div>
        {/* Period Tabs */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
          {(['weekly', 'monthly', 'alltime'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize"
              style={{
                background: period === p ? 'linear-gradient(135deg, #58a6ff, #bc8cff)' : 'transparent',
                color: period === p ? '#0d1117' : 'var(--color-text-secondary)',
                border: 'none',
              }}
            >
              {p === 'alltime' ? 'All Time' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="glass-card overflow-hidden">
        {/* Header */}
        <div
          className="grid gap-4 px-5 py-3 text-xs font-semibold text-muted"
          style={{
            gridTemplateColumns: '48px 1fr 80px 100px 80px 80px',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-bg-secondary)',
          }}
        >
          <div className="text-center">Rank</div>
          <div>Coder</div>
          <div className="text-center">Points</div>
          <div className="text-center">Solved</div>
          <div className="text-center">Streak</div>
          <div className="text-center">Title</div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="py-12 text-center text-muted text-sm">
            <Trophy size={32} className="mx-auto mb-3 opacity-20" />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && entries.length === 0 && (
          <div className="py-12 text-center text-muted text-sm">
            <TrendingUp size={32} className="mx-auto mb-3 opacity-20" />
            <p>No leaderboard data yet. Start solving problems!</p>
          </div>
        )}

        {!loading && !error && entries.map((entry, idx) => {
          const isMe = entry.id === currentUserId;
          return (
            <div
              key={entry.id}
              className="grid gap-4 px-5 py-3.5 items-center transition-all"
              style={{
                gridTemplateColumns: '48px 1fr 80px 100px 80px 80px',
                borderBottom: idx < entries.length - 1 ? '1px solid var(--color-border)' : 'none',
                background: isMe ? 'rgba(88,166,255,0.06)' : idx === 0 ? 'rgba(255,215,0,0.04)' : undefined,
              }}
            >
              <div className="flex justify-center">
                <RankIcon position={idx + 1} />
              </div>
              <div className="flex items-center gap-3 min-w-0">
                {entry.avatar ? (
                  <img src={entry.avatar} alt={entry.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #58a6ff, #bc8cff)', color: '#0d1117' }}
                  >
                    {entry.name[0]?.toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-primary truncate block">
                    {entry.name}
                    {isMe && <span className="ml-2 text-xs text-accent">(you)</span>}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold" style={{ color: '#bc8cff' }}>{entry.points}</span>
              </div>
              <div className="text-center text-xs text-muted">
                <span style={{ color: '#3fb950' }}>{entry.easySolved}E</span>
                {' · '}
                <span style={{ color: '#d29922' }}>{entry.mediumSolved}M</span>
                {' · '}
                <span style={{ color: '#f85149' }}>{entry.hardSolved}H</span>
              </div>
              <div className="text-center text-xs flex items-center justify-center gap-1" style={{ color: '#fd8c73' }}>
                <Flame size={12} />
                {entry.currentStreak}d
              </div>
              <div className="text-center">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(88,166,255,0.1)', color: '#58a6ff', border: '1px solid rgba(88,166,255,0.2)' }}>
                  {entry.rank}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && !error && entries.length > 0 && (
        <p className="text-xs text-muted text-center">
          Showing top {entries.length} coders · Points update on each submission
        </p>
      )}
    </div>
  );
}
