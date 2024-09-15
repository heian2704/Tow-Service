// /app/page.js
'use client';

import { Container, Typography, Button, Stack } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Typography variant="h1" component="h1" gutterBottom>
        Welcome to the Roadside Assistance Service
      </Typography>
      <Stack spacing={2}>
        <Button variant="contained" color="primary" href="/serviceRequest">
          Go to Service Requests
        </Button>
        <Button variant="contained" color="secondary" href="/vehicle">
          Go to Vehicles
        </Button>
        <Button variant="contained" color="success" href="/customer">
          Go to Customers
        </Button>
      </Stack>
    </Container>
  );
}
