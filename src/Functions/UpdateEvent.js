import axios from 'axios';

function UpdateEvent(event_id, content, callback){
    axios.put(`/api/events/${event_id}`, content)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default UpdateEvent;