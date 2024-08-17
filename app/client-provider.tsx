'use client';

import { Flex, Grid } from '@mantine/core';
import { NavbarNested } from '@/components/NavbarNested';

function ClientProvider({ children }: { children: any }) {
  return (
    <Grid>
      <Grid.Col span="content">
        <NavbarNested />
      </Grid.Col>
      <Grid.Col span="auto">
        <Flex direction="column">{children}</Flex>
      </Grid.Col>
    </Grid>
  );
}

export default ClientProvider;
