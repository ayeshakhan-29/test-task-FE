"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const handleSignOut = () => {
    console.log("Signing out...");
    alert("Signed out!");
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Link
        to="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <span className="sr-only">URL Analyzer</span>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        className="ml-auto"
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </header>
  );
}
