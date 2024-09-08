/* eslint-disable react/jsx-curly-brace-presence */
import { Button, Flex, Group, Select, Switch, Text, Textarea } from '@mantine/core';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { AxiosResponse } from 'axios';
import { BASE_URL } from '@/utils/constants';
import { genericMutationFetcher } from '@/utils/swr.helper';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';

export default function BrokenFunctionLevelAuthorization({
  configData,
  apiId,
  mutateConfig,
}: {
  configData: SecurityConfiguration[];
  apiId: string;
  mutateConfig: () => Promise<any>;
}) {
  const [value, setValue] = useState<string | null>('');
  const [checked, setChecked] = useState(false);

  const [requestHeadersCode, setRequestHeadersCode] = useState<string>('');
  const [requestParamsCode, setRequestParamsCode] = useState<string>('');
  const [requestBodyCode, setRequestBodyCode] = useState<string>('');
  useEffect(() => {
    const successFlowData = configData.find(
      (config) => config.configType === 'BROKEN_FUNCTION_LEVEL_AUTHORIZATION'
    );

    setValue(successFlowData?.rules?.expectations.code?.toString());
    setChecked(successFlowData?.isEnabled ?? false);
    setRequestHeadersCode(JSON.stringify(successFlowData?.rules?.headers, null, 2) || '{}');
    setRequestParamsCode(JSON.stringify(successFlowData?.rules?.params, null, 2) || '{}');
    setRequestBodyCode(JSON.stringify(successFlowData?.rules?.body, null, 2) || '{}');
  }, [JSON.stringify(configData)]);

  const { trigger, isMutating: isButtonLoading } = useSWRMutation<AxiosResponse<any>>(
    `${BASE_URL}/config/${apiId}`,
    genericMutationFetcher
  );

  const handleSave = async () => {
    const data = await trigger({
      type: 'put',
      rest: [
        {
          rules: {
            expectations: {
              code: parseInt(value || '200', 10),
            },
            headers: JSON.parse(requestHeadersCode),
            params: JSON.parse(requestParamsCode),
            body: JSON.parse(requestBodyCode),
          },
          isEnabled: checked,
        },
        {
          params: {
            configType: 'BROKEN_FUNCTION_LEVEL_AUTHORIZATION',
          },
        },
      ],
    } as any);

    await mutateConfig();

    // eslint-disable-next-line no-console
    console.log(data);
  };

  //   const RequestHeadersCode =
  //     JSON.stringify(filteredData?.rules?.headers, null, 2) ||
  //     `{}
  // `;
  //   const RequestParamsCode =
  //     JSON.stringify(filteredData?.rules?.params, null, 2) ||
  //     `{}
  // `;
  //   const RequestBodyCode =
  //     JSON.stringify(filteredData?.rules?.body, null, 2) ||
  //     `{}
  // `;
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
        Broken Function Level Authorization
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
      <Flex direction="column" align="flex-start" mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E" ml={24}>
          Request Headers
        </Text>
        <Textarea
          variant="filled"
          w={1000}
          p={24}
          autosize
          placeholder="Input placeholder"
          value={requestHeadersCode}
          onChange={(event) => setRequestHeadersCode(event.currentTarget.value)}
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
      {/* Second  */}
      <Flex direction="column" align="flex-start" mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E" ml={24}>
          Request Params
        </Text>
        <Textarea
          variant="filled"
          w={1000}
          p={24}
          autosize
          placeholder="Input placeholder"
          value={requestParamsCode}
          onChange={(event) => setRequestParamsCode(event.currentTarget.value)}
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
          code={RequestParamsCode}
          language="tsx"
          contentEditable
        /> */}
      </Flex>
      {/* third  */}
      <Flex direction="column" align="flex-start" mt={25}>
        <Text fw={500} size="sm" c="#6E6E6E" ml={24}>
          Request Body
        </Text>
        <Textarea
          variant="filled"
          w={1000}
          p={24}
          autosize
          placeholder="Input placeholder"
          value={requestBodyCode}
          onChange={(event) => setRequestBodyCode(event.currentTarget.value)}
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
          code={RequestBodyCode}
          language="tsx"
          contentEditable
        /> */}
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
          <Button fw={500} size="sm" bg="#246EFF" loading={isButtonLoading} onClick={handleSave}>
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
