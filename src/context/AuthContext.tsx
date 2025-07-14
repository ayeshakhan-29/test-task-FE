import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "@/config";
import { useSignUp } from "@/hooks/useSignUp";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
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

  const login = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem(config.auth.tokenKey, token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(config.auth.tokenKey);
    navigate("/login");
  };

  const { mutate: signUp } = useSignUp();

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
