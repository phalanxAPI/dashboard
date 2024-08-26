'use client';

import { PageLayout } from '@/components/common/genericLayout/index';

import { GenericSelector } from '@/components/common/genericSelector';
import StatsGrid from '@/components/dashboard/StatsGrid';

export default function Page() {
  return (
    <PageLayout pageTitle="Dashboard">
      <GenericSelector />
      <StatsGrid />
    </PageLayout>
  );
}
