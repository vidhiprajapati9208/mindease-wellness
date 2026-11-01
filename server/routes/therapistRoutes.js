const express = require('express');
const router = express.Router();
const Therapist = require('../models/Therapist');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// GET /api/therapists (with optional ?search= & ?specialization=)
router.get('/', async (req, res) => {
  try {
    const { search, specialization } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } }
      ];
    }

    if (specialization && specialization !== 'All') {
      query.specialization = { $regex: specialization, $options: 'i' };
    }

    const therapists = await Therapist.find(query).sort({ experience: -1 });
    res.json(therapists);
  } catch (error) {
    console.error('Error fetching therapists:', error);
    res.status(500).json({ message: 'Failed to fetch therapists', error: error.message });
  }
});

// GET /api/therapists/:id
router.get('/:id', async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    res.json(therapist);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving therapist', error: error.message });
  }
});

// POST /api/therapists
router.post('/', async (req, res) => {
  try {
    const { name, specialization, experience, bio, imageUrl } = req.body;
    if (!name || !specialization || !experience || !bio || !imageUrl) {
      return res.status(400).json({ message: 'All therapist fields are required.' });
    }

    const newTherapist = new Therapist({
      name,
      specialization,
      experience: Number(experience),
      bio,
      imageUrl
    });

    await newTherapist.save();
    res.status(201).json(newTherapist);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create therapist', error: error.message });
  }
});

// PUT /api/therapists/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Therapist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update therapist', error: error.message });
  }
});

// DELETE /api/therapists/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Therapist.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    res.json({ message: 'Therapist removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete therapist', error: error.message });
  }
});

module.exports = router;
