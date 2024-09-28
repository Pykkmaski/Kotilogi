'use client';

import { FormControl, NullOption } from '@/components/UI/FormUtils';
import { useState } from 'react';
import { useAddComponentForm } from './AddComponentForm.hooks';
import { Button } from '@mui/material';
import { Fieldset } from '@/components/UI/Fieldset';
import { addComponentAction } from './actions';
import toast from 'react-hot-toast';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { ExteriorContent } from './_components/ExteriorContent';
import { HeatingMethodContent } from './_components/HeatingCircuitContent';
import { HeatingSystemContent } from './_components/HeatingSystemContent';
import { RoofContent } from './_components/RoofContent';
import { YardContent } from './_components/YardContent';

export function AddComponentForm({ propertyId }) {
  const { data, updateData, formRef } = useAddComponentForm();
  const [status, setStatus] = useState('idle');

  const propertyComponentTypes = [
    'Katto',
    'Tontti',
    'Ulkopuoli',
    'Lämmityspiiri',
    'Lämmitysjärjestelmä',
  ];

  const onSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await addComponentAction(propertyId, data);
      if (res.status == 200) {
        setStatus('done');
        formRef.current?.reset();
      } else {
        toast.error(res.statusText);
      }
    } finally {
      setStatus(prev => (prev == 'loading' ? 'idle' : prev));
    }
  };

  const getContent = () => {
    let content = null;
    const { typeLabel } = data;
    if (typeLabel == 'Ulkopuoli') {
      content = <ExteriorContent />;
    } else if (typeLabel == 'Lämmityspiiri') {
      content = <HeatingMethodContent />;
    } else if (typeLabel == 'Lämmitysjärjestelmä') {
      content = <HeatingSystemContent />;
    } else if (typeLabel == 'Katto') {
      content = <RoofContent />;
    } else if (typeLabel == 'Tontti') {
      content = <YardContent />;
    } else {
      console.error('No content defined for component type ' + typeLabel);
    }

    return content ? <Fieldset legend='Tiedot'>{content}</Fieldset> : null;
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onChange={updateData}
      className='flex flex-col gap-4 w-[30%]'>
      <SecondaryHeading>Lisää osa</SecondaryHeading>
      <Fieldset legend='Osan tyyppi'>
        <FormControl
          label='Osan tyyppi'
          control={
            <select
              name='typeLabel'
              value={data.typeLabel || 'null'}>
              <NullOption>Valitse osan tyyppi...</NullOption>
              {propertyComponentTypes.map(type => (
                <option value={type}>{type}</option>
              ))}
            </select>
          }
        />
      </Fieldset>

      {getContent()}

      <Button
        type='submit'
        variant='contained'
        disabled={status !== 'idle'}>
        Vahvista
      </Button>
    </form>
  );
}
