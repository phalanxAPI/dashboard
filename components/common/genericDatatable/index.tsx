import { Table } from '@mantine/core';

import { monoFont } from '@/app/fonts';

export function GenericDataTable() {
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

  const rows = elements.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td
        px={12}
        py={15}
        className={monoFont.className}
        fw={700}
        style={{
          fontSize: 14,
          minWidth: 70,
          maxWidth: 50,
          height: 25,
          borderRadius: 15,
          display: 'flex',
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {element.type}
      </Table.Td>
      <Table.Td px={12} py={15} className={monoFont.className} fw={400} style={{ fontSize: 14 }}>
        {element.endpoint}
      </Table.Td>
      <Table.Td px={12} py={15} fw={500} style={{ fontSize: 14 }}>
        {element.hits}
      </Table.Td>
      <Table.Td px={12} py={15}>
        {element.verified ? 'Yes' : 'No'}
      </Table.Td>
      <Table.Td px={12} py={15}>
        {element.depreciated ? 'Yes' : 'No'}
      </Table.Td>
      <Table.Td px={12} py={15} fw={500} style={{ fontSize: 14 }}>
        {element.added}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table
      maw={1024}
      mah={636}
      bgcolor="#ffffff"
      mt={27}
      style={{ borderRadius: 22, fontSize: 14 }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th px={12} py={15}>
            Type
          </Table.Th>
          <Table.Th px={12} py={15}>
            Endpoint
          </Table.Th>
          <Table.Th px={12} py={15}>
            Hits
          </Table.Th>
          <Table.Th px={12} py={15}>
            Verified
          </Table.Th>
          <Table.Th px={12} py={15}>
            Depreciated
          </Table.Th>
          <Table.Th px={12} py={15}>
            Added
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
