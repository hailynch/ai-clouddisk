"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useScenarioStore, useServiceStore, useNavigationStore } from "@/lib/store";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ServiceSites from "./service-sites";

export default function Sidebar() {
  const { categories, selectedCategory, setSelectedCategory } = useScenarioStore();
  const { services } = useServiceStore();
  const { activeSection, setActiveSection } = useNavigationStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const toggleSection = () => {
    const newSection = activeSection === "scenarios" ? "services" : "scenarios";
    setActiveSection(newSection);
    if (newSection === "scenarios") {
      setSelectedCategory(null);
    }
  };

  return (
    <div className={cn(
      "bg-card rounded-lg border relative transition-all duration-300",
      isCollapsed ? "w-16" : "w-full md:w-64"
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 h-8 w-8 rounded-full border bg-background shadow-md md:flex hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className={cn(
        "space-y-6 p-4",
        isCollapsed && "items-center"
      )}>
        {/* 切换按钮 */}
        {!isCollapsed && (
          <Button
            variant="outline"
            className="w-full"
            onClick={toggleSection}
          >
            {activeSection === "scenarios" ? "切换到服务导航" : "切换到场景分类"}
          </Button>
        )}

        {/* 场景分类 */}
        {activeSection === "scenarios" && (
          <div>
            {!isCollapsed && <h2 className="text-lg font-semibold mb-4">场景分类</h2>}
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === null ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    isCollapsed && "justify-center px-2"
                  )}
                  onClick={() => setSelectedCategory(null)}
                >
                  {!isCollapsed && <span className="flex-1 text-left">全部场景</span>}
                  <span className={cn(
                    "text-muted-foreground text-sm",
                    isCollapsed && "text-xs"
                  )}>
                    {categories.reduce((acc, cat) => acc + cat.count, 0)}
                  </span>
                </Button>
                {categories.map((category) => (
                  <HoverCard key={category.id} openDelay={isCollapsed ? 300 : 0}>
                    <HoverCardTrigger asChild>
                      <Button
                        variant={selectedCategory === category.id ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-2",
                          isCollapsed && "justify-center px-2"
                        )}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <category.icon className="h-4 w-4 shrink-0" />
                        {!isCollapsed && <span className="flex-1 text-left">{category.name}</span>}
                        {!isCollapsed && <span className="text-muted-foreground text-sm">{category.count}</span>}
                      </Button>
                    </HoverCardTrigger>
                    {isCollapsed && (
                      <HoverCardContent side="right" className="w-40">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {category.count} 个场景
                          </p>
                        </div>
                      </HoverCardContent>
                    )}
                  </HoverCard>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* 服务导航 */}
        {activeSection === "services" && (
          <div>
            {!isCollapsed && <h2 className="text-lg font-semibold mb-4">服务导航</h2>}
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-2">
                {services.map((service) => (
                  <Sheet 
                    key={service.id}
                    open={selectedService === service.id}
                    onOpenChange={(open) => setSelectedService(open ? service.id : null)}
                  >
                    <SheetTrigger asChild>
                      <Button
                        variant={selectedService === service.id ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-2",
                          isCollapsed && "justify-center px-2"
                        )}
                      >
                        <service.icon className="h-4 w-4 shrink-0" />
                        {!isCollapsed && <span className="flex-1 text-left">{service.name}</span>}
                        {!isCollapsed && (
                          <span className="text-muted-foreground text-sm">
                            {service.sites.length}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:max-w-xl">
                      <SheetHeader>
                        <SheetTitle>{service.name}</SheetTitle>
                        <SheetDescription>{service.description}</SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <ServiceSites serviceId={service.id} />
                      </div>
                    </SheetContent>
                  </Sheet>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}