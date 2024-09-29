// src/components/Footer.js

import React from 'react';
import './Footer.css'; // Ensure the path is correct
import logo from './image/logo-white.png';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
        <img src={logo} alt="Your Logo" />
        </div>
        <h2>Stay Connected</h2>
        <p>Follow us on social media for the latest updates and offers!</p>
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i> {/* Font Awesome icon */}
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i> {/* Font Awesome icon */}
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i> {/* Font Awesome icon */}
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i> {/* Font Awesome icon */}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
