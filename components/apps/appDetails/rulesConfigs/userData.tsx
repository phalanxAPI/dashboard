/* eslint-disable react/jsx-curly-brace-presence */

import { Button, Flex, Group, Text } from '@mantine/core';

import { monoFont } from '@/app/fonts';

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
            https://testserver.com/internals/phalanx/user-data
          </Text>
        </Flex>
      </Flex>

      {/* second  */}
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
          mah={450}
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
            <Text pl={15} size="sm" component="span">
              {'    "admin": {'}
              <br />
              <Text pl={30} size="sm" component="span">
                {'"firstName": "John",'}
              </Text>
              <br />
              <Text pl={30} size="sm" component="span">
                {'"lastName": "Doe",'}
              </Text>
              <br />
              <Text pl={30} size="sm" component="span">
                {'"more": "...",'}
              </Text>
              <br />
              {'    },'}
            </Text>
            <br />
            <Text pl={15} size="sm" component="span">
              {'    "alice": {'}
              <br />
              <Text pl={30} size="sm" component="span">
                {'"firstName": "Alice",'}
              </Text>
              <br />
              <Text pl={30} size="sm" component="span">
                {'"lastName": "Smith",'}
              </Text>
              <br />
              <Text pl={30} size="sm" component="span">
                {'"more": "...",'}
              </Text>
              <br />
              {'    },'}
            </Text>
            <br />
            <Text pl={15} size="sm" component="span">
              {'    "bob": {'}
              <br />
              <Text pl={30} size="sm" component="span">
                {'"firstName": "Bob",'}
              </Text>
              <br />
              <Text pl={30} size="sm" component="span">
                {'"lastName": "Brown",'}
              </Text>
              <br />
              <Text pl={30} size="sm" component="span">
                {'"more": "...",'}
              </Text>
              <br />
              {'    }'}
            </Text>
            <br />
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
