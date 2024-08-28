/* eslint-disable react/jsx-curly-brace-presence */
import { Button, Flex, Group, Popover, Select, Switch, Text } from '@mantine/core';
import { useState } from 'react';

import { monoFont } from '@/app/fonts';

export default function UnrestrictedAccessSensitiveBusinessFlows() {
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
        Unrestricted Access to Sensitive Business Flows
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
        <Text fw={600} size="md" c="#3C3C3C">
          Unique Payload Usage Limit:
        </Text>
        <Flex
          mt={25}
          align="flex-start"
          justify="space-between"
          wrap="wrap"
          w={306}
          style={{ flexDirection: 'column' }}
        >
          <Flex direction="row" w={300} align="center" justify="space-between">
            <Text fw={400} size="sm" c="#495057" className={monoFont.className}>
              Limit:
            </Text>
            <Flex w={197}>
              <Popover position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Button bg="#F4F4F4" c="#282626" fw="500" size="sm" maw={80} h={35}>
                    1
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Select
                    placeholder="Pick unique payload"
                    data={['1', '2', '5', '10', '20']}
                    comboboxProps={{ withinPortal: false }}
                  />
                </Popover.Dropdown>
              </Popover>
            </Flex>
          </Flex>
          <Flex direction="row" w={300} align="center" mt={8} justify="space-between">
            <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
              Error Code:
            </Text>
            <Flex w={197}>
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
          </Flex>
        </Flex>
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