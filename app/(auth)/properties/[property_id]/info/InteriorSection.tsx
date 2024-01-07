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
                inputElement={<Input 
                label="Pinta-ala" 
                description="Talon sisätilojen pinta-ala neliömetreissä."
                name="livingArea" defaultValue={currentData.livingArea} onChange={onChangeHandler} />}
/>

<SingleInputForm 
submitMethod={onUpdate}
inputElement={<Input 
        label={currentData.buildingType === 'Kerrostalo' ? 'Kerrosnumero' : 'Kerrosten Lukumäärä'} 
        description={
            currentData.buildingType === 'Kerrostalo' ? 
            'Missä kerroksessa asunto sijaitsee?' :
            'Montako kerrosta talossa on?'
        }
        name="floorCount" defaultValue={currentData.floorCount} onChange={onChangeHandler} />}
/>

<SingleInputForm 
submitMethod={onUpdate}
inputElement={<Input 
        label="Huoneiden lukumäärä" 
        description="Montako huonetta asunnossa on?"
        type="number" name="roomCount" defaultValue={currentData.roomCount} onChange={onChangeHandler} />}
/>

<SingleInputForm 
submitMethod={onUpdate}
inputElement={<Input 
        label="Vessojen lukumäärä" 
        description="Montako vessaa asunnossa on?"
        type="number" name="wcCount" defaultValue={currentData.wcCount} onChange={onChangeHandler} />}
/>

        </EditCard> 
    );
}