import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db = null;

const connectToDatabase = async () => {
  if (db) return db;
  await client.connect();
  db = client.db();
  return db;
};

export const registerUser = async (email, password) => {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  // Check if the email already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return { success: false, error: 'Email already exists' };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  try {
    const result = await usersCollection.insertOne({ email, password: hashedPassword });
    return { success: true, userId: result.insertedId };
  } catch (error) {
    console.error('Error inserting user:', error);
    return { success: false, error: 'Registration failed. Please try again.' };
  }

  
};
