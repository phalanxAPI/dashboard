import { toTitleCase } from '@/utils';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { AreaChart } from '@mantine/charts';
import { Box, Select, Skeleton, Text, useMantineTheme } from '@mantine/core';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import useSWR from 'swr';

const getServerName = (serverId: string) => {
  return toTitleCase(serverId.split('-').join(' '));
};

export default function ApiStatusChart() {
  const theme = useMantineTheme();
  const { colors } = theme;
  const colorsList = Object.entries(colors);
  const totalColors = colorsList.length;

  const [value, setValue] = useState('api-info-graph?requestType=INCOMING');

  const options = [
    { value: 'api-info-graph?requestType=INCOMING', label: 'Incoming Requests' },
    { value: 'api-info-graph?requestType=OUTGOING', label: 'Outgoing Requests' },
    { value: 'system-info/cpu-usage', label: 'Cpu Usage' },
    { value: 'system-info/memory-usage', label: 'Memory Usage' },
    { value: 'system-info/disk-io?READ', label: 'Disk IO' },
    { value: 'system-info/disk-io?WRITE', label: 'Disk IO' },
    { value: 'system-info/network-stats', label: 'Network Stats' },
  ];

  const graphDatakey = {
    'system-info/cpu-usage': 'avgCpuLoad',
    'system-info/memory-usage': 'avgMemUsagePercent',
    'system-info/disk-io?READ': 'avgDiskRead',
    'system-info/disk-io?WRITE': 'avgDiskWrite',
    'system-info/network-stats': 'networkStats',
    'api-info-graph?requestType=INCOMING': 'count',
    'api-info-graph?requestType=OUTGOING': 'count',
  };

  const biaxialData = [
    { name: 'api1', server1: 4000, server2: 2400, server3: (4000 + 2400) / 2 },
    { name: 'api2', server1: 3000, server2: 1398, server3: (3000 + 1398) / 2 },
    { name: 'api3', server1: 2000, server2: 9800, server3: (2000 + 9800) / 2 },
    { name: 'api4', server1: 2780, server2: 3908, server3: (2780 + 3908) / 2 },
    { name: 'api5', server1: 1890, server2: 4800, server3: (1890 + 4800) / 2 },
    { name: 'api6', server1: 2390, server2: 3800, server3: (2390 + 3800) / 2 },
    { name: 'api7', server1: 3490, server2: 4300, server3: (3490 + 4300) / 2 },
  ];

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
          appId: '66cdff10e4453dc3b625b1c3',
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
      time: item.time,
      ...elements.reduce(
        (acc, curr) => {
          acc[getServerName(curr.serverId)] =
            (curr.data.find((d) => d.time === item.time) as any)?.[graphDatakey[value]] || 0;
          return acc;
        },
        {} as Record<string, number>
      ),
    }))
    .slice(-30, -10);

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
      <AreaChart
        data={graphData}
        h={270}
        dataKey="time"
        withXAxis={false}
        withYAxis={false}
        withLegend
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
