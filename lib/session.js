import { MongoClient } from 'mongodb';

// Configure your MongoDB client
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('your_database_name');
const usersCollection = db.collection('users');
const sessionsCollection = db.collection('sessions');

export async function getSessionUser(sessionId) {
  const session = await sessionsCollection.findOne({ _id: sessionId });
  if (!session) return null;

  const user = await usersCollection.findOne({ _id: session.userId });
  return user;
}

export async function updateUser(userId, updateData) {
  await usersCollection.updateOne({ _id: userId }, { $set: updateData });
}

