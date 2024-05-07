import { RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';

export function TargetTypeField() {
  const { obj: property } = useObjectProviderContext() as { obj: Kotidok.PropertyType };

  return (
    <Fieldset legend='Kohdetyyppi'>
      <RadioGroup groupName='targetType'>
        <input
          type='radio'
          value='Kiinteistö'
          defaultChecked={property.targetType === 'Kiinteistö'}
        />

        <input
          type='radio'
          value='Huoneisto'
          defaultChecked={property.targetType === 'Huoneisto'}
        />
      </RadioGroup>
    </Fieldset>
  );
}
