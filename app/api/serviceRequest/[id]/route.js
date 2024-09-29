import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import ServiceRequest from '../../../../models/ServiceRequest';

// GET a service request by ID
export async function GET(req, { params }) {
  await dbConnect();
  try {
    // Only populate 'vehicle' since 'customer' isn't part of the schema
    const serviceRequest = await ServiceRequest.findById(params.id).populate('vehicle');
    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }
    return NextResponse.json(serviceRequest);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service request' }, { status: 500 });
  }
}

// PUT (update) a service request by ID
export async function PUT(req) {
  await dbConnect();

  try {
    const id = req.url.split('/').pop(); // Get the ID from the URL

    const data = await req.json(); // Parse incoming request data

    console.log('Request Body:', data); // Log the request body

    // Check if the request body contains the necessary fields
    if (!data.description || !data.location || !data.requestType) {
      throw new Error('Missing required fields: description, location, or requestType');
    }

    // Update the service request
    const updatedServiceRequest = await ServiceRequest.findByIdAndUpdate(id, data, { new: true });

    if (!updatedServiceRequest) {
      throw new Error('Service request not found');
    }

    // Return the updated document
    return NextResponse.json(updatedServiceRequest, { status: 200 });
  } catch (error) {
    console.error("Error updating service request:", error);
    return NextResponse.json(
      { error: 'Failed to update service request' },
      { status: 500 }
    );
  }
}


// DELETE (delete) a service request by ID
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    // Attempt to delete the service request by ID
    const deletedRequest = await ServiceRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return NextResponse.json(
        { success: false, message: 'Service request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Service request deleted' });
  } catch (error) {
    console.error('Error deleting service request:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
