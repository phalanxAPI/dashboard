'use client';

import { AppsDataTable } from '@/components/apps/dataTable';
import { PageLayout } from '@/components/common/genericLayout/index';

export default function Page() {
  return (
    <PageLayout
      pageTitle="Apps"
      pageDescription="Manage and monitor all integrated applications, track their API usage, and ensure optimal performance for each app."
    >
      {/* <GenericSelector /> */}
      <AppsDataTable />
    </PageLayout>
  );
}
