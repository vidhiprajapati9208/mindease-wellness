const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  patientAge: {
    type: String,
    default: 'N/A'
  },
  patientEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  patientPhone: {
    type: String,
    required: true,
    trim: true
  },
  therapistName: {
    type: String,
    default: 'Unassigned Provider'
  },
  therapistRole: {
    type: String,
    default: 'Provider'
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    default: ''
  },
  clinicalDetails: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['In-Person', 'Online'],
    default: 'In-Person'
  },
  status: {
    type: String,
    enum: ['Upcoming', 'In Session', 'Completed', 'Cancelled'],
    default: 'Upcoming'
  },
  visitHistory: {
    type: String,
    default: 'New Patient'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to accelerate provider schedule lookups (Report Section 5.6 & Appendix 2)
appointmentSchema.index({ therapistName: 1, date: 1, time: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
