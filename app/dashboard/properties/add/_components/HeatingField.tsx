import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyFormContext';

export function HeatingField() {
  const { property: data, heatingTypes } = usePropertyFormContext();

  return (
    <div className='flex w-full gap-2 [&>*]:w-full'>
      <Fieldset legend='Lämmitys'>
        <div className='flex xs:flex-col lg:flex-row gap-4 w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <Label boldText>Ensisijainen</Label>

            <RadioGroup groupName='primaryHeatingSystemId'>
              {Object.entries(heatingTypes)
                .filter(([name, id]: [string, number]) => id != heatingTypes['Ei Mitään'])
                .map(([name, id]: [string, number]) => (
                  <RadioButton
                    data-testid={`primary-heating-radio-${id}`}
                    value={id}
                    defaultChecked={id == data.primaryHeatingSystemId}
                    label={name}
                  />
                ))}
            </RadioGroup>
          </div>

          <div className='flex flex-col gap-4 w-full xs:mt-8 lg:mt-0'>
            <Label boldText>Toissijainen</Label>
            <RadioGroup groupName='secondaryHeatingSystemId'>
              {Object.entries(heatingTypes)
                .filter(
                  ([name, id]: [string, number]) =>
                    id != heatingTypes['Kaukolämpö'] &&
                    id != heatingTypes['Sähkö'] &&
                    id != heatingTypes['Maalämpö'] &&
                    id != heatingTypes['Öljy']
                )
                .map(([name, id]: [string, number]) => {
                  return (
                    <RadioButton
                      data-testid={`secondary-heating-radio-${id}`}
                      value={id}
                      defaultChecked={id == data.secondaryHeatingSystemId}
                      label={name}
                    />
                  );
                })}
            </RadioGroup>
          </div>
        </div>
      </Fieldset>
    </div>
  );
}
