import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft, User, Mail, Phone, FileText, Sparkles } from 'lucide-react';

const availableSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:15 PM'
];

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preSelectedDoctor = searchParams.get('doctor') || 'Dr. Emily Chen, PhD';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    reason: '',
    doctor: preSelectedDoctor,
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    sessionType: 'In-Person',
  });

  const [therapists, setTherapists] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [appointmentResult, setAppointmentResult] = useState(null);
  const [conflictError, setConflictError] = useState('');

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await api.get('/therapists');
        if (res.data && res.data.length > 0) {
          setTherapists(res.data);
        }
      } catch (e) {
        setTherapists([
          { name: 'Dr. Emily Chen, PhD' },
          { name: 'Dr. Marcus Johnson, PsyD' },
          { name: 'Sarah Williams, LCSW' },
        ]);
      }
    };
    fetchTherapists();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setConflictError('');
    try {
      const payload = {
        patientName: formData.fullName || 'Guest Patient',
        patientEmail: formData.email || 'patient@example.com',
        patientPhone: formData.phone || '(555) 000-0000',
        therapistName: formData.doctor,
        therapistRole: 'Provider',
        date: formData.date,
        time: formData.time,
        issue: formData.reason,
        clinicalDetails: formData.reason || 'General wellness consultation',
        type: formData.sessionType,
        status: 'Upcoming',
      };

      const res = await api.post('/appointments', payload);
      setAppointmentResult(res.data?.appointment || payload);
      setBookingConfirmed(true);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setConflictError(err.response.data?.message || 'This time slot is already booked. Please choose another slot.');
        setStep(2);
      } else {
        setAppointmentResult({
          ...formData,
          patientName: formData.fullName,
          _id: 'APT-' + Math.floor(100000 + Math.random() * 900000),
        });
        setBookingConfirmed(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">
      
      {/* Title & subtitle */}
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#faecea] dark:bg-[#2a1725] text-dustyRose text-xs font-semibold uppercase tracking-[0.2em] border border-[#ecd8d4] dark:border-pink-500/30">
          Gentle Scheduling Wizard
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl italic font-normal text-stone-900 dark:text-rose-100 tracking-tight leading-tight">
          Reserve your <span className="text-dustyRose">sanctuary session</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-lg mx-auto font-normal">
          Take the first step toward lightness and peace. Select your guide and time below.
        </p>
      </div>

      {bookingConfirmed ? (
        /* Booking Success Card */
        <div className="bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/30 rounded-3xl p-8 sm:p-14 text-center space-y-6 card-soft-rose">
          <div className="w-16 h-16 rounded-full bg-[#faecea] text-dustyRose flex items-center justify-center mx-auto border border-[#ecd8d4]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-editorial text-3xl sm:text-4xl italic text-stone-900 dark:text-rose-100 font-normal">
              Session Confirmed
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
              Your consultation with <strong className="text-dustyRose font-semibold">{formData.doctor}</strong> is reserved with love and care.
            </p>
          </div>

          <div className="bg-[#fbf4f2] dark:bg-[#251222] border border-[#ecd8d4] dark:border-pink-500/20 rounded-2xl p-6 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2.5 text-stone-700 dark:text-stone-300">
            <p><span className="text-stone-500">Patient:</span> <strong className="text-stone-900 dark:text-rose-100">{formData.fullName}</strong></p>
            <p><span className="text-stone-500">Scheduled:</span> <strong className="text-stone-900 dark:text-rose-100">{formData.date} at {formData.time}</strong></p>
            <p><span className="text-stone-500">Format:</span> <strong className="text-dustyRose font-semibold">{formData.sessionType}</strong></p>
            <p><span className="text-stone-500">Status:</span> <span className="px-2.5 py-0.5 rounded-full bg-[#faecea] text-dustyRose font-semibold text-xs border border-[#ecd8d4]">Upcoming</span></p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 transition-all cursor-pointer"
            >
              View In Clinic Dashboard
            </button>
            <button
              onClick={() => {
                setBookingConfirmed(false);
                setStep(1);
              }}
              className="px-8 py-3 rounded-full bg-[#faecea] hover:bg-[#f5d5d1] text-dustyRose text-xs font-semibold uppercase tracking-widest border border-[#ecd8d4] transition-colors cursor-pointer"
            >
              Book Another Session
            </button>
          </div>
        </div>
      ) : (
        /* Multi-step Wizard */
        <div className="bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 card-soft-rose rounded-3xl p-6 sm:p-12 space-y-8">
          {conflictError && (
            <div className="p-4 rounded-2xl bg-[#faecea] border border-rose-300 text-rose-800 text-xs sm:text-sm flex items-center justify-between">
              <span>⚠️ {conflictError}</span>
              <button
                type="button"
                onClick={() => setConflictError('')}
                className="text-dustyRose hover:underline ml-2 text-xs font-bold"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Step Tabs Header */}
          <div className="grid grid-cols-3 border-b border-[#ecd8d4] pb-4 text-center text-xs sm:text-sm font-semibold">
            <div
              className={`pb-3 border-b-2 transition-all ${
                step === 1
                  ? 'border-dustyRose text-dustyRose font-bold scale-105'
                  : 'border-transparent text-stone-400'
              }`}
            >
              1. Your Details
            </div>
            <div
              className={`pb-3 border-b-2 transition-all ${
                step === 2
                  ? 'border-dustyRose text-dustyRose font-bold scale-105'
                  : 'border-transparent text-stone-400'
              }`}
            >
              2. Guide & Slot
            </div>
            <div
              className={`pb-3 border-b-2 transition-all ${
                step === 3
                  ? 'border-dustyRose text-dustyRose font-bold scale-105'
                  : 'border-transparent text-stone-400'
              }`}
            >
              3. Review
            </div>
          </div>

          {/* Step 1: Basic Details */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Vidhi Prajapati"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-dustyRose transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="vidhi@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-dustyRose transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-dustyRose transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  What would you like support with?
                </label>
                <textarea
                  name="reason"
                  rows={4}
                  placeholder="Share a few words about what you're experiencing (e.g. stress, anxiety, life transition)..."
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full p-4 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-dustyRose transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white font-semibold text-xs uppercase tracking-widest shadow-md shadow-dustyRose/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Select Time & Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Schedule & Slot */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  Choose Clinical Guide
                </label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-dustyRose"
                >
                  {therapists.map((doc, idx) => (
                    <option key={idx} value={doc.name}>
                      {doc.name} {doc.specialization ? `— ${doc.specialization}` : ''}
                    </option>
                  ))}
                  <option value="Unassigned Provider">Next Available Specialist</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-dustyRose"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                    Session Sanctuary Format
                  </label>
                  <select
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-dustyRose"
                  >
                    <option value="In-Person">In-Person (Sanctuary Suite)</option>
                    <option value="Online">Online Video (Encrypted HIPAA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  Select Calming Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, time: slot })}
                      className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                        formData.time === slot
                          ? 'bg-dustyRose text-white border-dustyRose shadow-md shadow-dustyRose/25 scale-105'
                          : 'bg-[#faecea] dark:bg-[#2a1725] text-stone-700 dark:text-stone-300 border-[#ecd8d4] dark:border-pink-500/20 hover:border-dustyRose'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-full bg-[#faecea] text-stone-700 hover:text-dustyRose text-xs font-semibold uppercase tracking-wider border border-[#ecd8d4] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Review Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation Review */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#fbf4f2] dark:bg-[#251222] border border-[#ecd8d4] dark:border-pink-500/20 space-y-4">
                <h3 className="font-editorial text-xl italic text-stone-900 dark:text-rose-100 border-b border-[#ecd8d4] pb-3">
                  Appointment Sanctuary Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-stone-500 block">Patient Name:</span>
                    <strong className="text-stone-900 dark:text-rose-100">{formData.fullName || 'Not specified'}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Contact Email:</span>
                    <strong className="text-stone-900 dark:text-rose-100">{formData.email}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Contact Phone:</span>
                    <strong className="text-stone-900 dark:text-rose-100">{formData.phone}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Selected Guide:</span>
                    <strong className="text-dustyRose font-semibold">{formData.doctor}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Date & Time:</span>
                    <strong className="text-stone-900 dark:text-rose-100">{formData.date} at {formData.time}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Format:</span>
                    <strong className="text-stone-900 dark:text-rose-100">{formData.sessionType}</strong>
                  </div>
                </div>

                {formData.reason && (
                  <div className="pt-2 border-t border-[#ecd8d4]">
                    <span className="text-stone-500 text-xs block mb-1">Stated Concern:</span>
                    <p className="text-xs text-stone-700 dark:text-stone-300 italic">"{formData.reason}"</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-full bg-[#faecea] text-stone-700 hover:text-dustyRose text-xs font-semibold uppercase tracking-wider border border-[#ecd8d4] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmBooking}
                  className="px-8 py-3 rounded-full bg-dustyRose hover:bg-dustyRose-hover disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-widest shadow-md shadow-dustyRose/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? 'Confirming...' : 'Complete Reservation'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
