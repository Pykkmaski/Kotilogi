'use client';

import GalleryBase from "../GalleryBase/GalleryBase";

export default async function EventImagesGallery(props: {
    eventId: Kotilogi.IdType,
}){

    return (
        <GalleryBase
            tableName="files"
            contentType="image"
            query={{
                refId: props.eventId,
                mimeType: 'image/jpeg',
            }}
            title="Kuvat"
        />
    )
}