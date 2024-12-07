"use client";

import { useState } from "react";
import { FolderTree } from "@/components/ui/folder-tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, ChevronDown, ChevronRight } from "lucide-react";
import { UserProfile } from "@/components/user/user-profile";
import { useToast } from "@/components/ui/use-toast";

interface FolderNavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function FolderNavigation({ currentPath, onNavigate }: FolderNavigationProps) {
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string; email: string } | undefined>();

  // This would be replaced with actual data from Seafile API
  const mockFolders = [
    {
      id: "1",
      name: "Documents",
      path: "/documents",
      children: [
        { id: "1-1", name: "Work", path: "/documents/work" },
        { id: "1-2", name: "Personal", path: "/documents/personal" },
      ],
    },
    {
      id: "2",
      name: "Pictures",
      path: "/pictures",
      children: [],
    },
  ];

  const handleLogin = () => {
    // Mock login - replace with actual authentication
    setUser({
      name: "John Doe",
      email: "john.doe@example.com",
    });
    toast({
      title: "登录成功",
      description: "欢迎回来，John Doe！",
    });
  };

  const handleLogout = () => {
    setUser(undefined);
    toast({
      title: "已退出登录",
      description: "您已成功退出登录。",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <FolderTree
          data={mockFolders}
          onSelect={onNavigate}
          icons={{
            folder: Folder,
            expanded: ChevronDown,
            collapsed: ChevronRight,
          }}
        />
      </ScrollArea>
      <UserProfile
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}