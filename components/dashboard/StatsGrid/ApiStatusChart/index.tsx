import { Box } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { APIStatusSelector } from '../apiStatusSelector';

export default function ApiStatusChart() {
  const biaxialData = [
    { name: 'api1', server1: 4000, server2: 2400, server3: (4000 + 2400) / 2 },
    { name: 'api2', server1: 3000, server2: 1398, server3: (3000 + 1398) / 2 },
    { name: 'api3', server1: 2000, server2: 9800, server3: (2000 + 9800) / 2 },
    { name: 'api4', server1: 2780, server2: 3908, server3: (2780 + 3908) / 2 },
    { name: 'api5', server1: 1890, server2: 4800, server3: (1890 + 4800) / 2 },
    { name: 'api6', server1: 2390, server2: 3800, server3: (2390 + 3800) / 2 },
    { name: 'api7', server1: 3490, server2: 4300, server3: (3490 + 4300) / 2 },
  ];

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
        <APIStatusSelector />
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
