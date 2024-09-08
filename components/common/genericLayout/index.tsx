import { Flex, Text, Title } from '@mantine/core';
import Alerts from '../Alerts';
import Avatar from '../Avatar';

export function PageLayout({ children, pageTitle }: { children: any; pageTitle: string }) {
  return (
    <>
      <Flex direction="column" pl="xl" pt={36} gap={10} mt={8}>
        <Flex justify="space-between">
          <Flex direction="column">
            <Title c="#3c3c3c" fz={28}>{pageTitle}</Title>
          </Flex>
          <Flex direction="row" gap={16} align="center" mr="xl">
            <Alerts />
            <Avatar />
          </Flex>
        </Flex>

        <Text mt={10} maw={776} fw={400} style={{ color: ' #a8a8a8', fontSize: 16 }}>
          Lorem ipsum dolor sit amet consectetur. In imperdiet purus rutrum eleifend facilisi
          sagittis. Libero vulputate malesuada mattis phasellus quis pretium odio ut turpis. In in
          sit odio dolor.
        </Text>

        <div>{children}</div>
      </Flex>
    </>
  );
}
