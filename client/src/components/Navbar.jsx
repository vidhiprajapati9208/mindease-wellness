import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Phone, Heart, Sun, Moon, UserCheck, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Therapists', path: '/therapists' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-mindDark-950/95 backdrop-blur-md border-b border-mindDark-border/60">
      {/* Emergency Crisis Hotline Strip */}
      <div className="bg-gradient-to-r from-red-950/80 via-mindDark-950 to-red-950/80 text-center py-1.5 px-4 text-xs font-medium text-rose-300 border-b border-rose-900/30 flex items-center justify-center gap-2">
        <Phone className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        <span>Need Immediate help? Call the National Crisis Hotline:</span>
        <a href="tel:988" className="font-bold underline text-white hover:text-rose-200">
          988
        </a>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mindCyan to-blue-600 flex items-center justify-center text-white shadow-lg shadow-mindCyan/20 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white flex items-center">
                Mind<span className="text-mindCyan">Ease</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium -mt-1">
                Wellness System
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-mindCyan font-semibold bg-mindDark-850'
                    : 'text-slate-300 hover:text-white hover:bg-mindDark-850/60'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dashboard / Profile shortcut if logged in */}
            {isAuthenticated && (
              <Link
                to={isAdmin ? '/dashboard' : '/profile'}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(isAdmin ? '/dashboard' : '/profile')
                    ? 'text-mindCyan bg-mindDark-850 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-mindDark-850/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-mindCyan" />
                <span>{isAdmin ? 'Clinic Dashboard' : 'My Profile & Bookings'}</span>
              </Link>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-mindDark-850 hover:bg-mindDark-800 border border-mindDark-border hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Auth / Login status */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to={isAdmin ? '/dashboard' : '/profile'}
                  className="flex items-center gap-2 px-3 py-1.5 bg-mindDark-850 hover:bg-mindDark-800 rounded-full border border-mindDark-border transition-all group"
                  title="View My Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-mindCyan to-blue-600 flex items-center justify-center text-white text-[11px] font-bold">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-200 group-hover:text-mindCyan transition-colors">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                  <span className="hidden xl:inline text-[10px] px-1.5 py-0.5 rounded bg-mindDark-950 text-slate-400 font-medium">
                    {isAdmin ? 'Staff' : 'Patient'}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-mindDark-850 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-mindDark-850 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}

            {/* Call / Book appointment Primary CTA */}
            <Link
              to="/book"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-mindCyan hover:bg-mindCyan-hover text-white text-sm font-semibold shadow-md shadow-mindCyan/25 hover:shadow-mindCyan/40 hover:-translate-y-0.5 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Talk to a Therapist</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
