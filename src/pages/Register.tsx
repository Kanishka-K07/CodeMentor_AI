import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Mail, Lock, User, Eye, EyeOff, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../store/AuthContext';
import { useAppContext } from '../store/AppContext';

// Password strength helper
function getStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map: Record<number, { label: string; color: string }> = {
    0: { label: 'Too short', color: '#6e7681' },
    1: { label: 'Weak', color: '#f85149' },
    2: { label: 'Fair', color: '#d29922' },
    3: { label: 'Good', color: '#58a6ff' },
    4: { label: 'Strong', color: '#3fb950' },
  };
  return { score, ...(map[score] ?? map[0]) };
}

export default function Register() {
  const { register } = useAuth();
  const { state } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [migrateGuest, setMigrateGuest] = useState(true);

  const strength = getStrength(form.password);
  const hasGuestData =
    state.userStats.totalSubmissions > 0 || Object.keys(state.problemProgress).length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const guestData =
        hasGuestData && migrateGuest
          ? { userStats: state.userStats, problemProgress: state.problemProgress }
          : undefined;

      await register(form.name.trim(), form.email.trim(), form.password, guestData);
      toast.success('Account created! Welcome aboard 🚀');
      navigate('/');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(188,140,255,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{
              background: 'linear-gradient(135deg, #bc8cff, #58a6ff)',
              boxShadow: '0 0 40px rgba(188,140,255,0.25)',
            }}
          >
            <Sparkles size={26} style={{ color: '#0d1117' }} />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Create your account
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Start your coding journey with AI <span style={{ color: '#bc8cff' }}>CodeMentor</span>
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          }}
        >
          {/* Error */}
          {error && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-lg mb-5 text-sm"
              style={{
                background: 'rgba(248,81,73,0.1)',
                border: '1px solid rgba(248,81,73,0.3)',
                color: '#f85149',
              }}
            >
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          {/* Guest data migration banner */}
          {hasGuestData && (
            <div
              className="flex items-start gap-3 px-4 py-3 rounded-lg mb-5 text-sm cursor-pointer"
              style={{
                background: 'rgba(88,166,255,0.08)',
                border: '1px solid rgba(88,166,255,0.25)',
                color: 'var(--color-text-secondary)',
              }}
              onClick={() => setMigrateGuest((v) => !v)}
            >
              <div
                className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center mt-0.5 border"
                style={{
                  background: migrateGuest ? '#58a6ff' : 'transparent',
                  borderColor: migrateGuest ? '#58a6ff' : 'var(--color-border)',
                  transition: 'all 0.2s',
                }}
              >
                {migrateGuest && <CheckCircle size={13} style={{ color: '#0d1117' }} />}
              </div>
              <span>
                <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                  Migrate guest progress
                </span>{' '}
                — Import your {state.userStats.totalSubmissions} submission
                {state.userStats.totalSubmissions !== 1 ? 's' : ''} and{' '}
                {state.userStats.totalSolved} solved problem
                {state.userStats.totalSolved !== 1 ? 's' : ''} to your new account.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-name" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Full name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Kanishka"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#bc8cff')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-email" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Email address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#bc8cff')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-password" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
                <input
                  id="reg-password"
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#bc8cff')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Strength meter */}
              {form.password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength.score ? strength.color : 'var(--color-border)' }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-confirm" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Confirm password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
                <input
                  id="reg-confirm"
                  name="confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    background: 'var(--color-bg-secondary)',
                    border: `1px solid ${
                      form.confirm && form.confirm !== form.password
                        ? '#f85149'
                        : form.confirm && form.confirm === form.password
                        ? '#3fb950'
                        : 'var(--color-border)'
                    }`,
                    color: 'var(--color-text-primary)',
                  }}
                  onFocus={(e) => {
                    if (!form.confirm || form.confirm === form.password)
                      e.currentTarget.style.borderColor = '#bc8cff';
                  }}
                  onBlur={(e) => {
                    if (!form.confirm)
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                    else if (form.confirm !== form.password)
                      e.currentTarget.style.borderColor = '#f85149';
                    else
                      e.currentTarget.style.borderColor = '#3fb950';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.confirm && form.confirm !== form.password && (
                <p className="text-xs" style={{ color: '#f85149' }}>Passwords do not match</p>
              )}
            </div>

            {/* Submit */}
            <button
              id="register-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 mt-1"
              style={{
                background: loading ? 'rgba(188,140,255,0.5)' : 'linear-gradient(135deg, #bc8cff, #58a6ff)',
                color: '#0d1117',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(188,140,255,0.3)',
              }}
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
          </div>

          <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold" style={{ color: '#bc8cff' }}>
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center mt-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Just exploring?{' '}
          <Link to="/" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>
            Continue as guest
          </Link>
        </p>
      </div>
    </div>
  );
}
