import { Button, Flex, Group, Switch, Text } from '@mantine/core';

export default function SecurityMisconfiguration() {
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
        Security Misconfiguration
      </Text>
      {/* toggle */}
      <Flex direction="row" mt={25} ml={24} align="center">
        <Text fw={500} size="sm" c="#6E6E6E">
          Enabled
        </Text>
        <Switch defaultChecked ml={18} color="#246EFF" />
      </Flex>

      {/* Button */}
      <Flex direction="row" ml={24} align="center" mb={24} mt={25}>
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
