import { Checkbox, Table, Pagination, Badge, Text, Flex, Skeleton } from '@mantine/core';
import useSWR from 'swr';
import { useState } from 'react';
import { AxiosResponse } from 'axios';

import { useRouter } from 'next/navigation';
import { monoFont } from '@/app/fonts';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { BASE_URL } from '@/utils/constants';
import { API } from '@/arsenal/types/api';
import { PaginatedData } from '@/types/pagination';
import { useActiveApp } from '@/store/activeApp.store';

export function APIInventoryDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { activeAppId } = useActiveApp();

  const { data, error, isLoading } = useSWR<AxiosResponse<PaginatedData<API[]>>>(
    () => [
      `${BASE_URL}/api-info`,
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

  const handleRowClick = (endpoint: string) => {
    router.push(`/apiInventory/${endpoint}`);
  };

  if (isLoading) {
    return <Skeleton mah={636} mt={27} height={200} radius="xl" maw={1024} />;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  const elements = data?.data.data || [];

  const rows =
    elements.length > 0 ? (
      elements.map((element: any) => {
        let bgColor;

        switch (element.method) {
          case 'POST':
            bgColor = '#8BEA95';
            break;
          case 'GET':
            bgColor = '#669EEB';
            break;
          case 'DELETE':
            bgColor = '#FFB3B3';
            break;
          case 'PUT':
            bgColor = '#F9E26A';
            break;
          default:
            bgColor = '#ffffff';
        }

        return (
          <Table.Tr
            key={element._id}
            c="dimmed"
            onClick={() => handleRowClick(element._id)}
            style={{ cursor: 'pointer' }}
          >
            <Table.Td className={monoFont.className} fw={700}>
              <Badge color={bgColor}>{element.method}</Badge>
            </Table.Td>
            <Table.Td className={monoFont.className} fw={400} style={{ fontSize: 14 }}>
              {element.endpoint}
            </Table.Td>
            <Table.Td fw={500} style={{ fontSize: 14 }}>
              {element.hits}
            </Table.Td>
            <Table.Td>
              <Checkbox
                checked={element.isVerified}
                styles={() => ({
                  input: {
                    borderRadius: '100%',
                    width: 20,
                    height: 20,
                  },
                })}
              />
            </Table.Td>
            <Table.Td>
              <Checkbox
                checked={element.isDeprecated}
                styles={() => ({
                  input: {
                    borderRadius: '100%',
                    width: 20,
                    height: 20,
                  },
                })}
              />
            </Table.Td>
            <Table.Td fw={500} style={{ fontSize: 14 }}>
              {new Date(element.createdAt).toLocaleDateString()}
            </Table.Td>
          </Table.Tr>
        );
      })
    ) : (
      <Table.Tr className={monoFont.className} c="dimmed">
        <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
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
        mt={27}
        style={{
          borderRadius: 22,
          fontSize: 14,
          maxWidth: '1024px',
          margin: '0 auto',
        }}
      >
        <Table.Thead>
          <Table.Tr style={{ color: '#495057' }}>
            <Table.Th>Type</Table.Th>
            <Table.Th>Endpoint</Table.Th>
            <Table.Th>Hits</Table.Th>
            <Table.Th>Verified</Table.Th>
            <Table.Th>Depreciated</Table.Th>
            <Table.Th>Added</Table.Th>
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
