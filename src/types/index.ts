export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export type UserRole = 'student' | 'parent' | 'admin' | 'admission_officer' | 'teacher';

export interface Application {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
  status: ApplicationStatus;
  submittedAt: Date;
  documents: Document[];
  payment?: Payment;
  parentId?: string;
  studentId?: string;
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