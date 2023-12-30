'use client';

import { addData } from "kotilogi-app/actions/data/addData";
import Button from "kotilogi-app/components/Button/Button";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import upload from "kotilogi-app/actions/upload";
import FileDropZone from "kotilogi-app/components/FileDropZone/FileDropZone";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import ObjectModalBase from "./ObjectModalBase";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useGalleryContext } from "../GalleryBase/Gallery";

function getFileTableName(tableName: string){
    return (
        tableName === 'properties' ? 'propertyFiles'
        :
        tableName === 'propertyEvents' ? 'eventFiles'
        :
        tableName
    );
}

type ObjectModalWithFilesContextProps = {
    onChangeHandler: (e) => void,
}

const ObjectModalWithFilesContext = createContext<ObjectModalWithFilesContextProps | null>(null);

export function useObjectModalWithFilesContext(){
    const context = useContext(ObjectModalWithFilesContext);
    if(!context) throw new Error('ObjectModalWithFilesContext cannot be null!');
    return context;
}

export default function ObjectModalWithFiles(props: ModalProps & {
    formContent: JSX.Element,
    title: string,
}){
    const {props: {query, tableName}, dispatch}   = useGalleryContext();
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

        addData(currentData, tableName)
        .then(async addedData => {
            //Upload the files. 
            const dataArray: FormData[] = [];
            files.forEach(async file => {
                const data = new FormData();
                data.append('file', file);
                data.append('refId', addedData.id);
                dataArray.push(data);
            });

            const fileTable = getFileTableName(tableName);
            await upload(dataArray, fileTable as 'propertyFiles' | 'eventFiles');
            const path = (
                tableName === 'properties' ? '/properties'
                :
                tableName === 'propertyEvents' ? '/properties/[property_id]/events'
                :
                ''
            );

            await serverRevalidatePath(path);
            toast.success('Kohteen lisääminen onnistui!');
        })
        .catch(err => toast.error(err.message))
        .finally(() => {
            setLoading(false);
            props.onHide();
        });
    }

    const modalId = `target-add-modal`;
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
        <ObjectModalWithFilesContext.Provider value={{
            onChangeHandler,
        }}>
            <ObjectModalBase 
                title={props.title}
                show={props.show} 
                onHide={props.onHide} 
                id={modalId}
                onSubmitHandler={onSubmitHandler}
                bodyContent={fileDropZone}
                formContent={props.formContent}
                headerContent={<h1>Tiedostot</h1>}
                footerContent={footerContent}
            />
        </ObjectModalWithFilesContext.Provider>
        
    );
}