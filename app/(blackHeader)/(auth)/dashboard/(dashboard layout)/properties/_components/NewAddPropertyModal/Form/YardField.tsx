import { RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Group, Input, Label } from '@/components/UI/FormUtils';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { yardOwnershipTypes } from 'kotilogi-app/constants';

export function YardField() {
  const { obj: data } = useObjectProviderContext() as { obj: Kotidok.PropertyType };
  return (
    <Fieldset legend='Tontti'>
      <Label>
        <span className='font-semibold'>Omistus</span>
      </Label>
      <RadioGroup groupName='yardOwnership'>
        {yardOwnershipTypes.map(type => (
          <input
            value={type}
            type='radio'
            onChange={
              type === 'Ei Mitään'
                ? e => {
                    const { checked } = e.target;
                    if (checked) {
                      delete data.yardArea;
                    }
                  }
                : null
            }
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
