import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {
  LayoutDashboard, BookOpen, Code2, Brain, User, Sun, Moon, Zap, Database,
} from 'lucide-react';
import { AppProvider, useAppContext } from './store/AppContext';
import { storageService } from './services/storageService';
import Dashboard from './pages/Dashboard';
import ProblemList from './pages/ProblemList';
import ProblemWorkspace from './pages/ProblemWorkspace';
import AICodeMentor from './pages/AICodeMentor';
import Profile from './pages/Profile';
import './index.css';

// ============================================================
// NAVBAR COMPONENT
// ============================================================
function Navbar() {
  const { state, dispatch } = useAppContext();
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; dbName?: string } | null>(null);

  useEffect(() => {
    storageService.checkDbHealth().then(setDbStatus);
    const interval = setInterval(() => {
      storageService.checkDbHealth().then(setDbStatus);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () =>
    dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' });

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/problems', icon: BookOpen, label: 'Problems' },
    { to: '/ai-mentor', icon: Brain, label: 'AI Mentor' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'rgba(13,17,23,0.9)',
        backdropFilter: 'blur(12px)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 no-underline">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: 'linear-gradient(135deg, #58a6ff, #bc8cff)' }}
          >
            <Code2 size={16} style={{ color: '#0d1117' }} />
          </div>
          <span className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
            AI <span style={{ color: '#58a6ff' }}>CodeMentor</span>
          </span>
        </NavLink>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          {state.userStats.currentStreak > 0 && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold"
              style={{ background: 'rgba(210,153,34,0.15)', color: '#d29922', border: '1px solid rgba(210,153,34,0.3)' }}
            >
              <Zap size={12} />
              {state.userStats.currentStreak}d
            </div>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="btn-ghost p-2"
            aria-label="Toggle theme"
          >
            {state.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Points badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'rgba(88,166,255,0.1)', color: '#58a6ff', border: '1px solid rgba(88,166,255,0.2)' }}
          >
            <span>{state.userStats.points} pts</span>
            <span style={{ color: 'var(--color-text-muted)' }}>· {state.userStats.rank}</span>
          </div>

          {/* MongoDB Cluster Status */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium cursor-help"
            title={
              dbStatus?.connected
                ? `MongoDB Cluster: Connected to ${dbStatus.dbName || 'codementor_ai'} (localhost:27017)`
                : 'MongoDB: Offline / Local fallback active'
            }
            style={{
              background: dbStatus?.connected ? 'rgba(35, 134, 54, 0.15)' : 'rgba(218, 54, 51, 0.15)',
              color: dbStatus?.connected ? '#3fb950' : '#f85149',
              border: `1px solid ${dbStatus?.connected ? 'rgba(46, 160, 67, 0.3)' : 'rgba(248, 81, 73, 0.3)'}`,
            }}
          >
            <Database size={13} />
            <span className="hidden md:inline font-mono text-[11px]">
              {dbStatus?.connected ? 'MongoDB' : 'DB Offline'}
            </span>
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                dbStatus?.connected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
              }`}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// APP SHELL
// ============================================================
function AppShell() {
  const { state } = useAppContext();

  return (
    <div className={state.theme === 'light' ? 'light' : ''} style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
      <Router>
        <Navbar />
        <main className="max-w-screen-2xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/:id" element={<ProblemWorkspace />} />
            <Route path="/ai-mentor" element={<AICodeMentor />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--color-bg-card)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
