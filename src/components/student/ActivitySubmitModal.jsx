import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_PHOTO_PRESETS } from '../../types/data';
import { X, Upload, Sparkles, Image as ImageIcon, Camera } from 'lucide-react';

export default function ActivitySubmitModal() {
  const { 
    isSubmitModalOpen, 
    setIsSubmitModalOpen, 
    categories, 
    submitActivity 
  } = useApp();

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('reusing');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState('/samples/bottle-planter.jpg');
  const [selectedPresetId, setSelectedPresetId] = useState('bottle-planter');

  if (!isSubmitModalOpen) return null;

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setPhoto(preset.image);
    if (!title || title.trim() === '') {
      setTitle(preset.title);
    }
    if (!description || description.trim() === '') {
      setDescription(preset.description);
    }
    setCategoryId(preset.category);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setSelectedPresetId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    submitActivity({
      title,
      categoryId,
      description: description || 'Completed eco-friendly activity for our classroom challenge!',
      photo: photo || '/samples/bottle-planter.jpg',
      notes,
    });

    setIsSubmitModalOpen(false);
    // Reset form
    setTitle('');
    setDescription('');
    setNotes('');
  };

  const selectedCategory = categories.find(c => c.id === categoryId) || categories[0];

  return (
    <div className="modal-backdrop" onClick={() => setIsSubmitModalOpen(false)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <span>🌱</span>
            <span>Submit Eco Activity</span>
          </h3>
          <button 
            className="modal-close-btn"
            onClick={() => setIsSubmitModalOpen(false)}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Quick Demo Presets */}
          <div className="form-group" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px 14px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#14532d', marginBottom: '8px' }}>
              <Sparkles size={16} color="#16a34a" />
              <span>Quick Photo & Activity Presets (Perfect for Presentation):</span>
            </label>
            <div className="photo-presets-grid">
              {SAMPLE_PHOTO_PRESETS.map(preset => (
                <button
                  type="button"
                  key={preset.id}
                  className={`preset-photo-btn ${selectedPresetId === preset.id ? 'active' : ''}`}
                  onClick={() => handleSelectPreset(preset)}
                >
                  <img src={preset.image} alt={preset.name} />
                  <div className="preset-photo-text">
                    <div className="title">{preset.name}</div>
                    <div className="sub">+{preset.points} pts suggested</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="act-title">Activity Name *</label>
            <input
              id="act-title"
              className="form-input"
              type="text"
              required
              placeholder="e.g. Made a pencil holder from an old plastic bottle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="act-category">Eco Category</label>
            <select
              id="act-category"
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name} (+{cat.defaultPoints} suggested points)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="act-desc">Short Description *</label>
            <textarea
              id="act-desc"
              className="form-textarea"
              rows={3}
              required
              placeholder="What did you do? Why does this help our environment?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Photo Proof</label>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              {photo && (
                <img 
                  src={photo} 
                  alt="Activity preview" 
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px', border: '2px solid #86efac' }} 
                />
              )}
              <label 
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  border: '2px dashed #cbd5e1',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: '#f8fafc',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#475569'
                }}
              >
                <Camera size={18} />
                <span>Upload Custom Photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleFileUpload} 
                />
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="act-notes">Optional Additional Notes</label>
            <input
              id="act-notes"
              className="form-input"
              type="text"
              placeholder="e.g. Completed with help from my science partner"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <span>Submit for Teacher Review</span>
              <span>🚀</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
