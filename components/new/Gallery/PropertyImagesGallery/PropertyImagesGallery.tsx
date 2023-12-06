'use client';

import GalleryBase from "../GalleryBase/GalleryBase";
import AddFilesModal from "../Modals/AddFilesModal";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";

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
        />
    )
}