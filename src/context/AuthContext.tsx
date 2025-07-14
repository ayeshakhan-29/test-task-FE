import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { config } from "@/config";
import { useSignUp } from "@/hooks/useSignUp";
import { useLogin } from "@/hooks/useLogin";
import { toast } from "sonner";

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

  const { mutate: loginMutate } = useLogin();
  const { mutate: signUpMutate } = useSignUp();

  useEffect(() => {
    const token = localStorage.getItem(config.auth.tokenKey);
    setIsAuthenticated(!!token);
  }, []);

  const login = useCallback(
    (credentials: any) => {
      loginMutate(credentials, {
        onSuccess: (response: any) => {
          localStorage.setItem(config.auth.tokenKey, response.token);
          setIsAuthenticated(true);
          toast.success(response.message || "Login successful");
          navigate("/");
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.response?.data?.errors ||
            error.message ||
            "Login failed.";

          toast.error(errorMessage);
        },
      });
    },
    [loginMutate, navigate]
  );

  const signUp = useCallback(
    (credentials: any) => {
      signUpMutate(credentials, {
        onSuccess: (response: any) => {
          localStorage.setItem(config.auth.tokenKey, response.token);
          setIsAuthenticated(true);
          toast.success(response.message || "Sign up successful");
          navigate("/");
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.response?.data?.errors ||
            error.message ||
            "Sign up failed.";

          toast.error(errorMessage);
        },
      });
    },
    [signUpMutate, navigate]
  );

  const logout = () => {
    localStorage.removeItem(config.auth.tokenKey);
    setIsAuthenticated(false);
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
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
