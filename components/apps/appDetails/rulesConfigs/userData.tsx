/* eslint-disable react/jsx-curly-brace-presence */

import { useEffect, useState } from 'react';

import { Button, Flex, Group, NumberInput, Select, Text } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';

const OutputCode = `
{
  "admin": {
      "firstName": "John",
      "lastName": "Doe",
      "more": "...",
    },
  "alice": {
      "firstName": "Alice",
      "lastName": "Smith",
      "more": "...",
    },
  "bob": {
      "firstName": "Bob",
      "lastName": "Brown",
      "more": "...",
    }
}
`;

function convertInterval(interval: number, unit: string): number {
  switch (unit) {
    case 'Seconds':
      return interval;
    case 'Minutes':
      return interval / 60;
    case 'Hours':
      return interval / 3600;
    default:
      return interval;
  }
}

function getUnitFromInterval(interval: number): string {
  if (interval % 3600 === 0) return 'Hours';
  if (interval % 60 === 0) return 'Minutes';
  return 'Seconds';
}

export default function UserData({ configData }: { configData: SecurityConfiguration[] }) {
  const [interval, setInterval] = useState<string | number>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('Seconds');
  const [filteredData, setFilteredData] = useState<SecurityConfiguration | null>(null);

  useEffect(() => {
    const successFlowData = configData.find((config) => config.configType === 'USER_DATA');
    setFilteredData(successFlowData || null);

    if (successFlowData?.rules?.refreshInterval) {
      const unit = getUnitFromInterval(successFlowData.rules.refreshInterval);
      const convertedInterval = convertInterval(successFlowData.rules.refreshInterval, unit);
      setInterval(convertedInterval);
      setSelectedUnit(unit);
    }
  }, [JSON.stringify(configData)]);

  const RequestHeadersCode =
    JSON.stringify(filteredData?.rules?.headers, null, 2) ||
    `
{}
`;
  const EndpointsCode =
    JSON.stringify(filteredData?.rules?.endpoint, null, 2) ||
    `
{}
  `;

  const handleUnitChange = (value: string) => {
    const convertedInterval = convertInterval(Number(interval), value);
    setInterval(convertedInterval);
    setSelectedUnit(value);
  };
  return (
    <Flex
      mb={45}
      maw={1000}
      direction="column"
      style={{
        backgroundColor: 'white',

        borderRadius: '22px',
      }}
    >
      <Text pt={24} pl={24} fw={700} size="lg" c="#3C3C3C">
        User Data
      </Text>

      {/* first  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Endpoints
        </Text>
        <CodeHighlight
          mah={110}
          w={950}
          mt={10}
          p={24}
          bg="#F4F4F4"
          style={{
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
          }}
          withCopyButton={false}
          code={EndpointsCode}
          language="tsx"
          contentEditable
        />
      </Flex>

      {/* second  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Refresh Interval
        </Text>
        <Flex mt={10} direction="row" w={200} justify="space-between">
          <NumberInput
            variant="filled"
            placeholder="150"
            allowNegative={false}
            allowDecimal={false}
            // ml={23}
            value={interval}
            onChange={setInterval}
            maw={80}
          />
          <Select
            placeholder="Minutes"
            value={selectedUnit}
            onChange={handleUnitChange}
            ml={5}
            fw="500"
            size="sm"
            data={['Seconds', ' Minutes', 'Hours']}
            styles={() => ({
              input: {
                backgroundColor: '#F4F4F4',
                borderRadius: '31px',
                // color: '#D57575',
              },
            })}
          />
        </Flex>
      </Flex>

      {/* third  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Request Headers
        </Text>
        <CodeHighlight
          mah={110}
          w={950}
          mt={10}
          p={24}
          bg="#F4F4F4"
          style={{
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
          }}
          withCopyButton={false}
          code={RequestHeadersCode}
          language="tsx"
          contentEditable
        />
      </Flex>
      {/* fourth  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Output Should be in format:
        </Text>
        <CodeHighlight
          mah={450}
          w={950}
          mt={10}
          p={24}
          bg="#F4F4F4"
          style={{
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            opacity: '70%',
          }}
          withCopyButton={false}
          code={OutputCode}
          language="tsx"
          contentEditable={false}
        />
      </Flex>

      {/* Button */}

      <Flex direction="row" ml={24} align="center" mb={24} mt={24}>
        <Group>
          <Button fw={500} size="sm" bg="#246EFF">
            Save
          </Button>
          <Button variant="light" c="#444444" fw={500} size="sm">
            Discard
          </Button>
        </Group>
      </Flex>
    </Flex>
  );
}
