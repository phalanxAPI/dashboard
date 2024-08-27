/* eslint-disable react/jsx-curly-brace-presence */
import { Button, Flex, Group, Popover, Select, Text } from '@mantine/core';

import { monoFont } from '@/app/fonts';

export default function SuccessFlow() {
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
        <Flex
          h={110}
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
            {'{'}
            <br />
            <Text pl={15} size="sm">
              {'    "Authorization": "Bearer '}
              <Text component="span" fw={700}>
                {'{{admin.token}}'}
              </Text>
              {'"'}
            </Text>

            {'}'}
          </Text>
        </Flex>
      </Flex>

      {/* Second  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Request Params
        </Text>
        <Flex
          h={110}
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
              {'    "id": '}
              {'"'}
              <Text component="span" fw={700}>
                {'{{admin.id}}'}
              </Text>
              {'"'}
            </Text>

            {'}'}
          </Text>
        </Flex>
      </Flex>
      {/* Third  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25} mb={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Request Body
        </Text>
        <Flex
          h={160}
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
              {'    "name": "Test Property", '}
            </Text>

            <Text pl={15} size="sm">
              {'    "isAdmin": "true", '}
            </Text>
            <Text pl={15} size="sm">
              {'    "email": '}
              {'"'}
              <Text component="span" fw={700}>
                {'{{regex{^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$}}'}
              </Text>
              {'"'}
            </Text>

            {'}'}
          </Text>
        </Flex>
      </Flex>
      {/* status code */}
      <Flex direction="row" ml={24} align="center" mb={25}>
        <Text size="sm" c="#6E6E6E" fw="500">
          Expected Response Code:
        </Text>
        <Popover width={300} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button bg="#F4F4F4" ml={23} c="#75D57F" fw="500" size="sm">
              201 OK
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Select
              placeholder="Pick value"
              data={[
                '200 OK',
                '403 Forbidden',
                '401 Unauthorized',
                '413 Payload Too Large',
                '429 Too Many Requests',
              ]}
              comboboxProps={{ withinPortal: false }}
            />
          </Popover.Dropdown>
        </Popover>
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
