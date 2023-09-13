export default function getCardDestination(contentType: GalleryBase.ContentType, contentId: Kotilogi.IdType): string | null{
    if(contentType == 'property'){
        return `/auth/properties/${contentId}/info`;
    }

    if(contentType == 'event'){
        return `/auth/events/${contentId}`;
    }

    if(contentType == 'property_file'){
        return `/api/files/${contentId}?dbTableName=property_files`;
    }

    if(contentType == 'event_file'){
        return `/api/files/${contentId}?dbTableName=event_files`;
    }

    return null;
}