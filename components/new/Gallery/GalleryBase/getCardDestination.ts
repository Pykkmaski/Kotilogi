import ContentType = GalleryBase.ContentType;

export default function getCardDestination(contentType: GalleryBase.ContentType, contentId: Kotilogi.IdType): string | null{
    if(contentType == ContentType.PROPERTY){
        return `/auth/properties/${contentId}/info`;
    }

    if(contentType == ContentType.EVENT){
        return `/auth/events/${contentId}`;
    }

    if(contentType == (ContentType.PROPERTY | ContentType.FILE)){
        return `/api/files/${contentId}?dbTableName=property_files`;
    }

    if(contentType == (ContentType.EVENT | ContentType.FILE)){
        return `/api/files/${contentId}?dbTableName=event_files`;
    }

    return null;
}