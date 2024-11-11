'use client';

import { DataSubmitDialog } from '@/components/New/DataSubmitDialog';
import { UtilityBatchForm } from './add/UtilityBatchForm';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import { DialogControl } from '@/components/Util/DialogControl';
import axios from 'axios';
import { FormControl, Input, SubLabel } from '@/components/UI/FormUtils';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';

export const UtilitySubmitDialog = ({ propertyId, allTypes }) => (
  <DialogControl
    trigger={({ onClick }) => {
      return (
        <Button
          type='button'
          onClick={onClick}
          className='text-nowrap'
          variant='text'
          startIcon={<Add />}>
          Lisää Uusi
        </Button>
      );
    }}
    control={({ show, handleClose }) => {
      return (
        <DataSubmitDialog
          initialData={{ parentId: propertyId }}
          onSubmit={async data => {
            return axios.post('/api/protected/properties/utility', data);
          }}
          open={show}
          handleClose={handleClose}
          title='Lisää kulutustietoja'>
          <div className='flex flex-col gap-2'>
            <RadioGroup name='typeId'>
              {allTypes.map(type => (
                <ChipButton
                  label={type.name}
                  value={type.id}
                />
              ))}
            </RadioGroup>
          </div>
          <FormControl
            label='Hinta'
            required
            control={
              <Input
                name='monetaryAmount'
                type='number'
                step={0.01}
                placeholder='Kirjoita laskun hinta...'
              />
            }
          />

          <FormControl
            label='Yksikkömäärä'
            required
            helper={<SubLabel>Esim. sähkölaskussa määrä kilovattitunneissa.</SubLabel>}
            control={
              <Input
                name='unitAmount'
                type='number'
                step={0.01}
                placeholder='Kirjoita kulutuksen määrä yksiköissä...'
              />
            }
          />

          <FormControl
            label='Päivämäärä'
            required
            helper={<SubLabel>Laskun päivämäärä.</SubLabel>}
            control={
              <Input
                type='date'
                name='time'
                placeholder='Anna päivämäärä...'
              />
            }
          />
        </DataSubmitDialog>
      );
    }}
  />
);
