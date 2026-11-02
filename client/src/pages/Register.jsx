import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, Heart } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const res = await register(name, email, password, role);
    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } else {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-4">
        {/* Register Card */}
        <div className="bg-mindDark-900 border border-pink-500/20 rounded-3xl p-8 sm:p-10 shadow-2xl relative space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-pink-500/35 animate-float">
              <Heart className="w-7 h-7 fill-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Create an Account
            </h2>
            <p className="text-xs text-slate-400">
              Join MindEase Wellness for secure, confidential mental health services.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Account Type
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white focus:outline-none focus:border-mindCyan"
              >
                <option value="patient">Patient (Standard Access)</option>
                <option value="admin">Clinic Staff / Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-md shadow-pink-500/35 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Creating Account...' : 'Register'}</span>
            </button>
          </form>

          <div className="text-center pt-2 border-t border-pink-500/20">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-pink-400 hover:underline font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
