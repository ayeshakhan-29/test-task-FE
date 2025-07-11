import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import { UrlManagementScreen } from "@/pages/UrlManagementPage";
import { ResultsDashboard } from "@/pages/ResultsDashboardPage";
import { UrlDetailsPage } from "@/pages/UrlDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "urls",
        element: <UrlManagementScreen />,
      },
      {
        path: "results",
        element: <ResultsDashboard />,
      },
      {
        path: "details/:id",
        element: <UrlDetailsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
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
]);
