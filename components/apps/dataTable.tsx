import { Table, Pagination, Text, Flex, Skeleton } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { AxiosResponse } from 'axios';
import { useState } from 'react';
import useSWR from 'swr';
import { BASE_URL } from '@/utils/constants';
import { PaginatedData } from '@/types/pagination';
import { Application } from '@/arsenal/types/application';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { monoFont } from '@/app/fonts';
import { useActiveApp } from '@/store/activeApp.store';

export function AppsDataTable() {
  const router = useRouter();
  const { activeAppId } = useActiveApp();

  const handleRowClick = (endpoint: string) => {
    router.push(`/apps/${endpoint}`);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useSWR<
    AxiosResponse<
      PaginatedData<(Application & { serverCount: number; hits: number; _id: string })[]>
    >
  >(
    () => [
      `${BASE_URL}/applications`,
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
    return <Skeleton height={200} radius="xl" maw={1024} />;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  const elements = data?.data.data || [];

  const rows =
    elements.length > 0 ? (
      elements.map((element, index) => (
        <Table.Tr
          key={index}
          className={monoFont.className}
          c="dimmed"
          style={{ cursor: 'pointer' }}
          onClick={() => handleRowClick(element._id)}
        >
          <Table.Td fw={700}>
            <Text>{element.name}</Text>
          </Table.Td>
          <Table.Td fw={400}>{element.serverCount}</Table.Td>
          <Table.Td fw={500}>{element.hits}</Table.Td>
        </Table.Tr>
      ))
    ) : (
      <Table.Tr className={monoFont.className} c="dimmed">
        <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
          No Data Available
        </Table.Td>
      </Table.Tr>
    );

  return (
    <Flex
      style={{
        maxWidth: '1024px',
        marginBottom: '60px',
      }}
      direction="column"
    >
      <Table
        mah={636}
        horizontalSpacing="xl"
        verticalSpacing="sm"
        bgcolor="#ffffff"
        mb={26}
        style={{
          borderRadius: 22,
          fontSize: 14,
        }}
      >
        <Table.Thead>
          <Table.Tr style={{ color: '#495057' }}>
            <Table.Th>Name</Table.Th>
            <Table.Th>Active Servers</Table.Th>
            <Table.Th>Hits</Table.Th>
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
