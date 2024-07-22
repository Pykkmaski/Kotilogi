import { Select } from '@/components/Feature/Input';
import { roofMaterials, roofTypes } from 'kotilogi-app/constants';
import { ContentCard } from '@/components/UI/RoundedBox';
import { SingleSelectForm } from '@/components/Feature/SingleInputForm/SingleInputForm';
import { RoofType } from 'kotilogi-app/models/enums/RoofType';

export default function RoofSection({ propertyData, updateProperty }) {
  return (
    <div className='w-full'>
      <ContentCard title='Katto'>
        <SingleSelectForm
          submitMethod={updateProperty}
          inputComponent={Select}
          childComponent={Select.Option}
          childProps={roofTypes.map(type => {
            return {
              value: type,
              children: type,
            };
          })}
          initialInputProps={{
            label: 'Kattotyyppi',
            description: 'Katon tyyppi.',
            name: 'roofType',
            defaultValue: propertyData.roofType || RoofType.OTHER,
          }}
        />

        <SingleSelectForm
          submitMethod={updateProperty}
          inputComponent={Select}
          childComponent={Select.Option}
          childProps={roofMaterials.map(type => {
            return {
              value: type,
              children: type,
            };
          })}
          initialInputProps={{
            label: 'Kattomateriaali',
            description: 'Katon materiaali.',
            name: 'roofMaterial',
            defaultValue: propertyData.roofMaterial || roofMaterials.at(-1),
          }}
        />
      </ContentCard>
    </div>
  );
}
