import { useState, useEffect } from "react";

function createImageUrl(property_id, event_id){

    if(!property_id && !event_id) throw new Error('useMainImage, createImageUrl: either property_id or event_id must be defined!');

    if(property_id){
        return `/api/images/properties/${property_id}/main`;
    }

    if(event_id){
        return `/api/images/events/${event_id}/main`;
    }
}

function useMainImage({property_id, event_id}){
    const [url, setUrl] = useState(() => createImageUrl(property_id, event_id));

    useEffect(() => {
        setUrl(createImageUrl(property_id, event_id));
    }, [property_id, event_id]);

    return url;
}

export default useMainImage;