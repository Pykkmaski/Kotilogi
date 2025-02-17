'use client';

import { Input, FormControl, SubLabel } from '@/components/UI/FormUtils';
import { Add, Check, Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { createContext, useId, useRef } from 'react';

import { Button } from '@/components/New/Button';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { createUtilityDataAction } from './actions';
import { usePreventDefault } from '@/hooks/usePreventDefault';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useBatchForm } from '@/hooks/useBatchForm';
import { BoxFieldset } from '@/components/UI/BoxFieldset';

const UtilityBatchFormContext = createContext<{
  utilityTypes: { id: number; name: string }[];
} | null>(null);

type UtilityBatchFormProps = {
  propertyId: string;
  utilityTypes: { id: number; name: string }[];
};

export function UtilityBatchForm({ propertyId, utilityTypes }: UtilityBatchFormProps) {
  const { updateData, entries, addEntry, removeEntry, updateEntry, resetData } =
    useBatchForm<Partial<UtilityDataType>>();

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

  const add = () => {
    addEntry({
      property_id: propertyId,
    });
  };

  const update = (e: TODO, entryId: number) => {
    const name = e.target.name.split('-').at(1);
    const value =
      e.target.type === 'number'
        ? e.target.valueAsNumber
        : name === 'typeId'
        ? parseInt(e.target.value)
        : e.target.value;

    updateEntry(item => item.id == entryId, { [name]: value });
  };

  const del = (entryId: number) => removeEntry(entryId);

  const isSubmitDisabled = () => entries.length == 0 || status == 'loading' || status == 'done';
  const isCommitDisabled = () => false;

  return (
    <BoxFieldset legend='Lisää kulutustietoja'>
      <div className='flex flex-col gap-8 w-full'>
        <UtilityBatchFormContext.Provider value={{ utilityTypes }}>
          <form
            id={`utility-form-${formId}`}
            ref={formRef}
            className='flex flex-col gap-4'>
            {entries.map((ub, index) => {
              return (
                <div className='flex flex-col gap-2 p-2 border border-slate-200 rounded-md animate-slideup-fast'>
                  <div className='flex justify-between w-full'>
                    <h1 className='font-semibold text-lg'>Lasku {index + 1}</h1>
                    <IconButton
                      size='small'
                      title='Poista'
                      onClick={() => del(ub.id)}>
                      <Clear />
                    </IconButton>
                  </div>
                  <FormControl
                    label='Tyyppi'
                    required
                    control={
                      <ChipRadioGroup
                        name={`${index}-typeId`}
                        currentValue={ub.value.typeId}
                        dataArray={utilityTypes || []}
                        labelKey='name'
                        valueKey='id'
                        onChange={e => {
                          update(e, ub.id);
                        }}
                      />
                    }
                  />

                  <FormControl
                    label='Hinta'
                    required
                    control={
                      <Input
                        name={`${index}-monetaryAmount`}
                        type='number'
                        step={0.01}
                        placeholder='Kirjoita laskun hinta...'
                        value={ub.value.monetaryAmount}
                        onChange={e => update(e, ub.id)}
                      />
                    }
                  />

                  <FormControl
                    label='Yksikkömäärä'
                    helper={<SubLabel>Esim. sähkölaskussa määrä kilovattitunneissa.</SubLabel>}
                    control={
                      <Input
                        name={`${index}-unitAmount`}
                        type='number'
                        step={0.01}
                        placeholder='Kirjoita kulutuksen määrä yksiköissä...'
                        value={ub.value.unitAmount}
                        onChange={e => update(e, ub.id)}
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
                        name={`${index}-date`}
                        placeholder='Anna päivämäärä...'
                        value={ub.value.date as any}
                        onChange={e => update(e, ub.id)}
                      />
                    }
                  />
                </div>
              );
            })}

            <div className='w-full flex justify-start'>
              <Button
                onClick={add}
                color='secondary'
                startIcon={<Add />}>
                Lisää lasku
              </Button>
            </div>
          </form>

          <div className='flex gap-4 border-t border-slate-300 pt-4 justify-end w-full'>
            <Button
              variant='text'
              color='secondary'
              onClick={() => router.back()}>
              Peruuta
            </Button>
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
          </div>
        </UtilityBatchFormContext.Provider>
      </div>
    </BoxFieldset>
  );
}

const useUtilityBatchFormContext = createUseContextHook(
  'UtilityBatchFormContext',
  UtilityBatchFormContext
);
