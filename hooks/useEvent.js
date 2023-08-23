import {useState, useEffect} from 'react';
import axios from 'axios';

function useEvent(event_id){
    const [event, setEvent] = useState(null);

    function loadEvent(){
        const url = `/api/events/${event_id}`;
        axios.get(url)
        .then(res => {
            const data = res.data;
            setEvent(data);
         })
        .catch(err => {
            const none = null;
            setEvent(none);
        })
    }

    useEffect(() => {
       loadEvent();
    }, []);

    return [event, loadEvent];
}

export default useEvent;