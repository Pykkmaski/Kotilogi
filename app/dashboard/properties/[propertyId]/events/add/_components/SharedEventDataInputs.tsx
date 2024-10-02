import { Fieldset } from '@/components/UI/Fieldset';
import { useEventContext } from './EventContext';
import { FormControl, Input } from '@/components/UI/FormUtils';

const ExpensesField = () => {
  const { event: data } = useEventContext();

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
            value={data && data.materialExpenses}
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
            value={data && data.labourExpenses}
            step={0.01}
            placeholder='Anna kulujen työosuus...'
            min={0}></Input>
        }
      />
    </Fieldset>
  );
};

const DescriptionInput = () => {
  const { event: data } = useEventContext();

  return (
    data.workTypeId === 'null' ||
    (data.workTypeId == '-1' && (
      <FormControl
        boldLabelText
        label='Kuvaus'
        control={
          <textarea
            placeholder='Kirjoita tapahtuman kuvaus...'
            name='description'
            spellCheck={false}
            required
            value={data.description}
          />
        }
      />
    ))
  );
};

const OtherField = () => {
  const { event: data } = useEventContext();

  return (
    <Fieldset legend='Yleistiedot'>
      {data.workTypeId == '-1' && (
        <FormControl
          boldLabelText
          label='Otsikko'
          required
          control={
            <Input
              placeholder='Kirjoita tapahtuman otsikko...'
              name='title'
              required
              value={data.title}
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
            defaultValue={data.date}
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
