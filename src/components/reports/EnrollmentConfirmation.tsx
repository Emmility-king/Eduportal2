import React from 'react';
import { EnrollmentConfirmation } from '../../services/reports';
import { CheckCircle, Calendar, User, BookOpen } from 'lucide-react';

interface EnrollmentConfirmationProps {
  confirmation: EnrollmentConfirmation;
}

export const EnrollmentConfirmationSlip: React.FC<EnrollmentConfirmationProps> = ({ confirmation }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border">
      <div className="bg-green-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center">
          <CheckCircle className="h-8 w-8 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Enrollment Confirmation</h1>
            <p className="text-green-100">Student successfully enrolled</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="font-semibold text-gray-900">{confirmation.studentName}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-xs font-bold text-blue-600">ID</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Student ID</p>
                <p className="font-semibold text-gray-900">{confirmation.studentId}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="font-semibold text-gray-900">{confirmation.className} - Section {confirmation.section}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Academic Session</p>
                <p className="font-semibold text-gray-900">{confirmation.session}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Enrollment Date</p>
              <p className="font-semibold text-gray-900">{confirmation.enrollmentDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Admission Date</p>
              <p className="font-semibold text-gray-900">{confirmation.admissionDate.toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Important:</strong> Please keep this confirmation slip for your records.
            Report to your assigned class on the first day of the academic session.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
};
