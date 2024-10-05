'use client';

import { Fieldset } from '@/components/UI/Fieldset';
import { useEventFormContext } from './EventFormContext';
import { FormControl, Input } from '@/components/UI/FormUtils';

const ExpensesField = () => {
  const { mainData } = useEventFormContext();

  return (
    <Fieldset legend='Kulut'>
      <FormControl
        boldLabelText
        label='Materiaalien osuus (€)'
        control={
          <Input
            name='materialExpenses'
            type='number'
            defaultValue={0}
            value={mainData && mainData.materialExpenses}
            placeholder='Anna kulujen materiaaliosuus...'
            step={0.01}
            min={0}></Input>
        }
      />

      <FormControl
        boldLabelText
        label='Työn osuus (€)'
        control={
          <Input
            name='labourExpenses'
            type='number'
            defaultValue={0}
            value={mainData && mainData.labourExpenses}
            step={0.01}
            placeholder='Anna kulujen työosuus...'
            min={0}></Input>
        }
      />
    </Fieldset>
  );
};

const DescriptionInput = () => {
  const { mainData, typeData } = useEventFormContext();

  return (
    typeData.workTypeId == null ||
    (typeData.workTypeId == -1 && (
      <FormControl
        boldLabelText
        label='Kuvaus'
        control={
          <textarea
            placeholder='Kirjoita tapahtuman kuvaus...'
            name='description'
            spellCheck={false}
            required
            value={mainData.description}
          />
        }
      />
    ))
  );
};

const OtherField = () => {
  const { mainData, typeData } = useEventFormContext();

  return (
    <Fieldset legend='Yleistiedot'>
      {typeData.workTypeId == -1 && (
        <FormControl
          boldLabelText
          label='Otsikko'
          required
          control={
            <Input
              placeholder='Kirjoita tapahtuman otsikko...'
              name='title'
              required
              value={mainData.title}
            />
          }
        />
      )}

      <DescriptionInput />
      <FormControl
        boldLabelText
        label='Päiväys'
        required
        control={
          <Input
            type='date'
            name='date'
            defaultValue={mainData.date}
          />
        }
      />
    </Fieldset>
  );
};

export const SharedEventDataInputs = () => {
  return (
    <>
      <OtherField />
      <ExpensesField />
    </>
  );
};
