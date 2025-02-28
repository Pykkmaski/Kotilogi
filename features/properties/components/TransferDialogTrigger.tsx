'use client';

import { DialogPrefab, VPDialog } from '@/components/UI/VPDialog';
import { Person } from '@mui/icons-material';
import { DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { TokenGenerationField } from './TokenGenerationField';
import { theme } from 'kotilogi-app/muiTheme';

export function TransferDialogTrigger({ propertyId }) {
  const smallScreen = useMediaQuery('(min-width:400px)');
  return (
    <DialogPrefab
      trigger={<span>Siirrä omistajuus</span>}
      target={
        <VPDialog fullWidth={smallScreen}>
          <DialogTitle>Siirrä omistajuus</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Kopioi tämä linkki ja lähetä se Kotidokin käyttäjälle jolle haluat siirtää talon
              omistajuuden.
              <br />
              <br />
              <TokenGenerationField propertyId={propertyId} />
            </DialogContentText>
          </DialogContent>
        </VPDialog>
      }
    />
  );
}
