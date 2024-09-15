import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Vehicle from '../../../../models/Vehicle';

// GET a vehicle by ID
export async function GET({ params }) {
  await dbConnect();
  try {
    const vehicle = await Vehicle.findById(params.id).populate('owner');
    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }
    return NextResponse.json(vehicle);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vehicle' }, { status: 500 });
  }
}

// PUT (update) a vehicle by ID
export async function PUT({ params, request }) {
  await dbConnect();
  try {
    const data = await request.json();
    const updatedVehicle = await Vehicle.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updatedVehicle);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
  }
}

// DELETE a vehicle by ID
export async function DELETE({ params }) {
  await dbConnect();
  try {
    await Vehicle.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Vehicle deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
  }
}
