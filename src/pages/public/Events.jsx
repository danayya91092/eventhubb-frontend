import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { eventAPI } from '../../api/axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    eventAPI.getAll({ page, limit: 9, category: category || undefined, search: search || undefined, status: 'upcoming' })
      .then(res => { setEvents(res.data.events); setTotal(res.data.total || res.data.events?.length || 0); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, category, search]);

  return (
    <>
      <Navbar />
      <div className="page-banner" style={{background:'linear-gradient(135deg,#0f172a,#1e293b)'}}>
        <div className="container"><h1>Events</h1><p>Browse our upcoming events</p></div>
      </div>
      <div className="container py-4">
        <div className="events-filters">
          <div className="search-bar"><i className="fas fa-search"></i><input type="text" placeholder="Search events..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} /></div>
          <div className="category-filters">
            {['','Wedding','Corporate','Birthday','Concert','Festival','Workshop','Party'].map(c => (
              <button key={c} className={`filter-btn ${category === c ? 'active' : ''}`} onClick={() => { setCategory(c); setPage(1); }}>{c || 'All'}</button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-warning" /></div>
        ) : events.length === 0 ? (
          <div className="text-center py-5"><p>No events found.</p></div>
        ) : (
          <>
            <div className="events-grid">
              {events.map(event => (
                <div key={event._id} className="event-card">
                  <div className="event-img" style={{background: `url(${event.banner || '/event1.jpg'}) center/cover no-repeat`, height: 200}}>
                    <span className="event-cat-badge">{event.category}</span>
                  </div>
                  <div className="event-info">
                    <h3>{event.title}</h3>
                    <p><i className="fas fa-calendar"></i> {new Date(event.date).toLocaleDateString()}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
                    <p className="event-price">₹{event.price?.toLocaleString()}</p>
                    <Link to={`/events/${event._id}`} className="btn btn-gold w-100">Book Now</Link>
                  </div>
                </div>
              ))}
            </div>
            {total > 9 && (
              <div className="pagination mt-4 d-flex justify-content-center gap-2">
                <button className="btn btn-outline-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
                <button className="btn btn-outline-secondary" disabled={page * 9 >= total} onClick={() => setPage(p => p + 1)}>Next</button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Events;
