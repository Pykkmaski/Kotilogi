'use client';

import GalleryBase from "../GalleryBase/GalleryBase";
import AddFilesModal from "../Modals/AddFilesModal";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import FileIcon from '@/assets/copy_filled.png';
import FileItemComponent from "../GalleryBase/Components/Body/Components/FileItemComponent/FileItemComponent";

/**
 * Pre-configured component for displaying files associated with a property.
 * @component
 */

export default function PropertyFilesGallery(props: {
    propertyId: Kotilogi.IdType,
}){
    return (
        <GalleryBase 
            title="Tiedosto"
            contentType="file"
            tableName="propertyFiles"
            query={{
                refId: props.propertyId,
                mimeType: 'application/pdf',
            }}
            displayStyle="list"
            AddModal={(HOCProps: ModalProps & {id: Kotilogi.IdType}) => {
                return (
                    <AddFilesModal
                        {...HOCProps}
                        title="Lisää Tiedostoja"
                        fileType="application/pdf"
                        id="property-add-files-modal"
                        item={{
                            id: props.propertyId
                        }}
                    />
                )
            }}
            ItemComponent={(hocprops) => {
                return (
                    <FileItemComponent
                        {...hocprops}
                        imageSrc={FileIcon}
                        destination={`/api/files/${hocprops.item.id}?tableName=propertyFiles`}
                    />
                )
            }}
        />
    )
}