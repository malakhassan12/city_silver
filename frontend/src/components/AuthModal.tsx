'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Lock, MailCheck, Shield, UserCheck, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../context/StoreContext';

export function AuthModal() {
  const {
    lang,
    t,
    authOpen,
    setAuthOpen,
    authDefaultTab,
    session,
    logout,
    loginWithCredentials,
    loginDemoRole,
    registerAccount,
    confirmEmail,
  } = useStore();

  const [tab, setTab] = useState<'customer' | 'register' | 'staff'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pendingVerifyEmail, setPendingVerifyEmail] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authOpen) {
      setTab(authDefaultTab);
      setError('');
    }
  }, [authOpen, authDefaultTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginWithCredentials(email, password);
      if (res.needsVerification && res.email) {
        setPendingVerifyEmail(res.email);
      } else {
        setAuthOpen(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await registerAccount({ name, email, phone, address, password });
      setPendingVerifyEmail(res.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmEmail = async () => {
    if (!pendingVerifyEmail) return;
    setLoading(true);
    try {
      await confirmEmail(pendingVerifyEmail);
      setPendingVerifyEmail(null);
      setAuthOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickRole = async (
    role: 'owner' | 'employee1' | 'employee2' | 'customer' | 'google_customer'
  ) => {
    setLoading(true);
    setError('');
    try {
      await loginDemoRole(role);
      setAuthOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {authOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setAuthOpen(false)}
          className="fixed inset-0 bg-black/55 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border p-5 sm:p-6 shadow-2xl"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border-hairline)' }}>
            <h2 className="text-base font-semibold">
              {tab === 'staff'
                ? lang === 'ar'
                  ? 'تسجيل دخول طاقم العمل والإدارة'
                  : 'Staff & Admin Portal'
                : t.authModalTitle}
            </h2>
            <button
              type="button"
              onClick={() => setAuthOpen(false)}
              className="rounded-lg p-1.5 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {session && (
            <div
              className="mt-4 flex items-center justify-between rounded-xl border p-3 text-xs"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-hairline)',
              }}
            >
              <div>
                <div className="font-semibold">{session.user.name}</div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  {session.user.email}
                  {session.staffRole ? ` · ${session.staffRole.role.toUpperCase()}` : ''}
                </div>
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border px-2.5 py-1.5 font-medium cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                {t.signOut}
              </button>
            </div>
          )}

          {pendingVerifyEmail ? (
            <div className="mt-5 space-y-4 text-center">
              <MailCheck className="mx-auto h-10 w-10" style={{ color: 'var(--accent-primary)' }} />
              <p className="text-sm font-medium">{t.confirmEmailPending}</p>
              <p className="font-mono-tabular text-xs" style={{ color: 'var(--text-muted)' }}>
                {pendingVerifyEmail}
              </p>
              <button
                type="button"
                onClick={handleConfirmEmail}
                disabled={loading}
                className="w-full rounded-xl py-2.5 text-sm font-semibold cursor-pointer"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-contrast)',
                }}
              >
                {t.confirmEmailBtn}
              </button>
            </div>
          ) : (
            <>
              <div
                className="mt-4 grid grid-cols-3 gap-1 rounded-xl p-1"
                style={{ backgroundColor: 'var(--bg-subtle)' }}
              >
                {(['customer', 'register', 'staff'] as const).map((key) => {
                  const active = tab === key;
                  const label =
                    key === 'customer'
                      ? t.authLoginTab
                      : key === 'register'
                      ? t.authRegisterTab
                      : lang === 'ar'
                      ? 'طاقم العمل'
                      : 'Staff Portal';
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setTab(key);
                        setError('');
                      }}
                      className="rounded-lg py-2 text-xs font-semibold cursor-pointer transition-colors"
                      style={{
                        backgroundColor: active ? 'var(--bg-surface)' : 'transparent',
                        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {tab === 'customer' && (
                <div className="mt-4 space-y-3">
                  <form onSubmit={handleLogin} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">{t.customerEmail}</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="customer@citysilver925.demo"
                        className="w-full rounded-xl border px-3 py-2 text-sm"
                        style={{
                          backgroundColor: 'var(--bg-canvas)',
                          borderColor: 'var(--border-hairline)',
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">{t.passwordLabel}</label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border px-3 py-2 text-sm"
                        style={{
                          backgroundColor: 'var(--bg-canvas)',
                          borderColor: 'var(--border-hairline)',
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl py-2.5 text-sm font-semibold cursor-pointer"
                      style={{
                        backgroundColor: 'var(--accent-primary)',
                        color: 'var(--accent-contrast)',
                      }}
                    >
                      {t.signIn}
                    </button>
                  </form>

                  <div className="pt-2 border-t space-y-2" style={{ borderColor: 'var(--border-hairline)' }}>
                    <button
                      type="button"
                      onClick={() => handleQuickRole('google_customer')}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        borderColor: 'var(--border-hairline)',
                      }}
                    >
                      <Lock className="h-3.5 w-3.5" />
                      <span>{t.googleDemoBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickRole('customer')}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium cursor-pointer opacity-80"
                      style={{ borderColor: 'var(--border-hairline)' }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{t.roleCustomer}</span>
                    </button>
                  </div>
                </div>
              )}

              {tab === 'register' && (
                <form onSubmit={handleRegister} className="mt-4 space-y-3">
                  <input
                    type="text"
                    required
                    placeholder={t.customerName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                  />
                  <input
                    type="email"
                    required
                    placeholder={t.customerEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      placeholder={t.customerPhone}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                    />
                    <input
                      type="password"
                      required
                      placeholder={t.passwordLabel}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder={t.shippingAddress}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl py-2.5 text-sm font-semibold cursor-pointer"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: 'var(--accent-contrast)',
                    }}
                  >
                    {t.authRegisterTab}
                  </button>
                </form>
              )}

              {tab === 'staff' && (
                <div className="mt-4 space-y-3">
                  <form onSubmit={handleLogin} className="space-y-2.5">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="owner@citysilver925.demo / karim@citysilver925.demo"
                      className="w-full rounded-xl border px-3 py-2 text-xs"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        borderColor: 'var(--border-hairline)',
                      }}
                    />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Staff925! / Owner925!"
                      className="w-full rounded-xl border px-3 py-2 text-xs"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        borderColor: 'var(--border-hairline)',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl py-2.5 text-xs font-semibold cursor-pointer"
                      style={{
                        backgroundColor: 'var(--accent-primary)',
                        color: 'var(--accent-contrast)',
                      }}
                    >
                      {lang === 'ar' ? 'دخول بوابة العمل' : 'Sign In to Workspace'}
                    </button>
                  </form>

                  <div className="pt-3 border-t space-y-2" style={{ borderColor: 'var(--border-hairline)' }}>
                    <div className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
                      {lang === 'ar' ? 'حسابات معاينة الأدوار:' : 'Quick Staff Role Access:'}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuickRole('owner')}
                      className="flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold cursor-pointer"
                      style={{
                        backgroundColor: 'var(--accent-soft)',
                        borderColor: 'var(--accent-primary)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        {t.roleOwner}
                      </span>
                      <span className="font-mono-tabular opacity-75">Admin</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickRole('employee1')}
                      className="flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs font-medium cursor-pointer"
                      style={{ borderColor: 'var(--border-hairline)' }}
                    >
                      <span className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        {t.roleEmployee1}
                      </span>
                      <span className="font-mono-tabular text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        Staff
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickRole('employee2')}
                      className="flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs font-medium cursor-pointer"
                      style={{ borderColor: 'var(--border-hairline)' }}
                    >
                      <span className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        {t.roleEmployee2}
                      </span>
                      <span className="font-mono-tabular text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        Staff
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}
            </>
          )}
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
