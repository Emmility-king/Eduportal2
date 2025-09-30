import { Application, Student, Enrollment, Class } from '../types';

export const generateStudentId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `STU${timestamp}${random}`;
};

export const generateEnrollmentId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ENR${timestamp}${random}`;
};

export const createStudentFromApplication = (application: Application): Student => {
  return {
    studentId: generateStudentId(),
    name: `${application.firstName} ${application.lastName}`,
    dateOfBirth: new Date(application.dateOfBirth),
    gender: application.gender,
    address: application.address,
    city: application.city,
    state: application.state,
    zipCode: application.zipCode,
    country: application.country,
    email: application.email,
    phone: application.phone,
    parentName: application.parentName,
    parentEmail: application.parentEmail,
    parentPhone: application.parentPhone,
    previousSchool: application.previousSchool,
    medicalConditions: application.medicalConditions,
    additionalInfo: application.additionalInfo,
    createdAt: new Date()
  };
};

export const assignClassToStudent = (student: Student, grade: string): Class | null => {
  // Mock class assignment based on grade
  const classes: Class[] = [
    { classId: 'CLS001', className: '9th Grade', section: 'A', teacherId: 'T001' },
    { classId: 'CLS002', className: '10th Grade', section: 'A', teacherId: 'T002' },
    { classId: 'CLS003', className: '11th Grade', section: 'A', teacherId: 'T003' },
    { classId: 'CLS004', className: '12th Grade', section: 'A', teacherId: 'T004' }
  ];

  return classes.find(cls => cls.className === grade) || null;
};

export const createEnrollment = (student: Student, classInfo: Class, approvedBy?: string): Enrollment => {
  const currentYear = new Date().getFullYear();
  const session = `${currentYear}-${currentYear + 1}`;

  return {
    enrollmentId: generateEnrollmentId(),
    studentId: student.studentId,
    classId: classInfo.classId,
    session,
    date: new Date(),
    approvedBy,
    status: 'pending'
  };
};

export const updateEnrollmentStatus = (enrollment: Enrollment, status: Enrollment['status'], approvedBy?: string): Enrollment => {
  return {
    ...enrollment,
    status,
    approvedBy: approvedBy || enrollment.approvedBy
  };
};

export const updateDocumentStatus = (application: Application, documentId: string, status: 'verified' | 'rejected'): Application => {
  return {
    ...application,
    documents: application.documents.map(doc =>
      doc.id === documentId ? { ...doc, status } : doc
    )
  };
};
