import ContentType = GalleryBase.ContentType;

export default function getImageUrl(contentType: ContentType, contentId: Kotilogi.IdType): string | null{
    if(contentType == ContentType.PROPERTY){
        return `/api/files/${contentId}?dbTableName=property_files`;
    }

    if(contentType == ContentType.EVENT){
        return `/api/files/${contentId}?dbTableName=event_files`;
    }

    return null;
}