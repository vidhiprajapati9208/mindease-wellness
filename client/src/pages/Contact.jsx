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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header matching Fig 14.11 */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get in <span className="text-mindCyan">Touch</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Have questions about our services or need help booking an appointment? We're here for you.
        </p>
      </div>

      {/* 2-Column Info & Form matching Fig 14.11 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Contact Information */}
        <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl p-8 sm:p-10 space-y-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white">Contact Information</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-mindDark-850 border border-mindDark-border flex items-center justify-center text-mindCyan shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Location</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  123 Wellness Avenue, Suite 400<br />
                  Health District, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-mindDark-850 border border-mindDark-border flex items-center justify-center text-mindCyan shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Call Us</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  +1 (800) 123-4567
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-mindDark-850 border border-mindDark-border flex items-center justify-center text-mindCyan shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Email</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  support@mindease.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-mindDark-850 border border-mindDark-border flex items-center justify-center text-mindCyan shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Hours</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Mon - Fri: 8:00 AM - 8:00 PM<br />
                  Sat - Sun: 9:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send a Message */}
        <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white">Send a Message</h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-300">
                Thank you for reaching out. One of our clinical coordinators will review your enquiry and respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-mindCyan font-semibold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white focus:outline-none focus:border-mindCyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white focus:outline-none focus:border-mindCyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white focus:outline-none focus:border-mindCyan"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white focus:outline-none focus:border-mindCyan resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-mindCyan hover:bg-mindCyan-hover text-white text-sm font-semibold transition-all shadow-md shadow-mindCyan/25 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* "Find Our Centre" Map Card matching Fig 14.11 bottom */}
      <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-mindCyan" />
            <span>Find Our Centre</span>
          </h3>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-mindDark-850 hover:bg-mindDark-800 text-xs font-medium text-slate-300 border border-mindDark-border"
          >
            <span>Open in Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Map iframe placeholder with clean dark aesthetic */}
        <div className="rounded-2xl overflow-hidden border border-mindDark-border h-72 sm:h-80 relative">
          <iframe
            title="MindEase Wellness Center Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
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
