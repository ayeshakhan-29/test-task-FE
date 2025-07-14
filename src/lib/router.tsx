import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import { UrlManagementScreen } from "@/pages/UrlManagementPage";
import { ResultsDashboard } from "@/pages/ResultsDashboardPage";
import { UrlDetailsPage } from "@/pages/UrlDetailsPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "login",
            element: (
              <AuthProvider>
                <LoginPage />
              </AuthProvider>
            ),
          },
          {
            path: "signup",
            element: (
              <AuthProvider>
                <SignUpPage />
              </AuthProvider>
            ),
          },
          {
            index: true,
            element: (
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "urls",
            element: (
              <ProtectedRoute>
                <UrlManagementScreen />
              </ProtectedRoute>
            ),
          },
          {
            path: "results",
            element: (
              <ProtectedRoute>
                <ResultsDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "details/:id",
            element: (
              <ProtectedRoute>
                <UrlDetailsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
