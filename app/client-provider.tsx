'use client';

import { Flex, Grid } from '@mantine/core';
import { NavbarNested } from '@/components/NavbarNested';
import { primaryFont } from './fonts';

function ClientProvider({ children }: { children: any }) {
  return (
    <Grid>
      <Grid.Col span="content" style={{ paddingRight: 0 }} className={primaryFont.className}>
        <NavbarNested />
      </Grid.Col>
      <Grid.Col
        span="auto"
        style={{ backgroundColor: '#f5f4f5' }}
        className={primaryFont.className}
      >
        <Flex direction="column">{children}</Flex>
      </Grid.Col>
    </Grid>
  );
}

export default ClientProvider;
