import { Fieldset } from '@/components/UI/Fieldset';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';
import { useAddPropertyModalContext } from '../NewAddPropertyModal';
import { Label } from '@/components/UI/FormUtils';

export function OtherInfoField() {
  const { property: data, updateData } = useAddPropertyModalContext();

  return (
    <Fieldset legend='Muut tiedot'>
      <div className='flex flex-row gap-4'>
        <input
          type='checkbox'
          name='hasGarage'
          className='aspect-square w-5'
          defaultChecked={data.hasGarage}
        />
        <Label>Autotalli</Label>
      </div>
    </Fieldset>
  );
}
