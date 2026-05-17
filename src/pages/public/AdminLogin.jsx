import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminLogin(form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page" style={{background:'linear-gradient(135deg,#0a0e1a 0%,#1a1a2e 100%)'}}>
      <div className="auth-container" style={{background:'#1e293b',border:'1px solid #d4a853'}}>
        <div className="auth-header">
          <Link to="/"><img src="/eventhublogo.svg" alt="Eventhub" /></Link>
          <h2>Admin Login</h2>
          <p>Sign in to admin panel</p>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label><i className="fas fa-envelope"></i> Email</label><input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
          <div className="form-group"><label><i className="fas fa-lock"></i> Password</label><input type="password" className="form-control" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required /></div>
          <button type="submit" className="btn btn-gold w-100" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
        </form>
        <div className="auth-links mt-3"><Link to="/login" className="text-warning">User Login</Link></div>
      </div>
    </div>
  );
};

export default AdminLogin;
