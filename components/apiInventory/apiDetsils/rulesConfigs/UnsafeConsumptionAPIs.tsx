import { Button, Flex, Group, Switch, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import useSWRMutation from 'swr/mutation';
import { AxiosResponse } from 'axios';
import { BASE_URL } from '@/utils/constants';
import { genericMutationFetcher } from '@/utils/swr.helper';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';

export default function UnsafeConsumptionAPIs({
  configData,
  apiId,
  mutateConfig,
}: {
  configData: SecurityConfiguration[];
  apiId: string;
  mutateConfig: () => Promise<any>;
}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const successFlowData = configData.find(
      (config) => config.configType === 'UNSAFE_CONSUMPTION_OF_APIS'
    );
    // setFilteredData(successFlowData || null);

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
          isEnabled: checked,
        },
        {
          params: {
            configType: 'UNSAFE_CONSUMPTION_OF_APIS',
          },
        },
      ],
    } as any);

    await mutateConfig();

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
        Unsafe Consumption of APIs
      </Text>
      {/* toggle */}
      <Flex direction="row" mt={25} ml={24} align="center">
        <Text fw={500} size="sm" c="#6E6E6E">
          Enabled
        </Text>
        <Switch
          defaultChecked
          ml={18}
          color="#246EFF"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
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
