import { Text } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import Image from 'next/image';
import classes from './styles.module.css';
import image from '../../../public/image.svg';

export function PageLayout({ children, pageTitle }: { children: any; pageTitle: string }) {
  return (
    <>
      <div className={classes.maincont}>
        <div className={classes.container}>
          <div className={classes.textcont}>
            <Text className={classes.gridtext}>{pageTitle}</Text>
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

        <Text mt={10} maw={776} fw={400} style={{ color: ' #a8a8a8', fontSize: 16 }}>
          Lorem ipsum dolor sit amet consectetur. In imperdiet purus rutrum eleifend facilisi
          sagittis. Libero vulputate malesuada mattis phasellus quis pretium odio ut turpis. In in
          sit odio dolor.
        </Text>

        <div className={classes.childrencomp}>{children}</div>
      </div>
    </>
  );
}
