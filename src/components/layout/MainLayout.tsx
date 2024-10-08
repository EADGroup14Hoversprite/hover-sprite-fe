import { Sidebar } from "@/components/layout/Sidenav";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb/DynamicBreadcrumb";
import { Toaster } from "sonner";
import React, { PropsWithChildren } from "react";
import { useSidebarToggle } from "@/store/use-sidebar-toggle";

export function MainLayout({ children }: PropsWithChildren) {
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
        <Navbar title="Receptionist" />
        <DynamicBreadcrumb />
        {children}
      </main>
      <Toaster />
    </div>
  );
}
