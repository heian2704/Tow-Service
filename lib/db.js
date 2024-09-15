// lib/db.js

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

async function dbConnect() {
  if (cached && cached.connection.readyState === 1) {
    return cached.connection;
  }

  if (!cached) {
    cached = global.mongoose = { connection: null };
  }

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cached.connection = conn;
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
}

export default dbConnect;
