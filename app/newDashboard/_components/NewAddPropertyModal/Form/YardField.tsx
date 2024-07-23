import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Group, Input, Label } from '@/components/UI/FormUtils';
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
            step={0.1}
            min={0.1}
            placeholder='Anna tontin pinta-ala...'
            defaultValue={data.yardArea / 100}
          />
        </Group>
      ) : null}
    </Fieldset>
  ) : null;
}
