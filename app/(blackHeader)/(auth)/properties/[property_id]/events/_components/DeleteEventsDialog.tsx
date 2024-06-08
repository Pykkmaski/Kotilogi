import { deleteEvent } from '@/actions/experimental/events';
import { DeleteButton } from '@/components/Feature/GalleryBase/Buttons';
import { SubmitModalPrefab } from '@/components/Feature/SubmitModalPrefab';
import { DialogControl } from '@/components/Util/DialogControl';
import {
  SelectablesProvider,
  useSelectablesProviderContext,
} from '@/components/Util/SelectablesProvider';
import { Check, Delete } from '@mui/icons-material';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import toast from 'react-hot-toast';

export function DeleteEventsDialog() {
  const { selectedItems, resetSelected } = useSelectablesProviderContext();

  return (
    <SubmitModalPrefab
      trigger={<DeleteButton title='Poista valitut tapahtumat...' />}
      modalTitle='Poista valitut tapahtumat'
      submitMethod={async data => {
        const promises = selectedItems.map(item => deleteEvent(item.id));
        await Promise.all(promises).then(() => {
          toast.success('Tapahtumat poistettu!');
          resetSelected();
        });
      }}
      submitText='Vahvista'
      cancelText='Peruuta'>
      Olet poistamassa seuraavia tapahtumia:
      <ul>
        {selectedItems.map(item => (
          <li>{item.title}</li>
        ))}
      </ul>
    </SubmitModalPrefab>
  );
}
