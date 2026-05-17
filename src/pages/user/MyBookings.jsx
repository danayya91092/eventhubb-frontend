import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);
    bookingAPI.getMy().then(r => setBookings(r.data.bookings || r.data || [])).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await bookingAPI.cancel(id, { reason: 'Cancelled by user' });
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to cancel'); }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Bookings</h2>
        <Link to="/events" className="btn btn-gold"><i className="fas fa-plus me-1"></i> Book Event</Link>
      </div>
      {bookings.length === 0 ? (
        <div className="text-center py-5"><p>No bookings yet.</p><Link to="/events" className="btn btn-gold">Browse Events</Link></div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead><tr><th>Event</th><th>Date</th><th>Tickets</th><th>Amount</th><th>Status</th><th>Booked On</th><th>Action</th></tr></thead>
            <tbody>{bookings.map(b => (
              <tr key={b._id}>
                <td>{b.event?.title || 'N/A'}</td>
                <td>{b.event?.date ? new Date(b.event.date).toLocaleDateString() : 'N/A'}</td>
                <td>{b.tickets}</td>
                <td>₹{(b.totalAmount || b.amount || 0).toLocaleString()}</td>
                <td><span className={`badge bg-${b.status === 'confirmed' ? 'success' : b.status === 'cancelled' ? 'danger' : 'warning'}`}>{b.status}</span></td>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td>{b.status !== 'cancelled' && <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancel(b._id)}>Cancel</button>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
