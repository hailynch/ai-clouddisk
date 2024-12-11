"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScenarioStore } from "@/lib/store";
import { Crown } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

export default function ScenarioRanking() {
  const topScenarios = useScenarioStore((state) => state.getTopScenarios(10));

  return (
    <Card className="w-80 flex-shrink-0 gov-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Crown className="h-5 w-5" />
          热门场景排行
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="space-y-4">
            {topScenarios.map((scenario, index) => (
              <div
                key={scenario.id}
                className={cn(
                  "flex items-start gap-3 p-2 rounded-lg",
                  "hover:bg-primary/5 transition-colors duration-200",
                  "cursor-pointer"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg",
                  index < 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {index + 1}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {scenario.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {scenario.category}
                  </p>
                </div>
                <div className={cn(
                  "text-sm",
                  index < 3 ? "text-primary" : "text-muted-foreground"
                )}>
                  {scenario.viewCount || 0} 次浏览
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}