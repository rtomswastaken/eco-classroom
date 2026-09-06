// Data constants, level definitions, badges, categories, and presets

export const DEFAULT_CATEGORIES = [
  { id: 'recycling', name: 'Recycling', icon: '♻️', defaultPoints: 10, color: '#16a34a' },
  { id: 'reusing', name: 'Reusing Materials', icon: '🔄', defaultPoints: 15, color: '#0284c7' },
  { id: 'planting', name: 'Planting & Gardening', icon: '🌱', defaultPoints: 20, color: '#059669' },
  { id: 'water', name: 'Saving Water', icon: '💧', defaultPoints: 10, color: '#0ea5e9' },
  { id: 'energy', name: 'Saving Energy', icon: '⚡', defaultPoints: 10, color: '#eab308' },
  { id: 'transport', name: 'Sustainable Transport', icon: '🚲', defaultPoints: 10, color: '#8b5cf6' },
  { id: 'waste', name: 'Reducing Waste', icon: '🗑️', defaultPoints: 15, color: '#ea580c' },
  { id: 'nature', name: 'Helping Nature', icon: '🌍', defaultPoints: 20, color: '#10b981' },
  { id: 'art', name: 'Eco-Friendly Art', icon: '🎨', defaultPoints: 15, color: '#ec4899' },
  { id: 'other', name: 'Other Eco Activities', icon: '💡', defaultPoints: 10, color: '#64748b' },
];

export const SAMPLE_PHOTO_PRESETS = [
  {
    id: 'bottle-planter',
    name: '🐱 Cat Bottle Planter',
    category: 'reusing',
    title: 'Made a pencil holder & planter from plastic bottle',
    description: 'I cut and painted an old plastic soda bottle into a cute green cat planter with pencils on the side! Placed it on my desk with a sprout.',
    image: '/samples/bottle-planter.jpg',
    points: 15,
  },
  {
    id: 'tree-planting',
    name: '🌳 Oak Sapling Planting',
    category: 'planting',
    title: 'Planted an oak sapling in the school yard',
    description: 'Helped our science class plant a young oak sapling in fertile garden soil. Watered it with rainwater from our collection barrel.',
    image: '/samples/tree-planting.jpg',
    points: 20,
  },
  {
    id: 'litter-cleanup',
    name: '🚮 Neighborhood Park Cleanup',
    category: 'nature',
    title: 'Cleaned up plastic litter at the park',
    description: 'Used an eco litter grabber and biodegradable bag to pick up plastic bottles and snack wrappers in our local park.',
    image: '/samples/litter-cleanup.jpg',
    points: 20,
  },
  {
    id: 'bike-school',
    name: '🚲 Bicycled to School',
    category: 'transport',
    title: 'Rode my bicycle to school instead of a car',
    description: 'Biked 2 miles to Greenwood Elementary wearing my helmet! Saved car emissions and enjoyed the morning fresh air.',
    image: '/samples/bike-school.jpg',
    points: 10,
  }
];

export const AVATARS = [
  { id: 'fox', label: 'Clever Fox', emoji: '🦊' },
  { id: 'owl', label: 'Wise Owl', emoji: '🦉' },
  { id: 'panda', label: 'Gentle Panda', emoji: '🐼' },
  { id: 'turtle', label: 'Sea Turtle', emoji: '🐢' },
  { id: 'dolphin', label: 'Playful Dolphin', emoji: '🐬' },
  { id: 'bee', label: 'Busy Bee', emoji: '🐝' },
  { id: 'bear', label: 'Brown Bear', emoji: '🐻' },
  { id: 'bunny', label: 'Swift Bunny', emoji: '🐰' },
  { id: 'lion', label: 'Brave Lion', emoji: '🦁' },
  { id: 'hedgehog', label: 'Eco Hedgehog', emoji: '🦔' },
];

export const LEVELS = [
  { level: 1, name: 'Eco Beginner', minPoints: 0, maxPoints: 49, icon: '🌱', color: '#16a34a' },
  { level: 2, name: 'Eco Explorer', minPoints: 50, maxPoints: 99, icon: '🌿', color: '#059669' },
  { level: 3, name: 'Eco Helper', minPoints: 100, maxPoints: 199, icon: '🌳', color: '#0284c7' },
  { level: 4, name: 'Planet Protector', minPoints: 200, maxPoints: 499, icon: '🌎', color: '#7c3aed' },
  { level: 5, name: 'Eco Champion', minPoints: 500, maxPoints: 9999, icon: '🏆', color: '#eab308' },
];

