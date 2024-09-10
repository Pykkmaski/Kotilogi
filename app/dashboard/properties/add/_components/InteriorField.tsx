import { Fieldset } from '@/components/UI/Fieldset';
import { Input, FormControl } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyFormContext';

export function InteriorField() {
  const { property: data, propertyTypes } = usePropertyFormContext();

  return (
    <Fieldset legend='Sisätilat'>
      <FormControl
        label={
          <>
            Pinta-ala <sup className='text-super'>m2</sup>
          </>
        }
        control={
          <Input
            data-testid='living-area-input'
            name='livingArea'
            placeholder='Anna kohteen sisätilojen pinta-ala...'
            type='number'
            min='1'
            step={0.1}
            defaultValue={data.livingArea}
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
            name='otherArea'
            placeholder='Anna muiden tilojen pinta-ala...'
            type='number'
            min='0'
            defaultValue={data.otherArea}
          />
        }
      />

      <FormControl
        label='Huoneiden lukumäärä'
        control={
          <Input
            data-testid='room-count-input'
            type='number'
            name='roomCount'
            placeholder='Anna huoneiden lukumäärä...'
            min='1'
            step='1'
            defaultValue={data.roomCount}
          />
        }
      />

      <FormControl
        label={
          data.propertyTypeId == propertyTypes['Huoneisto'] ? 'Kerrosnumero' : 'Kerrosten lukumäärä'
        }
        control={
          <Input
            data-testid='floor-count-input'
            name='floorCount'
            step='1'
            min='1'
            defaultValue={data.floorCount}
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
            name='wcCount'
            placeholder='Anna vessojen lukumäärä'
            type='number'
            min={0}
            defaultValue={data.wcCount}
          />
        }
      />
    </Fieldset>
  );
}
