'use client';

import { Input, Select, Textarea } from "kotilogi-app/components/Input/Input";
import { buildingTypes, energyClasses } from "kotilogi-app/constants";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm, SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

export default function GeneralSection({propertyData, updateProperty}){

    return (
        <EditCard title="Yleistiedot">
            <SingleInputForm 
                submitMethod={updateProperty}
                inputComponent={Input}
                initialInputProps={{
                    label: "Osoite",
                    description: "Talon katuosoite.",
                    autoComplete: "off",
                    name: "title",
                    required: true,
                    defaultValue: propertyData.title,
                }}/>

            <SingleInputForm
                submitMethod={updateProperty}
                inputComponent={Input}
                initialInputProps={{
                    name: 'zipCode',
                    label: 'Postinumero',
                    description: 'Talon viisinumeroinen postinumero.',
                    autoComplete: 'off',
                    required: true,
                    defaultValue: propertyData.zipCode,
                }}/>

            <SingleInputForm
                submitMethod={updateProperty}
                inputComponent={Input}
                initialInputProps={{
                    name: 'buildYear',
                    label: 'Rakennusvuosi',
                    description: 'Talon valmistumisvuosi.',
                    autoComplete: 'off',
                    required: false,
                    defaultValue: propertyData.buildYear,
                }}/>

            <SingleSelectForm
                submitMethod={updateProperty}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Talotyyppi',
                    description: 'Talon tyyppi.',
                    name: 'buildingType',
                    defaultValue: propertyData.buildingType,
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
                submitMethod={updateProperty}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Energialuokka',
                    description: 'Talon energialuokitus.',
                    name: 'energyClass',
                    defaultValue: propertyData.energyClass,
                }}
                childProps={energyClasses.map(type => {
                        return {
                            value: type,
                            children: type
                        }
                    })
                }/>

            <SingleSelectForm
                submitMethod={updateProperty}
                inputComponent={Select}
                childComponent={Select.Option}
                initialInputProps={{
                    label: 'Autotalli',
                    description: 'Onko talolla autotallia?',
                    name: 'hasGarage',
                    defaultValue: propertyData.hasGarage,
                }}
                childProps={[
                    {
                        value: 'Kyllä',
                        children: 'Kyllä',
                    },
                    {
                        value: 'Ei',
                        children: 'Ei',
                    }
                ]}/>

            <SingleInputForm
                submitMethod={updateProperty}
                inputComponent={Textarea}
                initialInputProps={{
                    name: 'description',
                    label: 'Kuvaus',
                    description: 'Talon lyhyt kuvaus.',
                    defaultValue: propertyData.description,
                    spellCheck: false,
                    autoComplete: 'false',
                    maxLength: 256,
                }}/>

        </EditCard> 
    );
}