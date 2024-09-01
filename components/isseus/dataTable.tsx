import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Table, Pagination, Badge, Skeleton, Text, Flex } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { monoFont } from '@/app/fonts';
import { BASE_URL } from '@/utils/constants';
import { PaginatedData } from '@/types/pagination';
import { Issue } from '@/arsenal/types/issue';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { useActiveApp } from '@/store/activeApp.store';

export function IssuesDataTable() {
  const router = useRouter();
  const { activeAppId } = useActiveApp();

  const [currentPage, setCurrentPage] = useState(1);

  const handleRowClick = (endpoint: string) => {
    router.push(`/issues/${endpoint}`);
  };
  const { data, error, isLoading } = useSWR<
    AxiosResponse<PaginatedData<(Issue & { _id: string })[]>>
  >(
    () => [
      `${BASE_URL}/issue`,
      'get',
      {
        params: {
          appId: activeAppId,
          perPage: 10,
          page: currentPage,
        },
      },
    ],
    genericAPIFetcher
  );

  if (isLoading) {
    return <Skeleton mah={636} mt={27} height={200} radius="xl" maw={1024} />;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  // Ensure that elements are always an array
  const elements = data?.data.data || [];

  const rows =
    elements.length > 0 ? (
      elements.map((element, index) => {
        let bgColor;

        switch (element.severity) {
          case 'HIGH':
            bgColor = '#F77272';
            break;
          case 'LOW':
            bgColor = '#FFDF6C';
            break;
          default:
            bgColor = '#ffffff';
        }

        return (
          <Table.Tr key={index} className={monoFont.className} c="dimmed">
            <Table.Td fw={700}>
              <Badge color={bgColor}>{element.severity}</Badge>
            </Table.Td>
            <Table.Td fw={400}>{element.title}</Table.Td>
            <Table.Td style={{ color: '#E55708' }}>{element.status}</Table.Td>
            <Table.Td>{new Date(element.raisedAt).toLocaleDateString()}</Table.Td>
            <Table.Td fw={500}>
              <IconExternalLink
                style={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(element._id)}
              />
            </Table.Td>
          </Table.Tr>
        );
      })
    ) : (
      <Table.Tr className={monoFont.className} c="dimmed">
        <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
          No Data Available
        </Table.Td>
      </Table.Tr>
    );

  return (
    <Flex style={{ maxWidth: '1024px', marginBottom: '60px' }} direction="column">
      <Table
        mah={636}
        horizontalSpacing="xl"
        verticalSpacing="sm"
        bgcolor="#ffffff"
        mt={27}
        mb={26}
        style={{
          borderRadius: 22,
          fontSize: 14,
        }}
      >
        <Table.Thead>
          <Table.Tr style={{ color: '#495057' }}>
            <Table.Th>Severity</Table.Th>
            <Table.Th>Issue</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Raised At</Table.Th>
            <Table.Th>Endpoint</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Flex align="center" justify="center">
        <Pagination
          total={data?.data?.metadata?.totalPages || 1}
          onChange={setCurrentPage}
          value={currentPage}
        />
      </Flex>
    </Flex>
  );
}
