import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Clock, 
  Users, 
  Trophy, 
  Target, 
  BarChart3, 
  Settings 
} from 'lucide-react';

import TeacherDashboard from '../components/teacher/TeacherDashboard';
import PendingSubmissions from '../components/teacher/PendingSubmissions';
import StudentRoster from '../components/teacher/StudentRoster';
import StudentLeaderboard from '../components/student/StudentLeaderboard';
import ChallengeManager from '../components/teacher/ChallengeManager';
import ClassroomStats from '../components/teacher/ClassroomStats';
import ClassroomSettings from '../components/teacher/ClassroomSettings';

export default function TeacherView() {
  const { teacherTab, setTeacherTab, pendingCount, classroom } = useApp();

  const renderActiveTab = () => {
    switch (teacherTab) {
      case 'dashboard':
        return <TeacherDashboard />;
      case 'submissions':
        return <PendingSubmissions />;
      case 'students':
        return <StudentRoster />;
      case 'leaderboard':
        return <StudentLeaderboard />;
      case 'challenges':
        return <ChallengeManager />;
      case 'stats':
        return <ClassroomStats />;
      case 'settings':
        return <ClassroomSettings />;
      default:
        return <TeacherDashboard />;
    }
  };

  return (
    <div className="teacher-portal-view">
      {/* Teacher Sub-Navigation Bar */}
      <nav className="app-nav">
        <div className="nav-tabs" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            <button
              className={`nav-tab-btn ${teacherTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setTeacherTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button
              className={`nav-tab-btn ${teacherTab === 'submissions' ? 'active' : ''}`}
              onClick={() => setTeacherTab('submissions')}
            >
              <Clock size={18} />
              <span>Pending Submissions</span>
              {pendingCount > 0 && <span className="nav-counter">{pendingCount}</span>}
            </button>

            <button
              className={`nav-tab-btn ${teacherTab === 'students' ? 'active' : ''}`}
              onClick={() => setTeacherTab('students')}
            >
              <Users size={18} />
              <span>Student Roster</span>
            </button>

            <button
              className={`nav-tab-btn ${teacherTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setTeacherTab('leaderboard')}
            >
              <Trophy size={18} />
              <span>Leaderboard</span>
            </button>

            <button
              className={`nav-tab-btn ${teacherTab === 'challenges' ? 'active' : ''}`}
              onClick={() => setTeacherTab('challenges')}
            >
              <Target size={18} />
              <span>Eco Challenges</span>
            </button>

            <button
              className={`nav-tab-btn ${teacherTab === 'stats' ? 'active' : ''}`}
              onClick={() => setTeacherTab('stats')}
            >
              <BarChart3 size={18} />
              <span>Class Statistics</span>
            </button>

            <button
              className={`nav-tab-btn ${teacherTab === 'settings' ? 'active' : ''}`}
              onClick={() => setTeacherTab('settings')}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </div>

          <div style={{ fontSize: '0.82rem', color: '#15803d', fontWeight: 700, padding: '4px 10px', background: '#dcfce7', borderRadius: '99px', whiteSpace: 'nowrap' }}>
            Admin: {classroom.teacherName}
          </div>
        </div>
      </nav>

      {/* Main Teacher Content */}
      <div className="main-container">
        {renderActiveTab()}
      </div>
    </div>
  );
}
