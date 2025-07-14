import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export function ProtectedAuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    toast.error("You are already logged in!");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
