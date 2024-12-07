"use client";

import { ChevronRight, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbProps {
  path: string;
  onNavigate: (path: string) => void;
}

export function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  const segments = path.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-1 p-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onNavigate("/")}
      >
        <HomeIcon className="h-4 w-4" />
      </Button>
      {segments.map((segment, index) => {
        const segmentPath = "/" + segments.slice(0, index + 1).join("/");
        return (
          <div key={segmentPath} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Button
              variant="ghost"
              onClick={() => onNavigate(segmentPath)}
            >
              {segment}
            </Button>
          </div>
        );
      })}
    </div>
  );
}