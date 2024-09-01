'use client';

import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';
import { ScansDataTable } from '@/components/scans/dataTable';
import { useActiveApp } from '@/store/activeApp.store';

export default function Page() {
  const { activeAppId } = useActiveApp();

  return (
    <PageLayout pageTitle="Scans">
      <GenericSelector />
      {activeAppId && <ScansDataTable />}
    </PageLayout>
  );
}
