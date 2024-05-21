import { Check } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type ConfirmDialogProps = React.PropsWithChildren & {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  content: React.ReactNode;
};

export function ConfirmDialog({
  show,
  handleClose,
  handleConfirm,
  title,
  content,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={show}
      onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          type='button'
          onClick={handleClose}>
          Peruuta
        </Button>

        <Button
          onClick={handleConfirm}
          type='button'
          startIcon={<Check />}>
          Vahvista
        </Button>
      </DialogActions>
    </Dialog>
  );
}
