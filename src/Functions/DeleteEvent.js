import axios from 'axios';

function DeleteEvent(event_id, callback){
    axios.delete(`/events/${event_id}`)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default DeleteEvent;