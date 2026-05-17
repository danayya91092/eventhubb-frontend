import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = () => {
    setLoading(true);
    adminAPI.getUsers({ search: search || undefined })
      .then(r => setUsers(r.data.users || []))
      .catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleStatus = async (id, status) => {
    try { await adminAPI.updateUserStatus(id, { isActive: status }); toast.success('User status updated'); fetchUsers(); }
    catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleEmailStatus = async (id, verified) => {
    try { await adminAPI.updateEmailStatus(id, { isEmailVerified: verified }); toast.success('Email status updated'); fetchUsers(); }
    catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  return (
    <div>
      <h2 className="mb-4">Manage Users</h2>
      <div className="card"><div className="card-body">
        <div className="mb-3"><input type="text" className="form-control" placeholder="Search users by name or email..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        {loading ? <div className="text-center py-3"><div className="spinner-border text-warning" /></div> : (
          <div className="table-responsive"><table className="table table-dark table-hover">
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Verified</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>{users.map(u => (
              <tr key={u._id}>
                <td>{u.fullname}</td><td>{u.email}</td><td>{u.phone || 'N/A'}</td>
                <td>{u.isEmailVerified ? <span className="badge bg-success">Yes</span> : <span className="badge bg-danger">No</span>}</td>
                <td><span className={`badge bg-${u.isActive ? 'success' : 'secondary'}`}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className={`btn btn-sm ${u.isActive ? 'btn-outline-secondary' : 'btn-outline-success'} me-1`} onClick={() => handleStatus(u._id, !u.isActive)}>
                    {u.isActive ? <><i className="fas fa-ban me-1"></i>Suspend</> : <><i className="fas fa-check me-1"></i>Activate</>}
                  </button>
                  <button className="btn btn-sm btn-outline-info" onClick={() => handleEmailStatus(u._id, !u.isEmailVerified)}>
                    <i className="fas fa-envelope me-1"></i>{u.isEmailVerified ? 'Unverify' : 'Verify'}
                  </button>
                </td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </div></div>
    </div>
  );
};

export default ManageUsers;
