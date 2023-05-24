const { default: axios } = require("axios");
import {useState, useEffect} from 'react';

function useMainImage({property_id, event_id}){
    if(property_id && event_id) throw new Error('useMainImage: property_id and event_id cannot be defined at once!');
    const [id, setId] = useState(null);

    function loadMainImage(){
        var url;
        if(property_id){
            url = `/api/images/properties/${property_id}main`;
        }
        else if(event_id){
            url = `/api/images/events/${event_id}/id/main/`
        }

        axios.get(url)
        .then(res => {
            const data = res.data;
            console.log(data);
            setId(data);
        })
        .catch(err => {
            const empty = null;
            setId(null);
        })
    }

    useEffect(() => {
        loadMainImage();
    }, [property_id, event_id]);

    return [id, loadMainImage];
}

export default useMainImage;