import { Input } from "kotilogi-app/components/Input/Input";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

export default function InteriorSection({propertyData, updateProperty}){
    return (
        <EditCard title="Sisätilat">
            <SingleInputForm 
                submitMethod={updateProperty}
                inputComponent={Input}
                initialInputProps={{
                    label: 'Pinta-ala',
                    description: 'Talon sisätilojen pinta-ala neliömetreissä.',
                    name: 'livingArea',
                    defaultValue: propertyData.livingArea,
                    type: 'number',
                }}
            />

            <SingleInputForm 
                submitMethod={updateProperty}
                inputComponent={Input}
                initialInputProps={{
                    label: propertyData.buildingType === 'Kerrostalo' ? 'Kerrosnumero' : 'Kerrosten Lukumäärä',
                    description: propertyData.buildingType === 'Kerrostalo' ? 
                    'Missä kerroksessa asunto sijaitsee?' :
                    'Montako kerrosta talossa on?',
                    name: 'floorCount',
                    defaultValue: propertyData.floorCount,
                    type: 'number'
                }}
            />

            <SingleInputForm 
                submitMethod={updateProperty}
                inputComponent={Input}
                initialInputProps={{
                    label: 'Huoneiden Määrä',
                    description: 'Montako huonetta asunnossa on?',
                    name: 'roomCount',
                    defaultValue: propertyData.roomCount,
                    type: "number",
                }}
            />

            <SingleInputForm 
                submitMethod={updateProperty}
                inputComponent={Input}
                initialInputProps={{
                    name: 'wcCount',
                    label: 'Vessojen Lukumäärä',
                    description: 'Montako vessaa asunnossa on?',
                    type: 'number',
                    defaultValue: propertyData.wcCount,
                }}
            />

        </EditCard> 
    );
}