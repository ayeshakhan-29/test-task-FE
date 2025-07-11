"use client";

import type * as React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, LinkIcon, Info, Globe } from "lucide-react";

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
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "URL Management",
      url: "/urls",
      icon: LinkIcon,
    },
    {
      title: "Results Dashboard",
      url: "/results",
      icon: Info,
    },
    {
      title: "Details View",
      url: "/details",
      icon: Info,
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* You can add a logo or app name here */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base p-2"
        >
          <Globe className="h-6 w-6" />
          <span className="sr-only">URL Analyzer</span>
          <span className="hidden group-data-[state=expanded]:inline">
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
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
