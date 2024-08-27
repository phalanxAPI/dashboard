import { Table, Badge } from '@mantine/core';

import { monoFont } from '@/app/fonts';

export function TciketsDataTable() {
  const ticketsData = [
    {
      severity: 'HIGH',
      name: 'Broken Object Level Authorization',
      assignee: 'John Doe',
      status: 'Open',
      raised_at: '15/09/2024',
    },
    {
      severity: 'LOW',
      name: 'Missing Rate Limiting',
      assignee: 'Jane Smith',
      status: 'Open',
      raised_at: '22/06/2024',
    },
    {
      severity: 'HIGH',
      name: 'Sensitive Data Exposure',
      assignee: '-',
      status: 'Open',
      raised_at: '12/05/2024',
    },
    {
      severity: 'LOW',
      name: 'Deprecated Endpoint Usage',
      assignee: '-',
      status: 'Open',
      raised_at: '19/03/2024',
    },
    {
      severity: 'LOW',
      name: 'Improper Error Handling',
      assignee: 'Henry King',
      status: 'Open',
      raised_at: '11/07/2024',
    },
  ];
  const rows = ticketsData.map((element, index) => {
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
          <Badge color={bgColor}> {element.severity}</Badge>
        </Table.Td>
        <Table.Td fw={400}>{element.name}</Table.Td>
        <Table.Td fw={500}>{element.assignee}</Table.Td>
        <Table.Td style={{ color: '#E55708' }}>{element.status}</Table.Td>
        <Table.Td>{element.raised_at}</Table.Td>
      </Table.Tr>
    );
  });
  return (
    <div style={{ maxWidth: '1024px', marginBottom: '60px' }}>
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
            <Table.Th>Assignee</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Raised At</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {/* <Pagination total={12} style={{ display: 'flex', justifyContent: 'center' }} /> */}
    </div>
  );
}
