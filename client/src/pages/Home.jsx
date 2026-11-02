import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Heart,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Star,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  MessageSquare,
  Smile,
  Zap,
  Lock,
  Phone
} from 'lucide-react';

const Home = () => {
  // 1. Interactive Breathing Exercise State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathePhase, setBreathePhase] = useState('Inhale'); // Inhale, Hold, Exhale
  const [breatheSeconds, setBreatheSeconds] = useState(4);

  useEffect(() => {
    let timer;
    if (isBreathing) {
      timer = setInterval(() => {
        setBreatheSeconds((prev) => {
          if (prev <= 1) {
            // Cycle phases: Inhale (4s) -> Hold (4s) -> Exhale (4s) -> Inhale
            setBreathePhase((currentPhase) => {
              if (currentPhase === 'Inhale') return 'Hold';
              if (currentPhase === 'Hold') return 'Exhale';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathePhase('Inhale');
      setBreatheSeconds(4);
    }
    return () => clearInterval(timer);
  }, [isBreathing]);

  // 2. Interactive Mood Finder State
  const [selectedMood, setSelectedMood] = useState('anxiety');

  const moodRecommendations = {
    anxiety: {
      title: 'Anxiety & Panic Relief Therapy',
      desc: 'Our clinical psychologists specialize in gentle grounding, Cognitive Behavioral Therapy (CBT), and nervous system regulation to help you stop racing thoughts.',
      doctor: 'Dr. Emily Chen, PhD',
      tag: 'CBT & Mindfulness Specialist',
      link: '/book?doctor=Dr.%20Emily%20Chen,%20PhD'
    },
    depression: {
      title: 'Depression & Emotional Reconnection',
      desc: 'Safe, zero-judgment therapy to help you rediscover energy, process deep sadness, and rebuild hope one step at a time.',
      doctor: 'Sarah Williams, LCSW',
      tag: 'Trauma & Depression Recovery',
      link: '/book?doctor=Sarah%20Williams,%20LCSW'
    },
    couples: {
      title: 'Couples & Relationship Dynamics',
      desc: 'Constructive mediation and attachment-focused conversations to restore trust, communication, and emotional intimacy in your partnership.',
      doctor: 'Dr. Marcus Johnson, PsyD',
      tag: 'Relationship & Family Dynamics',
      link: '/book?doctor=Dr.%20Marcus%20Johnson,%20PsyD'
    },
    burnout: {
      title: 'Executive Stress & Burnout Recovery',
      desc: 'Establish healthy psychological boundaries, resolve workplace chronic exhaustion, and protect your mental well-being.',
      doctor: 'Dr. Emily Chen, PhD',
      tag: 'Workplace Well-being',
      link: '/book?doctor=Dr.%20Emily%20Chen,%20PhD'
    },
    growth: {
      title: 'Personal Growth & Mindfulness',
      desc: 'Self-discovery, building emotional resilience, and establishing daily mindfulness rituals tailored to your unique lifestyle.',
      doctor: 'Sarah Williams, LCSW',
      tag: 'Holistic Wellness Practitioner',
      link: '/book?doctor=Sarah%20Williams,%20LCSW'
    }
  };

  // 3. Interactive FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How do I know if therapy is right for my current situation?',
      a: 'Therapy is beneficial for anyone experiencing stress, sadness, major life changes, or simply seeking personal growth. You do not need to wait for a crisis to speak with a compassionate professional.'
    },
    {
      q: 'Are online video sessions as effective as in-person clinic visits?',
      a: 'Yes! Clinical studies consistently demonstrate that telehealth video therapy produces identical clinical outcomes to in-person sessions, with the added benefit of attending from your own comfortable environment.'
    },
    {
      q: 'Is my personal health information confidential and protected?',
      a: 'Absolutely. MindEase complies strictly with HIPAA and national ethical data regulations. All session notes and communication are encrypted with bank-level security.'
    },
    {
      q: 'What should I expect during my very first consultation session?',
      a: 'Your first session is gentle and conversational. Your therapist will listen attentively to what brought you in, ask about your goals, and collaboratively design a supportive plan tailored to you.'
    },
    {
      q: 'Can I switch therapists if I do not feel a natural connection?',
      a: 'Yes, with zero friction. The therapeutic alliance is critical for healing. You can switch to any other practitioner in our directory at any time without awkwardness.'
    }
  ];

  return (
    <div className="space-y-32 pb-24 overflow-hidden">
      {/* =========================================================================
          SECTION 1: HERO SECTION WITH FLOATING TRUST BADGES & AMBIENT GLOW
         ========================================================================= */}
      <section className="relative min-h-[88vh] flex items-center justify-center pt-8">
        {/* Animated ambient rose glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-pink-600/25 via-rose-500/20 to-pink-400/10 blur-[150px] rounded-full pointer-events-none animate-breathe"></div>
        <div className="absolute top-20 left-12 w-[350px] h-[350px] bg-pink-500/15 blur-[120px] rounded-full pointer-events-none animate-float-slow"></div>
        <div className="absolute bottom-10 right-12 w-[380px] h-[380px] bg-rose-500/15 blur-[130px] rounded-full pointer-events-none animate-float-reverse"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 z-10">
          {/* Animated Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mindDark-850/90 border border-pink-500/30 text-pink-300 text-xs font-semibold tracking-wide shadow-sm shadow-pink-500/10 animate-float">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>🌸 Compassionate, Certified & Confidential Wellness</span>
          </div>

          {/* Big Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.12]">
            Transform Your Mind, <br />
            Reclaim Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-300 glow-pink-pulse">
              Inner Peace
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Take a deep breath. You've taken the first brave step towards healing. Our licensed psychologists provide gentle, evidence-based therapy in a safe, warm space.
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
              to="/therapists"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-mindDark-850 hover:bg-pink-500/10 text-slate-200 hover:text-pink-300 font-medium text-sm sm:text-base border border-pink-500/30 hover:border-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Browse Experts</span>
            </Link>
          </div>

          {/* 3 Floating Trust Cards */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-mindDark-900/80 border border-pink-500/20 backdrop-blur-md flex items-center justify-center gap-2.5 text-xs text-slate-300 card-hover-lift shadow-sm">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span><strong>4.9/5 Rating</strong> (2,400+ Sessions)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-mindDark-900/80 border border-pink-500/20 backdrop-blur-md flex items-center justify-center gap-2.5 text-xs text-slate-300 card-hover-lift shadow-sm">
              <Lock className="w-4 h-4 text-pink-400" />
              <span><strong>100% Confidential</strong> • HIPAA Certified</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-mindDark-900/80 border border-pink-500/20 backdrop-blur-md flex items-center justify-center gap-2.5 text-xs text-slate-300 card-hover-lift shadow-sm">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span><strong>Zero Waitlist</strong> • Same-Week Slots</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE MINDFULNESS BREATHING ORB (HIGHLY ENGAGING)
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-b from-mindDark-900 via-mindDark-850 to-mindDark-900 border border-pink-500/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Mindful Reset Exercise
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Take a 60-Second Mindful Breath
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mt-2">
            Ground your nervous system right now with Box Breathing. Inhale calmly, hold gently, and release tension.
          </p>

          {/* Circular Breathing Visualizer */}
          <div className="py-8 flex flex-col items-center justify-center">
            <div
              className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 relative shadow-2xl ${
                isBreathing
                  ? breathePhase === 'Inhale'
                    ? 'scale-110 border-pink-400 bg-pink-500/20 shadow-pink-500/40'
                    : breathePhase === 'Hold'
                    ? 'scale-110 border-rose-400 bg-rose-500/25 shadow-rose-500/50'
                    : 'scale-90 border-pink-500/60 bg-pink-500/10 shadow-pink-500/20'
                  : 'scale-100 border-pink-500/30 bg-mindDark-950/60 shadow-pink-500/10'
              }`}
            >
              <Heart className={`w-8 h-8 text-pink-400 ${isBreathing ? 'animate-pulse fill-pink-400/40' : ''}`} />
              <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {isBreathing ? breathePhase : 'Ready?'}
              </span>
              <span className="text-xs text-pink-300 font-semibold tracking-widest mt-1">
                {isBreathing ? `${breatheSeconds}s` : 'Box Breathing'}
              </span>

              {/* Pulsing Outer Ring */}
              {isBreathing && (
                <div className="absolute -inset-3 rounded-full border-2 border-pink-400/40 animate-ping pointer-events-none" style={{ animationDuration: '4s' }}></div>
              )}
            </div>

            {/* Controls */}
            <div className="pt-6 flex items-center gap-3">
              <button
                onClick={() => setIsBreathing(!isBreathing)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                {isBreathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isBreathing ? 'Pause Exercise' : 'Start Breathing Exercise'}</span>
              </button>
              {isBreathing && (
                <button
                  onClick={() => {
                    setIsBreathing(false);
                    setBreathePhase('Inhale');
                    setBreatheSeconds(4);
                  }}
                  className="p-2.5 rounded-full bg-mindDark-800 hover:bg-mindDark-700 text-slate-300 hover:text-white border border-mindDark-border transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: LIVE CLINIC IMPACT COUNTER BANNER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-mindDark-900/90 border border-pink-500/20 p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
              15,000+
            </span>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Patients Supported</p>
          </div>
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
              98.6%
            </span>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Positive Recovery</p>
          </div>
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
              25+
            </span>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Certified Therapists</p>
          </div>
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
              24/7
            </span>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Crisis AI Assistant</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE "HOW ARE YOU FEELING TODAY?" MOOD FINDER
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-wider">
            Personalized Guidance
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How Are You Feeling Today?
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Select what you are experiencing right now, and let us recommend the best clinical match.
          </p>
        </div>

        {/* Mood Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {[
            { id: 'anxiety', emoji: '😰', label: 'Overwhelmed & Anxious' },
            { id: 'depression', emoji: '🌧️', label: 'Down & Low Energy' },
            { id: 'couples', emoji: '💔', label: 'Relationship Strain' },
            { id: 'burnout', emoji: '⚡', label: 'Work Stress & Burnout' },
            { id: 'growth', emoji: '🌸', label: 'Seeking Personal Peace' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedMood === m.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-105'
                  : 'bg-mindDark-900 text-slate-300 hover:text-white hover:bg-mindDark-850 border border-mindDark-border'
              }`}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Active Recommendation Card */}
        {moodRecommendations[selectedMood] && (
          <div className="bg-mindDark-900 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center animate-in fade-in duration-300">
            <div className="md:col-span-2 space-y-3">
              <span className="text-xs font-semibold text-pink-400 tracking-wider uppercase">
                Recommended Care Path:
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {moodRecommendations[selectedMood].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {moodRecommendations[selectedMood].desc}
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs text-pink-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Specialist: <strong>{moodRecommendations[selectedMood].doctor}</strong> ({moodRecommendations[selectedMood].tag})</span>
              </div>
            </div>

            <div className="text-center md:text-right">
              <Link
                to={moodRecommendations[selectedMood].link}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Book This Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 5: 6 COMPREHENSIVE CLINICAL THERAPY OFFERINGS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-1">
            Clinical Disciplines
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How We Can Support You
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We provide a comprehensive range of evidence-based psychological services designed to support every chapter of life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Anxiety */}
          <div className="bg-mindDark-900 border border-pink-500/20 rounded-2xl p-7 hover:border-pink-500/60 card-hover-lift group flex flex-col justify-between shadow-lg shadow-pink-500/5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:bg-pink-500/25 transition-all duration-300">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Anxiety & Panic Therapy
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Quiet racing thoughts, conquer social panic, and retrain your nervous system with Cognitive Behavioral Therapy (CBT).
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Explore Therapy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Depression */}
          <div className="bg-mindDark-900 border border-pink-500/20 rounded-2xl p-7 hover:border-pink-500/60 card-hover-lift group flex flex-col justify-between shadow-lg shadow-pink-500/5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/25 transition-all duration-300">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Depression & Mood Care
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Rediscover motivation and emotional warmth through safe, guided self-discovery and compassionate clinical support.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Explore Therapy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Card 3: Stress Management */}
          <div className="bg-mindDark-900 border border-pink-500/20 rounded-2xl p-7 hover:border-pink-500/60 card-hover-lift group flex flex-col justify-between shadow-lg shadow-pink-500/5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-300 group-hover:scale-110 group-hover:bg-pink-500/25 transition-all duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Burnout & Stress Relief
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Establish healthy personal boundaries, overcome work exhaustion, and restore harmony in your daily routine.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Explore Therapy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Card 4: Couples & Relationships */}
          <div className="bg-mindDark-900 border border-pink-500/20 rounded-2xl p-7 hover:border-pink-500/60 card-hover-lift group flex flex-col justify-between shadow-lg shadow-pink-500/5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:bg-pink-500/25 transition-all duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Couples & Relationships
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Rebuild deep mutual trust, resolve persistent recurring conflicts, and rediscover emotional intimacy.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Explore Therapy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Card 5: Grief & Transitions */}
          <div className="bg-mindDark-900 border border-pink-500/20 rounded-2xl p-7 hover:border-pink-500/60 card-hover-lift group flex flex-col justify-between shadow-lg shadow-pink-500/5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/25 transition-all duration-300">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Grief & Life Transitions
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Navigate unexpected changes, loss of loved ones, career transitions, and identity shifts in a safe harbor.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Explore Therapy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Card 6: Somatic & Mindfulness */}
          <div className="bg-mindDark-900 border border-pink-500/20 rounded-2xl p-7 hover:border-pink-500/60 card-hover-lift group flex flex-col justify-between shadow-lg shadow-pink-500/5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-300 group-hover:scale-110 group-hover:bg-pink-500/25 transition-all duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Somatic Mindfulness
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect mind and body with somatic regulation exercises, guided breathwork, and sensory awareness practices.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 uppercase tracking-wider mt-6 pt-4 border-t border-mindDark-border/60"
            >
              <span>Explore Therapy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: HOW MINDEASE WORKS (VISUAL 4-STEP TIMELINE)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-wider">
            Simple & Transparent
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How MindEase Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Starting therapy should never feel complicated. Here is how easy it is to begin:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Discover Your Doctor',
              desc: 'Browse certified clinical bios, areas of expertise, and verified client ratings.'
            },
            {
              num: '02',
              title: 'Choose Session Mode',
              desc: 'Select confidential Online Telehealth Video or comfortable In-Person clinic care.'
            },
            {
              num: '03',
              title: 'Book in 60 Seconds',
              desc: 'Pick your preferred date and convenient time slot without any tedious paperwork.'
            },
            {
              num: '04',
              title: 'Begin Healing',
              desc: 'Receive immediate email confirmations, digital reminders, and continuous support.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-mindDark-900 border border-pink-500/20 card-hover-lift space-y-3 relative overflow-hidden shadow-lg shadow-pink-500/5"
            >
              <span className="text-4xl font-black text-pink-500/20 absolute top-3 right-4 select-none">
                {item.num}
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-pink-500/30">
                {idx + 1}
              </div>
              <h4 className="text-base font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FEATURED THERAPISTS SPOTLIGHT PREVIEW
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-wider">
              Licensed Clinical Faculty
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Meet Top Practitioners
            </h2>
            <p className="text-slate-400 text-sm">
              Compassionate doctors with verified clinical credentials ready to support you.
            </p>
          </div>
          <Link
            to="/therapists"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pink-400 hover:text-pink-300"
          >
            <span>View All Specialists</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Emily Chen, PhD',
              role: 'Clinical Psychologist',
              spec: 'Anxiety & Burnout Specialist',
              exp: '12+ Years Exp',
              img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
            },
            {
              name: 'Dr. Marcus Johnson, PsyD',
              role: 'Licensed Therapist',
              spec: 'Couples & Family Dynamics',
              exp: '10+ Years Exp',
              img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
            },
            {
              name: 'Sarah Williams, LCSW',
              role: 'Clinical Social Worker',
              spec: 'Trauma & Depression Recovery',
              exp: '8+ Years Exp',
              img: 'https://images.unsplash.com/photo-1594824813580-c11f7c5e532a?auto=format&fit=crop&w=600&q=80'
            }
          ].map((doc, i) => (
            <div
              key={i}
              className="bg-mindDark-900 border border-pink-500/20 rounded-2xl overflow-hidden card-hover-lift shadow-lg shadow-pink-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="h-56 overflow-hidden relative">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-pink-950/80 backdrop-blur-md text-[11px] font-semibold text-pink-200 border border-pink-500/30 flex items-center gap-1 shadow-sm">
                    <Award className="w-3.5 h-3.5 text-pink-400" />
                    <span>{doc.exp}</span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-white">{doc.name}</h3>
                  <p className="text-xs font-semibold text-pink-400">{doc.spec}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  to={`/book?doctor=${encodeURIComponent(doc.name)}`}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-pink-500/15 to-rose-500/15 hover:from-pink-500 hover:to-rose-500 text-pink-300 hover:text-white text-xs font-semibold border border-pink-500/30 hover:border-pink-500 transition-all shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {doc.name.split(' ')[1]}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: REAL PATIENT REVIEWS & STORIES
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-1">
            Real Transformations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Stories from Our Community
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Read what patients have to say about their healing milestones with MindEase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Sarah M.',
              since: 'Patient since 2024',
              quote: 'MindEase provided me with the tools I needed to overcome severe daily anxiety. Dr. Chen is extraordinarily compassionate and insightful.',
              initial: 'S'
            },
            {
              name: 'James D.',
              since: 'Patient since 2025',
              quote: 'I was skeptical about online therapy at first, but the seamless booking and the empathy of my counselor completely changed my view on mental health.',
              initial: 'J'
            },
            {
              name: 'Priya K.',
              since: 'Patient since 2026',
              quote: 'The CBT exercises and breathing tools gave me my confidence back after months of burnout. I finally look forward to my mornings again.',
              initial: 'P'
            }
          ].map((t, i) => (
            <div
              key={i}
              className="bg-mindDark-900/90 border border-pink-500/20 rounded-2xl p-6 sm:p-7 relative space-y-4 flex flex-col justify-between card-hover-lift shadow-lg shadow-pink-500/5"
            >
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-mindDark-border/60">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white font-bold flex items-center justify-center shadow-md shadow-pink-500/30">
                  {t.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.since}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: INTERACTIVE FAQ ACCORDION
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-wider">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about starting your mental wellness journey.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-mindDark-900 border border-pink-500/20 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-pink-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-pink-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-pink-500/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: CRISIS HOTLINE & BOTTOM CTA BANNER
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-pink-950/50 via-mindDark-850 to-pink-950/50 border border-pink-500/30 p-10 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-pink-500/20 blur-[70px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-rose-500/20 blur-[70px] rounded-full pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold">
            <Phone className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>24/7 National Crisis Hotline: 988</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Take Your First Gentle Step?
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Schedule a confidential consultation in under 2 minutes. Compassionate, human, and tailored to your pace.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/35 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Schedule a Session Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-mindDark-850 hover:bg-pink-500/10 text-slate-200 hover:text-pink-300 font-semibold text-sm border border-pink-500/30 transition-all duration-300"
            >
              <span>Speak with Clinic Staff</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
