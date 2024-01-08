import { Select } from "kotilogi-app/components/Input/Input";
import { primaryHeatingSystems, secondaryHeatingSystems } from "kotilogi-app/constants";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

export default function HeatingSection({propertyData, updateProperty}){

    return (
        <EditCard title="Lämmitys">
            <SingleSelectForm 
                submitMethod={updateProperty}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Ensisijainen',
                    description: 'Ensisijainen lämmitysmenetelmä.',
                    name: 'primaryHeatingSystem',
                    defaultValue: propertyData.primaryHeatingSystem,
                }}
                childProps={primaryHeatingSystems.map(type => {
                        return {
                            value: type,
                            children: type,
                        }
                    })
                }/>
                
            <SingleSelectForm 
                submitMethod={updateProperty}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Toissijainen',
                    description: 'Toissijainen lämmitysmenetelmä.',
                    name: 'secondaryHeatingSystem',
                    defaultValue: propertyData.secondaryHeatingSystem,
                }}
                childProps={secondaryHeatingSystems.map(type => {
                        return {
                            value: type,
                            children: type,
                        }
                    })
                }/>
        </EditCard> 
    );
}