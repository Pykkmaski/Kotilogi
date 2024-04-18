import { Select } from 'kotilogi-app/components/Input/Input';
import { buildingMaterials, colors } from 'kotilogi-app/constants';
import { ContentCard } from 'kotilogi-app/components/RoundedBox/RoundedBox';
import { SingleSelectForm } from 'kotilogi-app/components/SingleInputForm/SingleInputForm';

export default function BuildingSection({ propertyData, updateProperty }) {
  return (
    <div className='w-full'>
      <ContentCard title='Julkisivu'>
        <SingleSelectForm
          submitMethod={updateProperty}
          inputComponent={Select}
          childComponent={Select.Option}
          initialInputProps={{
            label: 'Rakennusmateriaali',
            description: 'Talon julkisivun rakennusmateriaali.',
            name: 'buildingMaterial',
            defaultValue: propertyData.buildingMaterial,
          }}
          childProps={buildingMaterials.map(type => {
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
            label: 'Väri',
            description: 'Talon suuntaa antava väri.',
            name: 'color',
            defaultValue: propertyData.color,
          }}
          childProps={colors.map(type => {
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
