/**
 * Seeds the default administrator account defined in .env
 * (ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD).
 *
 * Usage: npm run seed:admin
 *
 * Administrator accounts are not created through public registration -
 * this script is the only supported way to create one, per the project
 * specification (Chapter 5.4 - Admins Collection).
 */
const dns=require("dns");
dns.setServers(["1.1.1.1","8.8.8.8"]);
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

const run = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  const name = process.env.ADMIN_NAME || 'Campus Admin';
  const email = (process.env.ADMIN_EMAIL || 'admin@campusopportunityfinder.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';

  try {
    const existing = await Admin.findOne({ email });

    if (existing) {
      console.log(`Admin account already exists for ${email}. Skipping.`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await Admin.create({ name, email, password: hashedPassword });

      console.log('Default administrator account created successfully:');
      console.log(`  Email:    ${email}`);
      console.log(`  Password: ${password}`);
      console.log('Please change this password after first login in a production deployment.');
    }
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed administrator account:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

run();
