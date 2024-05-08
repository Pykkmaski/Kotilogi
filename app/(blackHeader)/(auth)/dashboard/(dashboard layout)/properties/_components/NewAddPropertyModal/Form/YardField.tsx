import { RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Group, Input, Label } from '@/components/UI/FormUtils';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { yardOwnershipTypes } from 'kotilogi-app/constants';
import { useAddPropertyModalContext } from '../NewAddPropertyModal';

export function YardField() {
  const { property: data, updateData } = useAddPropertyModalContext();

  return (
    <Fieldset legend='Tontti'>
      <Label boldText>Omistus</Label>
      <RadioGroup groupName='yardOwnership'>
        {yardOwnershipTypes.map(type => (
          <input
            value={type}
            type='radio'
          />
        ))}
      </RadioGroup>

      {data && data.yardOwnership !== undefined && data.yardOwnership !== 'Ei Mitään' ? (
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
  );
}
