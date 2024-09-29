import { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const ServiceForm = ({ onSubmit }) => { // Accept onSubmit prop
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    requestType: '',
    status: 'Pending',
  });
  const [image, setImage] = useState(null); // For image uploads
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Capture the image file
  };

  const handleCreateRequest = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.requestType) {
      setError('Please select a request type');
      return;
    }

    const formDataWithImage = new FormData();
    formDataWithImage.append('description', formData.description);
    formDataWithImage.append('location', formData.location);
    formDataWithImage.append('requestType', formData.requestType);
    formDataWithImage.append('status', formData.status);
    if (image) {
      formDataWithImage.append('image', image); // Include the image if available
    }

    setLoading(true);

    try {
      await onSubmit(formDataWithImage); // Pass FormData to the parent component
    } catch (error) {
      setError('Failed to create service request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleCreateRequest} noValidate autoComplete="off" encType="multipart/form-data">
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
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
      <TextField
        type="file"
        name="image"
        onChange={handleImageChange}
        fullWidth
        margin="normal"
        inputProps={{ accept: 'image/*' }} // Restrict to image files only
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Creating...' : 'Create Request'}
      </Button>
    </Box>
  );
};

export default ServiceForm;
