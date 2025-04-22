import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBars } from 'react-icons/fa';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
      <a href="/" className="navbar-brand p-0">
        <h1 className="text-primary m-0">
          <FaMapMarkerAlt className="me-3" />
          Tourist
        </h1>
      </a>
      <button 
        className="navbar-toggler" 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          <a href="/" className="nav-item nav-link active">Home</a>
          <a href="/about" className="nav-item nav-link">About</a>
          <a href="/services" className="nav-item nav-link">Services</a>
          <a href="/packages" className="nav-item nav-link">Packages</a>
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              Pages
            </a>
            <div className="dropdown-menu m-0">
              <a href="/destination" className="dropdown-item">Destination</a>
              <a href="/booking" className="dropdown-item">Booking</a>
              <a href="/team" className="dropdown-item">Travel Guides</a>
              <a href="/testimonial" className="dropdown-item">Testimonial</a>
              <a href="/404" className="dropdown-item">404 Page</a>
            </div>
          </div>
          <a href="/contact" className="nav-item nav-link">Contact</a>
        </div>
        <a href="/register" className="btn btn-primary rounded-pill py-2 px-4 ms-3">Register</a>
      </div>
    </nav>
  );
};

export default Navigation; 