import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { decodeToken } from './jwt'; // Import your decodeToken function

// Mongoose schema and model for users
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

// Get the session user from the token
export const getSessionUser = async (token) => {
  await connectToDatabase();
  
  const userId = decodeToken(token); // Use the decodeToken function
  if (!userId) {
    return null; // If the token is invalid, return null
  }
  
  return await User.findById(userId);
};

// Register user, verify user, update user, and get user by ID functions go here...


// Register user
export const registerUser = async (email, password) => {
  await connectToDatabase();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return { success: true, userId: newUser._id };
  } catch (error) {
    console.error('Error during user registration:', error);
    return { success: false, error: 'Registration failed. Please try again.' };
  }
};

// Verify user credentials
export const verifyUser = async (email, password) => {
  await connectToDatabase();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: 'Invalid email or password' };
    }

    return { success: true, userId: user._id, email: user.email };
  } catch (error) {
    console.error('Error during user verification:', error);
    return { success: false, error: 'Login failed. Please try again.' };
  }
};

// Update user details
export const updateUser = async (userId, email, password) => {
  await connectToDatabase();

  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return { success: true };
  } catch (error) {
    console.error('Error during user update:', error);
    return { success: false, error: 'Update failed. Please try again.' };
  }
};

// Fetch user data by ID
export const getUserById = async (userId) => {
  await connectToDatabase();

  try {
    const user = await User.findById(userId).select('email'); // Select only the email field
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Database query failed');
  }
};
