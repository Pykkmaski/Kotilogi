import { Fieldset } from '@/components/UI/Fieldset';
import { Input, Group, Label, FormControl } from '@/components/UI/FormUtils';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';
import { useAddPropertyModalContext } from '../NewAddPropertyModal';

export function InteriorField() {
  const { property: data, updateData } = useAddPropertyModalContext();

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
        label={data.buildingType === 'Kerrostalo' ? 'Kerrosnumero' : 'Kerrosten lukumäärä'}
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
