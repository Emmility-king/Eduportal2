import { useState, useEffect } from 'react';
import { User, UserRole } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate login process
    setLoading(true);
    
    // Mock user data based on role
    const userData: User = {
      id: `${role}_${Date.now()}`,
      email,
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      role,
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
    setLoading(false);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return { user, login, logout, loading };
};