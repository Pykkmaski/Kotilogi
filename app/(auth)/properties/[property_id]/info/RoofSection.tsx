import Form from "kotilogi-app/components/Form/Form";
import { Select } from "kotilogi-app/components/Input/Input";
import { roofMaterials, roofTypes } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm, SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";

export default function RoofSection({currentData, onChangeHandler}){

    const {onUpdate} = useInfoPageContext();

    return (
        <EditCard title="Katto">
            <SingleSelectForm 
                submitMethod={onUpdate}
                inputComponent={Select}
                childComponent={Select.Option}
                childProps={roofTypes.map(type => {
                    return {
                        value: type,
                        children: type,
                    }
                })}
                initialInputProps={{
                    label: 'Kattotyyppi',
                    description: 'Katon tyyppi.',
                    name: 'roofType',
                    defaultValue: currentData.roofType,
                    onChange: onChangeHandler,
                }}/>

            <SingleSelectForm 
                submitMethod={onUpdate}
                inputComponent={Select}
                childComponent={Select.Option}
                childProps={roofMaterials.map(type => {
                    return {
                        value: type,
                        children: type,
                    }
                })}
                initialInputProps={{
                    label: 'Kattomateriaali',
                    description: 'Katon materiaali.',
                    name: 'roofMaterial',
                    defaultValue: currentData.roofMaterial,
                    onChange: onChangeHandler,
                }}/>
        </EditCard>  
    );
}