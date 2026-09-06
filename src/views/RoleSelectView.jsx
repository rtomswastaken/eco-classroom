import React from 'react';
import { useApp } from '../context/AppContext';
import { User, GraduationCap, ArrowRight, Sparkles, Shield, Leaf } from 'lucide-react';

export default function RoleSelectView() {
  const { selectRole, classroom } = useApp();

  return (
    <div className="role-select-overlay">
      <div className="role-select-container">
        {/* Brand Header */}
        <div className="role-select-header">
          <div className="role-brand-badge">
            <span style={{ fontSize: '2rem' }}>🌍</span>
          </div>
          <h1>Welcome to EcoClassroom</h1>
          <p className="tagline">Small Actions. Big Impact.</p>
          <p className="instruction">Please choose your role to enter the application:</p>
        </div>

        {/* Role Cards Selection Grid */}
        <div className="role-cards-grid">
          {/* Student Mode Card */}
          <div 
            className="role-card student-card"
            onClick={() => selectRole('student')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectRole('student'); }}
          >
            <div className="role-card-badge">👨‍🎓 Student Portal</div>
            <div className="role-card-avatar">🦊</div>
            <h2>I am a Student</h2>
            <p>
              Submit your real-world eco-actions with photo proof, earn points, unlock awesome badges, and climb the class leaderboard!
            </p>

            <ul className="role-features-list">
              <li><span>🌱</span> Submit recycling, planting & water actions</li>
              <li><span>🏆</span> Track your points & level progression</li>
              <li><span>🎖️</span> Unlock eco badges in your trophy room</li>
              <li><span>🎯</span> Join active classroom challenges</li>
            </ul>

            <button type="button" className="btn-role-enter student-enter-btn">
              <span>Enter as Student</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Teacher Mode Card */}
          <div 
            className="role-card teacher-card"
            onClick={() => selectRole('teacher')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectRole('teacher'); }}
          >
            <div className="role-card-badge teacher-badge-pill">👩‍🏫 Teacher / Class Admin</div>
            <div className="role-card-avatar teacher-avatar">👩‍🏫</div>
            <h2>I am a Teacher</h2>
            <p>
              Review pending student submissions, confirm points, launch class challenges, and monitor collective sustainability impact.
            </p>

            <ul className="role-features-list">
              <li><span>⏳</span> Review photo proof & approve with points</li>
              <li><span>📈</span> View classroom collective impact statistics</li>
              <li><span>👥</span> Manage enrolled student roster</li>
              <li><span>🚀</span> Launch custom classroom eco-challenges</li>
            </ul>

            <button type="button" className="btn-role-enter teacher-enter-btn">
              <span>Enter as Teacher</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Classroom Info Footer */}
        <div className="role-select-footer">
          <div className="classroom-preview-chip">
            <span style={{ fontSize: '1.2rem' }}>🌱</span>
            <span>Classroom: <strong>{classroom.name}</strong></span>
            <span className="code-badge">CODE: {classroom.code}</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '12px' }}>
            Greenwood Elementary School • Safe, child-friendly classroom environment
          </p>
        </div>
      </div>
    </div>
  );
}
