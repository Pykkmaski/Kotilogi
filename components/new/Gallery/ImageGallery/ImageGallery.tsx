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

export function getRefTableName(fileTableName: 'propertyFiles' | 'eventFiles'): 'properties' | 'propertyEvents'{
    return (
        fileTableName === 'propertyFiles' ? 'properties'
        :
        'propertyEvents'
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
            }}

            AddModal={(hocProps: ModalProps & {id: Kotilogi.IdType}) => {
                return (
                    <AddFilesModal
                        {...hocProps}
                        title="Lisää Kuvia"
                        fileType="image/jpeg"
                        id={`add-images-modal-${props.refId}`}
                        refId={props.refId}
                    />
                )
            }}

            ItemComponent={(hocProps) => {
                const [isMain, setIsMain] = useState(false);

                useEffect(() => {
                    const refTableName = getRefTableName(props.tableName);
                    serverImageIsMainImage(hocProps.item.id, props.refId, refTableName)
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
                        {...hocProps}
                        imageSrc={`/api/files/${hocProps.item.id}?tableName=${props.tableName}`}
                        isMain={isMain}
                    />
                );
            }}

            errorComponent={
                <ImageError message="Et ole vielä lisännyt kuvia. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta"/>
            }       
        />
    )
}