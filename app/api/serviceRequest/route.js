import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import ServiceRequest from '../../../models/ServiceRequest';

// GET all service requests
export async function GET() {
  await dbConnect();
  try {
    const serviceRequests = await ServiceRequest.find().populate('customer vehicle');
    return NextResponse.json(serviceRequests);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service requests' }, { status: 500 });
  }
}

// POST (create) a new service request
export async function POST(request) {
  await dbConnect();
  try {
    const data = await request.json();
    const newServiceRequest = new ServiceRequest(data);
    await newServiceRequest.save();
    return NextResponse.json(newServiceRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service request' }, { status: 500 });
  }
}
