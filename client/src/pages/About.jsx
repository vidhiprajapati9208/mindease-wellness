import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Award, Users, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header matching Fig 14.2 */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Our Story at <span className="text-mindCyan">MindEase</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          We believe that seeking help is an act of courage. MindEase was founded on a simple principle: mental healthcare should be accessible, deeply compassionate, and safely confidential for everyone.
        </p>
      </div>

      {/* "How We Started" Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-mindDark-900/60 border border-mindDark-border/80 rounded-3xl p-8 sm:p-12">
        <div className="rounded-2xl overflow-hidden border border-mindDark-border shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80"
            alt="Compassionate hands connecting"
            className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How We Started</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Years ago, a group of passionate psychologists noticed a common barrier: people felt overwhelmed by the clinical, cold nature of traditional therapy. Finding the right help felt harder than it needed to be.
          </p>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            MindEase Wellness was born out of a desire to change that. We intentionally designed our clinic and our digital platforms to feel like a deep, calming breath. You don't need a medical degree to understand what you're feeling, and you shouldn't need one to get help.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-mindDark-850 border border-mindDark-border space-y-1.5">
              <div className="flex items-center gap-2 text-mindCyan font-semibold text-sm">
                <Heart className="w-4 h-4 fill-mindCyan" />
                <span>Compassionate Care</span>
              </div>
              <p className="text-xs text-slate-400">
                We treat you as a whole person, not just a set of symptoms.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-mindDark-850 border border-mindDark-border space-y-1.5">
              <div className="flex items-center gap-2 text-mindCyan font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Deep Privacy</span>
              </div>
              <p className="text-xs text-slate-400">
                Your story is fiercely protected. We guarantee zero-judgment, confidential sessions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* "What Guides Us" */}
      <div className="space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white">What Guides Us</h2>
          <p className="text-slate-400 text-sm">
            Our clinic functions on a set of core beliefs designed to give you the highest quality emotional support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl bg-mindDark-900 border border-mindDark-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-mindDark-850 text-mindCyan flex items-center justify-center border border-mindDark-border">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Evidence-Based Healing</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We use scientifically proven methods tailored to your personal life experience, including CBT and ACT.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-mindDark-900 border border-mindDark-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-mindDark-850 text-mindCyan flex items-center justify-center border border-mindDark-border">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Inclusive Community</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We welcome individuals of all backgrounds, identities, and emotional needs with open arms.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-mindDark-900 border border-mindDark-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-mindDark-850 text-mindCyan flex items-center justify-center border border-mindDark-border">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Continuous Growth</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We don't just treat crises; we empower you with long-term resilience and emotional autonomy.
            </p>
          </div>
        </div>
      </div>

      {/* Link to Meet Experts */}
      <div className="text-center pt-6">
        <Link
          to="/therapists"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mindDark-850 hover:bg-mindDark-800 text-white font-medium text-sm border border-mindDark-border transition-colors"
        >
          <span>Meet Our Licensed Therapists</span>
          <ArrowRight className="w-4 h-4 text-mindCyan" />
        </Link>
      </div>
    </div>
  );
};

export default About;
