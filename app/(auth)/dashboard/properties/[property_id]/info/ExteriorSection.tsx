import Form from "kotilogi-app/components/Form/Form";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { yardOwnershipTypes } from "kotilogi-app/constants";
import { Section } from "./Section";

export default function ExteriorSection({currentData, onChangeHandler}){
    return (
        <Section title="Tontti">
         
                <Input label="Pinta-ala(m2)" name="yardArea" defaultValue={currentData.yardArea} onChange={onChangeHandler}/>
     
                <Select label="Omistus" name="yardOwnership" onChange={onChangeHandler}>
                    {
                        yardOwnershipTypes.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.yardOwnership} key={`yardOwnership-option-${index}`}>{val}</option>
                            );
                        })
                    }
                </Select>
       
        </Section> 
    );
}