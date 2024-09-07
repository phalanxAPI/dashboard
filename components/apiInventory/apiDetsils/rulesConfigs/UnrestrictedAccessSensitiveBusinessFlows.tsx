/* eslint-disable react/jsx-curly-brace-presence */
import { Button, Flex, Group, NumberInput, Select, Switch, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { AxiosResponse } from 'axios';
import { monoFont } from '@/app/fonts';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';

import { BASE_URL } from '@/utils/constants';
import { genericMutationFetcher } from '@/utils/swr.helper';

export default function UnrestrictedAccessSensitiveBusinessFlows({
  configData,
  apiId,
  mutateConfig,
}: {
  configData: SecurityConfiguration[];
  apiId: string;
  mutateConfig: () => Promise<any>;
}) {
  const [codevalue, setCodeValue] = useState<string | null>('');
  const [limitvalue, setLimitValue] = useState<string | number>('');
  const [checked, setChecked] = useState(false);
  // const [filteredData, setFilteredData] = useState<SecurityConfiguration | null>(null);

  useEffect(() => {
    const successFlowData = configData.find(
      (config) => config.configType === 'UNRESTRICTED_ACCESS_TO_SENSITIVE_BUSINESS_FLOW'
    );
    // setFilteredData(successFlowData || null);
    setCodeValue(successFlowData?.rules?.expectations.code?.toString());
    setLimitValue(successFlowData?.rules?.limit);
    setChecked(successFlowData?.isEnabled ?? false);
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
            limit: limitvalue,

            expectations: {
              code: codevalue,
            },
          },
          isEnabled: checked,
        },
        {
          params: {
            configType: 'UNRESTRICTED_ACCESS_TO_SENSITIVE_BUSINESS_FLOW',
          },
        },
      ],
    } as any);

    await mutateConfig();

    // eslint-disable-next-line no-console
    console.log(data);
  };
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
        <Switch
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
          ml={18}
          color="#246EFF"
        />
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
          <Flex direction="row" w={320} align="center" justify="space-between">
            <Text fw={400} size="sm" c="#495057" className={monoFont.className}>
              Limit:
            </Text>
            <Flex w={209}>
              <NumberInput
                variant="filled"
                placeholder="20"
                allowNegative={false}
                allowDecimal={false}
                ml={23}
                value={limitvalue}
                onChange={setLimitValue}
                maw={60}
              />
            </Flex>
          </Flex>
          <Flex direction="row" w={320} align="center" mt={8} justify="space-between">
            <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
              Error Code:
            </Text>
            <Flex w={209}>
              <Select
                placeholder="Pick Response Code"
                value={codevalue}
                onChange={setCodeValue}
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
          </Flex>
        </Flex>
      </Flex>

      {/* Button */}

      <Flex direction="row" ml={24} align="center" mb={24} mt={25}>
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
