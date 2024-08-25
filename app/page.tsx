'use client';

import { GenericDataTable } from '@/components/common/genericDatatable';
import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';

export default function Page() {
  return (
    <PageLayout>
      <GenericSelector />
      <GenericDataTable />
    </PageLayout>
  );
}
