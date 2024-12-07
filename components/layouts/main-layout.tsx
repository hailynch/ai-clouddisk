"use client";

import { Toaster } from "@/components/ui/toaster";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <Toaster />
    </div>
  );
}