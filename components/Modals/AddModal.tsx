'use client';

import { createContext, useContext, useRef, useState } from "react";
import Modal, { ModalProps } from "./Modal";
import { useChangeFile, useChangeInput } from "kotilogi-app/hooks/useChangeInput";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import { addProperty } from "kotilogi-app/actions/property/addProperty";
import { Input, Select, Textarea } from "../Input/Input";
import { buildingTypes } from "kotilogi-app/constants";
import { addPropertyEvent } from "kotilogi-app/actions/propertyEvent/addPropertyEvent";
import FileDropZone from "../FileDropZone/FileDropZone";
import { upload } from "kotilogi-app/actions/file/upload";

type StatusType = 'idle' | 'loading' | 'error' | 'success';

function useAddModal(refId: Kotilogi.IdType, submitFunction: (data: object) => Promise<object>){
    const [status, setStatus] = useState<StatusType>('idle');
    const {data, onChange} = useChangeInput({refId});
    const formRef = useRef<HTMLFormElement | null>(null);
    
    const onSubmit = (e) => {
        e.preventDefault();
        submitFunction(data)
        .then(res => {
            setStatus('success');
            
        })
        .catch(err => setStatus('error'))
    }

    const closeModal = () => {
        formRef.current?.reset();
    }

    return {
        status,
        onChange,
        onSubmit,
        formRef,
        closeModal,
    }
}

type AddPropertyModalProps = ModalProps & {
    ownerId: Kotilogi.IdType,
}

export function AddPropertyModal({ownerId, ...props}: AddPropertyModalProps){
    const {
        onSubmit,
        onChange,
        closeModal,
        status,
        formRef
    } = useAddModal(ownerId, addProperty);

    const loading = status === 'loading';

    return (
        <Modal {...props}>
            <Modal.Header>Lisää Talo</Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit} ref={formRef}>
                    <Input
                        name="title"
                        label="Osoite"
                        description="Talon katuosoite."
                        placeholder="Kirjoita osoite..."
                        required={true}
                        autoComplete="off"
                        onChange={onChange}/>

                    <Input
                        name="zipCode"
                        label="Postinumero"
                        description="Talon viisinumeroinen postinumero."
                        placeholder="Kirjoita postinumero..."
                        maxLength={5}
                        minLength={5}
                        required={true}
                        autoComplete="off"
                        onChange={onChange}/>

                    <Select name="buildingType" label="Talotyyppi" description="Talon tyyppi.">
                        {
                            buildingTypes.map(type => <Select.Option key={type}>{type}</Select.Option>)
                        }
                    </Select>

                    <Textarea 
                        label="Kuvaus" 
                        description="Talon lyhyt kuvaus." 
                        placeholder="Kirjoita kuvaus..." 
                        spellCheck={false}
                        name="description"/>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <SecondaryButton
                    desktopText="Peruuta"
                    onClick={() => {
                        closeModal();
                        props.onHide();
                    }}
                    disabled={loading}/>

                <PrimaryButton
                    desktopText="Lähetä"
                    type="submit"
                    loading={loading}
                    disabled={loading}/>
            </Modal.Footer>
        </Modal>
    );
}

type AddEventModalProps = ModalProps & {
    propertyId: Kotilogi.IdType,
}   

export function AddEventModal({propertyId, ...props}: AddEventModalProps){
    const {
        onSubmit,
        onChange,
        closeModal,
        status,
        formRef
    } = useAddModal(propertyId, addPropertyEvent);

    const loading = status === 'loading';

    const formId = 'add-event-modal';

    return (
        <Modal {...props}>
            <Modal.Header>Lisää Talo</Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit} ref={formRef} id={formId}>
                    <Input
                        name="title"
                        label="Otsikko"
                        description="Tapahtuman otsikko."
                        placeholder="Kirjoita otsikko..."
                        required={true}
                        autoComplete="off"
                        onChange={onChange}/>

                    <Textarea 
                        label="Kuvaus" 
                        description="Tapahtuman lyhyt kuvaus." 
                        placeholder="Kirjoita kuvaus..." 
                        spellCheck={false}
                        onChange={onChange}
                        name="description"/>

                    <Input
                        name="time"
                        label="Päiväys"
                        description="Tapahtuman päiväys."
                        placeholder="Kirjoita päiväys..."
                        type="date"
                        onChange={onChange}/>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <SecondaryButton
                    desktopText="Peruuta"
                    onClick={() => {
                        closeModal();
                        props.onHide();
                    }}
                    disabled={loading}/>

                <PrimaryButton
                    desktopText="Lähetä"
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    form={formId}/>
            </Modal.Footer>
        </Modal>
    );
}

function useAddFilesModalHeader(fileType: Kotilogi.MimeType){
    if(fileType === 'application/pdf'){
        return <Modal.Header>Lisää Tiedostoja</Modal.Header>
    }
    else if(fileType === 'image/jpeg'){
        return <Modal.Header>Lisää Kuvia</Modal.Header>
    }
}

function useAddFilesModal(){
    const [status, setStatus] = useState<StatusType>('idle');
    const {files, onFile} = useChangeFile();

    return {status, files, onFile};
}

type AddFilesModalProps = ModalProps & {
    refId: Kotilogi.IdType,
    tableName: 'propertyFiles' | 'eventFiles',
    fileType: Kotilogi.MimeType,
}

function AddFilesModal({refId, fileType, ...props}: AddFilesModalProps){
    const header = useAddFilesModalHeader(fileType);
    const {files, onFile, status} = useAddFilesModal();

    const onSubmit = (e) => {
        e.preventDefault();
        const data: FormData[] = [];
        for(const file of files){
            const formData = new FormData();
            formData.append('file', file);
            formData.append('refId', refId);
            data.push(formData);
        }
    }
    return (
        <Modal {...props}>
            {header}
            <form onSubmit={onSubmit}>
                <FileDropZone
                    name="file"
                    accept={fileType}
                    onFileUploaded={onFile}
                />
            </form>
        </Modal>
    );
}