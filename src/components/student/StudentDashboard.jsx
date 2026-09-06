import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PlusCircle, 
  Trophy, 
  Award, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Leaf
} from 'lucide-react';

export default function StudentDashboard() {
  const {
    currentStudent,
    currentStudentRank,
    currentStudentLevel,
    currentStudentBadges,
    activities,
    challenges,
    setIsSubmitModalOpen,
    setActiveTab,
    joinChallenge,
  } = useApp();

  if (!currentStudent) {
    return <div className="card">Loading student profile...</div>;
  }

  // Student's recent activities
  const myActivities = activities.filter(a => a.studentId === currentStudent.id);
  const recentActivities = myActivities.slice(0, 4);

  // Unlocked badges count
  const unlockedBadges = currentStudentBadges.filter(b => b.unlocked);

  return (
    <div>
      {/* Student Hero Card with Points & Level */}
      <div className="student-hero-card">
        <div className="student-welcome">
          <div>
            <div className="student-greeting-row">
              <div className="student-large-avatar">{currentStudent.avatar}</div>
              <div className="student-intro">
                <h2>Hey, {currentStudent.displayName}! 👋</h2>
                <p>{currentStudent.bio || 'Taking daily steps to care for our Earth.'}</p>
                <div className="level-tag">
                  <span>{currentStudentLevel.icon}</span>
                  <span>{currentStudentLevel.name}</span>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="progress-container">
              <div className="progress-header">
                <span>Level Progress</span>
                <span className="points-needed">
                  {currentStudentLevel.pointsToNext > 0
                    ? `${currentStudentLevel.pointsToNext} pts to ${currentStudentLevel.nextLevelName}`
                    : 'Maximum Level Reached! 🌟'}
                </span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${currentStudentLevel.progress}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="quick-action-strip">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Leaf color="#16a34a" size={18} />
              <p>Did an eco-friendly action today?</p>
            </div>
            <button 
              className="btn-primary" 
              style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              onClick={() => setIsSubmitModalOpen(true)}
            >
              <PlusCircle size={16} />
              <span>Submit Proof</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="hero-stats-grid">
          <div className="stat-box highlight">
            <div className="stat-icon">🌟</div>
            <div className="stat-value">{currentStudent.points}</div>
            <div className="stat-label">Total Eco Points</div>
          </div>

          <div 
            className="stat-box" 
            onClick={() => setActiveTab('leaderboard')} 
            style={{ cursor: 'pointer' }}
            title="View Class Leaderboard"
          >
            <div className="stat-icon">
              {currentStudentRank === 1 ? '🥇' : currentStudentRank === 2 ? '🥈' : currentStudentRank === 3 ? '🥉' : '🏆'}
            </div>
            <div className="stat-value">#{currentStudentRank}</div>
            <div className="stat-label">Classroom Rank</div>
          </div>

          <div 
            className="stat-box" 
            onClick={() => setActiveTab('activities')} 
            style={{ cursor: 'pointer' }}
          >
            <div className="stat-icon">♻️</div>
            <div className="stat-value">{myActivities.length}</div>
            <div className="stat-label">Eco Submissions</div>
          </div>

          <div 
            className="stat-box" 
            onClick={() => setActiveTab('profile')} 
            style={{ cursor: 'pointer' }}
          >
            <div className="stat-icon">🎖️</div>
            <div className="stat-value">{unlockedBadges.length}</div>
            <div className="stat-label">Badges Unlocked</div>
          </div>
        </div>
      </div>

      {/* Grid: Active Challenges & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        
        {/* Active Challenges Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#14532d', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target color="#16a34a" size={22} />
              <span>Active Eco Challenges</span>
            </h3>
            <button 
              className="btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              onClick={() => setActiveTab('challenges')}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {challenges.slice(0, 2).map(challenge => {
              const isJoined = challenge.participantIds.includes(currentStudent.id);
              return (
                <div 
                  key={challenge.id}
                  style={{
                    border: '1.5px solid #d1fae5',
                    borderRadius: '14px',
                    padding: '14px',
                    background: '#f0fdf4',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
                      {challenge.title}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px' }}>
                      {challenge.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', background: '#dcfce7', padding: '2px 8px', borderRadius: '99px' }}>
                        +{challenge.bonusPoints} Bonus Pts
                      </span>
                    </div>
                  </div>

                  <button
                    className={isJoined ? "btn-secondary" : "btn-primary"}
                    style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                    onClick={() => joinChallenge(challenge.id)}
                  >
                    {isJoined ? 'Joined ✓' : 'Join'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges Preview */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#14532d', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award color="#eab308" size={22} />
              <span>Earned Badges</span>
            </h3>
            <button 
              className="btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              onClick={() => setActiveTab('profile')}
            >
              Trophy Room
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {currentStudentBadges.slice(0, 6).map(badge => (
              <div
                key={badge.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  background: badge.unlocked ? '#f0fdf4' : '#f8fafc',
                  border: `1.5px solid ${badge.unlocked ? '#86efac' : '#e2e8f0'}`,
                  opacity: badge.unlocked ? 1 : 0.6,
                }}
                title={badge.description}
              >
                <span style={{ fontSize: '1.4rem' }}>{badge.icon}</span>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1e293b' }}>
                    {badge.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: badge.unlocked ? '#16a34a' : '#64748b', fontWeight: 600 }}>
                    {badge.unlocked ? 'Unlocked ✨' : badge.progress}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#14532d', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🌱</span>
            <span>My Recent Eco Activities</span>
          </h3>
          <button 
            className="btn-secondary" 
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('activities')}
          >
            <span>View All ({myActivities.length})</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {recentActivities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>No eco activities submitted yet!</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>Be the first in class to submit an eco action and start earning points.</p>
            <button className="btn-primary" onClick={() => setIsSubmitModalOpen(true)}>
              <PlusCircle size={18} />
              <span>Submit First Activity</span>
            </button>
          </div>
        ) : (
          <div className="activities-grid">
            {recentActivities.map(act => (
              <div key={act.id} className="activity-card">
                <div className="activity-photo-wrapper">
                  <img src={act.photo} alt={act.title} className="activity-photo" />
                  <span className={`status-badge status-${act.status}`}>
                    {act.status === 'approved' && <CheckCircle2 size={13} />}
                    {act.status === 'pending' && <Clock size={13} />}
                    <span>{act.status === 'approved' ? 'Approved' : act.status === 'pending' ? 'Pending Review' : 'Needs Update'}</span>
                  </span>
                  <span className="category-tag">
                    {act.categoryIcon} {act.categoryName}
                  </span>
                </div>

                <div className="activity-body">
                  <h4 className="activity-title">{act.title}</h4>
                  <p className="activity-desc">{act.description}</p>

                  {act.teacherFeedback && (
                    <div className="feedback-bubble">
                      <span>💬</span>
                      <div>
                        <strong>Mrs. Green:</strong> {act.teacherFeedback}
                      </div>
                    </div>
                  )}

                  <div className="activity-meta">
                    <span>{new Date(act.submittedAt).toLocaleDateString()}</span>
                    <span style={{ fontWeight: 800, color: act.status === 'approved' ? '#16a34a' : '#f59e0b', fontSize: '0.95rem' }}>
                      {act.status === 'approved' ? `+${act.pointsAwarded} pts` : `+${act.suggestedPoints || 15} pts pending`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
