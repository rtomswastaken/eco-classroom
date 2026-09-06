import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Key, Plus, RefreshCw, Copy, Check, Tag } from 'lucide-react';

export default function ClassroomSettings() {
  const { classroom, updateClassroomSettings, categories, addCategory, showToast } = useApp();

  const [name, setName] = useState(classroom.name);
  const [grade, setGrade] = useState(classroom.grade);
  const [school, setSchool] = useState(classroom.school || 'Greenwood Elementary School');
  const [description, setDescription] = useState(classroom.description || '');
  const [codeCopied, setCodeCopied] = useState(false);

  // New Category State
  const [catName, setCatName] = useState('');
  const [catIcon, setCatIcon] = useState('🌱');
  const [catPoints, setCatPoints] = useState('15');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateClassroomSettings({
      name,
      grade,
      school,
      description,
    });
  };

  const handleRegenerateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let newCode = '';
    for (let i = 0; i < 6; i++) {
      newCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    updateClassroomSettings({ code: newCode });
    showToast(`New Classroom Join Code generated: ${newCode} 🔑`, 'success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classroom.code);
    setCodeCopied(true);
    showToast(`Join code ${classroom.code} copied!`, 'success');
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    addCategory({
      name: catName.trim(),
      icon: catIcon || '🌱',
      defaultPoints: catPoints,
    });

    setCatName('');
    setCatIcon('🌱');
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>
            <span>⚙️</span>
            <span>Classroom Settings & Customization</span>
          </h2>
          <p>Configure classroom information, student join codes, and custom activity categories.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Classroom Info Form */}
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#14532d', marginBottom: '16px' }}>
            Classroom Details
          </h3>

          <form onSubmit={handleSaveSettings}>
            <div className="form-group">
              <label className="form-label" htmlFor="class-name">Classroom Name</label>
              <input
                id="class-name"
                className="form-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="class-grade">Grade / Section</label>
              <input
                id="class-grade"
                className="form-input"
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="class-school">School Name</label>
              <input
                id="class-school"
                className="form-input"
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="class-desc">Mission / Description</label>
              <textarea
                id="class-desc"
                className="form-textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
              Save Classroom Info
            </button>
          </form>
        </div>

        {/* Join Code Card */}
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#14532d', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={20} color="#16a34a" />
            <span>Student Join Code</span>
          </h3>

          <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '16px' }}>
            Share this join code with your students. They can enter it on the student registration screen to join this classroom.
          </p>

          <div 
            style={{
              background: '#f0fdf4',
              border: '2px dashed #86efac',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Classroom Code
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#14532d', letterSpacing: '0.1em', fontFamily: 'monospace', margin: '6px 0' }}>
              {classroom.code}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '12px' }}>
              <button 
                type="button" 
                className="btn-primary" 
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                onClick={handleCopyCode}
              >
                {codeCopied ? <Check size={16} /> : <Copy size={16} />}
                <span>{codeCopied ? 'Copied!' : 'Copy Code'}</span>
              </button>

              <button 
                type="button" 
                className="btn-secondary" 
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                onClick={handleRegenerateCode}
                title="Generate a new random code"
              >
                <RefreshCw size={14} />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          {/* Custom Category Creator */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#14532d', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={16} color="#16a34a" />
              <span>Add Custom Eco Category</span>
            </h4>

            <form onSubmit={handleAddCategory}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px', gap: '8px', marginBottom: '10px' }}>
                <input
                  className="form-input"
                  style={{ textAlign: 'center', fontSize: '1.2rem', padding: '8px' }}
                  type="text"
                  placeholder="🌱"
                  value={catIcon}
                  maxLength={3}
                  onChange={(e) => setCatIcon(e.target.value)}
                  title="Emoji Icon"
                />
                <input
                  className="form-input"
                  type="text"
                  placeholder="Category Name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  required
                />
                <input
                  className="form-input"
                  type="number"
                  placeholder="Pts"
                  min="5"
                  max="50"
                  value={catPoints}
                  onChange={(e) => setCatPoints(e.target.value)}
                  title="Suggested Points"
                  required
                />
              </div>

              <button type="submit" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={16} />
                <span>Add Category</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
