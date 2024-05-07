import { Fieldset } from '@/components/UI/Fieldset';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';

export function OtherInfoField() {
  const { obj: data } = useObjectProviderContext() as { obj: Kotidok.PropertyType };

  return (
    <Fieldset legend='Muut tiedot'>
      <div className='flex flex-row gap-4'>
        <input
          type='checkbox'
          name='hasGarage'
          className='aspect-square w-5'
          defaultChecked={data.hasGarage}
        />
        <label>Autotalli</label>
      </div>
    </Fieldset>
  );
}
