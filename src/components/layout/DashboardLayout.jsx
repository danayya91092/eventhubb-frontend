import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const { admin } = useAuth();
  if (admin) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    );
  }
  return (
    <div className="dash-wrapper">
      <div className="dash-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
