import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Group, Input, Label } from '@/components/UI/FormUtils';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { yardOwnershipTypes } from 'kotilogi-app/constants';
import { useAddPropertyModalContext } from '../NewAddPropertyModal';
import { usePropertyFormContext } from './PropertyForm';
import { HouseDataType } from 'kotilogi-app/models/types';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { YardOwnershipType } from 'kotilogi-app/models/enums/YardOwnershipType';
import { getTranslation } from 'kotilogi-app/lang';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';

export function YardField() {
  const { property: data } = usePropertyFormContext() as { property: HouseDataType };

  return data.propertyType == PropertyType.HOUSE ? (
    <Fieldset legend='Tontti'>
      <Label boldText>Omistus</Label>
      <RadioGroup groupName='yardOwnershipType'>
        {getEnumAsDigits(YardOwnershipType).map(type => (
          <RadioButton
            label={getTranslation('yardOwnershipType', type)}
            value={type}
            type='radio'
            defaultChecked={type === data.yardOwnershipType}
          />
        ))}
      </RadioGroup>

      {data &&
      data.yardOwnershipType !== undefined &&
      data.yardOwnershipType != YardOwnershipType.NONE ? (
        <Group>
          <Label>
            Pinta-ala <sup className='text-super'>m2</sup>
          </Label>
          <Input
            name='yardArea'
            type='number'
            placeholder='Anna tontin pinta-ala...'
          />
        </Group>
      ) : null}
    </Fieldset>
  ) : null;
}
