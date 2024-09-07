'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { Flex, SegmentedControl, Skeleton, Text } from '@mantine/core';

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

import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';
import { Issue } from '@/arsenal/types/issue';

export default function APIDetailsPage() {
  const [selectedValue, setSelectedValue] = useState('Rules Config');

  const params = useParams();
  const endpointId = params.endpoint as string;

  const { data, error, isLoading } = useSWR<AxiosResponse<Record<string, any>>>(
    () => [`${BASE_URL}/api-info/${endpointId}`, 'get'],
    genericAPIFetcher
  );
  //  rules condif data
  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
    mutate,
  } = useSWR<AxiosResponse<SecurityConfiguration[]>>(
    () => [`${BASE_URL}/config/${endpointId}`, 'get'],
    genericAPIFetcher
  );

  // tickets data

  const {
    data: data3,
    error: error3,
    isLoading: isLoading3,
  } = useSWR<AxiosResponse<Issue[]>>(
    () => [
      `${BASE_URL}/issue/api/${endpointId}`,
      'get',

      {
        params: {
          perPage: 10,
          page: 1,
        },
      },
    ],

    genericAPIFetcher
  );
  if (isLoading) {
    return (
      <Flex direction="column">
        <Skeleton mah={636} mt={27} height={250} radius="xl" maw={1024} ml={30} />
        <Skeleton mah={636} mt={27} height={380} radius="xl" maw={1024} ml={30} />
      </Flex>
    );
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }
  const apiInfoData = data?.data || {};
  // console.log('apiInfoData', apiInfoData);

  const apiEndpoint = apiInfoData.endpoint;

  if (isLoading2) {
    return <Text>is loading data</Text>;
  }

  if (error2) {
    return <Text>Error loading data2</Text>;
  }
  const configData = data2?.data || [];
  // console.log('configData', configData);
  if (isLoading3) {
    return (
      <DetailsPageLayout pageTitle="API Details" endpointLabel endpoint={apiEndpoint}>
        <Skeleton mah={636} mt={27} height={250} radius="xl" maw={1024} ml={30} />
      </DetailsPageLayout>
    );
  }
  if (error3) {
    return <Text>is loading data</Text>;
  }
  const issuTicketsData = data3?.data || [];
  // console.log('issueTicketsData', issuTicketsData);
  return (
    <DetailsPageLayout pageTitle="API Details" endpointLabel endpoint={apiEndpoint}>
      <APIInfo data={apiInfoData} />
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
        <TciketsDataTable issueTicketsData={issuTicketsData} />
      ) : (
        <>
          <SuccessFlow configData={configData} apiId={endpointId} mutateConfig={mutate} />
          <BrokenObjectLevelAuthorization
            configData={configData}
            apiId={endpointId}
            mutateConfig={mutate}
          />
          <BrokenAuthentication configData={configData} />
          <BrokenObjectPropertyLevelAuthorization configData={configData} />
          <BrokenFunctionLevelAuthorization configData={configData} />
          <UnrestrictedResourceConsumption configData={configData} />
          <UnrestrictedAccessSensitiveBusinessFlows configData={configData} />
          <ServerSideRequestForgery configData={configData} />
          <SecurityMisconfiguration configData={configData} />
          <UnsafeConsumptionAPIs />
        </>
      )}
    </DetailsPageLayout>
  );
}
