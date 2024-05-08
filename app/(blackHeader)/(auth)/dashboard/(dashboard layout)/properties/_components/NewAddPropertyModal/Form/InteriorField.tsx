import { Fieldset } from '@/components/UI/Fieldset';
import { Input, Group, Label } from '@/components/UI/FormUtils';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';
import { useAddPropertyModalContext } from '../NewAddPropertyModal';

export function InteriorField() {
  const { property: data, updateData } = useAddPropertyModalContext();

  return (
    <Fieldset legend='Sisätilat'>
      <Group>
        <Label>
          Pinta-ala <sup className='text-super'>m2</sup>
        </Label>
        <Input
          name='livingArea'
          placeholder='Anna kohteen sisätilojen pinta-ala...'
          type='number'
          min='1'
          defaultValue={data.livingArea}
        />
      </Group>

      <Group>
        <Label>
          Muut tilat <sup className='text-super'>m2</sup>
        </Label>
        <Input
          name='otherArea'
          placeholder='Anna muiden tilojen pinta-ala...'
          type='number'
          min='0'
          defaultValue={data.otherArea}
        />
      </Group>

      <Group>
        <Label>Huoneiden lukumäärä</Label>
        <Input
          type='number'
          name='roomCount'
          placeholder='Anna huoneiden lukumäärä...'
          min='1'
          step='1'
          defaultValue={data.roomCount}
        />
      </Group>

      <Group>
        <Label>{data.buildingType === 'Kerrostalo' ? 'Kerrosnumero' : 'Kerrosten lukumäärä'}</Label>
        <Input
          name='floorCount'
          step='1'
          min='1'
          defaultValue={data.floorCount}
          type='number'
          placeholder='Anna kerrosten lukumäärä...'
        />
      </Group>

      <Group>
        <Label>Vessojen lukumäärä</Label>
        <Input
          name='wcCount'
          placeholder='Anna vessojen lukumäärä'
          type='number'
          min={0}
          defaultValue={data.wcCount}
        />
      </Group>
    </Fieldset>
  );
}
