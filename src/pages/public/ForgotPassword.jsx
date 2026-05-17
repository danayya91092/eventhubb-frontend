import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../../api/axios';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleForgot = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      setStep(2); setMessage('OTP sent to your email');
    } catch (err) { setError(err.response?.data?.message || 'Failed'); }
    setLoading(false);
  };

  const handleVerify = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await authAPI.verifyResetOTP({ email, otp });
      setStep(3);
    } catch (err) { setError(err.response?.data?.message || 'Invalid OTP'); }
    setLoading(false);
  };

  const handleReset = async e => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) return setError('Passwords do not match');
    setLoading(true);
    try {
      await authAPI.resetPassword({ email, otp, password });
      setMessage('Password reset successful!');
    } catch (err) { setError(err.response?.data?.message || 'Failed'); }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/"><img src="/eventhublogo.svg" alt="Eventhub" /></Link>
          <h2>Reset Password</h2>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        {step === 1 && (
          <form onSubmit={handleForgot}>
            <div className="form-group"><label>Email</label><input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <button type="submit" className="btn btn-gold w-100" disabled={loading}>{loading ? 'Sending...' : 'Send OTP'}</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerify}>
            <div className="form-group"><label>OTP</label><input type="text" className="form-control" value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6} /></div>
            <button type="submit" className="btn btn-gold w-100" disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleReset}>
            <div className="form-group"><label>New Password</label><input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} /></div>
            <div className="form-group"><label>Confirm Password</label><input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required /></div>
            <button type="submit" className="btn btn-gold w-100" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
          </form>
        )}
        <div className="auth-links"><p><Link to="/login">Back to Login</Link></p></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
