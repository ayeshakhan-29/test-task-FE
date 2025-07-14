import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "@/config";
import { useSignUp } from "@/hooks/useSignUp";
import { useLogin } from "@/hooks/useLogin";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: any) => void;
  logout: () => void;
  signUp: (credentials: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication token or user session
    const token = localStorage.getItem(config.auth.tokenKey);
    setIsAuthenticated(!!token);
  }, []);

  const { mutate: signUp } = useSignUp();
  const { mutate: login } = useLogin();

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(config.auth.tokenKey);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
