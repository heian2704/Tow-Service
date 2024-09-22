import Vehicle from '../../../models/Vehicle';
import { verifyToken } from '../../../lib/jwt';
import connectToDatabase from '../../../lib/mongodb';

export async function GET(req) {
  await connectToDatabase();
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return new Response(JSON.stringify({ success: false, error: 'User not authenticated' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = decodedToken.userId;
  const vehicle = await Vehicle.findOne({ userId });

  if (!vehicle) {
    // Return a message indicating that the user needs to create a vehicle
    return new Response(JSON.stringify({ success: true, message: 'No vehicle found. Please create one.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true, vehicle }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  await connectToDatabase();
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return new Response(JSON.stringify({ success: false, error: 'User not authenticated' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = decodedToken.userId;
  const { brand, model, licensePlate } = await req.json();

  // Check if the user already has a vehicle
  const existingVehicle = await Vehicle.findOne({ userId });
  if (existingVehicle) {
    return new Response(JSON.stringify({ success: false, error: 'User can only register one vehicle' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const newVehicle = new Vehicle({ userId, brand, model, licensePlate });
  await newVehicle.save();

  return new Response(JSON.stringify({ success: true, vehicle: newVehicle }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(req) {
  await connectToDatabase();
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return new Response(JSON.stringify({ success: false, error: 'User not authenticated' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = decodedToken.userId;
  const { brand, model, licensePlate } = await req.json();

  const vehicle = await Vehicle.findOne({ userId });
  if (!vehicle) {
    return new Response(JSON.stringify({ success: false, error: 'Vehicle not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  vehicle.brand = brand;
  vehicle.model = model;
  vehicle.licensePlate = licensePlate;
  await vehicle.save();

  return new Response(JSON.stringify({ success: true, vehicle }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(req) {
  await connectToDatabase();
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return new Response(JSON.stringify({ success: false, error: 'User not authenticated' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = decodedToken.userId;
  const vehicle = await Vehicle.findOneAndDelete({ userId });
  if (!vehicle) {
    return new Response(JSON.stringify({ success: false, error: 'Vehicle not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true, message: 'Vehicle deleted successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
