import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: data => api.post('/auth/register', data),
  login: data => api.post('/auth/login', data),
  verifyEmail: data => api.post('/auth/verify-email', data),
  forgotPassword: data => api.post('/auth/forgot-password', data),
  verifyResetOTP: data => api.post('/auth/verify-reset-otp', data),
  resetPassword: data => api.post('/auth/reset-password', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: data => api.put('/auth/profile', data),
  adminLogin: data => api.post('/auth/admin/login', data),
};

export const eventAPI = {
  getAll: params => api.get('/events', { params }),
  getById: id => api.get(`/events/${id}`),
  create: data => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: id => api.delete(`/events/${id}`),
  getStats: () => api.get('/events/stats'),
};

export const bookingAPI = {
  create: data => api.post('/bookings', data),
  getMy: () => api.get('/bookings/my'),
  getById: id => api.get(`/bookings/${id}`),
  cancel: (id, data) => api.put(`/bookings/${id}/cancel`, data),
  getAll: params => api.get('/bookings', { params }),
  updateStatus: (id, data) => api.put(`/bookings/${id}/status`, data),
  getStats: () => api.get('/bookings/stats'),
};

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: params => api.get('/admin/users', { params }),
  updateUserStatus: (id, data) => api.put(`/admin/users/${id}/status`, data),
  updateEmailStatus: (id, data) => api.put(`/admin/users/${id}/email-status`, data),
  getAdmins: () => api.get('/admin/admins'),
  createAdmin: data => api.post('/admin/admins', data),
  updateAdmin: (id, data) => api.put(`/admin/admins/${id}`, data),
  getEventRequests: params => api.get('/admin/event-requests', { params }),
  updateEventRequest: (id, data) => api.put(`/admin/event-requests/${id}`, data),
  getReports: params => api.get('/admin/reports', { params }),
  getActivityLogs: params => api.get('/admin/activity-logs', { params }),
  submitEventRequest: data => api.post('/admin/event-requests', data),
};

export default api;
