import Form from "kotilogi-app/components/Form/Form";
import { Select } from "kotilogi-app/components/Input/Input";
import { buildingMaterials, buildingTypes, colors, energyClasses } from "kotilogi-app/constants";
import { Section } from "./Section";

export default function BuildingSection({currentData, onChangeHandler}){
    return (
        <Section title="Julkisivu">
            <Select label="Rakennusmateriaali" onChange={onChangeHandler} name="buildingMaterial">
                {
                    buildingMaterials.map((val, index: number) => {
                        return (
                            <option value={val} selected={val === currentData.buildingMaterial} key={`option-${index}`}>{val}</option>
                        );
                    })
                }
            </Select>
    
            <Select label="Väri" onChange={onChangeHandler} name="color">
                {
                    colors.map((val, index: number) => {
                        return (
                            <option value={val} selected={val === currentData.color} key={`option-${index}`}>{val}</option>
                        );
                    })
                }
            </Select>
        </Section> 
    );
}