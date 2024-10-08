"use client";
import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Navbar, Sidebar } from "@/components/layout";
import { useSidebarToggle } from "@/store/use-sidebar-toggle";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb/DynamicBreadcrumb";
import { Toaster } from "sonner";

export default function Layout({ children }: PropsWithChildren) {
  const { isOpen } = useSidebarToggle();

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main
        data-collapsed={isOpen}
        className={cn(
          `
            min-h-screen bg-zinc-50 transition-[margin-left] duration-300 ease-in-out
            dark:bg-zinc-900
            w-full flex flex-col
            data-[collapsed=false]:lg:ml-[68px] 
            data-[collapsed=true]:lg:ml-60
          `,
        )}
      >
        <Navbar title="Sprayer" />
        <DynamicBreadcrumb />
        {children}
      </main>
      <Toaster />
    </div>
  );
}
