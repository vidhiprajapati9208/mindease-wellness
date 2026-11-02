import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Star,
  Award,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Phone,
  Check
} from 'lucide-react';

const Home = () => {
  // 1. Interactive Box Breathing State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathePhase, setBreathePhase] = useState('Inhale');
  const [breatheSeconds, setBreatheSeconds] = useState(4);

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

  // 2. Interactive Soundscape (Pure Web Audio)
  const [activeSound, setActiveSound] = useState(null);
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
      setTimeout(() => setActiveSound(null), 4600);
    } else if (type === 'rain') {
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
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, ctx.currentTime);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      soundNodesRef.current.push(noise);
      setActiveSound('rain');
    }
  };

  useEffect(() => {
    return () => stopAllSounds();
  }, []);

  // 3. Interactive FAQ Accordion State
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
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      
      {/* =========================================================================
          SECTION 1: TOP ETHEREAL HERO BANNER ("MindEase Sanctuary")
          Matching the "Blooming Rose" header aesthetic
         ========================================================================= */}
      <section className="relative min-h-[75vh] sm:min-h-[82vh] flex items-center justify-center overflow-hidden">
        {/* Background Ethereal Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1800&q=80"
            alt="MindEase Sanctuary Ethereal Petals"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          />
          {/* Gentle Blush Rose Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2b1822]/40 via-[#d9778a]/30 to-[#fdf9f7]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 pt-8 pb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.28em] text-rose-100 uppercase drop-shadow-sm">
            THE POWER IS IN HEALING
          </p>

          <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-normal text-white tracking-wide drop-shadow-md">
            MindEase
          </h1>

          <p className="font-editorial italic text-lg sm:text-2xl text-rose-50 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            A nurturing sanctuary for emotional transformation, inner remembrance, and gentle peace, guided by compassionate clinical wisdom.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-lg shadow-dustyRose/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Book a Consultation
            </Link>
            <Link
              to="/therapists"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/80 hover:bg-white text-stone-900 text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Meet Our Guides
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FLOATING EDITORIAL COLLAGE ("Reconnect with the beauty of living..")
          Directly mirroring the user's inspiration screenshot!
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Floating Images (Dual Stacked Mental Health Photos) */}
          <div className="lg:col-span-3 hidden lg:flex flex-col gap-6">
            <div className="w-48 h-60 rounded-3xl overflow-hidden collage-image border-4 border-white ml-auto">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80"
                alt="Mindfulness meditation in morning light"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-56 h-64 rounded-3xl overflow-hidden collage-image border-4 border-white mr-auto -mt-6">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                alt="Therapeutic journaling & calm reflection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center Main Editorial Text Block */}
          <div className="lg:col-span-6 text-center space-y-6 px-2 sm:px-6">
            {/* Delicate Botanical Floral Icon */}
            <div className="flex justify-center text-dustyRose">
              <span className="text-3xl">🌸</span>
            </div>

            {/* Main Serif Headline */}
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal italic tracking-tight leading-[1.15]">
              Reconnect with the <br />
              beauty of living..
            </h2>

            {/* Blush Rose Uppercase Subtitle */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-dustyRose uppercase">
              Find your soul's purpose & unlock a life of calm & freedom
            </p>

            {/* Warm Descriptive Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 font-normal leading-relaxed max-w-xl mx-auto">
              <p>
                Here, you are invited to pause, breathe, and remember who you truly are beneath life's layers of stress, hurry, and expectation.
              </p>
              <p>
                Whether you're beginning a new chapter, healing old wounds, or seeking deeper alignment, this is a sanctuary for exploring the inner wisdom of your mind and reconnecting with the joy and purpose that has always been yours.
              </p>
            </div>

            {/* Dusty Rose Pill Button */}
            <div className="pt-2">
              <Link
                to="/services"
                className="inline-block px-8 py-3.5 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                How We Can Help
              </Link>
            </div>
          </div>

          {/* Right Floating Image (Tall Mental Health Calm Photo) */}
          <div className="lg:col-span-3 hidden lg:flex justify-start">
            <div className="w-60 h-84 rounded-3xl overflow-hidden collage-image border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80"
                alt="Woman breathing peacefully in calm sanctuary"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INFINITE FLOWING MARQUEE RIBBON
          Directly mirroring the ribbon in the user's screenshot!
         ========================================================================= */}
      <section className="py-4 border-y border-[#ecd8d4] bg-[#fbf3f1] overflow-hidden">
        <div className="animate-marquee font-editorial italic text-sm sm:text-base text-[#9d5b67] tracking-[0.25em] uppercase">
          <span className="mx-6">Heal</span>
          <span className="mx-3">•</span>
          <span className="mx-6">Believe</span>
          <span className="mx-3">•</span>
          <span className="mx-6">Discover the beauty and power within</span>
          <span className="mx-3">•</span>
          <span className="mx-6">Breathe</span>
          <span className="mx-3">•</span>
          <span className="mx-6">Restore</span>
          <span className="mx-3">•</span>
          <span className="mx-6">Reclaim Your Peace</span>
          <span className="mx-3">•</span>
          <span className="mx-6">Heal</span>
          <span className="mx-3">•</span>
          <span className="mx-6">Believe</span>
          <span className="mx-3">•</span>
          <span className="mx-6">Discover the beauty and power within</span>
          <span className="mx-3">•</span>
          <span className="mx-6">Breathe</span>
          <span className="mx-3">•</span>
          <span className="mx-6">Restore</span>
          <span className="mx-3">•</span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE MINDFULNESS & TIBETAN CHIME SANCTUARY
          Interactive Grounding Tool
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-white border border-[#f0dbd7] p-8 sm:p-12 text-center card-soft-rose space-y-6">
          <span className="text-xs font-semibold tracking-widest text-dustyRose uppercase">
            Interactive Sanctuary Ritual
          </span>

          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal italic">
            Take a 60-Second Guided Breath
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Allow yourself this brief pause. Watch the sacred circle expand and contract to restore autonomic nervous system calm.
          </p>

          {/* Circular Breathing Visualizer */}
          <div className="py-4 flex flex-col items-center justify-center">
            <div
              className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-1000 shadow-xl ${
                isBreathing
                  ? breathePhase === 'Inhale'
                    ? 'scale-110 border-dustyRose bg-[#faecea]'
                    : breathePhase === 'Hold'
                    ? 'scale-110 border-[#c45b70] bg-[#f7e0dc]'
                    : 'scale-90 border-[#e8a3af] bg-[#fdf9f7]'
                  : 'scale-100 border-[#eed4cf] bg-[#fdf8f6]'
              }`}
            >
              <Heart className={`w-6 h-6 text-dustyRose ${isBreathing ? 'animate-pulse fill-dustyRose/40' : ''}`} />
              <span className="font-editorial text-3xl font-normal italic text-stone-900 mt-1">
                {isBreathing ? breathePhase : 'Pause'}
              </span>
              <span className="text-xs text-dustyRose font-semibold tracking-widest mt-1">
                {isBreathing ? `${breatheSeconds}s` : 'Tap to Begin'}
              </span>
            </div>

            {/* Breathing Button & Audio Controls */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsBreathing(!isBreathing)}
                className="px-6 py-2.5 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-wider shadow-md shadow-dustyRose/20 hover:scale-105 active:scale-95 transition-all"
              >
                {isBreathing ? 'Pause Breathing' : 'Start Mindful Breath'}
              </button>

              <button
                onClick={() => playAmbient('bowl')}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  activeSound === 'bowl'
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-[#faecea] text-stone-800 hover:bg-[#f6deda] border border-[#f0dbd7]'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-dustyRose" />
                <span>🔔 432Hz Tibetan Chime</span>
              </button>

              <button
                onClick={() => playAmbient('rain')}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  activeSound === 'rain'
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-[#faecea] text-stone-800 hover:bg-[#f6deda] border border-[#f0dbd7]'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-dustyRose" />
                <span>🌧️ Soothing Rain</span>
              </button>

              {activeSound && (
                <button
                  onClick={stopAllSounds}
                  className="px-3.5 py-2.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold transition-colors"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WELCOME TO THE PATH OF HEALING (3-Column Editorial Offerings)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest text-dustyRose uppercase">
            Holistic Offerings
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-stone-900 font-normal italic">
            Welcome to the Path of Healing
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Evidence-based therapeutic modalities blended with deep human compassion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Anxiety */}
          <div className="bg-white rounded-3xl overflow-hidden card-soft-rose border border-[#f0dbd7] card-hover-lift flex flex-col justify-between">
            <div>
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80"
                  alt="Anxiety grounding therapy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-7 space-y-3 text-center">
                <h3 className="font-editorial text-2xl text-stone-900 font-normal italic">
                  Anxiety & Emotional Grounding
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Quiet chronic overthinking, soothe panic triggers, and retrain your nervous system using Cognitive Behavioral Therapy (CBT) and somatic breathwork.
                </p>
              </div>
            </div>
            <div className="p-7 pt-0 text-center">
              <Link
                to="/services"
                className="inline-block px-6 py-2.5 rounded-full border border-dustyRose text-dustyRose hover:bg-dustyRose hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Card 2: Depression */}
          <div className="bg-white rounded-3xl overflow-hidden card-soft-rose border border-[#f0dbd7] card-hover-lift flex flex-col justify-between">
            <div>
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=700&q=80"
                  alt="Depression recovery and compassionate listening"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-7 space-y-3 text-center">
                <h3 className="font-editorial text-2xl text-stone-900 font-normal italic">
                  Depression & Hope Reconnection
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Gentle, zero-judgment spaces to process sorrow, dissolve isolation, and safely awaken your vital inner energy and purpose.
                </p>
              </div>
            </div>
            <div className="p-7 pt-0 text-center">
              <Link
                to="/services"
                className="inline-block px-6 py-2.5 rounded-full border border-dustyRose text-dustyRose hover:bg-dustyRose hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Card 3: Couples & Relationships */}
          <div className="bg-white rounded-3xl overflow-hidden card-soft-rose border border-[#f0dbd7] card-hover-lift flex flex-col justify-between">
            <div>
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=700&q=80"
                  alt="Couples and relationship therapy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-7 space-y-3 text-center">
                <h3 className="font-editorial text-2xl text-stone-900 font-normal italic">
                  Couples & Relational Healing
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Heal attachment strains, resolve unspoken resentment, and foster deeper mutual understanding in your partnership.
                </p>
              </div>
            </div>
            <div className="p-7 pt-0 text-center">
              <Link
                to="/services"
                className="inline-block px-6 py-2.5 rounded-full border border-dustyRose text-dustyRose hover:bg-dustyRose hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CERTIFIED CLINICAL FACULTY (Meet Your Guides)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#eedcd8] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold tracking-widest text-dustyRose uppercase">
              Certified Faculty
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal italic">
              Meet Your Healing Guides
            </h2>
          </div>
          <Link
            to="/therapists"
            className="text-xs font-semibold tracking-widest text-dustyRose hover:text-dustyRose-hover uppercase flex items-center gap-1"
          >
            <span>View All Doctors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Dr. Emily Chen, PhD',
              role: 'Clinical Psychologist',
              spec: 'Anxiety, Panic & Burnout Specialist',
              exp: '12+ Years Exp',
              img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
            },
            {
              name: 'Dr. Marcus Johnson, PsyD',
              role: 'Licensed Marriage & Family Counselor',
              spec: 'Couples & Relational Dynamics',
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
          ].map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden card-soft-rose border border-[#f0dbd7] p-6 text-center space-y-4 card-hover-lift"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-[#faecea] shadow-md">
                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-normal italic text-stone-900">{doc.name}</h3>
                <p className="text-xs text-dustyRose font-semibold tracking-wide uppercase mt-0.5">{doc.role}</p>
                <p className="text-xs text-stone-500 mt-1">{doc.spec} • {doc.exp}</p>
              </div>
              <div className="pt-2">
                <Link
                  to={`/book?doctor=${encodeURIComponent(doc.name)}`}
                  className="inline-block w-full py-2.5 rounded-full bg-[#fbf2f0] hover:bg-dustyRose hover:text-white text-stone-800 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Book with {doc.name.split(' ')[1]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CLIENT REFLECTIONS & TESTIMONIALS
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-12">
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-widest text-dustyRose uppercase">
            Client Reflections
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-stone-900 font-normal italic">
            Voices of Awakening & Peace
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            {
              quote: "MindEase gave me my breath back when the world felt too heavy. Dr. Chen is an extraordinary beacon of kindness.",
              author: "Sarah M.",
              role: "MindEase Patient"
            },
            {
              quote: "Our marriage felt disconnected for years. Two months into couples counseling, we found each other again.",
              author: "James & Lisa D.",
              role: "Couples Therapy"
            },
            {
              quote: "The grounding exercises and somatic sessions completely transformed how I handle daily corporate burnout.",
              author: "Priya K.",
              role: "Executive Wellness"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-[#f0dbd7] card-soft-rose space-y-4 flex flex-col justify-between"
            >
              <div className="text-amber-400 flex justify-center text-xs">
                ★★★★★
              </div>
              <p className="font-editorial italic text-base sm:text-lg text-stone-800 leading-relaxed">
                "{item.quote}"
              </p>
              <div className="pt-2 border-t border-[#f6e7e4]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">{item.author}</h4>
                <p className="text-[11px] text-dustyRose">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: INTERACTIVE ACCORDION FAQ
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold tracking-widest text-dustyRose uppercase">
            Clarity & Guidance
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal italic">
            Common Inquiries
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#f0dbd7] overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-editorial italic text-base sm:text-lg text-stone-900 hover:text-dustyRose transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-dustyRose shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#faecea] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CLOSING INVITATION & CRISIS 988 RIBBON
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="rounded-3xl bg-gradient-to-b from-[#fbf2f0] to-[#faecea] border border-[#eed4cf] p-10 sm:p-14 space-y-6 card-soft-rose">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-stone-800 text-xs font-semibold shadow-sm">
            <Phone className="w-3.5 h-3.5 text-dustyRose animate-pulse" />
            <span>24/7 National Emergency Hotline: 988 (Always Confidential)</span>
          </div>

          <h3 className="font-editorial text-4xl sm:text-6xl text-stone-900 font-normal italic">
            Begin Your Gentle Awakening
          </h3>

          <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Take that quiet, brave step today. Schedule a private consultation with our licensed psychologists and allow healing to bloom.
          </p>

          <div className="pt-2">
            <Link
              to="/book"
              className="inline-block px-10 py-4 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-lg shadow-dustyRose/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
