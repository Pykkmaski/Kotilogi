import { addProperty } from '@/actions/experimental/properties';
import { useInputData } from '@/hooks/useInputData';
import { Check, Home } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { PropertyFormContext } from './NewAddPropertyModal/Form/PropertyForm';
import { TargetTypeField } from './NewAddPropertyModal/Form/TargetTypeField';
import { GeneralField } from './NewAddPropertyModal/Form/GeneralField';
import { ExteriorField } from './NewAddPropertyModal/Form/ExteriorField';
import { YardField } from './NewAddPropertyModal/Form/YardField';
import { InteriorField } from './NewAddPropertyModal/Form/InteriorField';
import { HeatingField } from './NewAddPropertyModal/Form/HeatingField';
import { OtherInfoField } from './NewAddPropertyModal/Form/OtherInfoField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export function MuiAddPropertyDialog({ show, handleClose }) {
  const { data, updateData } = useInputData({} as Kotidok.PropertyType);
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const loading = status === 'loading';

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      fullWidth
      maxWidth='lg'
      sx={{
        xs: {
          width: '100%',
          height: '100%',
        },
      }}
      PaperProps={{
        component: 'form',

        onChange: updateData,
        id: 'add-property-form',
        onSubmit: async e => {
          e.preventDefault();
          setStatus('loading');

          const dataToSubmit = {
            ...data,
            propertyNumber: data.targetType === 'Kiinteistö' ? data.propertyNumber : undefined,
            appartmentNumber: data.targetType === 'Huoneisto' ? data.appartmentNumber : undefined,
            yardArea: data.yardOwnership !== 'Ei Mitään' ? data.yardArea : undefined,
          };

          addProperty(dataToSubmit)
            .then(() => {
              setStatus('idle');
              handleClose();
            })
            .catch(err => toast.error(err.message));
        },
      }}>
      <DialogTitle className='text-slate-500 flex items-center gap-4'>
        <Home /> Lisää Uusi Kohde
      </DialogTitle>
      <DialogContent>
        <PropertyFormContext.Provider value={{ property: data }}>
          <TargetTypeField />
          <GeneralField />
          <ExteriorField />
          <YardField />
          <InteriorField />

          <HeatingField />
          <OtherInfoField />
        </PropertyFormContext.Provider>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          onClick={handleClose}>
          Peruuta
        </Button>
        <Button
          type='submit'
          startIcon={<Check />}
          disabled={loading}>
          Vahvista
        </Button>
      </DialogActions>
    </Dialog>
  );
}
