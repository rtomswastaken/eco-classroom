import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Trash2, Eye, ShieldAlert, X, Award, CheckCircle } from 'lucide-react';
import { getStudentLevel, evaluateStudentBadges } from '../../types/data';

export default function StudentRoster() {
  const { students, activities, removeStudent, classroom } = useApp();
  const [selectedStudentForModal, setSelectedStudentForModal] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleOpenStudentModal = (student) => {
    setSelectedStudentForModal(student);
  };

  const studentActivities = selectedStudentForModal 
    ? activities.filter(a => a.studentId === selectedStudentForModal.id) 
    : [];

  const studentBadges = selectedStudentForModal 
    ? evaluateStudentBadges(studentActivities) 
    : [];

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>
            <span>👥</span>
            <span>Classroom Student Roster</span>
          </h2>
          <p>
            {students.length} students enrolled in {classroom.name}. Join Code: <strong>{classroom.code}</strong>
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '8px 16px' }}>
        <table className="leaderboard-table">
          <thead>
            <tr style={{ textAlign: 'left', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '12px 16px' }}>Student</th>
              <th style={{ padding: '12px 16px' }}>Grade</th>
              <th style={{ padding: '12px 16px' }}>Level</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Activities</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Total Points</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => {
              const level = getStudentLevel(student.points);

              return (
                <tr key={student.id} className="leaderboard-row">
                  <td className="leaderboard-cell">
                    <div className="student-cell-info">
                      <div className="student-list-avatar">{student.avatar}</div>
                      <div>
                        <div className="student-list-name">{student.name}</div>
                        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          Motto: "{student.bio || 'Protecting nature'}"
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="leaderboard-cell" style={{ color: '#475569', fontWeight: 600 }}>
                    {student.grade || 'Grade 5'}
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

                  <td className="leaderboard-cell" style={{ textAlign: 'center', fontWeight: 700 }}>
                    {student.activitiesCount}
                  </td>

                  <td className="leaderboard-cell" style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 900, color: '#16a34a', fontSize: '1.1rem' }}>
                      {student.points} pts
                    </span>
                  </td>

                  <td className="leaderboard-cell" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => handleOpenStudentModal(student)}
                        title="View profile and submissions"
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </button>

                      <button
                        className="btn-reject"
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                        onClick={() => setConfirmDeleteId(student.id)}
                        title="Remove student from classroom"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Remove Confirmation Modal */}
      {confirmDeleteId && (
        <div className="modal-backdrop" onClick={() => setConfirmDeleteId(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h3 style={{ color: '#b91c1c' }}>
                <ShieldAlert size={20} />
                <span>Confirm Student Removal</span>
              </h3>
              <button className="modal-close-btn" onClick={() => setConfirmDeleteId(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.92rem', color: '#334155', marginBottom: '20px' }}>
                Are you sure you want to remove this student from <strong>{classroom.name}</strong>? Their activity records in this classroom will be cleared.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button className="btn-secondary" onClick={() => setConfirmDeleteId(null)}>
                  Cancel
                </button>
                <button 
                  className="btn-reject"
                  onClick={() => {
                    removeStudent(confirmDeleteId);
                    setConfirmDeleteId(null);
                  }}
                >
                  Yes, Remove Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudentForModal && (
        <div className="modal-backdrop" onClick={() => setSelectedStudentForModal(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.8rem' }}>{selectedStudentForModal.avatar}</span>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{selectedStudentForModal.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{selectedStudentForModal.grade} • {selectedStudentForModal.points} Eco Points</span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedStudentForModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* Badges preview */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#14532d', marginBottom: '10px' }}>
                  Badges Earned ({studentBadges.filter(b => b.unlocked).length})
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {studentBadges.map(b => (
                    <span 
                      key={b.id} 
                      style={{
                        padding: '4px 10px',
                        borderRadius: '99px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        background: b.unlocked ? '#dcfce7' : '#f1f5f9',
                        color: b.unlocked ? '#15803d' : '#94a3b8',
                        border: `1px solid ${b.unlocked ? '#86efac' : '#e2e8f0'}`,
                      }}
                    >
                      {b.icon} {b.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Submissions list */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#14532d', marginBottom: '10px' }}>
                Submitted Activities ({studentActivities.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                {studentActivities.length === 0 ? (
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>No activities recorded yet.</p>
                ) : (
                  studentActivities.map(act => (
                    <div 
                      key={act.id} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img 
                          src={act.photo} 
                          alt={act.title} 
                          style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} 
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{act.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {act.categoryName} • Status: {act.status}
                          </div>
                        </div>
                      </div>

                      <span style={{ fontWeight: 800, color: act.status === 'approved' ? '#16a34a' : '#f59e0b', fontSize: '0.9rem' }}>
                        {act.status === 'approved' ? `+${act.pointsAwarded} pts` : 'Pending'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
