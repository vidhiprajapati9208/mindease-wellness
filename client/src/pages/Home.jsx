import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, ArrowRight, ShieldCheck, Sparkles, User, Calendar, Smile } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section matching Fig 14.1 */}
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden pt-8">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-cyan-600/15 to-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mindDark-850/90 border border-mindDark-border/80 text-mindCyan-light text-xs font-semibold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-mindCyan" />
            <span>Professional Online & In-Person Therapy</span>
          </div>

          {/* Big Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            You Are <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mindCyan to-blue-400">
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
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-mindCyan hover:bg-mindCyan-hover text-white font-semibold text-sm sm:text-base shadow-lg shadow-mindCyan/30 hover:shadow-mindCyan/50 hover:-translate-y-0.5 transition-all"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 rounded-full bg-mindDark-850 hover:bg-mindDark-800 text-slate-200 font-medium text-sm sm:text-base border border-mindDark-border/80 transition-colors"
            >
              Get Support Now
            </Link>
          </div>

          {/* Subtle breathe tagline */}
          <div className="pt-6 flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <span className="w-12 h-px bg-slate-700"></span>
            <span>Breathe In, Breathe Out</span>
            <span className="w-12 h-px bg-slate-700"></span>
          </div>
        </div>
      </section>

      {/* "How We Can Help" Section matching Fig 14.1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How We Can Help
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We offer a deeply empathetic range of therapeutic services to support you through all of life's unpredictable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Anxiety */}
          <div className="bg-mindDark-900 border border-mindDark-border/80 rounded-2xl p-7 hover:border-mindCyan/50 hover:shadow-xl hover:shadow-mindCyan/10 transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-mindDark-800 border border-mindDark-border flex items-center justify-center text-mindCyan group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-mindCyan transition-colors">
                Anxiety Therapy
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Overcome chronic worry and panic attacks with cognitive behavioral techniques and calming mindfulness tools.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-mindCyan hover:text-mindCyan-light uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Depression */}
          <div className="bg-mindDark-900 border border-mindDark-border/80 rounded-2xl p-7 hover:border-mindCyan/50 hover:shadow-xl hover:shadow-mindCyan/10 transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-mindDark-800 border border-mindDark-border flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-mindCyan transition-colors">
                Depression Counseling
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Find hope and renewed energy through guided self-discovery, emotional support, and evidence-based healing.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-mindCyan hover:text-mindCyan-light uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 3: Stress Management */}
          <div className="bg-mindDark-900 border border-mindDark-border/80 rounded-2xl p-7 hover:border-mindCyan/50 hover:shadow-xl hover:shadow-mindCyan/10 transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-mindDark-800 border border-mindDark-border flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-mindCyan transition-colors">
                Stress & Burnout
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Rebuild resilience, establish healthy boundaries, and restore harmony between your career and personal well-being.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-mindCyan hover:text-mindCyan-light uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* "Patient Stories" Section matching Fig 14.1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Patient Stories
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Read what others have to say about their journey to wellness with MindEase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-mindDark-900/90 border border-mindDark-border rounded-2xl p-8 relative space-y-6 flex flex-col justify-between">
            <p className="text-base sm:text-lg text-slate-300 italic leading-relaxed">
              "MindEase provided me with the tools I needed to overcome my severe anxiety. The therapists are <strong className="text-white font-semibold not-italic">incredibly compassionate and understanding.</strong>"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-mindDark-border/60">
              <div className="w-10 h-10 rounded-full bg-mindDark-800 text-mindCyan font-bold flex items-center justify-center border border-mindDark-border">
                S
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Sarah M.</h4>
                <p className="text-xs text-slate-400">Patient since 2022</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-mindDark-900/90 border border-mindDark-border rounded-2xl p-8 relative space-y-6 flex flex-col justify-between">
            <p className="text-base sm:text-lg text-slate-300 italic leading-relaxed">
              "I was skeptical about online therapy at first, but the seamless process and the warmth of my <strong className="text-white font-semibold not-italic">counselor completely changed my perspective.</strong>"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-mindDark-border/60">
              <div className="w-10 h-10 rounded-full bg-mindDark-800 text-mindCyan font-bold flex items-center justify-center border border-mindDark-border">
                J
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">James D.</h4>
                <p className="text-xs text-slate-400">Patient since 2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-mindDark-900 via-mindDark-850 to-mindDark-900 border border-mindDark-border p-10 sm:p-14 text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Begin Your Healing Journey?
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Book an initial consultation in less than 2 minutes. Confidential, gentle, and scheduled at your own convenience.
          </p>
          <div className="pt-2">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-mindCyan hover:bg-mindCyan-hover text-white font-semibold text-sm shadow-lg shadow-mindCyan/25 transition-all"
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
