import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI, eventAPI } from '../../api/axios';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      bookingAPI.getMy().then(r => setBookings(r.data.bookings || r.data || [])),
      eventAPI.getAll({ limit: 3, status: 'upcoming' }).then(r => setUpcomingEvents(r.data.events || []))
    ]).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>;

  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const totalSpent = bookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + (b.totalAmount || 0), 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Dashboard</h2>
      <div className="row mb-4">
        <div className="col-md-3 mb-3"><div className="stat-card"><i className="fas fa-ticket-alt"></i><h3>{bookings.length}</h3><p>Total Bookings</p></div></div>
        <div className="col-md-3 mb-3"><div className="stat-card"><i className="fas fa-clock"></i><h3>{activeBookings.length}</h3><p>Active Bookings</p></div></div>
        <div className="col-md-3 mb-3"><div className="stat-card"><i className="fas fa-check-circle"></i><h3>{bookings.filter(b => b.status === 'confirmed').length}</h3><p>Confirmed</p></div></div>
        <div className="col-md-3 mb-3"><div className="stat-card"><i className="fas fa-rupee-sign"></i><h3>₹{totalSpent.toLocaleString()}</h3><p>Total Spent</p></div></div>
      </div>
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card"><div className="card-header"><h5>My Bookings</h5></div><div className="card-body">
            {bookings.length === 0 ? <p>No bookings yet. <Link to="/events">Browse Events</Link></p> : (
              <div className="table-responsive"><table className="table">
                <thead><tr><th>Event</th><th>Date</th><th>Tickets</th><th>Amount</th><th>Status</th><th></th></tr></thead>
                <tbody>{bookings.slice(0, 5).map(b => (
                  <tr key={b._id}><td>{b.event?.title || b.eventId}</td><td>{new Date(b.event?.date || b.createdAt).toLocaleDateString()}</td><td>{b.tickets}</td><td>₹{(b.totalAmount || b.amount || 0).toLocaleString()}</td>
                    <td><span className={`badge bg-${b.status === 'confirmed' ? 'success' : b.status === 'cancelled' ? 'danger' : 'warning'}`}>{b.status}</span></td>
                    <td><Link to={`/my-bookings`} className="btn btn-sm btn-outline-warning">View</Link></td></tr>
                ))}</tbody></table></div>
            )}
          </div></div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card"><div className="card-header"><h5>Upcoming Events</h5></div><div className="card-body">
            {upcomingEvents.map(e => (
              <div key={e._id} className="mb-3 pb-2 border-bottom"><h6>{e.title}</h6><small className="text-muted"><i className="fas fa-calendar me-1"></i>{new Date(e.date).toLocaleDateString()}</small></div>
            ))}
            <Link to="/events" className="btn btn-gold w-100 mt-2"><i className="fas fa-calendar-alt me-1"></i> Browse All Events</Link>
          </div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
