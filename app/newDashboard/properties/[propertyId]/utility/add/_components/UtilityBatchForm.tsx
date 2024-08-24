'use client';

import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { BatchUploadForm } from '@/components/New/Forms/BatchUploadForm';
import { LabelGrid } from '@/components/New/LabelGrid';
import { Input, FormControl, SubLabel } from '@/components/UI/FormUtils';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext } from 'react';
import toast from 'react-hot-toast';

const UtilityBatchFormContext = createContext<{
  utilityTypes: { id: number; name: string }[];
} | null>(null);

type UtilityBatchFormProps = {
  propertyId: string;
  utilityTypes: { id: number; name: string }[];
};

export function UtilityBatchForm({ propertyId, utilityTypes }: UtilityBatchFormProps) {
  return (
    <UtilityBatchFormContext.Provider value={{ utilityTypes }}>
      <BatchUploadForm<UtilityDataType>
        isAddingDisabled={data => {
          return (
            data.monetaryAmount === undefined ||
            data.unitAmount === undefined ||
            data.time === undefined ||
            data.typeId === undefined
          );
        }}
        onSubmit={async entries => {
          return axios.post(
            '/api/properties/utility',
            entries.map(entry => ({ ...entry, parentId: propertyId }))
          );
        }}
        title='Lisää Kulutustietoja'
        entryComponent={EntryComponent}>
        <div className='flex flex-col gap-2'>
          <RadioGroup groupName='typeId'>
            {utilityTypes.map(type => (
              <RadioButton
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
      </BatchUploadForm>
    </UtilityBatchFormContext.Provider>
  );
}

function EntryComponent({
  entry,
  deleteEntry,
}: {
  entry: UtilityDataType;
  deleteEntry: (entry: TODO) => void;
}) {
  const { utilityTypes } = useUtilityBatchFormContext();

  const Separator = () => <div className='bg-slate-200 w-[2px] h-[20px]' />;
  const EntryContainer = ({ label, value }) => (
    <div className='flex flex-col'>
      <span className='text-sm text-slate-500'>{label}</span>
      <span className='text-lg text-primary font-semibold'>{value}</span>
    </div>
  );

  return (
    <ContentBox>
      <div className='flex w-full items-center justify-between'>
        <div className='flex gap-8 items-center'>
          <EntryContainer
            label='Tiedon tyyppi'
            value={utilityTypes.find(t => t.id == entry.typeId).name}></EntryContainer>
          <Separator />
          <EntryContainer
            label='Hinta'
            value={entry.monetaryAmount + '€'}
          />
          <Separator />
          <EntryContainer
            label='Yksikkömäärä'
            value={entry.unitAmount}
          />
          <Separator />
          <EntryContainer
            label='Päiväys'
            value={new Date(entry.time).toLocaleDateString('fi')}
          />
        </div>
        <IconButton onClick={() => deleteEntry(entry)}>
          <Close />
        </IconButton>
      </div>
    </ContentBox>
  );
}

const useUtilityBatchFormContext = createUseContextHook(
  'UtilityBatchFormContext',
  UtilityBatchFormContext
);
