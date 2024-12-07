"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { FileIcon, FolderIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SearchResult {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  modified: Date;
}

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mock search function - replace with actual API call
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Simulate API search results
    const mockResults: SearchResult[] = [
      {
        id: "1",
        name: "Project Proposal.docx",
        type: "file",
        path: "/Documents/Projects",
        modified: new Date(2024, 2, 15),
      },
      {
        id: "2",
        name: "Images",
        type: "folder",
        path: "/Media",
        modified: new Date(2024, 2, 14),
      },
    ].filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.path.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(mockResults);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>搜索文件</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="输入搜索关键词..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
            autoFocus
          />
          <ScrollArea className="h-[400px] border rounded-md">
            {results.length > 0 ? (
              <div className="divide-y">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="p-3 hover:bg-accent cursor-pointer flex items-center gap-3"
                  >
                    {result.type === "folder" ? (
                      <FolderIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    ) : (
                      <FileIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{result.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {result.path}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground flex-shrink-0">
                      {formatDistanceToNow(result.modified, { addSuffix: true })}
                    </p>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="p-4 text-center text-muted-foreground">
                未找到相关文件
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                输入关键词开始搜索
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}