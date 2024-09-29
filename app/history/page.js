"use client"; // Ensure this runs on the client side

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ServiceCard from '../../components/ServiceCard';
import { fetchWithAuth } from '../api/utils/fetchWithAuth';

const HistoryPage = () => {
  const [vehicle, setVehicle] = useState(null); // Initialize vehicle state
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch vehicle data for the logged-in user
  const fetchVehicle = async () => {
    try {
      const response = await fetchWithAuth('/api/vehicle', { method: 'GET' });
      const vehicleData = await response.json();

      if (vehicleData.success) {
        setVehicle(vehicleData.vehicle); // Set vehicle state
      } else {
        setError(vehicleData.message || 'Failed to fetch vehicle');
      }
    } catch (err) {
      setError('Error fetching vehicle data');
    }
  };

  // Fetch service requests for the logged-in user
  const fetchServiceRequests = async () => {
    try {
      const response = await fetchWithAuth('/api/serviceRequest', { method: 'GET' });
      const requestData = await response.json();

      if (requestData.success) {
        setServiceRequests(requestData.serviceRequests); // Only user's requests
      } else {
        setError(requestData.message || 'Failed to fetch service requests');
      }
    } catch (err) {
      setError('Error fetching service requests');
    } finally {
      setLoading(false);
    }
  };

  // Handle updating a service request
  const handleUpdate = async (requestId, updatedData) => {
    try {
      const response = await fetchWithAuth(`/api/serviceRequest/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // Update the local state with the updated request data
        const updatedRequest = await response.json();
        setServiceRequests((prevRequests) =>
          prevRequests.map((r) => (r._id === requestId ? updatedRequest : r))
        );
        console.log('Service request updated successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to update service request:', errorData.message);
      }
    } catch (error) {
      console.error('Error updating service request:', error);
    }
  };

  // Handle deleting a service request
  const handleDelete = async (requestId) => {
    try {
      const response = await fetchWithAuth(`/api/serviceRequest/${requestId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServiceRequests((prevRequests) =>
          prevRequests.filter((r) => r._id !== requestId)
        );
        console.log('Service request deleted successfully');
      } else {
        console.error('Failed to delete service request');
      }
    } catch (error) {
      console.error('Error deleting service request:', error);
    }
  };

  // Fetch vehicle and service requests on component mount
  useEffect(() => {
    fetchVehicle();
    fetchServiceRequests();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Service History
      </Typography>
      {serviceRequests.length > 0 ? (
        serviceRequests.map((request) => (
          <ServiceCard
            key={request._id}
            request={request}
            vehicle={vehicle || null}  // Ensure vehicle is either valid data or null
            onDelete={() => handleDelete(request._id)}  // Pass delete handler
            onUpdate={(updatedData) => handleUpdate(request._id, updatedData)}  // Pass update handler
          />
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          No service requests found.
        </Typography>
      )}
    </Container>
  );
};

export default HistoryPage;
