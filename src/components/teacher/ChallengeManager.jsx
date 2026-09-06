import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Target, PlusCircle, Calendar, Award, Users, CheckCircle } from 'lucide-react';

export default function ChallengeManager() {
  const { challenges, categories, createChallenge, students } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('recycling');
  const [bonusPoints, setBonusPoints] = useState('20');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('2026-09-30');
  const [description, setDescription] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    createChallenge({
      title,
      categoryId,
      bonusPoints,
      startDate,
      endDate,
      description,
    });

    setIsCreating(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>
            <span>🎯</span>
            <span>Classroom Eco Challenges Manager</span>
          </h2>
          <p>Create thematic sustainability sprints to spark group excitement and teamwork.</p>
        </div>

        <button className="btn-primary" onClick={() => setIsCreating(!isCreating)}>
          <PlusCircle size={18} />
          <span>{isCreating ? 'Close Form' : 'Create New Challenge'}</span>
        </button>
      </div>

      {/* Create Challenge Form */}
      {isCreating && (
        <div className="card" style={{ marginBottom: '28px', border: '2px solid #86efac', background: '#f0fdf4' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#14532d', marginBottom: '16px' }}>
            Launch a New Eco Challenge
          </h3>

          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="chal-title">Challenge Title *</label>
                <input
                  id="chal-title"
                  className="form-input"
                  type="text"
                  placeholder="e.g. 🌳 Plant & Protect Challenge"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="chal-cat">Theme Category</label>
                <select
                  id="chal-cat"
                  className="form-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="chal-pts">Bonus Reward Points</label>
                <input
                  id="chal-pts"
                  className="form-input"
                  type="number"
                  min="5"
                  max="100"
                  value={bonusPoints}
                  onChange={(e) => setBonusPoints(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="chal-end">End Date</label>
                <input
                  id="chal-end"
                  className="form-input"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="chal-desc">Challenge Instructions *</label>
              <textarea
                id="chal-desc"
                className="form-textarea"
                rows={2}
                placeholder="Explain what actions students should take to complete this challenge."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button type="button" className="btn-secondary" onClick={() => setIsCreating(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <span>Publish to Classroom</span>
                <span>🚀</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Challenges List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {challenges.map(challenge => (
          <div key={challenge.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.8rem' }}>{challenge.categoryIcon}</span>
              <span 
                style={{
                  background: '#fef3c7',
                  color: '#b45309',
                  border: '1px solid #fde68a',
                  padding: '4px 10px',
                  borderRadius: '99px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Award size={14} />
                <span>+{challenge.bonusPoints} Bonus Pts</span>
              </span>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#14532d', marginBottom: '6px' }}>
              {challenge.title}
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.4, marginBottom: '16px' }}>
              {challenge.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '12px', fontSize: '0.82rem', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} />
                <span>Until {challenge.endDate}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: '#16a34a' }}>
                <Users size={14} />
                <span>{challenge.participantIds.length} Joined</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
