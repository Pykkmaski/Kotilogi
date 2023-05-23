import {useState, useEffect} from 'react';
import axios from 'axios';
import SortEvents from '../Functions/SortEvents';

function useEvents(property_id){
    const [events, setEvents] = useState([]);

    function loadEvents(){
        const url = `/api/properties/${property_id}/events`;
        axios.get(url)
        .then(res => {
            const sortedEvents = SortEvents(res.data, 'desc');
            setEvents(sortedEvents);
        })
        .catch(err => {
            const empty = [];
            setEvents(empty);
        })
    }

    useEffect(() => {
       loadEvents();
    }, []);

    return [events, loadEvents];
}

export default useEvents;