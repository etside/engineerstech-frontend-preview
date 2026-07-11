import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/lib/api";

interface AuthUser {
  id: number;
  name: string;
  email: string;
  is_admin?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'et_user';

function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredUser(user: AuthUser | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser());
  const [loading, setLoading] = useState(true);

  const setUserState = (nextUser: AuthUser | null) => {
    setUser(nextUser);
    setStoredUser(nextUser);
  };

  const refreshUser = async () => {
    setLoading(true);
    const u = await auth.getUser();
    setUserState(u);
    setLoading(false);
    return u;
  };

  useEffect(() => {
    refreshUser().catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'et_token') {
        if (!event.newValue) {
          setUserState(null);
        } else {
          refreshUser().catch(() => setUserState(null));
        }
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const data = await auth.login(email, password);
      setUserState(data.user);
      return { error: null };
    } catch (err: any) {
      return { error: { message: err.message || 'Login failed' } };
    }
  };

  const signOut = async () => {
    try {
      await auth.logout();
    } finally {
      setUserState(null);
      window.location.replace('/admin/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: !!user && (user.is_admin === true), loading, signIn, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
