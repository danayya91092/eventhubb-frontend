import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const CreateEvent = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', category: 'Wedding', date: '', time: '', location: '',
    price: '', capacity: '', status: 'upcoming', banner: null
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      eventAPI.getById(id).then(r => {
        const e = r.data.event;
        setForm({
          title: e.title, description: e.description, category: e.category,
          date: new Date(e.date).toISOString().split('T')[0], time: e.time || '',
          location: e.location, price: e.price, capacity: e.capacity || '',
          status: e.status, banner: null
        });
      }).catch(() => toast.error('Failed to load event')).finally(() => setFetching(false));
    }
  }, [id, isEdit]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach(k => { if (form[k] !== null) formData.append(k, form[k]); });
    try {
      if (isEdit) { await eventAPI.update(id, formData); toast.success('Event updated'); }
      else { await eventAPI.create(formData); toast.success('Event created'); }
      navigate('/admin/events');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    setLoading(false);
  };

  if (fetching) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>;

  return (
    <div>
      <h2 className="mb-4">{isEdit ? 'Edit Event' : 'Create Event'}</h2>
      <div className="card"><div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3"><label>Title</label><input type="text" className="form-control" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required /></div>
            <div className="col-md-3 mb-3"><label>Category</label><select className="form-select" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>{['Wedding','Corporate','Birthday','Concert','Festival','Workshop','Party'].map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="col-md-3 mb-3"><label>Status</label><select className="form-select" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>{['upcoming','ongoing','completed','cancelled'].map(s => <option key={s}>{s}</option>)}</select></div>
            <div className="col-md-6 mb-3"><label>Date</label><input type="date" className="form-control" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required /></div>
            <div className="col-md-6 mb-3"><label>Time</label><input type="time" className="form-control" value={form.time} onChange={e => setForm({...form, time: e.target.value})} /></div>
            <div className="col-12 mb-3"><label>Location</label><input type="text" className="form-control" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required /></div>
            <div className="col-12 mb-3"><label>Description</label><textarea className="form-control" rows="4" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required /></div>
            <div className="col-md-4 mb-3"><label>Price (₹)</label><input type="number" className="form-control" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required /></div>
            <div className="col-md-4 mb-3"><label>Capacity</label><input type="number" className="form-control" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} /></div>
            <div className="col-md-4 mb-3"><label>Banner</label><input type="file" className="form-control" onChange={e => setForm({...form, banner: e.target.files[0]})} accept="image/*" /></div>
          </div>
          <button type="submit" className="btn btn-gold" disabled={loading}>{loading ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}</button>
        </form>
      </div></div>
    </div>
  );
};

export default CreateEvent;
