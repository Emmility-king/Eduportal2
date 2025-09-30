import { Application } from '../types';

export const validateApplication = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields validation
  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.phone?.trim()) errors.push('Phone number is required');
  if (!data.dateOfBirth) errors.push('Date of birth is required');
  if (!data.gender) errors.push('Gender is required');
  if (!data.grade) errors.push('Grade is required');
  if (!data.address?.trim()) errors.push('Address is required');
  if (!data.city?.trim()) errors.push('City is required');
  if (!data.state?.trim()) errors.push('State is required');
  if (!data.zipCode?.trim()) errors.push('Zip code is required');
  if (!data.country?.trim()) errors.push('Country is required');
  if (!data.parentName?.trim()) errors.push('Parent/Guardian name is required');
  if (!data.parentEmail?.trim()) errors.push('Parent email is required');
  if (!data.parentPhone?.trim()) errors.push('Parent phone is required');
  if (!data.admissionDate) errors.push('Admission date is required');

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  }
  if (data.parentEmail && !emailRegex.test(data.parentEmail)) {
    errors.push('Invalid parent email format');
  }

  // Phone format validation (basic)
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.push('Invalid phone number format');
  }
  if (data.parentPhone && !phoneRegex.test(data.parentPhone)) {
    errors.push('Invalid parent phone number format');
  }

  // Date validation
  if (data.dateOfBirth) {
    const dob = new Date(data.dateOfBirth);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();
    if (age < 5 || age > 25) {
      errors.push('Student age must be between 5 and 25 years');
    }
  }

  if (data.admissionDate) {
    const admission = new Date(data.admissionDate);
    const now = new Date();
    if (admission < now) {
      errors.push('Admission date cannot be in the past');
    }
  }

  // Zip code validation (basic numeric)
  if (data.zipCode && !/^\d{5}(-\d{4})?$/.test(data.zipCode)) {
    errors.push('Invalid zip code format');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUserCredentials = (username: string, password: string): boolean => {
  return username.length >= 3 && password.length >= 6;
};
