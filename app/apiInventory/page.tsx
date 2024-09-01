'use client';

import { APIInventoryDataTable } from '@/components/apiInventory/dataTable';
import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';
import { useActiveApp } from '@/store/activeApp.store';

export default function Page() {
  const { activeAppId } = useActiveApp();

  return (
    <PageLayout pageTitle="API Inventory">
      <GenericSelector />
      {activeAppId && <APIInventoryDataTable />}
    </PageLayout>
  );
}
