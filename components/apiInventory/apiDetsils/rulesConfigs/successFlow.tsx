/* eslint-disable react/jsx-curly-brace-presence */
import { Button, Flex, Group, Select, Text } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';
import { useState } from 'react';

const RequestHeadersCode = `
{
  "Authorization": "Bearer {{admin.token}}"
}
`;
const RequestParamsCode = `
{
  "id": "{{admin.id}}"
}
`;
const RequestBodyCode = `
{
  "name": "Test Property",
  "isAdmin": "true",
  "email": "{{regex{^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$}}"
}
`;
export default function SuccessFlow() {
  const [value, setValue] = useState<string | null>('');
  return (
    <Flex
      mah={738}
      mt={27}
      mb={45}
      maw={1000}
      direction="column"
      style={{
        backgroundColor: 'white',

        borderRadius: '22px',
      }}
    >
      <Text pt={24} pl={24} fw={700} size="lg" c="#3C3C3C">
        Success flow
      </Text>

      {/* first  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Request Headers
        </Text>

        <CodeHighlight
          h={110}
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

      {/* Second  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Request Params
        </Text>
        <CodeHighlight
          h={110}
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
          code={RequestParamsCode}
          language="tsx"
          contentEditable
        />
      </Flex>
      {/* Third  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25} mb={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Request Body
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
          code={RequestBodyCode}
          language="tsx"
          contentEditable
        />
      </Flex>
      {/* status code */}
      <Flex direction="row" ml={24} align="center" mb={25}>
        <Text size="sm" c="#6E6E6E" fw="500">
          Expected Response Code:
        </Text>

        <Select
          placeholder="Pick Response Code"
          value={value}
          onChange={setValue}
          ml={23}
          fw="500"
          size="sm"
          data={[
            '200 OK',
            '403 Forbidden',
            '401 Unauthorized',
            '413 Payload Too Large',
            '429 Too Many Requests',
          ]}
          maw={209}
          styles={() => ({
            input: {
              backgroundColor: '#F4F4F4',
              borderRadius: '31px',
              color: '#75D57F',
            },
          })}
        />
      </Flex>

      {/* Button */}

      <Flex direction="row" ml={24} align="center" mb={24}>
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
