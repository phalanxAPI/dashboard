'use client';

import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

import { DetailsPageLayout } from '@/components/common/genericDetailsLayout';

import SuccessFlow from '@/components/apiInventory/apiDetsils/rulesConfigs/successFlow';
import AppInfo from '@/components/apps/appDetails/appInfo';
import AnalyticsChart from '@/components/apps/appDetails/analyticsChart';

export default function AppDetailsPage() {
  const [selectedValue, setSelectedValue] = useState('Rules Config');
  return (
    <DetailsPageLayout pageTitle="App Details" endpointLabel={false}>
      <AppInfo />
      <SegmentedControl
        value={selectedValue}
        onChange={setSelectedValue}
        data={['Rules Config', 'Analytics']}
        color="#1E1E1E"
        bg="white"
        fw={400}
        mt={5}
        style={{ fontSize: '14px', borderRadius: '49px' }}
      />
      {selectedValue === 'Analytics' ? (
        <AnalyticsChart />
      ) : (
        <>
          <SuccessFlow />
        </>
      )}
    </DetailsPageLayout>
  );
}
