import ContentType = GalleryBase.ContentType;

export default function getDbTableName(contentType: ContentType): string | null{
    /**
     * Takes the content type passed as props to a gallery and returns
     * The name of the database table containing the refered data.
     */

    if(contentType == (ContentType.PROPERTY & ContentType.FILE)){
        return 'property_files';
    }
    else if(contentType == (ContentType.PROPERTY & ContentType.IMAGE)){
        return 'property_images';
    }
    else if(contentType == (ContentType.EVENT & ContentType.FILE)){
        return 'event_files';
    }
    else if(contentType == (ContentType.EVENT & ContentType.IMAGE)){
        return 'event_images';
    }
    else if(contentType == ContentType.PROPERTY){
        return 'properties';
    }
    else if(contentType == ContentType.EVENT){
        return 'event';
    }
    else{
        return null;
    }
}