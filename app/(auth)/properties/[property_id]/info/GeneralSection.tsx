import Form from "kotilogi-app/components/Form/Form";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { buildingTypes, colors, energyClasses } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm, SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";

export default function GeneralSection({currentData, onChangeHandler}){

    const {onUpdate} = useInfoPageContext();
    
    return (
        <EditCard title="Yleistiedot">
            <SingleInputForm 
                submitMethod={onUpdate}
                inputComponent={Input}
                initialInputProps={{
                    label: "Osoite",
                    description: "Talon katuosoite.",
                    autoComplete: "off",
                    name: "title",
                    required: true,
                    defaultValue: currentData.title,
                    onChange: onChangeHandler,
                }}/>

            <SingleInputForm
                submitMethod={onUpdate}
                inputComponent={Input}
                initialInputProps={{
                    label: 'Postinumero',
                    description: 'Talon Kuusinumeroinen postinumero.',
                    autoComplete: 'off',
                    required: true,
                    defaultValue: currentData.zipCode,
                    onChange: onChangeHandler,
                }}/>

            <SingleInputForm
                submitMethod={onUpdate}
                inputComponent={Input}
                initialInputProps={{
                    label: 'Rakennusvuosi',
                    description: 'Talon valmistumisvuosi.',
                    autoComplete: 'off',
                    required: false,
                    defaultValue: currentData.buildYear,
                    onChange: onChangeHandler,
                }}/>

            <SingleSelectForm
                submitMethod={onUpdate}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Talotyyppi',
                    description: 'Talon tyyppi.',
                    name: 'buildingType',
                    onChange: onChangeHandler,
                    defaultValue: currentData.buildingType,
                }}
                childProps={[
                    ...buildingTypes.map(type => {
                        return {
                            value: type,
                            children: type
                        }
                    })
                ]}/>

            <SingleSelectForm
                submitMethod={onUpdate}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Energialuokka',
                    description: 'Talon energialuokitus.',
                    name: 'energyClass',
                    onChange: onChangeHandler,
                    defaultValue: currentData.energyClass,
                }}
                childProps={[
                    ...energyClasses.map(type => {
                        return {
                            value: type,
                            children: type
                        }
                    })
                ]}/>

            <SingleSelectForm
                submitMethod={onUpdate}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Autotalli',
                    description: 'Onko talolla autotallia?',
                    name: 'hasGarage',
                    onChange: onChangeHandler,
                    defaultValue: currentData.hasGarage,
                }}
                childProps={[
                    {
                        value: 1,
                        children: 'Kyllä',
                    },
                    {
                        value: 0,
                        children: 'Ei',
                    }
                ]}/>
        </EditCard> 
    );
}