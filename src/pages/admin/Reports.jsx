import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const Reports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getReports({ from: '2024-01-01', to: new Date().toISOString().split('T')[0] })
      .then(r => setReports(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>;

  return (
    <div>
      <h2 className="mb-4">Reports</h2>
      <div className="row mb-4">
        <div className="col-md-4 mb-3"><div className="stat-card gold"><i className="fas fa-rupee-sign"></i><h3>₹{(reports?.totalRevenue || 0).toLocaleString()}</h3><p>Total Revenue</p></div></div>
        <div className="col-md-4 mb-3"><div className="stat-card gold"><i className="fas fa-ticket-alt"></i><h3>{reports?.totalBookings || 0}</h3><p>Total Bookings</p></div></div>
        <div className="col-md-4 mb-3"><div className="stat-card gold"><i className="fas fa-calendar"></i><h3>{reports?.totalEvents || 0}</h3><p>Total Events</p></div></div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card"><div className="card-header"><h5>Category Breakdown</h5></div><div className="card-body">
            <table className="table table-dark">
              <thead><tr><th>Category</th><th>Count</th><th>Revenue</th></tr></thead>
              <tbody>{(reports?.categoryBreakdown || []).map((c, i) => (
                <tr key={i}><td>{c._id || c.category}</td><td>{c.count || c.totalEvents || 0}</td><td>₹{((c.revenue || c.totalRevenue || 0)).toLocaleString()}</td></tr>
              ))}</tbody>
            </table>
          </div></div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card"><div className="card-header"><h5>Top Events</h5></div><div className="card-body">
            <table className="table table-dark">
              <thead><tr><th>Event</th><th>Bookings</th><th>Revenue</th></tr></thead>
              <tbody>{(reports?.topEvents || []).map((e, i) => (
                <tr key={i}><td>{e.title || e._id}</td><td>{e.bookingCount || e.totalBookings || 0}</td><td>₹{((e.revenue || e.totalRevenue || 0)).toLocaleString()}</td></tr>
              ))}</tbody>
            </table>
          </div></div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
