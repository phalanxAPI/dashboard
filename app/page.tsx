'use client';

import { IconAlertHexagon, IconShieldSearch, IconUnlink } from '@tabler/icons-react';
import { Badge, Box, Grid, Text } from '@mantine/core';
import { PageLayout } from '@/components/common/genericLayout/index';

import { GenericSelector } from '@/components/common/genericSelector';
import { monoFont, primaryFont } from './fonts';

export default function Page() {
  return (
    <PageLayout pageTitle="Dashboard">
      <GenericSelector />
      {/* <GenericDataTable /> */}
      <Grid mt="xl" gutter="md">
        <Grid.Col span={7.5} style={{ minHeight: '391px' }}>
          <Box
            style={{
              height: '350px',
              backgroundColor: 'white',
              borderRadius: '40px',
            }}
          >
            {/* Content goes here */}
          </Box>
        </Grid.Col>
        <Grid.Col span={3.5}>
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
            <Badge
              color="#FEF1CF"
              mb="lg"
              style={{
                height: '93px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  gap: '16px',
                }}
              >
                <Badge color="white" size="65px" circle>
                  <IconUnlink color="#FCB90D" size="24px" />
                </Badge>

                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Text c="#FCB90D" size="xl" fw="bold" className={monoFont.className}>
                    84
                  </Text>
                  <Text c="#656565" size="xs" fw="initial" className={primaryFont.className}>
                    Open Issues
                  </Text>
                </Box>
              </Box>
            </Badge>

            {/* 2nd badge */}
            <Badge
              color="#FCE5DE"
              mb="lg"
              style={{
                height: '93px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  gap: '16px',
                }}
              >
                <Badge color="white" size="65px" circle>
                  <IconAlertHexagon color="#ED4216" size="24px" />
                </Badge>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Text c="#ED4216" size="xl" fw="bold">
                    13
                  </Text>
                  <Text c="#656565" size="xs" fw="initial" className={primaryFont.className}>
                    High Severity
                  </Text>
                </Box>
              </Box>
            </Badge>

            {/* 3rd badge */}
            <Badge
              color="#DFFCEE"
              mb="xl"
              style={{
                height: '93px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  gap: '16px',
                }}
              >
                <Badge color="white" size="65px" circle>
                  <IconShieldSearch color="#1BAF21" size="24px" />
                </Badge>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Text c="#1BAF21" size="xl" fw="bold">
                    71
                  </Text>
                  <Text c="#656565" size="xs" fw="initial" className={primaryFont.className}>
                    Low Severity
                  </Text>
                </Box>
              </Box>
            </Badge>
          </Box>
        </Grid.Col>
      </Grid>
    </PageLayout>
  );
}
