import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { admin, adminLogout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const links = [
    { path: '/admin', icon: 'fa-chart-pie', label: 'Dashboard', roles: ['super_admin', 'event_manager', 'booking_manager', 'support_staff'] },
    { path: '/admin/events', icon: 'fa-calendar', label: 'Events', roles: ['super_admin', 'event_manager'] },
    { path: '/admin/bookings', icon: 'fa-ticket', label: 'Bookings', roles: ['super_admin', 'booking_manager', 'event_manager'] },
    { path: '/admin/users', icon: 'fa-users', label: 'Users', roles: ['super_admin', 'booking_manager'] },
    { path: '/admin/admins', icon: 'fa-user-shield', label: 'Admins', roles: ['super_admin'] },
    { path: '/admin/requests', icon: 'fa-envelope', label: 'Event Requests', roles: ['super_admin', 'event_manager'] },
    { path: '/admin/reports', icon: 'fa-chart-bar', label: 'Reports', roles: ['super_admin', 'event_manager'] },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/admin" className="sidebar-brand"><img src="/eventhublogo.svg" alt="Eventhub" /></Link>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {links.filter(l => l.roles.includes(admin?.role)).map(link => (
            <li key={link.path} className={isActive(link.path) ? 'active' : ''}>
              <Link to={link.path}><i className={`fas ${link.icon}`}></i> {link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="admin-info">
          <div className="admin-avatar"><i className="fas fa-user-shield"></i></div>
          <div>
            <p className="admin-name">{admin?.username}</p>
            <p className="admin-role">{admin?.role?.replace('_', ' ')}</p>
          </div>
        </div>
        <button onClick={adminLogout} className="btn btn-sm btn-outline-danger w-100 mt-2">
          <i className="fas fa-sign-out-alt me-1"></i> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
