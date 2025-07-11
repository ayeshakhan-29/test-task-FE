import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
}
