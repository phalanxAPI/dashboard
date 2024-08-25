'use client';

import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';
import { IssuesDataTable } from '@/components/isseus/dataTable';

export default function Page() {
  return (
    <PageLayout pageTitle="Issue Tickets">
      <GenericSelector />
      <IssuesDataTable />
    </PageLayout>
  );
}
