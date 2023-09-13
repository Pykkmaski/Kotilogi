export default function getFileTypeByContentType(contentType: GalleryBase.ContentType): Kotilogi.MimeType | null{
    if(contentType === 'property_file' || contentType === 'event_file'){
        return 'application/pdf';
    }

    if(contentType === 'property_image' || contentType === 'event_image'){
        return 'image/jpeg';
    }

    return null;
}