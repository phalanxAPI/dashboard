'use client';

import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Flex, SegmentedControl, Skeleton, Text } from '@mantine/core';
import { usePathname } from 'next/navigation';

import { DetailsPageLayout } from '@/components/common/genericDetailsLayout';

import AnalyticsChart from '@/components/apps/appDetails/analyticsChart';
import BaseURL from '@/components/apps/appDetails/rulesConfigs/baseURL';
import AuthTokens from '@/components/apps/appDetails/rulesConfigs/authToken';
import UserData from '@/components/apps/appDetails/rulesConfigs/userData';

import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';
import ScanInfo from '@/components/scans/scanDetails/scanInfo';
import ScanOutputSummary from '@/components/scans/scanDetails/outputSummary';

export default function ScanDetailsPage() {
  const [selectedValue, setSelectedValue] = useState('Rules Config');
  const pathname = usePathname();
  const endpointId = pathname.split('/').pop();

  const { data, error, isLoading } = useSWR<AxiosResponse<Record<string, any>>>(
    () => [`${BASE_URL}/scans/${endpointId}`, 'get'],
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

  const scanInfoData = data?.data || {};
  console.log('scanino', scanInfoData);
  return (
    <DetailsPageLayout pageTitle="Scan Details" endpointLabel={false}>
      <ScanInfo data={scanInfoData} />
      <ScanOutputSummary data={scanInfoData} />
    </DetailsPageLayout>
  );
}
