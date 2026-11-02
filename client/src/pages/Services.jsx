import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Brain, Heart, Sparkles } from 'lucide-react';

const Services = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'What actually happens in a first session?',
      a: 'Your first session is completely gentle and pressure-free. We listen to what brought you here, explore your comfort zones, and collaboratively tailor a healing journey that honors your unique rhythm.'
    },
    {
      q: 'How long does a typical course of therapy take?',
      a: 'Every mind is unique. Many clients experience grounded clarity within 6 to 10 structured sessions focused on somatic tools and CBT, while others embrace ongoing therapy as part of continuous self-growth.'
    },
    {
      q: 'Is my personal story and information protected?',
      a: 'Absolutely. We uphold the highest medical-grade HIPAA confidentiality standards. Everything shared in our sanctuary remains strictly between you and your certified therapist.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#faecea] dark:bg-[#2a1725] text-dustyRose text-xs font-semibold uppercase tracking-[0.2em] border border-[#ecd8d4] dark:border-pink-500/30">
          Curated Offerings & Sanctuary Care
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl italic font-normal text-stone-900 dark:text-rose-100 tracking-tight leading-tight">
          Nurturing care, <br />
          <span className="text-dustyRose">tailored to your journey</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          Healing is never one-size-fits-all. Explore our specialized therapeutic modalities designed to meet you with compassion, dignity, and scientific efficacy.
        </p>
      </div>

      {/* Service 1: Anxiety & Nervous System Calm */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 card-soft-rose rounded-3xl p-8 sm:p-14">
        <div className="rounded-2xl overflow-hidden border-4 border-[#faecea] dark:border-[#2a1725] shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
            alt="Anxiety therapy and gentle journaling"
            className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-dustyRose font-semibold text-xs uppercase tracking-widest">
            <Brain className="w-4 h-4" />
            <span>Somatic & Cognitive Grounding</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 dark:text-rose-100 italic font-normal">
            Anxiety & Panic Relief
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
            When your nervous system feels constantly hyper-vigilant, it drains your joy. Our anxiety therapy blends Cognitive Behavioral Therapy (CBT) with somatic breathwork to quiet the inner storm and restore calm.
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-dustyRose shrink-0" />
              <span>Identify anxious loop patterns and cognitive catastrophizing</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-dustyRose shrink-0" />
              <span>Practice vagal nerve stimulation & box breathing rituals</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-dustyRose shrink-0" />
              <span>Restore restful sleep cycles and emotional resilience</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Schedule for Anxiety</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Service 2: Stress, Burnout & Vitality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 card-soft-rose rounded-3xl p-8 sm:p-14">
        <div className="space-y-6 order-2 lg:order-1">
          <div className="flex items-center gap-2 text-dustyRose font-semibold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Vitality & Balance</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 dark:text-rose-100 italic font-normal">
            Stress & Burnout Recovery
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
            If life has felt like a ceaseless uphill climb, you deserve space to lay your burdens down. We help professionals and caregivers recover from deep depletion and re-align with their values.
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-dustyRose shrink-0" />
              <span>Boundaries without guilt in career and relationships</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-dustyRose shrink-0" />
              <span>Somatic recovery rituals for physical exhaustion</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-dustyRose shrink-0" />
              <span>Reclaiming play, artistic joy, and mindful rest</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Schedule for Burnout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border-4 border-[#faecea] dark:border-[#2a1725] shadow-lg order-1 lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
            alt="Quiet meditation and burnout recovery"
            className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Service 3: Depression & Hope Renewal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 card-soft-rose rounded-3xl p-8 sm:p-14">
        <div className="rounded-2xl overflow-hidden border-4 border-[#faecea] dark:border-[#2a1725] shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
            alt="Woman experiencing gentle renewal"
            className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-dustyRose font-semibold text-xs uppercase tracking-widest">
            <Heart className="w-4 h-4 fill-dustyRose" />
            <span>Hope & Self-Compassion</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 dark:text-rose-100 italic font-normal">
            Depression Counseling
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
            Depression often convinces us that things will never lighten. With compassionate step-by-step guidance, we help you dismantle feelings of isolation and reconnect with the quiet beauty of being alive.
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-dustyRose shrink-0" />
              <span>Gently dissolving internalized guilt and emotional numbness</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-dustyRose shrink-0" />
              <span>Small, sacred daily rhythms of nourishment</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-dustyRose shrink-0" />
              <span>Rediscovering inner worth and personal connection</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Schedule for Renewal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Accordion FAQ Section */}
      <div className="max-w-4xl mx-auto space-y-8 pt-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-dustyRose">
            Sanctuary Clarifications
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-stone-900 dark:text-rose-100 italic font-normal">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm">
            Everything you need to know about embarking on your therapy journey.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 rounded-2xl overflow-hidden card-soft-rose transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#faecea]/40 dark:hover:bg-pink-500/10 transition-colors cursor-pointer"
              >
                <span className="font-editorial text-lg sm:text-xl text-stone-900 dark:text-rose-100 font-medium">
                  {faq.q}
                </span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-dustyRose shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-[#ecd8d4]/60 dark:border-pink-500/10">
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
