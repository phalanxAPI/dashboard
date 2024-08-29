/* eslint-disable react/jsx-curly-brace-presence */
import { Button, Flex, Group, NumberInput, Select, Switch, Text } from '@mantine/core';
import { useState } from 'react';

import { monoFont } from '@/app/fonts';

export default function UnrestrictedResourceConsumption() {
  const [reqRateLimitvalue, setReqRateLimitValue] = useState<string | null>('');
  const [reqRateCodevalue, setReqRateCodeValue] = useState<string | null>('');

  const [reqSizelimitvalue, setReqSizeLimitValue] = useState<string | null>('');
  const [reqSizeCodevalue, setReqSizeCodeValue] = useState<string | null>('');

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
        Unrestricted Resource Consumption
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
          Request Size:
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
              <NumberInput
                variant="filled"
                placeholder="20"
                allowNegative={false}
                allowDecimal={false}
                ml={23}
              />
              <Select
                placeholder="MB"
                value={reqSizelimitvalue}
                onChange={setReqSizeLimitValue}
                ml={5}
                fw="500"
                size="sm"
                data={['KB', ' MB', 'GB', 'TB']}
                maw={100}
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
          <Flex direction="row" w={300} align="center" mt={8} justify="space-between">
            <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
              Error Code:
            </Text>
            <Flex w={200}>
              <Select
                placeholder="Pick Response Code"
                value={reqSizeCodevalue}
                onChange={setReqSizeCodeValue}
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
      {/* Second */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={600} size="md" c="#3C3C3C">
          Requests Rate:
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
            <Flex w={200}>
              <NumberInput
                variant="filled"
                placeholder="150"
                allowNegative={false}
                allowDecimal={false}
                ml={23}
                maw={65}
              />
              <Select
                placeholder="Minutes"
                value={reqRateLimitvalue}
                onChange={setReqRateLimitValue}
                ml={5}
                fw="500"
                size="sm"
                data={['Seconds', ' Minutes', 'Houres']}
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
          <Flex direction="row" w={300} align="center" mt={8} justify="space-between">
            <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
              Error Code:
            </Text>
            <Flex w={197}>
              <Select
                placeholder="Pick Response Code"
                value={reqRateCodevalue}
                onChange={setReqRateCodeValue}
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
