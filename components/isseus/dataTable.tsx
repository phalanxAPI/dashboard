import { Table, Pagination, Badge } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { monoFont } from '@/app/fonts';

export function IssuesDataTable() {
  const issuesData = [
    {
      severity: 'HIGH',
      name: 'Broken Object Level Authorization',
      assignee: 'John Doe',
      status: 'Open',
      raised_at: '15/09/2024',
      endpoint: '/api/v1/users',
    },
    {
      severity: 'LOW',
      name: 'Missing Rate Limiting',
      assignee: 'Jane Smith',
      status: 'Open',
      raised_at: '22/06/2024',
      endpoint: '/api/v1/products/update',
    },
    {
      severity: 'HIGH',
      name: 'Sensitive Data Exposure',
      assignee: '-',
      status: 'Open',
      raised_at: '12/05/2024',
      endpoint: '/api/v1/auth/login',
    },
    {
      severity: 'LOW',
      name: 'Deprecated Endpoint Usage',
      assignee: '-',
      status: 'Open',
      raised_at: '19/03/2024',
      endpoint: '/api/v1/orders/remove',
    },
    {
      severity: 'HIGH',
      name: 'Broken Authentication',
      assignee: '-',
      status: 'Open',
      raised_at: '09/04/2024',
      endpoint: '/api/v1/reviews/submit',
    },
    {
      severity: 'LOW',
      name: 'Exposed Sensitive Information',
      assignee: 'David Black',
      status: 'Open',
      raised_at: '14/12/2023',
      endpoint: '/api/v1/test/v1',
    },
    {
      severity: 'HIGH',
      name: 'Insecure Direct Object References',
      assignee: 'Eva Green',
      status: 'Open',
      raised_at: '03/07/2024',
      endpoint: '/api/v1/user/profile/update',
    },
    {
      severity: 'LOW',
      name: 'Improper Input Validation',
      assignee: 'Frank Harris',
      status: 'Open',
      raised_at: '25/01/2024',
      endpoint: '/api/v1/categories',
    },
    {
      severity: 'HIGH',
      name: 'Cross-Site Scripting (XSS)',
      assignee: 'Grace Lee',
      status: 'Open',
      raised_at: '30/08/2024',
      endpoint: '/api/v1/posts/delete',
    },
    {
      severity: 'LOW',
      name: 'Improper Error Handling',
      assignee: 'Henry King',
      status: 'Open',
      raised_at: '11/07/2024',
      endpoint: '/api/v1/test/v1/status',
    },
  ];
  const rows = issuesData.map((element, index) => {
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
        <Table.Td fw={500}>
          <IconExternalLink style={{ cursor: 'pointer' }}></IconExternalLink>
        </Table.Td>
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
            <Table.Th>Endpoint</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Pagination total={12} style={{ display: 'flex', justifyContent: 'center' }} />
    </div>
  );
}
