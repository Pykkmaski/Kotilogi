import Form from "kotilogi-app/components/Form/Form";
import { Select } from "kotilogi-app/components/Input/Input";
import { roofMaterials, roofTypes } from "kotilogi-app/constants";
import { Section } from "./Section";

export default function RoofSection({currentData, onChangeHandler}){
    return (
        <Section title="Katto">
            <Select label="Kattotyyppi" name="roofType" onChange={onChangeHandler}>
                {
                    roofTypes.map((val, index: number) => {
                        return (
                            <option value={val} key={`roof-type-${index}`} selected={val === currentData.roofType}>{val}</option>
                        );
                    })
                }
            </Select>

            <Select label="Katon materiaali" name="roofMaterial" onChange={onChangeHandler}>
                {
                    roofMaterials.map((val, index: number) => {
                        return (
                            <option value={val} key={`roof-mat-${index}`} selected={val === currentData.roofMaterial}>{val}</option>
                        );
                    })
                }
            </Select>
        </Section>  
    );
}