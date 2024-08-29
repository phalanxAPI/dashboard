import { Box, ComboboxItem, Text } from '@mantine/core';
import { useState } from 'react';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';

import { AreaChart } from '@mantine/charts';
import { APIStatusSelector } from '../apiStatusSelector';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';

export default function ApiStatusChart() {
  const [value, setValue] = useState('system-info/cpu-usage');

  const options = [
    { value: 'system-info/cpu-usage', label: 'Cpu Usage' },
    { value: 'system-info/memory-usage', label: 'Memory Usage' },
    { value: 'system-info/disk-io?READ', label: 'Disk IO' },
    { value: 'system-info/disk-io?WRITE', label: 'Disk IO' },
    { value: 'system-info/network-stats', label: 'Network Stats' },
    { value: 'api-info-graph?requestType=INCOMING', label: 'Incoming Requests' },
    { value: 'api-info-graph?requestType=OUTGOING', label: 'Outgoing Requests' },
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

  const { data, error } = useSWR<
    AxiosResponse<
      {
        time: Date;
      } & Record<string, number>
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

  if (!data && !error) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  const elements = data?.data;
  console.log(elements);
  return (
    <Box
      style={{
        height: '350px',
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
          top: '23px',
          left: '25px',
        }}
      >
        <APIStatusSelector value={value} setValue={setValue} data={options} />
      </Box>
      <AreaChart
        data={biaxialData}
        h={270}
        dataKey="name"
        withXAxis={false}
        withYAxis={false}
        withLegend
        legendProps={{
          verticalAlign: 'top',
        }}
        series={[
          { name: 'server1', color: '#F03E3E' },
          { name: 'server2', color: '#4263EB', yAxisId: 'right' },
          { name: 'server3', color: '#4DE589', yAxisId: 'right' },
        ]}
        gridColor="transparent"
      />
    </Box>
  );
}
