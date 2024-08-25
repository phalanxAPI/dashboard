'use client';

import { createTheme } from '@mantine/core';
import { primaryFont } from './app/fonts';

export const theme = createTheme({
  /* Put your mantine theme override here */
  defaultRadius: 16,
  fontFamily: primaryFont.style.fontFamily,
});
