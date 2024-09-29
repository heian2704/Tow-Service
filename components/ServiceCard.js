import { Card, CardContent, Typography, CardMedia, IconButton, Button, TextField, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';

const ServiceCard = ({ request, vehicle, onDelete, onUpdate, showDelete = true }) => {
  const [userEmail, setUserEmail] = useState('');
  const [status, setStatus] = useState(request.status || 'Pending');
  const [timer, setTimer] = useState(20); // Set the timer to 20 seconds
  const [isEditing, setIsEditing] = useState(false); // Editing mode state
  const [formData, setFormData] = useState({
    description: request.description || '',
    location: request.location || '',
    requestType: request.requestType || 'Tow', // Default to 'Tow'
    status: request.status || 'Pending', // Ensure status is part of the formData
  });

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Handle countdown logic
  useEffect(() => {
    if (status !== 'Completed' && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup interval
    } else if (timer <= 0) {
      setStatus('Completed');
    }
  }, [status, timer]);

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    // Ensure that all required fields are present
    if (!formData.description || !formData.location || !formData.requestType) {
      alert('Please fill all required fields');
      return;
    }

    const updatedData = {
      description: formData.description,
      location: formData.location,
      requestType: formData.requestType,
      status: formData.status, // Ensure you're sending the status as well
    };

    // Call the onUpdate function passed as a prop
    await onUpdate(updatedData); // Notify the parent to update state

    setIsEditing(false); // Exit edit mode
  };

  return (
    <Card sx={{ marginBottom: 2, maxWidth: 800, mx: 'auto', boxShadow: 3 }}>
      {isEditing ? (
        <Box component="form" onSubmit={handleUpdateSubmit} sx={{ p: 2 }}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Request Type</InputLabel>
            <Select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              required
            >
              <MenuItem value="Tow">Tow</MenuItem>
              <MenuItem value="Battery Jump">Battery Jump</MenuItem>
              <MenuItem value="Fuel Delivery">Fuel Delivery</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      ) : (
        <>
          <CardMedia
            component="img"
            height="250"
            image={request.image || '/assets/broke.jpg'}
            alt="Service Request Image"
            sx={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              {request.description || 'No Description'}
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 1 }}>
              <strong>Location:</strong> {request.location || 'No Location Provided'}
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 1 }}>
              <strong>Request Type:</strong> {request.requestType || 'Unknown'}
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 1 }}>
              <strong>Vehicle License Plate:</strong> {vehicle?.licensePlate || 'No Vehicle Info'}
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 1 }}>
              <strong>Status:</strong> {status} {status !== 'Completed' && `${timer}s remaining`}
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              <strong>Requested by:</strong> {userEmail || 'Unknown User'}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                aria-label="edit"
                onClick={handleEditClick}
                sx={{ color: 'blue', mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              {/* Conditionally render the Delete button only if showDelete is true */}
              {showDelete && (
                <IconButton
                  aria-label="delete"
                  onClick={onDelete}
                  sx={{ color: status === 'Completed' ? 'red' : 'gray' }}
                  disabled={status !== 'Completed'}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default ServiceCard;
