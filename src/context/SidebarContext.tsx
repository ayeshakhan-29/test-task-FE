import { createContext, useContext, useState } from "react";

const SidebarContext = createContext<{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}>({ isSidebarOpen: true, toggleSidebar: () => {} });

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
