import { MantineThemeOverride } from '@mantine/core';

export const mantineTheme: MantineThemeOverride = {
  colorScheme: 'light',
  shadows: {
    md: '0px 0px 6px 0px rgba(0, 0, 0, 0.12)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
  headings: {
    fontFamily: 'Open Sans, sans-serif',
  },
};
