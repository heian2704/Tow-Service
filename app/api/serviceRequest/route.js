import { NextResponse } from 'next/server';
import ServiceRequest from '@/models/ServiceRequest';
import connectToDatabase from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';
import { verify } from 'jsonwebtoken'; // For JWT verification

export const config = {
  api: {
    bodyParser: false,  // Disable bodyParser for handling formData requests
  },
};

// Helper function to save the image to the public/uploads folder
async function saveImageFile(imageFile) {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, imageFile.name);

  const buffer = await imageFile.arrayBuffer(); // Convert Blob to ArrayBuffer
  fs.writeFileSync(filePath, Buffer.from(buffer)); // Save image to disk

  return `/uploads/${imageFile.name}`; // Return the relative path to be saved in DB
}

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the Authorization header
    const token = req.headers.get('authorization');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Extract the JWT token from the Bearer scheme
    const tokenValue = token.replace('Bearer ', '');

    // Verify the token and get the userId
    const decoded = verify(tokenValue, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Parse the form data
    const formData = await req.formData();

    // Extract fields from the formData
    const description = formData.get('description');
    const location = formData.get('location');
    const requestType = formData.get('requestType');
    const status = formData.get('status') || 'Pending';
    const imageFile = formData.get('image'); // This will be a Blob or File object

    // Validation check for required fields
    if (!description || !location || !requestType) {
      return NextResponse.json(
        { success: false, message: 'All fields (description, location, requestType) are required' },
        { status: 400 }
      );
    }

    // Handle the image file (if it exists)
    let imageUrl = '';
    if (imageFile) {
      // Save the image to public/uploads and get the URL
      imageUrl = await saveImageFile(imageFile);
    }

    // Create the new service request with the userId from the decoded token
    const newRequest = await ServiceRequest.create({
      description,
      location,
      requestType,
      status,
      image: imageUrl, // Save the image URL/path in the DB
      userId: decoded.userId, // Attach the userId from the JWT
    });

    console.log('Service request created successfully:', newRequest);

    // Return the new request as the response
    return NextResponse.json({ success: true, newRequest }, { status: 201 });
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json({ success: false, message: 'Failed to create service request' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the Authorization header
    const token = req.headers.get('authorization');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Extract the JWT token from the Bearer scheme
    const tokenValue = token.replace('Bearer ', '');

    // Verify the token and get the userId
    const decoded = verify(tokenValue, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Fetch all service requests for the authenticated user
    const serviceRequests = await ServiceRequest.find({ userId: decoded.userId });

    // Return the service requests
    return NextResponse.json({ success: true, serviceRequests }, { status: 200 });
  } catch (error) {
    console.error("Error fetching service requests:", error);
    return NextResponse.json({ error: 'Failed to fetch service requests' }, { status: 500 });
  }
}