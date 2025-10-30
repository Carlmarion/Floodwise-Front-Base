import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Dashboard" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-black p-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white shadow-none hover:bg-white/10" />
        <h1 className="text-3xl text-white">{title}</h1>
      </div>
    </header>
  );
}
