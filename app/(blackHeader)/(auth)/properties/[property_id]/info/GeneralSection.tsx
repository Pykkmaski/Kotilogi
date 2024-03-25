'use client';

import { Input, Select, Textarea } from "kotilogi-app/components/Input/Input";
import { buildingTypes, energyClasses } from "kotilogi-app/constants";
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { SingleInputForm, SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { Margin } from "kotilogi-app/components/Util/Margin";
import { Group } from "kotilogi-app/components/Group";

export default function GeneralSection({propertyData, updateProperty}){

    return (
        <div className="w-full">
        <ContentCard title="Yleistiedot">
            <div className="mb-8 w-full">
                <Group direction="col" gap={4}>
                    <SingleInputForm
                        submitMethod={updateProperty}
                        inputComponent={Input}
                        editingDisabled={propertyData.propertyNumber ? true : false}
                        initialInputProps={{
                            label: 'Kiinteistötunnus',
                            description: 'Talon kiinteistötunnus',
                            autoComplete: 'off',
                            name: 'propertyNumber',
                            defaultValue: propertyData.propertyNumber,
                        }}/>
               <SingleInputForm 
                   submitMethod={updateProperty}
                   editingDisabled={true}
                   inputComponent={Input}
                   initialInputProps={{
                       label: "Osoite",
                       description: "Talon katuosoite.",
                       autoComplete: "off",
                       name: "title",
                       defaultValue: propertyData.title,
                   }}/>
           

           <SingleInputForm
               submitMethod={updateProperty}
               editingDisabled={true}
               inputComponent={Input}
               initialInputProps={{
                   name: 'zipCode',
                   label: 'Postinumero',
                   description: 'Talon viisinumeroinen postinumero.',
                   autoComplete: 'off',
                   defaultValue: propertyData.zipCode,
               }}/>

           <SingleInputForm
               submitMethod={updateProperty}
               editingDisabled={true}
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
               editingDisabled={true}
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
           </Group>
                
                
            </div>
            
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

        </ContentCard> 
        </div>
        
    );
}