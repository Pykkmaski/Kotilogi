import { Input, Select } from "kotilogi-app/components/Input/Input";
import { yardOwnershipTypes } from "kotilogi-app/constants";
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { SingleInputForm, SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

export default function ExteriorSection({propertyData, updateProperty}){

    return (
        <div className="w-full">
            <ContentCard title="Tontti">
            <SingleInputForm
                submitMethod={updateProperty}
                inputComponent={Input}
                initialInputProps={{
                    label: 'Pinta-ala',
                    description: 'Tontin pinta-ala neliömetreissä.',
                    name: 'yardArea',
                    defaultValue: propertyData.yardArea,
                    min: 0,
                    step: '0.01',
                }}
            />
                
            <SingleSelectForm
                submitMethod={updateProperty}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Tontin Omistajuus',
                    description: 'Tontin omistajuuden tyyppi.',
                    name: 'yardOwnership',
                    defaultValue: propertyData.yardOwnership,
                }}
                childProps={yardOwnershipTypes.map(type => {
                        return {
                            value: type,
                            children: type,
                        }
                    })
                }/>
        </ContentCard> 
        </div>
        
    );
}