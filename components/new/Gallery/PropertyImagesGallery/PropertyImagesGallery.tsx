'use client';

import ImageGallery from "../ImageGallery/ImageGallery";

/**
 * Pre-configured component for displaying files associated with a property.
 * @component
 */

export default function PropertyImagesGallery(props: {
    propertyId: Kotilogi.IdType
}){
    return (
        <ImageGallery
            tableName="propertyFiles"
            refId={props.propertyId}
        />
    )
}