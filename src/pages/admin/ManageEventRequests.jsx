import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/axios';

const ManageEventRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchRequests = () => {
    setLoading(true);
    adminAPI.getEventRequests({ status: statusFilter || undefined })
      .then(r => setRequests(r.data.eventRequests || r.data.requests || []))
      .catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchRequests(); }, [statusFilter]);

  const handleStatus = async (id, status) => {
    try { await adminAPI.updateEventRequest(id, { status }); fetchRequests(); }
    catch (err) { alert('Failed to update'); }
  };

  return (
    <div>
      <h2 className="mb-4">Event Requests</h2>
      <div className="card"><div className="card-body">
        <div className="mb-3">
          <select className="form-select" style={{width:'auto'}} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
          </select>
        </div>
        {loading ? <div className="text-center py-3"><div className="spinner-border text-warning" /></div> : (
          <div className="table-responsive"><table className="table table-dark table-hover">
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Event Type</th><th>Date</th><th>Guests</th><th>Budget</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{requests.map(r => (
              <tr key={r._id}>
                <td>{r.fullname}</td><td>{r.email}</td><td>{r.phone}</td><td>{r.eventType}</td>
                <td>{r.eventDate ? new Date(r.eventDate).toLocaleDateString() : 'N/A'}</td>
                <td>{r.guestCount || 'N/A'}</td>
                <td>{r.budget ? `₹${Number(r.budget).toLocaleString()}` : 'N/A'}</td>
                <td><span className={`badge bg-${r.status === 'approved' ? 'success' : r.status === 'rejected' ? 'danger' : 'warning'}`}>{r.status}</span></td>
                <td>{r.status === 'pending' && (
                  <><button className="btn btn-sm btn-success me-1" onClick={() => handleStatus(r._id, 'approved')}>Approve</button><button className="btn btn-sm btn-danger" onClick={() => handleStatus(r._id, 'rejected')}>Reject</button></>
                )}</td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </div></div>
    </div>
  );
};

export default ManageEventRequests;
