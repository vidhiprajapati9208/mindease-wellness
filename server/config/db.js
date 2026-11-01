const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Windows ISP DNS SRV resolution issue with MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  // Ignore in restricted environments
}

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mindcare';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;

    console.log('\n======================================================');
    console.log('✅ MONGODB ATLAS CONNECTED SUCCESSFULLY!');
    console.log(`🌍 Host: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
    console.log(`🟢 Status: Ready & Accepting Requests`);
    console.log('======================================================\n');
    return true;
  } catch (error) {
    console.warn('\n======================================================');
    console.warn(`⚠️ Warning: MongoDB Connection Failed (${error.message})`);
    console.warn('👉 Operating in resilient offline fallback mode.');
    console.warn('======================================================\n');
    isConnected = false;
    return false;
  }
};

const getStatus = () => isConnected;

module.exports = { connectDB, getStatus };
