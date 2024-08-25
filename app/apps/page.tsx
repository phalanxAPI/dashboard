'use client';

import { AppsDataTable } from '@/components/apps/dataTable';
import { PageLayout } from '@/components/common/genericLayout/index';

export default function Page() {
  return (
    <PageLayout pageTitle="Apps">
      {/* <GenericSelector /> */}
      <AppsDataTable />
    </PageLayout>
  );
}
