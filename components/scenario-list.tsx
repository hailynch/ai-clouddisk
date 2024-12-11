"use client";

import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useScenarioStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ScenarioForm from "@/components/scenario-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import ScenarioRanking from "./scenario-ranking";

export default function ScenarioList() {
  const scenarios = useScenarioStore(state => state.getFilteredScenarios());
  const deleteScenario = useScenarioStore(state => state.deleteScenario);
  const incrementViewCount = useScenarioStore(state => state.incrementViewCount);
  const [editingScenario, setEditingScenario] = useState<number | null>(null);
  const [deletingScenario, setDeletingScenario] = useState<number | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    deleteScenario(id);
    setDeletingScenario(null);
    toast({
      title: "场景已删除",
      description: "该AI应用场景已被成功删除",
    });
  };

  const handleScenarioClick = (id: number) => {
    setSelectedScenario(id);
    incrementViewCount(id);
  };

  return (
    <div className="flex gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <div key={scenario.id}>
              <AlertDialog 
                open={deletingScenario === scenario.id} 
                onOpenChange={(open) => !open && setDeletingScenario(null)}
              >
                <Dialog
                  open={selectedScenario === scenario.id}
                  onOpenChange={(open) => setSelectedScenario(open ? scenario.id : null)}
                >
                  <DialogTrigger asChild>
                    <Card 
                      className="gov-card group relative flex flex-col h-[280px] cursor-pointer"
                      onClick={() => handleScenarioClick(scenario.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between space-y-0 p-6 pb-2">
                          <h3 className="text-lg font-bold">{scenario.title}</h3>
                          <Icon className="h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
                        </div>
                        <div className="px-6">
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {scenario.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto p-6 pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-primary group-hover:underline">
                            了解更多 <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-secondary"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setEditingScenario(scenario.id);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDeletingScenario(scenario.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{scenario.title}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <ScrollArea className="h-[60vh] pr-4">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-semibold mb-2">详细描述</h3>
                            <div className="text-muted-foreground whitespace-pre-wrap">{scenario.details}</div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">主要收益</h3>
                            <ul className="list-disc list-inside space-y-1">
                              {scenario.benefits.map((benefit, index) => (
                                <li key={index} className="text-muted-foreground">{benefit}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">实施方案</h3>
                            <div className="text-muted-foreground whitespace-pre-wrap">{scenario.implementation}</div>
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  </DialogContent>
                </Dialog>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>确认删除</AlertDialogTitle>
                    <AlertDialogDescription>
                      您确定要删除这个场景吗？此操作无法撤销。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => handleDelete(scenario.id)}
                    >
                      删除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Dialog 
                open={editingScenario === scenario.id} 
                onOpenChange={(open) => !open && setEditingScenario(null)}
              >
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>编辑场景</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 pr-4">
                    <ScenarioForm
                      scenario={scenario}
                      onSuccess={() => setEditingScenario(null)}
                      mode="edit"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      </div>
      <ScenarioRanking />
    </div>
  );
}