import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, KeyRound, AlertCircle, ArrowLeft, LogOut, CheckCircle2 } from 'lucide-react';
import { ADMIN_AUTH_TOKEN } from '../../services/appointmentApiService';

const ADMIN_SESSION_KEY = 'dr_hashi_admin_session';
const DEFAULT_STAFF_PIN = 'hashi2026';

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (session === ADMIN_AUTH_TOKEN) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (pin.trim() === DEFAULT_STAFF_PIN || pin.trim() === ADMIN_AUTH_TOKEN) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, ADMIN_AUTH_TOKEN);
      setIsAuthenticated(true);
    } else {
      setError('Invalid Clinic Staff PIN. Please check with Dr. Hashi.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setPin('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 sm:p-10 shadow-2xl border border-slate-800 space-y-6 animate-in fade-in duration-300">
          {/* Header Icon */}
          <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div className="text-center space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block">
              Authorized Staff Only
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">Clinic Admin Access</h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Please enter your Clinic Staff PIN to access the doctor appointment management portal.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Staff PIN Code
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter PIN (e.g. hashi2026)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50 focus:bg-white transition-all font-mono tracking-wider"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 pl-1">Default PIN: <code className="font-bold text-slate-600">hashi2026</code></p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Clinic Website</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Top Admin Status Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Staff Portal Active: <strong>Dr. Shinto Thomas (Clinic Admin)</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-400 hover:text-white transition-colors">
              View Public Website ↗
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-bold transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};
