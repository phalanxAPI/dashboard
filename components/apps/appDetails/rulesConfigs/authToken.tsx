/* eslint-disable react/jsx-curly-brace-presence */

import { Button, Flex, Group, NumberInput, Select, Text } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';
import { useState } from 'react';

const EndpointsCode = `
https://testserver.com/internals/phalanx/tokens
`;
const RequestHeadersCode = `
{
  "Authorization": "Bearer {{SHARED_SECRET}}"
}
`;
const OutputCode = `
{
  "admin": "AUTH_TOKEN",
  "alice": "AUTH_TOKEN",
  "bob": "AUTH_TOKEN",
}
`;

export default function AuthTokens() {
  const [interval, setInterval] = useState<string | null>('');

  return (
    <Flex
      mah={780}
      mb={45}
      maw={1000}
      direction="column"
      style={{
        backgroundColor: 'white',

        borderRadius: '22px',
      }}
    >
      <Text pt={24} pl={24} fw={700} size="lg" c="#3C3C3C">
        Auth Tokens
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
            maw={80}
          />
          <Select
            placeholder="Minutes"
            value={interval}
            onChange={setInterval}
            ml={5}
            fw="500"
            size="sm"
            data={['Seconds', ' Minutes', 'Houres']}
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
          mah={160}
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
          code={OutputCode}
          language="tsx"
          contentEditable
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
