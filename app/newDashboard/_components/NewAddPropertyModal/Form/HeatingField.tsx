import { RadioButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import { usePropertyFormContext } from './PropertyForm';
import { HeatingType } from 'kotilogi-app/models/enums/HeatingType';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { lang } from 'kotilogi-app/lang';

export function HeatingField() {
  const { property: data } = usePropertyFormContext();

  return (
    <div className='flex w-full gap-2 [&>*]:w-full'>
      <Fieldset legend='Lämmitys'>
        <div className='flex xs:flex-col lg:flex-row gap-4 w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <Label boldText>Ensisijainen</Label>

            <RadioGroup groupName='primaryHeatingSystem'>
              {getEnumAsDigits(HeatingType)
                .filter(val => val != HeatingType.NONE)
                .map(type => (
                  <RadioButton
                    value={type}
                    defaultChecked={type == data.primaryHeatingSystem}
                    label={lang.heatingType[type]['fi']}
                  />
                ))}
            </RadioGroup>
          </div>

          <div className='flex flex-col gap-4 w-full xs:mt-8 lg:mt-0'>
            <Label boldText>Toissijainen</Label>
            <RadioGroup groupName='secondaryHeatingSystem'>
              {getEnumAsDigits(HeatingType)
                .filter(
                  val =>
                    val != HeatingType.DISTRICT &&
                    val != HeatingType.ELECTRIC &&
                    val != HeatingType.GROUND &&
                    val != HeatingType.OIL
                )
                .map(type => {
                  return (
                    <RadioButton
                      value={type}
                      defaultChecked={type == data.secondaryHeatingSystem}
                      label={lang.heatingType[type]['fi']}
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
