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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.getUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const data = await auth.login(email, password);
      setUser(data.user);
      return { error: null };
    } catch (err: any) {
      return { error: { message: err.message || "Login failed" } };
    }
  };

  const signOut = async () => {
    await auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: !!user && (user.is_admin === true), loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
