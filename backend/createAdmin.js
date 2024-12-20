const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const {hash1}  = require('./utils/helpers');

require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/libraryDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if the admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin already exists!');
      return;
    }

    // Create a new admin user
    //const adminPassword = await bcrypt.hash('adminpassword', 10); // Choose a secure password
    const rawPassword = 'admin';
    const adminPassword = hash1(rawPassword);
    const admin = new User({
      userId: 'a01',
      username: 'adminAuto',
      email: 'adminauto@library.com',
      password: adminPassword, 
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();



