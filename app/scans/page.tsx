'use client';

import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';
import { ScansDataTable } from '@/components/scans/dataTable';
import { useActiveApp } from '@/store/activeApp.store';

export default function Page() {
  const { activeAppId } = useActiveApp();

  return (
    <PageLayout
      pageTitle="Scans"
      pageDescription="Perform comprehensive security and performance scans across APIs and services, identifying vulnerabilities and ensuring compliance with standards."
    >
      <GenericSelector />
      {activeAppId && <ScansDataTable />}
    </PageLayout>
  );
}
