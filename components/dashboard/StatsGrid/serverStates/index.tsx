import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { Box, Flex, Grid, RingProgress, Skeleton, Text } from '@mantine/core';

import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { SystemInfo } from '@/arsenal/types/system-info';

export default function ServerStates() {
  const { data, error, isLoading } = useSWR<AxiosResponse<SystemInfo>>(
    () => [
      `${BASE_URL}/system-info`,
      'get',
      {
        params: {
          appId: '66cdff10e4453dc3b625b1c3',
          serverId: '60d5ec49f8d2b341d8f8e8b8',
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

  const elements = data?.data;
  return (
    <Box
      pt="xl"
      pr="lg"
      pl="lg"
      mih="350px"
      style={{
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: '40px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        alignItems: 'center',
      }}
    >
      <Text fw="600" style={{ fontSize: '22px' }} c="#0D1427">
        Server Stats
      </Text>
      <Grid mt="xl" gutter={{ base: 'lg', md: 'xl', lg: 50 }}>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Flex display="flex" direction="column" style={{ textAlign: 'center' }}>
            <RingProgress
              thickness={8}
              sections={[{ value: elements?.cpuLoad, color: '#0066FF' }]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="xl">
                  {elements?.cpuLoad}%
                </Text>
              }
            />
            <Text fw="bold" c="#151522" mt="sm">
              CPU
            </Text>
            <Text fw="400" c="#151522" mt="sm" size="sm">
              Description
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Flex display="flex" direction="column" style={{ textAlign: 'center' }}>
            <RingProgress
              thickness={8}
              sections={[{ value: elements?.memUsage.usagePercent, color: '#0066FF' }]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="xl">
                  {elements?.memUsage.usagePercent}%
                </Text>
              }
            />
            <Text fw="bold" c="#151522" mt="sm">
              Memory
            </Text>
            <Text fw="400" c="#151522" mt="sm" size="sm">
              Description
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Flex display="flex" direction="column" style={{ textAlign: 'center' }}>
            <RingProgress
              thickness={8}
              sections={[{ value: 60, color: '#0066FF' }]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="xl">
                  {(elements?.networkStats?.[0]?.rx_sec || 0) / 1000} KB/s
                </Text>
              }
            />
            <Text fw="bold" c="#151522" mt="sm">
              Bandwidth
            </Text>

            <Text fw="400" c="#151522" mt="sm" size="sm">
              Description
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Flex display="flex" direction="column" style={{ textAlign: 'center' }}>
            <RingProgress
              thickness={8}
              sections={[{ value: elements?.battery.percent, color: '#0066FF' }]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="xl">
                  {elements?.battery.percent}%
                </Text>
              }
            />
            <Text fw="bold" c="#151522" mt="sm">
              Battery
            </Text>
            <Text fw="400" c="#151522" mt="sm" size="sm">
              Description
            </Text>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
