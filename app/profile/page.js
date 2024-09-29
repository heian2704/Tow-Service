'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material'; // Import MUI Button for consistency
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/custom.css'; // Your custom CSS
const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••'); // Masked password
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/'); // Redirect to home page if not authenticated
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setEmail(data.email);
        } else {
          throw new Error('Failed to load user data');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setMessage('An error occurred while fetching user data');
      }
    };

    fetchUserData();
  }, [router]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || 'Update failed. Please try again.');
        return;
      }

      setMessage('Profile updated successfully.');
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating user data:', err);
      setMessage('Update failed. Please try again.');
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setPassword(''); // Clear the password field when editing
  };

  // Redirect to home if user is not authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/'); // Redirect to home page if not authenticated
    }
  }, [router]);

  return (
    <div className="container mt-4">
      <h2>Profile Page</h2>
      {message && <p>{message}</p>}

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email: </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!editMode}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password: </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={editMode ? password : '••••••'}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!editMode}
        />
      </div>

      <div className="mb-3">
        {editMode ? (
          <Button variant="contained" color="primary" onClick={handleUpdate}>Save Changes</Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleEdit}>Update Info</Button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
