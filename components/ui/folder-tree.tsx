"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TreeProps {
  data: {
    id: string;
    name: string;
    path: string;
    children?: TreeProps["data"][];
  }[];
  onSelect: (path: string) => void;
  icons: {
    folder: LucideIcon;
    expanded: LucideIcon;
    collapsed: LucideIcon;
  };
  level?: number;
  expanded?: Set<string>;
  onToggle?: (path: string) => void;
  selectedPath?: string;
}

export function FolderTree({
  data,
  onSelect,
  icons: { folder: FolderIcon, expanded: ExpandedIcon, collapsed: CollapsedIcon },
  level = 0,
  expanded = new Set(),
  onToggle,
  selectedPath,
}: TreeProps) {
  return (
    <div className="space-y-1">
      {data.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expanded.has(item.path);
        const isSelected = selectedPath === item.path;

        return (
          <div key={item.id}>
            <div
              className={cn(
                "flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer",
                isSelected ? "bg-accent" : "hover:bg-accent/50",
                level > 0 && "ml-4"
              )}
            >
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle?.(item.path);
                  }}
                  className="p-1 hover:bg-accent/50 rounded-sm"
                >
                  {isExpanded ? (
                    <ExpandedIcon className="h-4 w-4" />
                  ) : (
                    <CollapsedIcon className="h-4 w-4" />
                  )}
                </button>
              )}
              <div
                className="flex items-center gap-2 flex-1 py-1"
                onClick={() => onSelect(item.path)}
              >
                <FolderIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm truncate">{item.name}</span>
              </div>
            </div>
            {isExpanded && hasChildren && (
              <FolderTree
                data={item.children!}
                onSelect={onSelect}
                icons={{ folder: FolderIcon, expanded: ExpandedIcon, collapsed: CollapsedIcon }}
                level={level + 1}
                expanded={expanded}
                onToggle={onToggle}
                selectedPath={selectedPath}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}