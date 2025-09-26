import React, { useState } from 'react';
import { User } from '../../types';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { StudentDashboard } from './roles/StudentDashboard';
import { ParentDashboard } from './roles/ParentDashboard';
import { AdminDashboard } from './roles/AdminDashboard';
import { AdmissionOfficerDashboard } from './roles/AdmissionOfficerDashboard';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'parent':
        return <ParentDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'admin':
        return <AdminDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'admission_officer':
        return <AdmissionOfficerDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user} 
          onLogout={onLogout}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 overflow-auto bg-gray-50">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};