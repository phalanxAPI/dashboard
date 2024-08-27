'use client';

import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';
import { ScansDataTable } from '@/components/scans/dataTable';

export default function Page() {
  return (
    <PageLayout pageTitle="Scans">
      <GenericSelector />
      <ScansDataTable />
    </PageLayout>
  );
}
