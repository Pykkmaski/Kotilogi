import { Input } from 'kotilogi-app/components/Input/Input';
import { ContentCard } from 'kotilogi-app/components/RoundedBox/RoundedBox';
import { SingleInputForm } from 'kotilogi-app/components/SingleInputForm/SingleInputForm';

export default function InteriorSection({ propertyData, updateProperty }) {
  return (
    <div className='w-full'>
      <ContentCard title='Sisätilat'>
        <SingleInputForm
          submitMethod={updateProperty}
          inputComponent={Input}
          initialInputProps={{
            label: 'Pinta-ala',
            description: 'Talon sisätilojen pinta-ala neliömetreissä.',
            name: 'livingArea',
            defaultValue: propertyData.livingArea,
            type: 'number',
            min: 0,
            step: '0.01',
          }}
        />

        <SingleInputForm
          submitMethod={updateProperty}
          inputComponent={Input}
          initialInputProps={{
            label: propertyData.buildingType === 'Kerrostalo' ? 'Kerrosnumero' : 'Kerrosten Lukumäärä',
            description: propertyData.buildingType === 'Kerrostalo' ? 'Missä kerroksessa asunto sijaitsee?' : 'Montako kerrosta talossa on?',
            name: 'floorCount',
            defaultValue: propertyData.floorCount,
            type: 'number',
            min: 1,
          }}
        />

        <SingleInputForm
          submitMethod={updateProperty}
          inputComponent={Input}
          initialInputProps={{
            label: 'Huoneiden Määrä',
            description: 'Kuinka monta huonetta asunnossa on?',
            name: 'roomCount',
            defaultValue: propertyData.roomCount,
            type: 'number',
            min: 1,
          }}
        />

        <SingleInputForm
          submitMethod={updateProperty}
          inputComponent={Input}
          initialInputProps={{
            name: 'wcCount',
            label: 'Vessojen Lukumäärä',
            description: 'Kuinka monta vessaa asunnossa on?',
            type: 'number',
            defaultValue: propertyData.wcCount,
            min: 1,
          }}
        />
      </ContentCard>
    </div>
  );
}
