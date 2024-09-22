import Vehicle from '../../../../models/Vehicle'; // Ensure this path is correct
import { getSessionUser } from '../../../../lib/user'; // Ensure this path is correct
import connectToDatabase from '../../../../lib/mongodb'; // Ensure this path is correct

export async function POST(req) {
  await connectToDatabase();

  try {
    const { brand, model, licensePlate } = await req.json();
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    const user = await getSessionUser(token);

    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'User not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if the user already has a vehicle
    const existingVehicle = await Vehicle.findOne({ userId: user._id });
    if (existingVehicle) {
      return new Response(JSON.stringify({ success: false, error: 'User can only register one vehicle' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newVehicle = new Vehicle({ userId: user._id, brand, model, licensePlate });
    await newVehicle.save();

    return new Response(JSON.stringify({ success: true, vehicle: newVehicle }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving vehicle:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to create vehicle' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
