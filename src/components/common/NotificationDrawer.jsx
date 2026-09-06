import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, Award, TrendingUp, Clock, Sparkles } from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose }) {
  const { notifications, markNotificationRead, currentStudentId, currentRole } = useApp();

  if (!isOpen) return null;

  // Filter notifications for the current student if student role, or show all if teacher
  const relevantNotifs = currentRole === 'student'
    ? notifications.filter(n => !n.studentId || n.studentId === currentStudentId)
    : notifications;

  const getIcon = (type) => {
    switch (type) {
      case 'approval': return <CheckCircle2 color="#16a34a" size={20} />;
      case 'badge': return <Award color="#eab308" size={20} />;
      case 'leaderboard': return <TrendingUp color="#0284c7" size={20} />;
      default: return <Sparkles color="#8b5cf6" size={20} />;
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(0,0,0,0.3)',
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '380px',
          height: '100%',
          background: '#ffffff',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          style={{
            padding: '20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🔔</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#14532d' }}>
              Notifications
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="modal-close-btn"
            aria-label="Close notifications"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {relevantNotifs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
              <Sparkles size={36} color="#86efac" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontWeight: 700 }}>All caught up!</p>
              <p style={{ fontSize: '0.85rem' }}>No new notifications right now.</p>
            </div>
          ) : (
            relevantNotifs.map(notif => (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                style={{
                  background: notif.read ? '#f8fafc' : '#f0fdf4',
                  border: `1px solid ${notif.read ? '#e2e8f0' : '#bbf7d0'}`,
                  borderRadius: '12px',
                  padding: '14px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ marginTop: '2px' }}>
                  {getIcon(notif.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} />
                    )}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.35 }}>
                    {notif.message}
                  </p>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginTop: '6px' }}>
                    {notif.timestamp}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
