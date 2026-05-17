import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchBookings = () => {
    setLoading(true);
    bookingAPI.getAll({ status: statusFilter || undefined })
      .then(r => setBookings(r.data.bookings || []))
      .catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [statusFilter]);

  const handleStatus = async (id, status) => {
    try { await bookingAPI.updateStatus(id, { status }); toast.success('Booking updated'); fetchBookings(); }
    catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  return (
    <div>
      <h2 className="mb-4">Manage Bookings</h2>
      <div className="card"><div className="card-body">
        <div className="mb-3">
          <select className="form-select" style={{width:'auto'}} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All Status</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option>
          </select>
        </div>
        {loading ? <div className="text-center py-3"><div className="spinner-border text-warning" /></div> : (
          <div className="table-responsive"><table className="table table-dark table-hover">
            <thead><tr><th>User</th><th>Event</th><th>Tickets</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>{bookings.map(b => (
              <tr key={b._id}>
                <td>{b.user?.fullname || b.userId}</td>
                <td>{b.event?.title || 'N/A'}</td>
                <td>{b.tickets}</td>
                <td>₹{(b.totalAmount || b.amount || 0).toLocaleString()}</td>
                <td><span className={`badge bg-${b.status === 'confirmed' ? 'success' : b.status === 'cancelled' ? 'danger' : 'warning'}`}>{b.status}</span></td>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td>{b.status === 'pending' && (
                  <><button className="btn btn-sm btn-success me-1" onClick={() => handleStatus(b._id, 'confirmed')}>Confirm</button><button className="btn btn-sm btn-danger" onClick={() => handleStatus(b._id, 'cancelled')}>Cancel</button></>
                )}</td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </div></div>
    </div>
  );
};

export default ManageBookings;
