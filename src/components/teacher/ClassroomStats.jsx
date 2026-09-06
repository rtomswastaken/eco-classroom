import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  Leaf, 
  Droplet, 
  Wind, 
  Users, 
  CheckCircle, 
  TrendingUp, 
  Sparkles, 
  PieChart 
} from 'lucide-react';

export default function ClassroomStats() {
  const { classroom, students, activities, categories } = useApp();

  const approvedActivities = activities.filter(a => a.status === 'approved');
  const totalSubmissions = activities.length;
  const totalPoints = students.reduce((acc, s) => acc + s.points, 0);

  // Category counts
  const catCounts = {};
  categories.forEach(c => { catCounts[c.id] = 0; });
  activities.forEach(a => {
    if (catCounts[a.category] !== undefined) {
      catCounts[a.category] += 1;
    } else {
      catCounts[a.category] = 1;
    }
  });

  const recyclingCount = catCounts['recycling'] || 0;
  const plantingCount = catCounts['planting'] || 0;
  const cleanupCount = (catCounts['nature'] || 0) + (catCounts['waste'] || 0);
  const waterCount = catCounts['water'] || 0;
  const transportCount = catCounts['transport'] || 0;
  const reusingCount = catCounts['reusing'] || 0;

  // Real-world collective estimates
  const estimatedCO2 = ((transportCount * 2.4) + (recyclingCount * 1.1) + (plantingCount * 5.0)).toFixed(1);
  const estimatedWater = (waterCount * 45 + recyclingCount * 12);
  const estimatedPlastics = (recyclingCount * 4 + reusingCount * 3);

  // Most popular category
  let mostPopularCat = categories[0];
  let maxCount = -1;
  categories.forEach(c => {
    const count = catCounts[c.id] || 0;
    if (count > maxCount) {
      maxCount = count;
      mostPopularCat = c;
    }
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>
            <span>📈</span>
            <span>Classroom Collective Impact Statistics</span>
          </h2>
          <p>
            Demonstrating how everyday student habits add up to real ecological change for our school and planet.
          </p>
        </div>
      </div>

      {/* Collective Impact Hero Banner */}
      <div className="impact-hero-banner">
        <h3>🌍 Collective Class Environmental Impact</h3>
        <p>
          "Small Actions. Big Impact." Every single recycled container, planted seedling, and water faucet checked by students helps build a sustainable future.
        </p>

        <div className="impact-stats-row">
          <div className="impact-card">
            <div className="icon-bubble">🌱</div>
            <div>
              <div className="val">{totalSubmissions}</div>
              <div className="lbl">Total Eco Activities</div>
            </div>
          </div>

          <div className="impact-card">
            <div className="icon-bubble">♻️</div>
            <div>
              <div className="val">{recyclingCount + reusingCount}</div>
              <div className="lbl">Recycling & Reusing</div>
            </div>
          </div>

          <div className="impact-card">
            <div className="icon-bubble">🌳</div>
            <div>
              <div className="val">{plantingCount}</div>
              <div className="lbl">Plants & Trees Added</div>
            </div>
          </div>

          <div className="impact-card">
            <div className="icon-bubble">👩‍🎓</div>
            <div>
              <div className="val">{students.length}</div>
              <div className="lbl">Active Green Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Estimated Equivalencies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'linear-gradient(135deg, #f0fdf4, #ffffff)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wind color="#15803d" size={28} />
          </div>
          <div>
            <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#15803d' }}>
              ~{estimatedCO2} kg
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
              CO₂ Emissions Prevented
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
              Equivalent to saving ~{Math.round(estimatedCO2 * 3.5)} miles of car travel!
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'linear-gradient(135deg, #f0f9ff, #ffffff)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Droplet color="#0284c7" size={28} />
          </div>
          <div>
            <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0284c7' }}>
              ~{estimatedWater} Liters
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
              Fresh Water Conserved
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
              Enough for ~{Math.round(estimatedWater / 2.5)} drinking bottles!
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'linear-gradient(135deg, #fffbeb, #ffffff)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf color="#b45309" size={28} />
          </div>
          <div>
            <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#b45309' }}>
              ~{estimatedPlastics} Items
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
              Single-Use Plastics Diverted
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
              Kept out of landfills and waterways
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Progress Bars */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#14532d', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieChart size={22} color="#16a34a" />
              <span>Activity Distribution by Category</span>
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Most Popular: <strong>{mostPopularCat.icon} {mostPopularCat.name}</strong> ({maxCount} actions)
            </p>
          </div>

          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '4px 12px', borderRadius: '99px' }}>
            {totalSubmissions} Total Submissions
          </span>
        </div>

        <div>
          {categories.map(cat => {
            const count = catCounts[cat.id] || 0;
            const percentage = totalSubmissions > 0 ? Math.round((count / totalSubmissions) * 100) : 0;

            return (
              <div key={cat.id} className="cat-bar-item">
                <div className="cat-bar-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{cat.icon}</span>
                    <span style={{ color: '#1e293b' }}>{cat.name}</span>
                  </div>
                  <div style={{ color: '#475569' }}>
                    <strong>{count}</strong> ({percentage}%)
                  </div>
                </div>

                <div className="cat-bar-track">
                  <div 
                    className="cat-bar-fill" 
                    style={{ 
                      width: `${percentage}%`,
                      background: cat.color || '#16a34a' 
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
