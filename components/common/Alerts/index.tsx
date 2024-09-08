'use client';

import { ActionIcon, Menu } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

function Alerts() {
  return (
    <Menu
      shadow="md"
      width={200}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
    >
      <Menu.Target>
        <ActionIcon variant="subtle" color="dark" size="lg">
          <IconBell style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown style={{ borderRadius: 12 }}>
        <Menu.Label fz={14} py={12}>Coming Soon</Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Alerts;
