"use client";

import { FileExplorer } from "@/components/file-explorer";
import { MainLayout } from "@/components/layouts/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <FileExplorer />
    </MainLayout>
  );
}