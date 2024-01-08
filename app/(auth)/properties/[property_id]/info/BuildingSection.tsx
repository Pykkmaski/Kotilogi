import Form from "kotilogi-app/components/Form/Form";
import { Select } from "kotilogi-app/components/Input/Input";
import { buildingMaterials, buildingTypes, colors, energyClasses } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm, SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";

export default function BuildingSection({currentData, onChangeHandler}){
    const {onUpdate} = useInfoPageContext();
    return (
        <EditCard title="Julkisivu">
            <SingleSelectForm 
                submitMethod={onUpdate}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: "Rakennusmateriaali" ,
                    description: "Talon julkisivun rakennusmateriaali.",
                    onChange: onChangeHandler,
                    name:"buildingMaterial",
                    defaultValue: currentData.buildingMaterial,
                }}
                childProps={buildingMaterials.map(type => {
                    return {
                        value: type,
                        children: type,
                    }
                })}/>
            
            <SingleSelectForm 
                submitMethod={onUpdate}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: "Väri" ,
                    description: "Talon suuntaa antava väri.",
                    onChange: onChangeHandler,
                    name:"color",
                    defaultValue: currentData.color,
                }}
                childProps={colors.map(type => {
                    return {
                        value: type,
                        children: type,
                    }
                })}/>
        </EditCard> 
    );
}