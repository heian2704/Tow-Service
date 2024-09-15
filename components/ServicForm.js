// /components/ServiceForm.js
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ServiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      description: '',
      location: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
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
      <Button type="submit" variant="contained" color="primary">
        Create Request
      </Button>
    </Box>
  );
};

export default ServiceForm;
