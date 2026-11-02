import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Phone,
  Heart,
  Sun,
  Moon,
  UserCheck,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Stethoscope,
  Activity,
  BookOpen,
  Info,
  MapPin,
  Calendar,
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownMenuItems = [
    {
      name: 'Therapists & Doctors',
      desc: 'Browse certified psychologists & booking',
      path: '/therapists',
      icon: Stethoscope,
      badge: 'Certified'
    },
    {
      name: 'Clinical Services',
      desc: 'Anxiety, Depression, Couples & Burnout care',
      path: '/services',
      icon: Activity,
      badge: '6 Specialties'
    },
    {
      name: 'Wellness Library & Blog',
      desc: 'Therapist articles & psychoeducation',
      path: '/blog',
      icon: BookOpen,
      badge: 'Articles'
    },
    {
      name: 'About MindEase',
      desc: 'Our clinical philosophy & core mission',
      path: '/about',
      icon: Info
    },
    {
      name: 'Contact & Clinic Location',
      desc: 'Office hours, interactive map & support',
      path: '/contact',
      icon: MapPin
    },
    {
      name: 'Book Consultation',
      desc: '3-step instant scheduling wizard',
      path: '/book',
      icon: Calendar,
      highlight: true
    }
  ];

  const isActive = (path) => location.pathname === path;
  const isAnyDropdownActive = dropdownMenuItems.some((item) => location.pathname === item.path);

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
                Mind<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-300">Ease</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-pink-300/80 font-medium -mt-1">
                Wellness System
              </span>
            </div>
          </Link>

          {/* Desktop Nav: Clean Home + Modern Dropdown */}
          <nav className="hidden md:flex items-center space-x-2" ref={dropdownRef}>
            {/* 1. Home Button */}
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-pink-300 hover:bg-pink-500/10'
              }`}
            >
              Home
            </Link>

            {/* 2. Sleek Modern "Explore Menu ▾" Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isDropdownOpen || isAnyDropdownActive
                    ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-pink-500/10 border border-transparent'
                }`}
                aria-expanded={isDropdownOpen}
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Explore Sanctuary</span>
                <ChevronDown
                  className={`w-4 h-4 text-pink-400 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Glassmorphism Floating Dropdown Panel */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-80 sm:w-96 rounded-2xl bg-mindDark-900/95 border border-pink-500/30 p-2.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-3 py-2 border-b border-pink-500/15 mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-pink-400 tracking-wider uppercase">
                      MindEase Platform Directory
                    </span>
                    <span className="text-[10px] text-slate-400">Select Destination</span>
                  </div>

                  <div className="space-y-1">
                    {dropdownMenuItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                            active
                              ? 'bg-gradient-to-r from-pink-500/25 to-rose-500/15 text-white border border-pink-500/40'
                              : 'hover:bg-pink-500/10 text-slate-200 hover:text-white'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              active
                                ? 'bg-pink-500 text-white'
                                : 'bg-mindDark-850 text-pink-400 border border-pink-500/20'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm font-bold text-white truncate">
                                {item.name}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-300 font-semibold border border-pink-500/30">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Dashboard / Profile shortcut if logged in */}
            {isAuthenticated && (
              <Link
                to={isAdmin ? '/dashboard' : '/profile'}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive(isAdmin ? '/dashboard' : '/profile')
                    ? 'text-pink-300 bg-pink-500/20 border border-pink-500/40'
                    : 'text-slate-300 hover:text-pink-300 hover:bg-pink-500/10'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-pink-400" />
                <span>{isAdmin ? 'Clinic Dashboard' : 'My Bookings'}</span>
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
                className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-slate-300 hover:text-pink-300 hover:bg-pink-500/10 rounded-xl transition-colors"
              >
                Login
              </Link>
            )}

            {/* Call / Book appointment Primary CTA */}
            <Link
              to="/book"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Talk to a Therapist</span>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-mindDark-850 text-slate-300 border border-mindDark-border"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-pink-500/20 py-4 space-y-2 animate-in fade-in duration-200">
            <Link
              to="/"
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-pink-500/15"
            >
              Home
            </Link>
            {dropdownMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-pink-500/10"
              >
                {item.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="block px-4 py-2 rounded-xl text-sm font-medium text-pink-400 hover:bg-pink-500/10"
              >
                Login to Portal
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
