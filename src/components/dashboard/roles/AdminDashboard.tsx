import React, { useState } from 'react';
import { User, Application } from '../../../types';
import { useEnrollment } from '../../../hooks/useEnrollment';
import { generateEnrollmentSummaryReport, generateClassListReport } from '../../../services/reports';
import { EnrollmentSummaryReportComponent } from '../../reports/EnrollmentSummaryReport';
import { ClassListReportComponent } from '../../reports/ClassListReport';
import { BarChart3, Users, FileText, TrendingUp, Eye, UserCheck, X, FileBarChart, GraduationCap } from 'lucide-react';

interface AdminDashboardProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, activeTab, setActiveTab }) => {
  const { applications, students, enrollments, classes, approveApplication, enrollStudent } = useEnrollment();

  const stats = {
    totalApplications: applications.length,
    pendingReview: applications.filter(app => app.status === 'under_review').length,
    approved: applications.filter(app => app.status === 'approved').length,
    enrolled: applications.filter(app => app.status === 'enrolled').length
  };

  const renderOverview = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalApplications}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            12% increase from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingReview}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Requires immediate attention
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Ready for enrollment
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Enrolled</p>
              <p className="text-2xl font-bold text-purple-600">{stats.enrolled}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Successfully completed
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
          <div className="space-y-4">
            {applications.slice(0, 5).map((application) => (
              <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{application.studentName}</p>
                  <p className="text-sm text-gray-500">{application.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  application.status === 'approved' ? 'bg-green-100 text-green-800' :
                  application.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                  application.status === 'payment_pending' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {application.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Under Review</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{width: '40%'}}></div>
                </div>
                <span className="text-sm font-medium">{stats.pendingReview}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Approved</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{width: '60%'}}></div>
                </div>
                <span className="text-sm font-medium">{stats.approved}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Payment Pending</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{width: '20%'}}></div>
                </div>
                <span className="text-sm font-medium">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Applications</h1>
        <p className="text-gray-600">Manage and review student applications</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Applications</h3>
              <p className="text-sm text-gray-500">A list of all applications in the system</p>
            </div>
            <div className="mt-3 sm:mt-0 flex space-x-3">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Under Review</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Grades</option>
                <option>9th Grade</option>
                <option>10th Grade</option>
                <option>11th Grade</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.studentName}
                      </div>
                      <div className="text-sm text-gray-500">{application.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      application.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'payment_pending' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {application.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.submittedAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900" title="View Details">
                      <Eye className="h-4 w-4" />
                    </button>
                    {application.status === 'submitted' || application.status === 'under_review' ? (
                      <button
                        onClick={() => approveApplication(application.id, user.id)}
                        className="text-green-600 hover:text-green-900"
                        title="Approve Application"
                      >
                        <UserCheck className="h-4 w-4" />
                      </button>
                    ) : application.status === 'approved' ? (
                      <button
                        onClick={() => {
                          const enrollment = enrollments.find(e => e.studentId === application.studentId);
                          if (enrollment) enrollStudent(enrollment.enrollmentId);
                        }}
                        className="text-purple-600 hover:text-purple-900"
                        title="Enroll Student"
                      >
                        <GraduationCap className="h-4 w-4" />
                      </button>
                    ) : null}
                    <button className="text-red-600 hover:text-red-900" title="Reject">
                      <X className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  switch (activeTab) {
    case 'dashboard':
      return renderOverview();
    case 'applications':
      return renderApplications();
    case 'students':
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Students</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-500">Student management interface will be displayed here.</p>
          </div>
        </div>
      );
    case 'analytics':
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-500">Analytics and reports will be displayed here.</p>
          </div>
        </div>
      );
    case 'reports':
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>
          <div className="space-y-6">
            <EnrollmentSummaryReportComponent
              report={generateEnrollmentSummaryReport(applications, enrollments, students)}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {classes.map(cls => {
                const report = generateClassListReport(cls, enrollments, students);
                return <ClassListReportComponent key={cls.classId} report={report} />;
              })}
            </div>
          </div>
        </div>
      );
    case 'settings':
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-500">System settings will be displayed here.</p>
          </div>
        </div>
      );
    default:
      return renderOverview();
  }
};