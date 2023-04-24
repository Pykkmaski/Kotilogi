import {useState, useEffect} from 'react';
import axios from 'axios';

function useEvent(event_id){
    const [event, setEvent] = useState(null);

    function loadEvent(){
        const url = `/events/${event_id}`;
        axios.get(url)
        .then(res => setEvent(res.data))
        .catch(err => console.log(err.message))
    }

    useEffect(() => {
       loadEvent();
    }, []);

    return [event, loadEvent];
}

export default useEvent;