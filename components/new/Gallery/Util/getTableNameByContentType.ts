export default function getDbTableName(contentType: GalleryBase.ContentType): Kotilogi.Table | null{
    /**
     * Takes the content type passed as props to a gallery and returns
     * The name of the database table containing the refered data.
     */

    if(contentType === "property_file"){
        return 'property_files';
    }
    else if(contentType == "property_image"){
        return 'property_images';
    }
    else if(contentType == "event_file"){
        return 'event_files';
    }
    else if(contentType == "event_image"){
        return 'event_images';
    }
    else if(contentType == "property"){
        return 'properties';
    }
    else if(contentType == "event"){
        return 'property_events';
    }
    else{
        return null;
    }
}