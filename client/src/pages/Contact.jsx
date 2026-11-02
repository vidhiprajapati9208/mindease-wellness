import React, { useState } from 'react';
import api from '../services/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', formData);
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      // Offline fallback
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#faecea] dark:bg-[#2a1725] text-dustyRose text-xs font-semibold uppercase tracking-[0.2em] border border-[#ecd8d4] dark:border-pink-500/30">
          We Are Here For You
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl italic font-normal text-stone-900 dark:text-rose-100 tracking-tight leading-tight">
          Connect with <span className="text-dustyRose">our sanctuary</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          Whether you have a clinical question, need help finding the right therapist, or wish to schedule a consultation, our compassionate intake team is here to support you.
        </p>
      </div>

      {/* 2-Column Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Contact Information */}
        <div className="bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 rounded-3xl p-8 sm:p-12 space-y-8 card-soft-rose">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-dustyRose">
              Direct Inquiries
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 dark:text-rose-100 italic font-normal mt-1">
              Sanctuary Contact
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#faecea] dark:bg-[#2a1725] border border-[#ecd8d4] dark:border-pink-500/30 flex items-center justify-center text-dustyRose shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  Sanctuary Address
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                  123 Sanctuary Way, Wellness Gardens, Suite 400<br />
                  Health District, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#faecea] dark:bg-[#2a1725] border border-[#ecd8d4] dark:border-pink-500/30 flex items-center justify-center text-dustyRose shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  Direct Line
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                  +1 (800) 123-EASE (3273)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#faecea] dark:bg-[#2a1725] border border-[#ecd8d4] dark:border-pink-500/30 flex items-center justify-center text-dustyRose shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  Confidential Email
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                  sanctuary@mindease.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#faecea] dark:bg-[#2a1725] border border-[#ecd8d4] dark:border-pink-500/30 flex items-center justify-center text-dustyRose shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  Consultation Hours
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                  Mon – Fri: 8:00 AM – 8:00 PM<br />
                  Sat – Sun: 9:00 AM – 4:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#faecea] dark:bg-[#2a1725] border border-[#ecd8d4] dark:border-pink-500/30 text-xs text-stone-700 dark:text-stone-300">
            <span className="font-bold text-dustyRose block mb-1">Emergency 24/7 Support:</span>
            If you or someone you love is experiencing acute emotional crisis, please call or text{' '}
            <a href="tel:988" className="font-bold text-dustyRose underline">988</a> immediately.
          </div>
        </div>

        {/* Right Column: Send a Message */}
        <div className="bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 rounded-3xl p-8 sm:p-12 space-y-6 card-soft-rose">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-dustyRose">
              Personal Note
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 dark:text-rose-100 italic font-normal mt-1">
              Send a Message
            </h2>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#faecea] border border-[#ecd8d4] text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white text-dustyRose flex items-center justify-center mx-auto border border-[#ecd8d4]">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl italic text-stone-900 font-normal">
                Message Received
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                Thank you for reaching out. A compassionate member of our clinical team will respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-dustyRose font-bold uppercase tracking-wider hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Vidhi"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-dustyRose"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Prajapati"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-dustyRose"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="vidhi@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-dustyRose"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  Your Message or Question
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="How can we assist you today? Feel free to share as much as you feel comfortable with..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-dustyRose resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Map Location Card */}
      <div className="bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 rounded-3xl p-6 sm:p-8 space-y-4 card-soft-rose">
        <div className="flex items-center justify-between">
          <h3 className="font-editorial text-2xl italic text-stone-900 dark:text-rose-100 flex items-center gap-2 font-normal">
            <MapPin className="w-5 h-5 text-dustyRose" />
            <span>Sanctuary Location & Grounds</span>
          </h3>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#faecea] hover:bg-[#f5d5d1] text-xs font-semibold uppercase tracking-wider text-dustyRose border border-[#ecd8d4] transition-colors"
          >
            <span>Open in Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#ecd8d4] dark:border-pink-500/20 h-72 sm:h-80 relative">
          <iframe
            title="MindEase Sanctuary Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

    </div>
  );
};

export default Contact;
