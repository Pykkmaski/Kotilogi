import Form from "kotilogi-app/components/Form/Form";
import { Select } from "kotilogi-app/components/Input/Input";
import { buildingMaterials, buildingTypes, colors, energyClasses, primaryHeatingSystems, secondaryHeatingSystems } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm, SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";

export default function HeatingSection({currentData, onChangeHandler}){
    const {onUpdate} = useInfoPageContext();
    return (
        <EditCard title="Lämmitys">
            <SingleSelectForm 
                submitMethod={onUpdate}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Ensisijainen',
                    description: 'Ensisijainen lämmitysmenetelmä.',
                    name: 'primaryHeatingSystem',
                    onChange: onChangeHandler,
                    defaultValue: currentData.primaryHeatingSystem,
                }}
                childProps={primaryHeatingSystems.map(type => {
                        return {
                            value: type,
                            children: type,
                        }
                    })
                }/>
                
            <SingleSelectForm 
                submitMethod={onUpdate}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Toissijainen',
                    description: 'Toissijainen lämmitysmenetelmä.',
                    name: 'secondaryHeatingSystem',
                    onChange: onChangeHandler,
                    defaultValue: currentData.secondaryHeatingSystem,
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