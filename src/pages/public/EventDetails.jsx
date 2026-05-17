import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { eventAPI, bookingAPI } from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const EventDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ tickets: 1, specialRequests: '' });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    eventAPI.getById(id).then(res => { setEvent(res.data.event); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  const handleBooking = async e => {
    e.preventDefault();
    if (!isAuthenticated) return toast.error('Please login to book');
    setBookingLoading(true);
    try {
      await bookingAPI.create({ eventId: id, tickets: booking.tickets, specialRequests: booking.specialRequests });
      toast.success('Booking confirmed!');
      setBooking({ tickets: 1, specialRequests: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    }
    setBookingLoading(false);
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>;
  if (!event) return <div className="container py-5"><h3>Event not found</h3><Link to="/events">Back to Events</Link></div>;

  return (
    <div className="event-detail-page">
      <div className="event-detail-banner" style={{background: `url(${event.banner || '/event1.jpg'}) center/cover no-repeat`}}>
        <div className="event-detail-overlay">
          <div className="container">
            <span className="event-category-badge">{event.category}</span>
            <h1>{event.title}</h1>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="event-description">
              <h3>About This Event</h3>
              <p>{event.description}</p>
            </div>
            <div className="event-meta-details mt-4">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="meta-card"><i className="fas fa-calendar"></i><h4>Date</h4><p>{new Date(event.date).toLocaleDateString()}</p></div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="meta-card"><i className="fas fa-clock"></i><h4>Time</h4><p>{event.time}</p></div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="meta-card"><i className="fas fa-map-marker-alt"></i><h4>Location</h4><p>{event.location}</p></div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="meta-card"><i className="fas fa-tag"></i><h4>Price</h4><p>₹{event.price?.toLocaleString()}</p></div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="meta-card"><i className="fas fa-users"></i><h4>Capacity</h4><p>{event.capacity} guests</p></div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="meta-card"><i className="fas fa-ticket-alt"></i><h4>Available</h4><p>{event.availableTickets} tickets</p></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="booking-card">
              <h3>Book This Event</h3>
              <p className="event-price-display">₹{event.price?.toLocaleString()} <span>/ person</span></p>
              <form onSubmit={handleBooking}>
                <div className="form-group mb-3">
                  <label>Number of Tickets</label>
                  <input type="number" className="form-control" min="1" max={event.availableTickets || 10} value={booking.tickets} onChange={e => setBooking({...booking, tickets: parseInt(e.target.value) || 1})} required />
                </div>
                <div className="form-group mb-3">
                  <label>Special Requests</label>
                  <textarea className="form-control" rows="3" value={booking.specialRequests} onChange={e => setBooking({...booking, specialRequests: e.target.value})} />
                </div>
                <div className="booking-total mb-3">
                  <strong>Total: ₹{(event.price * booking.tickets).toLocaleString()}</strong>
                </div>
                {isAuthenticated ? (
                  <button type="submit" className="btn btn-gold w-100" disabled={bookingLoading}>
                    {bookingLoading ? <><span className="spinner-border spinner-border-sm me-1" /> Booking...</> : 'Confirm Booking'}
                  </button>
                ) : (
                  <Link to="/login" className="btn btn-gold w-100">Login to Book</Link>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
