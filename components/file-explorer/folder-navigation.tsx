"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, ChevronDown, ChevronRight } from "lucide-react";
import { UserProfile } from "@/components/user/user-profile";
import { mockFolders } from "@/lib/mock-data";
import { FolderItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FolderNavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function FolderNavigation({ currentPath, onNavigate }: FolderNavigationProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["/"]));
  const [user, setUser] = useState<{ name: string; email: string } | undefined>();

  const handleFolderClick = (folder: FolderItem, isExpand: boolean = false) => {
    if (isExpand) {
      setExpandedFolders(prev => {
        const next = new Set(prev);
        if (next.has(folder.path)) {
          next.delete(folder.path);
        } else {
          next.add(folder.path);
        }
        return next;
      });
    } else {
      onNavigate(folder.path);
    }
  };

  const renderFolder = (folder: FolderItem, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.path);
    const isSelected = currentPath === folder.path;

    return (
      <div key={folder.id}>
        <div
          className={cn(
            "flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer",
            isSelected ? "bg-accent" : "hover:bg-accent/50",
            level > 0 && "ml-4"
          )}
        >
          {folder.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFolderClick(folder, true);
              }}
              className="p-1 hover:bg-accent/50 rounded-sm"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          <div
            className="flex items-center gap-2 flex-1 py-1"
            onClick={() => handleFolderClick(folder)}
          >
            <Folder className="h-4 w-4 text-blue-500" />
            <span className="text-sm truncate">{folder.name}</span>
          </div>
        </div>
        {isExpanded && folder.children.length > 0 && (
          <div className="mt-1">
            {folder.children.map(child => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const handleLogin = () => {
    setUser({
      name: "John Doe",
      email: "john.doe@example.com",
    });
  };

  const handleLogout = () => {
    setUser(undefined);
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          <div
            className={cn(
              "flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer",
              currentPath === "/" ? "bg-accent" : "hover:bg-accent/50"
            )}
            onClick={() => onNavigate("/")}
          >
            <Folder className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Home</span>
          </div>
          {mockFolders.map(folder => renderFolder(folder))}
        </div>
      </ScrollArea>
      <UserProfile
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}