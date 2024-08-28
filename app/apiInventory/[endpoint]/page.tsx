'use client';

import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import APIInfo from '@/components/apiInventory/apiDetsils/apiInfo';
import { DetailsPageLayout } from '@/components/common/genericDetailsLayout';
import AnalyticsChart from '@/components/apiInventory/apiDetsils/analyticsChart';
import { TciketsDataTable } from '@/components/apiInventory/apiDetsils/ticketsDatatable';
import SuccessFlow from '@/components/apiInventory/apiDetsils/rulesConfigs/successFlow';
import BrokenObjectLevelAuthorization from '@/components/apiInventory/apiDetsils/rulesConfigs/BrokenObjectLevelAuthorization';
import BrokenAuthentication from '@/components/apiInventory/apiDetsils/rulesConfigs/BrokenAuthentication';
import BrokenObjectPropertyLevelAuthorization from '@/components/apiInventory/apiDetsils/rulesConfigs/BrokenObjectPropertyLevelAuthorization';
import BrokenFunctionLevelAuthorization from '@/components/apiInventory/apiDetsils/rulesConfigs/BrokenFunctionLevelAuthorization';
import ServerSideRequestForgery from '@/components/apiInventory/apiDetsils/rulesConfigs/ServerSideRequestForgery';
import SecurityMisconfiguration from '@/components/apiInventory/apiDetsils/rulesConfigs/SecurityMisconfiguration';
import UnsafeConsumptionAPIs from '@/components/apiInventory/apiDetsils/rulesConfigs/UnsafeConsumptionAPIs';
import UnrestrictedResourceConsumption from '@/components/apiInventory/apiDetsils/rulesConfigs/UnrestrictedResourceConsumption';
import UnrestrictedAccessSensitiveBusinessFlows from '@/components/apiInventory/apiDetsils/rulesConfigs/UnrestrictedAccessSensitiveBusinessFlows';

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
        <>
          <SuccessFlow />
          <BrokenObjectLevelAuthorization />
          <BrokenAuthentication />
          <BrokenObjectPropertyLevelAuthorization />
          <BrokenFunctionLevelAuthorization />
          <UnrestrictedResourceConsumption />
          <UnrestrictedAccessSensitiveBusinessFlows />
          <ServerSideRequestForgery />
          <SecurityMisconfiguration />
          <UnsafeConsumptionAPIs />
        </>
      )}
    </DetailsPageLayout>
  );
}
