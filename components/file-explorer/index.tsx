"use client";

import { useState } from "react";
import { FolderNavigation } from "./folder-navigation";
import { FileList } from "./file-list";
import { Breadcrumb } from "./breadcrumb";
import { Separator } from "@/components/ui/separator";

export function FileExplorer() {
  const [currentPath, setCurrentPath] = useState("/");

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b">
        <Breadcrumb path={currentPath} onNavigate={setCurrentPath} />
      </div>
      <div className="flex-1 flex">
        <div className="w-64 border-r bg-muted/30">
          <FolderNavigation currentPath={currentPath} onNavigate={setCurrentPath} />
        </div>
        <div className="flex-1">
          <FileList currentPath={currentPath} onNavigate={setCurrentPath} />
        </div>
      </div>
    </div>
  );
}