import { RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';
import { useAddPropertyModalContext } from '../NewAddPropertyModal';
import { Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyForm';

export function TargetTypeField() {
  const { property: data } = usePropertyFormContext();

  return (
    <Fieldset legend='Kohde'>
      <Label
        boldText
        required>
        Tyyppi
      </Label>
      <RadioGroup groupName='targetType'>
        <input
          data-testid='target-property-input'
          type='radio'
          value='Kiinteistö'
          required
          defaultChecked={data.targetType === 'Kiinteistö'}
        />

        <input
          data-testid='target-appartment-input'
          type='radio'
          value='Huoneisto'
          required
          defaultChecked={data.targetType === 'Huoneisto'}
        />
      </RadioGroup>
    </Fieldset>
  );
}
