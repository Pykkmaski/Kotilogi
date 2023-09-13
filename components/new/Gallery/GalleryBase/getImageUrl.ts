
export default function getImageUrl(contentType: GalleryBase.ContentType, contentId: Kotilogi.IdType): string | null{
    
    if(contentType === 'property' || contentType === 'property_image'){
        return `/api/files/${contentId}?dbTableName=property_files`;
    }

    if(contentType == 'event' || contentType === 'event_image'){
        return `/api/files/${contentId}?dbTableName=event_files`;
    }

    return null;
}