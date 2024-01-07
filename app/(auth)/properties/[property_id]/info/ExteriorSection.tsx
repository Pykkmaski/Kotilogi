import Form from "kotilogi-app/components/Form/Form";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { yardOwnershipTypes } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";

export default function ExteriorSection({currentData, onChangeHandler}){
    const {onUpdate} = useInfoPageContext();
    return (
        <EditCard title="Tontti">
            <SingleInputForm
            onSubmit={onUpdate}
                inputElement={
                    <Input 
                        label="Pinta-ala" 
                        description="Tontin pinta-ala neliömetreissä."
                        name="yardArea" defaultValue={currentData.yardArea} onChange={onChangeHandler}/>
                }/>
                
            <SingleInputForm
            onSubmit={onUpdate}
                inputElement={
                    <Select 
                        label="Omistus" 
                        description="Tontin omistajuuden tyyppi."
                        name="yardOwnership" onChange={onChangeHandler}>
                        {
                            yardOwnershipTypes.map((val, index: number) => {
                                return (
                                    <option value={val} selected={val === currentData.yardOwnership} key={`yardOwnership-option-${index}`}>{val}</option>
                                );
                            })
                        }
                    </Select>
                }/>
        </EditCard> 
    );
}