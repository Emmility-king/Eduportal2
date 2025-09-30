import React from 'react';
import { ClassListReport } from '../../services/reports';
import { Users, BookOpen, Download } from 'lucide-react';

interface ClassListReportProps {
  report: ClassListReport;
}

export const ClassListReportComponent: React.FC<ClassListReportProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {report.className} - Section {report.section}
              </h2>
              <p className="text-gray-600">Class List Report</p>
            </div>
          </div>
          <div className="flex items-center text-blue-600">
            <Users className="h-5 w-5 mr-2" />
            <span className="font-semibold">{report.totalStudents} Students</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {report.students.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No students enrolled in this class yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollment Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.students.map((student, index) => (
                  <tr key={student.studentId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {student.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {student.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.enrollmentDate.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
          <button
            onClick={() => window.print()}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};
