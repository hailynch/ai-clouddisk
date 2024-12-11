import ScenarioList from '@/components/scenario-list';
import ServiceNavigation from '@/components/service-navigation';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import NotificationBanner from '@/components/notification-banner';
import { Suspense } from 'react';
import InitialDataLoader from '@/components/initial-data-loader';
import MainContent from '@/components/main-content';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <InitialDataLoader />
      </Suspense>
      <NotificationBanner />
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:sticky md:top-6 flex-shrink-0 z-30">
            <Sidebar />
          </div>
          <main className="flex-1 min-w-0">
            <MainContent />
          </main>
        </div>
      </div>
    </div>
  );
}