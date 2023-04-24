import {useState, useEffect} from 'react';
import axios from 'axios';
import SortEvents from '../Functions/SortEvents';

function useEvents(property_id){
    const [events, setEvents] = useState(null);

    function loadEvents(){
        console.log('Loading events');
        const url = `/events/property/${property_id}`;
        axios.get(url)
        .then(res => {
            const sortedEvents = SortEvents(res.data, 'asc');
            setEvents(sortedEvents);
        })
        .catch(err => console.log(err.message))
    }

    useEffect(() => {
       loadEvents();
    }, []);

    return [events, loadEvents];
}

export default useEvents;