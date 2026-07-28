import React, { useState } from 'react';
import { Shield, Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import logoImg from '../assets/logo.png';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('gmaula@touchandsolve.com');
  const [password, setPassword] = useState('P@ssw0rd');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'gmaula@touchandsolve.com' && password === 'P@ssw0rd') {
        onLogin();
      } else {
        setError('Invalid email or password. Access Denied.');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-900 relative overflow-hidden font-manrope">
      {/* Background blobs for premium depth */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md p-8 bg-[#1E1B3A]/80 border border-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl z-10 transition-all duration-300">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-slate-950/40 rounded-2xl flex items-center justify-center p-3 border border-[#2d2854] shadow-inner mb-4">
            <img src={logoImg} alt="Touch & Solve Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">HRMS-TNS Portal</h2>
          <p className="text-xs text-[#A5B4FC] font-semibold tracking-widest uppercase mt-1">
            Touch & Solve Admin Panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-xl text-center text-xs font-semibold text-rose-400">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@touchandsolve.com"
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-950/40 border border-[#2d2854] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-200 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 text-xs bg-slate-950/40 border border-[#2d2854] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-200 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-400 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-[#2d2854] bg-slate-950/40 text-indigo-650 focus:ring-indigo-500"
              />
              <span className="text-[11px] font-medium text-slate-400">Remember session</span>
            </label>
            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                alert('For security reasons, password recovery must be handled by the IT Administrator.');
              }}
              className="text-[11px] font-bold text-indigo-400 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 bg-indigo-650 hover:bg-indigo-600 active:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-950/50 flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <Shield size={16} />
                <span>Authorized Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Info */}
        <div className="mt-8 text-center text-[10px] text-slate-500 border-t border-[#2d2854]/40 pt-4 flex items-center justify-center gap-1.5">
          <span>Secure AES-256 encrypted gateway</span>
        </div>
      </div>
    </div>
  );
};
