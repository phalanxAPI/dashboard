import { Button, rem } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './NavbarLinksGroup.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link: string;
  initiallyOpened?: boolean;

  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, link }: LinksGroupProps) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <>
      <Button
        leftSection={<Icon className={classes.icon} style={{ width: rem(18), height: rem(18) }} />}
        variant={isActive ? 'light' : 'subtle'}
        color={isActive ? 'blue' : 'gray'}
        style={{
          justifyContent: 'flex-start',
        }}
        py={12}
        h="fit-content"
        styles={{
          inner: {
            justifyContent: 'flex-start',
          },
        }}
        size="md"
        fullWidth
        component={Link}
        href={link}
      >
        {label}
      </Button>
    </>
  );
}
