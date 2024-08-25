'use client';

import { PageLayout } from '@/components/common/genericLayout/index';
import { GenericSelector } from '@/components/common/genericSelector';

export default function Page() {
  return (
    <PageLayout pageTitle="Issue Tickets">
      <GenericSelector />
      <p>Hello this issue page</p>
    </PageLayout>
  );
}
