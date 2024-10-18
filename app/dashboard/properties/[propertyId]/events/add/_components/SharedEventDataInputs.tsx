'use client';

import { Fieldset } from '@/components/UI/Fieldset';
import { useEventFormContext } from './EventFormContext';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

const ContractorInput = () => {
  const contractors = ['Vesivek', 'Blaablaa'];
  return (
    <RenderOnCondition condition={contractors.length > 0}>
      <FormControl
        label='Työn tekijä'
        helper='Itse tehdyssä työssä tämän voi jättää tyhjäksi.'
        control={
          <select>
            <option
              disabled
              selected>
              Valitse työn tekijä...
            </option>
            {contractors.map(c => (
              <option>{c}</option>
            ))}
          </select>
        }
      />
    </RenderOnCondition>
  );
};

const FilesField = () => {
  return (
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
  );
};
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
    <FormControl
      boldLabelText
      label='Lisätiedot'
      control={
        <textarea
          placeholder='Kirjoita lisätietoja tapahtumasta, materiaaleista, väreistä, huoneesta, yms.'
          name='description'
          spellCheck={false}
          required
          value={mainData.description}
        />
      }
    />
  );
};

const OtherField = () => {
  const { mainData, typeData } = useEventFormContext();

  return (
    <Fieldset legend='Yleistiedot'>
      <RenderOnCondition condition={typeData.workTypeId == -1}>
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
            defaultValue={mainData.date}
          />
        }
      />
    </Fieldset>
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
