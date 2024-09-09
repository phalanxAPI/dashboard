import { Flex, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import Alerts from '../Alerts';
import Avatar from '../Avatar';

export function PageLayout({
  children,
  pageTitle,
  pageDescription,
}: {
  children: any;
  pageTitle: string;
  pageDescription: string;
}) {
  return (
    <>
      <Flex direction="column" pl="xl" pt={36} gap={10} mt={8}>
        <Flex justify="space-between">
          <Flex direction="column">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Title c="#3c3c3c" fz={28}>
                {pageTitle}
              </Title>
            </motion.div>
          </Flex>
          <Flex direction="row" gap={16} align="center" mr="xl">
            <Alerts />
            <Avatar />
          </Flex>
        </Flex>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Text mt={10} maw={776} fw={400} style={{ color: ' #a8a8a8', fontSize: 16 }}>
            {pageDescription}
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </Flex>
    </>
  );
}
