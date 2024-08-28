/* eslint-disable react/jsx-curly-brace-presence */
import { Button, Flex, Group, Popover, Select, Switch, Text } from '@mantine/core';

export default function ServerSideRequestForgery() {
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
        Server Side Request Forgery
      </Text>

      {/* toggle */}
      <Flex direction="row" mt={25} ml={24} align="center">
        <Text fw={500} size="sm" c="#6E6E6E">
          Enabled
        </Text>
        <Switch defaultChecked ml={18} color="#246EFF" />
      </Flex>

      {/* status code */}
      <Flex direction="row" ml={24} align="center" mb={25} mt={25}>
        <Text size="sm" c="#6E6E6E" fw="500">
          Expected Response Code:
        </Text>
        <Popover width={300} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button bg="#F4F4F4" ml={23} c="#D57575" fw="500" size="sm">
              403 Forbidden
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
