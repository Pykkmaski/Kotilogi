import Form from "kotilogi-app/components/Form/Form";
import { Select } from "kotilogi-app/components/Input/Input";
import { buildingMaterials, buildingTypes, colors, energyClasses, primaryHeatingSystems, secondaryHeatingSystems } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";

export default function HeatingSection({currentData, onChangeHandler}){
    const {onUpdate} = useInfoPageContext();
    return (
        <EditCard title="Lämmitys">
            <SingleInputForm 
            onSubmit={onUpdate}
                inputElement={
                    <Select 
                        label="Ensisijainen" 
                        description="Talon ensisijainen lämmitystapa."
                        onChange={onChangeHandler} name="primaryHeatingSystem">
                        {
                            primaryHeatingSystems.map((val, index: number) => {
                                return (
                                    <option value={val} selected={val === currentData.primaryHeatingSystem} key={`primaryHeatingSystem-option-${index}`}>{val}</option>
                                );
                            })
                        }
                    </Select>
                }/>
                
            <SingleInputForm
            onSubmit={onUpdate}
                inputElement={
                    <Select 
                        label="Toissijainen" 
                        description="Talon toissijainen lämmitystapa."
                        onChange={onChangeHandler} name="secondaryHeatingSystem">
                        {
                            secondaryHeatingSystems.map((val, index: number) => {
                                return (
                                    <option value={val} selected={val === currentData.secondaryHeatingSystem} key={`secondaryHeatingSystem-option-${index}`}>{val}</option>
                                );
                            })
                        }
                    </Select>
                }/>
        </EditCard> 
    );
}