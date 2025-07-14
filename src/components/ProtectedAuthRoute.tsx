import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedAuthRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
