"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Brain, Building2, Cpu, Factory, LineChart, LucideIcon, ShoppingBag, Users, Workflow, BookOpen, HeartHandshake, MessageSquareMore } from 'lucide-react';
import { sampleSites } from './sample-sites';
import { useSearchStore } from './search-store';
import { sampleScenarios } from './sample-scenarios';

// Types
export type NavigationSection = "scenarios" | "services";

export interface Category {
  id: number;
  name: string;
  icon: LucideIcon;
  count: number;
}

export interface Scenario {
  id: number;
  title: string;
  category: string;
  description: string;
  details: string;
  benefits: string[];
  implementation: string;
  icon: LucideIcon;
  viewCount: number;
}

export interface Site {
  id: number;
  title: string;
  description: string;
  url: string;
  logo: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
  sites: Site[];
}

interface ScenarioState {
  scenarios: Scenario[];
  categories: Category[];
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  addScenario: (scenario: Omit<Scenario, 'id' | 'icon' | 'viewCount'>) => void;
  updateScenario: (id: number, scenario: Partial<Omit<Scenario, 'id' | 'icon' | 'viewCount'>>) => void;
  deleteScenario: (id: number) => void;
  incrementViewCount: (id: number) => void;
  fetchScenarios: () => Promise<void>;
  getFilteredScenarios: () => Scenario[];
  getTopScenarios: (limit: number) => Scenario[];
}

interface ServiceState {
  services: Service[];
  addSite: (serviceId: number, site: Omit<Site, 'id'>) => void;
  deleteSite: (serviceId: number, siteId: number) => void;
  getFilteredServices: () => Service[];
}

interface NavigationState {
  activeSection: NavigationSection;
  setActiveSection: (section: NavigationSection) => void;
}

interface AuthState {
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const categoryIcons: Record<string, LucideIcon> = {
  '智能制造': Factory,
  '智能客服': MessageSquareMore,
  '人力资源': Users,
  '供应链': ShoppingBag,
  '研发创新': Brain,
  '数据分析': LineChart,
  '流程自动化': Workflow,
  '企业管理': Building2,
  '智能运维': Cpu,
};

export const useScenarioStore = create<ScenarioState>()(
  persist(
    (set, get) => ({
      scenarios: [],
      categories: [],
      selectedCategory: null,
      setSelectedCategory: (id) => set({ selectedCategory: id }),
      addScenario: (scenario) => {
        const newScenario = {
          ...scenario,
          id: Date.now(),
          icon: categoryIcons[scenario.category] || Brain,
          viewCount: 0,
        };
        set((state) => ({
          scenarios: [...state.scenarios, newScenario],
        }));
      },
      updateScenario: (id, updates) => {
        set((state) => ({
          scenarios: state.scenarios.map((scenario) =>
            scenario.id === id
              ? { 
                  ...scenario, 
                  ...updates, 
                  icon: categoryIcons[updates.category || scenario.category] || scenario.icon,
                }
              : scenario
          ),
        }));
      },
      deleteScenario: (id) => {
        set((state) => ({
          scenarios: state.scenarios.filter((scenario) => scenario.id !== id),
        }));
      },
      incrementViewCount: (id) => {
        set((state) => ({
          scenarios: state.scenarios.map((scenario) =>
            scenario.id === id
              ? { ...scenario, viewCount: scenario.viewCount + 1 }
              : scenario
          ),
        }));
      },
      fetchScenarios: async () => {
        // Only fetch if scenarios array is empty
        if (get().scenarios.length === 0) {
          const scenarios = sampleScenarios.map((scenario, index) => ({
            ...scenario,
            id: index + 1,
            icon: categoryIcons[scenario.category] || Brain,
            viewCount: 0,
          }));

          const categories = Array.from(new Set(scenarios.map((s) => s.category))).map(
            (name, id) => ({
              id: id + 1,
              name,
              icon: categoryIcons[name] || Brain,
              count: scenarios.filter((s) => s.category === name).length,
            })
          );

          set({ scenarios, categories });
        }
      },
      getFilteredScenarios: () => {
        const state = get();
        const searchTerm = useSearchStore.getState().searchTerm.toLowerCase();
        let filtered = state.scenarios;

        if (state.selectedCategory) {
          const category = state.categories.find((c) => c.id === state.selectedCategory);
          if (category) {
            filtered = filtered.filter((s) => s.category === category.name);
          }
        }

        if (searchTerm) {
          filtered = filtered.filter(
            (s) =>
              s.title.toLowerCase().includes(searchTerm) ||
              s.description.toLowerCase().includes(searchTerm) ||
              s.category.toLowerCase().includes(searchTerm)
          );
        }

        return filtered;
      },
      getTopScenarios: (limit) => {
        return [...get().scenarios]
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, limit);
      },
    }),
    {
      name: 'scenario-storage',
      partialize: (state) => ({ 
        scenarios: state.scenarios.map(scenario => ({
          ...scenario,
          icon: undefined // Don't persist icon functions
        }))
      }),
      onRehydrateStorage: () => (state) => {
        // Restore icons after rehydration
        if (state) {
          state.scenarios = state.scenarios.map(scenario => ({
            ...scenario,
            icon: categoryIcons[scenario.category] || Brain
          }));
        }
      },
    }
  )
);

export const useServiceStore = create<ServiceState>((set, get) => ({
  services: [
    {
      id: 1,
      name: "AI模型服务",
      description: "提供各类AI模型API和开发工具",
      icon: Brain,
      sites: sampleSites[1] || [],
    },
    {
      id: 2,
      name: "AI学习资源",
      description: "AI相关的课程、教程和学习平台",
      icon: BookOpen,
      sites: sampleSites[2] || [],
    },
  ],
  addSite: (serviceId, site) => {
    set((state) => ({
      services: state.services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              sites: [...service.sites, { ...site, id: Date.now() }],
            }
          : service
      ),
    }));
  },
  deleteSite: (serviceId, siteId) => {
    set((state) => ({
      services: state.services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              sites: service.sites.filter((site) => site.id !== siteId),
            }
          : service
      ),
    }));
  },
  getFilteredServices: () => {
    const searchTerm = useSearchStore.getState().searchTerm.toLowerCase();
    const services = get().services;

    if (!searchTerm) return services;

    return services.map((service) => ({
      ...service,
      sites: service.sites.filter(
        (site) =>
          site.title.toLowerCase().includes(searchTerm) ||
          site.description.toLowerCase().includes(searchTerm)
      ),
    }));
  },
}));

export const useNavigationStore = create<NavigationState>((set) => ({
  activeSection: "scenarios",
  setActiveSection: (section) => set({ activeSection: section }),
}));

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({ user: { name: "测试用户", email } });
  },
  logout: () => set({ user: null }),
}));