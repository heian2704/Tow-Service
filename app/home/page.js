"use client"; // Ensure this runs on the client side

import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS is included
import '../../styles/custom.css'; // Import the custom CSS

const HomePage = () => {
  useEffect(() => {
    const bootstrap = window.bootstrap;
    if (bootstrap) {
      const carousel = document.querySelector('#carouselExample');
      if (carousel) new bootstrap.Carousel(carousel, {
        interval: 5000,
        ride: 'carousel'
      });
    }
  }, []);

  return (
    <div className="home-container bg-light min-vh-100">
      {/* Hero Section with Carousel */}
      <section className="carousel-section my-4">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {[
              {
                imgSrc: "https://via.placeholder.com/1600x600?text=Slide+1",
                title: "Welcome to Tow-Service",
                text: "Your trusted partner for reliable towing and roadside assistance."
              },
              {
                imgSrc: "https://via.placeholder.com/1600x600?text=Slide+2",
                title: "Fast and Reliable",
                text: "Count on us to get you back on the road quickly."
              },
              {
                imgSrc: "https://via.placeholder.com/1600x600?text=Slide+3",
                title: "Customer Satisfaction Guaranteed",
                text: "Your safety and satisfaction are our top priorities."
              },
            ].map((slide, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <img className="d-block w-100" src={slide.imgSrc} alt={`Slide ${index + 1}`} />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-4 rounded animate__animated animate__fadeIn">
                  <h5 className="display-4">{slide.title}</h5>
                  <p className="lead">{slide.text}</p>
                </div>
              </div>
            ))}
          </div>
          <a className="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services py-5 bg-white">
        <div className="container">
          <h2 className="font-weight-bold mb-4 text-center text-dark">Our Services</h2>
          <div className="row">
            {["Towing", "Fuel Delivery", "Battery Jumpstart"].map((service, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card service-card text-center shadow-lg border-light transition-shadow hover-shadow">
                  <img className="card-img-top mb-3" src={`https://via.placeholder.com/150?text=${service}`} alt={service} />
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold">{service}</h5>
                    <p className="card-text">Description for {service} services.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5 bg-light">
        <div className="container">
          <h2 className="font-weight-bold mb-4 text-center text-dark">What Our Clients Say</h2>
          <div className="row">
            {["John Doe", "Jane Smith", "Emily Johnson"].map((client, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card testimonial p-4 shadow-lg border-light hover-shadow">
                  <div className="card-body">
                    <p className="card-text">"Fantastic service! Highly recommend!"</p>
                    <h6 className="card-subtitle mb-2 text-muted">{client}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="font-weight-bold mb-4">Need Immediate Assistance?</h2>
          <p className="lead">Contact us now at:</p>
          <p className="h4 mb-4">
            <a href="tel:+1234567890" className="text-light">+1 (234) 567-890</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
