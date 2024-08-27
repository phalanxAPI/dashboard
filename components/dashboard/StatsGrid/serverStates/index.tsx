import { Box, Flex, Grid, RingProgress, Text } from '@mantine/core';

export default function ServerStates() {
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
              sections={[{ value: 46, color: '#0066FF' }]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="xl">
                  46%
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
              sections={[{ value: 74, color: '#0066FF' }]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="xl">
                  74%
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
                  5GB/s
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
              sections={[{ value: 98, color: '#0066FF' }]}
              label={
                <Text fw="bold" c="#151522" ta="center" size="xl">
                  98%
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
