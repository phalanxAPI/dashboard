/* eslint-disable react/jsx-curly-brace-presence */

import { Button, Flex, Group, Text } from '@mantine/core';

import { CodeHighlight } from '@mantine/code-highlight';

export default function BaseURL({ baseUrl, appId }: { baseUrl: string; appId: string }) {
  const BaseUrlCode = baseUrl || '{}';

  return (
    <Flex
      mah={590}
      mb={45}
      mt={27}
      maw={1000}
      direction="column"
      style={{
        backgroundColor: 'white',

        borderRadius: '22px',
      }}
    >
      <Text pt={24} pl={24} fw={700} size="lg" c="#3C3C3C">
        Base URL
      </Text>
      {/* first  */}
      <CodeHighlight
        mah={110}
        w={950}
        mt={10}
        ml={24}
        mb={25}
        p={24}
        bg="#F4F4F4"
        style={{
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
        }}
        withCopyButton={false}
        code={BaseUrlCode}
        language="tsx"
        contentEditable
      />
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
