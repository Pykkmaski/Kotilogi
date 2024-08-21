'use client';

import { ACreateUtilityData } from '@/actions/utilityData';
import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { BatchUploadForm } from '@/components/New/Forms/BatchUploadForm';
import { LabelGrid } from '@/components/New/LabelGrid';
import { Input, FormControl, SubLabel } from '@/components/UI/FormUtils';
import { useInputData } from '@/hooks/useInputData';
import { Add, Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext, useContext, useRef } from 'react';

const UtilityBatchFormContext = createContext<{
  utilityTypes: { id: string; name: string }[];
} | null>(null);

type UtilityBatchFormProps = {
  propertyId: string;
  utilityTypes: { id: string; name: string }[];
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
          axios.post('/api/properties/utility', {
            data: entries.map(entry => ({ ...entry, parentId: propertyId })),
          });
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
  return (
    <ContentBox>
      <div className='w-full flex justify-end'>
        <IconButton onClick={() => deleteEntry(entry)}>
          <Close />
        </IconButton>
      </div>
      <LabelGrid>
        {Object.entries(entry).map(([key, value]) => (
          <LabelGrid.Entry
            label={key}
            value={value}
          />
        ))}
      </LabelGrid>
    </ContentBox>
  );
}

const useUtilityBatchFormContext = createUseContextHook(
  'UtilityBatchFormContext',
  UtilityBatchFormContext
);
