import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/common/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Navbar from './components/layout/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

// Public
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import AdminLogin from './pages/public/AdminLogin';
import Register from './pages/public/Register';
import Events from './pages/public/Events';
import EventDetails from './pages/public/EventDetails';
import ForgotPassword from './pages/public/ForgotPassword';

// User
import Dashboard from './pages/user/Dashboard';
import MyBookings from './pages/user/MyBookings';
import Profile from './pages/user/Profile';
import EventRequest from './pages/user/EventRequest';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageEvents from './pages/admin/ManageEvents';
import CreateEvent from './pages/admin/CreateEvent';
import ManageUsers from './pages/admin/ManageUsers';
import ManageAdmins from './pages/admin/ManageAdmins';
import ManageBookings from './pages/admin/ManageBookings';
import ManageEventRequests from './pages/admin/ManageEventRequests';
import Reports from './pages/admin/Reports';

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* User dashboard routes */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event-request" element={<EventRequest />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoute><DashboardLayout /></AdminRoute>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/events" element={<AdminRoute allowedRoles={['super_admin','event_manager']}><ManageEvents /></AdminRoute>} />
          <Route path="/admin/events/create" element={<AdminRoute allowedRoles={['super_admin','event_manager']}><CreateEvent /></AdminRoute>} />
          <Route path="/admin/events/edit/:id" element={<AdminRoute allowedRoles={['super_admin','event_manager']}><CreateEvent /></AdminRoute>} />
          <Route path="/admin/bookings" element={<ManageBookings />} />
          <Route path="/admin/users" element={<AdminRoute allowedRoles={['super_admin','booking_manager']}><ManageUsers /></AdminRoute>} />
          <Route path="/admin/admins" element={<AdminRoute allowedRoles={['super_admin']}><ManageAdmins /></AdminRoute>} />
          <Route path="/admin/requests" element={<AdminRoute allowedRoles={['super_admin','event_manager']}><ManageEventRequests /></AdminRoute>} />
          <Route path="/admin/reports" element={<AdminRoute allowedRoles={['super_admin','event_manager']}><Reports /></AdminRoute>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
