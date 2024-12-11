"use client";

import { Button } from "@/components/ui/button";
import { useScenarioStore, useNavigationStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import AuthButton from "./auth-button";
import SubmitButton from "./submit-button";
import type { NavigationSection } from "@/lib/store";
import Logo from "./ui/logo";
import SearchBar from "./search-bar";

export default function Navbar() {
  const { activeSection, setActiveSection } = useNavigationStore();
  const setSelectedCategory = useScenarioStore(state => state.setSelectedCategory);

  const handleSectionChange = (section: NavigationSection) => {
    setActiveSection(section);
    if (section === "scenarios") {
      setSelectedCategory(null);
    }
  };

  return (
    <div className="gov-header">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="flex items-center gap-6">
              <Button
                variant="ghost"
                className={cn(
                  "font-medium text-primary-foreground hover:text-primary-foreground/90",
                  "hover:bg-primary-foreground/10",
                  activeSection === "scenarios" && "bg-primary-foreground/20"
                )}
                onClick={() => handleSectionChange("scenarios")}
              >
                场景分类
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "font-medium text-primary-foreground hover:text-primary-foreground/90",
                  "hover:bg-primary-foreground/10",
                  activeSection === "services" && "bg-primary-foreground/20"
                )}
                onClick={() => handleSectionChange("services")}
              >
                服务导航
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <SearchBar />
            <SubmitButton />
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  );
}