import { BoxFieldset } from '@/components/UI/Fieldset';
import { Input, FormControl } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from '../../PropertyFormContext';

export function InteriorField() {
  const {
    property: data,
    refs: { propertyTypes },
  } = usePropertyFormContext();

  return (
    <BoxFieldset legend='Sisätilat'>
      <FormControl
        label={
          <>
            Pinta-ala <sup className='text-super'>m2</sup>
          </>
        }
        control={
          <Input
            data-testid='living-area-input'
            name='living_area'
            placeholder='Anna kohteen sisätilojen pinta-ala...'
            type='number'
            min='1'
            step={0.1}
            defaultValue={data.living_area}
          />
        }
      />

      <FormControl
        label={
          <>
            Muut tilat <sup className='text-super'>m2</sup>
          </>
        }
        control={
          <Input
            data-testid='other-area-input'
            name='other_area'
            placeholder='Anna muiden tilojen pinta-ala...'
            type='number'
            min='0'
            defaultValue={data.other_area}
          />
        }
      />

      <FormControl
        label='Huoneiden lukumäärä'
        control={
          <Input
            data-testid='room-count-input'
            type='number'
            name='room_count'
            placeholder='Anna huoneiden lukumäärä...'
            min='1'
            step='1'
            defaultValue={data.room_count}
          />
        }
      />

      <FormControl
        label={
          data.propertyTypeId == propertyTypes.find(type => type.name === 'Huoneisto').id
            ? 'Kerrosnumero'
            : 'Kerrosten lukumäärä'
        }
        control={
          <Input
            data-testid='floor-count-input'
            name='floor_count'
            step='1'
            min='1'
            defaultValue={data.floor_count}
            type='number'
            placeholder='Anna kerrosten lukumäärä...'
          />
        }
      />

      <FormControl
        label={'Vessojen lukumäärä'}
        control={
          <Input
            data-testid='wc-count-input'
            name='bathroom_count'
            placeholder='Anna vessojen lukumäärä'
            type='number'
            min={0}
            defaultValue={data.bathroom_count}
          />
        }
      />
    </BoxFieldset>
  );
}
