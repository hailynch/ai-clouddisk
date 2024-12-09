"use client";

import { FolderNavigation } from "./folder-navigation";
import { FileList } from "./file-list";
import { Breadcrumb } from "./breadcrumb";
import { useFileExplorer } from "@/hooks/use-file-explorer";

export function FileExplorer() {
  const {
    currentPath,
    sortField,
    sortDirection,
    selectedFiles,
    sortedFiles,
    selectedFileDetails,
    handleSort,
    handleSelect,
    handleSelectAll,
    navigateToPath,
  } = useFileExplorer();

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b">
        <Breadcrumb path={currentPath} onNavigate={navigateToPath} />
      </div>
      <div className="flex-1 flex">
        <div className="w-64 border-r bg-muted/30">
          <FolderNavigation currentPath={currentPath} onNavigate={navigateToPath} />
        </div>
        <div className="flex-1">
          <FileList
            currentPath={currentPath}
            files={sortedFiles}
            selectedFiles={selectedFiles}
            sortField={sortField}
            sortDirection={sortDirection}
            selectedFileDetails={selectedFileDetails}
            onNavigate={navigateToPath}
            onSort={handleSort}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
          />
        </div>
      </div>
    </div>
  );
}