/* eslint-disable react/jsx-curly-brace-presence */

import { Button, Flex, Group, Text } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';

const EndpointsCode = `
https://testserver.com/internals/phalanx/user-data
`;
const RequestHeadersCode = `
{
  "Authorization": "Bearer {{SHARED_SECRET}}"
}
`;
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

export default function UserData() {
  return (
    <Flex
      mah={950}
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
