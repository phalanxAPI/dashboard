import { Flex, Pagination, Skeleton, Table, Text } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

import { AxiosResponse } from 'axios';
import { monoFont } from '@/app/fonts';
import { Scan } from '@/arsenal/types/scan';
import { useActiveApp } from '@/store/activeApp.store';
import { PaginatedData } from '@/types/pagination';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';

export function ScansDataTable() {
  const router = useRouter();
  const { activeAppId } = useActiveApp();

  const handleRowClick = (endpoint: string) => {
    router.push(`/scans/${endpoint}`);
  };
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useSWR<
    AxiosResponse<PaginatedData<(Scan & { _id: string })[]>>
  >(
    () => [
      `${BASE_URL}/scans`,
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

  const elements = data?.data.data || [];

  const rows =
    elements.length > 0 ? (
      elements.map((element, index) => {
        const scanDate = new Date(element.scanDate);
        const scanTime = scanDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract time

        return (
          <Table.Tr key={index} className={monoFont.className} c="dimmed">
            <Table.Td style={{ color: '#E55708' }}>{element.status}</Table.Td>
            <Table.Td>{scanDate.toLocaleDateString()}</Table.Td>
            <Table.Td>{scanTime}</Table.Td>
            <Table.Td>
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
        <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
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
            <Table.Th>Status</Table.Th>
            <Table.Th>Scan Date</Table.Th>
            <Table.Th>Time</Table.Th>
            <Table.Th>Details</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Flex align="center" justify="center">
        <Pagination
          total={data?.data?.meta?.totalPages || 1}
          onChange={setCurrentPage}
          value={currentPage}
        />
      </Flex>
    </Flex>
  );
}
