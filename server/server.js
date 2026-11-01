const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Always load .env from the server directory
dotenv.config({ path: path.join(__dirname, '.env') });

const { connectDB, getStatus } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const therapistRoutes = require('./routes/therapistRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/therapists', therapistRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    system: 'MindEase Wellness System API',
    status: 'online',
    message: '🚀 MindEase Wellness API is running live!',
    endpoints: {
      health: '/api/health',
      therapists: '/api/therapists',
      blogs: '/api/blogs',
      auth: '/api/auth'
    },
    database: getStatus() ? 'Connected (Atlas Cloud)' : 'Offline / Standby',
    version: '1.0.0'
  });
});

// Health check endpoint with Live DB Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'MindEase Wellness System API',
    database: getStatus() ? 'Connected (Atlas Cloud)' : 'Offline / Standby',
    dbConnected: getStatus(),
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Auto-seed initial data into MongoDB Atlas if collections are empty
const autoSeedIfEmpty = async () => {
  try {
    const Therapist = require('./models/Therapist');
    const count = await Therapist.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding initial records into MongoDB Atlas...');
      const { therapistsData, blogPostsData, appointmentsData } = require('./seed/seedData');
      const User = require('./models/User');
      const BlogPost = require('./models/BlogPost');
      const Appointment = require('./models/Appointment');
      const bcrypt = require('bcryptjs');

      const salt = await bcrypt.genSalt(10);
      const adminPassword = await bcrypt.hash('admin123', salt);
      const patientPassword = await bcrypt.hash('patient123', salt);

      await User.create([
        { name: 'Clinic Staff Admin', email: 'admin@mindease.com', password: adminPassword, role: 'admin' },
        { name: 'Clinic Staff', email: 'kp123@me.com', password: adminPassword, role: 'admin' },
        { name: 'John Patient', email: 'patient@mindease.com', password: patientPassword, role: 'patient' }
      ]);
      await Therapist.insertMany(therapistsData);
      await BlogPost.insertMany(blogPostsData);
      await Appointment.insertMany(appointmentsData);
      console.log('🎉 MongoDB Atlas successfully populated with doctors, articles & clinic roster!');
    } else {
      console.log(`📦 MongoDB Atlas already contains ${count} therapists and active collections.`);
    }
  } catch (err) {
    console.log('Seed check skipped:', err.message);
  }
};

// Start Server
const startServer = async () => {
  const dbConnected = await connectDB();
  if (dbConnected) {
    await autoSeedIfEmpty();
  }

  app.listen(PORT, () => {
    console.log(`🚀 MindEase Backend Server running on http://localhost:${PORT}`);
  });
};

startServer();
