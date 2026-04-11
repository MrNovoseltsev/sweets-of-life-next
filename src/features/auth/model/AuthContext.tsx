'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient as createBrowserSupabaseClient } from '@/shared/lib/supabase/client';
import AuthModal from '../ui/AuthModal';

interface AuthContextValue {
  user: User | null;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const openAuthModal = useCallback(() => setModalOpen(true), []);
  const closeAuthModal = useCallback(() => setModalOpen(false), []);

  return (
    <AuthContext.Provider value={{ user, openAuthModal, closeAuthModal }}>
      {children}
      {modalOpen && <AuthModal onClose={closeAuthModal} />}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
