import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, Share2, Globe, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-mindDark-950 border-t border-mindDark-border/60 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-mindCyan flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Mind<span className="text-mindCyan">Ease</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your mental wellness matters. We provide a safe, compassionate, and professional space to help you heal, grow, and reclaim peace in your daily life.
            </p>
            {/* Social Icons matching Fig 14.1 */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#message"
                className="w-9 h-9 rounded-full bg-mindDark-850 hover:bg-mindCyan hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-mindDark-border"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#share"
                className="w-9 h-9 rounded-full bg-mindDark-850 hover:bg-mindCyan hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-mindDark-border"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#web"
                className="w-9 h-9 rounded-full bg-mindDark-850 hover:bg-mindCyan hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-mindDark-border"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-mindCyan transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-mindCyan transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-mindCyan transition-colors">
                  Resources & Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-mindCyan transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-mindCyan transition-colors">
                  Clinic Roster
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-mindCyan transition-colors">
                  Anxiety Therapy
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-mindCyan transition-colors">
                  Depression Counseling
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-mindCyan transition-colors">
                  Stress Management
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-mindCyan transition-colors">
                  Family Therapy
                </Link>
              </li>
              <li>
                <Link to="/therapists" className="hover:text-mindCyan transition-colors">
                  Licensed Therapists
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Get In Touch */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-mindCyan shrink-0 mt-1" />
                <span>123 Wellness Avenue, Health District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-mindCyan shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-mindCyan shrink-0" />
                <a href="mailto:support@mindease.com" className="hover:text-white transition-colors">
                  support@mindease.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-mindDark-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 MindEase Wellness. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for mental wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
