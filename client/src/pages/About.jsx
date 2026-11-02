import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Award, Users, ArrowRight, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      
      {/* Editorial Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#faecea] dark:bg-[#2a1725] text-dustyRose text-xs font-semibold uppercase tracking-[0.2em] border border-[#ecd8d4] dark:border-pink-500/30">
          Our Sanctuary & Core Mission
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl italic font-normal text-stone-900 dark:text-rose-100 tracking-tight leading-tight">
          Nurturing the beauty of <br />
          <span className="text-dustyRose">emotional healing</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          Seeking healing is an act of deep self-love. MindEase was envisioned as a tranquil sanctuary where modern clinical expertise meets heartfelt compassion, creating an environment where you can gently breathe and heal.
        </p>
      </div>

      {/* "How We Started" Sanctuary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 card-soft-rose rounded-3xl p-8 sm:p-14">
        <div className="rounded-2xl overflow-hidden border-4 border-[#faecea] dark:border-[#2a1725] shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
            alt="Mindful journaling in warm natural light"
            className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-dustyRose">
            Origins of MindEase
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 dark:text-rose-100 italic font-normal">
            A sanctuary built for peace
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
            Traditional mental healthcare often feels sterile, cold, and intimidating. We set out to redefine psychological support into something deeply comforting—like returning home after a long journey.
          </p>
          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed font-normal">
            Whether through our private consultation rooms or our encrypted tele-health platform, every detail of MindEase is curated to evoke serenity, emotional safety, and renewal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#fbf4f2] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-dustyRose font-semibold text-sm">
                <Heart className="w-4 h-4 fill-dustyRose" />
                <span>Compassionate Heart</span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                You are seen as a whole, sacred human being, never as a clinical label.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf4f2] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-dustyRose font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Sanctuary Confidentiality</span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Encrypted medical-grade confidentiality ensuring your healing remains private.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* "What Guides Us" Pillars */}
      <div className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-dustyRose">
            Our Guiding Pillars
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-stone-900 dark:text-rose-100 italic font-normal">
            Principles of Mindful Practice
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Rooted in proven clinical science and elevated by genuine empathy and mindfulness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 card-soft-rose space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#faecea] dark:bg-[#2a1725] text-dustyRose flex items-center justify-center border border-[#ecd8d4] dark:border-pink-500/30">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-stone-900 dark:text-rose-100 font-normal">
              Evidence-Based Wisdom
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              Integrating Cognitive Behavioral Therapy (CBT), Acceptance & Commitment Therapy (ACT), and somatic mindfulness tailored to your life story.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 card-soft-rose space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#faecea] dark:bg-[#2a1725] text-dustyRose flex items-center justify-center border border-[#ecd8d4] dark:border-pink-500/30">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-stone-900 dark:text-rose-100 font-normal">
              Inclusive Sanctuary
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              We warmly welcome people of all walks of life, cultural backgrounds, and orientations into a non-judgmental, uplifting environment.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 card-soft-rose space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#faecea] dark:bg-[#2a1725] text-dustyRose flex items-center justify-center border border-[#ecd8d4] dark:border-pink-500/30">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-stone-900 dark:text-rose-100 font-normal">
              Enduring Resilience
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              Beyond addressing immediate distress, we empower you with lifelong emotional habits, self-compassion rituals, and inner clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Gentle Consultation Invitation */}
      <div className="rounded-3xl bg-gradient-to-r from-[#faecea] via-[#fbf2f0] to-[#faecea] dark:from-[#200f1c] dark:via-[#2a1725] dark:to-[#200f1c] border border-[#ecd8d4] dark:border-pink-500/30 p-10 sm:p-14 text-center space-y-6">
        <span className="text-2xl">🌸</span>
        <h3 className="font-editorial text-3xl sm:text-4xl italic text-stone-900 dark:text-rose-100 font-normal">
          Begin your journey toward inner peace
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto">
          Our certified therapists are here to guide you with gentleness, warmth, and clinical expertise.
        </p>
        <div className="pt-2">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Book a Private Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default About;
