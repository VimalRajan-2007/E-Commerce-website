import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DEMO_CUSTOMER_USER, DEMO_ADMIN_USER } from '../lib/supabase';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    login,
    signup,
    addToast,
  } = useStore();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Sync mode with context
  React.useEffect(() => {
    setMode(authModalMode);
    setResetSent(false);
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!email.trim()) {
        addToast('Please enter your email', 'error');
        return;
      }
      login(email, password);
    } else if (mode === 'signup') {
      if (!fullName.trim() || !email.trim()) {
        addToast('Please fill all required fields', 'error');
        return;
      }
      signup(fullName, email, password);
    } else if (mode === 'forgot') {
      if (!email.trim()) {
        addToast('Please enter your email', 'error');
        return;
      }
      setResetSent(true);
      addToast(`Password recovery link dispatched to ${email}`);
    }
  };

  const handleQuickCustomer = () => {
    login(DEMO_CUSTOMER_USER.email, 'password', false);
  };

  const handleQuickAdmin = () => {
    login(DEMO_ADMIN_USER.email, 'password', true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Brand Heading */}
        <div className="space-y-1 text-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xl mx-auto mb-2">
            N
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
            {mode === 'login'
              ? 'Sign in to NEXORA'
              : mode === 'signup'
              ? 'Create Your Account'
              : 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Enter your credentials or test with one-click demo profiles'
              : mode === 'signup'
              ? 'Unlock tracked deliveries, warranty vault, and express checkout'
              : 'Enter your account email to receive a recovery link'}
          </p>
        </div>

        {/* One-Click Quick Login Buttons */}
        {mode === 'login' && (
          <div className="space-y-2 pt-1 border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
              One-Click Portfolio Testing
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickCustomer}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-cyan-500" />
                <span>Demo Customer</span>
              </button>

              <button
                type="button"
                onClick={handleQuickAdmin}
                className="p-2.5 rounded-xl border border-cyan-500/30 bg-cyan-50/30 dark:bg-cyan-950/30 hover:bg-cyan-50/60 dark:hover:bg-cyan-950/60 text-xs font-semibold text-cyan-700 dark:text-cyan-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-500" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* Form Body */}
        {resetSent ? (
          <div className="p-6 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs">
            <Check className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-slate-900 dark:text-white">Recovery Link Dispatched</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Check your inbox for step-by-step instructions to create a new password.
            </p>
            <button
              onClick={() => setMode('login')}
              className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {mode === 'signup' && (
              <div>
                <label className="text-slate-500 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-slate-500 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.mercer@nexora.io"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-500">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md mt-2 cursor-pointer"
            >
              {mode === 'login'
                ? 'Sign In'
                : mode === 'signup'
                ? 'Create NEXORA Account'
                : 'Send Password Reset Link'}
            </button>
          </form>
        )}

        {/* Mode Switcher */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          {mode === 'login' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