export const BADGES_DEFINITION = [
  {
    id: 'first-step',
    name: 'First Eco Action',
    icon: '🌱',
    description: 'Completed your very first approved eco-friendly action!',
    category: 'all',
    minCount: 1,
  },
  {
    id: 'recycling-rookie',
    name: 'Recycling Rookie',
    icon: '♻️',
    description: 'Completed 2 responsible recycling activities.',
    category: 'recycling',
    minCount: 2,
  },
  {
    id: 'recycling-pro',
    name: 'Master Recycler',
    icon: '✨',
    description: 'Completed 5 responsible recycling activities.',
    category: 'recycling',
    minCount: 5,
  },
  {
    id: 'creative-reuser',
    name: 'Creative Reuser',
    icon: '🎨',
    description: 'Completed 2 reusing or eco-friendly art projects.',
    category: 'reusing',
    minCount: 2,
  },
  {
    id: 'green-thumb',
    name: 'Green Thumb',
    icon: '🌿',
    description: 'Completed 2 planting or garden caring activities.',
    category: 'planting',
    minCount: 2,
  },
  {
    id: 'nature-friend',
    name: 'Nature Friend',
    icon: '🌳',
    description: 'Helped our planet with 4 nature or outdoor activities.',
    category: 'nature',
    minCount: 4,
  },
  {
    id: 'water-saver',
    name: 'Water Saver',
    icon: '💧',
    description: 'Completed 2 water conservation actions.',
    category: 'water',
    minCount: 2,
  },
  {
    id: 'clean-commuter',
    name: 'Clean Commuter',
    icon: '🚲',
    description: 'Completed 2 clean, low-emission travel trips.',
    category: 'transport',
    minCount: 2,
  },
  {
    id: 'eco-streak',
    name: 'Eco Streak',
    icon: '⚡',
    description: 'Active eco warrior with at least 4 completed actions!',
    category: 'all',
    minCount: 4,
  },
  {
    id: 'planet-hero',
    name: 'Planet Hero',
    icon: '🏆',
    description: 'Completed 8 or more eco activities. True sustainability leader!',
    category: 'all',
    minCount: 8,
  },
];

export function getStudentLevel(points = 0) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) {
      const currentLevel = LEVELS[i];
      const nextLevel = LEVELS[i + 1] || null;
      let progress = 100;
      let pointsToNext = 0;
      if (nextLevel) {
        const range = nextLevel.minPoints - currentLevel.minPoints;
        const currentProgress = points - currentLevel.minPoints;
        progress = Math.min(100, Math.round((currentProgress / range) * 100));
        pointsToNext = nextLevel.minPoints - points;
      }
      return {
        ...currentLevel,
        progress,
        pointsToNext,
        nextLevelName: nextLevel ? nextLevel.name : 'Max Level',
      };
    }
  }
  return { ...LEVELS[0], progress: 0, pointsToNext: 50, nextLevelName: 'Eco Explorer' };
}

export function evaluateStudentBadges(studentActivities = []) {
  const approved = studentActivities.filter(a => a.status === 'approved');
  const unlockedBadges = [];

  BADGES_DEFINITION.forEach(badge => {
    let count = 0;
    if (badge.category === 'all') {
      count = approved.length;
    } else if (badge.category === 'reusing') {
      count = approved.filter(a => a.category === 'reusing' || a.category === 'art').length;
    } else if (badge.category === 'nature') {
      count = approved.filter(a => a.category === 'nature' || a.category === 'planting').length;
    } else {
      count = approved.filter(a => a.category === badge.category).length;
    }

    if (count >= badge.minCount) {
      unlockedBadges.push({
        ...badge,
        unlocked: true,
        unlockedAt: 'Earned!',
      });
    } else {
      unlockedBadges.push({
        ...badge,
        unlocked: false,
        progress: `${count}/${badge.minCount}`,
      });
    }
  });

  return unlockedBadges;
}
