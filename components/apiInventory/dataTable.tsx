import { Checkbox, Table, Pagination, Badge } from '@mantine/core';

import { monoFont } from '@/app/fonts';

export function APIInventoryDataTable() {
  const elements = [
    {
      type: 'GET',
      endpoint: '/api/v1/users',
      hits: 1500,
      verified: true,
      depreciated: false,
      added: '2024-02-01',
    },
    {
      type: 'POST',
      endpoint: '/api/v1/auth/login',
      hits: 3200,
      verified: true,
      depreciated: false,
      added: '2023-11-12',
    },
    {
      type: 'PUT',
      endpoint: '/api/v1/products/update',
      hits: 1100,
      verified: true,
      depreciated: false,
      added: '2024-05-23',
    },
    {
      type: 'DELETE',
      endpoint: '/api/v1/orders/remove',
      hits: 760,
      verified: false,
      depreciated: true,
      added: '2022-09-15',
    },
    {
      type: 'GET',
      endpoint: '/api/v1/categories',
      hits: 2900,
      verified: true,
      depreciated: false,
      added: '2023-01-07',
    },
    {
      type: 'POST',
      endpoint: '/api/v1/reviews/submit',
      hits: 450,
      verified: false,
      depreciated: false,
      added: '2024-03-18',
    },
    {
      type: 'GET',
      endpoint: '/api/v1/test/v1',
      hits: 800,
      verified: true,
      depreciated: false,
      added: '2024-07-01',
    },
    {
      type: 'PUT',
      endpoint: '/api/v1/user/profile/update',
      hits: 1300,
      verified: true,
      depreciated: false,
      added: '2023-12-02',
    },
    {
      type: 'DELETE',
      endpoint: '/api/v1/posts/delete',
      hits: 200,
      verified: false,
      depreciated: true,
      added: '2021-06-25',
    },
    {
      type: 'GET',
      endpoint: '/api/v1/test/v1/status',
      hits: 980,
      verified: true,
      depreciated: false,
      added: '2024-08-10',
    },
  ];

  const rows = elements.map((element, index) => {
    let bgColor;

    switch (element.type) {
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
      <Table.Tr key={index} c="dimmed">
        <Table.Td className={monoFont.className} fw={700}>
          <Badge color={bgColor}> {element.type}</Badge>
        </Table.Td>
        <Table.Td className={monoFont.className} fw={400} style={{ fontSize: 14 }}>
          {element.endpoint}
        </Table.Td>
        <Table.Td fw={500} style={{ fontSize: 14 }}>
          {element.hits}
        </Table.Td>
        <Table.Td>
          <Checkbox
            checked
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
            checked={false}
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
          {element.added}
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <div style={{ maxWidth: '1024px', marginBottom: '60px' }}>
      <Table
        mah={636}
        horizontalSpacing="xl"
        verticalSpacing="md"
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
            <Table.Th>Type</Table.Th>
            <Table.Th>Endpoint</Table.Th>
            <Table.Th>Hits</Table.Th>
            <Table.Th>Verified</Table.Th>
            <Table.Th>depreciated</Table.Th>
            <Table.Th>Added</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Pagination total={12} style={{ display: 'flex', justifyContent: 'center' }} />
    </div>
  );
}
