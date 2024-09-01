'use client';

import { PageLayout } from '@/components/common/genericLayout/index';

import { GenericSelector } from '@/components/common/genericSelector';
import StatsGrid from '@/components/dashboard/StatsGrid';
import { useActiveApp } from '@/store/activeApp.store';

export default function Page() {
  const { activeAppId } = useActiveApp();

  return (
    <PageLayout pageTitle="Dashboard">
      <GenericSelector />
      {activeAppId ? <StatsGrid /> : null}
    </PageLayout>
  );
}
