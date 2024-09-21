import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import ServiceRequest from '../../../../models/ServiceRequest';

// GET a service request by ID
export async function GET({ params }) {
  await dbConnect();
  try {
    const serviceRequest = await ServiceRequest.findById(params.id).populate('customer vehicle');
    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }
    return NextResponse.json(serviceRequest);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service request' }, { status: 500 });
  }
}

// PUT (update) a service request by ID
export async function PUT({ params, request }) {
  await dbConnect();
  try {
    const data = await request.json();
    const updatedServiceRequest = await ServiceRequest.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updatedServiceRequest);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service request' }, { status: 500 });
  }
}

// DELETE a service request by ID
export async function DELETE({ params }) {
  await dbConnect();
  try {
    await ServiceRequest.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Service request deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service request' }, { status: 500 });
  }
}
