import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  Plus,
  ArrowRight,
  Activity,
  CheckCircle2,
  AlertCircle,
  FileText,
  LogOut,
  RefreshCw,
  Video,
  MapPin
} from 'lucide-react';

const PatientProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchMyAppointments = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await api.get(`/appointments?email=${encodeURIComponent(user.email)}`);
      if (res.data) {
        setAppointments(res.data);
      }
    } catch (err) {
      console.log('Error fetching user appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    // If admin enters patient profile, optionally let them view or redirect
    fetchMyAppointments();
  }, [user]);

  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    setCancellingId(id);
    try {
      await api.patch(`/appointments/${id}/status`, { status: 'Cancelled' });
      setAppointments((prev) =>
        prev.map((apt) => (apt._id === id ? { ...apt, status: 'Cancelled' } : apt))
      );
    } catch (err) {
      alert('Could not cancel appointment. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  const upcomingCount = appointments.filter((a) => a.status === 'Upcoming' || a.status === 'In Session').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'P';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-mindDark-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Welcome, {user?.name || 'Patient'}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30 font-semibold shadow-sm">
              Verified Patient
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your personal wellness journey, upcoming therapy sessions, and clinical history.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/book"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-semibold shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Session</span>
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-mindDark-900 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-mindDark-border hover:border-rose-900 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Avatar & Basic Identity */}
          <div className="md:col-span-7 flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-mindCyan to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-mindCyan/25 shrink-0">
              {initials}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{user?.name || 'John Patient'}</h2>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/80">
                  <ShieldCheck className="w-3 h-3" />
                  Active Account
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-mindCyan" />
                  {user?.email}
                </span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-mindCyan" />
                  {user?.phone || '(555) 019-2834'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 pt-0.5">
                Member of MindEase Wellness System • Secure HIPAA Protected Profile
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-5 grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-mindDark-border/80 pt-4 md:pt-0 md:pl-6 text-center">
            <div className="p-3 rounded-2xl bg-mindDark-950/70 border border-mindDark-border">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total</span>
              <span className="text-xl font-bold text-white">{appointments.length}</span>
            </div>
            <div className="p-3 rounded-2xl bg-mindDark-950/70 border border-mindDark-border">
              <span className="text-[10px] text-mindCyan uppercase font-semibold block">Upcoming</span>
              <span className="text-xl font-bold text-mindCyan">{upcomingCount}</span>
            </div>
            <div className="p-3 rounded-2xl bg-mindDark-950/70 border border-mindDark-border">
              <span className="text-[10px] text-emerald-400 uppercase font-semibold block">Completed</span>
              <span className="text-xl font-bold text-emerald-400">{completedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* "My Scheduled Consultations" Section */}
      <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-mindDark-border/60 pb-4">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-mindCyan" />
            <h3 className="text-lg font-bold text-white">My Therapy Consultations</h3>
          </div>
          <button
            onClick={fetchMyAppointments}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-mindCyan' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin text-mindCyan mx-auto mb-2" />
            <span>Loading your consultation history...</span>
          </div>
        ) : appointments.length === 0 ? (
          /* Empty State */
          <div className="py-12 text-center space-y-4 bg-mindDark-950/60 rounded-2xl border border-mindDark-border/60 p-8">
            <div className="w-14 h-14 rounded-full bg-mindDark-850 border border-mindDark-border flex items-center justify-center mx-auto text-slate-400">
              <Calendar className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">No Appointments Booked Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Take the first step towards a calmer, healthier mind. Schedule your first session with one of our licensed experts.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-mindCyan hover:bg-mindCyan-hover text-white text-xs font-semibold shadow-md transition-all"
              >
                <span>Book First Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          /* Appointments List */
          <div className="space-y-3.5">
            {appointments.map((apt) => (
              <div
                key={apt._id}
                className="bg-mindDark-950/80 border border-mindDark-border rounded-2xl p-5 hover:border-slate-700 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Doctor Info */}
                  <div className="md:col-span-5 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-mindDark-850 border border-mindDark-border flex items-center justify-center text-mindCyan shrink-0 mt-0.5">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">{apt.therapistName}</h4>
                      <p className="text-xs text-mindCyan">{apt.therapistRole || 'Clinical Specialist'}</p>
                      <div className="flex items-center gap-2 pt-0.5 text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Calendar className="w-3 h-3 text-mindCyan" />
                          {apt.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3 h-3 text-mindCyan" />
                          {apt.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mode & Details */}
                  <div className="md:col-span-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      {apt.type === 'Online' ? (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950/70 text-blue-300 border border-blue-800 text-[11px] font-medium">
                          <Video className="w-3 h-3" /> Online Video Session
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-mindDark-850 text-slate-300 border border-mindDark-border text-[11px] font-medium">
                          <MapPin className="w-3 h-3 text-mindCyan" /> In-Person (Clinic Office)
                        </span>
                      )}
                    </div>
                    {apt.issue && (
                      <p className="text-xs text-slate-400 line-clamp-2 italic">
                        "{apt.issue}"
                      </p>
                    )}
                  </div>

                  {/* Status & Cancel Action */}
                  <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        apt.status === 'In Session'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 animate-pulse'
                          : apt.status === 'Completed'
                          ? 'bg-blue-950 text-blue-400 border border-blue-800'
                          : apt.status === 'Cancelled'
                          ? 'bg-rose-950/70 text-rose-400 border border-rose-900'
                          : 'bg-mindDark-850 text-mindCyan border border-mindDark-border'
                      }`}
                    >
                      {apt.status}
                    </span>

                    {apt.status === 'Upcoming' && (
                      <button
                        onClick={() => handleCancelAppointment(apt._id)}
                        disabled={cancellingId === apt._id}
                        className="text-[11px] text-slate-500 hover:text-rose-400 underline transition-colors"
                      >
                        {cancellingId === apt._id ? 'Cancelling...' : 'Cancel Session'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wellness Self-Help Quick Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/therapists"
          className="p-5 rounded-2xl bg-mindDark-900 border border-mindDark-border hover:border-mindCyan/50 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white group-hover:text-mindCyan transition-colors">
              Explore Our Licensed Therapists
            </h4>
            <p className="text-xs text-slate-400">
              Review degrees, specializations, and bios of our clinic psychologists.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-mindCyan group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/blog"
          className="p-5 rounded-2xl bg-mindDark-900 border border-mindDark-border hover:border-mindCyan/50 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white group-hover:text-mindCyan transition-colors">
              Mental Wellness Knowledge Base
            </h4>
            <p className="text-xs text-slate-400">
              Read clinician-authored guides on anxiety, burnout, and grounding exercises.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-mindCyan group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default PatientProfile;
