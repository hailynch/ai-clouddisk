"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
  };
  onLogin: () => void;
  onLogout: () => void;
}

export function UserProfile({ user, onLogin, onLogout }: UserProfileProps) {
  if (!user) {
    return (
      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={onLogin}
        >
          <User className="h-4 w-4" />
          登录
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 border-t">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-start"
          >
            <User className="h-4 w-4" />
            <span className="truncate">{user.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start" side="right">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{user.name}</span>
              <span className="text-xs text-muted-foreground truncate">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="h-4 w-4 mr-2" />
            账户设置
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            退出登录
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}