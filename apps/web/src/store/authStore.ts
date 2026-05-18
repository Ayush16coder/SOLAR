import { create } from 'zustand';
import api from '@/lib/api';

interface User {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    set({ isAuthenticated: true });
    // In a real app, you'd fetch user profile here
  },
  register: async (email, password, fullName) => {
    const { data } = await api.post('/auth/register', { email, password, fullName });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    set({ isAuthenticated: true });
  },
  logout: () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      api.delete('/auth/logout', { data: { refreshToken } });
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isAuthenticated: false });
  },
}));
