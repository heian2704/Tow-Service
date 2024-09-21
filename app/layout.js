'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS is included
import '../styles/page.css';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const router = useRouter(); 
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setUser({ email: 'user@example.com' }); // Replace with actual user fetching logic
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the auth token
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/'; // Redirect to home page using window.location
  };


  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your description here" />
        <title>My Company</title>
      </head>
      <body>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">My Company</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/serviceRequest">Service Request</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/vehicle">Vehicle</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/history">History</a>
              </li>
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <button className="btn btn-primary" onClick={() => setShowLoginModal(true)}>Login</button>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-secondary" onClick={() => setShowRegisterModal(true)}>Register</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/profile">Profile</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="https://via.placeholder.com/30" alt="Profile" className="rounded-circle" />
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="/profile">Profile</a></li>
                      <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <Container>
          {children}
        </Container>
        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} onLoginSuccess={() => setIsAuthenticated(true)} />
        <RegisterModal show={showRegisterModal} onClose={() => setShowRegisterModal(false)} onRegisterSuccess={() => setIsAuthenticated(true)} />
      </body>
    </html>
  );
};

export default Layout;
