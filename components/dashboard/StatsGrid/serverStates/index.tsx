import { Box, Flex, Grid, RingProgress, Select, Skeleton, Text, Title } from '@mantine/core';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ServerDoc } from '@/arsenal/models/server';
import { SystemInfo } from '@/arsenal/types/system-info';
import { useActiveApp } from '@/store/activeApp.store';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';

export default function ServerStates() {
  const { activeAppId } = useActiveApp();

  const { data: servers } = useSWR<AxiosResponse<ServerDoc[]>>(
    () => [`${BASE_URL}/applications/${activeAppId}/servers`, 'get'],
    genericAPIFetcher
  );

  const [activeServerId, setActiveServerId] = useState<string | null>(null);

  useEffect(() => {
    if (servers?.data) {
      setActiveServerId(servers.data[0]._id);
    }
  }, [servers]);

  const {
    data: systemInfo,
    error: errorLoadingSystemInfo,
    isLoading: loadingSystemInfo,
  } = useSWR<AxiosResponse<SystemInfo>>(
    () => [
      activeServerId ? `${BASE_URL}/system-info` : null,
      'get',
      {
        params: {
          appId: activeAppId,
          serverId: activeServerId,
        },
      },
    ],
    genericAPIFetcher
  );

  if (loadingSystemInfo) {
    return <Skeleton height={350} mt={6} radius="xl" />;
  }

  if (errorLoadingSystemInfo) {
    return <Text>Error loading data</Text>;
  }

  const sysData = systemInfo?.data;
  console.log('servers', sysData?.networkStats[0]?.rxSec);
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
      <Flex align="center" gap={16} mr="auto" ml={24}>
        <Title order={3} fz={24} fw="600" style={{ fontSize: '22px' }} c="#0D1427">
          Server Stats
        </Title>
        <Select
          placeholder="Server"
          data={servers?.data?.map((server) => ({ value: server._id, label: server.name }))}
          value={activeServerId}
          onChange={(value) => setActiveServerId(value)}
          allowDeselect={false}
        />
      </Flex>
      <Grid mt="xl" gutter={{ base: 'lg', md: 'xl', lg: 50 }}>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Flex display="flex" direction="column" style={{ textAlign: 'center' }}>
            <RingProgress
              thickness={8}
              sections={[{ value: sysData?.cpuLoad || 0, color: '#0066FF' }]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="xl">
                  {sysData?.cpuLoad.toFixed(2)}%
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
              sections={[{ value: sysData?.memUsage.usagePercent, color: '#0066FF' }]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="xl">
                  {sysData?.memUsage.usagePercent}%
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
              sections={[
                {
                  value:
                    ((sysData?.networkStats[0]?.rxSec || 0) /
                      ((sysData?.networkStats[0]?.rxSec || 1) +
                        (sysData?.networkStats[0]?.txSec || 0))) *
                    100,
                  color: '#0066FF',
                },
              ]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="lg">
                  {((sysData?.networkStats[0]?.rxSec || 0) / 1000 / 1000).toFixed(2)}MB/s
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
              sections={[{ value: sysData?.battery.percent, color: '#0066FF' }]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="xl">
                  {sysData?.battery.percent}%
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
