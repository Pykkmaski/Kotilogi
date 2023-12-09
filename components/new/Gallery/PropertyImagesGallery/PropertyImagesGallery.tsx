'use client';

import { useEffect, useState } from "react";
import ImageItemComponent from "../GalleryBase/Components/Body/Components/ImageItemComponent/ImageItemComponent";
import GalleryBase from "../GalleryBase/GalleryBase";
import AddFilesModal from "../Modals/AddFilesModal";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import serverImageIsMainImage from "kotilogi-app/actions/serverImageIsMainImage";

/**
 * Pre-configured component for displaying files associated with a property.
 * @component
 */

export default function PropertyImagesGallery(props: {
    propertyId: Kotilogi.IdType
}){
    return (
        <GalleryBase 
            title="Kuvat"
            contentType="image"
            tableName="propertyFiles"
            query={{
                refId: props.propertyId,
                mimeType: 'image/jpeg',
            }}
            AddModal={(HOCProps: ModalProps & {id: Kotilogi.IdType}) => {
                return (
                    <AddFilesModal
                        {...HOCProps}
                        title="Lisää Kuvia"
                        fileType="image/jpeg"
                        id="property-add-images-modal"
                        item={{
                            id: props.propertyId
                        }}
                    />
                )
            }}
            ItemComponent={(hocprops) => {
                const [isMain, setIsMain] = useState(false);

                useEffect(() => {
                    serverImageIsMainImage(hocprops.item.id, props.propertyId, 'properties')
                    .then(result => {
                        setIsMain(result as boolean);
                    })
                    .catch(err => console.log(err.message));
                }, []);

                return (
                    <ImageItemComponent
                        {...hocprops}
                        isMain={isMain}
                        imageSrc={`/api/files/${hocprops.item.id}?tableName=propertyFiles`}
                    />
                )
            }}  
        />
    )
}