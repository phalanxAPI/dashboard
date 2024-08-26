import { Grid } from '@mantine/core';
import StatusOverview from './StatusOverview';
import ApiStatusChart from './ApiStatusChart';
import IssueDiscoveryChart from './issueDiscoveryChart';
import ServerStates from './serverStates';

export default function StatsGrid() {
  return (
    <Grid mt="xl" gutter="md" mr="xl" mb="xl">
      <Grid.Col span={{ base: 12, xs: 8 }} style={{ minHeight: '350px' }}>
        <ApiStatusChart />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }} style={{ minHeight: '350px' }}>
        <StatusOverview />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }} style={{ minHeight: '350px' }}>
        <IssueDiscoveryChart />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 8 }} style={{ minHeight: '350px' }}>
        <ServerStates />
      </Grid.Col>
    </Grid>
  );
}
