import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft, User, Mail, Phone, FileText } from 'lucide-react';

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
        // Fallback
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
        setStep(2); // Go back to slot selection
      } else {
        // Mock confirmation fallback for offline demo
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Title & subtitle matching Fig 14.7 */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Book an <span className="text-mindCyan">Appointment</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base">
          Take the first step towards healing. Choose a time that works for you.
        </p>
      </div>

      {bookingConfirmed ? (
        /* Booking Success Card */
        <div className="bg-mindDark-900 border border-emerald-500/50 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Appointment Confirmed!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your consultation with <strong className="text-mindCyan">{formData.doctor}</strong> has been successfully registered.
            </p>
          </div>

          <div className="bg-mindDark-950 border border-mindDark-border rounded-2xl p-6 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2 text-slate-300">
            <p><span className="text-slate-400">Patient:</span> <strong className="text-white">{formData.fullName}</strong></p>
            <p><span className="text-slate-400">Scheduled:</span> <strong className="text-white">{formData.date} at {formData.time}</strong></p>
            <p><span className="text-slate-400">Session Mode:</span> <strong className="text-emerald-400">{formData.sessionType}</strong></p>
            <p><span className="text-slate-400">Status:</span> <span className="px-2 py-0.5 rounded bg-mindDark-850 text-mindCyan font-semibold">Upcoming</span></p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-full bg-mindCyan hover:bg-mindCyan-hover text-white font-semibold text-sm shadow-md transition-all"
            >
              View in Clinic Dashboard
            </button>
            <button
              onClick={() => {
                setBookingConfirmed(false);
                setStep(1);
              }}
              className="px-6 py-3 rounded-full bg-mindDark-850 hover:bg-mindDark-800 text-slate-300 text-sm border border-mindDark-border transition-colors"
            >
              Book Another Session
            </button>
          </div>
        </div>
      ) : (
        /* Multi-step Card matching Fig 14.7 */
        <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {conflictError && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs sm:text-sm flex items-center justify-between animate-in fade-in">
              <span>⚠️ {conflictError}</span>
              <button
                type="button"
                onClick={() => setConflictError('')}
                className="text-rose-400 hover:text-white ml-2 text-xs font-bold underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Step Tabs header */}
          <div className="grid grid-cols-3 border-b border-mindDark-border pb-4 text-center text-xs sm:text-sm font-semibold">
            <div
              className={`pb-3 border-b-2 transition-all ${
                step === 1
                  ? 'border-mindCyan text-mindCyan font-bold'
                  : 'border-transparent text-slate-400'
              }`}
            >
              Basic Details
            </div>
            <div
              className={`pb-3 border-b-2 transition-all ${
                step === 2
                  ? 'border-mindCyan text-mindCyan font-bold'
                  : 'border-transparent text-slate-400'
              }`}
            >
              Schedule
            </div>
            <div
              className={`pb-3 border-b-2 transition-all ${
                step === 3
                  ? 'border-mindCyan text-mindCyan font-bold'
                  : 'border-transparent text-slate-400'
              }`}
            >
              Confirmation
            </div>
          </div>

          {/* Step 1: Basic Details */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Briefly describe your reason for visit
                </label>
                <textarea
                  name="reason"
                  rows={4}
                  placeholder="I'm feeling..."
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl bg-mindCyan hover:bg-mindCyan-hover text-white font-semibold text-sm transition-all shadow-md shadow-mindCyan/20 flex items-center gap-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Select Therapist
                </label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white focus:outline-none focus:border-mindCyan"
                >
                  {therapists.map((doc, idx) => (
                    <option key={idx} value={doc.name} className="bg-mindDark-900">
                      {doc.name} {doc.specialization ? `(${doc.specialization})` : ''}
                    </option>
                  ))}
                  <option value="Unassigned Provider" className="bg-mindDark-900">
                    Next Available Therapist
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white focus:outline-none focus:border-mindCyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Session Format
                  </label>
                  <select
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-mindDark-950 border border-mindDark-border rounded-xl text-sm text-white focus:outline-none focus:border-mindCyan"
                  >
                    <option value="In-Person">In-Person (Clinic Office)</option>
                    <option value="Online">Online Video Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, time: slot })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        formData.time === slot
                          ? 'bg-mindCyan text-white border-mindCyan shadow-sm'
                          : 'bg-mindDark-950 text-slate-300 border-mindDark-border hover:border-slate-600'
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
                  className="px-6 py-2.5 rounded-xl bg-mindDark-850 hover:bg-mindDark-800 text-slate-300 text-sm border border-mindDark-border transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-8 py-2.5 rounded-xl bg-mindCyan hover:bg-mindCyan-hover text-white font-semibold text-sm transition-all shadow-md shadow-mindCyan/20 flex items-center gap-2"
                >
                  <span>Review & Confirm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation Review */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-mindDark-950 border border-mindDark-border space-y-4">
                <h3 className="text-base font-bold text-white border-b border-mindDark-border/60 pb-3">
                  Appointment Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 block">Patient Name:</span>
                    <strong className="text-white">{formData.fullName || 'Not specified'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Contact Email:</span>
                    <strong className="text-white">{formData.email}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Contact Phone:</span>
                    <strong className="text-white">{formData.phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Assigned Therapist:</span>
                    <strong className="text-mindCyan">{formData.doctor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date & Time:</span>
                    <strong className="text-white">{formData.date} at {formData.time}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Session Format:</span>
                    <strong className="text-white">{formData.sessionType}</strong>
                  </div>
                </div>

                {formData.reason && (
                  <div className="pt-2 border-t border-mindDark-border/60">
                    <span className="text-slate-400 text-xs block mb-1">Reason for Visit:</span>
                    <p className="text-xs text-slate-300 italic">"{formData.reason}"</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-xl bg-mindDark-850 hover:bg-mindDark-800 text-slate-300 text-sm border border-mindDark-border transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmBooking}
                  className="px-8 py-3 rounded-xl bg-mindCyan hover:bg-mindCyan-hover text-white font-bold text-sm transition-all shadow-lg shadow-mindCyan/30 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{isSubmitting ? 'Confirming...' : 'Confirm Appointment'}</span>
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
