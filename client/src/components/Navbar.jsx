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
      <div className="bg-gradient-to-r from-rose-950/70 via-pink-950/40 to-rose-950/70 text-center py-1.5 px-4 text-xs font-medium text-pink-300 border-b border-pink-500/20 flex items-center justify-center gap-2">
        <Phone className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
        <span>Need Immediate help? Call the National Crisis Hotline:</span>
        <a href="tel:988" className="font-bold underline text-white hover:text-pink-200 transition-colors">
          988
        </a>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Heart className="w-5 h-5 fill-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white flex items-center">
                Mind<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Ease</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-pink-300/80 font-medium -mt-1">
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
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-pink-400 font-semibold bg-pink-500/10 border-b-2 border-pink-500'
                    : 'text-slate-300 hover:text-pink-300 hover:bg-pink-500/5'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dashboard / Profile shortcut if logged in */}
            {isAuthenticated && (
              <Link
                to={isAdmin ? '/dashboard' : '/profile'}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(isAdmin ? '/dashboard' : '/profile')
                    ? 'text-pink-400 bg-pink-500/10 font-semibold border-b-2 border-pink-500'
                    : 'text-slate-300 hover:text-pink-300 hover:bg-pink-500/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-pink-400" />
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
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-mindDark-850 hover:bg-pink-500/10 border border-mindDark-border hover:border-pink-500/40 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-pink-400 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Auth / Login status */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to={isAdmin ? '/dashboard' : '/profile'}
                  className="flex items-center gap-2 px-3 py-1.5 bg-mindDark-850 hover:bg-mindDark-800 rounded-full border border-pink-500/30 transition-all group"
                  title="View My Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white text-[11px] font-bold">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-200 group-hover:text-pink-400 transition-colors">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                  <span className="hidden xl:inline text-[10px] px-1.5 py-0.5 rounded bg-mindDark-950 text-pink-300 font-medium">
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
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-pink-300 hover:bg-pink-500/10 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}

            {/* Call / Book appointment Primary CTA */}
            <Link
              to="/book"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-semibold shadow-md shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
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
