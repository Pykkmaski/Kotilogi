import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';
import { useAddPropertyModalContext } from '../NewAddPropertyModal';
import { Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyForm';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { getTranslation } from 'kotilogi-app/lang';

export function TargetTypeField() {
  const { property: data } = usePropertyFormContext();

  return (
    <Fieldset legend='Kohde'>
      <Label
        boldText
        required>
        Tyyppi
      </Label>
      <RadioGroup groupName='propertyType'>
        <RadioButton
          label={getTranslation('propertyType', PropertyType.HOUSE)}
          data-testid='target-property-input'
          type='radio'
          value={PropertyType.HOUSE}
          required
          defaultChecked={data.propertyType === PropertyType.HOUSE}
        />

        <RadioButton
          label={getTranslation('propertyType', PropertyType.APT)}
          data-testid='target-appartment-input'
          type='radio'
          value={PropertyType.APT}
          required
          defaultChecked={data.propertyType === PropertyType.APT}
        />
      </RadioGroup>
    </Fieldset>
  );
}
