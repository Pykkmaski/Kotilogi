import Form from "kotilogi-app/components/Form/Form";
import { Select } from "kotilogi-app/components/Input/Input";
import { buildingMaterials, buildingTypes, colors, energyClasses } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";

export default function BuildingSection({currentData, onChangeHandler}){
    const {onUpdate} = useInfoPageContext();
    return (
        <EditCard title="Julkisivu">
            <SingleInputForm 
                submitMethod={onUpdate}
                inputElement={
                    <Select 
                        label="Rakennusmateriaali" 
                        description="Talon julkisivun rakennusmateriaali."
                        onChange={onChangeHandler} name="buildingMaterial">
                        {
                            buildingMaterials.map((val, index: number) => {
                                return (
                                    <option value={val} selected={val === currentData.buildingMaterial} key={`option-${index}`}>{val}</option>
                                );
                            })
                        }
                    </Select>
                }/>
            
            <SingleInputForm
                submitMethod={onUpdate}
                inputElement={
                    <Select 
                        label="Väri" 
                        description="Talon julkisivun suuntaa antava väri."
                        onChange={onChangeHandler} name="color">
                        {
                            colors.map((val, index: number) => {
                                return (
                                    <option value={val} selected={val === currentData.color} key={`option-${index}`}>{val}</option>
                                );
                            })
                        }
                    </Select>
                }/>
        </EditCard> 
    );
}