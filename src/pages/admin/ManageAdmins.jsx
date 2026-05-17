import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'event_manager' });

  const fetchAdmins = () => {
    setLoading(true);
    adminAPI.getAdmins().then(r => setAdmins(r.data.admins || [])).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleCreate = async e => {
    e.preventDefault();
    try { await adminAPI.createAdmin(form); toast.success('Admin created'); setShowCreate(false); setForm({ username: '', email: '', password: '', role: 'event_manager' }); fetchAdmins(); }
    catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleRoleChange = async (id, role) => {
    try { await adminAPI.updateAdmin(id, { role }); toast.success('Role updated'); fetchAdmins(); }
    catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Admins</h2>
        <button className="btn btn-gold" onClick={() => setShowCreate(!showCreate)}><i className="fas fa-plus me-1"></i> Add Admin</button>
      </div>
      {showCreate && (
        <div className="card mb-4"><div className="card-body">
          <form onSubmit={handleCreate}>
            <div className="row">
              <div className="col-md-3 mb-3"><label>Username</label><input type="text" className="form-control" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required /></div>
              <div className="col-md-3 mb-3"><label>Email</label><input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
              <div className="col-md-3 mb-3"><label>Password</label><input type="password" className="form-control" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required minLength={6} /></div>
              <div className="col-md-3 mb-3"><label>Role</label><select className="form-select" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                {['super_admin','event_manager','booking_manager','support_staff'].map(r => <option key={r}>{r}</option>)}
              </select></div>
            </div>
            <button type="submit" className="btn btn-gold">Create Admin</button>
          </form>
        </div></div>
      )}
      <div className="card"><div className="card-body">
        {loading ? <div className="text-center py-3"><div className="spinner-border text-warning" /></div> : (
          <div className="table-responsive"><table className="table table-dark table-hover">
            <thead><tr><th>Username</th><th>Email</th><th>Role</th><th>Last Login</th><th>Actions</th></tr></thead>
            <tbody>{admins.map(a => (
              <tr key={a._id}>
                <td>{a.username}</td><td>{a.email}</td>
                <td><span className="badge bg-warning text-dark">{a.role.replace('_',' ')}</span></td>
                <td>{a.lastLogin ? new Date(a.lastLogin).toLocaleString() : 'Never'}</td>
                <td>
                  <select className="form-select form-select-sm" value={a.role} onChange={e => handleRoleChange(a._id, e.target.value)} style={{width:'auto',display:'inline-block'}}>
                    {['super_admin','event_manager','booking_manager','support_staff'].map(r => <option key={r}>{r}</option>)}
                  </select>
                </td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </div></div>
    </div>
  );
};

export default ManageAdmins;
