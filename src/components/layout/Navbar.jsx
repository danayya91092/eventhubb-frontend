import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {isHome && !isAuthenticated && (
        <div className="top-bar">
          <div className="container">
            <div className="contact-info">
              <span><i className="fas fa-phone"></i> <a href="tel:+919008129798">+91 90081 29798</a></span>
              <span><i className="fas fa-envelope"></i> <a href="mailto:danayya.pujari47@gmail.com">danayya.pujari47@gmail.com</a></span>
              <span><i className="fas fa-map-marker-alt"></i> Devanahalli, Bangalore, India</span>
            </div>
          </div>
        </div>
      )}
      <header className={isAuthenticated ? 'dash-header' : 'header'}>
        <div className={isAuthenticated ? 'dash-header-inner' : 'container'}>
          {isAuthenticated ? (
            <>
              <div className="dash-header-left">
                <Link to="/dashboard" className="dash-brand"><img src="/eventhublogo.svg" alt="Eventhub" /></Link>
              </div>
              <div className="dash-header-right">
                <span className="dash-greeting"><i className="fas fa-user-circle me-1"></i> {user?.fullname}</span>
                <Link to="/events" className="dash-browse-btn" title="Browse Events"><i className="fas fa-calendar-alt"></i></Link>
                <button onClick={logout} className="dash-logout" title="Logout"><i className="fas fa-sign-out-alt"></i></button>
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="logo"><img src="/eventhublogo.svg" alt="Eventhub" /></Link>
              <nav>
                <ul className="nav">
                  <li><Link to="/">Home</Link></li>
                  <li className="dropdown">
                    <a href="#services">Services <i className="fas fa-chevron-down"></i></a>
                    <ul className="dropdown-menu">
                      <li><a href="#services">Wedding</a></li>
                      <li><a href="#services">Reception</a></li>
                      <li><a href="#services">Haldi</a></li>
                      <li><a href="#services">Birthday</a></li>
                      <li><a href="#services">Corporate Events</a></li>
                      <li><Link to="/event-request">Event Request</Link></li>
                    </ul>
                  </li>
                  <li><Link to="/gallery">Gallery</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li className="user-login-li"><Link to="/login" className="user-login-btn"><i className="fas fa-user"></i> Sign In</Link></li>
                  <li className="admin-login-li"><Link to="/admin/login" className="admin-login-btn"><i className="fas fa-shield-alt"></i> Admin</Link></li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
