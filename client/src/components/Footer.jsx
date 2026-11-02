import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, Share2, Globe, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#fbf4f2] dark:bg-[#140b12] border-t border-[#ecd8d4] dark:border-[#3e2237] text-stone-600 dark:text-stone-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-dustyRose flex items-center justify-center text-white shadow-sm shadow-dustyRose/30 group-hover:scale-105 transition-transform">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-editorial text-2xl italic tracking-wide text-stone-900 dark:text-rose-100 font-normal">
                MindEase
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              A serene sanctuary dedicated to emotional restoration, self-discovery, and evidence-based psychological wellness. Guided by compassion and clinical excellence.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#sanctuary"
                className="w-8 h-8 rounded-full bg-white dark:bg-[#200f1c] hover:bg-dustyRose hover:text-white flex items-center justify-center text-stone-500 dark:text-stone-300 transition-all border border-[#ecd8d4] dark:border-pink-500/20 shadow-sm"
                aria-label="Message Community"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a
                href="#connect"
                className="w-8 h-8 rounded-full bg-white dark:bg-[#200f1c] hover:bg-dustyRose hover:text-white flex items-center justify-center text-stone-500 dark:text-stone-300 transition-all border border-[#ecd8d4] dark:border-pink-500/20 shadow-sm"
                aria-label="Share Sanctuary"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a
                href="#portal"
                className="w-8 h-8 rounded-full bg-white dark:bg-[#200f1c] hover:bg-dustyRose hover:text-white flex items-center justify-center text-stone-500 dark:text-stone-300 transition-all border border-[#ecd8d4] dark:border-pink-500/20 shadow-sm"
                aria-label="Global Network"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-rose-100 tracking-[0.2em] uppercase mb-4">
              Explore Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="hover:text-dustyRose transition-colors">
                  Our Story & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/therapists" className="hover:text-dustyRose transition-colors">
                  Certified Therapists & Faculty
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-dustyRose transition-colors">
                  Specialized Healing Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-dustyRose transition-colors">
                  Wellness Articles & Library
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-dustyRose transition-colors font-semibold text-dustyRose">
                  Book a Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Specializations */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-rose-100 tracking-[0.2em] uppercase mb-4">
              Therapeutic Areas
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/services" className="hover:text-dustyRose transition-colors">
                  Anxiety & Stress Recovery
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-dustyRose transition-colors">
                  Depression & Mood Therapy
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-dustyRose transition-colors">
                  Cognitive Behavioral Therapy (CBT)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-dustyRose transition-colors">
                  Couples & Relationship Guidance
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-dustyRose transition-colors">
                  Mindfulness & Meditation Coaching
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Sanctuary Location & Emergency */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-rose-100 tracking-[0.2em] uppercase mb-4">
              Visit or Connect
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-dustyRose shrink-0 mt-0.5" />
                <span>123 Sanctuary Way, Wellness Gardens, Suite 400</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-dustyRose shrink-0" />
                <span>+1 (800) 123-EASE (3273)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-dustyRose shrink-0" />
                <a href="mailto:support@mindease.com" className="hover:text-dustyRose transition-colors">
                  sanctuary@mindease.com
                </a>
              </li>
              <li className="pt-1">
                <div className="p-2.5 rounded-xl bg-[#faecea] dark:bg-[#200f1c] border border-[#ecd8d4] dark:border-pink-500/20 text-[11px] text-[#7a4853] dark:text-pink-300">
                  <span className="font-bold">24/7 Crisis Hotline:</span> Call or text{' '}
                  <a href="tel:988" className="font-bold underline text-dustyRose">
                    988
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#ecd8d4] dark:border-pink-500/20 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-4">
          <p>© 2026 MindEase Wellness Sanctuary. Designed for serenity and emotional well-being.</p>
          <p className="flex items-center gap-1.5">
            Crafted with{' '}
            <Heart className="w-3.5 h-3.5 text-dustyRose fill-dustyRose animate-pulse" />{' '}
            for mental clarity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
