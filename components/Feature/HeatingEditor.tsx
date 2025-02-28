import { BatchEntryType } from '@/hooks/useBatch';
import { HeatingPayloadType } from 'kotilogi-app/dataAccess/types';
import { useEffect, useMemo } from 'react';
import { OptionSelector } from './OptionSelector';
import { IconButton } from '@mui/material';
import { Add, Clear } from '@mui/icons-material';
import { Checkbox } from './RadioGroup/Checkbox';
import { useQuery } from '@tanstack/react-query/build/legacy';
import { getContent } from 'kotilogi-app/features/properties/components/PropertyForm/actions';
import { Notification } from '../UI/Notification';
import Spinner from '../UI/Spinner';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { FormControl, Input } from '../UI/FormUtils';
import { useBatchForm } from '@/hooks/useBatchForm';
import toast from 'react-hot-toast';
import { Button } from '../New/Button';

export function HeatingTypeSelector({ name, ...props }: Kotidok.SelectorProps & { name: string }) {
  return (
    <OptionSelector
      {...props}
      name={name}
      tablename='types.heating_type'
      label='Lämmitystyyppi'
      labelKey='name'
      valueKey='id'
      errorText='Lämmitystyyppien lataus epäonnistui!'
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

export function Heating({ data, index = 0, onChange, onDelete }) {
  const {
    data: heatingTypes,
    isLoading: heatingTypesLoading,
    error,
  } = useQuery({
    queryKey: ['types.heating_type'],
    queryFn: async () => await getContent('types.heating_type'),
  });

  const className = useMemo(
    () =>
      [
        'flex gap-2 flex-col border rounded-md p-4 shadow-md',
        data.is_primary ? 'bg-blue-50 border-blue-200 shadow-blue-200' : 'bg-none border-slate-200',
      ].join(' '),
    [data.is_primary]
  );

  return heatingTypesLoading ? (
    <Spinner message='Ladataan lämmitystä...' />
  ) : error ? (
    <Notification
      variant='error'
      position='start'>
      Tapahtui odottamaton virhe!
    </Notification>
  ) : (
    <div className={className}>
      <div className='flex w-full justify-between'>
        <h1 className='font-semibold'>Lämmitysmuoto {index + 1}</h1>

        {!data.deleted ? (
          <IconButton
            size='small'
            onClick={onDelete}>
            <Clear />
          </IconButton>
        ) : (
          <Notification variant='warning'>Merkitty poistettavaksi.</Notification>
        )}
      </div>
      <HeatingTypeSelector
        value={data.heating_type_id}
        name={`heating_type_id-${index}`}
        onChange={onChange}
      />
      {data.heating_type_id == getIdByLabel(heatingTypes, 'Öljy', 'name') ? (
        <>
          <FormControl
            label='Öljylämmityskeskuksen merkki'
            control={
              <Input
                value={data.brand}
                name={`brand-${index}`}
                onChange={onChange}
                placeholder='Anna öljylämmityskeskuksen merkki...'
              />
            }
          />

          <FormControl
            label='Öljylämmityskeskuksen malli'
            control={
              <Input
                value={data.model}
                name={`model-${index}`}
                onChange={onChange}
                placeholder='Anna öljylämmityskeskuksen malli...'
              />
            }
          />

          <FormControl
            label='Öljysäiliön sijainti'
            control={
              <Input
                value={data.location}
                name={`location-${index}`}
                onChange={onChange}
                placeholder='Anna öljysäiliön sijainti...'
              />
            }
          />
          <FormControl
            label='Öljysäiliön tilavuus'
            control={
              <Input
                name={`volume-${index}`}
                value={data.volume}
                onChange={onChange}
                type='number'
                placeholder='Anna öljysäiliön tilavuus...'
              />
            }
          />
        </>
      ) : data.heating_type_id == getIdByLabel(heatingTypes, 'Kaukolämpö', 'name') ? (
        <>
          <FormControl
            label='Lämmönjakokeskuksen merkki'
            control={
              <Input
                value={data.brand}
                name={`brand-${index}`}
                onChange={onChange}
                placeholder='Anna lämmönjakokeskuksen merkki...'
              />
            }
          />

          <FormControl
            label='Lämmönjakokeskuksen malli'
            control={
              <Input
                value={data.model}
                name={`model-${index}`}
                onChange={onChange}
                placeholder='Anna lämmönjakokeskuksen malli...'
              />
            }
          />
        </>
      ) : data.heating_type_id == getIdByLabel(heatingTypes, 'Ilmalämpöpumppu', 'name') ||
        getIdByLabel(heatingTypes, 'Sähkö', 'name') ||
        getIdByLabel(heatingTypes, 'Vesi-Ilmalämpöpumppu', 'name') ? (
        <>
          <FormControl
            label='Lämmitysmuodon nimi'
            required
            helper='Nimi voi olla vapaamuotoinen ja sitä käytetään myöhemmin lämmitysmuodon tunnistamiseen.'
            control={
              <Input
                name={`name-${index}`}
                placeholder='Anna lämmitysmuodon nimi...'
                value={data.name}
                onChange={onChange}
              />
            }
          />
        </>
      ) : null}
      <Checkbox
        label='Ensisijainen'
        name={`is_primary-${index}`}
        checked={data.is_primary}
        onChange={onChange}
      />
    </div>
  );
}

type HeatingEditorProps = {
  heatingData: Partial<HeatingPayloadType[]>;
  onChange: (entries: Partial<HeatingPayloadType>[]) => void;
};

/**TODO */
export function HeatingEditor({ heatingData, onChange }: HeatingEditorProps) {
  const {
    entries: heatingBatch,
    addEntry: addHeatingEntry,
    removeEntry: removeHeating,
    updateEntry: updateHeatingEntry,
  } = useBatchForm(heatingData, 'kotidok-heating-data');

  const {
    data: heatingTypes,
    isLoading: heatingTypesLoading,
    error,
  } = useQuery({
    queryKey: [`heating-types`],
    queryFn: async () => await getContent('types.heating_type'),
  });

  const setPrimary = (entry_id: number) => {
    heatingBatch.forEach(e => (e.value.is_primary = false));
    updateHeatingEntry(entry => entry.id == entry_id, { is_primary: true });
  };

  const addHeating = () => {
    const is_primary = heatingBatch.length == 0;
    addHeatingEntry({
      is_primary,
    } as HeatingPayloadType);
  };

  const updateHeating = async (e: TODO, entry_id: number) => {
    const name = e.target.name.split('-').at(0);
    const value = e.target.value;
    if (
      name === 'heating_type_id' &&
      (value == getIdByLabel(heatingTypes, 'Kaukolämpö', 'name') ||
        value == getIdByLabel(heatingTypes, 'Öljylämmitys', 'name'))
    ) {
      //Ignore updating if the property already has the selected heating type.
      const existingHeating = heatingBatch.find(
        hb => !hb.value.deleted && hb.value.heating_type_id == parseInt(value)
      );

      if (existingHeating) {
        toast.error('Kiinteistöllä on jo tämä lämmitysmuoto!');
        return;
      }
    } else if (name == 'is_primary') {
      setPrimary(entry_id);
      return;
    }

    updateHeatingEntry(item => item.id == entry_id, { [name]: value });
  };

  const deleteHeating = async (entry: BatchEntryType<HeatingPayloadType>) => {
    //Only ask for confirmation if the heating has been defined.
    if (typeof entry.value.heating_type_id != 'undefined') {
      const c = confirm('Haluatko varmasti poistaa lämmitysmuodon?');
      if (!c) return;
    }

    updateHeatingEntry(item => item.id == entry.id, { deleted: true });
    //removeHeating(entry.id);
  };

  useEffect(() => {
    return () => {
      heatingBatch.forEach(hb => {
        if (typeof hb.value.heating_type_id == 'undefined') {
          removeHeating(hb.id);
        }
      });
    };
  }, []);

  //Pass the current batch-state up to the parent.
  useEffect(() => onChange(heatingBatch.map(hb => hb.value)), [heatingBatch]);

  return (
    <div className='flex flex-col gap-10 justify-start w-full'>
      <h1 className='font-semibold'>Talon lämmitykset</h1>
      {heatingBatch.map((hb, index) => {
        return (
          <Heating
            data={hb.value}
            index={index}
            onChange={e => updateHeating(e, hb.id)}
            onDelete={() => deleteHeating(hb)}
          />
        );
      })}
      <div className='flex justify-start'>
        <Button
          color='secondary'
          variant='text'
          onClick={addHeating}
          startIcon={<Add />}>
          Lisää lämmitysjärjestelmä
        </Button>
      </div>
    </div>
  );
}
