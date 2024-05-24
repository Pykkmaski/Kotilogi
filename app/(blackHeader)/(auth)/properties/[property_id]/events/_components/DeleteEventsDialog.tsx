import { DialogControl } from '@/components/Util/DialogControl';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { Check, Delete } from '@mui/icons-material';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';

export function DeleteEventsDialog() {
  return (
    <DialogControl
      trigger={({ onClick }) => {
        return (
          <Button
            variant='text'
            onClick={onClick}>
            <Delete />
          </Button>
        );
      }}
      control={({ show, handleClose }) => {
        return (
          <Dialog
            open={show}
            onClose={handleClose}>
            <DialogTitle>Poista valitut tapahtumat</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Olet poistamassa seuraavia tapahtumia. Oletko varma?
              </DialogContentText>
              <ul className='flex flex-col gap-2'>
                <SelectablesProvider.SelectedItems Component={item => <li>{item.title}</li>} />
              </ul>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Peruuta</Button>
              <Button startIcon={<Check />}>Vahvista</Button>
            </DialogActions>
          </Dialog>
        );
      }}
    />
  );
}
