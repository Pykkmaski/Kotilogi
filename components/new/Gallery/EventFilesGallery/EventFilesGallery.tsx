import GalleryBase from "../GalleryBase/GalleryBase"

export default function EventFilesGallery(props: {
    eventId: Kotilogi.IdType,
}){
    return (
        <GalleryBase
            tableName="files"
            contentType="file"
            query={{
                refId: props.eventId,
                mimeType: 'application/pdf',
            }}
            title="Tiedostot"
        />
    )
}