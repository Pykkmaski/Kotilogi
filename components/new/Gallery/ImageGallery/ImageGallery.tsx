'use client';

import { useEffect, useState } from "react";
import ImageItemComponent from "./ImageItemComponent/ImageItemComponent";
import GalleryBase from "../GalleryBase/GalleryBase";
import serverImageIsMainImage from "kotilogi-app/actions/serverImageIsMainImage";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import AddFilesModal from "../Modals/AddFilesModal";
import GalleryError from "../GalleryBase/Components/Error/Error";
import ImageIcon from '@/assets/image.png';
import ImageError from "../GalleryBase/Components/Error/ImageError";
import Body from "../GalleryBase/Components/Body/Body";
import useGalleryContext from "../GalleryBase/GalleryContext";
import Header from "../GalleryBase/Components/Header/Header";

export function getRefTableName(fileTableName: 'propertyFiles' | 'eventFiles'): 'properties' | 'propertyEvents'{
    return (
        fileTableName === 'propertyFiles' ? 'properties'
        :
        'propertyEvents'
    );
}

function AddModal(props: ModalProps){
    const {props: {query: {refId}}} = useGalleryContext();

    return (
        <AddFilesModal
            {...props}
            title="Lisää Kuvia"
            fileType="image/jpeg"
            id={`add-images-modal-${refId}`}
            refId={refId}
        />
    )
}

function ItemComponent(props: {
    refId: string,
    item: any,
}){
    const {props: {tableName}} = useGalleryContext();
    const [isMain, setIsMain] = useState(false);
    useEffect(() => {
        const refTableName = getRefTableName(tableName as 'propertyFiles' | 'eventFiles');
        serverImageIsMainImage(props.item.id, props.refId, refTableName)
        .then(result => {
            if(!result){
                throw new Error('Could not determine main status of image!');
            }
            else{
                setIsMain(result);
            }
        })
        .catch(err => console.log(err.message));
    }, []);

    return (
        <ImageItemComponent
            {...props}
            imageSrc={`/api/files/${props.item.id}?tableName=${tableName}`}
            isMain={isMain}
        />
    );
}

export default function ImageGallery(props: {
    tableName: 'propertyFiles' | 'eventFiles',
    refId: Kotilogi.IdType,
}){
    return (
        <GalleryBase 
            {...props}
            title="Kuvat"
            contentType="image"
            query={{
                refId: props.refId,
                mimeType: 'image/jpeg',
            }}>
            
            <Header title="Kuvat" AddModal={AddModal}/>
            <Body   
                displayStyle="horizontal" 
                itemComponent={ItemComponent} 
                errorComponent={
                    <ImageError message="Et ole vielä lisännyt kuvia. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta"/>
                }/>
        </GalleryBase>
    )
}