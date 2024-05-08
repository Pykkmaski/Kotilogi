import { RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { Label } from '@/components/UI/FormUtils';
import { useObjectProviderContext } from '@/components/Util/ObjectProvider';
import { usePropertyProviderContext } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/PropertyContextProvider';
import { primaryHeatingSystems, secondaryHeatingSystems } from 'kotilogi-app/constants';
import { useAddPropertyModalContext } from '../NewAddPropertyModal';

export function HeatingField() {
  const { property: data } = useAddPropertyModalContext();

  return (
    <div className='flex w-full gap-2 [&>*]:w-full'>
      <Fieldset legend='Lämmitys'>
        <div className='flex xs:flex-col lg:flex-row gap-4 w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <Label boldText>Ensisijainen</Label>

            <RadioGroup groupName='primaryHeatingSystem'>
              {primaryHeatingSystems.map(type => (
                <input
                  type='radio'
                  value={type}
                  checked={type === data.primaryHeatingSystem}
                />
              ))}
            </RadioGroup>
          </div>

          <div className='flex flex-col gap-4 w-full xs:mt-8 lg:mt-0'>
            <Label boldText>Toissijainen</Label>
            <RadioGroup groupName='secondaryHeatingSystem'>
              {secondaryHeatingSystems.map(type => (
                <input
                  type='radio'
                  value={type}
                  checked={type === data.secondaryHeatingSystem}
                />
              ))}
            </RadioGroup>
          </div>
        </div>
      </Fieldset>
    </div>
  );
}
