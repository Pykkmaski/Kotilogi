'use client';

import { createTheme, Theme } from '@mui/material';
import colors from './colors';

declare module '@mui/material' {
  interface Palette {
    dashboardPrimary: Palette['primary'];
  }

  interface PaletteOptions {
    dashboardPrimary?: Palette['primary'];
  }
}

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: colors['wf-primary'],
    },

    secondary: {
      main: colors['secondary'],
    },
  },
});
