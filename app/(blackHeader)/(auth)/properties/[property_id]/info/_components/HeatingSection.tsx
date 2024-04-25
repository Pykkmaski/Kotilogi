import { Select } from '@/components/Feature/Input';
import { primaryHeatingSystems, secondaryHeatingSystems } from 'kotilogi-app/constants';
import { ContentCard } from '@/components/UI/RoundedBox';
import { SingleSelectForm } from '@/components/Feature/SingleInputForm/SingleInputForm';

export default function HeatingSection({ propertyData, updateProperty }) {
  return (
    <div className='w-full'>
      <ContentCard title='Lämmitys'>
        <SingleSelectForm
          submitMethod={updateProperty}
          inputComponent={Select}
          childComponent={Select.Option}
          initialInputProps={{
            label: 'Ensisijainen',
            description: 'Ensisijainen lämmitysmenetelmä.',
            name: 'primaryHeatingSystem',
            defaultValue: propertyData.primaryHeatingSystem || primaryHeatingSystems[0],
          }}
          childProps={primaryHeatingSystems.map(type => {
            return {
              value: type,
              children: type,
            };
          })}
        />

        <SingleSelectForm
          submitMethod={updateProperty}
          inputComponent={Select}
          childComponent={Select.Option}
          initialInputProps={{
            label: 'Toissijainen',
            description: 'Toissijainen lämmitysmenetelmä.',
            name: 'secondaryHeatingSystem',
            defaultValue: propertyData.secondaryHeatingSystem || secondaryHeatingSystems[0],
          }}
          childProps={secondaryHeatingSystems.map(type => {
            return {
              value: type,
              children: type,
            };
          })}
        />
      </ContentCard>
    </div>
  );
}
