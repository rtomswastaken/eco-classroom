import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  Users, 
  Award, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Target, 
  BarChart3, 
  ShieldCheck,
  PlusCircle
} from 'lucide-react';

export default function TeacherDashboard() {
  const { 
    classroom, 
    students, 
    activities, 
    pendingCount, 
    challenges, 
    setActiveTab, 
    approveActivity 
  } = useApp();

  const approvedActivities = activities.filter(a => a.status === 'approved');
  const pendingActivities = activities.filter(a => a.status === 'pending');
  const totalPoints = students.reduce((acc, s) => acc + s.points, 0);

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>
            <span>👩‍🏫</span>
            <span>Teacher Admin Hub — {classroom.name}</span>
          </h2>
          <p>Manage classroom eco challenges, approve student actions, and monitor collective impact.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-secondary" 
            onClick={() => setActiveTab('stats')}
          >
            <BarChart3 size={16} />
            <span>View Full Analytics</span>
          </button>
          <button 
            className="btn-primary" 
            onClick={() => setActiveTab('challenges')}
          >
            <PlusCircle size={16} />
            <span>New Challenge</span>
          </button>
        </div>
      </div>

      {/* Pending Submissions Priority Alert Banner */}
      {pendingCount > 0 ? (
        <div className="alert-pending-banner">
          <div className="alert-pending-left">
            <div className="alert-icon">⏳</div>
            <div className="alert-text">
              <h3>{pendingCount} Pending Student Submission{pendingCount > 1 ? 's' : ''}</h3>
              <p>Students have submitted new eco actions with photo proof awaiting your review and point awards.</p>
            </div>
          </div>

          <button 
            className="btn-primary"
            style={{ background: '#78350f', color: '#fef3c7', padding: '10px 22px' }}
            onClick={() => setActiveTab('submissions')}
          >
            <span>Review Submissions Now</span>
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 color="#16a34a" size={24} />
            <div>
              <h4 style={{ fontWeight: 800, color: '#14532d', fontSize: '1rem' }}>All Submissions Reviewed!</h4>
              <p style={{ color: '#15803d', fontSize: '0.85rem' }}>Your pending verification queue is up to date.</p>
            </div>
          </div>
          <button 
            className="btn-secondary" 
            onClick={() => setActiveTab('submissions')}
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          >
            View History
          </button>
        </div>
      )}

      {/* 4 Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
            🌱
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14532d' }}>
              {approvedActivities.length}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Approved Actions
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
            🌟
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#b45309' }}>
              {totalPoints}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Classroom Points
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
            👨‍🎓
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0369a1' }}>
              {students.length}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Active Students
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
            🎯
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#6d28d9' }}>
              {challenges.length}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Eco Challenges
            </div>
          </div>
        </div>
      </div>

      {/* Recent Submissions & Leaderboard preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Quick Pending Submissions Preview */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#14532d', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="#f59e0b" />
              <span>Pending Review Queue</span>
            </h3>
            <button 
              className="btn-secondary" 
              style={{ padding: '4px 10px', fontSize: '0.8rem' }}
              onClick={() => setActiveTab('submissions')}
            >
              Open Hub
            </button>
          </div>

          {pendingActivities.length === 0 ? (
            <div style={{ padding: '30px 20px', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontWeight: 700 }}>No submissions awaiting review.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pendingActivities.slice(0, 3).map(act => (
                <div 
                  key={act.id} 
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: '12px',
                    background: '#fffbeb',
                    border: '1px solid #fef08a'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img 
                      src={act.photo} 
                      alt={act.title} 
                      style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>
                        {act.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        by {act.studentAvatar} {act.studentName} • {act.categoryName}
                      </div>
                    </div>
                  </div>

                  <button 
                    className="btn-approve"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    onClick={() => approveActivity(act.id, act.suggestedPoints || 15, 'Approved via dashboard')}
                  >
                    <span>Approve (+{act.suggestedPoints || 15} pts)</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top 5 Leaderboard Preview */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#14532d', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="#eab308" />
              <span>Current Leaderboard Standings</span>
            </h3>
            <button 
              className="btn-secondary" 
              style={{ padding: '4px 10px', fontSize: '0.8rem' }}
              onClick={() => setActiveTab('leaderboard')}
            >
              Full Ranks
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {students.slice(0, 5).map((student, idx) => (
              <div 
                key={student.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: idx === 0 ? '#f0fdf4' : '#ffffff',
                  border: `1px solid ${idx === 0 ? '#86efac' : '#e2e8f0'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontWeight: 900, width: '22px', color: idx === 0 ? '#b45309' : '#64748b' }}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </span>
                  <span style={{ fontSize: '1.2rem' }}>{student.avatar}</span>
                  <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1e293b' }}>
                    {student.name}
                  </span>
                </div>

                <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.95rem' }}>
                  {student.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
