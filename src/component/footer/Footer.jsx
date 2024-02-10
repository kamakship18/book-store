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
            <p><FontAwesomeIcon icon={faEnvelope} />kp@gmail.com</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Chitkara University</p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
            <li><a href="https://github.com/kamakship18">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Kalvium Bookstore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
