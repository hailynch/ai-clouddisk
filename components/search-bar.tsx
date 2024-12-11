"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigationStore } from "@/lib/store";
import { useSearchStore } from "@/lib/search-store";
import { useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchBar() {
  const activeSection = useNavigationStore((state) => state.activeSection);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const debouncedSearch = useDebounce(searchTerm, 300);

  const placeholder = activeSection === "scenarios" 
    ? "搜索AI应用场景..." 
    : "搜索AI服务...";

  useEffect(() => {
    setSearchTerm("");
  }, [activeSection, setSearchTerm]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-9 w-[300px]"
        placeholder={placeholder}
        type="search"
      />
    </div>
  );
}