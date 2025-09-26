import React, { useState } from 'react';
import { User, Application } from '../../../types';
import { FileText, CheckCircle, Clock, AlertCircle, Eye, UserCheck, X } from 'lucide-react';

interface AdmissionOfficerDashboardProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdmissionOfficerDashboard: React.FC<AdmissionOfficerDashboardProps> = ({ user, activeTab, setActiveTab }) => {
  const [applications] = useState<Application[]>([
    {
      id: '1',
      studentName: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 123-4567',
      grade: '10th Grade',
      status: 'under_review',
      submittedAt: new Date('2024-01-15'),
      documents: [
        { id: '1', name: 'Birth Certificate', type: 'birth_certificate', url: '#', status: 'pending', uploadedAt: new Date() }
      ]
    },
    {
      id: '2',
      studentName: 'David Chen',
      email: 'david.chen@email.com',
      phone: '+1 (555) 987-6543',
      grade: '9th Grade',
      status: 'documents_required',
      submittedAt: new Date('2024-01-10'),
      documents: []
    },
    {
      id: '3',
      studentName: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 456-7890',
      grade: '11th Grade',
      status: 'submitted',
      submittedAt: new Date('2024-01-12'),
      documents: [
        { id: '2', name: 'Previous Report Card', type: 'previous_report', url: '#', status: 'verified', uploadedAt: new Date() }
      ]
    }
  ]);

  const stats = {
    pendingReview: applications.filter(app => app.status === 'under_review' || app.status === 'submitted').length,
    documentsToVerify: applications.reduce((acc, app) => acc + app.documents.filter(doc => doc.status === 'pending').length, 0),
    completedToday: 5,
    totalAssigned: applications.length
  };

  const renderOverview = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admission Officer Dashboard</h1>
        <p className="text-gray-600">Review applications and verify documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pendingReview}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Requires your attention
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents to Verify</p>
              <p className="text-2xl font-bold text-blue-600">{stats.documentsToVerify}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Pending verification
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedToday}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">
            Great progress!
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assigned</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalAssigned}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <UserCheck className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Your workload
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Applications</h3>
          <div className="space-y-4">
            {applications.filter(app => app.status === 'under_review' || app.status === 'submitted').map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{application.studentName}</p>
                  <p className="text-sm text-gray-500">
                    {application.grade} • Submitted {application.submittedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {application.status.replace('_', ' ')}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Verification Queue</h3>
          <div className="space-y-4">
            {applications.flatMap(app => 
              app.documents.filter(doc => doc.status === 'pending').map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      Student: {app.studentName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-green-600 hover:text-green-800 p-1">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-1">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
            {applications.flatMap(app => app.documents.filter(doc => doc.status === 'pending')).length === 0 && (
              <p className="text-gray-500 text-center py-4">No documents pending verification</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewApplications = () => (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Review Applications</h1>
        <p className="text-gray-600">Review and process student applications</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Applications for Review</h3>
            <div className="flex space-x-3">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Under Review</option>
                <option>Submitted</option>
                <option>Documents Required</option>
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
                  Documents
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
                      application.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'documents_required' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {application.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="text-green-600">{application.documents.filter(doc => doc.status === 'verified').length}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-gray-600">{application.documents.length}</span>
                      {application.documents.some(doc => doc.status === 'pending') && (
                        <AlertCircle className="h-4 w-4 text-orange-500 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.submittedAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
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
    case 'review':
      return renderReviewApplications();
    case 'documents':
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Document Verification</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-500">Document verification interface will be displayed here.</p>
          </div>
        </div>
      );
    case 'analytics':
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-500">Reports and analytics will be displayed here.</p>
          </div>
        </div>
      );
    default:
      return renderOverview();
  }
};