import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Trophy, 
  Target, 
  User 
} from 'lucide-react';

import StudentDashboard from '../components/student/StudentDashboard';
import StudentActivities from '../components/student/StudentActivities';
import StudentLeaderboard from '../components/student/StudentLeaderboard';
import StudentChallenges from '../components/student/StudentChallenges';
import StudentProfile from '../components/student/StudentProfile';
import ActivitySubmitModal from '../components/student/ActivitySubmitModal';

export default function StudentView() {
  const { 
    studentTab, 
    setStudentTab, 
    setIsSubmitModalOpen, 
    currentStudent 
  } = useApp();

  const renderActiveTab = () => {
    switch (studentTab) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'activities':
        return <StudentActivities />;
      case 'leaderboard':
        return <StudentLeaderboard />;
      case 'challenges':
        return <StudentChallenges />;
      case 'profile':
        return <StudentProfile />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="student-portal-view">
      {/* Student Sub-Navigation Bar */}
      <nav className="app-nav">
        <div className="nav-tabs" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            <button
              className={`nav-tab-btn ${studentTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setStudentTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button
              className="nav-tab-btn"
              onClick={() => setIsSubmitModalOpen(true)}
              style={{ color: '#16a34a', fontWeight: 700 }}
            >
              <PlusCircle size={18} />
              <span>Submit Activity</span>
            </button>

            <button
              className={`nav-tab-btn ${studentTab === 'activities' ? 'active' : ''}`}
              onClick={() => setStudentTab('activities')}
            >
              <History size={18} />
              <span>My Activities</span>
            </button>

            <button
              className={`nav-tab-btn ${studentTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setStudentTab('leaderboard')}
            >
              <Trophy size={18} />
              <span>Leaderboard</span>
            </button>

            <button
              className={`nav-tab-btn ${studentTab === 'challenges' ? 'active' : ''}`}
              onClick={() => setStudentTab('challenges')}
            >
              <Target size={18} />
              <span>Challenges</span>
            </button>

            <button
              className={`nav-tab-btn ${studentTab === 'profile' ? 'active' : ''}`}
              onClick={() => setStudentTab('profile')}
            >
              <User size={18} />
              <span>Profile & Badges</span>
            </button>
          </div>

          {/* Current Student Badge (no student switching) */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 14px',
              borderRadius: '99px',
              background: '#f0fdf4',
              border: '1px solid #86efac',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#14532d',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{currentStudent?.avatar || '🦊'}</span>
            <span>{currentStudent?.displayName || 'Alex'}</span>
            <span style={{ color: '#16a34a' }}>• {currentStudent?.points || 0} pts</span>
          </div>
        </div>
      </nav>

      {/* Main Student Content */}
      <div className="main-container">
        {renderActiveTab()}
      </div>

      {/* Submit Activity Modal */}
      <ActivitySubmitModal />
    </div>
  );
}
