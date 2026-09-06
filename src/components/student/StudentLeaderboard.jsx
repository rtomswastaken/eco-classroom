import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Award, CheckCircle, Sparkles, Heart } from 'lucide-react';
import { getStudentLevel } from '../../types/data';

export default function StudentLeaderboard() {
  const { students, currentStudent, currentRole } = useApp();

  const top1 = students[0];
  const top2 = students[1];
  const top3 = students[2];

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>
            <span>🏆</span>
            <span>Classroom Eco Champions</span>
          </h2>
          <p>Every eco action counts! Celebrate every step our classroom takes toward a cleaner Earth.</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      {students.length >= 3 && (
        <div className="podium-container">
          {/* Rank 2 (Silver) */}
          <div className="podium-step rank-2">
            <div className="podium-student-card">
              <div className="podium-avatar-ring">
                <span>{top2.avatar}</span>
                <span className="podium-medal-badge">🥈</span>
              </div>
              <div className="podium-name">{top2.displayName}</div>
              <div className="podium-points">{top2.points} pts</div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{top2.activitiesCount} actions</span>
            </div>
            <div className="podium-pedestal">
              <span className="rank-num">2</span>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Silver</span>
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="podium-step rank-1">
            <div className="podium-student-card">
              <div className="podium-avatar-ring">
                <span>{top1.avatar}</span>
                <span className="podium-medal-badge">🥇</span>
              </div>
              <div className="podium-name" style={{ fontSize: '1.2rem', color: '#b45309' }}>
                {top1.displayName}
              </div>
              <div className="podium-points" style={{ fontSize: '1.1rem', color: '#15803d' }}>
                {top1.points} pts
              </div>
              <span style={{ fontSize: '0.8rem', color: '#854d0e', fontWeight: 700 }}>
                🌱 {getStudentLevel(top1.points).name}
              </span>
            </div>
            <div className="podium-pedestal">
              <span className="rank-num">1</span>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Champion</span>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="podium-step rank-3">
            <div className="podium-student-card">
              <div className="podium-avatar-ring">
                <span>{top3.avatar}</span>
                <span className="podium-medal-badge">🥉</span>
              </div>
              <div className="podium-name">{top3.displayName}</div>
              <div className="podium-points">{top3.points} pts</div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{top3.activitiesCount} actions</span>
            </div>
            <div className="podium-pedestal">
              <span className="rank-num">3</span>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bronze</span>
            </div>
          </div>
        </div>
      )}

      {/* Encouraging Classroom Banner */}
      <div 
        style={{ 
          background: '#f0fdf4', 
          border: '1.5px dashed #86efac', 
          borderRadius: '16px', 
          padding: '14px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '10px',
          marginBottom: '24px',
          color: '#14532d',
          fontWeight: 700,
          fontSize: '0.92rem'
        }}
      >
        <Heart size={18} color="#16a34a" fill="#16a34a" />
        <span>"Small daily habits create massive collective impact. Keep inspiring each other!"</span>
      </div>

      {/* Full Leaderboard Table */}
      <div className="card" style={{ padding: '12px 16px' }}>
        <table className="leaderboard-table">
          <thead>
            <tr style={{ textAlign: 'left', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '12px 20px', width: '70px' }}>Rank</th>
              <th style={{ padding: '12px 20px' }}>Student</th>
              <th style={{ padding: '12px 20px' }}>Level</th>
              <th style={{ padding: '12px 20px', textAlign: 'center' }}>Completed Actions</th>
              <th style={{ padding: '12px 20px', textAlign: 'right' }}>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const rank = index + 1;
              const isCurrent = currentRole === 'student' && currentStudent?.id === student.id;
              const level = getStudentLevel(student.points);

              return (
                <tr 
                  key={student.id} 
                  className={`leaderboard-row ${isCurrent ? 'current-user' : ''}`}
                >
                  <td className="leaderboard-cell">
                    <div className={`rank-badge-item ${
                      rank === 1 ? 'rank-1-badge' : rank === 2 ? 'rank-2-badge' : rank === 3 ? 'rank-3-badge' : 'rank-other-badge'
                    }`}>
                      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                    </div>
                  </td>

                  <td className="leaderboard-cell">
                    <div className="student-cell-info">
                      <div className="student-list-avatar">{student.avatar}</div>
                      <div>
                        <div className="student-list-name">
                          <span>{student.name}</span>
                          {isCurrent && <span className="you-tag">YOU</span>}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {student.grade || 'Grade 5'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="leaderboard-cell">
                    <span 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        background: '#f1f5f9', 
                        padding: '4px 10px', 
                        borderRadius: '99px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#334155'
                      }}
                    >
                      <span>{level.icon}</span>
                      <span>{level.name}</span>
                    </span>
                  </td>

                  <td className="leaderboard-cell" style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
                      {student.activitiesCount}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '4px' }}>actions</span>
                  </td>

                  <td className="leaderboard-cell" style={{ textAlign: 'right' }}>
                    <div className="points-pill">
                      <span>{student.points}</span>
                      <span style={{ fontSize: '0.85rem' }}>pts</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
