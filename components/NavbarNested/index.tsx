'use client';

import { Group, ScrollArea } from '@mantine/core';
import {
  IconBug,
  IconLayoutDashboard,
  IconLayoutSidebar,
  IconServer,
  IconWorldUpload,
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
  },
  {
    label: 'API Inventory',
    icon: IconWorldUpload,
  },
  { label: 'Issues', icon: IconBug },
  { label: 'Apps', icon: IconServer },
];
export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Image src={logo} width={86} height={30} alt="Picture of the author" />
          {/* <Text
            className={classes.headerText}
            inherit
            // variant="gradient"
            component="span"
            // gradient={{ from: 'pink', to: 'yellow' }}
          >
            PHALANX
          </Text> */}

          <IconLayoutSidebar size={24} color="#888888" />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      {/* <div className={classes.footer}>
        <UserButton />
      </div> */}
    </nav>
  );
}
