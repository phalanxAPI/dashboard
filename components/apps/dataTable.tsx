import { Table, Pagination, Text, Flex } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IconExternalLink } from '@tabler/icons-react';
import { AxiosResponse } from 'axios';

import { useState } from 'react';
import useSWR from 'swr';
import { BASE_URL } from '@/utils/constants';
import { PaginatedData } from '@/types/pagination';
import { Application } from '@/arsenal/types/application';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { monoFont } from '@/app/fonts';

export function AppsDataTable() {
  const router = useRouter();
  const handleRowClick = (endpoint: string) => {
    // eslint-disable-next-line no-console
    router.push(`/apps/${endpoint}`);
    // console.log(`Row clicked for endpoint: ${endpoint}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  // Using SWR to fetch the data

  // eslint-disable-next-line no-spaced-func
  const { data, error } = useSWR<
    AxiosResponse<
      PaginatedData<
        (Application & {
          serverCount: number;
        })[]
      >
    >
  >(
    () => [
      `${BASE_URL}/applications`,
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
  // const issuesData = [
  //   {
  //     name: 'Test Backend Server',
  //     active_servers: '10',
  //     hits: '500',
  //     configure: 'api/configure',
  //   },
  //   {
  //     name: 'UI Server',
  //     active_servers: '5',
  //     hits: '100',
  //     configure: 'api/configure',
  //   },
  //   {
  //     name: 'Primary Pod',
  //     active_servers: '4',
  //     hits: '80',
  //     configure: 'api/configure',
  //   },
  //   {
  //     name: 'Test Backend Server',
  //     active_servers: '10',
  //     hits: '500',
  //     configure: 'api/configure',
  //   },
  // ];

  if (!data && !error) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  // Ensure that elements is always an array
  const elements = data?.data.data || [];
  const rows = elements.map((element, index) => {
    let bgColor;
    const handleIconClick = () => {
      window.location.href = `${element.baseUrl}`;
    };
    return (
      <Table.Tr
        key={index}
        className={monoFont.className}
        c="dimmed"
        style={{ cursor: 'pointer' }}
        onClick={() => handleRowClick(`api_${index}`)}
      >
        <Table.Td fw={700}>
          <Text color={bgColor}> {element.name}</Text>
        </Table.Td>
        <Table.Td fw={400}>{element.serverCount}</Table.Td>
        <Table.Td fw={500}>{0}</Table.Td>

        <Table.Td fw={500}>
          <IconExternalLink style={{ cursor: 'pointer' }} onClick={handleIconClick} />
        </Table.Td>
      </Table.Tr>
    );
  });
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
            <Table.Th>Configure</Table.Th>
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
