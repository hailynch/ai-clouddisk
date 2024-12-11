"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary/5 border-b">
      <div className="container mx-auto px-4">
        <div className="py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">🎉 欢迎使用 AI 场景库！</span>
            <Link 
              href="/introduction" 
              className={cn(
                "hidden sm:inline-flex items-center",
                "text-primary font-semibold hover:text-primary/80",
                "bg-primary/10 px-3 py-1 rounded-full",
                "transition-colors duration-200",
                "hover:bg-primary/20"
              )}
            >
              了解平台功能和使用方法 →
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}