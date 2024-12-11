"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useScenarioStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import type { Scenario } from "@/lib/store";

const formSchema = z.object({
  title: z.string().min(2, "标题至少需要2个字符").max(50, "标题不能超过50个字符"),
  category: z.string().min(1, "请选择分类"),
  description: z.string().min(5, "描述至少需要5个字符").max(100, "描述不能超过100个字符"),
  details: z.string().min(20, "详细说明至少需要20个字符"),
  benefits: z.string().min(5, "收益至少需要5个字符"),
  implementation: z.string().min(10, "实施方案至少需要10个字符"),
});

type FormValues = z.infer<typeof formSchema>;

interface ScenarioFormProps {
  scenario?: Scenario;
  onSuccess?: () => void;
  mode?: "create" | "edit";
}

export default function ScenarioForm({ scenario, onSuccess, mode = "create" }: ScenarioFormProps) {
  const { toast } = useToast();
  const addScenario = useScenarioStore(state => state.addScenario);
  const updateScenario = useScenarioStore(state => state.updateScenario);
  const categories = useScenarioStore(state => state.categories);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: scenario ? {
      title: scenario.title,
      category: categories.find(c => c.name === scenario.category)?.id.toString() || "",
      description: scenario.description,
      details: scenario.details,
      benefits: scenario.benefits.join('\n'),
      implementation: scenario.implementation,
    } : {
      title: "",
      category: "",
      description: "",
      details: "",
      benefits: "",
      implementation: "",
    },
  });

  function onSubmit(values: FormValues) {
    const benefits = values.benefits.split('\n').filter(b => b.trim());
    const categoryName = categories.find(c => c.id === parseInt(values.category))?.name || "";
    
    const scenarioData = {
      title: values.title,
      category: categoryName,
      description: values.description,
      details: values.details,
      benefits,
      implementation: values.implementation,
    };

    if (mode === "edit" && scenario) {
      updateScenario(scenario.id, scenarioData);
      toast({
        title: "更新成功",
        description: "场景信息已成功更新",
      });
    } else {
      addScenario(scenarioData);
      toast({
        title: "提交成功",
        description: "新场景已成功添加",
      });
    }

    form.reset();
    onSuccess?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>场景名称</FormLabel>
                <FormControl>
                  <Input placeholder="输入场景名称" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>所属分类</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>简短描述</FormLabel>
              <FormControl>
                <Input placeholder="一句话描述该场景" {...field} />
              </FormControl>
              <FormDescription>
                简短描述将显示在场景卡片上，建议不超过20字。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>详细说明</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="详细描述该AI应用场景的具体实现和应用价值"
                  className="min-h-[100px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>主要收益</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="列出该场景带来的主要收益点"
                  className="min-h-[100px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                每行列出一个收益点，例如：提升效率30%
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="implementation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>实施方案</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="描述该场景的具体实施方案"
                  className="min-h-[100px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {mode === "edit" ? "更新场景" : "提交场景"}
        </Button>
      </form>
    </Form>
  );
}