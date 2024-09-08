import { AreaChart } from '@mantine/charts';
import { Box, Flex, Select, Skeleton, Text, Title, useMantineTheme } from '@mantine/core';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import useSWR from 'swr';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { BASE_URL } from '@/utils/constants';
import { toTitleCase } from '@/utils';
import { useActiveApp } from '@/store/activeApp.store';

const getServerName = (serverId: string) => toTitleCase(serverId?.split('-').join(' '));

export default function ApiStatusChart() {
  const theme = useMantineTheme();
  const { activeAppId } = useActiveApp();
  const { colors } = theme;
  const colorsList = Object.entries(colors);
  const totalColors = colorsList.length;

  const [value, setValue] = useState('api-info-graph?requestType=INCOMING');

  const options = [
    { value: 'api-info-graph?requestType=INCOMING', label: 'Incoming Requests' },
    { value: 'api-info-graph?requestType=OUTGOING', label: 'Outgoing Requests' },
    { value: 'system-info/cpu-usage', label: 'Cpu Usage' },
    { value: 'system-info/memory-usage', label: 'Memory Usage' },
    { value: 'system-info/disk-io?READ', label: 'Disk IO - Read' },
    { value: 'system-info/disk-io?WRITE', label: 'Disk IO - Write' },
    { value: 'system-info/network-stats', label: 'Network Stats' },
  ];

  const graphDatakey = {
    'system-info/cpu-usage': 'avgCpuLoad',
    'system-info/memory-usage': 'avgMemUsagePercent',
    'system-info/disk-io?READ': 'avgDiskRead',
    'system-info/disk-io?WRITE': 'avgDiskWrite',
    'system-info/network-stats': 'avgRxSec',
    'api-info-graph?requestType=INCOMING': 'count',
    'api-info-graph?requestType=OUTGOING': 'count',
  };

  const { data, error, isLoading } = useSWR<
    AxiosResponse<
      {
        serverId: string;
        data: {
          time: Date;
        } & Record<string, number>[];
      }[]
    >
  >(
    () => [
      `${BASE_URL}/${value}`,
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

  const elements = data?.data || [];

  // use 20 data points from the and  the graph skipping 10 data points
  const graphData = elements[0]?.data
    .map((item) => ({
      name: item.time,
      time: new Date(item.time).toLocaleString(),
      ...elements.reduce(
        (acc, curr) => {
          acc[getServerName(curr.serverId)] =
            (curr.data.find((d) => d.time === item.time) as any)?.[
              graphDatakey[value as keyof typeof graphDatakey]
            ] || 0;
          return acc;
        },
        {} as Record<string, number>
      ),
    }))
    .slice(-30);

  return (
    <Box
      style={{
        height: 350,
        backgroundColor: 'white',
        borderRadius: '40px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: 23,
          left: 25,
        }}
      >
        <Select
          placeholder="API Requests"
          value={value}
          onChange={(val) => val && setValue(val)}
          defaultValue="API Requests"
          data={options}
          maw={180}
          mah={32}
          variant="filled"
        />
      </Box>

      <Flex
        style={{
          position: 'absolute',
          top: 23,
          right: 25,
        }}
        direction="column"
        gap={8}
      >
        <Title order={3} size="sm">
          Servers:
        </Title>
        <Flex direction="column" align="flex-start" gap={6} miw={120}>
          {elements?.map((item, index) => (
            <Flex key={index} ml={1} align="center" gap={8}>
              <Box
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: colorsList[(index * 2 + 3) % totalColors][1][5] || '#000',
                  borderRadius: '50%',
                }}
              />
              <Text size="xs" c="dimmed">
                {getServerName(item.serverId)}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <AreaChart
        data={graphData}
        h={270}
        dataKey="time"
        withXAxis={false}
        withYAxis={false}
        // withLegend
        legendProps={{
          verticalAlign: 'top',
        }}
        series={elements?.map((item, index) => ({
          name: getServerName(item.serverId),
          color: colorsList[(index * 2 + 3) % totalColors][1][5] || '#000',
        }))}
        gridColor="transparent"
        curveType="bump"
        withDots={false}
        tooltipAnimationDuration={200}
        tooltipProps={{}}
      />
    </Box>
  );
}
