'use client';

import { Group, ScrollArea, Text } from '@mantine/core';
import { IconCalendarStats, IconNotes, IconPresentationAnalytics } from '@tabler/icons-react';
import { useState } from 'react';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from '../UserButton/UserButton';
import classes from './styles.module.css';

// import temp from '../../public/phalanx.svg';
// import Image from 'next/image';

const mockdata = [
  {
    label: 'Charts',
    icon: IconNotes,
  },
  {
    label: 'API Lists',
    icon: IconCalendarStats,
  },
  { label: 'Tickets', icon: IconPresentationAnalytics },
];
export function NavbarNested() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const handleLinkClick = (label: string) => {
    setSelectedPage(label);
  };

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} onClick={() => handleLinkClick(item.label)} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          {/* <Image src={temp} alt="hello" style={{ height: 30, width: 30 }} /> */}
          <Text
            size="xl"
            fw={700}
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Phalanx
          </Text>

          {/* <Code fw={700}>v3.1.2</Code> */}
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
