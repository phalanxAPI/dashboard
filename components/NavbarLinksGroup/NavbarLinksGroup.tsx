import { useState } from 'react';
import Link from 'next/link';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link: string;
  initiallyOpened?: boolean;

  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, link, initiallyOpened, links }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  // const [opened, setOpened] = useState(initiallyOpened || false);

  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((subLink) => (
    <Text<'a'> component="a" className={classes.link}>
      {subLink.label}
    </Text>
  ));

  return (
    <>
      <Link href={link} passHref className={classes.navbarLinks}>
        <UnstyledButton className={classes.control} onClick={() => setOpened((o) => !o)}>
          <Group justify="space-between" gap={0}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon className={classes.icon} style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? 'rotate(-90deg)' : 'none',
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      </Link>

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
