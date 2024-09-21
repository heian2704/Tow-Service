// app/vehicle/page.js

'use client'; // Add this line to mark the file as a Client Component

import { useEffect, useState } from 'react';
import withAuth from '../../components/withAuth'; 
function VehiclePage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch vehicles data from API
    async function fetchVehicles() {
      const response = await fetch('/api/vehicle');
      const data = await response.json();
      setVehicles(data);
    }

    fetchVehicles();
  }, []);

  return (
    <div>
      <h1>Vehicles</h1>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle._id}>
            {vehicle.brand} {vehicle.model} ({vehicle.licensePlate})
          </li>
        ))}
      </ul>
    </div>
  );
}
export default withAuth(VehiclePage);