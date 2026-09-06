import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Copy, 
  Check, 
  ArrowLeftRight,
  LogOut,
  User, 
  GraduationCap
} from 'lucide-react';
import NotificationDrawer from './NotificationDrawer';

export default function Navbar() {
  const { 
    currentRole, 
    exitToRoleSelect, 
    classroom, 
    currentStudent, 
    pendingCount,
    notifications,
    showToast
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classroom.code);
    setCopied(true);
    showToast(`Classroom Code copied: ${classroom.code} 📋`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          {/* Brand */}
          <div className="brand-container" onClick={exitToRoleSelect} title="Return to Role Selection">
            <div className="brand-icon-box">🌍</div>
            <div className="brand-text">
              <h1>EcoClassroom</h1>
              <p>Small Actions. Big Impact.</p>
            </div>
          </div>

          {/* Classroom Join Code Pill */}
          <div className="class-pill">
            <span>🌱 {classroom.name}</span>
            <span 
              className="code-tag" 
              onClick={handleCopyCode} 
              style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              title="Click to copy join code"
            >
              CODE: {classroom.code}
              {copied ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
            </span>
          </div>

          {/* Active Mode Display & Switch Mode Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '0.85rem',
                fontWeight: 800,
                background: currentRole === 'teacher' ? '#fef3c7' : '#dcfce7',
                color: currentRole === 'teacher' ? '#78350f' : '#14532d',
                border: `1.5px solid ${currentRole === 'teacher' ? '#fde68a' : '#86efac'}`,
              }}
            >
              {currentRole === 'teacher' ? (
                <>
                  <GraduationCap size={16} />
                  <span>Teacher Portal</span>
                  {pendingCount > 0 && <span className="nav-counter" style={{ marginLeft: '4px' }}>{pendingCount}</span>}
                </>
              ) : (
                <>
                  <User size={15} />
                  <span>Student Portal</span>
                </>
              )}
            </div>

            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '99px' }}
              onClick={exitToRoleSelect}
              title="Switch role / return to entrance"
            >
              <ArrowLeftRight size={13} />
              <span>Switch Mode</span>
            </button>
          </div>

          {/* Header Right Actions */}
          <div className="header-right">
            <button 
              className="notif-bell-btn"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              title="View Notifications"
              aria-label="View notifications"
            >
              <Bell size={19} />
              {unreadNotifsCount > 0 && (
                <span className="notif-badge">{unreadNotifsCount}</span>
              )}
            </button>

            <div 
              className="user-mini-card"
              title={currentRole === 'student' ? `Signed in as ${currentStudent?.displayName}` : `Class Admin: ${classroom.teacherName}`}
            >
              <div className="user-avatar-circle">
                {currentRole === 'teacher' ? '👩‍🏫' : currentStudent?.avatar || '🦊'}
              </div>
              <div className="user-mini-info">
                <div className="user-mini-name">
                  {currentRole === 'teacher' ? classroom.teacherName : currentStudent?.displayName || 'Student'}
                </div>
                <div className="user-mini-role">
                  {currentRole === 'teacher' ? 'Class Admin' : `${currentStudent?.points || 0} pts`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <NotificationDrawer 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
      />
    </>
  );
}
