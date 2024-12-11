"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IntroductionPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首页
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold">欢迎使用 AI 场景库</h1>
            <p className="text-xl text-muted-foreground">
              探索 AI 在各行业的创新应用，发现适合您业务的 AI 解决方案
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">平台功能</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">场景浏览</h3>
                <p className="text-muted-foreground">
                  按行业分类浏览各种 AI 应用场景，了解实施方案和收益分析
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">服务导航</h3>
                <p className="text-muted-foreground">
                  发现优质的 AI 服务和工具，快速找到适合您需求的解决方案
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">场景提交</h3>
                <p className="text-muted-foreground">
                  分享您的 AI 应用经验，帮助更多企业了解和应用 AI 技术
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">热门排行</h3>
                <p className="text-muted-foreground">
                  实时展示最受关注的应用场景，掌握 AI 应用趋势
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">使用指南</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">1. 浏览场景</h3>
                <p className="text-muted-foreground">
                  在左侧选择感兴趣的行业分类，或使用搜索框查找特定场景。点击场景卡片查看详细信息。
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">2. 查找服务</h3>
                <p className="text-muted-foreground">
                  切换到"服务导航"标签，浏览分类整理的 AI 服务和工具。点击服务卡片可直接访问相关网站。
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">3. 提交场景</h3>
                <p className="text-muted-foreground">
                  点击右上角的"提交场景"按钮，填写场景信息。包括标题、描述、实施方案和预期收益等。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">开始使用</h2>
            <p className="text-muted-foreground">
              现在您已经了解了平台的主要功能，开始探索 AI 应用场景，发现适合您业务的解决方案吧！
            </p>
            <div className="flex gap-4">
              <Link href="/">
                <Button>浏览场景</Button>
              </Link>
              <Link href="/?section=services">
                <Button variant="outline">查看服务</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}