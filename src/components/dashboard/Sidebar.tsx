import React from 'react';
import { User } from '../../types';
import {
  GraduationCap,
  Home,
  FileText,
  Upload,
  CreditCard,
  Users,
  Settings,
  BarChart3,
  UserCheck,
  X,
  BookOpen,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen
}) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
    ];

    switch (user.role) {
      case 'student':
        return [
          ...baseItems,
          { id: 'application', label: 'My Application', icon: FileText },
          { id: 'documents', label: 'Documents', icon: Upload },
          { id: 'payment', label: 'Payment', icon: CreditCard },
        ];

      case 'parent':
        return [
          ...baseItems,
          { id: 'children', label: 'My Children', icon: Users },
          { id: 'applications', label: 'Applications', icon: FileText },
          { id: 'payments', label: 'Payments', icon: CreditCard },
        ];

      case 'admin':
        return [
          ...baseItems,
          { id: 'applications', label: 'All Applications', icon: FileText },
          { id: 'students', label: 'Students', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];

      case 'admission_officer':
        return [
          ...baseItems,
          { id: 'review', label: 'Review Applications', icon: UserCheck },
          { id: 'documents', label: 'Document Verification', icon: Upload },
          { id: 'analytics', label: 'Reports', icon: BarChart3 },
        ];

      case 'teacher':
        return [
          ...baseItems,
          { id: 'students', label: 'My Students', icon: Users },
          { id: 'classes', label: 'My Classes', icon: BookOpen },
          { id: 'assignments', label: 'Assignments', icon: FileText },
          { id: 'grades', label: 'Grades', icon: TrendingUp },
        ];

      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      <div
        className={
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 " +
          (sidebarOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">Nigerian Secondary School Portal</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-white hover:bg-white hover:bg-opacity-10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-200 " +
                  (activeTab === item.id
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")
                }
              >
                <item.icon className={"mr-3 h-5 w-5 " + (activeTab === item.id ? "text-blue-700" : "text-gray-400")} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};
