import { Box, Grid, Text } from '@mantine/core';

export default function ServerStates() {
  return (
    <Box
      pt="xl"
      pr="lg"
      pl="lg"
      style={{
        height: '350px',
        backgroundColor: 'white',
        borderRadius: '40px',
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
      }}
    >
      <Text fw="600" style={{ fontSize: '22px' }} c="#0D1427">
        Server Stats
      </Text>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>1</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>2</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>3</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>4</Grid.Col>
      </Grid>
    </Box>
  );
}
