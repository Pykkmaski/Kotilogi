function CreateImageUrl(options){

    const {property_id, event_id, main, image_id} = options;
    
    if(main && image_id) throw new Error('CreateImageUrl: main and image_id cannot be defined simultaneously!');

    let url = '';

    if(property_id && event_id){
        url = `/images/property/${property_id}/events/${event_id}`;
    }
    else if(property_id){
        url = `/images/property/${property_id}`;
    }
    else if(event_id){
        url = `/images/events/${event_id}`
    }

    if(image_id){
        url += `/${image_id}`;
    }
    else if(main){
        url += '/main'
    }

    return url;
}

export default CreateImageUrl;