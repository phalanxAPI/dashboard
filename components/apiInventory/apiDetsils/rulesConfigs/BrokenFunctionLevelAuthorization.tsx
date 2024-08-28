/* eslint-disable react/jsx-curly-brace-presence */
import { Button, Flex, Group, Select, Switch, Text } from '@mantine/core';

import { CodeHighlight } from '@mantine/code-highlight';
import { useState } from 'react';

const RequestHeadersCode = `
{
  "Authorization": "Bearer {{user.token}}"
}
`;
export default function BrokenFunctionLevelAuthorization() {
  const [value, setValue] = useState<string | null>('');

  return (
    <Flex
      mah={590}
      mb={45}
      maw={1000}
      direction="column"
      style={{
        backgroundColor: 'white',

        borderRadius: '22px',
      }}
    >
      <Text pt={24} pl={24} fw={700} size="lg" c="#3C3C3C">
        Broken Function Level Authorization
      </Text>

      {/* toggle */}
      <Flex direction="row" mt={25} ml={24} align="center">
        <Text fw={500} size="sm" c="#6E6E6E">
          Enabled
        </Text>
        <Switch defaultChecked ml={18} color="#246EFF" />
      </Flex>

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

      {/* status code */}
      <Flex direction="row" ml={24} align="center" mb={25} mt={25}>
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
              color: '#D57575',
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
