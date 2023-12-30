import Form from "kotilogi-app/components/Form/Form";
import { Select } from "kotilogi-app/components/Input/Input";
import { buildingMaterials, buildingTypes, colors, energyClasses, primaryHeatingSystems, secondaryHeatingSystems } from "kotilogi-app/constants";
import { Section } from "./Section";

export default function HeatingSection({currentData, onChangeHandler}){
    return (
        <Section title="Lämmitys">
          
                <Select label="Ensisijainen" onChange={onChangeHandler} name="primaryHeatingSystem">
                    {
                        primaryHeatingSystems.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.primaryHeatingSystem} key={`primaryHeatingSystem-option-${index}`}>{val}</option>
                            );
                        })
                    }
                </Select>
                
                <Select label="Toissijainen" onChange={onChangeHandler} name="secondaryHeatingSystem">
                    {
                        secondaryHeatingSystems.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.secondaryHeatingSystem} key={`secondaryHeatingSystem-option-${index}`}>{val}</option>
                            );
                        })
                    }
                </Select>
  
        </Section> 
    );
}