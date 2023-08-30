const { default: axios } = require("axios");
import {useState, useEffect, useRef} from 'react';

function useMainImage({property_id, event_id}){
    if(property_id && event_id) throw new Error('useMainImage: property_id and event_id cannot be defined at once!');
    const [id, setId] = useState(null);

    const args = useRef({property_id, event_id});

    function loadMainImage(){
        var url;
        if(args.current.property_id){
            url = `/api/images/properties/${args.current.property_id}main`;
        }
        else if(args.current.event_id){
            url = `/api/images/events/${args.current.event_id}/id/main/`
        }

        axios.get(url)
        .then(res => {
            const data = res.data;
            setId(data);
        })
        .catch(err => {
            const empty = null;
            setId(null);
        })
    }

    useEffect(() => {
        loadMainImage();
    }, [args.current]);

    return [id, loadMainImage];
}

export default useMainImage;