'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { Flex, Avatar as MantineAvatar, Menu, rem, Skeleton, Text } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { STATIC_DATA } from './constants';

function Avatar() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded || !user) {
    return <Skeleton variant="circle" width={32} height={32} />;
  }

  return (
    <Menu
      shadow="md"
      width={200}
      position="top-end"
      transitionProps={{ transition: 'pop-top-right' }}
    >
      <Menu.Target>
        <MantineAvatar
          src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.id}`}
          alt={user?.fullName || STATIC_DATA.AVATAR_ALT}
          size={36}
          style={{ cursor: 'pointer' }}
        />
      </Menu.Target>

      <Menu.Dropdown style={{ borderRadius: 12 }}>
        <Menu.Label>{STATIC_DATA.ACCOUNT_DETAILS}</Menu.Label>
        <Menu.Divider />

        <Flex px="sm" py={8} direction="column" gap={2}>
          <Text fz="sm" fw={600}>
            {user?.fullName}
          </Text>
          <Text fz="xs" c="dimmed">
            {user?.emailAddresses[0]?.emailAddress}
          </Text>
        </Flex>

        <Menu.Divider />
        <Menu.Item
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          color="red"
          onClick={() => signOut({ redirectUrl: pathname })}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Avatar;
