import { useState, useEffect } from 'react';
import { Application, Student, Enrollment, Class } from '../types';
import { validateApplication } from '../services/validation';
import { createStudentFromApplication, assignClassToStudent, createEnrollment, updateEnrollmentStatus, updateDocumentStatus } from '../services/enrollment';

export const useEnrollment = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [classes] = useState<Class[]>([
    { classId: 'CLS001', className: '9th Grade', section: 'A', teacherId: 'T001' },
    { classId: 'CLS002', className: '10th Grade', section: 'A', teacherId: 'T002' },
    { classId: 'CLS003', className: '11th Grade', section: 'A', teacherId: 'T003' },
    { classId: 'CLS004', className: '12th Grade', section: 'A', teacherId: 'T004' }
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedApplications = localStorage.getItem('applications');
    const savedStudents = localStorage.getItem('students');
    const savedEnrollments = localStorage.getItem('enrollments');

    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    } else {
      // Add dummy data if no data exists
      const dummyApplications: Application[] = [
        {
          id: 'app_001',
          firstName: 'Sarah',
          lastName: 'Wilson',
          studentName: 'Sarah Wilson',
          email: 'sarah.wilson@email.com',
          phone: '+1 (555) 123-4567',
          grade: '10th Grade',
          status: 'under_review',
          submittedAt: new Date('2024-01-15'),
          documents: [
            { id: 'doc_001', name: 'Birth Certificate', type: 'birth_certificate', url: '#', status: 'pending', uploadedAt: new Date() }
          ],
          dateOfBirth: new Date('2008-05-15'),
          gender: 'female',
          address: '123 Main St',
          city: 'Lagos',
          state: 'Lagos',
          zipCode: '100001',
          country: 'Nigeria',
          parentName: 'John Wilson',
          parentEmail: 'john.wilson@email.com',
          parentPhone: '+1 (555) 123-4568',
          previousSchool: 'Lagos International School',
          medicalConditions: '',
          additionalInfo: 'Excellent student',
          admissionDate: new Date('2024-09-01')
        },
        {
          id: 'app_002',
          firstName: 'David',
          lastName: 'Chen',
          studentName: 'David Chen',
          email: 'david.chen@email.com',
          phone: '+1 (555) 987-6543',
          grade: '9th Grade',
          status: 'documents_required',
          submittedAt: new Date('2024-01-10'),
          documents: [],
          dateOfBirth: new Date('2009-03-20'),
          gender: 'male',
          address: '456 Oak Ave',
          city: 'Abuja',
          state: 'FCT',
          zipCode: '900001',
          country: 'Nigeria',
          parentName: 'Mary Chen',
          parentEmail: 'mary.chen@email.com',
          parentPhone: '+1 (555) 987-6544',
          previousSchool: 'Abuja Academy',
          medicalConditions: 'Allergic to peanuts',
          additionalInfo: '',
          admissionDate: new Date('2024-09-01')
        },
        {
          id: 'app_003',
          firstName: 'Maria',
          lastName: 'Garcia',
          studentName: 'Maria Garcia',
          email: 'maria.garcia@email.com',
          phone: '+1 (555) 456-7890',
          grade: '11th Grade',
          status: 'submitted',
          submittedAt: new Date('2024-01-12'),
          documents: [
            { id: 'doc_002', name: 'Previous Report Card', type: 'previous_report', url: '#', status: 'verified', uploadedAt: new Date() }
          ],
          dateOfBirth: new Date('2007-08-10'),
          gender: 'female',
          address: '789 Pine St',
          city: 'Kano',
          state: 'Kano',
          zipCode: '700001',
          country: 'Nigeria',
          parentName: 'Carlos Garcia',
          parentEmail: 'carlos.garcia@email.com',
          parentPhone: '+1 (555) 456-7891',
          previousSchool: 'Kano High School',
          medicalConditions: '',
          additionalInfo: 'Interested in science club',
          admissionDate: new Date('2024-09-01')
        }
      ];
      setApplications(dummyApplications);
    }
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedEnrollments) setEnrollments(JSON.parse(savedEnrollments));
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  const submitApplication = (formData: any): { success: boolean; errors?: string[]; application?: Application } => {
    const validation = validateApplication(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const newApplication: Application = {
      id: `app_${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      studentName: formData.studentName,
      email: formData.email,
      phone: formData.phone,
      grade: formData.grade,
      status: 'submitted',
      submittedAt: new Date(),
      documents: [],
      dateOfBirth: new Date(formData.dateOfBirth),
      gender: formData.gender,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      parentName: formData.parentName,
      parentEmail: formData.parentEmail,
      parentPhone: formData.parentPhone,
      previousSchool: formData.previousSchool,
      medicalConditions: formData.medicalConditions,
      additionalInfo: formData.additionalInfo,
      admissionDate: new Date(formData.admissionDate)
    };

    setApplications(prev => [...prev, newApplication]);
    return { success: true, application: newApplication };
  };

  const approveApplication = (applicationId: string, approvedBy: string) => {
    const application = applications.find(app => app.id === applicationId);
    if (!application) return false;

    // Update application status
    setApplications(prev => prev.map(app =>
      app.id === applicationId ? { ...app, status: 'approved' } : app
    ));

    // Create student
    const student = createStudentFromApplication(application);
    setStudents(prev => [...prev, student]);

    // Assign class
    const classInfo = assignClassToStudent(student, application.grade);
    if (classInfo) {
      // Create enrollment
      const enrollment = createEnrollment(student, classInfo, approvedBy);
      setEnrollments(prev => [...prev, enrollment]);
    }

    return true;
  };

  const enrollStudent = (enrollmentId: string) => {
    setEnrollments(prev => prev.map(enrollment =>
      enrollment.enrollmentId === enrollmentId
        ? updateEnrollmentStatus(enrollment, 'enrolled')
        : enrollment
    ));

    // Update application status
    const enrollment = enrollments.find(e => e.enrollmentId === enrollmentId);
    if (enrollment) {
      setApplications(prev => prev.map(app =>
        app.studentId === enrollment.studentId ? { ...app, status: 'enrolled' } : app
      ));
    }
  };

  const verifyDocument = (applicationId: string, documentId: string) => {
    setApplications(prev => prev.map(app =>
      app.id === applicationId ? updateDocumentStatus(app, documentId, 'verified') : app
    ));
  };

  const rejectDocument = (applicationId: string, documentId: string) => {
    setApplications(prev => prev.map(app =>
      app.id === applicationId ? updateDocumentStatus(app, documentId, 'rejected') : app
    ));
  };

  return {
    applications,
    students,
    enrollments,
    classes,
    submitApplication,
    approveApplication,
    enrollStudent,
    verifyDocument,
    rejectDocument
  };
};
