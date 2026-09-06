import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AVATARS } from '../../types/data';
import { Award, Shield, Edit3, Check, Sparkles, Trophy, Calendar } from 'lucide-react';

export default function StudentProfile() {
  const { 
    currentStudent, 
    currentStudentRank, 
    currentStudentLevel, 
    currentStudentBadges, 
    updateStudentProfile 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentStudent?.displayName || '');
  const [bio, setBio] = useState(currentStudent?.bio || '');
  const [selectedAvatar, setSelectedAvatar] = useState(currentStudent?.avatar || '🦊');

  if (!currentStudent) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateStudentProfile(currentStudent.id, {
      displayName: displayName.trim() || currentStudent.displayName,
      bio: bio.trim(),
      avatar: selectedAvatar,
    });
    setIsEditing(false);
  };

  const unlockedCount = currentStudentBadges.filter(b => b.unlocked).length;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>
            <span>👤</span>
            <span>Student Profile & Badges</span>
          </h2>
          <p>Customize your classroom avatar and view your sustainability achievements.</p>
        </div>

        <button 
          className="btn-secondary" 
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit3 size={16} />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Profile Overview Card */}
      <div className="card" style={{ marginBottom: '28px' }}>
        {isEditing ? (
          <form onSubmit={handleSave}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#14532d', marginBottom: '16px' }}>
              Choose Your Eco Avatar & Info
            </h3>

            <div className="form-group">
              <label className="form-label">Pick Your Classroom Mascot</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {AVATARS.map(item => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setSelectedAvatar(item.emoji)}
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      fontSize: '1.8rem',
                      background: selectedAvatar === item.emoji ? '#dcfce7' : '#f8fafc',
                      border: `2px solid ${selectedAvatar === item.emoji ? '#22c55e' : '#e2e8f0'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                      boxShadow: selectedAvatar === item.emoji ? '0 4px 10px rgba(34,197,94,0.25)' : 'none',
                    }}
                    title={item.label}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="disp-name">Display Name</label>
              <input
                id="disp-name"
                className="form-input"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={24}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="disp-bio">Eco Motto / Bio</label>
              <input
                id="disp-bio"
                className="form-input"
                type="text"
                placeholder="e.g. Always remember to turn off lights!"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={100}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button type="submit" className="btn-primary">
                <Check size={16} />
                <span>Save Profile</span>
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div 
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '24px',
                background: '#dcfce7',
                border: '3px solid #86efac',
                fontSize: '3.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(34, 197, 94, 0.25)',
              }}
            >
              {currentStudent.avatar}
            </div>

            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#14532d' }}>
                  {currentStudent.name}
                </h3>
                <span 
                  style={{
                    background: '#dcfce7',
                    color: '#15803d',
                    border: '1px solid #86efac',
                    padding: '2px 10px',
                    borderRadius: '99px',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                  }}
                >
                  {currentStudent.grade}
                </span>
              </div>

              <p style={{ color: '#475569', fontSize: '0.95rem', marginTop: '4px' }}>
                "{currentStudent.bio || 'Taking positive actions for our planet every single day.'}"
              </p>

              <div style={{ display: 'flex', gap: '20px', marginTop: '14px', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Eco Level</span>
                  <div style={{ fontWeight: 800, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{currentStudentLevel.icon}</span>
                    <span>{currentStudentLevel.name}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Class Rank</span>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>
                    🏆 #{currentStudentRank} in Class
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Points</span>
                  <div style={{ fontWeight: 800, color: '#16a34a' }}>
                    🌟 {currentStudent.points} Points
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Achievements</span>
                  <div style={{ fontWeight: 800, color: '#eab308' }}>
                    🎖️ {unlockedCount} / {currentStudentBadges.length} Badges
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Badges Trophy Room Section */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#14532d', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award color="#eab308" size={24} />
              <span>Eco Badges Trophy Room</span>
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
              Earn badges by completing different kinds of sustainable actions!
            </p>
          </div>

          <span 
            style={{
              background: '#fef3c7',
              color: '#b45309',
              fontWeight: 800,
              fontSize: '0.85rem',
              padding: '6px 14px',
              borderRadius: '99px',
              border: '1px solid #fde68a',
            }}
          >
            {unlockedCount} of {currentStudentBadges.length} Unlocked
          </span>
        </div>

        <div className="badges-grid">
          {currentStudentBadges.map(badge => (
            <div 
              key={badge.id}
              className={`badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="badge-icon-box">
                {badge.icon}
              </div>
              <div className="badge-info">
                <h4>{badge.name}</h4>
                <p>{badge.description}</p>
                <span className="badge-status-tag">
                  {badge.unlocked ? '✨ Earned' : `Goal: ${badge.progress}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Child Privacy & Safety Banner */}
      <div 
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#475569',
          fontSize: '0.85rem',
        }}
      >
        <Shield size={20} color="#16a34a" />
        <span>
          <strong>School Safety & Privacy Notice:</strong> Student profiles are visible only within your classroom. No personal contact information or private data is ever shared publicly.
        </span>
      </div>
    </div>
  );
}
