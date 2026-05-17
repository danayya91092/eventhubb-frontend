import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { eventAPI } from '../../api/axios';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    eventAPI.getAll({ limit: 4, status: 'upcoming' }).then(res => setFeaturedEvents(res.data.events || [])).catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title"><i className="fas fa-calendar-check"></i> Event Management</h1>
          <p className="hero-subtitle">We provide complete event management services for all occasions including weddings, receptions, corporate events and more.</p>
          {!isAuthenticated ? (
            <Link to="/login" className="btn btn-gold btn-lg"><i className="fas fa-rocket"></i> Get Started</Link>
          ) : (
            <Link to="/events" className="btn btn-gold btn-lg"><i className="fas fa-calendar-alt"></i> Browse Events</Link>
          )}
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>We offer comprehensive event management services tailored to your needs.</p>
          </div>
          <div className="services-grid">
            {[
              { icon:'fa-ring', title:'Wedding', desc:'From intimate to grand celebrations.' },
              { icon:'fa-glass-cheers', title:'Reception', desc:'Elegant reception planning.' },
              { icon:'fa-palette', title:'Haldi', desc:'Traditional pre-wedding ceremonies.' },
              { icon:'fa-birthday-cake', title:'Birthday', desc:'Fun and memorable birthday parties.' },
              { icon:'fa-building', title:'Corporate', desc:'Professional corporate event management.' },
              { icon:'fa-hand-paper', title:'Event Request', desc:'Submit your own event request.' }
            ].map((s, i) => (
              <div key={i} className="service-card" onClick={() => s.title === 'Event Request' ? navigate('/event-request') : navigate('/events')}>
                <div className="service-icon"><i className={`fas ${s.icon}`}></i></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredEvents.length > 0 && (
        <section className="events-section">
          <div className="container">
            <div className="section-title">
              <h2>Upcoming Events</h2>
              <p>Check out our upcoming events and book your spot.</p>
            </div>
            <div className="events-grid">
              {featuredEvents.map(event => (
                <div key={event._id} className="event-card">
                  <div className="event-img" style={{background: `url(${event.banner || '/event1.jpg'}) center/cover no-repeat`, height: 200}} />
                  <div className="event-info">
                    <span className="event-category">{event.category}</span>
                    <h3>{event.title}</h3>
                    <p><i className="fas fa-calendar"></i> {new Date(event.date).toLocaleDateString()}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
                    <p className="event-price"><i className="fas fa-tag"></i> ₹{event.price?.toLocaleString()}</p>
                    <button className="btn btn-gold w-100" onClick={() => navigate(`/events/${event._id}`)}>Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="about-section">
        <div className="container">
          <div className="section-title"><h2>About Eventhub</h2></div>
          <div className="about-content">
            <div className="about-text">
              <p>At Eventhub, we specialize in creating unforgettable experiences. With years of expertise in event management across Bangalore, we handle everything from intimate gatherings to large-scale corporate events.</p>
              <p>Our team of dedicated professionals ensures every detail is perfect, from venue selection and decoration to catering and entertainment.</p>
            </div>
            <div className="about-stats">
              {[
                { icon:'fa-calendar-check', num:'500+', label:'Events' },
                { icon:'fa-users', num:'1000+', label:'Happy Clients' },
                { icon:'fa-star', num:'4.9', label:'Rating' },
              ].map((s, i) => (
                <div key={i} className="stat-box">
                  <i className={`fas ${s.icon}`}></i>
                  <h3>{s.num}</h3>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-title"><h2>What Our Clients Say</h2></div>
          <div className="testimonials-grid">
            {[
              { name:'Priya S.', text:'Eventhub made our wedding absolutely magical! Every detail was perfect.', rating:5 },
              { name:'Rahul K.', text:'Excellent corporate event management. Highly professional team!', rating:5 },
              { name:'Ananya M.', text:'Best birthday party coordination. My kids had a blast!', rating:5 },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</div>
                <p>"{t.text}"</p>
                <h4>- {t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-title"><h2>Get In Touch</h2><p>Have questions? We'd love to hear from you.</p></div>
          <div className="contact-content">
            <div className="contact-info-box">
              <div><i className="fas fa-phone"></i><div><h4>Phone</h4><p><a href="tel:+919008129798">+91 90081 29798</a></p></div></div>
              <div><i className="fas fa-envelope"></i><div><h4>Email</h4><p><a href="mailto:danayya.pujari47@gmail.com">danayya.pujari47@gmail.com</a></p></div></div>
              <div><i className="fas fa-map-marker-alt"></i><div><h4>Location</h4><p>Devanahalli, Bangalore, India</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
