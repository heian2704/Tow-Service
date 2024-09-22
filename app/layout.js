'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/page.css';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const currentPath = router.pathname;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tow-service</title>
      </head>
      <body>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Tow-service</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className={`nav-item ${currentPath === '/serviceRequest' ? 'active' : ''}`}>
                  <a className="nav-link" href="/serviceRequest">Service Request</a>
                </li>
                <li className={`nav-item ${currentPath === '/vehicle' ? 'active' : ''}`}>
                  <a className="nav-link" href="/vehicle">Vehicle</a>
                </li>
                <li className={`nav-item ${currentPath === '/history' ? 'active' : ''}`}>
                  <a className="nav-link" href="/history">History</a>
                </li>
                {!isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <button className="btn btn-outline-primary me-2" onClick={() => setShowLoginModal(true)}>Login</button>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-primary" onClick={() => setShowRegisterModal(true)}>Register</button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="https://via.placeholder.com/30" alt="Profile" className="rounded-circle" />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="/profile">Profile</a></li>
                      <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <Container className="my-4">
          {children}
        </Container>

        {/* Modals */}
        <LoginModal 
          show={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
          onLoginSuccess={() => setIsAuthenticated(true)} 
        />
        <RegisterModal 
          show={showRegisterModal} 
          onClose={() => setShowRegisterModal(false)} 
          onRegisterSuccess={() => {
            setShowRegisterModal(false); // Close the register modal
            setShowLoginModal(true); // Open the login modal
          }} 
        />
      </body>
    </html>
  );
};

export default Layout;
