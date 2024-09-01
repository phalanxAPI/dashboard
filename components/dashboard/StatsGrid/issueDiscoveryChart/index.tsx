import { BarChart } from '@mantine/charts';
import { Box, Skeleton, Text } from '@mantine/core';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { useActiveApp } from '@/store/activeApp.store';

// const mdata = [
//   { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
//   { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
//   { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
//   { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
//   { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
//   { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
// ];

export default function IssueDiscoveryChart() {
  const { activeAppId } = useActiveApp();

  const { data, error, isLoading } = useSWR<AxiosResponse<{ data: Record<string, any>[] }>>(
    () => [
      `${BASE_URL}/issuegraph`,
      'get',
      {
        params: {
          appId: activeAppId,
        },
      },
    ],
    genericAPIFetcher
  );

  if (isLoading) {
    return <Skeleton height={350} mt={6} radius="xl" />;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  // Ensure that elements is always an array
  const elements = data?.data.data || [];
  console.log('elements', elements);
  return (
    <Box
      pt="xl"
      pr="xl"
      pl="xl"
      pb="xl"
      style={{
        height: '350px',
        backgroundColor: '#F1FFFF',
        borderRadius: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box maw={193} style={{ position: 'absolute', top: '40px', left: '29px' }}>
        <Text fw="600" style={{ fontSize: '30px' }} c="#0D1427">
          Issues Discovered
        </Text>
      </Box>
      <BarChart
        h={170}
        data={elements}
        dataKey="time"
        withXAxis={false}
        withYAxis={false}
        series={[
          { name: 'openIssues', color: '#5B8FF9' },
          { name: 'highSeverityIssues', color: '#61DDAA' },
          { name: 'lowSeverityIssues', color: '#65789B' },
        ]}
        gridColor="transparent"
      />
    </Box>
  );
}
