import { Brain } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 select-none">
      <div className={cn(
        "relative flex items-center justify-center",
        "w-8 h-8 rounded-lg",
        "bg-primary text-primary-foreground",
        "shadow-sm"
      )}>
        <Brain className="w-5 h-5" />
        <div className={cn(
          "absolute -right-1 -top-1",
          "w-3 h-3 rounded-full",
          "bg-background border-2 border-primary",
          "animate-pulse"
        )} />
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "text-lg font-bold leading-none tracking-tight",
          "text-primary-foreground"
        )}>
          AI场景库
        </span>
        <span className={cn(
          "text-xs leading-none mt-0.5",
          "text-primary-foreground/80"
        )}>
          智能应用解决方案
        </span>
      </div>
    </Link>
  );
}