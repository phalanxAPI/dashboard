'use client';

import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';

export default function Page() {
  return (
    <PageLayout pageTitle="Apps">
      <GenericSelector />
      <p>Hello this apps page</p>
    </PageLayout>
  );
}
