import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Profile } from '../lib/supabase';
import { api } from '../lib/api';

interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: Error | null; profile: Profile | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null; profile: Profile | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  forgotPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        if (!token) {
          setLoading(false);
          return;
        }

        const data = await api.get<{ profile: Profile }>('/auth/me');
        const profileData = data.profile;

        setProfile(profileData);
        setUser({ id: profileData.id, email: profileData.email });
      } catch {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      const data = await api.post<{ token: string; profile: Profile }>('/auth/signup', {
        email,
        password,
        full_name: fullName,
        phone,
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', data.token);
      }

      setProfile(data.profile);
      setUser({ id: data.profile.id, email: data.profile.email });

      return { error: null, profile: data.profile };
    } catch (error) {
      return { error: error as Error, profile: null };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await api.post<unknown>('/auth/forgot-password', { email });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await api.post<{ token: string; profile: Profile }>('/auth/login', {
        email,
        password,
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', data.token);
      }

      setProfile(data.profile);
      setUser({ id: data.profile.id, email: data.profile.email });

      return { error: null, profile: data.profile };
    } catch (error) {
      return { error: error as Error, profile: null };
    }
  };

  const signOut = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const data = await api.patch<{ profile: Profile }>('/profile', {
        full_name: updates.full_name,
        phone: updates.phone,
      });

      setProfile(data.profile);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile,
      forgotPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
