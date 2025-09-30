import { Application, Student, Enrollment, Class } from '../types';

export interface EnrollmentConfirmation {
  studentName: string;
  studentId: string;
  className: string;
  section: string;
  session: string;
  enrollmentDate: Date;
  admissionDate: Date;
}

export interface ClassListReport {
  className: string;
  section: string;
  students: {
    studentId: string;
    name: string;
    gender: string;
    enrollmentDate: Date;
  }[];
  totalStudents: number;
}

export interface EnrollmentSummaryReport {
  totalApplications: number;
  approvedApplications: number;
  enrolledStudents: number;
  byGrade: { grade: string; count: number }[];
  byGender: { gender: string; count: number }[];
  session: string;
}

export const generateEnrollmentConfirmation = (
  student: Student,
  enrollment: Enrollment,
  classInfo: Class
): EnrollmentConfirmation => {
  return {
    studentName: student.name,
    studentId: student.studentId,
    className: classInfo.className,
    section: classInfo.section,
    session: enrollment.session,
    enrollmentDate: enrollment.date,
    admissionDate: student.createdAt // Assuming admission date is creation date
  };
};

export const generateClassListReport = (
  classInfo: Class,
  enrollments: Enrollment[],
  students: Student[]
): ClassListReport => {
  const classEnrollments = enrollments.filter(e => e.classId === classInfo.classId && e.status === 'enrolled');
  const classStudents = classEnrollments.map(enrollment => {
    const student = students.find(s => s.studentId === enrollment.studentId);
    return student ? {
      studentId: student.studentId,
      name: student.name,
      gender: student.gender,
      enrollmentDate: enrollment.date
    } : null;
  }).filter(Boolean) as ClassListReport['students'];

  return {
    className: classInfo.className,
    section: classInfo.section,
    students: classStudents,
    totalStudents: classStudents.length
  };
};

export const generateEnrollmentSummaryReport = (
  applications: Application[],
  enrollments: Enrollment[],
  students: Student[]
): EnrollmentSummaryReport => {
  const currentYear = new Date().getFullYear();
  const session = `${currentYear}-${currentYear + 1}`;

  const approvedApps = applications.filter(app => app.status === 'approved' || app.status === 'enrolled');
  const enrolled = enrollments.filter(e => e.status === 'enrolled');

  const byGrade = approvedApps.reduce((acc, app) => {
    const existing = acc.find(item => item.grade === app.grade);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ grade: app.grade, count: 1 });
    }
    return acc;
  }, [] as { grade: string; count: number }[]);

  const byGender = students.reduce((acc, student) => {
    const existing = acc.find(item => item.gender === student.gender);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ gender: student.gender, count: 1 });
    }
    return acc;
  }, [] as { gender: string; count: number }[]);

  return {
    totalApplications: applications.length,
    approvedApplications: approvedApps.length,
    enrolledStudents: enrolled.length,
    byGrade,
    byGender,
    session
  };
};
