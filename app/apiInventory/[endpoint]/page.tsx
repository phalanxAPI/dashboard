'use client';

import { Button, Flex, SegmentedControl, Skeleton, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Issue } from '@/arsenal/types/issue';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';
import AnalyticsChart from '@/components/apiInventory/apiDetsils/analyticsChart';
import APIInfo from '@/components/apiInventory/apiDetsils/apiInfo';
import SuccessFlow from '@/components/apiInventory/apiDetsils/rulesConfigs/successFlow';
import { TciketsDataTable } from '@/components/apiInventory/apiDetsils/ticketsDatatable';
import { DetailsPageLayout } from '@/components/common/genericDetailsLayout';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher, genericMutationFetcher } from '@/utils/swr.helper';

import BrokenAuthentication from '@/components/apiInventory/apiDetsils/rulesConfigs/BrokenAuthentication';
import BrokenFunctionLevelAuthorization from '@/components/apiInventory/apiDetsils/rulesConfigs/BrokenFunctionLevelAuthorization';
import BrokenObjectLevelAuthorization from '@/components/apiInventory/apiDetsils/rulesConfigs/BrokenObjectLevelAuthorization';
import BrokenObjectPropertyLevelAuthorization from '@/components/apiInventory/apiDetsils/rulesConfigs/BrokenObjectPropertyLevelAuthorization';
import SecurityMisconfiguration from '@/components/apiInventory/apiDetsils/rulesConfigs/SecurityMisconfiguration';
import ServerSideRequestForgery from '@/components/apiInventory/apiDetsils/rulesConfigs/ServerSideRequestForgery';
import UnrestrictedAccessSensitiveBusinessFlows from '@/components/apiInventory/apiDetsils/rulesConfigs/UnrestrictedAccessSensitiveBusinessFlows';
import UnrestrictedResourceConsumption from '@/components/apiInventory/apiDetsils/rulesConfigs/UnrestrictedResourceConsumption';
import UnsafeConsumptionAPIs from '@/components/apiInventory/apiDetsils/rulesConfigs/UnsafeConsumptionAPIs';

export default function APIDetailsPage() {
  const [selectedValue, setSelectedValue] = useState('Rules Config');

  const params = useParams();
  const endpointId = params.endpoint as string;

  const {
    data,
    error,
    isLoading,
    mutate: mutateAPIInfo,
  } = useSWR<AxiosResponse<Record<string, any>>>(
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

  const { trigger: verifyAPI, isMutating: isVerifying } = useSWRMutation<AxiosResponse<any>>(
    `${BASE_URL}/api-info/${endpointId}/verify`,
    genericMutationFetcher
  );
  const { trigger: deprecateAPI, isMutating: isDeprecating } = useSWRMutation<AxiosResponse<any>>(
    `${BASE_URL}/api-info/${endpointId}/deprecate`,
    genericMutationFetcher
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
      <Flex justify="space-between" align="center" maw={1000}>
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
        <Flex align="center" gap={16}>
          {!apiInfoData.isVerified && (
            <Button
              color="teal"
              variant="outline"
              leftSection={<IconCheck size={18} />}
              size="compact-sm"
              onClick={async () => {
                await verifyAPI({
                  type: 'put',
                  rest: [],
                } as any);

                mutateAPIInfo();
              }}
              loading={isVerifying}
            >
              Verify
            </Button>
          )}
          {apiInfoData.isVerified && !apiInfoData.isDeprecated && (
            <Button
              color="orange"
              variant="outline"
              leftSection={<IconCheck size={18} />}
              size="compact-sm"
              onClick={async () => {
                await deprecateAPI({
                  type: 'put',
                  rest: [],
                } as any);

                mutateAPIInfo();
              }}
              loading={isDeprecating}
            >
              Mark As Deprecated
            </Button>
          )}
        </Flex>
      </Flex>
      {selectedValue === 'Analytics' ? (
        <AnalyticsChart appId={apiInfoData.appId} apiId={endpointId} />
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
          <BrokenAuthentication configData={configData} apiId={endpointId} mutateConfig={mutate} />
          <BrokenObjectPropertyLevelAuthorization
            configData={configData}
            apiId={endpointId}
            mutateConfig={mutate}
          />
          <BrokenFunctionLevelAuthorization
            configData={configData}
            apiId={endpointId}
            mutateConfig={mutate}
          />
          <UnrestrictedResourceConsumption
            configData={configData}
            apiId={endpointId}
            mutateConfig={mutate}
          />
          <UnrestrictedAccessSensitiveBusinessFlows
            configData={configData}
            apiId={endpointId}
            mutateConfig={mutate}
          />
          <ServerSideRequestForgery
            configData={configData}
            apiId={endpointId}
            mutateConfig={mutate}
          />
          <SecurityMisconfiguration
            configData={configData}
            apiId={endpointId}
            mutateConfig={mutate}
          />

          <UnsafeConsumptionAPIs configData={configData} apiId={endpointId} mutateConfig={mutate} />
        </>
      )}
    </DetailsPageLayout>
  );
}
