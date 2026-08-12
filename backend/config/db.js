const mongoose = require('mongoose');

/**
 * Connects to MongoDB Atlas using the connection string defined in
 * MONGODB_URI (see backend/.env.example). Throws on failure instead of
 * exiting the process directly, so callers (server.js, seed scripts) can
 * decide how to react - e.g. exit cleanly, or in tests, retry.
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined. Set it in your .env file to your MongoDB Atlas connection string.'
    );
  }

  try {
    
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    return conn;
  } catch (error) {
    // Surface common Atlas misconfigurations with an actionable message
    // instead of a raw driver stack trace.

    let hint = '';
    if (error.name === 'MongoServerSelectionError') {
      hint =
        ' This usually means your IP address is not whitelisted in Atlas Network Access, ' +
        'or the cluster address in MONGODB_URI is incorrect.';
    } else if (error.message && error.message.includes('bad auth')) {
      hint = ' Check that the username and password in MONGODB_URI are correct.';
    } else if (error.message && error.message.includes('ENOTFOUND')) {
      hint = ' Could not resolve the Atlas cluster hostname - check MONGODB_URI for typos.';
    }

    throw new Error(`Failed to connect to MongoDB Atlas: ${error.message}.${hint}`);
  }
};

module.exports = connectDB;
