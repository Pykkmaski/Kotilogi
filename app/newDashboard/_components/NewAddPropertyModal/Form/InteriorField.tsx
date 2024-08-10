import { Fieldset } from '@/components/UI/Fieldset';
import { Input, FormControl } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyForm';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';

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
          data.propertyTypeId === propertyTypes['Huoneisto']
            ? 'Kerrosnumero'
            : 'Kerrosten lukumäärä'
        }
        control={
          <Input
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
