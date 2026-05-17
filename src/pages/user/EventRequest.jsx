import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../api/axios';

const EventRequest = () => {
  const [form, setForm] = useState({
    eventType: 'Wedding', fullname: '', email: '', phone: '',
    eventDate: '', guestCount: '', budget: '', message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminAPI.submitEventRequest(form);
      toast.success('Request submitted! We will contact you soon.');
      setForm({ eventType: 'Wedding', fullname: '', email: '', phone: '', eventDate: '', guestCount: '', budget: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    }
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Submit Event Request</h2>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card"><div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Event Type</label>
                  <select className="form-select" value={form.eventType} onChange={e => setForm({...form, eventType: e.target.value})}>
                    {['Wedding','Reception','Haldi','Birthday','Corporate','Concert','Festival','Other'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-md-6 mb-3"><label>Full Name</label><input type="text" className="form-control" value={form.fullname} onChange={e => setForm({...form, fullname: e.target.value})} required /></div>
                <div className="col-md-6 mb-3"><label>Email</label><input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
                <div className="col-md-6 mb-3"><label>Phone</label><input type="tel" className="form-control" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
                <div className="col-md-6 mb-3"><label>Event Date</label><input type="date" className="form-control" value={form.eventDate} onChange={e => setForm({...form, eventDate: e.target.value})} /></div>
                <div className="col-md-3 mb-3"><label>Guest Count</label><input type="number" className="form-control" value={form.guestCount} onChange={e => setForm({...form, guestCount: e.target.value})} /></div>
                <div className="col-md-3 mb-3"><label>Budget (₹)</label><input type="number" className="form-control" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} /></div>
                <div className="col-12 mb-3"><label>Message</label><textarea className="form-control" rows="4" value={form.message} onChange={e => setForm({...form, message: e.target.value})} /></div>
              </div>
              <button type="submit" className="btn btn-gold" disabled={loading}>{loading ? 'Submitting...' : 'Submit Request'}</button>
            </form>
          </div></div>
        </div>
      </div>
    </div>
  );
};

export default EventRequest;
