import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../api/axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getDashboard().then(r => setStats(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>;
  if (!stats) return <div className="py-5 text-center">Failed to load dashboard</div>;

  const chartData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{ label: 'Revenue', data: stats.monthlyRevenue || Array(12).fill(0), backgroundColor: '#d4a853' }]
  };

  return (
    <div className="admin-dashboard">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row mb-4">
        <div className="col-md-3 mb-3"><div className="stat-card gold"><i className="fas fa-calendar"></i><h3>{stats.totalEvents || 0}</h3><p>Total Events</p></div></div>
        <div className="col-md-3 mb-3"><div className="stat-card gold"><i className="fas fa-ticket-alt"></i><h3>{stats.totalBookings || 0}</h3><p>Total Bookings</p></div></div>
        <div className="col-md-3 mb-3"><div className="stat-card gold"><i className="fas fa-users"></i><h3>{stats.totalUsers || 0}</h3><p>Total Users</p></div></div>
        <div className="col-md-3 mb-3"><div className="stat-card gold"><i className="fas fa-rupee-sign"></i><h3>₹{(stats.totalRevenue || 0).toLocaleString()}</h3><p>Total Revenue</p></div></div>
      </div>
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card"><div className="card-header"><h5>Revenue Overview</h5></div><div className="card-body">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div></div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card"><div className="card-header"><h5>Recent Bookings</h5></div><div className="card-body">
            {(stats.recentBookings || []).slice(0, 5).map(b => (
              <div key={b._id} className="mb-2 pb-2 border-bottom"><p className="mb-1"><strong>{b.event?.title || 'N/A'}</strong></p><small className="text-muted">{b.tickets} tickets - ₹{(b.totalAmount || 0).toLocaleString()}</small></div>
            ))}
            <Link to="/admin/bookings" className="btn btn-sm btn-outline-warning w-100 mt-2">View All</Link>
          </div></div>
          <div className="card mt-4"><div className="card-header"><h5>Quick Actions</h5></div><div className="card-body">
            <Link to="/admin/events" className="btn btn-gold w-100 mb-2">Manage Events</Link>
            <Link to="/admin/bookings" className="btn btn-outline-warning w-100 mb-2">Manage Bookings</Link>
            <Link to="/admin/users" className="btn btn-outline-warning w-100">Manage Users</Link>
          </div></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
