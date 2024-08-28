import { Table, Pagination, Text, Flex } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IconExternalLink } from '@tabler/icons-react';
import { monoFont } from '@/app/fonts';

export function AppsDataTable() {
  const router = useRouter();
  const handleRowClick = (endpoint: string) => {
    // eslint-disable-next-line no-console
    router.push(`/apps/${endpoint}`);
    // console.log(`Row clicked for endpoint: ${endpoint}`);
  };
  const issuesData = [
    {
      name: 'Test Backend Server',
      active_servers: '10',
      hits: '500',
      configure: 'api/configure',
    },
    {
      name: 'UI Server',
      active_servers: '5',
      hits: '100',
      configure: 'api/configure',
    },
    {
      name: 'Primary Pod',
      active_servers: '4',
      hits: '80',
      configure: 'api/configure',
    },
    {
      name: 'Test Backend Server',
      active_servers: '10',
      hits: '500',
      configure: 'api/configure',
    },
  ];
  const rows = issuesData.map((element, index) => {
    let bgColor;

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
        <Table.Td fw={400}>{element.active_servers}</Table.Td>
        <Table.Td fw={500}>{element.hits}</Table.Td>

        <Table.Td fw={500}>
          <IconExternalLink style={{ cursor: 'pointer' }}></IconExternalLink>
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
          total={12}
          style={{
            position: 'absolute',
            bottom: '61px',
          }}
        />
      </Flex>
    </Flex>
  );
}
