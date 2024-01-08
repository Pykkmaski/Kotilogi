import Form from "kotilogi-app/components/Form/Form";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { yardOwnershipTypes } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm, SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";

export default function ExteriorSection({currentData, onChangeHandler}){
    const {onUpdate} = useInfoPageContext();
    return (
        <EditCard title="Tontti">
            <SingleInputForm
                submitMethod={onUpdate}
                inputComponent={Input}
                initialInputProps={{
                    label: 'Pinta-ala',
                    description: 'Tontin pinta-ala neliömetreissä.',
                    name: 'yardArea',
                    defaultValue: currentData.yardArea,
                    onChange: onChangeHandler
                }}
            />
                
            <SingleSelectForm
                submitMethod={onUpdate}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Tontin Omistajuus',
                    description: 'Tontin omistajuuden tyyppi.',
                    name: 'yardOwnership',
                    defaultValue: currentData.yardOwnership,
                }}
                childProps={yardOwnershipTypes.map(type => {
                        return {
                            value: type,
                            children: type,
                        }
                    })
                }/>
        </EditCard> 
    );
}