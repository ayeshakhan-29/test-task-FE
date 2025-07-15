"use client";

import type * as React from "react";
import { Link } from "react-router-dom";
import { LinkIcon, Globe, ReceiptText, Grid2x2Check } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const mainNavigation = [
    {
      title: "URL Management",
      url: "/urls",
      icon: LinkIcon,
    },
    {
      title: "Results Dashboard",
      url: "/results",
      icon: Grid2x2Check,
    },
    {
      title: "Details View",
      url: "/details",
      icon: ReceiptText,
      disabled: true, // Disable the Details View menu item
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          to="/urls"
          className="flex items-center gap-2 text-lg font-semibold md:text-base p-2"
        >
          <Globe className="h-6 w-6" />
          <span className="sr-only">URL Analyzer</span>
          <span className="hidden group-data-[state=expanded]:inline text-black">
            URL Analyzer
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={!item.disabled}
                    disabled={item.disabled}
                    className={
                      item.disabled ? "opacity-50 cursor-not-allowed" : ""
                    }
                  >
                    {item.disabled ? (
                      <div className="flex items-center gap-2 w-full hover:text-primary">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <Link to={item.url} className="w-full hover:text-primary">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
