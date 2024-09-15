import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Customer from '../../../models/Customer';

// GET all customers
export async function GET() {
  await dbConnect();
  try {
    const customers = await Customer.find();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

// POST (create) a new customer
export async function POST(request) {
  await dbConnect();
  try {
    const data = await request.json();
    const newCustomer = new Customer(data);
    await newCustomer.save();
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}
