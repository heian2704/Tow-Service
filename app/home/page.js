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
        interval: 5000, // Adjust the interval if needed
        ride: 'carousel'
      });
    }
  }, []);

  return (
    <div className="home-container bg-light min-vh-100">
      {/* Carousel */}
      <section className="carousel-section my-4">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="https://via.placeholder.com/1600x600?text=Slide+1" alt="First slide" />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="display-4">Welcome to Our Service</h5>
                <p className="lead">Experience top-notch services tailored to your needs.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://via.placeholder.com/1600x600?text=Slide+2" alt="Second slide" />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="display-4">Reliable and Fast</h5>
                <p className="lead">Count on us for prompt and reliable service.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://via.placeholder.com/1600x600?text=Slide+3" alt="Third slide" />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="display-4">Customer Satisfaction</h5>
                <p className="lead">Your satisfaction is our top priority.</p>
              </div>
            </div>
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

      {/* What We Offer */}
      <section className="what-we-offer py-5 bg-white">
        <div className="container">
          <h2 className="font-weight-bold mb-4 text-center text-dark">What We Offer</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card service-card text-center shadow-lg border-light">
                <img className="card-img-top mb-3" src="https://via.placeholder.com/150" alt="Towing" />
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">Towing</h5>
                  <p className="card-text">24/7 towing services for any vehicle breakdown.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card service-card text-center shadow-lg border-light">
                <img className="card-img-top mb-3" src="https://via.placeholder.com/150" alt="Fuel Delivery" />
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">Fuel Delivery</h5>
                  <p className="card-text">Emergency fuel delivery service to get you back on the road.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card service-card text-center shadow-lg border-light">
                <img className="card-img-top mb-3" src="https://via.placeholder.com/150" alt="Battery Jumpstart" />
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">Battery Jumpstart</h5>
                  <p className="card-text">Battery jumpstart services for vehicles with dead batteries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5 bg-light">
        <div className="container">
          <h2 className="font-weight-bold mb-4 text-center text-dark">What Our Clients Say</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card testimonial p-4 shadow-sm border-light">
                <div className="card-body">
                  <p className="card-text">"Fantastic service! The team arrived quickly and got me back on the road in no time. Highly recommend!"</p>
                  <h6 className="card-subtitle mb-2 text-muted">John Doe</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card testimonial p-4 shadow-sm border-light">
                <div className="card-body">
                  <p className="card-text">"Excellent customer service. They handled my car breakdown with professionalism and care. Will use again if needed."</p>
                  <h6 className="card-subtitle mb-2 text-muted">Jane Smith</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card testimonial p-4 shadow-sm border-light">
                <div className="card-body">
                  <p className="card-text">"Very reliable towing service. They were there when they said they would be and were very helpful. Thank you!"</p>
                  <h6 className="card-subtitle mb-2 text-muted">Emily Johnson</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
