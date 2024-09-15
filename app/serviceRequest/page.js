"use client"; // Mark this as a Client Component

import { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Box, Button } from '@mui/material';
import ServiceCard from '../../components/ServiceCard';
import ServiceForm from '/Users/gunter/Documents/WebCode/Tow-Service/Tow-Service/components/ServicForm.js'; // Ensure this path is correct

const ServiceRequestPage = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await fetch('/api/serviceRequest');
        const data = await response.json();
        setServiceRequests(data);
      } catch (error) {
        console.error('Failed to fetch service requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, []);

  const handleCreateRequest = async (newRequest) => {
    try {
      const response = await fetch('/api/serviceRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      });
      const data = await response.json();
      setServiceRequests((prevRequests) => [...prevRequests, data]);
    } catch (error) {
      console.error('Failed to create service request:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Service Requests
      </Typography>
      <ServiceForm onSubmit={handleCreateRequest} />
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {serviceRequests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request._id}>
              <ServiceCard request={request} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ServiceRequestPage;
