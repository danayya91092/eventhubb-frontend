import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col">
          <img src="/eventhublogo.svg" alt="Eventhub" className="footer-logo" />
          <p>We offer end-to-end event management services, ensuring every celebration is seamless and unforgettable.</p>
        </div>
        <div className="footer-col">
          <h3>Quick Link</h3>
          <ul>
            <li><Link to="/about">Our Mission</Link></li>
            <li><a href="#services">Our Services</a></li>
            <li><Link to="/gallery">Our Project</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Location</h3>
          <p><i className="fas fa-map-marker-alt" style={{color:'var(--gold)',marginRight:8}}></i>Devanahalli, Bangalore, India</p>
          <p><i className="fas fa-phone" style={{color:'var(--gold)',marginRight:8}}></i><a href="tel:+919008129798" style={{color:'rgba(255,255,255,0.8)'}}>+91 90081 29798</a></p>
          <p><i className="fas fa-envelope" style={{color:'var(--gold)',marginRight:8}}></i><a href="mailto:danayya.pujari47@gmail.com" style={{color:'rgba(255,255,255,0.8)'}}>danayya.pujari47@gmail.com</a></p>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:15}}>
        <p>&copy; {new Date().getFullYear()} Eventhub. All rights reserved. by Danayya Pujari</p>
      </div>
    </div>
  </footer>
);

export default Footer;
