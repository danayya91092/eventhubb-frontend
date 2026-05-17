import React, { useState } from 'react';
import { authAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [form, setForm] = useState({ fullname:'', phone:'', currentPassword:'', newPassword:'' });

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await authAPI.updateProfile(form);
      toast.success('Profile updated');
    } catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Profile</h2>
      <div className="row">
        <div className="col-lg-6">
          <div className="card"><div className="card-header"><h5>Edit Profile</h5></div><div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="form-group mb-3"><label>Full Name</label><input type="text" className="form-control" value={form.fullname} onChange={e => setForm({...form, fullname:e.target.value})} /></div>
              <div className="form-group mb-3"><label>Phone</label><input type="tel" className="form-control" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} /></div>
              <button type="submit" className="btn btn-gold">Update Profile</button>
            </form>
          </div></div>
        </div>
        <div className="col-lg-6">
          <div className="card"><div className="card-header"><h5>Change Password</h5></div><div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="form-group mb-3"><label>Current Password</label><input type="password" className="form-control" value={form.currentPassword} onChange={e => setForm({...form, currentPassword:e.target.value})} /></div>
              <div className="form-group mb-3"><label>New Password</label><input type="password" className="form-control" value={form.newPassword} onChange={e => setForm({...form, newPassword:e.target.value})} minLength={6} /></div>
              <button type="submit" className="btn btn-gold">Change Password</button>
            </form>
          </div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
