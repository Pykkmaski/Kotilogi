'use client';

import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { Input, FormControl, SubLabel } from '@/components/UI/FormUtils';
import { Add, Check, Close, Delete } from '@mui/icons-material';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { createContext, useId, useRef } from 'react';

import { BatchEntryType } from '@/hooks/useBatch';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Button } from '@/components/New/Button';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';
import { useMapArray } from '@/hooks/useMapArray';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { ToggleProvider } from '@/components/Util/ToggleProvider';
import { VPDialog } from '@/components/UI/VPDialog';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { createUtilityDataAction } from './actions';
import { usePreventDefault } from '@/hooks/usePreventDefault';
import { Spacer } from '@/components/UI/Spacer';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { List } from '@/components/New/List';
import { useBatchForm } from '@/hooks/useBatchForm';

const UtilityBatchFormContext = createContext<{
  utilityTypes: { id: number; name: string }[];
} | null>(null);

type UtilityBatchFormProps = {
  propertyId: string;
  utilityTypes: { id: number; name: string }[];
};

export function UtilityBatchForm({ propertyId, utilityTypes }: UtilityBatchFormProps) {
  const { data, updateData, entries, addEntry, removeEntry, updateEntry, resetData } = useBatchForm<
    Partial<UtilityDataType>
  >({
    parentId: propertyId,
  });
  const entryContent = useMapArray(entries, item => (
    <EntryComponent
      item={item}
      onDelete={itemToDelete => removeEntry(itemToDelete.id)}
    />
  ));
  const router = useRouter();

  const { method: submitMethod, status } = useStatusWithAsyncMethod(
    async () => {
      await createUtilityDataAction(
        propertyId,
        entries.map(e => e.value)
      );
      router.back();
    },
    err => toast.error(err.message)
  );

  const onSubmit = usePreventDefault(submitMethod);

  const formRef = useRef<HTMLFormElement>(null);
  const formId = useId();

  const commit = () => {
    addEntry(data);
    formRef.current?.reset();
    resetData({});
  };

  const isSubmitDisabled = () => entries.length == 0 || status == 'loading' || status == 'done';
  const isCommitDisabled = () =>
    !data.monetaryAmount || !data.unitAmount || !data.typeId || !data.date;

  return (
    <div className='flex flex-col gap-4 lg:w-[50%] xs:w-full bg-white p-2'>
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
              <ChipRadioGroup
                name='typeId'
                currentValue={data.typeId}
                dataArray={utilityTypes}
                labelKey='name'
                valueKey='id'
              />
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
                name='date'
                placeholder='Anna päivämäärä...'
                value={data.date as any}
              />
            }
          />
        </form>

        <div className='flex justify-end gap-4'>
          <Button
            onClick={commit}
            disabled={isCommitDisabled()}
            variant='text'
            color='secondary'
            startIcon={<Add />}>
            Lisää tieto
          </Button>
        </div>
        <div className='flex flex-col gap-4 border-t border-slate-300 pt-4'>
          <Spacer justify='between'>
            <SecondaryHeading>Vahvistamattomat tiedot</SecondaryHeading>
            <Button
              onClick={onSubmit}
              form={formId}
              disabled={isSubmitDisabled()}
              color='secondary'
              startIcon={<Check />}
              loading={status === 'loading'}
              variant='contained'>
              Vahvista kaikki
            </Button>
          </Spacer>

          <div className='w-full'>
            <List
              grow
              dir='col'
              gap='small'
              className='w-full'>
              {entryContent}
            </List>
          </div>
        </div>
      </UtilityBatchFormContext.Provider>
    </div>
  );
}

function EntryComponent({
  item,
  onDelete,
}: {
  item: BatchEntryType<Partial<UtilityDataType>>;
  onDelete: (item: BatchEntryType<Partial<UtilityDataType>>) => void;
}) {
  const { utilityTypes } = useUtilityBatchFormContext();

  const Separator = () => <div className='bg-slate-200 w-[2px] h-[20px]' />;
  const EntryContainer = ({ label, value }) => (
    <div className='flex flex-col'>
      <span className='text-sm text-slate-500'>{label}</span>
      <span className='text-lg text-secondary font-semibold'>{value}</span>
    </div>
  );

  return (
    <ContentBox>
      <div className='flex w-full items-center justify-between flex-grow-1'>
        <div className='flex gap-8 items-center w-full'>
          <EntryContainer
            label='Tiedon tyyppi'
            value={utilityTypes.find(t => t.id == item.value.typeId).name}></EntryContainer>
          <Separator />
          <EntryContainer
            label='Hinta'
            value={item.value.monetaryAmount + '€'}
          />
          <Separator />
          <EntryContainer
            label='Yksikkömäärä'
            value={item.value.unitAmount}
          />
          <Separator />
          <EntryContainer
            label='Päiväys'
            value={new Date(item.value.date).toLocaleDateString('fi')}
          />
        </div>
        <ToggleProvider>
          <ToggleProvider.Trigger>
            <IconButton>
              <Close />
            </IconButton>
          </ToggleProvider.Trigger>

          <ToggleProvider.Target>
            <VPDialog>
              <DialogTitle>Poista tieto</DialogTitle>
              <DialogContent>
                <DialogContentText>Haluatko varmasti poistaa tiedon?</DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button
                  variant='text'
                  color='secondary'>
                  Peruuta
                </Button>

                <Button
                  onClick={() => onDelete(item)}
                  color='warning'
                  startIcon={<Delete />}>
                  Poista
                </Button>
              </DialogActions>
            </VPDialog>
          </ToggleProvider.Target>
        </ToggleProvider>
      </div>
    </ContentBox>
  );
}

const useUtilityBatchFormContext = createUseContextHook(
  'UtilityBatchFormContext',
  UtilityBatchFormContext
);
