'use client';

import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Button, Flex, SegmentedControl, Skeleton, Text } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { DetailsPageLayout } from '@/components/common/genericDetailsLayout';
import AppInfo from '@/components/apps/appDetails/appInfo';
import AnalyticsChart from '@/components/apps/appDetails/analyticsChart';
import BaseURL from '@/components/apps/appDetails/rulesConfigs/baseURL';
import AuthTokens from '@/components/apps/appDetails/rulesConfigs/authToken';
import UserData from '@/components/apps/appDetails/rulesConfigs/userData';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';

export default function AppDetailsPage() {
  const [selectedValue, setSelectedValue] = useState('Rules Config');
  const pathname = usePathname();
  const endpointId = pathname.split('/').pop() ?? '';
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { data, error, isLoading } = useSWR<AxiosResponse<Record<string, any>>>(
    () => [`${BASE_URL}/applications/${endpointId}`, 'get'],
    genericAPIFetcher
  );

  const { data: data2 } = useSWR<AxiosResponse<SecurityConfiguration[]>>(
    () => [`${BASE_URL}/config/app/${endpointId}`, 'get'],
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

  const appInfoData = data?.data || {};
  const configData = data2?.data || [];

  const handleTestAppClick = async () => {
    setIsButtonLoading(true);

    const { error: scanError } = useSWR<AxiosResponse<any, any>>(
      () => [
        `${BASE_URL}/scans`,
        'post',

        {
          params: {
            appId: endpointId,
          },
        },
      ],
      genericAPIFetcher
    );
    console.log('Chiragserror', scanError);
    setIsButtonLoading(false);
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
        <AnalyticsChart />
      ) : (
        <>
          <BaseURL baseUrl={appInfoData.baseUrl} appId={endpointId} />
          <AuthTokens configData={configData} />
          <UserData configData={configData} />
        </>
      )}
    </DetailsPageLayout>
  );
}
