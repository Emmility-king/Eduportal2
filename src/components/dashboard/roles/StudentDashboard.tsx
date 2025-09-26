import React, { useState } from 'react';
import { User, Application } from '../../../types';
import { FileText, Upload, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { ApplicationForm } from '../../forms/ApplicationForm';
import { DocumentUpload } from '../../documents/DocumentUpload';
import { PaymentSection } from '../../payment/PaymentSection';

interface StudentDashboardProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, activeTab, setActiveTab }) => {
  const [application] = useState<Application>({
    id: '1',
    studentName: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    grade: '10th Grade',
    status: 'documents_required',
    submittedAt: new Date('2024-01-15'),
    documents: [
      {
        id: '1',
        name: 'Birth Certificate',
        type: 'birth_certificate',
        url: '#',
        status: 'verified',
        uploadedAt: new Date('2024-01-16')
      }
    ]
  });

  const renderOverview = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Application Status</p>
              <p className="text-2xl font-bold text-orange-600 capitalize">
                {application.status.replace('_', ' ')}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-green-600">1/5 Verified</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Payment Status</p>
              <p className="text-2xl font-bold text-red-600">Pending</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <CreditCard className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Grade Applied</p>
              <p className="text-2xl font-bold text-blue-600">{application.grade}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Birth Certificate Verified</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Application Under Review</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-orange-900">Upload Missing Documents</p>
                <p className="text-sm text-orange-700">4 documents still required</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <CreditCard className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-900">Complete Payment</p>
                <p className="text-sm text-blue-700">$500 application fee due</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  switch (activeTab) {
    case 'dashboard':
      return renderOverview();
    case 'application':
      return <ApplicationForm application={application} />;
    case 'documents':
      return <DocumentUpload applicationId={application.id} documents={application.documents} />;
    case 'payment':
      return <PaymentSection application={application} />;
    default:
      return renderOverview();
  }
};