import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Users,
  Activity,
  Clock,
  CalendarDays,
  Plus,
  RefreshCw,
  LogOut,
  X,
  FileText,
  User,
  CheckCircle,
  Stethoscope,
  Trash2
} from 'lucide-react';

const initialRoster = [
  {
    _id: '1',
    patientName: 'jhon doe',
    patientId: 'L-1775824221026',
    patientAge: 'N/A',
    time: '10:00 AM',
    type: 'In-Person',
    status: 'Upcoming',
    therapistName: 'Dr. Marcus Johnson',
    therapistRole: 'Provider',
    visitHistory: 'New Patient',
    clinicalDetails: 'Pending Evaluation'
  },
  {
    _id: '2',
    patientName: 'viral darji',
    patientId: 'L-1776054808031',
    patientAge: 'N/A',
    time: '10:00 AM',
    type: 'In-Person',
    status: 'In Session',
    therapistName: 'Dr. Emily Chen',
    therapistRole: 'Provider',
    visitHistory: 'New Patient',
    clinicalDetails: 'treatment plans'
  },
  {
    _id: '3',
    patientName: 'elis doe',
    patientId: 'L-1775824268696',
    patientAge: 'N/A',
    time: '02:00 PM',
    type: 'In-Person',
    status: 'In Session',
    therapistName: 'Unassigned Provider',
    therapistRole: 'Provider',
    visitHistory: 'New Patient',
    clinicalDetails: 'treatment pain'
  },
  {
    _id: '4',
    patientName: 'john doe',
    patientId: 'L-1775824221026',
    patientAge: 'N/A',
    time: '10:00 AM',
    type: 'In-Person',
    status: 'Completed',
    therapistName: 'Dr. Emily Chen',
    therapistRole: 'Provider',
    visitHistory: 'New Patient',
    clinicalDetails: 'treatment plan'
  },
  {
    _id: '5',
    patientName: 'Manual Patient',
    patientId: 'L-1775030555600',
    patientAge: 'N/A',
    time: '11:00 AM',
    type: 'In-Person',
    status: 'In Session',
    therapistName: 'Dr. Smith',
    therapistRole: 'Provider',
    visitHistory: 'New Patient',
    clinicalDetails: 'Testing manual patient addition'
  },
  {
    _id: '6',
    patientName: 'Final Test',
    patientId: 'L-1775030482382',
    patientAge: 'N/A',
    time: '09:00 AM',
    type: 'In-Person',
    status: 'Upcoming',
    therapistName: 'Unassigned Provider',
    therapistRole: 'Provider',
    visitHistory: 'New Patient',
    clinicalDetails: 'Routine checkup'
  }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [roster, setRoster] = useState(initialRoster);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    patientsToday: 6,
    inSession: 3,
    waitingRoom: 0,
    providersActive: 3,
  });

  // Modal states
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // New patient modal form fields matching Fig 14.12
  const [newPatient, setNewPatient] = useState({
    fullName: '',
    age: '29',
    scheduledTime: '03:00 PM',
    doctor: 'Dr. Emily Chen',
    doctorRole: 'Psychologist, Therapist...',
    sessionType: 'In-Person',
    clinicalDetails: '',
  });

  const fetchRoster = async () => {
    setLoading(true);
    try {
      const res = await api.get('/appointments');
      if (res.data && res.data.length > 0) {
        // Map data to include display IDs if needed
        const mapped = res.data.map((item, index) => ({
          ...item,
          patientId: item.patientId || `L-1775824${item._id?.slice(-6) || index + 1000}`,
          clinicalDetails: item.clinicalDetails || item.issue || 'Routine checkup',
        }));
        setRoster(mapped);
      }
      const statsRes = await api.get('/appointments/stats');
      if (statsRes.data) {
        setStats(statsRes.data);
      }
    } catch (e) {
      console.log('Using local roster data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoster();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status: newStatus });
    } catch (e) {
      // Local update
    }
    setRoster((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleAddPatientSubmit = async (e) => {
    e.preventDefault();
    if (!newPatient.fullName) return;

    const newRecord = {
      _id: 'apt_' + Date.now(),
      patientName: newPatient.fullName,
      patientId: `L-${Date.now()}`,
      patientAge: newPatient.age || 'N/A',
      patientEmail: `${newPatient.fullName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      patientPhone: '(555) 012-3456',
      time: newPatient.scheduledTime,
      date: new Date().toISOString().split('T')[0],
      type: newPatient.sessionType,
      status: 'Upcoming',
      therapistName: newPatient.doctor,
      therapistRole: 'Provider',
      visitHistory: 'New Patient',
      clinicalDetails: newPatient.clinicalDetails || 'Intake assessment',
    };

    try {
      await api.post('/appointments', newRecord);
    } catch (err) {
      console.log('Saved to state');
    }

    setRoster([newRecord, ...roster]);
    setStats((prev) => ({ ...prev, patientsToday: prev.patientsToday + 1 }));
    setShowAddPatientModal(false);
    setNewPatient({
      fullName: '',
      age: '29',
      scheduledTime: '03:00 PM',
      doctor: 'Dr. Emily Chen',
      doctorRole: 'Psychologist, Therapist...',
      sessionType: 'In-Person',
      clinicalDetails: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header matching Fig 14.8 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-mindDark-border pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Clinic Dashboard
            </h1>
            <button
              onClick={fetchRoster}
              className="p-1.5 rounded-lg bg-mindDark-850 hover:bg-mindDark-800 text-slate-400 hover:text-white border border-mindDark-border transition-colors"
              title="Refresh roster"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-mindCyan' : ''}`} />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Overview of today's scheduled patients and detailed clinical cases.
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-mindDark-900 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-mindDark-border hover:border-rose-900 text-xs font-semibold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* 4 Stat Cards matching Fig 14.8 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Stat 1: Patients Today */}
        <div className="bg-mindDark-900 border border-mindDark-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Patients Today</span>
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.patientsToday}</span>
          </div>
        </div>

        {/* Stat 2: In Session */}
        <div className="bg-mindDark-900 border border-mindDark-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">In Session</span>
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.inSession}</span>
          </div>
        </div>

        {/* Stat 3: Waiting Room */}
        <div className="bg-mindDark-900 border border-mindDark-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Waiting Room</span>
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.waitingRoom}</span>
          </div>
        </div>

        {/* Stat 4: Providers Active */}
        <div className="bg-mindDark-900 border border-mindDark-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Providers Active</span>
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.providersActive}</span>
          </div>
        </div>
      </div>

      {/* Patient Roster Card matching Fig 14.8 */}
      <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Title + Add Patient Button */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-mindDark-border/60 pb-5">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-mindCyan" />
            <h2 className="text-lg font-bold text-white">
              Detailed Patient Roster (Today)
            </h2>
          </div>

          <button
            onClick={() => setShowAddPatientModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-mindCyan hover:bg-mindCyan-hover text-white text-xs font-semibold shadow-md shadow-mindCyan/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Patient</span>
          </button>
        </div>

        {/* Roster Items */}
        <div className="space-y-3.5">
          {roster.map((p) => (
            <div
              key={p._id}
              className="bg-mindDark-950/80 border border-mindDark-border rounded-2xl p-4 sm:p-5 hover:border-slate-700 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Col 1: Patient Identity & Time */}
                <div className="md:col-span-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-mindDark-800 border border-mindDark-border flex items-center justify-center text-slate-400 shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white capitalize">
                      {p.patientName}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      ID: {p.patientId || 'L-1775824221026'} • Age: {p.patientAge || 'N/A'}
                    </p>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-[11px] text-mindCyan font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {p.time} ({p.type || 'In-Person'})
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          p.status === 'In Session'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                            : p.status === 'Completed'
                            ? 'bg-blue-950/80 text-blue-400 border border-blue-800'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Col 2: Meeting with */}
                <div className="md:col-span-4 space-y-1 pl-0 md:pl-2">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                    Meeting With
                  </span>
                  <p className="text-xs font-bold text-mindCyan">{p.therapistName}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{p.therapistRole || 'Provider'}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-medium">{p.visitHistory || 'New Patient'}</span>
                  </div>
                </div>

                {/* Col 3: Clinical details & Status controls */}
                <div className="md:col-span-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-rose-400 tracking-wider">
                    <Activity className="w-3 h-3" />
                    <span>Clinical Condition Details</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {p.clinicalDetails || 'Pending initial doctor evaluation'}
                  </p>

                  {/* Quick status toggles */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      onClick={() => handleStatusChange(p._id, 'In Session')}
                      className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 border border-emerald-900"
                    >
                      Start Session
                    </button>
                    <button
                      onClick={() => handleStatusChange(p._id, 'Completed')}
                      className="px-2 py-0.5 rounded text-[10px] bg-blue-950/60 hover:bg-blue-900 text-blue-400 border border-blue-900"
                    >
                      Mark Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Entire Schedule Link matching Fig 14.8 bottom */}
        <div className="pt-4 text-center border-t border-mindDark-border/60">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="text-xs font-semibold text-mindCyan hover:text-mindCyan-light transition-colors"
          >
            View Entire Schedule &gt;
          </button>
        </div>
      </div>

      {/* Modal 1: Register New Patient / Add Patient to Roster (Fig 14.12) */}
      {showAddPatientModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-mindDark-border/60 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-mindCyan" />
                <span>Register New Patient</span>
              </h3>
              <button
                onClick={() => setShowAddPatientModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPatientSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={newPatient.fullName}
                    onChange={(e) => setNewPatient({ ...newPatient, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-mindDark-950 border border-mindDark-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Age
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 29"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="w-full px-3.5 py-2 bg-mindDark-950 border border-mindDark-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Scheduled Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 03:00 PM"
                    value={newPatient.scheduledTime}
                    onChange={(e) => setNewPatient({ ...newPatient, scheduledTime: e.target.value })}
                    className="w-full px-3.5 py-2 bg-mindDark-950 border border-mindDark-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Meeting With (Doctor)
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. Emily Chen"
                    value={newPatient.doctor}
                    onChange={(e) => setNewPatient({ ...newPatient, doctor: e.target.value })}
                    className="w-full px-3.5 py-2 bg-mindDark-950 border border-mindDark-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Doctor's Role
                  </label>
                  <input
                    type="text"
                    placeholder="Psychologist, Therapist..."
                    value={newPatient.doctorRole}
                    onChange={(e) => setNewPatient({ ...newPatient, doctorRole: e.target.value })}
                    className="w-full px-3.5 py-2 bg-mindDark-950 border border-mindDark-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Session Type
                  </label>
                  <select
                    value={newPatient.sessionType}
                    onChange={(e) => setNewPatient({ ...newPatient, sessionType: e.target.value })}
                    className="w-full px-3.5 py-2 bg-mindDark-950 border border-mindDark-border rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-mindCyan"
                  >
                    <option value="In-Person">In-Person</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Detailed Clinical Condition / Disease Profile
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the psychological condition, major symptoms, and treatment plan details..."
                  value={newPatient.clinicalDetails}
                  onChange={(e) => setNewPatient({ ...newPatient, clinicalDetails: e.target.value })}
                  className="w-full p-3 bg-mindDark-950 border border-mindDark-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-mindDark-border/60">
                <button
                  type="button"
                  onClick={() => setShowAddPatientModal(false)}
                  className="px-5 py-2 rounded-xl bg-mindDark-850 hover:bg-mindDark-800 text-slate-300 text-xs font-semibold border border-mindDark-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-mindCyan hover:bg-mindCyan-hover text-white text-xs font-bold shadow-md shadow-mindCyan/25"
                >
                  Add Patient to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Clinic Master Schedule (Weekly) matching Fig 14.13 */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl w-full max-w-5xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-mindDark-border/60 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-mindCyan" />
                <span>Clinic Master Schedule (Weekly)</span>
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 5 Day Columns matching Fig 14.13 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Monday */}
              <div className="bg-mindDark-950/70 border border-mindDark-border/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Monday</h4>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] text-slate-300 flex items-center justify-center font-bold">
                    2
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">09:00 AM</span>
                    <strong className="text-white block">Sarah K.</strong>
                    <span className="text-slate-400 text-[11px] block">Dr. Chen</span>
                  </div>
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">11:00 AM</span>
                    <strong className="text-white block">Michael R.</strong>
                    <span className="text-slate-400 text-[11px] block">Dr. Johnson</span>
                  </div>
                </div>
              </div>

              {/* Tuesday */}
              <div className="bg-mindDark-950/70 border border-mindDark-border/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tuesday</h4>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] text-slate-300 flex items-center justify-center font-bold">
                    3
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">10:30 AM</span>
                    <strong className="text-white block">Emily W.</strong>
                    <span className="text-slate-400 text-[11px] block">S. Williams</span>
                  </div>
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">02:00 PM</span>
                    <strong className="text-white block">David L.</strong>
                    <span className="text-slate-400 text-[11px] block">Dr. Chen</span>
                  </div>
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">04:15 PM</span>
                    <strong className="text-white block">Alex S.</strong>
                    <span className="text-slate-400 text-[11px] block">Dr. Johnson</span>
                  </div>
                </div>
              </div>

              {/* Wednesday */}
              <div className="bg-mindDark-950/70 border border-mindDark-border/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Wednesday</h4>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] text-slate-300 flex items-center justify-center font-bold">
                    2
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">08:00 AM</span>
                    <strong className="text-white block">Chris P.</strong>
                    <span className="text-slate-400 text-[11px] block">S. Williams</span>
                  </div>
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">01:00 PM</span>
                    <strong className="text-white block">Emma B.</strong>
                    <span className="text-slate-400 text-[11px] block">Dr. Johnson</span>
                  </div>
                </div>
              </div>

              {/* Thursday */}
              <div className="bg-mindDark-950/70 border border-mindDark-border/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Thursday</h4>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] text-slate-300 flex items-center justify-center font-bold">
                    3
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">09:30 AM</span>
                    <strong className="text-white block">Tom H.</strong>
                    <span className="text-slate-400 text-[11px] block">Dr. Chen</span>
                  </div>
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">03:00 PM</span>
                    <strong className="text-white block">Lisa M.</strong>
                    <span className="text-slate-400 text-[11px] block">Dr. Chen</span>
                  </div>
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">05:00 PM</span>
                    <strong className="text-white block">Sam E.</strong>
                    <span className="text-slate-400 text-[11px] block">S. Williams</span>
                  </div>
                </div>
              </div>

              {/* Friday */}
              <div className="bg-mindDark-950/70 border border-mindDark-border/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Friday</h4>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] text-slate-300 flex items-center justify-center font-bold">
                    2
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">10:00 AM</span>
                    <strong className="text-white block">Nina V.</strong>
                    <span className="text-slate-400 text-[11px] block">Dr. Johnson</span>
                  </div>
                  <div className="p-3 rounded-xl bg-mindDark-850/70 border border-mindDark-border text-xs space-y-1">
                    <span className="text-mindCyan font-semibold block">12:30 PM</span>
                    <strong className="text-white block">Robert C.</strong>
                    <span className="text-slate-400 text-[11px] block">Dr. Chen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
