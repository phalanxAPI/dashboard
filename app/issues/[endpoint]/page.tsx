'use client';

import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { Flex, Skeleton, Text } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { DetailsPageLayout } from '@/components/common/genericDetailsLayout';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';

import IssueInfo from '@/components/isseus/issuesDetails/issueInfo';
import IssueDescription from '@/components/isseus/issuesDetails/issueDescription';

export default function IssueDetailsPage() {
  const pathname = usePathname();
  const endpointId = pathname.split('/').pop();

  const { data, error, isLoading } = useSWR<AxiosResponse<Record<string, any>>>(
    () => [`${BASE_URL}/issue/${endpointId}`, 'get'],
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

  const issueInfoData = data?.data || {};
  console.log('scanino', issueInfoData);
  return (
    <DetailsPageLayout pageTitle="Issue Details" endpointLabel={false}>
      <IssueInfo data={issueInfoData} />
      {/* <ScanOutputSummary data={scanInfoData} /> */}
      <IssueDescription data={issueInfoData} />
    </DetailsPageLayout>
  );
}
