import { useEffect, useState } from 'react';
/* eslint-disable react/jsx-curly-brace-presence */
import { Button, Flex, Group, Select, Switch, Text } from '@mantine/core';
import useSWRMutation from 'swr/mutation';
import { AxiosResponse } from 'axios';
import { genericMutationFetcher } from '@/utils/swr.helper';
import { BASE_URL } from '@/utils/constants';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';

export default function BrokenAuthentication({
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

  useEffect(() => {
    const successFlowData = configData.find(
      (config) => config.configType === 'BROKEN_AUTHENTICATION'
    );
    // setFilteredData(successFlowData || null);
    setValue(successFlowData?.rules?.expectations.code?.toString());
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
            expectations: {
              code: parseInt(value || '200', 10),
            },
          },
          isEnabled: checked,
        },
        {
          params: {
            configType: 'BROKEN_AUTHENTICATION',
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
        Broken Authentication
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
