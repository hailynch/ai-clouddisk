import { useState, useCallback } from 'react';
import { FileItem } from '@/lib/types';
import { getMockFiles } from '@/lib/mock-data';

export function useFileExplorer() {
  const [currentPath, setCurrentPath] = useState("/");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [sortField, setSortField] = useState<"name" | "modified" | "size">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const files = getMockFiles(currentPath);

  const sortedFiles = [...files].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;

    // Always sort folders before files
    if (a.type !== b.type) {
      return a.type === "folder" ? -1 : 1;
    }

    switch (sortField) {
      case "name":
        return multiplier * a.name.localeCompare(b.name);
      case "modified":
        return multiplier * (a.modified.getTime() - b.modified.getTime());
      case "size":
        const aSize = a.type === "file" ? a.size || 0 : 0;
        const bSize = b.type === "file" ? b.size || 0 : 0;
        return multiplier * (aSize - bSize);
      default:
        return 0;
    }
  });

  const handleSort = useCallback((field: "name" | "modified" | "size") => {
    setSortField(prev => {
      if (prev === field) {
        setSortDirection(current => current === "asc" ? "desc" : "asc");
      } else {
        setSortDirection("asc");
      }
      return field;
    });
  }, []);

  const handleSelect = useCallback((fileId: string, isCtrlPressed: boolean) => {
    setSelectedFiles(prev => {
      if (isCtrlPressed) {
        return prev.includes(fileId)
          ? prev.filter(id => id !== fileId)
          : [...prev, fileId];
      }
      return [fileId];
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedFiles(prev => 
      prev.length === files.length ? [] : files.map(f => f.id)
    );
  }, [files]);

  const navigateToPath = useCallback((path: string) => {
    setCurrentPath(path);
    setSelectedFiles([]);
  }, []);

  const selectedFileDetails = files.filter(file => 
    selectedFiles.includes(file.id)
  );

  return {
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
  };
}