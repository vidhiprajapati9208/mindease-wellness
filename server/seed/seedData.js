const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Therapist = require('../models/Therapist');
const Appointment = require('../models/Appointment');
const BlogPost = require('../models/BlogPost');

const therapistsData = [
  {
    name: 'Dr. Emily Chen, PhD',
    specialization: 'Clinical Psychologist • Anxiety & Burnout Specialist',
    experience: 12,
    bio: 'With over 12 years of clinical experience, Dr. Chen helps high-achieving professionals reconnect with their inner peace. She actively uses mindfulness-based cognitive therapy to help clients slow down and manage chronic worry.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Marcus Johnson, PsyD',
    specialization: 'Licensed Therapist • Couples & Family Dynamics',
    experience: 10,
    bio: 'Dr. Johnson focuses on healing strained relationships. Whether you are navigating a difficult marriage or family trauma, he provides a neutral, warm space to foster difficult conversations and rebuild deep trust.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sarah Williams, LCSW',
    specialization: 'Clinical Social Worker • Trauma & Depression Recovery',
    experience: 8,
    bio: 'Sarah is deeply passionate about helping clients unburden themselves from past grief and trauma. Her approach is trauma-informed, deeply gentle, and paced entirely by what feels safe and comfortable to you.',
    imageUrl: 'https://images.unsplash.com/photo-1594824813580-c11f7c5e532a?auto=format&fit=crop&w=600&q=80'
  }
];

const blogPostsData = [
  {
    title: 'How to Manage Daily Anxiety Without Feeling Overwhelmed',
    author: 'Dr. Emily Chen, PhD',
    category: 'Anxiety & Stress',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    content: `Anxiety has a sneaky way of making small mountains out of completely flat land. In this guide, we dive deep into the daily habits, grounding exercises, and mental re-framing techniques that can help you silence that inner alarm bell without needing to completely exhaust yourself in the process.

1. The 5-4-3-2-1 Sensory Grounding: Notice 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 positive affirmation you can tell yourself.
2. Diaphragmatic Box Breathing: Inhale for 4 counts, hold for 4, exhale slowly for 4, and hold empty for 4. Repeat 4 cycles to stimulate your vagus nerve and initiate the parasympathetic calm response.
3. Labeling Without Judging: When an anxious thought arises, acknowledge it: "I am experiencing the emotion of worry right now, but this thought is not a fact."`
  },
  {
    title: '5 Warning Signs You Are Approaching Severe Burnout',
    author: 'Dr. Marcus Johnson',
    category: 'Stress & Burnout',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    content: `Burnout doesn't happen overnight. It is a slow fade of energy, passion, and patience. Recognizing these 5 subtle signs early can save you months of severe emotional fatigue:

• Cynicism and emotional detachment from work and loved ones.
• Waking up feeling drained even after 8 hours of sleep.
• Inability to concentrate on standard everyday tasks.
• Physical symptoms such as tension headaches and stomach knots.
• Withdrawing from social interactions that used to bring you joy.`
  },
  {
    title: "A Therapist's Top 3 Daily Mental Wellness Tips",
    author: 'Sarah Williams, LCSW',
    category: 'Wellness',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    content: `Mental wellness on a daily level shouldn't feel like a chore. If your self-care routine is stressing you out, it's not self-care. Try these three remarkably simple tips to incorporate effortlessly into a busy life:

1. The 10-Minute Morning Disconnect: Delay looking at your smartphone for the first 10 minutes after waking up. It sets the tone for your brain that you dictate the rhythm of your day, not external notifications.

2. Mindful Sipping: When drinking your morning coffee or tea, do absolutely nothing else. Don't read the news, don't drive. Just feel the warmth of the mug and smell the drink. It's a 2-minute daily meditation.

3. A Gratitude Anchor: Pick an object you walk past frequently—like your front door handle or a mirror. Every time you touch it, force your brain to identify one thing you are genuinely thankful for in that exact moment.`
  },
  {
    title: 'Navigating Life Transitions and Emotional Grief',
    author: 'Dr. Emily Chen, PhD',
    category: 'Personal Growth',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80',
    content: `Grief isn't just about losing a person. You can grieve a past version of yourself, a lost career path, or a major move. Here is how to give yourself grace through big life changes and honor your emotional evolution with patience.`
  },
  {
    title: 'How to Set Boundaries with Family Gently',
    author: 'Dr. Marcus Johnson',
    category: 'Relationships',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80',
    content: `Saying 'no' to family can feel riddled with guilt. Learn the scripts and internal mindset needed to set firm, loving boundaries that protect your peace while preserving healthy connections.`
  }
];

