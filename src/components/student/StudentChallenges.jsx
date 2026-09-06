import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, Calendar, Award, Users, PlusCircle, CheckCircle } from 'lucide-react';

export default function StudentChallenges() {
  const { challenges, currentStudent, joinChallenge, setIsSubmitModalOpen } = useApp();

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>
            <span>🎯</span>
            <span>Classroom Eco Challenges</span>
          </h2>
          <p>Join group challenges set by your teacher to earn bonus points and boost class impact!</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {challenges.map(challenge => {
          const isJoined = currentStudent && challenge.participantIds.includes(currentStudent.id);

          return (
            <div 
              key={challenge.id} 
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: isJoined ? '2px solid #86efac' : '1px solid #d1fae5',
                background: isJoined ? 'linear-gradient(135deg, #ffffff, #f0fdf4)' : '#ffffff',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.8rem' }}>{challenge.categoryIcon}</span>
                  <span 
                    style={{
                      background: '#fef3c7',
                      color: '#b45309',
                      border: '1px solid #fde68a',
                      padding: '4px 12px',
                      borderRadius: '99px',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Award size={14} />
                    <span>+{challenge.bonusPoints} Bonus Pts</span>
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#14532d', marginBottom: '8px' }}>
                  {challenge.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.45, marginBottom: '16px' }}>
                  {challenge.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: '#64748b', marginBottom: '20px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    <span>{challenge.startDate} to {challenge.endDate}</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={14} />
                    <span>{challenge.participantIds.length} students joined</span>
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <button
                  className={isJoined ? "btn-secondary" : "btn-primary"}
                  style={{ flex: 1, padding: '10px 16px', fontSize: '0.88rem' }}
                  onClick={() => joinChallenge(challenge.id)}
                >
                  {isJoined ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#16a34a' }}>
                      <CheckCircle size={16} />
                      <span>Joined ✓</span>
                    </span>
                  ) : (
                    <span>Participate Now</span>
                  )}
                </button>

                <button
                  className="btn-secondary"
                  style={{ padding: '10px 14px', fontSize: '0.88rem' }}
                  onClick={() => setIsSubmitModalOpen(true)}
                  title="Submit activity toward this challenge"
                >
                  <PlusCircle size={16} />
                  <span>Submit Proof</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
