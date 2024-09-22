import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return; // Already connected
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectToDatabase;
