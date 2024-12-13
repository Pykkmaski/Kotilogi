'use client';

import { BoxFieldset } from '@/components/UI/Fieldset';
import { useEventFormContext } from './EventFormContext';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { useMemo, useState } from 'react';
import { Spacer } from '@/components/UI/Spacer';
import { FileList } from '@/components/New/FileList';
import { LabourExpensesInput } from './Inputs/LabourExpensesInput';
import { MaterialExpensesInput } from './Inputs/MaterialExpensesInput';

const FilesField = () => {
  const { files, removeFile } = useEventFormContext();

  return (
    <div className='flex flex-col gap-2'>
      <FormControl
        helper='Voit lisätä tapahtumaan liittyviä kuvia, tai PDF-tiedostoja.'
        label='Liitteet'
        control={
          <Input
            type='file'
            name='file'
            accept='image/jpeg,application/pdf'
            multiple
          />
        }
      />
      <FileList
        files={files}
        onDelete={file => removeFile(file.name)}
      />
    </div>
  );
};
const ExpensesField = () => {
  const { eventData } = useEventFormContext();

  const total = useMemo(() => {
    const material = eventData.material_expenses || 0;
    const labour = eventData.labour_expenses || 0;
    return material + labour;
  }, [eventData.material_expenses, eventData.labour_expenses]);

  return (
    <>
      <FormControl
        boldLabelText
        label='Materiaalien osuus (€)'
        control={<MaterialExpensesInput />}
      />

      <FormControl
        boldLabelText
        label='Työn osuus (€)'
        control={<LabourExpensesInput />}
      />
      <div className='md:text-lg xs:text-base'>
        <Spacer
          dir='row'
          justify='between'
          full>
          <label>Yhteensä</label>
          <span className='font-semibold'>{total}€</span>
        </Spacer>
      </div>
    </>
  );
};

const DescriptionInput = () => {
  const { eventData } = useEventFormContext();

  return (
    <FormControl
      boldLabelText
      label='Lisätiedot'
      control={
        <textarea
          placeholder='Kirjoita lisätietoja tapahtumasta, materiaaleista, väreistä, huoneesta, yms.'
          name='description'
          spellCheck={false}
          required
          value={eventData.description}
        />
      }
    />
  );
};

const OtherField = () => {
  const { eventData } = useEventFormContext();

  return (
    <>
      <RenderOnCondition condition={eventData.service_work_type_id == -1}>
        <FormControl
          boldLabelText
          label='Otsikko'
          required
          control={
            <Input
              placeholder='Kirjoita tapahtuman otsikko...'
              name='title'
              required
              value={eventData.title}
            />
          }
        />
      </RenderOnCondition>

      <DescriptionInput />

      <FormControl
        boldLabelText
        label='Päiväys'
        required
        control={
          <Input
            type='date'
            name='date'
            defaultValue={eventData.date}
            value={eventData.date}
          />
        }
      />
    </>
  );
};

export const SharedEventDataInputs = ({ isEditing }) => {
  return (
    <>
      <OtherField />
      <ExpensesField />
      <RenderOnCondition condition={!isEditing}>
        <FilesField />
      </RenderOnCondition>
    </>
  );
};
