import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Customer from '../../../../models/Customer';

// GET a customer by ID
export async function GET({ params }) {
  await dbConnect();
  try {
    const customer = await Customer.findById(params.id);
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

// PUT (update) a customer by ID
export async function PUT({ params, request }) {
  await dbConnect();
  try {
    const data = await request.json();
    const updatedCustomer = await Customer.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}

// DELETE a customer by ID
export async function DELETE({ params }) {
  await dbConnect();
  try {
    await Customer.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Customer deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
