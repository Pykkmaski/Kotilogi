import contentTypeError from "../Util/contentTypeError";

export default function getImageUrl(entry, contentType: GalleryBase.ContentType): string{
    const contentId: string = contentType === 'property' || contentType === 'event' ? (entry as Kotilogi.PropertyType | Kotilogi.EventType).main_image_id : entry.id as string;
    const dbTableName: Kotilogi.Table | null = (
        contentType === 'property' || contentType === 'property_image' ? 'property_images'
        :
        contentType === 'event' || contentType === 'event_image' ? 'event_images'
        :
        contentType === 'property_file' ? 'property_files'
        :
        contentType === 'event_file' ? 'event_files'
        :
        null
    );
    
    if(!dbTableName) contentTypeError('getImageUrl', contentType, 'Cannot determine table name.');
    return  `/api/files?dbTableName=${dbTableName}&id=${contentId}`;
}