'use client';

import { ModalProps } from "./Modal";
import { addProperty } from "kotilogi-app/actions/property/addProperty";
import { Input, Select, Textarea } from "../Input/Input";
import { buildingTypes } from "kotilogi-app/constants";
import { addPropertyEvent } from "kotilogi-app/actions/propertyEvent/addPropertyEvent";
import { useInputFiles, useAddModal } from "./BaseAddModal.hooks";
import { BaseAddModal } from "./BaseAddModal";
import { upload } from "kotilogi-app/actions/file/upload";
import React from "react";
import * as properties from '@/actions/properties';
import * as file from '@/actions/file';
import * as events from '@/actions/events';
import * as database from '@/actions/database';

type AddModalProps = ModalProps & {
    refId: string,
}

export function AddPropertyModal({refId, ...props}: AddModalProps){
    const {onSubmit, updateData, updateFiles} = useAddModal({refId: refId, buildingType: 'Kerrostalo'}, properties.add);

    return (
        <BaseAddModal {...props} submitMethod={onSubmit} title="Lisää Talo">
            <Input 
                name="propertyNumber"
                label="Kiinteistötunnus"
                description="Talon kiinteistötunnus"
                placeholder="Kirjoita talon kiinteistötunnus..."
                required={true}
                autoComplete="off"
                onChange={updateData}/>
                
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

            <Input
                name="buildYear"
                label="Rakennusvuosi"
                description="Vuosi jona talo valmistui."
                placeholder="Kirjoita talon rakennusvuosi..."
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
                label="Tiedostot ja kuvat"
                description="Lähetä samalla taloon liittyviä tiedostoja ja kuvia."
                multiple={true}
                onInput={updateFiles}/>
        </BaseAddModal>
    )
}

export function AddEventModal({refId, ...props}: AddModalProps){
    const {updateData, updateFiles, onSubmit} = useAddModal({refId}, events.add);

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

            <Input 
                name="time"
                label="Päiväys"
                description="Tapahtuman päivämäärä."
                required
                type="date"
                onChange={updateData}/>

            <Textarea 
                label="Kuvaus" 
                description="Tapahtuman lyhyt kuvaus." 
                placeholder="Kirjoita kuvaus..." 
                spellCheck={false}
                name="description"
                onChange={updateData}/>

            <Input
                name="file"
                type="file"
                accept="application/pdf,image/jpeg"
                label="Tiedostot ja kuvat"
                description="Lähetä samalla tapahtumaan liittyviä tiedostoja ja kuvia."
                multiple={true}
                onInput={updateFiles}/>
        </BaseAddModal>
    );
}

type AddFilesModalProps = ModalProps & {
    tablename: 'propertyFiles' | 'eventFiles',
    accept: string,
    refId: string,
    uploadMethod: (fdata: FormData) => Promise<void>,
}

export function AddFilesModal({accept, tablename, refId, uploadMethod, ...props}: AddFilesModalProps){
    const {files, updateFiles} = useInputFiles();

    const onSubmit = (e) => {
        const promises: Promise<void>[] = [];
        
        for(const f of files){
            promises.push(uploadMethod(f));
        }
        return Promise.all(promises);
    }

    return (
        <BaseAddModal {...props} submitMethod={onSubmit} title="Lisää Tiedostoja">
            <Input name="file" type="file" accept={accept} onInput={updateFiles} required={true}
                label="Tiedostot"
                description="Valitse tiedostot."/>
        </BaseAddModal>
    );
}
