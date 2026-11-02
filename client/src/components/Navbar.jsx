import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Phone,
  Heart,
  Sun,
  Moon,
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
  X,
  User
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const [isOfferingsOpen, setIsOfferingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on route change
  useEffect(() => {
    setIsOfferingsOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOfferingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const offeringItems = [
    {
      name: 'Therapists & Doctors',
      desc: 'Browse certified psychologists & booking',
      path: '/therapists',
      icon: Stethoscope,
      badge: 'Certified'
    },
    {
      name: 'Clinical Services',
      desc: 'Specialized therapy for anxiety, depression & healing',
      path: '/services',
      icon: Activity,
      badge: 'Specialties'
    },
    {
      name: 'Wellness Sanctuary & Blog',
      desc: 'Articles on mindfulness, meditation & recovery',
      path: '/blog',
      icon: BookOpen,
      badge: 'Library'
    },
    {
      name: 'Book a Private Session',
      desc: 'Instant online or in-person consultation scheduling',
      path: '/book',
      icon: Calendar,
      highlight: true
    }
  ];

  const isActive = (path) => location.pathname === path;
  const isOfferingActive = offeringItems.some((item) => location.pathname === item.path);

  return (
    <header className="sticky top-0 z-50 bg-[#fdf9f7]/95 dark:bg-[#140b12]/95 backdrop-blur-md border-b border-[#f0dbd7] dark:border-[#3e2237] transition-colors duration-300">
      {/* Delicate Emergency Crisis Hotline Banner */}
      <div className="bg-[#fbf2f0] dark:bg-[#200f1c] text-[#7a4853] dark:text-pink-300 text-xs py-1.5 px-4 text-center border-b border-[#f0dbd7] dark:border-pink-500/20 flex items-center justify-center gap-2">
        <Phone className="w-3.5 h-3.5 text-dustyRose animate-pulse" />
        <span className="font-normal">Need immediate support? Call the 24/7 National Crisis Lifeline:</span>
        <a
          href="tel:988"
          className="font-bold underline text-dustyRose hover:text-dustyRose-hover transition-colors"
        >
          988
        </a>
      </div>

      {/* Main Sanctuary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Serif "MindEase" matching "Blooming Rose" header */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#e88d9f] via-dustyRose to-[#b54841] flex items-center justify-center text-white shadow-sm shadow-dustyRose/30 group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-4 h-4 fill-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-2xl sm:text-3xl italic tracking-wide text-stone-900 dark:text-rose-100 font-normal">
                MindEase
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#9d5b67] dark:text-pink-400 font-semibold -mt-1">
                Sanctuary & Wellness
              </span>
            </div>
          </Link>

          {/* Desktop Nav: Clean Minimalist Menu (Home | About | Offerings ▾ | Contact) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" ref={dropdownRef}>
            {/* Home Link */}
            <Link
              to="/"
              className={`px-3.5 py-2 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-200 relative ${
                isActive('/')
                  ? 'text-dustyRose font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-dustyRose'
                  : 'text-stone-700 dark:text-stone-300 hover:text-dustyRose'
              }`}
            >
              Home
            </Link>

            {/* About Link */}
            <Link
              to="/about"
              className={`px-3.5 py-2 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-200 relative ${
                isActive('/about')
                  ? 'text-dustyRose font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-dustyRose'
                  : 'text-stone-700 dark:text-stone-300 hover:text-dustyRose'
              }`}
            >
              About
            </Link>

            {/* Offerings Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOfferingsOpen(!isOfferingsOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer ${
                  isOfferingsOpen || isOfferingActive
                    ? 'text-dustyRose font-bold'
                    : 'text-stone-700 dark:text-stone-300 hover:text-dustyRose'
                }`}
                aria-expanded={isOfferingsOpen}
              >
                <span>Offerings</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-dustyRose transition-transform duration-300 ${
                    isOfferingsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Offerings Dropdown Panel */}
              {isOfferingsOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/30 p-2.5 shadow-xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-[#f0dbd7] dark:border-pink-500/15 mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-dustyRose uppercase tracking-[0.2em]">
                      Clinical Directory & Offerings
                    </span>
                    <span className="text-[10px] text-stone-400">MindEase</span>
                  </div>

                  <div className="space-y-1">
                    {offeringItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                            active
                              ? 'bg-[#faecea] dark:bg-pink-500/20 text-dustyRose dark:text-pink-200 font-semibold border border-[#ecd8d4] dark:border-pink-500/40'
                              : 'hover:bg-[#fbf2f0] dark:hover:bg-pink-500/10 text-stone-700 dark:text-stone-200 hover:text-dustyRose'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              active
                                ? 'bg-dustyRose text-white'
                                : 'bg-[#faecea] dark:bg-[#2a1725] text-dustyRose border border-[#ecd8d4] dark:border-pink-500/20'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm font-semibold truncate">
                                {item.name}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#faecea] dark:bg-pink-500/15 text-dustyRose dark:text-pink-300 font-semibold border border-[#ecd8d4] dark:border-pink-500/30">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5 font-normal">
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

            {/* Contact Link */}
            <Link
              to="/contact"
              className={`px-3.5 py-2 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-200 relative ${
                isActive('/contact')
                  ? 'text-dustyRose font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-dustyRose'
                  : 'text-stone-700 dark:text-stone-300 hover:text-dustyRose'
              }`}
            >
              Contact
            </Link>

            {/* If Logged In: Dashboard / My Appointments */}
            {isAuthenticated && (
              <Link
                to={isAdmin ? '/dashboard' : '/profile'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                  isActive(isAdmin ? '/dashboard' : '/profile')
                    ? 'text-dustyRose bg-[#faecea] dark:bg-pink-500/20 border border-[#ecd8d4]'
                    : 'text-stone-600 dark:text-stone-300 hover:text-dustyRose'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-dustyRose" />
                <span>{isAdmin ? 'Staff Dashboard' : 'My Sessions'}</span>
              </Link>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle (Light / Dark) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all bg-[#faecea] dark:bg-[#2a1725] hover:bg-[#f5d5d1] border border-[#ecd8d4] dark:border-pink-500/30 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-dustyRose transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Auth: Login / Profile */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to={isAdmin ? '/dashboard' : '/profile'}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#faecea] dark:bg-[#2a1725] hover:bg-[#f5d5d1] rounded-full border border-[#ecd8d4] dark:border-pink-500/30 transition-all group"
                  title="View My Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-dustyRose flex items-center justify-center text-white text-[11px] font-bold">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-dustyRose transition-colors">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-2 text-stone-500 dark:text-stone-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-block px-3 py-1.5 text-xs uppercase tracking-widest font-semibold text-stone-700 dark:text-stone-300 hover:text-dustyRose transition-colors"
              >
                Login
              </Link>
            )}

            {/* Primary Action Button: "BOOK A SESSION" matching inspiration image */}
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Session</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#faecea] dark:bg-[#2a1725] text-stone-700 dark:text-stone-300 border border-[#ecd8d4] dark:border-pink-500/30 cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#f0dbd7] dark:border-pink-500/20 bg-[#fdf9f7] dark:bg-[#1e111b] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
          <Link
            to="/"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wider uppercase ${
              isActive('/') ? 'bg-[#faecea] text-dustyRose font-bold' : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wider uppercase ${
              isActive('/about') ? 'bg-[#faecea] text-dustyRose font-bold' : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            About
          </Link>

          <div className="pt-2 pb-1 px-4">
            <span className="text-[10px] font-bold text-dustyRose uppercase tracking-[0.2em]">
              Offerings & Directory
            </span>
          </div>
          {offeringItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-stone-700 dark:text-stone-300 hover:bg-[#faecea] hover:text-dustyRose"
              >
                <Icon className="w-4 h-4 text-dustyRose" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <Link
            to="/contact"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wider uppercase ${
              isActive('/contact') ? 'bg-[#faecea] text-dustyRose font-bold' : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            Contact
          </Link>

          {!isAuthenticated && (
            <Link
              to="/login"
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-dustyRose bg-[#faecea] text-center mt-3"
            >
              Sign In to MindEase
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
