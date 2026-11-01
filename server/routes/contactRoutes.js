const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;
    if (!firstName || !email || !message) {
      return res.status(400).json({ message: 'First name, email, and message are required.' });
    }

    const contact = new ContactMessage({
      firstName,
      lastName: lastName || '',
      email: email.toLowerCase(),
      message
    });

    await contact.save();
    res.status(201).json({ message: 'Message received. We will be in touch shortly!', contact });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit contact message', error: error.message });
  }
});

// GET /api/contact
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contact messages', error: error.message });
  }
});

module.exports = router;
