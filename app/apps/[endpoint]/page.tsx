'use client';

import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

import { DetailsPageLayout } from '@/components/common/genericDetailsLayout';

import AppInfo from '@/components/apps/appDetails/appInfo';
import AnalyticsChart from '@/components/apps/appDetails/analyticsChart';
import BaseURL from '@/components/apps/appDetails/rulesConfigs/baseURL';
import AuthTokens from '@/components/apps/appDetails/rulesConfigs/authToken';
import UserData from '@/components/apps/appDetails/rulesConfigs/userData';

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
          <BaseURL />
          <AuthTokens />
          <UserData />
        </>
      )}
    </DetailsPageLayout>
  );
}
