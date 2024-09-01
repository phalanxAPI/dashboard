'use client';

import { Flex, Group } from '@mantine/core';
import {
  IconBug,
  IconLayoutDashboard,
  IconLayoutSidebar,
  IconServer,
  IconWorldUpload,
  IconZoomScan,
} from '@tabler/icons-react';
import Image from 'next/image';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
// import { UserButton } from '../UserButton/UserButton';
import classes from './styles.module.css';

import logo from '../../public/phalanx.svg';

const mockdata = [
  {
    label: 'Dashboard',
    icon: IconLayoutDashboard,
    link: '/',
  },
  {
    label: 'API Inventory',
    icon: IconWorldUpload,
    link: '/apiInventory',
  },
  {
    label: 'Scans',
    icon: IconZoomScan,
    link: '/scans',
  },
  {
    label: 'Issues',
    icon: IconBug,
    link: '/issues',
  },
  {
    label: 'Apps',
    icon: IconServer,
    link: '/apps',
  },
];
export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Image src={logo} width={86} height={30} alt="Picture of the author" />

          <IconLayoutSidebar size={24} color="#888888" />
        </Group>
      </div>

      <Flex
        // className={classes.linksInner}
        direction="column"
        gap={10}
        mt={40}
      >
        {links}
      </Flex>
    </nav>
  );
}
