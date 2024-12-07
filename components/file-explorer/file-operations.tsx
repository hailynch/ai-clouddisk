"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Download,
  FolderPlus,
  Share2,
  Trash2,
  Upload,
  Wand2,
  Search,
} from "lucide-react";

interface FileOperationsProps {
  selectedFiles: string[];
  onNewFolder: () => void;
  onDownload: () => void;
  onSmartProcess: () => void;
}

export function FileOperations({
  selectedFiles,
  onNewFolder,
  onDownload,
  onSmartProcess,
}: FileOperationsProps) {
  const hasSelection = selectedFiles.length > 0;

  return (
    <div className="p-2 border-b flex items-center gap-2">
      <div className="flex-1 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onNewFolder}
          className="flex items-center gap-2"
        >
          <FolderPlus className="h-4 w-4" />
          新建文件夹
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          disabled={!hasSelection}
          onClick={onDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          下载
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={!hasSelection}
          onClick={onSmartProcess}
          className="flex items-center gap-2"
        >
          <Wand2 className="h-4 w-4" />
          智能处理
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          上传
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          分享
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={!hasSelection}
          className="flex items-center gap-2 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          删除
        </Button>
      </div>
      <div className="relative w-64">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索文件..."
          className="pl-8"
          onChange={(e) => {
            // Implement search functionality
            console.log("Searching:", e.target.value);
          }}
        />
      </div>
    </div>
  );
}