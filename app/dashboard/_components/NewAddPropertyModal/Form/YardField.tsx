import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Group, Input, Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyForm';
import { HouseDataType } from 'kotilogi-app/dataAccess/types';

export function YardField() {
  const {
    property: data,
    yardOwnershipTypes,
    propertyTypes,
  } = usePropertyFormContext() as {
    property: HouseDataType;
    yardOwnershipTypes: TODO;
    propertyTypes: TODO;
  };

  console.log(yardOwnershipTypes);

  return data.propertyTypeId == propertyTypes['Kiinteistö'] ? (
    <Fieldset legend='Tontti'>
      <Label boldText>Omistus</Label>
      <RadioGroup groupName='yardOwnershipTypeId'>
        {Object.entries(yardOwnershipTypes).map(([name, id]: [string, number]) => (
          <RadioButton
            label={name}
            value={id}
            type='radio'
            defaultChecked={id == data.yardOwnershipTypeId}
          />
        ))}
      </RadioGroup>

      {data && data.yardOwnershipTypeId != yardOwnershipTypes['Ei Mitään'] ? (
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
            defaultValue={data.yardArea}
          />
        </Group>
      ) : null}
    </Fieldset>
  ) : null;
}
