'use client';

import { addProperty } from '@/actions/experimental/properties';
import { useInputData } from '@/hooks/useInputData';
import { ArrowRight, Check, CopyAll, Key } from '@mui/icons-material';
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
import { PriceDisclaimer } from './NewAddPropertyModal/NewAddPropertyModal';
import { Box, useMediaQuery } from '@mui/material';
import { theme } from 'kotilogi-app/muiTheme';
import Spinner from '@/components/UI/Spinner';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { AppartmentDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/models/types';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { YardOwnershipType } from 'kotilogi-app/models/enums/YardOwnershipType';
import { ACreateProperty } from '@/actions/properties';

export const OldDialog = ({ handleClose, show }) => {
  const [action, currentAction] = useState<'start' | 'add_via_token' | 'add_new'>('start');
  const matchesMediaQuery = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, updateData, resetData } = useInputData({
    propertyType: PropertyType.HOUSE,
  } as TODO);
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const loading = status === 'loading';

  return (
    <Dialog
      fullScreen={matchesMediaQuery}
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
            propertyNumber:
              data.propertyType === PropertyType.HOUSE ? data.propertyNumber : undefined,
            appartmentNumber:
              data.propertyType === PropertyType.APT ? data.appartmentNumber : undefined,
            yardArea: data.yardOwnership !== YardOwnershipType.NONE ? data.yardArea : undefined,
          };

          const loadingToast = toast.loading('Luodaan kohdetta...');
          ACreateProperty(dataToSubmit)
            .then(() => {
              toast.success('Kohde luotu!');
              setStatus('idle');
              handleClose();
            })
            .catch(err => {
              toast.error(err.message);
            })
            .finally(() => toast.dismiss(loadingToast));
        },
      }}>
      <DialogTitle className='flex items-center justify-between gap-4'>
        <span>Lisää Uusi Kohde</span>
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
          startIcon={!loading ? <Check /> : <Spinner size='1rem' />}
          disabled={loading}>
          Vahvista
        </Button>
      </DialogActions>
    </Dialog>
  );
};
