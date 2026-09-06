import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import RoleSelectView from './views/RoleSelectView';
import StudentView from './views/StudentView';
import TeacherView from './views/TeacherView';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function App() {
  const { currentRole, toast } = useApp();

  return (
    <div className="app-layout">
      {/* If no role is selected yet, show the Role Selection Screen first */}
      {!currentRole ? (
        <RoleSelectView />
      ) : (
        <>
          {/* Top Navbar */}
          <Navbar />

          {/* Render Active Portal */}
          {currentRole === 'student' ? <StudentView /> : <TeacherView />}
        </>
      )}

      {/* Global Toast Notifications */}
      {toast && (
        <div className="toast-container">
          <div className={`toast-box ${toast.type}`}>
            {toast.type === 'success' && <CheckCircle2 size={20} color="#4ade80" />}
            {toast.type === 'info' && <Info size={20} color="#38bdf8" />}
            {toast.type === 'warn' && <AlertTriangle size={20} color="#fbbf24" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
