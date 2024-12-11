"use client";

import { useEffect } from 'react';
import { useScenarioStore } from '@/lib/store';

export default function InitialDataLoader() {
  const fetchScenarios = useScenarioStore(state => state.fetchScenarios);

  useEffect(() => {
    fetchScenarios();
  }, [fetchScenarios]);

  return null;
}