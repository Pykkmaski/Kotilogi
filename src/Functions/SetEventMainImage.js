import axios from "axios";

function SetEventMainImage(event_id, image_id, callback){
    const url = `/api/images/events/${event_id}/main`;
    axios.put(url, {
        event_id,
        image_id
    })
    .then(res => callback())
    .catch(err => console.log(err.message));
}

export default SetEventMainImage;