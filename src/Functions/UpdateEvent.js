import axios from 'axios';

function UpdateEvent(property_id, event_id, content, callback){
    axios.put(`/properties/${property_id}/events/${event_id}`, content)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default UpdateEvent;