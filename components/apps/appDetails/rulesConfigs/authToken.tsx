/* eslint-disable react/jsx-curly-brace-presence */

import { Button, Flex, Group, Popover, Select, Text } from '@mantine/core';

import { monoFont } from '@/app/fonts';

export default function AuthTokens() {
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
        <Flex
          mah={110}
          w={950}
          mt={10}
          p={24}
          bg="#F4F4F4"
          align="center"
          style={{
            borderRadius: '16px',
          }}
        >
          <Text className={monoFont.className}>
            https://testserver.com/internals/phalanx/tokens
          </Text>
        </Flex>
      </Flex>
      {/* second  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Refresh Interval
        </Text>
        <Flex mt={10} direction="row" w={180} justify="space-between">
          <Flex>
            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button bg="#F4F4F4" c="#282626" fw="500" size="sm" maw={80} h={35}>
                  20 MB
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Select
                  placeholder="Pick value"
                  data={['20MB', '40MB', '60MB', '80MB', '100MB']}
                  comboboxProps={{ withinPortal: false }}
                />
              </Popover.Dropdown>
            </Popover>
          </Flex>
          <Flex>
            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button bg="#F4F4F4" c="#282626" fw="500" size="sm" maw={150} h={35}>
                  Minutes
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Select
                  placeholder="Pick value"
                  data={['Seconds', 'Minutes', 'Houres']}
                  comboboxProps={{ withinPortal: false }}
                />
              </Popover.Dropdown>
            </Popover>
          </Flex>
        </Flex>
      </Flex>

      {/* third  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Request Headers
        </Text>
        <Flex
          mah={110}
          w={950}
          mt={10}
          bg="#F4F4F4"
          align="center"
          p={24}
          style={{
            borderRadius: '16px',
          }}
        >
          <Text className={monoFont.className}>
            {'{'}
            <br />
            <Text pl={15} size="sm">
              {'    "Authorization": "Bearer '}
              <Text component="span" fw={700}>
                {'{{SHARED_SECRET}}'}
              </Text>
              {'"'}
            </Text>

            {'}'}
          </Text>
        </Flex>
      </Flex>
      {/* fourth  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Output Should be in format:
        </Text>
        <Flex
          mah={160}
          w={950}
          mt={10}
          bg="#F4F4F4"
          align="center"
          p={24}
          style={{
            borderRadius: '16px',
          }}
        >
          <Text className={monoFont.className} fw={400} c="gray">
            {'{'}
            <br />
            <Text pl={15} size="sm">
              {'    "admin": "AUTH_TOKEN", '}
            </Text>

            <Text pl={15} size="sm">
              {'    "alice": "AUTH_TOKEN", '}
            </Text>

            <Text pl={15} size="sm">
              {'    "bob": "AUTH_TOKEN", '}
            </Text>

            {'}'}
          </Text>
        </Flex>
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
