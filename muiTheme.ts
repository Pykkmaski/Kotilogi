'use client';

import { createTheme, Theme } from '@mui/material';
import { blueGrey, green, grey, orange } from '@mui/material/colors';

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
      main: '#518577',
    },

    secondary: {
      main: '#518577',
    },
  },
});
