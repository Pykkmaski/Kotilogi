import Form from "kotilogi-app/components/Form/Form";
import { Input } from "kotilogi-app/components/Input/Input";
import { buildingTypes, colors, energyClasses } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";

export default function InteriorSection({currentData, onChangeHandler}){
    const {onUpdate} = useInfoPageContext();

    return (
        <EditCard title="Sisätilat">
            <SingleInputForm 
                submitMethod={onUpdate}
                inputComponent={Input}
                initialInputProps={{
                    label: 'Pinta-ala',
                    description: 'Talon sisätilojen pinta-ala neliömetreissä.',
                    name: 'livingArea',
                    defaultValue: currentData.livingArea,
                    onChange: onChangeHandler,
                    type: 'number',
                }}
            />

            <SingleInputForm 
                submitMethod={onUpdate}
                inputComponent={Input}
                initialInputProps={{
                    label: currentData.buildingType === 'Kerrostalo' ? 'Kerrosnumero' : 'Kerrosten Lukumäärä',
                    description: currentData.buildingType === 'Kerrostalo' ? 
                    'Missä kerroksessa asunto sijaitsee?' :
                    'Montako kerrosta talossa on?',
                    name: 'floorCount',
                    defaultValue: currentData.floorCount,
                    onChange: onChangeHandler,
                    type: 'number'
                }}
            />

            <SingleInputForm 
                submitMethod={onUpdate}
                inputComponent={Input}
                initialInputProps={{
                    label: 'Huoneiden Määrä',
                    description: 'Montako huonetta asunnossa on?',
                    name: 'roomCount',
                    defaultValue: currentData.roomCount,
                    onChange: onChangeHandler,
                    type: "number",
                }}
            />

            <SingleInputForm 
                submitMethod={onUpdate}
                inputComponent={Input}
                initialInputProps={{
                    name: 'wcCount',
                    label: 'Vessojen Lukumäärä',
                    description: 'Montako vessaa asunnossa on?',
                    type: 'number',
                    defaultValue: currentData.wcCount,
                    onChange: onChangeHandler,
                }}
            />

        </EditCard> 
    );
}