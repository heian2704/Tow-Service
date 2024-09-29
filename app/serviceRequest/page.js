"use client"; // Mark this as a Client Component

import { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Box, Grid } from '@mui/material';
import ServiceForm from '../../components/ServicForm'; // Ensure the path is correct
import ServiceCard from '../../components/ServiceCard'; // Import the ServiceCard component

const ServiceRequestPage = () => {
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState(''); // Manage error state
  const [serviceRequests, setServiceRequests] = useState([]); // Manage service requests

  // Function to fetch service requests from the server
  const fetchServiceRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

      const response = await fetch('/api/serviceRequest', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include the Authorization header with the token
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch service requests');
        throw new Error(errorData.message || 'Failed to fetch service requests');
      }

      const data = await response.json();
      console.log('Service Requests Fetched:', data);
      setServiceRequests(data.serviceRequests); // Store fetched service requests in state
    } catch (error) {
      console.error('Failed to fetch service requests:', error);
      setError('An error occurred while fetching service requests.');
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new service request
  const handleCreateRequest = async (newRequest) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

      const response = await fetch('/api/serviceRequest', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include the Authorization header with the token
        },
        body: newRequest, // newRequest is the FormData object from ServiceForm
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create service request');
        throw new Error(errorData.message || 'Failed to create service request');
      }

      const data = await response.json();
      console.log('Service Request Created:', data);
      setServiceRequests([...serviceRequests, data.newRequest]); // Add the new request to the list
      alert('Service request created successfully!');
    } catch (error) {
      console.error('Failed to create service request:', error);
      setError('An error occurred while creating the service request.');
    } finally {
      setLoading(false);
    }
  };

  // Function to update an existing service request
  const handleUpdateRequest = async (requestId, updatedData) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

      const response = await fetch(`/api/serviceRequest/${requestId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Include Authorization token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Send updated data as JSON
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(errorMessage.message || 'Failed to update service request');
        throw new Error(errorMessage.message || 'Failed to update service request');
      }

      const updatedRequest = await response.json();
      console.log('Service Request Updated:', updatedRequest);
      // Update the state with the updated request data
      setServiceRequests((prevRequests) =>
        prevRequests.map((r) => (r._id === requestId ? updatedRequest : r))
      );
      alert('Service request updated successfully!');
    } catch (error) {
      console.error('Failed to update service request:', error);
      setError('An error occurred while updating the service request.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch service requests when the component is mounted
  useEffect(() => {
    fetchServiceRequests(); // Fetch service requests on page load
  }, []); // Only run once when the component mounts

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Create a Service Request
      </Typography>

      {/* Service Form */}
      <Box sx={{ mt: 4, mb: 4, p: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 }}>
        {error && <Typography color="error">{error}</Typography>}
        <ServiceForm onSubmit={handleCreateRequest} />
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        )}
      </Box>

      {/* Service Requests List */}
      <Grid container spacing={4}>
        {serviceRequests.map((request) => (
          <Grid item xs={12} sm={6} key={request._id}>
            <ServiceCard
              request={request}
              vehicle={null} // You can pass vehicle info here if available
              showDelete={false} // Pass showDelete prop to hide the delete button
              onUpdate={(updatedData) => handleUpdateRequest(request._id, updatedData)} // Call update function
            />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {!loading && serviceRequests.length === 0 && (
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 4 }}>
          No service requests found.
        </Typography>
      )}
    </Container>
  );
};

export default ServiceRequestPage;
