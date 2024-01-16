'use client';

import { ModalProps } from "./Modal";
import { addProperty } from "kotilogi-app/actions/property/addProperty";
import { Input, Select, Textarea } from "../Input/Input";
import { buildingTypes } from "kotilogi-app/constants";
import { addPropertyEvent } from "kotilogi-app/actions/propertyEvent/addPropertyEvent";
import { useInputFiles, useInputData, useAddModal } from "./BaseAddModal.hooks";
import { BaseAddModal } from "./BaseAddModal";
import { upload } from "kotilogi-app/actions/file/upload";
import { addPropertyFiles } from "kotilogi-app/actions/property/addPropertyFiles";
import { addPropertyEventFiles } from "kotilogi-app/actions/propertyEvent/addPropertyEventFiles";
import { createContext } from "react";
import React from "react";

type AddModalProps = ModalProps & {
    refId: string,
}

export function AddPropertyModal({refId, ...props}: AddModalProps){
    const {onSubmit, updateData, updateFiles} = useAddModal(refId, addProperty);

    return (
        <BaseAddModal {...props} submitMethod={onSubmit} title="Lisää Talo">
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
    )
}

export function AddEventModal({refId, ...props}: AddModalProps){
    const {updateData, updateFiles, onSubmit} = useAddModal(refId, addPropertyEvent);

    return (
        <BaseAddModal {...props} submitMethod={onSubmit} title="Lisää Tapahtuma">
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
                name="description"
                onChange={updateData}/>

            <Input 
                name="time"
                label="Päiväys"
                description="Tapahtuman päivämäärä."
                type="date"
                onChange={updateData}/>

            <Input
                name="file"
                type="file"
                accept="application/pdf,image/jpeg"
                label="Tiedostot"
                description="Voit lähettää samalla tapahtumaan liittyviä tiedostoja."
                multiple={true}
                onInput={updateFiles}/>
        </BaseAddModal>
    );
}

type AddFilesModalProps = ModalProps & {
    tablename: string,
    accept: string,
    refId: string,
}

export function AddFilesModal({accept, tablename, refId, ...props}: AddFilesModalProps){
    const {files, updateFiles} = useInputFiles();

    const onSubmit = (e) => {
        return upload(files, refId, tablename as any);
    }

    return (
        <BaseAddModal {...props} submitMethod={onSubmit} title="Lisää Tiedostoja">
            <Input name="file" type="file" accept={accept} onInput={updateFiles} required={true}
                label="Tiedostot"
                description="Valitse tiedostot."/>
        </BaseAddModal>
    );
}
