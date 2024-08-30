import { Table, Badge } from '@mantine/core';
import { monoFont } from '@/app/fonts';
import { Issue } from '@/arsenal/types/issue';

export function TciketsDataTable({ issueTicketsData }: { issueTicketsData: Issue[] }) {
  const rows =
    issueTicketsData.length > 0 ? (
      issueTicketsData.map((element, index) => {
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
              <Badge color={bgColor}>{element.severity}</Badge>
            </Table.Td>
            <Table.Td fw={400}>{element.title}</Table.Td>
            {/* <Table.Td fw={500}>{element.assignee}</Table.Td> */}
            <Table.Td style={{ color: '#E55708' }}>{element.status}</Table.Td>
            <Table.Td>{new Date(element.raisedAt).toLocaleDateString()}</Table.Td>
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
            {/* <Table.Th>Assignee</Table.Th> */}
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
