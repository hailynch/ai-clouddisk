"use client";

import { useServiceStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface ServiceDirectoryProps {
  selectedService: number | null;
  onSelectService: (id: number) => void;
}

export default function ServiceDirectory({ selectedService, onSelectService }: ServiceDirectoryProps) {
  const { getFilteredServices } = useServiceStore();
  const services = getFilteredServices();
  const [expandedServices, setExpandedServices] = useState<number[]>([selectedService || 1]);

  const toggleService = (serviceId: number) => {
    setExpandedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="w-64 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-4">服务目录</h2>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-1 pr-4">
          {services.map((service) => (
            <div key={service.id} className="space-y-1">
              <button
                className={cn(
                  "w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                  selectedService === service.id
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-secondary/50",
                  "text-left"
                )}
                onClick={() => {
                  toggleService(service.id);
                  onSelectService(service.id);
                }}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform",
                    expandedServices.includes(service.id) && "rotate-90"
                  )}
                />
                <service.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{service.name}</span>
                <span className="text-xs text-muted-foreground">
                  {service.sites.length}
                </span>
              </button>
              
              {expandedServices.includes(service.id) && (
                <div className="ml-6 pl-3 border-l space-y-1">
                  {service.sites.map((site) => (
                    <button
                      key={site.id}
                      className={cn(
                        "w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                        "hover:bg-secondary/50",
                        "text-left text-muted-foreground hover:text-foreground"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(site.url, '_blank');
                      }}
                    >
                      <div className="relative h-4 w-4 shrink-0">
                        <img
                          src={site.logo}
                          alt=""
                          className="rounded-sm object-contain"
                        />
                      </div>
                      <span className="flex-1 truncate">{site.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}