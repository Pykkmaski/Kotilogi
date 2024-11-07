'use client';

import IconButton from '@mui/material/IconButton';
import { DialogPrefab, VPDialog } from '../UI/VPDialog';
import { NotificationsOutlined } from '@mui/icons-material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '../New/Button';
import { ToggleProvider } from '../Util/ToggleProvider';

export function NotificationsButton() {
  return (
    <DialogPrefab
      trigger={
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
      }
      target={
        <VPDialog>
          <DialogTitle>Ilmoitukset</DialogTitle>
          <DialogActions>
            <ToggleProvider.Trigger>
              <Button
                variant='text'
                color='secondary'>
                Sulje
              </Button>
            </ToggleProvider.Trigger>
          </DialogActions>
        </VPDialog>
      }
    />
  );
}
