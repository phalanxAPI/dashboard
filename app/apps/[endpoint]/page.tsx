'use client';

import { Button, Flex, SegmentedControl, Skeleton, Text } from '@mantine/core';
import { AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';
import AnalyticsChart from '@/components/apps/appDetails/analyticsChart';
import AppInfo from '@/components/apps/appDetails/appInfo';
import AuthTokens from '@/components/apps/appDetails/rulesConfigs/authToken';
import BaseURL from '@/components/apps/appDetails/rulesConfigs/baseURL';
import UserData from '@/components/apps/appDetails/rulesConfigs/userData';
import { DetailsPageLayout } from '@/components/common/genericDetailsLayout';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher, genericMutationFetcher } from '@/utils/swr.helper';

export default function AppDetailsPage() {
  const [selectedValue, setSelectedValue] = useState('Rules Config');
  const params = useParams();
  const appId = params.endpoint as string;

  // const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { data, error, isLoading, mutate } = useSWR<AxiosResponse<Record<string, any>>>(
    () => [`${BASE_URL}/applications/${appId}`, 'get'],
    genericAPIFetcher
  );

  const { data: data2, mutate: mutateConfig } = useSWR<AxiosResponse<SecurityConfiguration[]>>(
    () => [`${BASE_URL}/config/app/${appId}`, 'get'],
    genericAPIFetcher
  );

  const { trigger, isMutating: isButtonLoading } = useSWRMutation<AxiosResponse<any>>(
    `${BASE_URL}/scans`,
    genericMutationFetcher
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

  const appInfoData = data?.data || {};
  const configData = data2?.data || [];

  const handleTestAppClick = async () => {
    try {
      const TestAppdata = await trigger({
        type: 'post',
        rest: [
          {},
          {
            params: {
              appId,
            },
          },
        ],
      } as any);

      console.log(TestAppdata);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DetailsPageLayout pageTitle="App Details" endpointLabel={false}>
      <AppInfo data={appInfoData} />

      <Flex direction="row" align="center" justify="space-between" maw={1000}>
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
        <Button
          loading={isButtonLoading}
          loaderProps={{ type: 'dots' }}
          variant="gradient"
          onClick={handleTestAppClick}
          gradient={{ from: 'violet', to: 'indigo', deg: 90 }}
        >
          Test App
        </Button>
      </Flex>
      {selectedValue === 'Analytics' ? (
        <AnalyticsChart appId={appId} />
      ) : (
        <>
          <BaseURL baseUrl={appInfoData.baseUrl} appId={appId} mutateConfig={mutate} />
          <AuthTokens configData={configData} appId={appId} mutateConfig={mutateConfig} />
          <UserData configData={configData} appId={appId} mutateConfig={mutateConfig} />
        </>
      )}
    </DetailsPageLayout>
  );
}
