import { Select } from "kotilogi-app/components/Input/Input";
import { roofMaterials, roofTypes } from "kotilogi-app/constants";
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

export default function RoofSection({propertyData, updateProperty}){
    return (
        <div className="w-full">
<ContentCard title="Katto">
            <SingleSelectForm 
                submitMethod={updateProperty}
                inputComponent={Select}
                childComponent={Select.Option}
                childProps={roofTypes.map(type => {
                    return {
                        value: type,
                        children: type,
                    }
                })}
                initialInputProps={{
                    label: 'Kattotyyppi',
                    description: 'Katon tyyppi.',
                    name: 'roofType',
                    defaultValue: propertyData.roofType,
                }}/>

            <SingleSelectForm 
                submitMethod={updateProperty}
                inputComponent={Select}
                childComponent={Select.Option}
                childProps={roofMaterials.map(type => {
                    return {
                        value: type,
                        children: type,
                    }
                })}
                initialInputProps={{
                    label: 'Kattomateriaali',
                    description: 'Katon materiaali.',
                    name: 'roofMaterial',
                    defaultValue: propertyData.roofMaterial,
                }}/>
        </ContentCard>  
        </div>
        
    );
}