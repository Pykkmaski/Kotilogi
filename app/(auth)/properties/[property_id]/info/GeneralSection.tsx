import Form from "kotilogi-app/components/Form/Form";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { buildingTypes, colors, energyClasses } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";


export default function GeneralSection({currentData, onChangeHandler}){

    const {onUpdate} = useInfoPageContext();
    
    return (
        <EditCard title="Yleistiedot">
            <SingleInputForm 
                submitMethod={onUpdate}
                inputComponent={Input}
                initialInputProps={{
                    label: "Osoite",
                    description: "Talon katuosoite.",
                    autoComplete: "off",
                    name: "title",
                    required: true,
                    defaultValue: currentData.title,
                    onChange: onChangeHandler,
                }}/>
        </EditCard> 
    );
}