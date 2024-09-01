'use client';

import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';
import { IssuesDataTable } from '@/components/isseus/dataTable';
import { useActiveApp } from '@/store/activeApp.store';

export default function Page() {
  const { activeAppId } = useActiveApp();

  return (
    <PageLayout pageTitle="Issue Tickets">
      <GenericSelector />
      {activeAppId && <IssuesDataTable />}
    </PageLayout>
  );
}
