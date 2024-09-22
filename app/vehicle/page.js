"use client";
import React, { useEffect, useState } from 'react';

const VehiclePage = () => {
  const [vehicle, setVehicle] = useState({ brand: '', model: '', licensePlate: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('User not authenticated');
        return; // Exit if no token
      }
    
      try {
        const response = await fetch('/api/vehicle', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        console.log('Response Status:', response.status); // Log the response status
    
        if (!response.ok) {
          const errorText = await response.text(); // Read the error response as text
          console.error('Error Response:', errorText); // Log the error response
          throw new Error(errorText || 'Failed to fetch vehicle');
        }
    
        const data = await response.json();
        console.log('Fetched vehicle data:', data); // Log fetched data
    
        if (data.success && data.vehicle) {
          setVehicle(data.vehicle);
          setIsEditing(true); // Set editing mode if vehicle exists
        } else {
          setError('No vehicle found');
        }
      } catch (err) {
        console.error('Fetch error:', err); // Log fetch error details
        setError(err.message);
      }
    };
    

    fetchVehicle();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await fetch('/api/vehicle', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(vehicle),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save vehicle');
      }

      setSuccessMessage(`Vehicle ${isEditing ? 'updated' : 'created'} successfully!`);
      setError('');
      if (!isEditing) {
        setIsEditing(true); // Switch to editing mode after creating
      }
    } catch (err) {
      setError(err.message);
      setSuccessMessage('');
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await fetch('/api/vehicle', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete vehicle');
      }

      setSuccessMessage('Vehicle deleted successfully!');
      setVehicle({ brand: '', model: '', licensePlate: '' }); // Clear vehicle state
      setIsEditing(false); // Go back to create mode
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Vehicle' : 'Create Vehicle'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Brand"
          value={vehicle.brand}
          onChange={(e) => setVehicle({ ...vehicle, brand: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={vehicle.model}
          onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="License Plate"
          value={vehicle.licensePlate}
          onChange={(e) => setVehicle({ ...vehicle, licensePlate: e.target.value })}
          required
        />
        {isEditing ? (
          <>
            <button type="submit">Update</button>
            <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
              Delete Vehicle
            </button>
          </>
        ) : (
          <button type="submit">Create</button>
        )}
      </form>
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
    </div>
  );
};

export default VehiclePage;
