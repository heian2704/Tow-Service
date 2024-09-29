"use client";
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import withAuth from '../../components/withAuth';

const VehiclePage = () => {
  const [vehicle, setVehicle] = useState({ brand: '', model: '', licensePlate: '' });
  const [previousVehicle, setPreviousVehicle] = useState(null); // Store the previous state for revert
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return; // This will be handled by withAuth
      }

      try {
        const response = await fetch('/api/vehicle', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to fetch vehicle');
        }

        const data = await response.json();

        if (data.success && data.vehicle) {
          setVehicle(data.vehicle);
          setPreviousVehicle(data.vehicle); // Set initial vehicle state for revert
          setIsEditing(true);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVehicle();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      return; // This will be handled by withAuth
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

      setAlertMessage(`Vehicle ${isEditing ? 'updated' : 'created'} successfully!`);
      setShowAlert(true); // Show pop-out alert
      setError(''); // Clear any previous error

      setPreviousVehicle(vehicle); // Update the previous state to the current vehicle

      if (!isEditing) {
        setIsEditing(true); // Lock fields after creation
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = () => {
    setShowConfirmDelete(true); // Show confirmation dialog for delete
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return; // This will be handled by withAuth
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

      setAlertMessage('Vehicle deleted successfully!');
      setShowAlert(true); // Show pop-out alert
      setVehicle({ brand: '', model: '', licensePlate: '' }); // Reset the vehicle fields
      setIsEditing(false); // Reset to create mode
      setPreviousVehicle(null); // Clear previous vehicle state
    } catch (err) {
      setError(err.message);
    } finally {
      setShowConfirmDelete(false); // Hide confirmation dialog
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false); // Hide confirmation dialog
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">{isEditing ? 'Edit Vehicle' : 'Create Vehicle'}</h1>
      <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter vehicle brand"
            value={vehicle.brand}
            onChange={(e) => setVehicle({ ...vehicle, brand: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter vehicle model"
            value={vehicle.model}
            onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>License Plate</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter license plate"
            value={vehicle.licensePlate}
            onChange={(e) => setVehicle({ ...vehicle, licensePlate: e.target.value })}
            required
          />
        </Form.Group>
        <div className="text-center">
          {isEditing ? (
            <>
              <Button type="submit" variant="primary" className="me-2">
                Update
              </Button>
              <Button type="button" onClick={handleDelete} variant="danger">
                Delete Vehicle
              </Button>
            </>
          ) : (
            <Button type="submit" variant="success">
              Create
            </Button>
          )}
        </div>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {/* Success Alert Modal */}
      <Modal show={showAlert} onHide={() => setShowAlert(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{alertMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlert(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={showConfirmDelete} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this vehicle? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default withAuth(VehiclePage);
