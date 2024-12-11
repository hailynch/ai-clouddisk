"use client";

import { useState } from "react";
import ServiceSites from "./service-sites";
import { useServiceStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function ServiceNavigation() {
  const [selectedService, setSelectedService] = useState<number | null>(1);
  const [selectedSiteUrl, setSelectedSiteUrl] = useState<string | null>(null);
  const { getFilteredServices } = useServiceStore();
  const services = getFilteredServices();
  const service = services.find(s => s.id === selectedService);

  const handleBack = () => {
    setSelectedSiteUrl(null);
  };

  if (selectedSiteUrl) {
    return (
      <div className="h-[calc(100vh-12rem)] flex flex-col">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 w-fit"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回服务列表
        </Button>
        <div className="flex-1 relative rounded-lg border bg-card">
          <iframe
            src={selectedSiteUrl}
            className="absolute inset-0 w-full h-full rounded-lg"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {service ? (
        <>
          <div className="mb-6 flex-shrink-0">
            <h1 className="text-2xl font-bold mb-2">{service.name}</h1>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
          <ServiceSites 
            serviceId={service.id}
            selectedSiteUrl={selectedSiteUrl}
            onSiteSelect={setSelectedSiteUrl}
          />
        </>
      ) : (
        <div className="text-center text-muted-foreground py-12">
          请选择一个服务分类
        </div>
      )}
    </div>
  );
}