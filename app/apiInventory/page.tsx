'use client';

import { APIInventoryDataTable } from '@/components/apiInventory/dataTable';
import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';

export default function Page() {
  return (
    <PageLayout pageTitle="API Inventory">
      <GenericSelector />
      <APIInventoryDataTable />
    </PageLayout>
  );
}
