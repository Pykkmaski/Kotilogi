'use client';

import { ModalProps } from "./Modal";
import { Input, Select, Textarea } from "../Input/Input";
import { buildingTypes, serviceName } from "kotilogi-app/constants";
import { useInputFiles, useAddModal } from "./BaseAddModal.hooks";
import { BaseAddModal } from "./BaseAddModal";
import React from "react";
import * as properties from '@/actions/properties';
import * as events from '@/actions/events';
import toast from "react-hot-toast";
import Link from "next/link";

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

            <div className="flex flex-col w-full">
                <div className="flex items-center w-full gap-4 justify-end">
                    <span className="text-slate-500">Kohteen avausmaksu on <span className="text-green-600 text-lg">(9,90€)</span></span>
                </div>
                <small className="text-sm text-slate-500 text-right mt-4">Avausmaksua ei tarvitse maksaa heti. Jos maksua ei makseta kuukauden sisällä, lukkiutuu tilisi, ja avautuu kun maksu on suoritettu.<br/>
                    Tapahtuman hinta lisätään nykyiseen ostoskoriisi, joka löytyy <Link href="/dashboard/plan" target="_blank" className="text-orange-500">täältä.</Link><br/>
                    {serviceName} ei suorita maksujen palautuksia.
                </small>
            </div>
            
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
