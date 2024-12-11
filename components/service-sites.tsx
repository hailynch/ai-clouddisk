"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useServiceStore } from "@/lib/store";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { useAuthStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

const siteSchema = z.object({
  title: z.string().min(2, "标题至少需要2个字符"),
  description: z.string().min(5, "描述至少需要5个字符"),
  url: z.string().url("请输入有效的URL"),
  logo: z.string().url("请输入有效的logo URL"),
});

type SiteFormData = z.infer<typeof siteSchema>;

interface ServiceSitesProps {
  serviceId: number;
  selectedSiteUrl: string | null;
  onSiteSelect: (url: string | null) => void;
}

export default function ServiceSites({ serviceId, selectedSiteUrl, onSiteSelect }: ServiceSitesProps) {
  const [open, setOpen] = useState(false);
  const { services, addSite, deleteSite } = useServiceStore();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const service = services.find(s => s.id === serviceId);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SiteFormData>({
    resolver: zodResolver(siteSchema),
  });

  if (!service) return null;

  const onSubmit = (data: SiteFormData) => {
    addSite(serviceId, data);
    toast({
      title: "添加成功",
      description: "新站点已成功添加",
    });
    setOpen(false);
    reset();
  };

  const handleDelete = (siteId: number) => {
    deleteSite(serviceId, siteId);
    toast({
      title: "删除成功",
      description: "站点已成功删除",
    });
  };

  return (
    <div className="space-y-4">
      {user && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mb-4">
              <Plus className="h-4 w-4 mr-2" />
              添加站点
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>添加新站点</DialogTitle>
              <DialogDescription>
                添加一个新的服务站点到 {service.name} 分类
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">标题</Label>
                <Input
                  id="title"
                  placeholder="站点名称"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">简介</Label>
                <Textarea
                  id="description"
                  placeholder="简短描述站点提供的服务"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">网址</Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  {...register("url")}
                />
                {errors.url && (
                  <p className="text-sm text-destructive">{errors.url.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  placeholder="https://example.com/logo.png"
                  {...register("logo")}
                />
                {errors.logo && (
                  <p className="text-sm text-destructive">{errors.logo.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                添加站点
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.sites.map((site) => (
            <button
              key={site.id}
              onClick={() => onSiteSelect(site.url)}
              className={cn(
                "group relative flex items-start space-x-4 rounded-lg border p-4 text-left transition-all duration-200 hover:shadow-md",
                selectedSiteUrl === site.url ? "border-primary" : "hover:border-primary/50"
              )}
            >
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src={site.logo}
                  alt={site.title}
                  className="rounded-lg object-contain"
                  fill
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium leading-none mb-1 flex items-center gap-2">
                  {site.title}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {site.description}
                </p>
              </div>
              {user && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(site.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}