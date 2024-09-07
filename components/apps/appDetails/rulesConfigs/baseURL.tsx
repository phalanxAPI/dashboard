/* eslint-disable react/jsx-curly-brace-presence */

import { Button, Flex, Group, Text, Textarea } from '@mantine/core';

// import { CodeHighlight } from '@mantine/code-highlight';
import { useState } from 'react';

import useSWRMutation from 'swr/mutation';
import { AxiosResponse } from 'axios';
import { genericMutationFetcher } from '@/utils/swr.helper';
import { BASE_URL } from '@/utils/constants';

export default function BaseURL({
  baseUrl,
  appId,
  mutateConfig,
}: {
  baseUrl: string;
  appId: string;
  mutateConfig: () => Promise<any>;
}) {
  const [editedBaseUrl, setEditedBaseUrl] = useState(baseUrl || '{}');

  const { trigger, isMutating: isButtonLoading } = useSWRMutation<AxiosResponse<any>>(
    `${BASE_URL}/applications/${appId}/baseUrl`,
    genericMutationFetcher
  );

  const handleSaveBaseUrlClick = async () => {
    try {
      const saveAppdata = await trigger({
        type: 'put',
        rest: [
          {
            baseUrl: editedBaseUrl,
          },
        ],
      } as any);

      console.log('baseutl', editedBaseUrl);
      console.log(saveAppdata);
      await mutateConfig();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      mah={590}
      mb={45}
      mt={27}
      maw={1000}
      direction="column"
      style={{
        backgroundColor: 'white',

        borderRadius: '22px',
      }}
    >
      <Text pt={24} pl={24} fw={700} size="lg" c="#3C3C3C">
        Base URL
      </Text>
      {/* first  */}
      {/* <CodeHighlight
        mah={110}
        w={950}
        mt={10}
        ml={24}
        mb={25}
        p={24}
        bg="#F4F4F4"
        style={{
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
        }}
        withCopyButton={false}
        code={editedBaseUrl}
        onInput={(e) => setEditedBaseUrl(e.currentTarget.textContent || '')}
        language="tsx"
        contentEditable
      /> */}

      <Textarea
        variant="filled"
        p={24}
        placeholder="Input placeholder"
        value={editedBaseUrl}
        onChange={(event) => setEditedBaseUrl(event.currentTarget.value)}
        opacity="70%"
      />
      {/* Button */}
      <Flex direction="row" ml={24} align="center" mb={24}>
        <Group>
          <Button
            fw={500}
            size="sm"
            bg="#246EFF"
            onClick={handleSaveBaseUrlClick}
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
