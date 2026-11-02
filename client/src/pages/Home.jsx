import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, ArrowRight, ShieldCheck, Sparkles, User, Calendar, Smile } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[84vh] flex items-center justify-center pt-8">
        {/* Animated Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-pink-600/25 via-rose-500/20 to-pink-400/10 blur-[140px] rounded-full pointer-events-none animate-breathe"></div>
        <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-rose-500/10 blur-[110px] rounded-full pointer-events-none animate-float-reverse"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 z-10">
          {/* Animated Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mindDark-850/90 border border-pink-500/30 text-pink-300 text-xs font-semibold tracking-wide shadow-sm shadow-pink-500/10 animate-float">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>🌸 Professional Online & In-Person Therapy</span>
          </div>

          {/* Big Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            You Are <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-300 glow-pink-pulse">
              Not Alone
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Take a deep breath. You've taken the first step towards a healthier mind and a happier life. Our compassionate experts are right here beside you.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/book"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-pink-500/35 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 rounded-full bg-mindDark-850 hover:bg-pink-500/10 text-slate-200 hover:text-pink-300 font-medium text-sm sm:text-base border border-pink-500/30 hover:border-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Get Support Now
            </Link>
          </div>

          {/* Subtle breathe tagline */}
          <div className="pt-6 flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-widest text-pink-400/80 animate-breathe">
            <span className="w-12 h-px bg-pink-500/40"></span>
            <span>Breathe In, Breathe Out</span>
            <span className="w-12 h-px bg-pink-500/40"></span>
          </div>
        </div>
      </section>

      {/* "How We Can Help" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Compassionate Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How We Can Help
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We offer a deeply empathetic range of therapeutic services to support you through all of life's unpredictable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Anxiety */}
          <div className="bg-mindDark-900 border border-mindDark-border/80 rounded-2xl p-7 hover:border-pink-500/60 card-hover-lift group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-mindDark-800 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:bg-pink-500/10 transition-all duration-300 shadow-sm">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Anxiety Therapy
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Overcome chronic worry and panic attacks with cognitive behavioral techniques and calming mindfulness tools.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Depression */}
          <div className="bg-mindDark-900 border border-mindDark-border/80 rounded-2xl p-7 hover:border-pink-500/60 card-hover-lift group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-mindDark-800 border border-pink-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/10 transition-all duration-300 shadow-sm">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Depression Counseling
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Find hope and renewed energy through guided self-discovery, emotional support, and evidence-based healing.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Card 3: Stress Management */}
          <div className="bg-mindDark-900 border border-mindDark-border/80 rounded-2xl p-7 hover:border-pink-500/60 card-hover-lift group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-mindDark-800 border border-pink-500/20 flex items-center justify-center text-pink-300 group-hover:scale-110 group-hover:bg-pink-500/10 transition-all duration-300 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Stress & Burnout
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Rebuild resilience, establish healthy boundaries, and restore harmony between your career and personal well-being.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* "Patient Stories" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Real Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Patient Stories
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Read what others have to say about their journey to wellness with MindEase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-mindDark-900/90 border border-mindDark-border rounded-2xl p-8 relative space-y-6 flex flex-col justify-between card-hover-lift hover:border-pink-500/50">
            <p className="text-base sm:text-lg text-slate-300 italic leading-relaxed">
              "MindEase provided me with the tools I needed to overcome my severe anxiety. The therapists are <strong className="text-pink-300 font-semibold not-italic">incredibly compassionate and understanding.</strong>"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-mindDark-border/60">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white font-bold flex items-center justify-center shadow-md shadow-pink-500/30">
                S
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Sarah M.</h4>
                <p className="text-xs text-slate-400">Patient since 2024</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-mindDark-900/90 border border-mindDark-border rounded-2xl p-8 relative space-y-6 flex flex-col justify-between card-hover-lift hover:border-pink-500/50">
            <p className="text-base sm:text-lg text-slate-300 italic leading-relaxed">
              "I was skeptical about online therapy at first, but the seamless process and the warmth of my <strong className="text-pink-300 font-semibold not-italic">counselor completely changed my perspective.</strong>"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-mindDark-border/60">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 text-white font-bold flex items-center justify-center shadow-md shadow-pink-500/30">
                J
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">James D.</h4>
                <p className="text-xs text-slate-400">Patient since 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-pink-950/40 via-mindDark-850 to-pink-950/40 border border-pink-500/30 p-10 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink-500/20 blur-[60px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-rose-500/20 blur-[60px] rounded-full pointer-events-none"></div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Begin Your Healing Journey?
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            Book an initial consultation in less than 2 minutes. Confidential, gentle, and scheduled at your own convenience.
          </p>
          <div className="pt-2">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/35 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Schedule a Session Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
