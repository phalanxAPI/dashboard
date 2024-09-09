'use client';

import { PageLayout } from '@/components/common/genericLayout/index';

import { GenericSelector } from '@/components/common/genericSelector';
import StatsGrid from '@/components/dashboard/StatsGrid';
import { useActiveApp } from '@/store/activeApp.store';

export default function Page() {
  const { activeAppId } = useActiveApp();

  return (
    <PageLayout
      pageTitle="Dashboard"
      pageDescription="Monitor and track the performance of backend services with real-time API request data, open issue status, and server resource usage"
    >
      <GenericSelector />
      {activeAppId ? <StatsGrid /> : null}
    </PageLayout>
  );
}
