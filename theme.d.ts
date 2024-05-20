import '@mui/material';

declare module '@mui/material' {
  interface Palette {
    plainWhite: Palette['primary'];
  }

  interface PaletteOptions {
    plainWhite?: Palette['primary'];
  }
}
