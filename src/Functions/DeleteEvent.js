import axios from 'axios';

function DeleteEvent(property_id, event_id, callback){
    axios.delete(`/properties/${property_id}/events/${event_id}`)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default DeleteEvent;