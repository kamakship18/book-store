import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section contact">
            <h2>Contact Us</h2>
            <p><FontAwesomeIcon icon={faEnvelope} /> info@example.com</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Main Street</p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/books">Books</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Klavium Bookstore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
