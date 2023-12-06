'use client';

import Form from "kotilogi-app/components/Form";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import { serverAddData } from "kotilogi-app/actions/serverAddData";
import Button from "kotilogi-app/components/Button/Button";
import { useEffect, useRef, useState } from "react";
import ObjectModalBase from "../../../Modals/ObjectModalBase";
import toast from "react-hot-toast";
import upload from "kotilogi-app/actions/upload";
import FileDropZone from "kotilogi-app/components/FileDropZone/FileDropZone";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";

export default function AddModal(props: {show: boolean, onHide: () => void}){
    const {props: {query, tableName}, dispatch, loadData}   = useGalleryContext();
    const [loading, setLoading]                   = useState(false);
    const [currentData, setCurrentData]           = useState({refId: query.refId});

    var files: File[] = []; //Filled by the file dropzone.

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
                const result = await upload(data, 'eventFiles');
                if(!result) console.log('File upload failed!');
            });

            loadData();

            toast.success('Tapahtuman lisääminen onnistui!');
       }

       setLoading(false);
       dispatch({
            type: 'toggle_add_modal',
            value: false,
       });
    }

    const modalId = `event-add-modal`;
    const formId = `form-${modalId}`;
   
    const fileDropZone = (
        <FileDropZone
            name="file"
            form={formId}
            accept="application/pdf,image/jpeg"
            onFileUploaded={(newFiles: File[]) => {
               files = newFiles; 
            }}
        />
    );

    const formContent = (
        <>
            <Form.Group>
                <label>Otsikko<span className="danger">*</span></label>
                <input name="title" required={true} placeholder="Kirjoita otsikko..." onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <label>Päivämäärä</label>
                <input type="date" name="time" onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group>
                <label>Kuvaus</label>
                <textarea name="description" placeholder="Kirjoita kuvaus..." onChange={onChangeHandler}/>
                <Form.SubLabel>Anna tapahtumalle vaihtoehtoinen kuvaus.</Form.SubLabel>
            </Form.Group>
        </>
    );

    const footerContent = (
        <>
            <Button
                className="secondary"
                desktopText="Peruuta"
                onClick={() => props.onHide()}
                disabled={loading}
            />

            <Button
                className="primary"
                desktopText="Lähetä"
                type="submit"
                form={formId}
                loading={loading}
                disabled={loading}
            />
        </>
    );


    return (
        <ObjectModalBase 
            title="Lisää Tapahtuma"
            show={props.show} 
            onHide={props.onHide} 
            id={modalId}
            onSubmitHandler={onSubmitHandler}
            bodyContent={fileDropZone}
            formContent={formContent}
            headerContent={<h1>Tiedostot</h1>}
            footerContent={footerContent}
        />
    );
}