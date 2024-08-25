'use client';

import { DialogControl } from '@/components/Util/DialogControl';
import { Delete } from '@mui/icons-material';
import { Dialog, DialogContentText, DialogTitle, IconButton } from '@mui/material';

type DeletePropertyDialogControlProps = {
  propertyId: string;
};

export function DeletePropertyDialogControl({ propertyId }: DeletePropertyDialogControlProps) {
  return (
    <DialogControl
      trigger={({ onClick }) => (
        <IconButton onClick={onClick}>
          <Delete sx={{ color: 'white' }} />
        </IconButton>
      )}
      control={({ show, handleClose }) => {
        return (
          <Dialog
            open={show}
            onClose={handleClose}>
            <DialogTitle>Poista talo</DialogTitle>
            <DialogContentText>Olet poistamass taloa. Oletko varma?</DialogContentText>
          </Dialog>
        );
      }}
    />
  );
}
