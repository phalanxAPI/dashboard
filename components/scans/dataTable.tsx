import { Table, Pagination, Flex, Text, Skeleton } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { useState } from 'react';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { PaginatedData } from '@/types/pagination';
import { Scan } from '@/arsenal/types/scan';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { monoFont } from '@/app/fonts';

export function ScansDataTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useSWR<AxiosResponse<PaginatedData<Scan[]>>>(
    () => [
      `${BASE_URL}/scans`,
      'get',
      {
        params: {
          appId: '66cdff10e4453dc3b625b1c3',
          perPage: 2,
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
      elements.map((element, index) => (
        <Table.Tr key={index} className={monoFont.className} c="dimmed">
          <Table.Td style={{ color: '#E55708' }}>{element.status}</Table.Td>
          <Table.Td>{new Date(element.scanDate).toLocaleDateString()}</Table.Td>
          <Table.Td fw={500}>
            <IconExternalLink style={{ cursor: 'pointer' }} onClick={() => {}} />
          </Table.Td>
        </Table.Tr>
      ))
    ) : (
      <Table.Tr className={monoFont.className} c="dimmed">
        <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
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
            <Table.Th>Endpoint</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Flex align="center" justify="center">
        <Pagination
          total={data?.data?.meta.totalPages || 1}
          onChange={setCurrentPage}
          value={currentPage}
        />
      </Flex>
    </Flex>
  );
}
