import { Fieldset } from '@/components/UI/Fieldset';
import { Input, Group } from '@/components/UI/FormUtils';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';

export function InteriorField() {
  const { obj: data } = useObjectProviderContext() as { obj: Kotidok.PropertyType };

  return (
    <Fieldset legend='Sisätilat'>
      <Group>
        <label>
          Pinta-ala <sup className='text-super'>m2</sup>
        </label>
        <Input
          name='livingArea'
          placeholder='Anna kohteen sisätilojen pinta-ala...'
          type='number'
          min='1'
          defaultValue={data.livingArea}
        />
      </Group>

      <Group>
        <label>
          Muut tilat <sup className='text-super'>m2</sup>
        </label>
        <Input
          name='otherArea'
          placeholder='Anna muiden tilojen pinta-ala...'
          type='number'
          min='0'
          defaultValue={data.otherArea}
        />
      </Group>

      <Group>
        <label>Huoneiden lukumäärä</label>
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
        <label>{data.buildingType === 'Kerrostalo' ? 'Kerrosnumero' : 'Kerrosten lukumäärä'}</label>
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
        <label>Vessojen lukumäärä</label>
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
