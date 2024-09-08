/* eslint-disable react/jsx-curly-brace-presence */
import { Button, Flex, Group, NumberInput, Select, Switch, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { AxiosResponse } from 'axios';
import { monoFont } from '@/app/fonts';
import { SecurityConfiguration } from '@/arsenal/types/security-conf';

import { BASE_URL } from '@/utils/constants';
import { genericMutationFetcher } from '@/utils/swr.helper';

export default function UnrestrictedResourceConsumption({
  configData,
  apiId,
  mutateConfig,
}: {
  configData: SecurityConfiguration[];
  apiId: string;
  mutateConfig: () => Promise<any>;
}) {
  const [reqRateLimitvalue, setReqRateLimitValue] = useState<string | number>('');
  const [reqRateCodevalue, setReqRateCodeValue] = useState<string | null>('');

  const [reqSizelimitvalue, setReqSizeLimitValue] = useState<string | null>('');
  const [reqSizeCodevalue, setReqSizeCodeValue] = useState<string | null>('');
  const [checked, setChecked] = useState(false);
  const [reqSizeUnit, setReqSizeUnit] = useState<string | null>('KB');
  const [rateWindow, setRateWindow] = useState<number>(0);
  const [rateUnit, setRateUnit] = useState<string | null>('Seconds');
  useEffect(() => {
    const successFlowData = configData.find(
      (config) => config.configType === 'UNRESTRICTED_RESOURCE_CONSUMPTION'
    );

    setChecked(successFlowData?.isEnabled ?? false);

    const initialRateWindow = successFlowData?.rules?.limits?.rateWindow;
    setReqRateLimitValue(successFlowData?.rules?.limits?.rate);
    setRateWindow(initialRateWindow);

    if (successFlowData?.rules?.limits?.payload) {
      const payloadSize = successFlowData.rules.limits.payload; // In bytes
      if (payloadSize >= 1024 * 1024) {
        setReqSizeLimitValue((payloadSize / (1024 * 1024)).toFixed(2)); // Convert to MB
        setReqSizeUnit('MB');
      } else {
        setReqSizeLimitValue((payloadSize / 1024).toFixed(2)); // Convert to KB
        setReqSizeUnit('KB');
      }
    }

    if (initialRateWindow >= 3600) {
      setRateUnit('Hours');
      setRateWindow(initialRateWindow / 3600);
    } else if (initialRateWindow >= 60) {
      setRateUnit('Minutes');
      setRateWindow(initialRateWindow / 60);
    } else {
      setRateUnit('Seconds');
      setRateWindow(initialRateWindow);
    }
    setReqSizeCodeValue(successFlowData?.rules?.expectations.sizeLimit?.toString());
    setReqRateCodeValue(successFlowData?.rules?.expectations.rateLimit?.toString());
  }, [JSON.stringify(configData)]);

  const handleRateUnitChange = (unit: string) => {
    let newRateWindow = rateWindow;
    if (unit === 'Hours') {
      newRateWindow = rateWindow / 3600;
    } else if (unit === 'Minutes') {
      newRateWindow = rateWindow / 60;
    } else if (unit === 'Seconds') {
      newRateWindow = rateWindow * (rateUnit === 'Minutes' ? 60 : rateUnit === 'Hours' ? 3600 : 1);
    }
    setRateUnit(unit);
    setRateWindow(newRateWindow);
  };

  const { trigger, isMutating: isButtonLoading } = useSWRMutation<AxiosResponse<any>>(
    `${BASE_URL}/config/${apiId}`,
    genericMutationFetcher
  );

  const handleSave = async () => {
    let requestSizeInBytes = 0;
    if (reqSizeUnit === 'MB') {
      requestSizeInBytes = parseFloat(reqSizelimitvalue || '0') * 1024 * 1024;
    } else {
      requestSizeInBytes = parseFloat(reqSizelimitvalue || '0') * 1024;
    }

    // Convert rate window to seconds based on the selected rate unit
    let rateWindowInSeconds = rateWindow;
    if (rateUnit === 'Minutes') {
      rateWindowInSeconds = rateWindow * 60;
    } else if (rateUnit === 'Hours') {
      rateWindowInSeconds = rateWindow * 3600;
    }
    const data = await trigger({
      type: 'put',
      rest: [
        {
          rules: {
            limits: {
              payload: requestSizeInBytes,
              rate: reqRateLimitvalue,
              rateWindow: rateWindowInSeconds,
            },
            expectations: {
              rateLimit: reqRateCodevalue,
              sizeLimit: reqSizeCodevalue,
            },
          },
          isEnabled: checked,
        },
        {
          params: {
            configType: 'UNRESTRICTED_RESOURCE_CONSUMPTION',
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
                value={parseFloat(reqSizelimitvalue || '0')}
                onChange={(value) => setReqSizeLimitValue(value?.toString() || '')}
                ml={23}
              />
              <Select
                placeholder="MB"
                value={reqSizeUnit}
                onChange={(value) => setReqSizeUnit(value)}
                ml={5}
                fw="500"
                size="sm"
                data={['KB', ' MB']}
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
          <Flex direction="row" w={340} align="center" mt={8} justify="space-between">
            <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
              Error Code:
            </Text>
            <Flex>
              <Select
                placeholder="Pick Response Code"
                value={reqSizeCodevalue}
                onChange={setReqSizeCodeValue}
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
          <Flex direction="row" w={320} align="center" justify="space-between">
            <Text fw={400} size="sm" c="#495057" className={monoFont.className}>
              Limit:
            </Text>
            <Flex w={209}>
              <NumberInput
                variant="filled"
                placeholder="150"
                allowNegative={false}
                allowDecimal={false}
                value={reqRateLimitvalue}
                onChange={(value) => setReqRateLimitValue(value || 0)}
                ml={23}
                maw={65}
              />
              <Select
                placeholder="Minutes"
                value={rateUnit}
                onChange={(value) => handleRateUnitChange(value!)}
                ml={5}
                fw="500"
                size="sm"
                data={['Seconds', ' Minutes', 'Hours']}
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
          <Flex direction="row" w={340} align="center" mt={8} justify="space-between">
            <Text fw={400} size="sm" c="#495057" pb={11} className={monoFont.className}>
              Error Code:
            </Text>
            <Flex>
              <Select
                placeholder="Pick Response Code"
                value={reqRateCodevalue}
                onChange={setReqRateCodeValue}
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
