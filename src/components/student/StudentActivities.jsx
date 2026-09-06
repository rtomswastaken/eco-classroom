import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlusCircle, CheckCircle2, Clock, AlertCircle, Filter, Calendar } from 'lucide-react';

export default function StudentActivities() {
  const { currentStudent, activities, setIsSubmitModalOpen } = useApp();
  const [filter, setFilter] = useState('all'); // 'all' | 'approved' | 'pending' | 'rejected'

  if (!currentStudent) return null;

  const myActivities = activities.filter(a => a.studentId === currentStudent.id);

  const filteredActivities = myActivities.filter(a => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>
            <span>📋</span>
            <span>My Eco Activities History</span>
          </h2>
          <p>Track all the sustainable actions you've submitted and see your teacher's feedback.</p>
        </div>

        <button className="btn-primary" onClick={() => setIsSubmitModalOpen(true)}>
          <PlusCircle size={18} />
          <span>Submit New Action</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          className={`btn-secondary ${filter === 'all' ? 'active' : ''}`}
          style={{ background: filter === 'all' ? '#16a34a' : '#ffffff', color: filter === 'all' ? '#ffffff' : '#0f172a' }}
          onClick={() => setFilter('all')}
        >
          All Actions ({myActivities.length})
        </button>
        <button
          className="btn-secondary"
          style={{ background: filter === 'approved' ? '#16a34a' : '#ffffff', color: filter === 'approved' ? '#ffffff' : '#0f172a' }}
          onClick={() => setFilter('approved')}
        >
          Approved ({myActivities.filter(a => a.status === 'approved').length})
        </button>
        <button
          className="btn-secondary"
          style={{ background: filter === 'pending' ? '#f59e0b' : '#ffffff', color: filter === 'pending' ? '#ffffff' : '#0f172a' }}
          onClick={() => setFilter('pending')}
        >
          Pending Review ({myActivities.filter(a => a.status === 'pending').length})
        </button>
        <button
          className="btn-secondary"
          style={{ background: filter === 'rejected' ? '#ef4444' : '#ffffff', color: filter === 'rejected' ? '#ffffff' : '#0f172a' }}
          onClick={() => setFilter('rejected')}
        >
          Needs Update ({myActivities.filter(a => a.status === 'rejected').length})
        </button>
      </div>

      {filteredActivities.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px', color: '#64748b' }}>
          <p style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
            No activities found for this filter.
          </p>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
            Try selecting another filter or submit a new eco action!
          </p>
          <button className="btn-primary" onClick={() => setIsSubmitModalOpen(true)}>
            <PlusCircle size={18} />
            <span>Submit New Eco Action</span>
          </button>
        </div>
      ) : (
        <div className="activities-grid">
          {filteredActivities.map(act => (
            <div key={act.id} className="activity-card">
              <div className="activity-photo-wrapper">
                <img src={act.photo} alt={act.title} className="activity-photo" />
                <span className={`status-badge status-${act.status}`}>
                  {act.status === 'approved' && <CheckCircle2 size={13} />}
                  {act.status === 'pending' && <Clock size={13} />}
                  {act.status === 'rejected' && <AlertCircle size={13} />}
                  <span>
                    {act.status === 'approved' ? 'Approved' : act.status === 'pending' ? 'Pending Review' : 'Needs Update'}
                  </span>
                </span>
                <span className="category-tag">
                  {act.categoryIcon} {act.categoryName}
                </span>
              </div>

              <div className="activity-body">
                <h4 className="activity-title">{act.title}</h4>
                <p className="activity-desc">{act.description}</p>

                {act.notes && (
                  <p style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginBottom: '8px' }}>
                    Note: "{act.notes}"
                  </p>
                )}

                {act.teacherFeedback && (
                  <div className="feedback-bubble">
                    <span>💬</span>
                    <div>
                      <strong>Mrs. Green:</strong> {act.teacherFeedback}
                    </div>
                  </div>
                )}

                <div className="activity-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    {new Date(act.submittedAt).toLocaleDateString()}
                  </span>
                  <span style={{ fontWeight: 800, color: act.status === 'approved' ? '#16a34a' : '#f59e0b', fontSize: '1rem' }}>
                    {act.status === 'approved' ? `+${act.pointsAwarded} pts` : `+${act.suggestedPoints || 15} pts pending`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
