import { BoxFieldset } from '@/components/UI/BoxFieldset';
import { Input, FormControl } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from '../../PropertyFormContext';

export function InteriorField() {
  const {
    property: data,
    refs: { propertyTypes },
    updateByKey,
  } = usePropertyFormContext();

  const updateData = e => updateByKey('interior', e);
  return (
    <div className='flex flex-col gap-4 w-full'>
      <FormControl
        label={
          <>
            Asuintilojen pinta-ala <sup className='text-super'>m2</sup>
          </>
        }
        control={
          <Input
            onChange={updateData}
            data-testid='living-area-input'
            name='living_area'
            placeholder='Anna kohteen sisätilojen pinta-ala...'
            type='number'
            min='1'
            step={0.1}
            defaultValue={data.interior?.living_area}
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
            onChange={updateData}
            data-testid='other-area-input'
            name='other_area'
            placeholder='Anna muiden tilojen pinta-ala...'
            type='number'
            min='0'
            defaultValue={data.interior?.other_area}
          />
        }
      />

      <FormControl
        label='Huoneiden lukumäärä'
        control={
          <Input
            onChange={updateData}
            data-testid='room-count-input'
            type='number'
            name='room_count'
            placeholder='Anna huoneiden lukumäärä...'
            min='1'
            step='1'
            defaultValue={data.interior?.room_count}
          />
        }
      />

      <FormControl
        label={
          data.property_type_id == propertyTypes.find(type => type.name === 'Huoneisto').id
            ? 'Kerrosnumero'
            : 'Kerrosten lukumäärä'
        }
        control={
          <Input
            onChange={updateData}
            data-testid='floor-count-input'
            name='floor_count'
            step='1'
            min='1'
            defaultValue={data.interior?.floor_count}
            type='number'
            placeholder='Anna kerrosten lukumäärä...'
          />
        }
      />

      <FormControl
        label={'Vessojen lukumäärä'}
        control={
          <Input
            onChange={updateData}
            data-testid='wc-count-input'
            name='bathroom_count'
            placeholder='Anna vessojen lukumäärä'
            type='number'
            min={0}
            defaultValue={data.interior?.bathroom_count}
          />
        }
      />
    </div>
  );
}
