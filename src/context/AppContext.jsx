import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadAppState, saveAppState } from '../utils/storage';
import { DEFAULT_CATEGORIES, evaluateStudentBadges, getStudentLevel } from '../types/data';
import { fireSuccessConfetti, playCelebrationSound } from '../utils/confetti';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // null initially so user is asked first if they want Teacher Mode or Student Mode
  const [currentRole, setCurrentRole] = useState(null); // null | 'student' | 'teacher'
  const [studentTab, setStudentTab] = useState('dashboard');
  const [teacherTab, setTeacherTab] = useState('dashboard');
  const [currentStudentId, setCurrentStudentId] = useState('student-alex');
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'info' | 'warn' }
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // App State: classroom, students, activities, challenges, categories, notifications
  const [data, setData] = useState(() => {
    return loadAppState();
  });

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  // Persist state to localStorage on changes
  useEffect(() => {
    saveAppState(data);
  }, [data]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Active student object (Alex by default)
  const currentStudent = data.students.find(s => s.id === currentStudentId) || data.students[0] || null;

  // Pending activities count
  const pendingActivities = data.activities.filter(a => a.status === 'pending');
  const pendingCount = pendingActivities.length;

  // Dynamic leaderboard sorting
  const sortedStudents = [...data.students].sort((a, b) => b.points - a.points);

  // Rank of active student
  const currentStudentRank = currentStudent 
    ? sortedStudents.findIndex(s => s.id === currentStudent.id) + 1 
    : 1;

  // Evaluate badges for active student
  const studentActivities = data.activities.filter(a => a.studentId === currentStudentId);
  const currentStudentBadges = evaluateStudentBadges(studentActivities);
  const currentStudentLevel = currentStudent ? getStudentLevel(currentStudent.points) : null;

  // Select role from welcome landing screen
  const selectRole = (role) => {
    setCurrentRole(role);
    if (role === 'student') {
      setStudentTab('dashboard');
    } else {
      setTeacherTab('dashboard');
    }
    showToast(`Welcome to ${role === 'teacher' ? '👩‍🏫 Teacher Portal' : '👨‍🎓 Student Portal'}!`, 'success');
  };

  // Exit back to role selection screen
  const exitToRoleSelect = () => {
    setCurrentRole(null);
  };

  // Student submits activity
  const submitActivity = ({ title, categoryId, description, photo, notes }) => {
    const cat = categories.find(c => c.id === categoryId) || categories[0];
    const newActivity = {
      id: `act-${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.displayName || currentStudent.name,
      studentAvatar: currentStudent.avatar,
      title: title.trim(),
      category: cat.id,
      categoryName: cat.name,
      categoryIcon: cat.icon,
      description: description.trim(),
      notes: notes ? notes.trim() : '',
      photo: photo || '/samples/bottle-planter.jpg',
      submittedAt: new Date().toISOString(),
      status: 'pending',
      suggestedPoints: cat.defaultPoints || 15,
      pointsAwarded: 0,
      teacherFeedback: null,
    };

    const updatedActivities = [newActivity, ...data.activities];

    const newNotification = {
      id: `notif-${Date.now()}`,
      studentId: currentStudent.id,
      title: '⏳ Activity Submitted for Review',
      message: `Your action "${newActivity.title}" was submitted and is pending teacher review.`,
      timestamp: 'Just now',
      type: 'pending',
      read: false,
    };

    setData(prev => ({
      ...prev,
      activities: updatedActivities,
      notifications: [newNotification, ...prev.notifications],
    }));

    showToast(`Activity submitted! Marked as Pending Review. ⏳`, 'info');
    return newActivity;
  };

  // Teacher approves activity
  const approveActivity = (activityId, points, feedback = '') => {
    const activity = data.activities.find(a => a.id === activityId);
    if (!activity) return;

    const awardedPoints = parseInt(points, 10) || activity.suggestedPoints || 15;

    const updatedActivities = data.activities.map(a => {
      if (a.id === activityId) {
        return {
          ...a,
          status: 'approved',
          pointsAwarded: awardedPoints,
          teacherFeedback: feedback || 'Great work making a difference for our planet! 🌍',
          approvedAt: new Date().toISOString(),
        };
      }
      return a;
    });

    const updatedStudents = data.students.map(s => {
      if (s.id === activity.studentId) {
        return {
          ...s,
          points: s.points + awardedPoints,
          activitiesCount: s.activitiesCount + 1,
        };
      }
      return s;
    });

    const approvalNotification = {
      id: `notif-${Date.now()}`,
      studentId: activity.studentId,
      title: '🎉 Activity Approved!',
      message: `Your "${activity.title}" was approved! +${awardedPoints} points awarded.`,
      timestamp: 'Just now',
      type: 'approval',
      read: false,
    };

    setData(prev => ({
      ...prev,
      activities: updatedActivities,
      students: updatedStudents,
      notifications: [approvalNotification, ...prev.notifications],
    }));

    fireSuccessConfetti();
    playCelebrationSound();
    showToast(`Approved "${activity.title}"! Awarded +${awardedPoints} points 🌟`, 'success');
  };

  // Teacher rejects activity
  const rejectActivity = (activityId, feedback = '') => {
    const activity = data.activities.find(a => a.id === activityId);
    if (!activity) return;

    const updatedActivities = data.activities.map(a => {
      if (a.id === activityId) {
        return {
          ...a,
          status: 'rejected',
          pointsAwarded: 0,
          teacherFeedback: feedback || 'Please upload a clearer photo or add a little more detail about what you did.',
          reviewedAt: new Date().toISOString(),
        };
      }
      return a;
    });

    const rejectionNotification = {
      id: `notif-${Date.now()}`,
      studentId: activity.studentId,
      title: '💬 Activity Needs Update',
      message: `Teacher feedback on "${activity.title}": ${feedback || 'Please review notes.'}`,
      timestamp: 'Just now',
      type: 'warn',
      read: false,
    };

    setData(prev => ({
      ...prev,
      activities: updatedActivities,
      notifications: [rejectionNotification, ...prev.notifications],
    }));

    showToast(`Activity returned with feedback.`, 'info');
  };

  // Teacher creates challenge
  const createChallenge = ({ title, categoryId, bonusPoints, startDate, endDate, description }) => {
    const cat = categories.find(c => c.id === categoryId) || categories[0];
    const newChallenge = {
      id: `chal-${Date.now()}`,
      title: title.trim(),
      category: cat.id,
      categoryName: cat.name,
      categoryIcon: cat.icon,
      bonusPoints: parseInt(bonusPoints, 10) || 20,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || '2026-10-01',
      description: description.trim(),
      active: true,
      participantIds: [],
    };

    setData(prev => ({
      ...prev,
      challenges: [newChallenge, ...prev.challenges],
    }));

    showToast(`Challenge "${newChallenge.title}" launched! 🚀`, 'success');
  };

  // Student joins challenge
  const joinChallenge = (challengeId) => {
    if (!currentStudent) return;
    setData(prev => ({
      ...prev,
      challenges: prev.challenges.map(c => {
        if (c.id === challengeId) {
          const exists = c.participantIds.includes(currentStudent.id);
          return {
            ...c,
            participantIds: exists 
              ? c.participantIds.filter(id => id !== currentStudent.id)
              : [...c.participantIds, currentStudent.id],
          };
        }
        return c;
      })
    }));

    const challenge = data.challenges.find(c => c.id === challengeId);
    const isJoined = challenge?.participantIds.includes(currentStudent.id);
    showToast(isJoined ? 'Left challenge' : `Joined challenge: ${challenge?.title}! 🌱`, 'success');
  };

  // Update student profile
  const updateStudentProfile = (studentId, updates) => {
    setData(prev => ({
      ...prev,
      students: prev.students.map(s => {
        if (s.id === studentId) {
          return { ...s, ...updates };
        }
        return s;
      })
    }));
    showToast('Profile updated! ✨', 'success');
  };

  // Remove student
  const removeStudent = (studentId) => {
    setData(prev => ({
      ...prev,
      students: prev.students.filter(s => s.id !== studentId),
      activities: prev.activities.filter(a => a.studentId !== studentId),
    }));
    showToast('Student removed from classroom', 'info');
  };

  // Add category
  const addCategory = ({ name, icon, defaultPoints, color }) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newCat = {
      id,
      name,
      icon: icon || '🌱',
      defaultPoints: parseInt(defaultPoints, 10) || 15,
      color: color || '#16a34a',
    };
    setCategories(prev => [...prev, newCat]);
    showToast(`Added custom category: ${newCat.icon} ${newCat.name}`, 'success');
  };

  // Edit classroom settings
  const updateClassroomSettings = (settings) => {
    setData(prev => ({
      ...prev,
      classroom: {
        ...prev.classroom,
        ...settings,
      }
    }));
    showToast('Classroom settings saved! 🏫', 'success');
  };

  // Notifications
  const markNotificationRead = (id) => {
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        selectRole,
        exitToRoleSelect,
        studentTab,
        setStudentTab,
        teacherTab,
        setTeacherTab,
        currentStudentId,
        currentStudent,
        currentStudentRank,
        currentStudentBadges,
        currentStudentLevel,
        toast,
        classroom: data.classroom,
        students: sortedStudents,
        rawStudents: data.students,
        activities: data.activities,
        challenges: data.challenges,
        categories,
        notifications: data.notifications,
        pendingActivities,
        pendingCount,
        isSubmitModalOpen,
        // actions
        showToast,
        submitActivity,
        approveActivity,
        rejectActivity,
        createChallenge,
        joinChallenge,
        updateStudentProfile,
        removeStudent,
        addCategory,
        updateClassroomSettings,
        setIsSubmitModalOpen,
        markNotificationRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
