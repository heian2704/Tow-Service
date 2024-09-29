import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginModal = ({ show, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setIsSuccess(false); // Indicate failure
        setMessage(result.error || 'Login failed. Please try again.');
      } else {
        localStorage.setItem('authToken', result.token); // Save token in local storage
        onLoginSuccess();
        setIsSuccess(true); // Indicate success
        setMessage('Login successful! Welcome back.');
        // Optionally close the modal after a short delay
        setTimeout(() => {
          onClose();
        }, 2000); // Adjust the timeout duration as needed
      }
    } catch (err) {
      console.error('Login error:', err);
      setIsSuccess(false); // Indicate failure
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </Form.Group>
          {/* Display message based on login result */}
          {message && (
            <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
              {message}
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
