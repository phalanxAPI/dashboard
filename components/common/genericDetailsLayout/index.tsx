'use client';

import { Box, Flex, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IconBell, IconChevronLeft } from '@tabler/icons-react';
import Image from 'next/image';
import classes from './styles.module.css';
import image from '../../../public/image.svg';
import { monoFont } from '@/app/fonts';

export function DetailsPageLayout({
  children,
  pageTitle,
  endpointLabel,
  endpoint,
}: {
  children: any;
  pageTitle: string;
  endpointLabel: boolean;
  endpoint?: string;
}) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };
  return (
    <>
      <div className={classes.maincont}>
        <div className={classes.container}>
          <div className={classes.textcont}>
            <Box onClick={handleBackClick} style={{ cursor: 'pointer' }}>
              <IconChevronLeft size={32} color="#001133" />
            </Box>
            <Text className={classes.gridtext} pl={8}>
              {pageTitle}
            </Text>
            {endpointLabel ? (
              <Flex
                h={31}
                // w={150}
                ml={26}
                p={10}
                style={{ borderRadius: '21px' }}
                bg="#1E1E1E"
                align="center"
                justify="center"
              >
                {' '}
                <Text fw={400} c="white" className={monoFont.className} size="sm">
                  {' '}
                  {endpoint}
                </Text>
              </Flex>
            ) : (
              ''
            )}
          </div>
          <div className={classes.rightcont}>
            <div className={classes.iconcont}>
              <IconBell />
            </div>
            <div className={classes.colorTogglecont}>
              <Image src={image} width={40} height={40} alt="Picture of the author" />
            </div>
          </div>
        </div>

        <div className={classes.childrencomp}>{children}</div>
      </div>
    </>
  );
}
