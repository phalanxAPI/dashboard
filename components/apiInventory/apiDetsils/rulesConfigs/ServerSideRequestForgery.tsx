/* eslint-disable react/jsx-curly-brace-presence */
import { CodeHighlight } from '@mantine/code-highlight';
import { Button, Flex, Group, Select, Switch, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';

export default function ServerSideRequestForgery({
  configData,
}: {
  configData: SecurityConfiguration[];
}) {
  const [filteredData, setFilteredData] = useState<SecurityConfiguration | null>(null);
  const [value, setValue] = useState<string | null>('');
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const successFlowData = configData.find(
      (config) => config.configType === 'SERVER_SIDE_REQUEST_FORGERY'
    );
    setFilteredData(successFlowData || null);
    setValue(successFlowData?.rules?.expectations.code?.toString());
    setChecked(successFlowData?.isEnabled ?? false);
  }, [JSON.stringify(configData)]);

  const RequestHeadersCode =
    JSON.stringify(filteredData?.rules?.headers, null, 2) ||
    `{}
  `;
  const RequestParamsCode =
    JSON.stringify(filteredData?.rules?.params, null, 2) ||
    `{}
  `;
  const RequestBodyCode =
    JSON.stringify(filteredData?.rules?.body, null, 2) ||
    `{}
  `;

  return (
    <Flex
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
        <Switch
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
          ml={18}
          color="#246EFF"
        />
      </Flex>

      {/* first  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Request Headers
        </Text>
        <CodeHighlight
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

      {/* Second  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Request Params
        </Text>
        <CodeHighlight
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
          code={RequestParamsCode}
          language="tsx"
          contentEditable
        />
      </Flex>
      <Flex direction="column" align="flex-start" ml={24} mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E">
          Request Body
        </Text>
        <CodeHighlight
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
          code={RequestBodyCode}
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
          value={value?.toString()}
          onChange={setValue}
          ml={23}
          fw="500"
          size="sm"
          data={[
            {
              label: '200 Success',
              value: '200',
            },

            { label: '204 No Content', value: '204' },
            { label: '301 Moved Permanently', value: '301' },
            { label: '302 Found', value: '302' },
            { label: '304 Not Modified', value: '304' },
            { label: '400 Bad Request', value: '400' },
            { label: '401 Unauthorized', value: '401' },
            { label: '403 Forbidden', value: '403' },
            { label: '404 Not Found', value: '404' },
            { label: '500 Internal Server Error', value: '500' },
            { label: '502 Bad Gateway', value: '502' },
            { label: '503 Service Unavailable', value: '503' },
            { label: '504 Gateway Timeout', value: '504' },
            { label: '413 Payload Too Large', value: '413' },
            { label: '429 Too Many Requests', value: '429' },
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
