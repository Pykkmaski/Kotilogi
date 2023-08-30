import axios from 'axios';

function DeleteEvent(event_id, callback){
    const url = `/api/events/${event_id}`;
    
    axios.delete(url)
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default DeleteEvent;