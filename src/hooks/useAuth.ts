import { useState, useEffect } from 'react';
import { User } from '@/types/portfolio';

const AUTH_KEY = 'investers_auth';
const USERS_KEY = 'investers_users';

interface StoredUser {
  email: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const getUsers = (): StoredUser[] => {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const signup = (email: string, password: string): { success: boolean; error?: string } => {
    const users = getUsers();
    
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    users.push({ email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const newUser = { email };
    setUser(newUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    
    return { success: true };
  };

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    
    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }

    const loggedUser = { email };
    setUser(loggedUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(loggedUser));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return { user, loading, login, signup, logout };
}
