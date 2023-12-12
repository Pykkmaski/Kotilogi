'use client';

import FileGallery from "../FileGallery/FileGallery";

/**
 * Pre-configured component for displaying files associated with a property.
 * @component
 */

export default function PropertyFilesGallery(props: {
    propertyId: Kotilogi.IdType,
}){
    return (
       <FileGallery
            tableName="propertyFiles"
            refId={props.propertyId}
       />
    )
}