import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Vehicle from '../../../models/Vehicle';

// GET all vehicles
export async function GET() {
  await dbConnect();
  try {
    const vehicles = await Vehicle.find().populate('owner');
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}

// POST (create) a new vehicle
export async function POST(request) {
  await dbConnect();
  try {
    const data = await request.json();
    const newVehicle = new Vehicle(data);
    await newVehicle.save();
    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}
