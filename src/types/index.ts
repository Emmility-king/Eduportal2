export interface User {
  id: string;
  username: string;
  password: string; // In real implementation, this would be hashed
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export type UserRole = 'student' | 'parent' | 'admin' | 'admission_officer' | 'teacher';

export interface Student {
  studentId: string;
  name: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  email: string;
  phone: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  previousSchool?: string;
  medicalConditions?: string;
  additionalInfo?: string;
  createdAt: Date;
}

export interface Class {
  classId: string;
  className: string;
  section: string;
  teacherId?: string;
}

export interface Enrollment {
  enrollmentId: string;
  studentId: string;
  classId: string;
  session: string; // e.g., "2024-2025"
  date: Date;
  approvedBy?: string; // User ID
  status: EnrollmentStatus;
}

export type EnrollmentStatus = 'pending' | 'approved' | 'enrolled' | 'cancelled';

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  studentName: string; // Keep for backward compatibility
  email: string;
  phone: string;
  grade: string;
  status: ApplicationStatus;
  submittedAt: Date;
  documents: Document[];
  payment?: Payment;
  parentId?: string;
  studentId?: string;
  // Additional fields from input design
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  previousSchool?: string;
  medicalConditions?: string;
  additionalInfo?: string;
  admissionDate: Date;
}

export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'documents_required' | 'payment_pending' | 'approved' | 'rejected' | 'enrolled';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: Date;
}

export type DocumentType = 'birth_certificate' | 'previous_report' | 'medical_records' | 'photo' | 'address_proof' | 'other';

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  createdAt: Date;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'paypal' | 'stripe';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}