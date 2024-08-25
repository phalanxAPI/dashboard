'use client';

import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';

export default function Page() {
  return (
    <PageLayout pageTitle="Dashboard">
      <GenericSelector />
      {/* <GenericDataTable /> */}
      <p>Hello this is dashboards</p>
    </PageLayout>
  );
}
