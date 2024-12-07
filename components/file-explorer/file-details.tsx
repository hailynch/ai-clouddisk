"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { formatBytes, formatPath } from "@/lib/utils";
import { FileIcon, FolderIcon } from "lucide-react";
import { format } from "date-fns";

interface FileDetailsProps {
  selectedFiles: Array<{
    id: string;
    name: string;
    type: "file" | "folder";
    size?: number;
    modified: Date;
    path?: string;
  }>;
}

export function FileDetails({ selectedFiles }: FileDetailsProps) {
  if (selectedFiles.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <p>选择文件以查看详情</p>
      </div>
    );
  }

  if (selectedFiles.length > 1) {
    return (
      <div className="p-4">
        <h3 className="font-semibold mb-2">已选择 {selectedFiles.length} 个项目</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>文件: {selectedFiles.filter(f => f.type === "file").length} 个</p>
          <p>文件夹: {selectedFiles.filter(f => f.type === "folder").length} 个</p>
          <p>总大小: {formatBytes(selectedFiles.reduce((acc, f) => acc + (f.size || 0), 0))}</p>
        </div>
      </div>
    );
  }

  const file = selectedFiles[0];

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3">
          {file.type === "folder" ? (
            <FolderIcon className="h-10 w-10 text-blue-500" />
          ) : (
            <FileIcon className="h-10 w-10 text-gray-500" />
          )}
          <div>
            <h3 className="font-semibold">{file.name}</h3>
            <p className="text-sm text-muted-foreground">
              {file.type === "folder" ? "文件夹" : "文件"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">位置</h4>
            <p className="text-sm text-muted-foreground">
              {formatPath(file.path || "/")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">大小</h4>
            <p className="text-sm text-muted-foreground">
              {file.type === "file" ? formatBytes(file.size || 0) : "--"}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">修改时间</h4>
            <p className="text-sm text-muted-foreground">
              {format(file.modified, "yyyy-MM-dd HH:mm:ss")}
            </p>
          </div>

          {file.type === "file" && (
            <div>
              <h4 className="text-sm font-medium mb-2">预览</h4>
              <div className="border rounded-lg p-4 bg-muted/30">
                <p className="text-sm text-muted-foreground">暂不支持预览此类型文件</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}