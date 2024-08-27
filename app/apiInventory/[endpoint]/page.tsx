'use client';

import { useState } from 'react';
import { SegmentedControl, Text } from '@mantine/core';
import APIInfo from '@/components/apiInventory/apiDetsils/apiInfo';
import { DetailsPageLayout } from '@/components/common/genericDetailsLayout';
import AnalyticsChart from '@/components/apiInventory/apiDetsils/analyticsChart';
import { TciketsDataTable } from '@/components/apiInventory/apiDetsils/ticketsDatatable';

export default function DetailsPage() {
  const [selectedValue, setSelectedValue] = useState('Rules Config');
  return (
    <DetailsPageLayout pageTitle="API Details">
      <APIInfo />
      <SegmentedControl
        value={selectedValue}
        onChange={setSelectedValue}
        data={['Rules Config', 'Analytics', 'Tickets']}
        color="#1E1E1E"
        bg="white"
        fw={400}
        mt={5}
        style={{ fontSize: '14px', borderRadius: '49px' }}
      />
      {selectedValue === 'Analytics' ? (
        <AnalyticsChart />
      ) : selectedValue === 'Tickets' ? (
        <TciketsDataTable />
      ) : (
        <Text>Hello</Text>
      )}
    </DetailsPageLayout>
  );
}
