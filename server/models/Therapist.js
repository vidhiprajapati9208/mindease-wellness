const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  availableDays: {
    type: [String],
    default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Therapist', therapistSchema);
