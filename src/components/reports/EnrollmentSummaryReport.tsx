import React from 'react';
import { EnrollmentSummaryReport } from '../../services/reports';
import { BarChart3, Users, User, Calendar } from 'lucide-react';

interface EnrollmentSummaryReportProps {
  report: EnrollmentSummaryReport;
}

export const EnrollmentSummaryReportComponent: React.FC<EnrollmentSummaryReportProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Enrollment Summary Report</h2>
      <p className="text-gray-600 mb-6">Academic Session: {report.session}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <Users className="mx-auto h-8 w-8 text-blue-600 mb-2" />
          <p className="text-sm text-gray-600">Total Applications</p>
          <p className="text-2xl font-bold text-blue-800">{report.totalApplications}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <User className="mx-auto h-8 w-8 text-green-600 mb-2" />
          <p className="text-sm text-gray-600">Approved Applications</p>
          <p className="text-2xl font-bold text-green-800">{report.approvedApplications}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <BarChart3 className="mx-auto h-8 w-8 text-purple-600 mb-2" />
          <p className="text-sm text-gray-600">Enrolled Students</p>
          <p className="text-2xl font-bold text-purple-800">{report.enrolledStudents}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrollment by Grade</h3>
        <ul className="space-y-1">
          {report.byGrade.map((item) => (
            <li key={item.grade} className="flex justify-between border-b border-gray-200 py-1">
              <span>{item.grade}</span>
              <span className="font-semibold">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrollment by Gender</h3>
        <ul className="space-y-1">
          {report.byGender.map((item) => (
            <li key={item.gender} className="flex justify-between border-b border-gray-200 py-1 capitalize">
              <span>{item.gender}</span>
              <span className="font-semibold">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-right text-sm text-gray-500">
        Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};
