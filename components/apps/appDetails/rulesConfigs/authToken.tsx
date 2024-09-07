/* eslint-disable react/jsx-curly-brace-presence */

import { Button, Flex, Group, NumberInput, Select, Text, Textarea } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { AxiosResponse } from 'axios';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';

import { BASE_URL } from '@/utils/constants';
import { genericMutationFetcher } from '@/utils/swr.helper';

const OutputCode = `
{
  "admin": "AUTH_TOKEN",
  "alice": "AUTH_TOKEN",
  "bob": "AUTH_TOKEN",
}
`;

function convertInterval(interval: number, unit: string): number {
  switch (unit) {
    case 'Seconds':
      return interval;
    case 'Minutes':
      return interval / 60;
    case 'Hours':
      return interval / 3600;
    default:
      return interval;
  }
}

function getUnitFromInterval(interval: number): string {
  if (interval % 3600 === 0) return 'Hours';
  if (interval % 60 === 0) return 'Minutes';
  return 'Seconds';
}

export default function AuthTokens({
  configData,
  appId,
  mutateConfig,
}: {
  configData: SecurityConfiguration[];
  appId: string;
  mutateConfig: () => Promise<any>;
}) {
  const [interval, setInterval] = useState<string | number>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('Seconds');
  // const [filteredData, setFilteredData] = useState<SecurityConfiguration | null>(null);
  const [endpoints, setEndpoints] = useState<string>('');
  const [reqHeaderCode, setReqHeaderCode] = useState<string>('');

  useEffect(() => {
    const successFlowData = configData.find((config) => config.configType === 'AUTH_TOKENS');
    // setFilteredData(successFlowData || null);
    if (successFlowData) {
      setEndpoints(JSON.stringify(successFlowData?.rules?.endpoint, null, 2));

      setReqHeaderCode(JSON.stringify(successFlowData?.rules?.headers, null, 2));
    }

    if (successFlowData?.rules?.refreshInterval) {
      const unit = getUnitFromInterval(successFlowData.rules.refreshInterval);
      const convertedInterval = convertInterval(successFlowData.rules.refreshInterval, unit);
      setInterval(convertedInterval);
      setSelectedUnit(unit);
    }
  }, [JSON.stringify(configData)]);

  const { trigger, isMutating: isButtonLoading } = useSWRMutation<AxiosResponse<any>>(
    `${BASE_URL}/config/app/${appId}`,
    genericMutationFetcher
  );

  const handleSaveAuthTokenClick = async () => {
    let refreshIntervalInSeconds;
    switch (selectedUnit) {
      case 'Hours':
        refreshIntervalInSeconds = Number(interval) * 3600;
        break;
      case 'Minutes':
        refreshIntervalInSeconds = Number(interval) * 60;
        break;
      default:
        refreshIntervalInSeconds = Number(interval);
    }

    try {
      const saveAuthTokendata = await trigger({
        type: 'put',
        rest: [
          {
            rules: {
              refreshInterval: refreshIntervalInSeconds,
              headers: JSON.parse(reqHeaderCode),
              endpoint: JSON.parse(endpoints),
            },
            isEnabled: true,
          },
          {
            params: {
              configType: 'AUTH_TOKENS',
            },
          },
        ],
      } as any);

      // console.log('baseutl', editedBaseUrl);
      console.log(saveAuthTokendata);
      await mutateConfig();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnitChange = (value: string | null) => {
    if (value !== null) {
      const convertedInterval = convertInterval(Number(interval), value);
      setInterval(convertedInterval);
      setSelectedUnit(value);
    }
  };
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
      <Flex direction="column" align="flex-start" mt={25} justify="flex-start">
        <Text fw={500} size="sm" c="#6E6E6E" ml={24}>
          Endpoints
        </Text>

        <Textarea
          variant="filled"
          p={24}
          w={1000}
          placeholder="Input placeholder"
          value={endpoints}
          onChange={(event) => setEndpoints(event.currentTarget.value)}
          opacity="70%"
        />
        {/* <CodeHighlight
          mah={110}
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
          code={EndpointsCode}
          language="tsx"
          contentEditable
        /> */}
      </Flex>
      {/* second  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Refresh Interval
        </Text>
        <Flex mt={10} direction="row" w={200} justify="space-between">
          <NumberInput
            variant="filled"
            placeholder="150"
            allowNegative={false}
            allowDecimal={false}
            // ml={23}
            value={interval}
            onChange={setInterval}
            maw={80}
          />
          <Select
            placeholder="Minutes"
            value={selectedUnit}
            onChange={handleUnitChange}
            ml={5}
            fw="500"
            size="sm"
            data={['Seconds', ' Minutes', 'Hours']}
            styles={() => ({
              input: {
                backgroundColor: '#F4F4F4',
                borderRadius: '31px',
                // color: '#D57575',
              },
            })}
          />
        </Flex>
      </Flex>

      {/* third  */}
      <Flex direction="column" align="flex-start" mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E" ml={24}>
          Request Headers
        </Text>
        <Textarea
          variant="filled"
          p={24}
          w={1000}
          autosize
          placeholder="Input placeholder"
          value={reqHeaderCode}
          onChange={(event) => setReqHeaderCode(event.currentTarget.value)}
          opacity="70%"
        />
        {/* <CodeHighlight
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
        /> */}
      </Flex>
      {/* fourth  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Output Should be in format:
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
            opacity: '70%',
          }}
          withCopyButton={false}
          code={OutputCode}
          language="tsx"
          contentEditable={false}
        />
      </Flex>

      {/* Button */}

      <Flex direction="row" ml={24} align="center" mb={24} mt={24}>
        <Group>
          <Button
            fw={500}
            size="sm"
            bg="#246EFF"
            onClick={handleSaveAuthTokenClick}
            loading={isButtonLoading}
          >
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
