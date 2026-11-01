import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, User, Sparkles } from 'lucide-react';

const Login = () => {
  const [roleMode, setRoleMode] = useState('admin'); // 'admin' or 'patient'
  const [email, setEmail] = useState('kp123@me.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleModeChange = (mode) => {
    setRoleMode(mode);
    if (mode === 'admin') {
      setEmail('admin@mindease.com');
      setPassword('admin123');
    } else {
      setEmail('patient@mindease.com');
      setPassword('patient123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-4">
        {/* Portal Role Switcher Tabs */}
        <div className="flex rounded-xl bg-mindDark-900 border border-mindDark-border p-1 text-xs font-semibold">
          <button
            onClick={() => handleModeChange('admin')}
            className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              roleMode === 'admin'
                ? 'bg-mindCyan text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clinic Staff / Admin</span>
          </button>
          <button
            onClick={() => handleModeChange('patient')}
            className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              roleMode === 'patient'
                ? 'bg-mindCyan text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient Portal</span>
          </button>
        </div>

        {/* Portal Card matching Fig 14.5 */}
        <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl p-8 sm:p-10 shadow-2xl relative space-y-6">
          {/* Top Shield Icon */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mindCyan to-blue-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-mindCyan/25">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {roleMode === 'admin' ? 'Clinic Staff Portal' : 'Patient Portal'}
            </h2>
            <p className="text-xs text-slate-400">
              {roleMode === 'admin'
                ? 'Restricted access. Please sign in with your administrative credentials.'
                : 'Sign in to review your booked appointments and wellness records.'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {roleMode === 'admin' ? 'Staff Email Address' : 'Patient Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={roleMode === 'admin' ? 'admin@mindease.com' : 'patient@mindease.com'}
                  className="w-full pl-10 pr-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link to="/contact" className="text-xs text-mindCyan hover:underline">
                Contact IT Support
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-mindCyan hover:bg-mindCyan-hover text-white font-semibold text-sm shadow-md shadow-mindCyan/25 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Secure login'}</span>
            </button>
          </form>

          {/* Quick Demo fill credentials box */}
          <div className="pt-2 border-t border-mindDark-border/60 text-center space-y-2">
            <p className="text-xs text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-mindCyan hover:underline font-semibold">
                Sign up here
              </Link>
            </p>
            <p className="text-[11px] text-slate-400">⚡ Quick Evaluation Demo Login:</p>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@mindease.com');
                  setPassword('admin123');
                  setRoleMode('admin');
                }}
                className="px-3 py-1 rounded bg-mindDark-850 hover:bg-mindDark-800 text-[11px] text-mindCyan border border-mindDark-border"
              >
                Admin (admin123)
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('patient@mindease.com');
                  setPassword('patient123');
                  setRoleMode('patient');
                }}
                className="px-3 py-1 rounded bg-mindDark-850 hover:bg-mindDark-800 text-[11px] text-slate-300 border border-mindDark-border"
              >
                Patient (patient123)
              </button>
            </div>
          </div>

          {/* HIPAA Notice */}
          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            Unauthorized access to patient records is strictly prohibited under HIPAA and local regulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
