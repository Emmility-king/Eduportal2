import React, { useState } from 'react';
import { User, Application } from '../../../types';
import { BookOpen, Users, FileText, Eye, UserCheck, X } from 'lucide-react';

interface TeacherDashboardProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, activeTab, setActiveTab }) => {
  const [applications] = useState<Application[]>([
    {
      id: '1',
      studentName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      grade: '10th Grade',
      status: 'enrolled',
      submittedAt: new Date('2024-01-15'),
      documents: []
    },
    {
      id: '2',
      studentName: 'Emily Johnson',
      email: 'emily.johnson@email.com',
      phone: '+1 (555) 987-6543',
      grade: '9th Grade',
      status: 'enrolled',
      submittedAt: new Date('2024-01-10'),
      documents: []
    }
  ]);

  const [grades] = useState([
    { studentName: 'John Smith', subject: 'Math', grade: 'A' },
    { studentName: 'John Smith', subject: 'Science', grade: 'B+' },
    { studentName: 'Emily Johnson', subject: 'Math', grade: 'A-' },
    { studentName: 'Emily Johnson', subject: 'Science', grade: 'A' }
  ]);

  const stats = {
    totalStudents: applications.filter(app => app.status === 'enrolled').length,
    classes: 5,
    assignments: 12,
    pendingReviews: 3
  };

  const renderOverview = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600">Manage your classes and students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <Eye className="h-4 w-4 mr-1" />
            8% increase this semester
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Classes</p>
              <p className="text-2xl font-bold text-green-600">{stats.classes}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Active this semester
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assignments</p>
              <p className="text-2xl font-bold text-purple-600">{stats.assignments}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            This month
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingReviews}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Eye className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Requires attention
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Students</h3>
          <div className="space-y-4">
            {applications.slice(0, 5).map((application) => (
              <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{application.studentName}</p>
                  <p className="text-sm text-gray-500">{application.grade}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Enrolled
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-900">Grade Math Assignments</p>
                <p className="text-sm text-blue-700">Due in 2 days</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Users className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Parent-Teacher Conference</p>
                <p className="text-sm text-yellow-700">Tomorrow at 3 PM</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <BookOpen className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-900">Prepare Lesson Plan</p>
                <p className="text-sm text-green-700">Science class next week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGrades = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Grades</h1>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {grades.map((grade, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grade.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  switch (activeTab) {
    case 'dashboard':
      return renderOverview();
    case 'students':
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Students</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-500">Student management interface for teachers.</p>
          </div>
        </div>
      );
    case 'classes':
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Classes</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-500">Class management interface.</p>
          </div>
        </div>
      );
    case 'assignments':
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Assignments</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-500">Assignment management interface.</p>
          </div>
        </div>
      );
    case 'grades':
      return renderGrades();
    default:
      return renderOverview();
  }
};
