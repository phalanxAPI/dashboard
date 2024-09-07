/* eslint-disable react/jsx-curly-brace-presence */

import { Button, Flex, Group, Select, Text } from '@mantine/core';

import { CodeHighlight } from '@mantine/code-highlight';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { AxiosResponse } from 'axios';
import { BASE_URL } from '@/utils/constants';
import { genericMutationFetcher } from '@/utils/swr.helper';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';

export default function SuccessFlow({
  configData,
  apiId,
  mutateConfig,
}: {
  configData: SecurityConfiguration[];
  apiId: string;
  mutateConfig: () => Promise<any>;
}) {
  // const [filteredData, setFilteredData] = useState<SecurityConfiguration | null>(null);
  const [value, setValue] = useState<string | null>('');
  const [requestHeadersCode, setRequestHeadersCode] = useState<string>('');
  const [requestParamsCode, setRequestParamsCode] = useState<string>('');
  const [requestBodyCode, setRequestBodyCode] = useState<string>('');

  useEffect(() => {
    const successFlowData = configData.find((config) => config.configType === 'SUCCESS_FLOW');

    setValue(successFlowData?.rules?.expectations.code?.toString());
    setRequestHeadersCode(JSON.stringify(successFlowData?.rules?.headers, null, 2) || '{}');
    setRequestParamsCode(JSON.stringify(successFlowData?.rules?.params, null, 2) || '{}');
    setRequestBodyCode(JSON.stringify(successFlowData?.rules?.body, null, 2) || '{}');
  }, [JSON.stringify(configData)]);

  // if (!filteredData) {
  //   return <Text>No Success Flow Configuration Found</Text>;
  // }

  //   const RequestHeadersCode =
  //     JSON.stringify(filteredData?.rules?.headers, null, 2) ||
  //     `
  //     {}
  //   `;
  //   const RequestParamsCode =
  //     JSON.stringify(filteredData?.rules?.params, null, 2) ||
  //     `
  //     {}
  //   `;
  //   const RequestBodyCode =
  //     JSON.stringify(filteredData?.rules?.body, null, 2) ||
  //     `{}
  // `;

  const { trigger, isMutating: isButtonLoading } = useSWRMutation<AxiosResponse<any>>(
    `${BASE_URL}/config/app/${apiId}`,
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
          isEnabled: true,
        },
        {
          params: {
            configType: 'SUCCESS_FLOW',
          },
        },
      ],
    } as any);

    await mutateConfig();

    console.log(data);
  };
  return (
    <Flex
      // mah={738}
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
          code={requestHeadersCode}
          onChange={(e) => setRequestHeadersCode((e.target as HTMLDivElement).innerText)}
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
          code={requestParamsCode}
          language="tsx"
          contentEditable
          onInput={(e) => {
            // console.log((e.currentTarget as HTMLDivElement).textContent);
            setRequestParamsCode((e.currentTarget as HTMLDivElement).textContent || '');
          }}
        />
      </Flex>
      {/* Third  */}
      <Flex direction="column" align="flex-start" ml={24} mt={25} mb={25}>
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
          code={requestBodyCode}
          language="tsx"
          onChange={(e) => setRequestBodyCode((e.target as HTMLDivElement).innerText)}
          contentEditable
        />
      </Flex>
      {/* status code */}
      <Flex direction="row" ml={24} align="center" mb={25}>
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
              color: '#75D57F',
            },
          })}
        />
      </Flex>

      {/* Button */}

      <Flex direction="row" ml={24} align="center" mb={24}>
        <Group>
          <Button
            fw={500}
            size="sm"
            bg="#246EFF"
            onClick={handleSave}
            loaderProps={{ type: 'dots' }}
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
