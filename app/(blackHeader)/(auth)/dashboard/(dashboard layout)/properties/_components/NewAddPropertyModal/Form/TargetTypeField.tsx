import { RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';
import { useAddPropertyModalContext } from '../NewAddPropertyModal';

export function TargetTypeField() {
  const { property: data } = useAddPropertyModalContext();

  return (
    <Fieldset legend='Kohdetyyppi'>
      <RadioGroup groupName='targetType'>
        <input
          type='radio'
          value='Kiinteistö'
          defaultChecked={data.targetType === 'Kiinteistö'}
        />

        <input
          type='radio'
          value='Huoneisto'
          defaultChecked={data.targetType === 'Huoneisto'}
        />
      </RadioGroup>
    </Fieldset>
  );
}