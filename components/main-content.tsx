"use client";

import ScenarioList from '@/components/scenario-list';
import ServiceNavigation from '@/components/service-navigation';
import { useNavigationStore } from '@/lib/store';

export default function MainContent() {
  const activeSection = useNavigationStore(state => state.activeSection);
  
  return activeSection === "scenarios" ? <ScenarioList /> : <ServiceNavigation />;
}