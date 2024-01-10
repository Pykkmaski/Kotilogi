'use client';

import { ModalProps } from "./Modal";
import { addProperty } from "kotilogi-app/actions/property/addProperty";
import { Input, Select, Textarea } from "../Input/Input";
import { buildingTypes } from "kotilogi-app/constants";
import { addPropertyEvent } from "kotilogi-app/actions/propertyEvent/addPropertyEvent";
import { useInputFiles, useInputData } from "./BaseAddModal.hooks";
import { BaseAddModal } from "./BaseAddModal";


type AddPropertyModalProps = ModalProps & {
    ownerId: Kotilogi.IdType,
}

export function AddPropertyModal({ownerId, ...props}: AddPropertyModalProps){
   const {data, updateData} = useInputData({refId: ownerId});
   const {files, updateFiles} = useInputFiles();

   const onSubmit = (e) => {
        return addProperty(data, files);
   }

    return (
        <BaseAddModal {...props} refId={ownerId} submitMethod={onSubmit} title={'Lisää Talo'}>
            <Input
                name="title"
                label="Osoite"
                description="Talon katuosoite."
                placeholder="Kirjoita osoite..."
                required={true}
                autoComplete="off"
                onChange={updateData}/>

            <Input
                name="zipCode"
                label="Postinumero"
                description="Talon viisinumeroinen postinumero."
                placeholder="Kirjoita postinumero..."
                maxLength={5}
                minLength={5}
                required={true}
                autoComplete="off"
                onChange={updateData}/>

            <Select name="buildingType" label="Talotyyppi" description="Talon tyyppi." onChange={updateData}>
                {
                    buildingTypes.map(type => <Select.Option key={type}>{type}</Select.Option>)
                }
            </Select>

            <Textarea 
                label="Kuvaus" 
                description="Talon lyhyt kuvaus." 
                placeholder="Kirjoita kuvaus..." 
                spellCheck={false}
                name="description"
                onChange={updateData}/>

            <Input
                name="file"
                type="file"
                accept="application/pdf,image/jpeg"
                label="Tiedostot"
                description="Lähetä samalla taloon liittyviä tiedostoja."
                multiple={true}
                onInput={updateFiles}/>
        </BaseAddModal>
    );
}

type AddEventModalProps = ModalProps & {
    propertyId: Kotilogi.IdType,
}   

export function AddEventModal({propertyId, ...props}: AddEventModalProps){
    const {data, updateData} = useInputData({refId: propertyId});
    const {files, updateFiles} = useInputFiles();
    
    const onSubmit = (e) => addPropertyEvent(data, files);

    return (    
        <BaseAddModal {...props} refId={propertyId} submitMethod={onSubmit} title={'Lisää Talo'}>
            <Input
                name="title"
                label="Otsikko"
                description="Tapahtuman otsikko."
                placeholder="Kirjoita otsikko..."
                required={true}
                autoComplete="off"
                onChange={updateData}/>

            <Textarea 
                label="Kuvaus" 
                description="Tapahtuman lyhyt kuvaus." 
                placeholder="Kirjoita kuvaus..." 
                spellCheck={false}
                onChange={updateData}
                name="description"/>

            <Input
                name="time"
                label="Päiväys"
                description="Tapahtuman päiväys."
                placeholder="Kirjoita päiväys..."
                type="date"
                onChange={updateData}/>

            <Input
                name="file"
                type="file"
                label="Tiedostot"
                description="Lisää tapahtumaan liittyvia tiedostoja."
                onInput={updateFiles}/>
        </BaseAddModal>
    );
}