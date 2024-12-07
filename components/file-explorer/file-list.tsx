"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { FileIcon, FolderIcon, ChevronUp, ChevronDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatBytes } from "@/lib/utils";
import { FileOperations } from "./file-operations";
import { FileDetails } from "./file-details";

type SortField = "name" | "modified" | "size";
type SortDirection = "asc" | "desc";

interface FileListProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function FileList({ currentPath, onNavigate }: FileListProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // This would be replaced with actual data from Seafile API
  const mockFiles = [
    {
      id: "1",
      name: "Project Proposal.docx",
      type: "file" as const,
      size: 1024 * 1024 * 2.5,
      modified: new Date(2024, 2, 15),
      path: `${currentPath}/Project Proposal.docx`,
    },
    {
      id: "2",
      name: "Images",
      type: "folder" as const,
      modified: new Date(2024, 2, 14),
      path: `${currentPath}/Images`,
    },
    {
      id: "3",
      name: "Development",
      type: "folder" as const,
      modified: new Date(2024, 2, 13),
      path: `${currentPath}/Development`,
    },
    {
      id: "4",
      name: "presentation.pptx",
      type: "file" as const,
      size: 1024 * 1024 * 5.2,
      modified: new Date(2024, 2, 12),
      path: `${currentPath}/presentation.pptx`,
    },
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedFiles = [...mockFiles].sort((a, b) => {
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

  const handleSelect = (fileId: string, isCtrlPressed: boolean) => {
    setSelectedFiles((prev) => {
      if (isCtrlPressed) {
        return prev.includes(fileId)
          ? prev.filter((id) => id !== fileId)
          : [...prev, fileId];
      }
      return [fileId];
    });
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === mockFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(mockFiles.map((file) => file.id));
    }
  };

  const handleNewFolder = () => {
    // Implement new folder creation
    console.log("Create new folder");
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log("Download files:", selectedFiles);
  };

  const handleSmartProcess = () => {
    // Implement smart processing
    console.log("Smart process files:", selectedFiles);
  };

  const handleRowClick = (e: React.MouseEvent, file: typeof mockFiles[0]) => {
    // Prevent handling if clicking checkbox
    if ((e.target as HTMLElement).closest('.checkbox-cell')) {
      return;
    }

    const isCtrlPressed = e.ctrlKey || e.metaKey;
    
    // Handle selection
    handleSelect(file.id, isCtrlPressed);

    // Handle folder navigation on double click
    if (e.detail === 2 && file.type === "folder") {
      onNavigate(`${currentPath}${currentPath.endsWith("/") ? "" : "/"}${file.name}`);
    }
  };

  const selectedFileDetails = mockFiles.filter(file => 
    selectedFiles.includes(file.id)
  );

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 inline-block ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline-block ml-1" />
    );
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 flex flex-col">
        <FileOperations
          selectedFiles={selectedFiles}
          onNewFolder={handleNewFolder}
          onDownload={handleDownload}
          onSmartProcess={handleSmartProcess}
        />
        <ScrollArea className="flex-1">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[30px]">
                  <Checkbox
                    checked={selectedFiles.length === mockFiles.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead 
                  className="w-[400px] font-semibold cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  名称 <SortIcon field="name" />
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort("modified")}
                >
                  修改时间 <SortIcon field="modified" />
                </TableHead>
                <TableHead 
                  className="text-right font-semibold cursor-pointer"
                  onClick={() => handleSort("size")}
                >
                  大小 <SortIcon field="size" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedFiles.map((file) => (
                <TableRow
                  key={file.id}
                  className={`cursor-pointer hover:bg-accent/50 ${
                    selectedFiles.includes(file.id) ? "bg-accent" : ""
                  }`}
                  onClick={(e) => handleRowClick(e, file)}
                >
                  <TableCell className="checkbox-cell">
                    <Checkbox
                      checked={selectedFiles.includes(file.id)}
                      onCheckedChange={() => handleSelect(file.id, true)}
                    />
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    {file.type === "folder" ? (
                      <FolderIcon className="h-4 w-4 text-blue-500" />
                    ) : (
                      <FileIcon className="h-4 w-4 text-gray-500" />
                    )}
                    {file.name}
                  </TableCell>
                  <TableCell>{formatDistanceToNow(file.modified, { addSuffix: true })}</TableCell>
                  <TableCell className="text-right">
                    {file.type === "file" ? formatBytes(file.size) : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <div className="w-80 border-l bg-muted/30">
        <FileDetails selectedFiles={selectedFileDetails} />
      </div>
    </div>
  );
}