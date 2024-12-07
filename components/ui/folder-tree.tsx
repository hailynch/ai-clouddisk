"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface TreeNode {
  id: string;
  name: string;
  path: string;
  children?: TreeNode[];
}

interface FolderTreeProps {
  data: TreeNode[];
  onSelect: (path: string) => void;
  icons: {
    folder: React.ElementType;
    expanded: React.ElementType;
    collapsed: React.ElementType;
  };
}

export function FolderTree({ data, onSelect, icons }: FolderTreeProps) {
  return (
    <div className="space-y-1">
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onSelect={onSelect}
          level={0}
          icons={icons}
        />
      ))}
    </div>
  );
}

interface TreeNodeProps {
  node: TreeNode;
  onSelect: (path: string) => void;
  level: number;
  icons: {
    folder: React.ElementType;
    expanded: React.ElementType;
    collapsed: React.ElementType;
  };
}

function TreeNode({ node, onSelect, level, icons }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const Folder = icons.folder;
  const ChevronIcon = isExpanded ? icons.expanded : icons.collapsed;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 py-1 px-2 rounded-sm cursor-pointer hover:bg-accent",
          "text-sm text-muted-foreground hover:text-foreground"
        )}
        style={{ paddingLeft: `${level * 12 + 4}px` }}
        onClick={() => {
          onSelect(node.path);
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="flex items-center gap-1 min-w-0">
          {hasChildren && (
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <Folder className="h-4 w-4 shrink-0 text-blue-500" />
          <span className="truncate">{node.name}</span>
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              level={level + 1}
              icons={icons}
            />
          ))}
        </div>
      )}
    </div>
  );
}