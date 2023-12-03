'use client';

import { serverAddData } from "kotilogi-app/actions/serverAddData";
import Form from "kotilogi-app/components/Form";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import AddModalBase from "../../../Modals/AddModalBase";
import ObjectModalBase from "../../../Modals/ObjectModalBase";
import Button from "kotilogi-app/components/Button/Button";
import FileDropZone from "kotilogi-app/components/FileDropZone/FileDropZone";
import { useState } from "react";
import toast from "react-hot-toast";
import upload from "kotilogi-app/actions/upload";

export default function AddModal(props: {
    show: boolean, 
    onHide: () => void
}){
    const [loading, setLoading] = useState(false);
    const {props: {query, tableName}, dispatch} = useGalleryContext();
    const [currentData, setCurrentData] = useState({refId: query.refId});

    var files: File[] = [];

    const onChangeHandler = (e) => {
        setCurrentData(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value,
            }
        });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        const addedEvent = await serverAddData(currentData, tableName);

       if(!addedEvent){
            toast.error('Tapahtuman lisääminen epäonnistui!');
       }
       else{
            //Upload the files.
            files.forEach(async file => {
                const data = new FormData();
                data.append('file', file);
                data.append('refId', addedEvent.id);
                const result = await upload(data);
                if(!result) console.log('File upload failed!');
            });

            dispatch({
                type: 'add_data',
                value: addedEvent,
            });

            toast.success('Tapahtuman lisääminen onnistui!');
       }

       setLoading(false);
       dispatch({
            type: 'toggle_add_modal',
            value: false,
       });
    }

    const formContent = (
        <>
            <Form.Group>
                <label>Postinumero<span className="danger">*</span></label>
                <input name="zipCode" required={true} placeholder="Kirjoita talon postinumero..." onChange={onChangeHandler}/>
                <Form.SubLabel>Postinumeron tulee olla olemassa oleva Suomen postinumero.</Form.SubLabel>
            </Form.Group>

            <Form.Group>
                <label>Osoite<span className="danger">*</span></label>
                <input required={true} name="title" placeholder="Kirjoita talon osoite..." onChange={onChangeHandler}/>
                <Form.SubLabel>Osoitteen tulee olla olemassa oleva Suomen katuosoite.</Form.SubLabel>
            </Form.Group>

            <Form.Group>
                <label>Kuvaus</label>
                <textarea name="description" placeholder="Kirjoita talolle kuvaus..." spellCheck={false} onChange={onChangeHandler}/>
            </Form.Group>
        </>
    )

    const footerContent = (
        <>
            <Button
                className="secondary"
                desktopText="Peruuta"
                onClick={props.onHide}
            />

            <Button
                className="primary"
                desktopText="Lähetä"
                type="submit"
            />
        </>
    );

    const modalId = 'property-add-modal';
    const formId = `form-${modalId}`;
    
    const bodyContent = (
        <FileDropZone
            name="file"
            accept="image/jpeg,application/pdf"
            form={formId}
            onFileUploaded={(newFiles: File[]) => {
                files = newFiles;
            }}
        />
    )

    return (
        <ObjectModalBase
            show={props.show}
            onHide={props.onHide}
            id={modalId}
            title="Lisää Talo"
            onSubmitHandler={onSubmitHandler}
            formContent={formContent}
            footerContent={footerContent}
            headerContent={<h1>Tiedostot</h1>}
            bodyContent={bodyContent}
        />
    );
}