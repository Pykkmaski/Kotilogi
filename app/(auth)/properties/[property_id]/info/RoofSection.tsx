import Form from "kotilogi-app/components/Form/Form";
import { Select } from "kotilogi-app/components/Input/Input";
import { roofMaterials, roofTypes } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";

export default function RoofSection({currentData, onChangeHandler}){

    const {onUpdate} = useInfoPageContext();

    return (
        <EditCard title="Katto">
            <SingleInputForm 
                submitMethod={onUpdate}
                inputElement={
                <Select 
                    label="Kattotyyppi"
                    description="Katon tyyppi."
                    name="roofType" onChange={onChangeHandler}>
                    {
                        roofTypes.map((val, index: number) => (
                            <option value={val} key={`roof-type-${index}`} selected={val === currentData.roofType}>{val}</option>
                        ))
                    }
                </Select>
            }/>

            <SingleInputForm 
                submitMethod={onUpdate}
                inputElement={
                <Select 
                    label="Katon materiaali" 
                    description="Katon materiaali."
                    name="roofMaterial" onChange={onChangeHandler}>
                    {
                        roofMaterials.map((val, index: number) => (
                            <option value={val} key={`roof-mat-${index}`} selected={val === currentData.roofMaterial}>{val}</option>
                        ))
                    }
                </Select>}/>
        </EditCard>  
    );
}