const appointmentsData = [
  {
    patientName: 'jhon doe',
    patientAge: 'N/A',
    patientEmail: 'jhon@example.com',
    patientPhone: '(555) 234-5678',
    therapistName: 'Dr. Marcus Johnson',
    therapistRole: 'Provider',
    date: '2026-10-29',
    time: '10:00 AM',
    issue: 'Routine evaluation',
    clinicalDetails: 'Pending Evaluation',
    type: 'In-Person',
    status: 'Upcoming',
    visitHistory: 'New Patient'
  },
  {
    patientName: 'viral darji',
    patientAge: 'N/A',
    patientEmail: 'viral@example.com',
    patientPhone: '(555) 987-6543',
    therapistName: 'Dr. Emily Chen',
    therapistRole: 'Provider',
    date: '2026-10-29',
    time: '10:00 AM',
    issue: 'Anxiety management',
    clinicalDetails: 'treatment plans',
    type: 'In-Person',
    status: 'In Session',
    visitHistory: 'New Patient'
  },
  {
    patientName: 'elis doe',
    patientAge: 'N/A',
    patientEmail: 'elis@example.com',
    patientPhone: '(555) 345-6789',
    therapistName: 'Unassigned Provider',
    therapistRole: 'Provider',
    date: '2026-10-29',
    time: '02:00 PM',
    issue: 'Chronic stress',
    clinicalDetails: 'treatment pain',
    type: 'In-Person',
    status: 'In Session',
    visitHistory: 'New Patient'
  },
  {
    patientName: 'john doe',
    patientAge: 'N/A',
    patientEmail: 'john.doe@example.com',
    patientPhone: '(555) 123-4567',
    therapistName: 'Dr. Emily Chen',
    therapistRole: 'Provider',
    date: '2026-10-29',
    time: '10:00 AM',
    issue: 'Workplace burnout recovery',
    clinicalDetails: 'treatment plan',
    type: 'In-Person',
    status: 'Completed',
    visitHistory: 'New Patient'
  },
  {
    patientName: 'Manual Patient',
    patientAge: 'N/A',
    patientEmail: 'manual.patient@example.com',
    patientPhone: '(555) 654-3210',
    therapistName: 'Dr. Smith',
    therapistRole: 'Provider',
    date: '2026-10-29',
    time: '11:00 AM',
    issue: 'Manual clinical intake',
    clinicalDetails: 'Testing manual patient addition',
    type: 'In-Person',
    status: 'In Session',
    visitHistory: 'New Patient'
  },
  {
    patientName: 'Final Test',
    patientAge: 'N/A',
    patientEmail: 'final.test@example.com',
    patientPhone: '(555) 789-0123',
    therapistName: 'Unassigned Provider',
    therapistRole: 'Provider',
    date: '2026-10-29',
    time: '09:00 AM',
    issue: 'Routine wellness assessment',
    clinicalDetails: 'Routine checkup',
    type: 'In-Person',
    status: 'Upcoming',
    visitHistory: 'New Patient'
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mindcare';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
    console.log('Connected to MongoDB for seeding...');

    // Clean existing
    await User.deleteMany({});
    await Therapist.deleteMany({});
    await Appointment.deleteMany({});
    await BlogPost.deleteMany({});

    // 1. Seed Users (Admin & Patient)
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const patientPassword = await bcrypt.hash('patient123', salt);

    await User.create([
      {
        name: 'Clinic Staff Admin',
        email: 'admin@mindease.com',
        password: adminPassword,
        role: 'admin'
      },
      {
        name: 'Clinic Staff',
        email: 'kp123@me.com',
        password: adminPassword,
        role: 'admin'
      },
      {
        name: 'John Patient',
        email: 'patient@mindease.com',
        password: patientPassword,
        role: 'patient'
      }
    ]);
    console.log('✅ Users seeded (Admin: admin@mindease.com / admin123, Patient: patient@mindease.com / patient123)');

    // 2. Seed Therapists
    await Therapist.insertMany(therapistsData);
    console.log(`✅ ${therapistsData.length} Therapists seeded`);

    // 3. Seed Appointments
    await Appointment.insertMany(appointmentsData);
    console.log(`✅ ${appointmentsData.length} Appointments seeded`);

    // 4. Seed Blogs
    await BlogPost.insertMany(blogPostsData);
    console.log(`✅ ${blogPostsData.length} Blog Posts seeded`);

    console.log('🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.warn('⚠️ Seeding skipped or MongoDB not reachable:', error.message);
    process.exit(0);
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = { seedDB, therapistsData, blogPostsData, appointmentsData };
