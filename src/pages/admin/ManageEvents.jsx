import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchEvents = () => {
    setLoading(true);
    eventAPI.getAll({ limit: 100, search: search || undefined })
      .then(r => setEvents(r.data.events || []))
      .catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this event?')) return;
    try { await eventAPI.delete(id); toast.success('Event deleted'); fetchEvents(); }
    catch (err) { toast.error(err.response?.data?.message || 'Delete failed'); }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Events</h2>
        <Link to="/admin/events/create" className="btn btn-gold"><i className="fas fa-plus me-1"></i> Create Event</Link>
      </div>
      <div className="card"><div className="card-body">
        <div className="mb-3"><input type="text" className="form-control" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Location</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{events.map(e => (
              <tr key={e._id}>
                <td>{e.title}</td><td>{e.category}</td><td>{new Date(e.date).toLocaleDateString()}</td><td>{e.location}</td>
                <td>₹{e.price?.toLocaleString()}</td>
                <td><span className={`badge bg-${e.status === 'upcoming' ? 'success' : e.status === 'ongoing' ? 'warning' : 'secondary'}`}>{e.status}</span></td>
                <td>
                  <Link to={`/admin/events/edit/${e._id}`} className="btn btn-sm btn-outline-warning me-1"><i className="fas fa-edit"></i></Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(e._id)}><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div></div>
    </div>
  );
};

export default ManageEvents;
