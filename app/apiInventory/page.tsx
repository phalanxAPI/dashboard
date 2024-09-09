'use client';

import { APIInventoryDataTable } from '@/components/apiInventory/dataTable';
import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';
import { useActiveApp } from '@/store/activeApp.store';

export default function Page() {
  const { activeAppId } = useActiveApp();

  return (
    <PageLayout
      pageTitle="API Inventory"
      pageDescription="View and manage the complete inventory of APIs, including details about hits, verification status, and whether the endpoints are deprecated."
    >
      <GenericSelector />
      {activeAppId && <APIInventoryDataTable />}
    </PageLayout>
  );
}
