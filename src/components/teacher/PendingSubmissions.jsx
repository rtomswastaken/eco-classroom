import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, XCircle, Clock, AlertCircle, Sparkles, Eye, X } from 'lucide-react';

export default function PendingSubmissions() {
  const { 
    activities, 
    approveActivity, 
    rejectActivity 
  } = useApp();

  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'history'
  const [pointsState, setPointsState] = useState({});
  const [rejectModalActivity, setRejectModalActivity] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState(null);

  const pendingList = activities.filter(a => a.status === 'pending');
  const historyList = activities.filter(a => a.status !== 'pending');

  const handlePointsChange = (actId, val) => {
    setPointsState(prev => ({ ...prev, [actId]: val }));
  };

  const handleApprove = (activity) => {
    const pts = pointsState[activity.id] !== undefined 
      ? pointsState[activity.id] 
      : (activity.suggestedPoints || 15);
    approveActivity(activity.id, pts, 'Great job! Keep up the green work.');
  };

  const handleOpenReject = (activity) => {
    setRejectModalActivity(activity);
    setRejectReason('Please upload a clearer photo of your completed activity.');
  };

  const handleConfirmReject = () => {
    if (!rejectModalActivity) return;
    rejectActivity(rejectModalActivity.id, rejectReason);
    setRejectModalActivity(null);
    setRejectReason('');
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>
            <span>⏳</span>
            <span>Teacher Review & Approvals</span>
          </h2>
          <p>Review photo proof submitted by students, award points, or request additional details.</p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn-secondary ${activeTab === 'pending' ? 'active' : ''}`}
            style={{ background: activeTab === 'pending' ? '#f59e0b' : '#ffffff', color: activeTab === 'pending' ? '#78350f' : '#0f172a', fontWeight: 700 }}
            onClick={() => setActiveTab('pending')}
          >
            <span>Pending Review ({pendingList.length})</span>
          </button>
          <button
            className={`btn-secondary ${activeTab === 'history' ? 'active' : ''}`}
            style={{ background: activeTab === 'history' ? '#16a34a' : '#ffffff', color: activeTab === 'history' ? '#ffffff' : '#0f172a' }}
            onClick={() => setActiveTab('history')}
          >
            <span>Reviewed History ({historyList.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'pending' ? (
        pendingList.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🎉</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#14532d', marginBottom: '8px' }}>
              Pending Queue is Clear!
            </h3>
            <p style={{ fontSize: '0.92rem' }}>
              All student eco activities have been reviewed. When students submit new activities, they will appear here.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '12px', padding: '12px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#92400e', fontSize: '0.88rem', fontWeight: 600 }}>
              <Clock size={18} color="#d97706" />
              <span>
                {pendingList.length} submission{pendingList.length > 1 ? 's' : ''} waiting for your review. Confirm or adjust points before approving.
              </span>
            </div>

            {pendingList.map(activity => {
              const currentPts = pointsState[activity.id] !== undefined 
                ? pointsState[activity.id] 
                : (activity.suggestedPoints || 15);

              return (
                <div key={activity.id} className="pending-submission-card">
                  {/* Photo Thumbnail */}
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={activity.photo} 
                      alt={activity.title} 
                      className="submission-preview-img"
                      onClick={() => setPreviewPhotoUrl(activity.photo)}
                      title="Click to view full photo"
                    />
                    <button
                      onClick={() => setPreviewPhotoUrl(activity.photo)}
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Eye size={12} />
                      <span>Zoom</span>
                    </button>
                  </div>

                  {/* Submission Info */}
                  <div className="submission-details">
                    <div className="submission-student-badge">
                      <span>{activity.studentAvatar}</span>
                      <span>{activity.studentName}</span>
                    </div>

                    <h4>{activity.title}</h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '99px' }}>
                        {activity.categoryIcon} {activity.categoryName}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Submitted {new Date(activity.submittedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.4 }}>
                      {activity.description}
                    </p>

                    {activity.notes && (
                      <p style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginTop: '6px' }}>
                        Student Note: "{activity.notes}"
                      </p>
                    )}
                  </div>

                  {/* Action Controls */}
                  <div className="submission-actions">
                    <div className="points-input-group">
                      <label htmlFor={`pts-${activity.id}`}>Award Points:</label>
                      <input
                        id={`pts-${activity.id}`}
                        type="number"
                        min="1"
                        max="100"
                        value={currentPts}
                        onChange={(e) => handlePointsChange(activity.id, e.target.value)}
                      />
                    </div>

                    <button 
                      className="btn-approve"
                      onClick={() => handleApprove(activity)}
                    >
                      <CheckCircle2 size={16} />
                      <span>Approve & Award</span>
                    </button>

                    <button 
                      className="btn-reject"
                      onClick={() => handleOpenReject(activity)}
                    >
                      <XCircle size={15} />
                      <span>Reject / Feedback</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* History of reviewed items */
        <div className="activities-grid">
          {historyList.map(activity => (
            <div key={activity.id} className="activity-card">
              <div className="activity-photo-wrapper">
                <img src={activity.photo} alt={activity.title} className="activity-photo" />
                <span className={`status-badge status-${activity.status}`}>
                  <span>{activity.status === 'approved' ? 'Approved' : 'Needs Update'}</span>
                </span>
                <span className="category-tag">
                  {activity.categoryIcon} {activity.categoryName}
                </span>
              </div>

              <div className="activity-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '1.1rem' }}>{activity.studentAvatar}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d' }}>
                    {activity.studentName}
                  </span>
                </div>

                <h4 className="activity-title">{activity.title}</h4>
                <p className="activity-desc">{activity.description}</p>

                {activity.teacherFeedback && (
                  <div className="feedback-bubble">
                    <span>💬</span>
                    <div>
                      <strong>Feedback given:</strong> {activity.teacherFeedback}
                    </div>
                  </div>
                )}

                <div className="activity-meta">
                  <span>{new Date(activity.submittedAt).toLocaleDateString()}</span>
                  <span style={{ fontWeight: 800, color: activity.status === 'approved' ? '#16a34a' : '#ef4444' }}>
                    {activity.status === 'approved' ? `+${activity.pointsAwarded} pts awarded` : '0 pts'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalActivity && (
        <div className="modal-backdrop" onClick={() => setRejectModalActivity(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ color: '#b91c1c' }}>
                <AlertCircle size={20} />
                <span>Return Submission for Feedback</span>
              </h3>
              <button className="modal-close-btn" onClick={() => setRejectModalActivity(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '14px' }}>
                Activity: <strong>"{rejectModalActivity.title}"</strong> by {rejectModalActivity.studentName}
              </p>

              <div className="form-group">
                <label className="form-label">Quick Feedback Suggestions:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                  {[
                    'Please upload a clearer photo of the finished project.',
                    'Can you explain what material was reused or recycled?',
                    'Great effort! Please check that safety rules were followed.',
                    'Photo proof is missing or incomplete.'
                  ].map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setRejectReason(preset)}
                      style={{
                        textAlign: 'left',
                        padding: '6px 10px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        color: '#334155'
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <label className="form-label" htmlFor="reject-msg">Feedback Message for Student:</label>
                <textarea
                  id="reject-msg"
                  className="form-textarea"
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Provide constructive guidance so the student can update and resubmit."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  className="btn-secondary" 
                  onClick={() => setRejectModalActivity(null)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-reject" 
                  onClick={handleConfirmReject}
                >
                  Send Feedback to Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Preview Lightbox Modal */}
      {previewPhotoUrl && (
        <div className="modal-backdrop" onClick={() => setPreviewPhotoUrl(null)}>
          <div style={{ maxWidth: '700px', width: '90%', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewPhotoUrl(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'white',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
            <img 
              src={previewPhotoUrl} 
              alt="Full preview" 
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '16px', background: 'white' }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
