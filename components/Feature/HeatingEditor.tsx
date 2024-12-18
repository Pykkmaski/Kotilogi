import { BatchEntryType, useBatch } from '@/hooks/useBatch';
import { HeatingPayloadType } from 'kotilogi-app/dataAccess/types';
import { useEffect } from 'react';
import { OptionSelector } from './OptionSelector';
import { IconButton } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { Checkbox } from './RadioGroup/Checkbox';
import { useQuery } from '@tanstack/react-query/build/legacy';
import { getContent } from 'kotilogi-app/app/dashboard/properties/add/_components/PropertyForm/actions';
import { Notification } from '../UI/Notification';
import Spinner from '../UI/Spinner';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { FormControl, Input } from '../UI/FormUtils';

export function HeatingTypeSelector({ name, ...props }: Kotidok.SelectorProps & { name: string }) {
  return (
    <OptionSelector
      {...props}
      name={name}
      tablename='heating.types'
      label='Lämmitystyyppi'
      labelKey='name'
      valueKey='id'
    />
  );
}

export function OilHeatingDetails({ heatingData, onChange }) {
  return (
    <>
      <FormControl
        label='Öljylämmityskeskuksen merkki'
        control={
          <Input
            value={heatingData.brand}
            name='brand'
            onChange={onChange}
            placeholder='Anna öljylämmityskeskuksen merkki...'
          />
        }
      />

      <FormControl
        label='Öljylämmityskeskuksen malli'
        control={
          <Input
            value={heatingData.model}
            name='model'
            onChange={onChange}
            placeholder='Anna öljylämmityskeskuksen malli...'
          />
        }
      />

      <FormControl
        label='Öljysäiliön sijainti'
        control={
          <Input
            value={heatingData.location}
            name='location'
            onChange={onChange}
            placeholder='Anna öljysäiliön sijainti...'
          />
        }
      />
      <FormControl
        label='Öljysäiliön tilavuus'
        control={
          <Input
            name='volume'
            value={heatingData.volume}
            onChange={onChange}
            type='number'
            placeholder='Anna öljysäiliön tilavuus...'
          />
        }
      />
    </>
  );
}

type HeatingEditorProps = {
  heatingData: Partial<HeatingPayloadType[]>;
  onChange: (entries: BatchEntryType<Partial<HeatingPayloadType>>[]) => void;
};

/**TODO */
export function HeatingEditor({ heatingData, onChange }: HeatingEditorProps) {
  const { entries, addEntry, removeEntry, updateEntry } = useBatch(
    heatingData,
    'kotidok-heating-data'
  );

  const {
    data: heatingTypes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['heating.types'],
    queryFn: async () => await getContent('heating.types'),
  });

  const addHeating = () => addEntry({} as HeatingPayloadType);
  const removeHeating = (batchId: number) => removeEntry(batchId);
  const updateHeating = (e: any, batchId: number) => {
    const name = e.target.name.includes('type-id') ? 'heating_type_id' : e.target.name;
    updateEntry(entry => entry.id == batchId, { [name]: e.target.value } as HeatingPayloadType);
  };

  useEffect(() => {
    onChange(entries);
  }, [entries]);

  return (
    <div className='flex flex-col gap-4'>
      {entries.map((h, index) => {
        return (
          <div
            className='flex flex-col p-2 w-full gap-2'
            key={`heating-type-${index}`}>
            <div className='flex items-center justify-between'>
              <h1 className='font-semibold'>Lämmitys {index + 1}</h1>
              <IconButton
                size='small'
                onClick={() => removeHeating(h.id)}>
                <Clear />
              </IconButton>
            </div>

            {isLoading ? (
              <Spinner message='Ladataan lämmitystyyppejä...' />
            ) : error ? (
              <Notification
                variant='error'
                position='start'>
                Lämmitystyyppien lataus epäonnistui!
              </Notification>
            ) : (
              <>
                <HeatingTypeSelector
                  name={`type-id-${index}`}
                  value={h.value.heating_type_id}
                  onChange={e => updateHeating(e, h.id)}
                />
                {h.value.heating_type_id == getIdByLabel(heatingTypes, 'Öljy', 'name') ? (
                  <OilHeatingDetails
                    heatingData={h.value}
                    onChange={e => updateHeating(e, h.id)}
                  />
                ) : null}
              </>
            )}

            <div className='flex justify-start'>
              <Checkbox
                label='Ensisijainen'
                value={h.value.id}
                onChange={e => updateHeating(e, h.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
