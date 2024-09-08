'use client';

import { Flex, Grid } from '@mantine/core';
import { NavbarNested } from '@/components/NavbarNested';
import { primaryFont } from './fonts';

function ClientProvider({ children }: { children: any }) {
  return (
    <Grid style={{ height: '100vh', overflowX: 'hidden', width: '100%' }}>
      <Grid.Col
        span="content"
        style={{ paddingRight: 0, overflow: 'hidden' }}
        className={primaryFont.className}
      >
        <NavbarNested />
      </Grid.Col>
      <Grid.Col
        bg="#f5f4f5"
        span="auto"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'auto',
        }}
        className={primaryFont.className}
        p={0}
      >
        <Flex direction="column">{children}</Flex>
      </Grid.Col>
    </Grid>
  );
}

export default ClientProvider;
