import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, Heart, Sparkles, Brain } from 'lucide-react';

const Services = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'What actually happens in a first session?',
      a: 'Your first session is entirely conversational and zero-pressure. We get to know your background, understand what prompted you to reach out, discuss your comfort boundaries, and collaboratively define your personal goals for wellness.'
    },
    {
      q: 'How long does therapy usually take?',
      a: 'Therapy duration is personalized. Some patients experience significant relief within 6 to 10 structured sessions focused on specific coping mechanisms, while others engage in long-term therapy for deeper self-discovery and continued personal growth.'
    },
    {
      q: 'Is everything I say completely confidential?',
      a: 'Yes, absolutely. All sessions adhere strictly to HIPAA and national ethical confidentiality guidelines. Your discussions remain strictly between you and your licensed therapist, with standard legal exceptions only for immediate imminent danger.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header matching Fig 14.3 */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Care <span className="text-mindCyan">Tailored</span> To You
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Healing isn't one-size-fits-all. Explore our specialized areas of support, designed with human empathy and professional integrity to help you wherever you currently are.
        </p>
      </div>

      {/* Service 1: Anxiety Therapy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-mindDark-900/50 border border-mindDark-border/80 rounded-3xl p-8 sm:p-12">
        <div className="rounded-2xl overflow-hidden border border-mindDark-border shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
            alt="Anxiety therapy journaling"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-mindCyan font-semibold text-sm">
            <Brain className="w-5 h-5" />
            <span>Targeted Care</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Anxiety Therapy</h2>
          <p className="text-mindCyan text-sm font-medium">
            Stop letting worry control your life and find grounding techniques.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Anxiety can feel like a heavy weight pressing on your chest or a racing mind that won't let you sleep. Our anxiety therapy uses gentle, progressive methods like Cognitive Behavioral Therapy (CBT) to help you understand your emotional triggers and learn practical daily tools.
          </p>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-mindCyan shrink-0" />
              <span>Identify panic triggers and mental cognitive distortions</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-mindCyan shrink-0" />
              <span>Learn grounding and vagal nerve calming techniques</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-mindCyan shrink-0" />
              <span>Rebuild calm sleep routines and daily emotional margin</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-mindCyan hover:bg-mindCyan-hover text-white text-sm font-semibold transition-all shadow-md shadow-mindCyan/20"
            >
              <span>Talk to a Therapist About This</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Service 2: Stress & Burnout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-mindDark-900/50 border border-mindDark-border/80 rounded-3xl p-8 sm:p-12">
        <div className="space-y-5 order-2 lg:order-1">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Sparkles className="w-5 h-5" />
            <span>Restoration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Stress & Burnout</h2>
          <p className="text-amber-300 text-sm font-medium">
            Recover from severe exhaustion, find your balance, and reclaim your joy.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            In today's fast-paced world, emotional exhaustion is incredibly common. If you feel constantly drained, detached, or unmotivated, you might be experiencing burnout. We offer a safe space to unpack the overwhelming pressure you carry and build sustainable life balance.
          </p>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Boundary setting strategies in workplace and family</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Energy restoration and habit rebuilding exercises</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Navigating professional pressure without self-sacrifice</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-mindCyan hover:bg-mindCyan-hover text-white text-sm font-semibold transition-all shadow-md shadow-mindCyan/20"
            >
              <span>Talk to a Therapist About This</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-mindDark-border shadow-xl order-1 lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80"
            alt="Calming serene room"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Service 3: Depression Counseling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-mindDark-900/50 border border-mindDark-border/80 rounded-3xl p-8 sm:p-12">
        <div className="rounded-2xl overflow-hidden border border-mindDark-border shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
            alt="Woman meditating peacefully"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
            <Heart className="w-5 h-5 fill-rose-400" />
            <span>Hope & Renewal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Depression Counseling</h2>
          <p className="text-rose-300 text-sm font-medium">
            A supportive hand to guide you out of the fog and emotional numbness.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Depression often whispers that things will never get better, but that is simply not true. We provide a deeply empathetic, pressure-free environment for you to express your pain. By taking small, manageable steps together, we will slowly help you rediscover a sense of hope, purpose, and self-worth.
          </p>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Breaking the cycle of isolation and self-criticism</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Self-compassion and gentle emotional processing</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Developing simple daily rhythms for mental well-being</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-mindCyan hover:bg-mindCyan-hover text-white text-sm font-semibold transition-all shadow-md shadow-mindCyan/20"
            >
              <span>Talk to a Therapist About This</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (Matching Fig 14.3 bottom) */}
      <div className="max-w-4xl mx-auto space-y-6 pt-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">
            It's normal to have questions before starting therapy. We are an open book.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-mindDark-900 border border-mindDark-border rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-mindDark-850/60 transition-colors"
              >
                <span className="text-base font-semibold text-white">{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-mindCyan shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-mindDark-border/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
