'use client';

import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { BatchUploadForm } from '@/components/New/Forms/BatchUploadForm';
import { Input, FormControl, SubLabel } from '@/components/UI/FormUtils';
import { Add, Check, Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext, useId, useRef } from 'react';
import toast from 'react-hot-toast';
import { onSubmit } from './actions';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { useBatch } from '@/hooks/useBatch';
import { useInputData } from '@/hooks/useInputData';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Button } from '@/components/New/Button';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';

const UtilityBatchFormContext = createContext<{
  utilityTypes: { id: number; name: string }[];
} | null>(null);

type UtilityBatchFormProps = {
  propertyId: string;
  utilityTypes: { id: number; name: string }[];
};

export function UtilityBatchForm({ propertyId, utilityTypes }: UtilityBatchFormProps) {
  const { entries, addEntry, removeEntry, updateEntry } = useBatch<Partial<UtilityDataType>>();
  const { data, updateData } = useInputData<Partial<UtilityDataType>>({
    parentId: propertyId,
  } as UtilityDataType);
  const formRef = useRef<HTMLFormElement>(null);
  const formId = useId();
  const commit = () => {
    addEntry(data);
    formRef.current?.reset();
  };

  return (
    <div className='flex flex-col gap-4 lg:w-[50%] xs:w-full'>
      <UtilityBatchFormContext.Provider value={{ utilityTypes }}>
        <form
          id={`utility-form-${formId}`}
          ref={formRef}
          className='flex flex-col gap-2'
          onChange={updateData}>
          <SecondaryHeading>Lisää kulutustietoja</SecondaryHeading>

          <FormControl
            label='Tyyppi'
            required
            control={
              <RadioGroup name='typeId'>
                {utilityTypes.map(type => (
                  <ChipButton
                    label={type.name}
                    value={type.id}
                    checked={data.typeId == type.id}
                  />
                ))}
              </RadioGroup>
            }
          />

          <FormControl
            label='Hinta'
            required
            control={
              <Input
                name='monetaryAmount'
                type='number'
                step={0.01}
                placeholder='Kirjoita laskun hinta...'
                value={data.monetaryAmount}
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
                value={data.unitAmount}
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
                value={data.time && timestampToISOString(data.time)}
              />
            }
          />
        </form>
        <div className='flex justify-end gap-4'>
          <Button
            variant='text'
            startIcon={<Add />}
            onClick={commit}>
            Lisää toinen tieto
          </Button>

          <Button
            form={formId}
            type='submit'
            startIcon={<Check />}
            variant='contained'>
            Vahvista kaikki
          </Button>
        </div>

        <div className='flex flex-col gap-4 border-t border-slate-300 pt-4'>
          <SecondaryHeading>Vahvistamattomat tiedot</SecondaryHeading>
          {entries.map(e => (
            <EntryComponent
              entry={e}
              deleteEntry={item => removeEntry(i => JSON.stringify(i) == JSON.stringify(item))}
            />
          ))}
        </div>
      </UtilityBatchFormContext.Provider>
    </div>
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
