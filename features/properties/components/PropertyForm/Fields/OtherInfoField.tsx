import { BoxFieldset } from '@/components/UI/BoxFieldset';
import { Checkbox, CheckboxLabel, FormControl, Input } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from '../../PropertyFormContext';

import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import Link from 'next/link';

export function OtherInfoField() {
  const {
    property: data,
    refs: { propertyTypes, energyClasses },
    updateData,
  } = usePropertyFormContext() as TODO;

  return (
    <div className='flex flex-col gap-4 w-full'>
      <FormControl
        label='Energialuokka'
        control={
          <ChipRadioGroup
            onChange={e => {
              //Convert the value to an integer
              updateData(e);
            }}
            name='energy_class_id'
            dataArray={energyClasses.map(c => ({ label: c.name, id: parseInt(c.id) }))}
            labelKey='label'
            valueKey='id'
            currentValue={data.energy_class_id}
          />
        }
      />
      <FormControl
        label='Energialuokituksen vuosi'
        helper={
          <Link
            target='_blank'
            className='text-orange-500'
            href='https://www.omakotiliitto.fi/jasenelle/tietopankki/vinkit-ja-oppaat/maaraykset-ja-saadokset/'>
            Lue lisää energialuokituksesta
          </Link>
        }
        control={
          <Input
            type='number'
            name='energy_class_year'
            value={data.energy_class_year}
            min={2008}
            max={2018}
            step={10}
            onChange={updateData}
            placeholder='Anna energialuokituksen voimassaolovuosi...'
          />
        }
      />
      <CheckboxLabel
        label='Autotalli'
        control={
          <Checkbox
            data-testid='garage-checkbox'
            name='has_garage'
            defaultChecked={data.has_garage}
            onChange={updateData}
          />
        }
      />
      <RenderOnCondition condition={data.property_type_id == propertyTypes['Huoneisto']}>
        <CheckboxLabel
          label='Parveke'
          control={
            <Checkbox
              data-testid='balcony-checkbox'
              name='hasBalcony'
              defaultChecked={data.hasBalcony}
              onChange={updateData}
            />
          }
        />
      </RenderOnCondition>
    </div>
  );
}
