import React, { useState, useEffect, useRef } from 'react';
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
  Volume2,
  VolumeX,
  Smile,
  Zap,
  Lock,
  Phone,
  Compass,
  MessageSquare,
  Flame,
  Check,
  RefreshCw
} from 'lucide-react';

const affirmationsList = [
  {
    quote: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
    theme: "Peace of Mind"
  },
  {
    quote: "Healing is not linear. Be gentle with where you are today.",
    author: "MindEase Clinical Faculty",
    theme: "Self-Compassion"
  },
  {
    quote: "Your feelings are valid. You are allowed to take up space and take your time.",
    author: "Dr. Emily Chen, PhD",
    theme: "Emotional Validation"
  },
  {
    quote: "Breathe. You have survived 100% of your hardest days so far.",
    author: "Therapeutic Grounding Principle",
    theme: "Inner Strength"
  },
  {
    quote: "Peace begins the moment you choose not to allow another person or event to control your emotions.",
    author: "Pema Chödrön",
    theme: "Emotional Freedom"
  }
];

const Home = () => {
  // -------------------------------------------------------------
  // 1. HERO SANCTUARY WIDGET STATE (Tabs: Breathe, Affirmation, Doctor)
  // -------------------------------------------------------------
  const [heroTab, setHeroTab] = useState('breathe'); // 'breathe' | 'affirmation' | 'specialist'
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathePhase, setBreathePhase] = useState('Inhale');
  const [breatheSeconds, setBreatheSeconds] = useState(4);

  // Affirmation state
  const [affirmationIdx, setAffirmationIdx] = useState(0);

  const nextAffirmation = () => {
    setAffirmationIdx((prev) => (prev + 1) % affirmationsList.length);
  };

  useEffect(() => {
    let timer;
    if (isBreathing) {
      timer = setInterval(() => {
        setBreatheSeconds((prev) => {
          if (prev <= 1) {
            setBreathePhase((current) => {
              if (current === 'Inhale') return 'Hold';
              if (current === 'Hold') return 'Exhale';
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

  // -------------------------------------------------------------
  // 2. INTERACTIVE AMBIENT SOUND GENERATOR (Web Audio API)
  // -------------------------------------------------------------
  const [activeSound, setActiveSound] = useState(null); // 'bowl' | 'rain' | 'ocean' | null
  const audioCtxRef = useRef(null);
  const soundNodesRef = useRef([]);

  const stopAllSounds = () => {
    soundNodesRef.current.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    soundNodesRef.current = [];
    setActiveSound(null);
  };

  const playAmbient = (type) => {
    stopAllSounds();

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextClass();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (type === 'bowl') {
      // 432 Hz Tibetan Harmonic Resonance Chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 4.6);
      soundNodesRef.current.push(osc);
      setActiveSound('bowl');

      // Auto stop after chime fades
      setTimeout(() => setActiveSound(null), 4600);
    } else if (type === 'rain' || type === 'ocean') {
      // Synthesize soothing ambient pink noise
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.06;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.setValueAtTime(type === 'rain' ? 800 : 350, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      soundNodesRef.current.push(noise);
      setActiveSound(type);
    }
  };

  useEffect(() => {
    return () => stopAllSounds();
  }, []);

  // -------------------------------------------------------------
  // 3. INTERACTIVE MOOD SELECTOR STATE
  // -------------------------------------------------------------
  const [selectedMood, setSelectedMood] = useState('anxiety');

  const moodRecommendations = {
    anxiety: {
      title: 'Anxiety & Panic Relief Protocol',
      desc: 'Our specialized CBT clinicians guide you through nervous system de-escalation, rapid grounding tools, and personalized cognitive reframing.',
      doctor: 'Dr. Emily Chen, PhD',
      role: 'Clinical Psychologist',
      rating: '4.98 / 5 (380+ reviews)',
      link: '/book?doctor=Dr.%20Emily%20Chen,%20PhD'
    },
    depression: {
      title: 'Depression & Emotional Reconnection',
      desc: 'Gentle, zero-pressure therapeutic dialogue designed to restore emotional vitality, dissolve feelings of isolation, and reignite inner hope.',
      doctor: 'Sarah Williams, LCSW',
      role: 'Clinical Social Worker',
      rating: '4.95 / 5 (290+ reviews)',
      link: '/book?doctor=Sarah%20Williams,%20LCSW'
    },
    couples: {
      title: 'Couples & Relational Dynamics',
      desc: 'Constructive mediation that heals unresolved resentment, strengthens attachment security, and rebuilds deep intimacy in your relationship.',
      doctor: 'Dr. Marcus Johnson, PsyD',
      role: 'Licensed Family Therapist',
      rating: '4.92 / 5 (410+ reviews)',
      link: '/book?doctor=Dr.%20Marcus%20Johnson,%20PsyD'
    },
    burnout: {
      title: 'Executive Burnout & Boundary Restoration',
      desc: 'Resolve chronic workplace fatigue, protect mental bandwidth, and build enduring resilience for high-performance careers.',
      doctor: 'Dr. Emily Chen, PhD',
      role: 'Burnout & Anxiety Specialist',
      rating: '4.98 / 5 (380+ reviews)',
      link: '/book?doctor=Dr.%20Emily%20Chen,%20PhD'
    },
    growth: {
      title: 'Mindfulness & Personal Transformation',
      desc: 'Explore your authentic identity, develop emotional intelligence, and cultivate sustained daily calm through somatic mindfulness practices.',
      doctor: 'Sarah Williams, LCSW',
      role: 'Holistic Wellness Practitioner',
      rating: '4.95 / 5 (290+ reviews)',
      link: '/book?doctor=Sarah%20Williams,%20LCSW'
    }
  };

  // -------------------------------------------------------------
  // 4. INTERACTIVE FAQ ACCORDION STATE
  // -------------------------------------------------------------
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does online therapy on MindEase work?',
      a: 'After selecting your preferred clinical specialist, you choose an online video slot. You receive an encrypted HIPAA-compliant meeting link with zero software installation required. Simply open it on your phone or computer.'
    },
    {
      q: 'Can I visit in person at your physical wellness center?',
      a: 'Yes! When booking, simply select "In-Person Session". Our tranquil clinic is located at 123 Wellness Avenue, featuring private soundproof consultation suites, calming tea lounges, and private check-ins.'
    },
    {
      q: 'How are MindEase therapists vetted and certified?',
      a: 'Every practitioner on MindEase holds state licensure (PhD, PsyD, LCSW, LMFT), verified background credentials, and a minimum of 7+ years of active clinical practice.'
    },
    {
      q: 'What if I need immediate crisis support right now?',
      a: 'If you or someone you know is in immediate danger, please dial the 24/7 National Crisis Hotline at 988 or text HOME to 741741. Our interactive AI Assistant is also available 24/7 for grounding exercises.'
    },
    {
      q: 'Is my consultation completely confidential?',
      a: 'Yes, 100%. All personal information, booking details, and consultation records are protected by strict medical-grade 256-bit SSL encryption and strict HIPAA compliance protocols.'
    }
  ];

  return (
    <div className="space-y-32 pb-28 overflow-hidden">
      {/* =========================================================================
          SECTION 1: ASYMMETRICAL LUXURY 2-COLUMN HERO WITH SANCTUARY INTERACTIVE WIDGET
         ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-6 lg:pt-12">
        {/* Ambient Rose-Pink Glows */}
        <div className="absolute top-10 left-1/4 w-[650px] h-[450px] bg-gradient-to-tr from-pink-600/20 via-rose-500/15 to-transparent blur-[140px] rounded-full pointer-events-none animate-breathe"></div>
        <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-rose-500/10 blur-[130px] rounded-full pointer-events-none animate-float-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Modern Asymmetric Typography & Trust Actions */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Live Status Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold shadow-sm animate-float">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Sanctuary Live • Licensed Therapists Available Today</span>
              </div>

              {/* Grand Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12]">
                Your sanctuary for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-300 glow-pink-pulse">
                  calm, clarity
                </span>{' '}
                & gentle healing.
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Mental healthcare designed with human warmth. Connect with licensed clinical psychologists for confidential online video or in-person sessions with zero waitlists.
              </p>

              {/* Primary Dual CTA Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/book"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-500/35 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Begin Your Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/therapists"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-mindDark-900/90 hover:bg-pink-500/10 text-slate-200 hover:text-pink-300 font-semibold text-sm sm:text-base border border-pink-500/30 hover:border-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span>Meet Our Specialists</span>
                </Link>
              </div>

              {/* Trust Badge Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 border-t border-pink-500/15">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80" alt="Doctor" className="w-8 h-8 rounded-full border-2 border-mindDark-950 object-cover" />
                  <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80" alt="Doctor" className="w-8 h-8 rounded-full border-2 border-mindDark-950 object-cover" />
                  <img src="https://images.unsplash.com/photo-1594824813580-c11f7c5e532a?auto=format&fit=crop&w=100&q=80" alt="Doctor" className="w-8 h-8 rounded-full border-2 border-mindDark-950 object-cover" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                  <span><strong>4.98 Rating</strong> • 15,000+ Lives Touched</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: The Interactive "Mind Sanctuary" Dashboard Tablet */}
            <div className="lg:col-span-5">
              <div className="bento-card p-6 sm:p-8 shadow-2xl relative border-pink-500/30">
                {/* Mode Tabs */}
                <div className="flex items-center justify-between border-b border-pink-500/20 pb-4 mb-6">
                  <div className="flex gap-2 text-xs font-bold">
                    <button
                      onClick={() => setHeroTab('breathe')}
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        heroTab === 'breathe'
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🌬️ Breathe Orb
                    </button>
                    <button
                      onClick={() => setHeroTab('affirmation')}
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        heroTab === 'affirmation'
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🌸 Affirmation
                    </button>
                    <button
                      onClick={() => setHeroTab('specialist')}
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        heroTab === 'specialist'
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      👩‍⚕️ Live Faculty
                    </button>
                  </div>
                </div>

                {/* TAB CONTENT A: Interactive Breathe Orb */}
                {heroTab === 'breathe' && (
                  <div className="text-center py-4 space-y-6 animate-in fade-in duration-300">
                    <div className="relative flex justify-center items-center">
                      <div
                        className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 shadow-2xl ${
                          isBreathing
                            ? breathePhase === 'Inhale'
                              ? 'scale-110 border-pink-400 bg-pink-500/20 shadow-pink-500/50'
                              : breathePhase === 'Hold'
                              ? 'scale-110 border-rose-400 bg-rose-500/30 shadow-rose-500/60'
                              : 'scale-90 border-pink-500/50 bg-pink-500/10 shadow-pink-500/20'
                            : 'scale-100 border-pink-500/30 bg-mindDark-950/60'
                        }`}
                      >
                        <Heart className={`w-7 h-7 text-pink-400 ${isBreathing ? 'animate-pulse fill-pink-400/40' : ''}`} />
                        <span className="text-2xl font-black text-white mt-1">
                          {isBreathing ? breathePhase : 'Relax'}
                        </span>
                        <span className="text-xs text-pink-300 font-bold tracking-widest mt-0.5">
                          {isBreathing ? `${breatheSeconds}s` : 'Tap to Start'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 max-w-xs mx-auto">
                      {isBreathing
                        ? 'Follow the circle. Breathe in calm, release all tension.'
                        : 'Practice the 4-4-4 Box Breathing cycle to reset your autonomic nervous system.'}
                    </p>

                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setIsBreathing(!isBreathing)}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
                      >
                        {isBreathing ? 'Pause Breathing' : 'Start Zen Breath'}
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT B: Interactive Affirmation Oracle */}
                {heroTab === 'affirmation' && (
                  <div className="py-6 space-y-6 text-center animate-in fade-in duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-pink-500/15 text-pink-400 text-[11px] font-bold uppercase tracking-wider">
                      {affirmationsList[affirmationIdx].theme}
                    </span>
                    <blockquote className="text-lg sm:text-xl font-medium text-white italic leading-relaxed px-2">
                      "{affirmationsList[affirmationIdx].quote}"
                    </blockquote>
                    <p className="text-xs font-semibold text-pink-300">
                      — {affirmationsList[affirmationIdx].author}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={nextAffirmation}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mindDark-850 hover:bg-pink-500/20 text-slate-200 hover:text-pink-300 text-xs font-semibold border border-pink-500/30 transition-all hover:scale-105 active:scale-95"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Draw Next Affirmation</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT C: Live Specialists Fast-Book */}
                {heroTab === 'specialist' && (
                  <div className="space-y-3.5 py-2 animate-in fade-in duration-300">
                    {[
                      {
                        name: 'Dr. Emily Chen, PhD',
                        spec: 'Anxiety & Burnout Specialist',
                        status: 'Available Today',
                        time: '11:30 AM Slot'
                      },
                      {
                        name: 'Dr. Marcus Johnson, PsyD',
                        spec: 'Couples & Family Dynamics',
                        status: 'Next Slot: 02:00 PM',
                        time: 'Video Available'
                      },
                      {
                        name: 'Sarah Williams, LCSW',
                        spec: 'Trauma & Depression Care',
                        status: 'Available Today',
                        time: '04:00 PM Slot'
                      }
                    ].map((doc, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-mindDark-950/70 border border-pink-500/20 flex items-center justify-between gap-3 hover:border-pink-500/50 transition-colors"
                      >
                        <div className="text-left">
                          <h4 className="text-xs sm:text-sm font-bold text-white">{doc.name}</h4>
                          <p className="text-[11px] text-pink-400 font-medium">{doc.spec}</p>
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            {doc.status}
                          </span>
                        </div>
                        <Link
                          to={`/book?doctor=${encodeURIComponent(doc.name)}`}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-[11px] font-bold shadow-sm whitespace-nowrap hover:scale-105 transition-transform"
                        >
                          Book Now
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE CALMING SOUNDSCAPE OASIS (Pure Web Audio Synthesis)
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-pink-950/30 via-mindDark-900 to-pink-950/30 border border-pink-500/25 p-8 sm:p-10 text-center shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-wider">
              🎧 Interactive Audio Oasis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Soothe Your Senses with Calming Frequencies
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
              Click any soundscape to experience immediate acoustic grounding synthesized in real time.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => playAmbient('bowl')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeSound === 'bowl'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/40 scale-105'
                  : 'bg-mindDark-850 text-slate-200 hover:text-white hover:bg-mindDark-800 border border-pink-500/20'
              }`}
            >
              <Volume2 className="w-4 h-4 text-pink-400" />
              <span>🔔 432Hz Tibetan Singing Bowl</span>
            </button>

            <button
              onClick={() => playAmbient('rain')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeSound === 'rain'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/40 scale-105'
                  : 'bg-mindDark-850 text-slate-200 hover:text-white hover:bg-mindDark-800 border border-pink-500/20'
              }`}
            >
              <Volume2 className="w-4 h-4 text-pink-400" />
              <span>🌧️ Gentle Rain Shower</span>
            </button>

            <button
              onClick={() => playAmbient('ocean')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeSound === 'ocean'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/40 scale-105'
                  : 'bg-mindDark-850 text-slate-200 hover:text-white hover:bg-mindDark-800 border border-pink-500/20'
              }`}
            >
              <Volume2 className="w-4 h-4 text-pink-400" />
              <span>🌊 Ambient Ocean Tide</span>
            </button>

            {activeSound && (
              <button
                onClick={stopAllSounds}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-bold border border-rose-800 transition-colors"
              >
                <VolumeX className="w-4 h-4" />
                <span>Stop Sound</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: LUXURY BENTO GRID ("EXPLORE THE ECOSYSTEM")
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-wider">
            Reimagined Care Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Peace of Mind
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every feature on MindEase is engineered to remove anxiety from seeking professional help.
          </p>
        </div>

        {/* 4-Piece Modern Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento 1: Large Span (Col 8) */}
          <div className="md:col-span-8 bento-card p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-pink-500/15 text-pink-400 text-xs font-bold uppercase tracking-wider">
                Personalized Care
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Individual, Couples & Adolescent Therapy
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Whether you prefer the privacy of encrypted online telehealth from home or the serene ambiance of our boutique clinic, our therapists customize each session around your emotional comfort.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-lg bg-pink-500/10 text-pink-300 text-xs font-semibold border border-pink-500/20">
                  ✓ Cognitive Behavioral Therapy (CBT)
                </span>
                <span className="px-3 py-1 rounded-lg bg-pink-500/10 text-pink-300 text-xs font-semibold border border-pink-500/20">
                  ✓ Somatic Nervous System Reset
                </span>
                <span className="px-3 py-1 rounded-lg bg-pink-500/10 text-pink-300 text-xs font-semibold border border-pink-500/20">
                  ✓ Trauma-Informed Counseling
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-pink-500/15 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Session Duration: 50 Minutes</span>
              <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300">
                <span>View Full Clinical Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento 2: Tall Highlight (Col 4) */}
          <div className="md:col-span-4 bento-card p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-mindDark-900 to-pink-950/20">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                24/7 Compassionate AI Companion
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Need immediate grounding late at night? Our interactive assistant provides instant de-escalation tools, breathing rhythms, and crisis hotline guidance whenever you need an ear.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-mindDark-950/80 border border-pink-500/20 text-xs text-slate-300 space-y-1.5">
              <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider block">Quick Trigger:</span>
              <p className="italic">"I'm feeling an anxiety attack right now, please help me calm down."</p>
            </div>
          </div>

          {/* Bento 3: Square (Col 4) */}
          <div className="md:col-span-4 bento-card p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                100% Confidential & Secure
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Bank-level 256-bit encryption. Strict HIPAA compliance guarantees that your records and personal stories remain strictly between you and your doctor.
              </p>
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Zero third-party insurance data leakage</span>
            </div>
          </div>

          {/* Bento 4: Wide Span (Col 8) */}
          <div className="md:col-span-8 bento-card p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-pink-500/15 text-pink-400 text-xs font-bold uppercase tracking-wider">
                Instant Scheduling
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                3-Step Frictionless Booking Wizard
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                No endless phone calls, no insurance paperwork nightmares. Pick your doctor, pick your time slot, and your session is locked into the clinic calendar in under 60 seconds.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-mindDark-950/70 border border-pink-500/20">
                <span className="block font-bold text-pink-400">Step 1</span>
                <span className="text-[11px] text-slate-400">Basic Details</span>
              </div>
              <div className="p-3 rounded-xl bg-mindDark-950/70 border border-pink-500/20">
                <span className="block font-bold text-pink-400">Step 2</span>
                <span className="text-[11px] text-slate-400">Doctor & Slot</span>
              </div>
              <div className="p-3 rounded-xl bg-mindDark-950/70 border border-pink-500/20">
                <span className="block font-bold text-pink-400">Step 3</span>
                <span className="text-[11px] text-slate-400">Instant Confirm</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE "HOW ARE YOU FEELING TODAY?" CARE PATH FINDER
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-wider">
            Interactive Care Matching
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Are You Feeling Right Now?
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Select your current emotional state to instantly unlock tailored clinical guidance.
          </p>
        </div>

        {/* Mood Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {[
            { id: 'anxiety', emoji: '😰', label: 'Overwhelmed & Racing Thoughts' },
            { id: 'depression', emoji: '🌧️', label: 'Numb, Sad & Low Energy' },
            { id: 'couples', emoji: '💔', label: 'Relationship Disconnection' },
            { id: 'burnout', emoji: '⚡', label: 'Chronic Workplace Burnout' },
            { id: 'growth', emoji: '🌸', label: 'Searching for Inner Calm' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                selectedMood === m.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/35 scale-105'
                  : 'bg-mindDark-900 text-slate-300 hover:text-white hover:bg-mindDark-850 border border-pink-500/20'
              }`}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Card */}
        {moodRecommendations[selectedMood] && (
          <div className="bento-card p-6 sm:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center animate-in fade-in duration-300">
            <div className="md:col-span-2 space-y-3">
              <span className="text-xs font-bold text-pink-400 tracking-wider uppercase">
                Recommended Healing Pathway:
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {moodRecommendations[selectedMood].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {moodRecommendations[selectedMood].desc}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-pink-300">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <Award className="w-4 h-4 text-pink-400" />
                  {moodRecommendations[selectedMood].doctor}
                </span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span>{moodRecommendations[selectedMood].role}</span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="text-amber-400 font-semibold">{moodRecommendations[selectedMood].rating}</span>
              </div>
            </div>

            <div className="text-center md:text-right">
              <Link
                to={moodRecommendations[selectedMood].link}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Book With This Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 5: THE MINDEASE DIFFERENCE (COMPARISON TABLE)
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-wider">
            Why Patients Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Traditional Clinic vs MindEase Sanctuary
          </h2>
        </div>

        <div className="bento-card overflow-hidden shadow-2xl">
          <div className="grid grid-cols-2 text-center text-xs sm:text-sm font-bold border-b border-pink-500/20">
            <div className="p-4 bg-slate-900/60 text-slate-400">Traditional Clinical System</div>
            <div className="p-4 bg-pink-500/15 text-pink-300 border-l border-pink-500/20">MindEase Digital Sanctuary 🌸</div>
          </div>

          <div className="divide-y divide-pink-500/15 text-xs sm:text-sm">
            {[
              { trad: '3 to 6-month bureaucratic waitlists', ease: 'Instant booking with same-week appointments' },
              { trad: 'Cold, intimidating hospital waiting rooms', ease: 'Comfort of home video or tranquil boutique suites' },
              { trad: 'Zero support between weekly sessions', ease: '24/7 AI mental wellness companion & breathing tools' },
              { trad: 'Hidden fees & complex insurance bills', ease: '100% transparent pricing with zero surprise charges' },
              { trad: 'Tedious paper intake forms on arrival', ease: '60-second digital intake on your phone or laptop' }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 p-4 text-center items-center">
                <div className="text-slate-400 px-2 line-through opacity-75">{row.trad}</div>
                <div className="text-white font-semibold px-2 border-l border-pink-500/15 text-pink-200">
                  ✓ {row.ease}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CURATED SPECIALIST FACULTY SPOTLIGHT
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-wider">
              Licensed Clinical Faculty
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Meet Top Certified Doctors
            </h2>
            <p className="text-slate-400 text-sm">
              Compassionate experts holding 8 to 15+ years of active clinical practice.
            </p>
          </div>
          <Link
            to="/therapists"
            className="inline-flex items-center gap-2 text-sm font-bold text-pink-400 hover:text-pink-300"
          >
            <span>View Full Roster</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Emily Chen, PhD',
              role: 'Clinical Psychologist',
              spec: 'Anxiety, Panic & Burnout Specialist',
              exp: '12+ Years Exp',
              img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
              quote: 'My clinical mission is helping individuals unhook from chronic panic and reconnect with their authentic calm.'
            },
            {
              name: 'Dr. Marcus Johnson, PsyD',
              role: 'Licensed Marriage & Family Counselor',
              spec: 'Couples & Family Dynamics',
              exp: '10+ Years Exp',
              img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
              quote: 'I provide a neutral, deeply safe harbor for couples to work through unspoken resentment and rediscover intimacy.'
            },
            {
              name: 'Sarah Williams, LCSW',
              role: 'Clinical Social Worker',
              spec: 'Trauma & Depression Recovery',
              exp: '8+ Years Exp',
              img: 'https://images.unsplash.com/photo-1594824813580-c11f7c5e532a?auto=format&fit=crop&w=600&q=80',
              quote: 'Healing is gentle work. We move entirely at your pace, giving your nervous system time to safely unwind.'
            }
          ].map((doc, i) => (
            <div
              key={i}
              className="bento-card overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="h-60 overflow-hidden relative">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-pink-950/80 backdrop-blur-md text-[11px] font-bold text-pink-200 border border-pink-500/30 flex items-center gap-1 shadow-sm">
                    <Award className="w-3.5 h-3.5 text-pink-400" />
                    <span>{doc.exp}</span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{doc.name}</h3>
                    <p className="text-xs font-semibold text-pink-400 mt-0.5">{doc.role}</p>
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-pink-500/10 text-[11px] text-pink-300 font-medium">
                    {doc.spec}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "{doc.quote}"
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to={`/book?doctor=${encodeURIComponent(doc.name)}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/15 to-rose-500/15 hover:from-pink-500 hover:to-rose-500 text-pink-300 hover:text-white text-xs font-bold border border-pink-500/30 hover:border-pink-500 transition-all shadow-sm hover:scale-[1.02] active:scale-98"
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
          SECTION 7: AUTHENTIC PATIENT STORIES & REVIEWS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-wider">
            Patient Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real Stories, Genuine Healing
          </h2>
          <p className="text-slate-400 text-sm">
            Read how everyday individuals reclaimed their joy through MindEase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Sarah M.',
              since: 'Patient since 2024',
              quote: 'MindEase provided me with the tools I needed to overcome severe daily anxiety. Dr. Chen is extraordinarily compassionate, insightful, and always present.',
              initial: 'S'
            },
            {
              name: 'James D.',
              since: 'Patient since 2025',
              quote: 'I was skeptical about online therapy at first, but the seamless booking and the empathy of my counselor completely changed my view on mental wellness.',
              initial: 'J'
            },
            {
              name: 'Priya K.',
              since: 'Patient since 2026',
              quote: 'The CBT exercises and breathing tools gave me my confidence back after months of burnout. I finally look forward to waking up in the morning.',
              initial: 'P'
            }
          ].map((t, i) => (
            <div
              key={i}
              className="bento-card p-7 space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-pink-500/15">
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
          SECTION 8: INTERACTIVE FAQ ACCORDION (SMOOTH DROPDOWNS)
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-wider">
            Clarity & Guidance
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about embarking on therapy with us.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bento-card overflow-hidden shadow-sm"
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
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-pink-500/15 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CRISIS HOTLINE & FINAL GRAND CONSULTATION CTA
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-pink-950/60 via-mindDark-900 to-pink-950/60 border border-pink-500/35 p-10 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-pink-500/20 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-rose-500/20 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold">
            <Phone className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>24/7 National Emergency Hotline: 988 (Always Free & Confidential)</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Your peaceful tomorrow begins today.
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Take that gentle first step. Connect with our licensed psychologists and begin reclaiming your inner calm.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-mindDark-850 hover:bg-pink-500/10 text-slate-200 hover:text-pink-300 font-semibold text-sm sm:text-base border border-pink-500/30 transition-all duration-300"
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
