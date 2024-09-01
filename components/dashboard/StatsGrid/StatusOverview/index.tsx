import { Badge, Box, Flex, Skeleton, Text } from '@mantine/core';
import { IconAlertHexagon, IconShieldSearch, IconUnlink } from '@tabler/icons-react';

import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { monoFont, primaryFont } from '@/app/fonts';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { useActiveApp } from '@/store/activeApp.store';

export default function StatusOverview() {
  const { activeAppId } = useActiveApp();

  const { data, error, isLoading } = useSWR<
    AxiosResponse<{
      openIssues: number;
      lowSeverityIssues: number;
      highSeverityIssues: number;
    }>
  >(
    () => [
      `${BASE_URL}/issuecount`,
      'get',
      {
        params: {
          appId: activeAppId,
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

  const elements = data?.data;
  console.log('DataIssue', elements);
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
      {/* first badge */}
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
          <Flex
            h={65}
            w={65}
            ml={4}
            align="center"
            justify="center"
            bg="white"
            style={{
              borderRadius: '50%',
            }}
          >
            <IconUnlink color="#FCB90D" size="24px" />
          </Flex>

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text c="#FCB90D" size="xl" fw="bold" className={monoFont.className}>
              {elements?.openIssues}
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
          <Flex
            h={65}
            w={65}
            ml={4}
            align="center"
            justify="center"
            bg="white"
            style={{
              borderRadius: '50%',
            }}
          >
            <IconAlertHexagon color="#ED4216" size="24px" />
          </Flex>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text c="#ED4216" size="xl" fw="bold">
              {elements?.highSeverityIssues}
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
          <Flex
            h={65}
            w={65}
            ml={4}
            align="center"
            justify="center"
            bg="white"
            style={{
              borderRadius: '50%',
            }}
          >
            <IconShieldSearch color="#1BAF21" size="24px" />
          </Flex>

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text c="#1BAF21" size="xl" fw="bold">
              {elements?.lowSeverityIssues}
            </Text>
            <Text c="#656565" size="xs" fw="initial" className={primaryFont.className}>
              Low Severity
            </Text>
          </Box>
        </Box>
      </Badge>
    </Box>
  );
}
