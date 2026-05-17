import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/axios';

const Register = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ fullname:'', email:'', phone:'', password:'', confirmPassword:'', otp:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    setLoading(true);
    try {
      await authAPI.register({ fullname: form.fullname, email: form.email, phone: form.phone, password: form.password });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  const handleVerify = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authAPI.verifyEmail({ email: form.email, otp: form.otp });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/"><img src="/eventhublogo.svg" alt="Eventhub" /></Link>
          <h2>{step === 1 ? 'Create Account' : 'Verify Email'}</h2>
          <p>{step === 1 ? 'Sign up to get started' : `Enter OTP sent to ${form.email}`}</p>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {step === 1 ? (
          <form onSubmit={handleRegister}>
            <div className="form-group"><label><i className="fas fa-user"></i> Full Name</label><input type="text" className="form-control" value={form.fullname} onChange={e => setForm({...form, fullname:e.target.value})} required /></div>
            <div className="form-group"><label><i className="fas fa-envelope"></i> Email</label><input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required /></div>
            <div className="form-group"><label><i className="fas fa-phone"></i> Phone</label><input type="tel" className="form-control" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} required /></div>
            <div className="form-group"><label><i className="fas fa-lock"></i> Password</label><input type="password" className="form-control" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required minLength={6} /></div>
            <div className="form-group"><label><i className="fas fa-check"></i> Confirm Password</label><input type="password" className="form-control" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword:e.target.value})} required /></div>
            <button type="submit" className="btn btn-gold w-100" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div className="form-group"><label><i className="fas fa-key"></i> OTP</label><input type="text" className="form-control" value={form.otp} onChange={e => setForm({...form, otp:e.target.value})} required maxLength={6} placeholder="Enter 6-digit OTP" /></div>
            <button type="submit" className="btn btn-gold w-100" disabled={loading}>{loading ? 'Verifying...' : 'Verify Email'}</button>
          </form>
        )}
        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
